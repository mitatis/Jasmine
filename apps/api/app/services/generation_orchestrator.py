from datetime import UTC, datetime
import asyncio
from typing import Any

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.entities import (
    AuditLog,
    BrandProfile,
    ConsentRecord,
    CostRecord,
    CreatorAsset,
    CreatorProfile,
    GeneratedAsset,
    GenerationJob,
    ModelRun,
    Product,
    ProductImage,
    QualityReport,
    User,
)
from app.prompts import fashn as fashn_prompt
from app.prompts import flux as flux_prompt
from app.prompts import openai_image as openai_prompt
from app.providers.base import ProviderError
from app.providers.bfl_provider import BflProvider
from app.providers.fashn_provider import FashnProvider
from app.providers.mock_provider import MockImageProvider
from app.providers.openai_image_provider import OpenAIImageProvider
from app.services.cost_service import estimate_model_cost
from app.services.quality_service import evaluate_generated_asset
from app.services.storage_service import storage_service


MODEL_ROUTES = {
    "preview": ["fashn_tryon_v16"],
    "final_standard": ["fashn_tryon_max"],
    "final_premium": ["fashn_tryon_max", "flux2_max", "gpt_image_2"],
    "batch_creator_campaign": ["fashn_tryon_v16", "qc", "fashn_tryon_max"],
}


def create_generation_job(
    db: Session,
    *,
    user: User,
    campaign_id: str | None,
    creator_id: str,
    product_id: str,
    job_type: str,
    options: dict[str, Any],
) -> GenerationJob:
    product = _require_product_ready(db, product_id)
    brand = db.get(BrandProfile, product.brand_id)
    if not brand:
        raise HTTPException(status_code=400, detail="Product brand is missing.")
    creator = db.get(CreatorProfile, creator_id)
    if not creator:
        raise HTTPException(status_code=404, detail="Creator profile not found.")
    _require_valid_consent(db, creator_id=creator_id, brand_id=brand.id)
    product_image = _primary_product_image(db, product_id)
    creator_asset = _primary_creator_asset(db, creator_id)
    org_id = brand.org_id
    selected_model_route = {"job_type": job_type, "steps": MODEL_ROUTES.get(job_type, MODEL_ROUTES["preview"])}
    input_payload = {
        "campaign_id": campaign_id,
        "creator_id": creator_id,
        "product_id": product_id,
        "product_image_url": product_image.image_url,
        "creator_image_url": creator_asset.asset_url,
        "options": options,
    }
    job = GenerationJob(
        campaign_id=campaign_id,
        creator_id=creator_id,
        product_id=product_id,
        requested_by_user_id=user.id,
        org_id=org_id,
        job_type=job_type,
        status="queued",
        input_payload=input_payload,
        selected_model_route=selected_model_route,
    )
    db.add(job)
    db.flush()
    db.add(AuditLog(actor_user_id=user.id, org_id=org_id, action="generation_job.create", entity_type="generation_job", entity_id=job.id, metadata_json={"job_type": job_type}))
    db.commit()
    db.refresh(job)

    if settings.celery_task_always_eager:
        process_generation_job(db, job.id)
    else:
        from app.workers.tasks_generation import run_generation_job

        run_generation_job.delay(job.id)
    db.refresh(job)
    return job


def retry_generation_job(db: Session, *, job_id: str, user: User) -> GenerationJob:
    job = db.get(GenerationJob, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Generation job not found.")
    job.status = "queued"
    job.error_message = None
    db.add(AuditLog(actor_user_id=user.id, org_id=job.org_id, action="generation_job.retry", entity_type="generation_job", entity_id=job.id, metadata_json={}))
    db.commit()
    process_generation_job(db, job.id)
    db.refresh(job)
    return job


def process_generation_job(db: Session, job_id: str) -> None:
    job = db.get(GenerationJob, job_id)
    if not job:
        return
    job.status = "running"
    job.started_at = datetime.now(UTC)
    db.add(job)
    db.commit()

    try:
        if job.job_type == "final_premium":
            _run_final_premium(db, job)
        elif job.job_type == "preview":
            _run_stage(db, job, stage="preview", model_name="tryon-v1.6", count=1, asset_type="vto_base", generation_step="preview")
        else:
            _run_stage(db, job, stage="tryon_max", model_name="tryon-max", count=2, asset_type="vto_base", generation_step="tryon_max")
        _finalize_job(db, job)
    except ProviderError as exc:
        _fail_job(db, job, exc.message, exc.raw)
    except Exception as exc:  # pragma: no cover - defensive worker boundary
        _fail_job(db, job, str(exc), {})


def _run_final_premium(db: Session, job: GenerationJob) -> None:
    _run_stage(db, job, stage="tryon_max", model_name="tryon-max", count=4, asset_type="vto_base", generation_step="tryon_max")
    selected = _selected_assets(db, job.id, limit=2)
    for index, asset in enumerate(selected):
        _run_stage(
            db,
            job,
            stage="flux_refine",
            model_name="flux2-max-edit",
            count=1,
            asset_type="social_refined",
            generation_step="flux_refine",
            source_asset_url=asset.asset_url,
            index_offset=index,
        )
    best_refined = _selected_assets(db, job.id, limit=1, asset_type="social_refined")
    source_url = best_refined[0].asset_url if best_refined else selected[0].asset_url
    _run_stage(
        db,
        job,
        stage="gpt_polish",
        model_name="gpt-image-2",
        count=1,
        asset_type="final",
        generation_step="gpt_polish",
        source_asset_url=source_url,
    )


def _run_stage(
    db: Session,
    job: GenerationJob,
    *,
    stage: str,
    model_name: str,
    count: int,
    asset_type: str,
    generation_step: str,
    source_asset_url: str | None = None,
    index_offset: int = 0,
) -> None:
    prompt_meta = _prompt_for_stage(stage)
    payload = _payload_for_stage(job, stage, count, source_asset_url, prompt_meta)
    provider_name = _provider_for_stage(stage)
    provider = _provider_instance(provider_name)
    request_payload = {
        **payload,
        "prompt_name": prompt_meta["name"],
        "prompt_version": prompt_meta["version"],
    }
    cost = estimate_model_cost("internal_mock" if settings.model_provider_mode == "mock" else provider_name, model_name, payload)
    model_run = ModelRun(
        generation_job_id=job.id,
        provider="internal_mock" if settings.model_provider_mode == "mock" else provider_name,
        model_name=model_name,
        request_payload=request_payload,
        status="running",
        input_image_urls=[job.input_payload["product_image_url"], job.input_payload["creator_image_url"]],
        cost_estimate_usd=cost.estimated_cost_usd,
    )
    db.add(model_run)
    db.commit()
    db.refresh(model_run)
    try:
        result = asyncio.run(provider.run(payload))
    except ProviderError:
        model_run.status = "failed"
        db.add(model_run)
        db.commit()
        raise
    model_run.provider_run_id = result.provider_run_id
    model_run.response_payload = result.raw_response
    model_run.output_image_urls = result.output_urls
    model_run.latency_ms = result.latency_ms
    model_run.cost_estimate_usd = result.cost_estimate_usd or model_run.cost_estimate_usd
    model_run.status = "completed"
    db.add(model_run)
    db.add(
        CostRecord(
            model_run_id=model_run.id,
            provider=model_run.provider,
            model_name=model_name,
            estimated_input_units=cost.estimated_input_units,
            estimated_output_units=cost.estimated_output_units,
            estimated_cost_usd=model_run.cost_estimate_usd,
            pricing_snapshot=cost.pricing_snapshot,
            campaign_id=job.campaign_id,
        )
    )
    db.add(AuditLog(actor_user_id=job.requested_by_user_id, org_id=job.org_id, action="model_run.completed", entity_type="model_run", entity_id=model_run.id, metadata_json={"provider": model_run.provider, "model_name": model_name}))
    db.commit()
    _save_assets_and_qc(db, job, model_run, result.output_urls, asset_type, generation_step, index_offset)


def _save_assets_and_qc(
    db: Session,
    job: GenerationJob,
    model_run: ModelRun,
    output_urls: list[str],
    asset_type: str,
    generation_step: str,
    index_offset: int,
) -> None:
    product_image_url = job.input_payload["product_image_url"]
    creator_image_url = job.input_payload["creator_image_url"]
    for index, output_url in enumerate(output_urls):
        storage_key, own_url = storage_service.save_remote_output(output_url, "generated", index + index_offset)
        asset = GeneratedAsset(
            generation_job_id=job.id,
            model_run_id=model_run.id,
            asset_url=own_url,
            storage_key=storage_key,
            asset_type=asset_type,
            width=1200,
            height=1600,
            mime_type="image/jpeg",
            generation_step=generation_step,
            is_selected=False,
        )
        db.add(asset)
        db.commit()
        db.refresh(asset)
        qc = evaluate_generated_asset(
            product_image_url=product_image_url,
            creator_image_url=creator_image_url,
            generated_image_url=asset.asset_url,
        )
        report = QualityReport(
            generation_job_id=job.id,
            generated_asset_id=asset.id,
            overall_score=qc.overall_score,
            garment_fidelity_score=qc.garment_fidelity_score,
            identity_consistency_score=qc.identity_consistency_score,
            body_naturalness_score=qc.body_naturalness_score,
            social_media_quality_score=qc.social_media_quality_score,
            brand_safety_score=qc.brand_safety_score,
            color_delta=qc.color_delta,
            ocr_result=qc.ocr_result,
            vlm_comments=qc.vlm_comments,
            failure_reasons=qc.failure_reasons,
            recommendation=qc.recommendation,
        )
        db.add(report)
        db.add(AuditLog(actor_user_id=job.requested_by_user_id, org_id=job.org_id, action="quality_report.create", entity_type="generated_asset", entity_id=asset.id, metadata_json={"overall_score": qc.overall_score}))
        db.commit()


def _finalize_job(db: Session, job: GenerationJob) -> None:
    job.status = "qc_running"
    db.add(job)
    db.commit()
    assets = _selected_assets(db, job.id, limit=1)
    if assets:
        assets[0].is_selected = True
        db.add(assets[0])
    total_cost = db.scalar(select(func.sum(ModelRun.cost_estimate_usd)).where(ModelRun.generation_job_id == job.id)) or 0.0
    job.cost_estimate_usd = round(float(total_cost), 4)
    job.status = "needs_review"
    job.completed_at = datetime.now(UTC)
    db.add(job)
    db.commit()


def _fail_job(db: Session, job: GenerationJob, message: str, raw: dict[str, Any]) -> None:
    job.status = "failed"
    job.error_message = message
    job.completed_at = datetime.now(UTC)
    db.add(AuditLog(actor_user_id=job.requested_by_user_id, org_id=job.org_id, action="generation_job.failed", entity_type="generation_job", entity_id=job.id, metadata_json={"error": message, "raw": raw}))
    db.add(job)
    db.commit()


def _require_product_ready(db: Session, product_id: str) -> Product:
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    if product.status != "active":
        raise HTTPException(status_code=400, detail="Product must be active before generation.")
    return product


def _primary_product_image(db: Session, product_id: str) -> ProductImage:
    image = db.scalar(
        select(ProductImage)
        .where(ProductImage.product_id == product_id, ProductImage.deleted_at.is_(None))
        .order_by(ProductImage.is_primary.desc(), ProductImage.created_at.asc())
    )
    if not image:
        raise HTTPException(status_code=400, detail="Product requires at least one image.")
    return image


def _primary_creator_asset(db: Session, creator_id: str) -> CreatorAsset:
    asset = db.scalar(
        select(CreatorAsset)
        .where(CreatorAsset.creator_id == creator_id, CreatorAsset.deleted_at.is_(None))
        .order_by((CreatorAsset.asset_type == "full_body").desc(), CreatorAsset.created_at.asc())
    )
    if not asset:
        raise HTTPException(status_code=400, detail="Creator requires an authorized portrait asset.")
    return asset


def _require_valid_consent(db: Session, *, creator_id: str, brand_id: str) -> ConsentRecord:
    now = datetime.now(UTC)
    consents = db.scalars(select(ConsentRecord).where(ConsentRecord.creator_id == creator_id, ConsentRecord.revoked_at.is_(None))).all()
    for consent in consents:
        if consent.expires_at and consent.expires_at < now:
            continue
        if consent.forbidden_brand_ids and brand_id in consent.forbidden_brand_ids:
            continue
        if consent.allowed_brand_ids and brand_id not in consent.allowed_brand_ids:
            continue
        return consent
    raise HTTPException(status_code=400, detail="Creator does not have an active consent record for this brand.")


def _selected_assets(db: Session, job_id: str, limit: int, asset_type: str | None = None) -> list[GeneratedAsset]:
    query = (
        select(GeneratedAsset)
        .join(QualityReport, QualityReport.generated_asset_id == GeneratedAsset.id)
        .where(GeneratedAsset.generation_job_id == job_id)
        .order_by(QualityReport.overall_score.desc(), GeneratedAsset.created_at.asc())
        .limit(limit)
    )
    if asset_type:
        query = query.where(GeneratedAsset.asset_type == asset_type)
    return list(db.scalars(query))


def _prompt_for_stage(stage: str) -> dict[str, Any]:
    if stage == "flux_refine":
        return flux_prompt.PROMPT
    if stage == "gpt_polish":
        return openai_prompt.PROMPT
    return fashn_prompt.PROMPT


def _provider_for_stage(stage: str) -> str:
    if stage == "flux_refine":
        return "bfl"
    if stage == "gpt_polish":
        return "openai"
    return "fashn"


def _provider_instance(provider_name: str):
    if settings.model_provider_mode == "mock":
        return MockImageProvider()
    if provider_name == "bfl":
        return BflProvider()
    if provider_name == "openai":
        return OpenAIImageProvider()
    return FashnProvider()


def _payload_for_stage(
    job: GenerationJob,
    stage: str,
    count: int,
    source_asset_url: str | None,
    prompt_meta: dict[str, Any],
) -> dict[str, Any]:
    options = job.input_payload.get("options", {})
    product_url = storage_service.signed_read_url(job.input_payload["product_image_url"])
    creator_url = storage_service.signed_read_url(job.input_payload["creator_image_url"])
    if stage == "preview":
        return {
            "model_name": "tryon-v1.6",
            "inputs": {
                "model_image": creator_url,
                "garment_image": product_url,
                "category": "auto",
                "garment_photo_type": "auto",
                "mode": "balanced",
                "num_samples": count,
                "output_format": "png",
            },
            "num_samples": count,
            "prompt": prompt_meta["template"].format(style_instruction=options.get("scene_direction", "")),
        }
    if stage == "flux_refine":
        return {
            "action": "flux2_max_edit",
            "image_urls": [source_asset_url, product_url, creator_url],
            "num_images": count,
            "prompt": prompt_meta["template"].format(
                scene_direction=options.get("scene_direction", "premium editorial"),
                brand_direction=options.get("brand_direction", "minimal premium"),
            ),
        }
    if stage == "gpt_polish":
        return {
            "action": "edit",
            "image_urls": [source_asset_url, product_url],
            "num_images": count,
            "prompt": prompt_meta["template"].format(
                aspect_ratio=options.get("aspect_ratio", "3:4"),
                style=options.get("style", "premium fashion collaboration"),
                platform=options.get("platform", "xiaohongshu"),
            ),
        }
    return {
        "model_name": "tryon-max",
        "inputs": {
            "product_image": product_url,
            "model_image": creator_url,
            "prompt": options.get("scene_direction", "premium fashion campaign image"),
            "resolution": "4k" if job.job_type == "final_premium" else "2k",
            "generation_mode": "quality",
            "num_images": count,
            "output_format": "png",
        },
        "num_images": count,
        "prompt": prompt_meta["template"].format(style_instruction=options.get("scene_direction", "")),
    }
