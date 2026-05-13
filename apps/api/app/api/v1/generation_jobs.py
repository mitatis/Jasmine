from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.deps import get_current_user
from app.core.permissions import require_merchant_user
from app.db.session import get_db
from app.models.entities import GeneratedAsset, GenerationJob, User
from app.schemas import GenerationJobCreate, GenerationJobRead, JobDetail, SelectAssetRequest
from app.services.generation_orchestrator import create_generation_job, retry_generation_job

router = APIRouter(prefix="/generation-jobs", tags=["generation-jobs"])


@router.post("", response_model=GenerationJobRead)
def create_job(payload: GenerationJobCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    return create_generation_job(
        db,
        user=user,
        campaign_id=payload.campaign_id,
        creator_id=payload.creator_id,
        product_id=payload.product_id,
        job_type=payload.job_type,
        options=payload.options,
    )


@router.get("", response_model=list[GenerationJobRead])
def list_jobs(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[GenerationJob]:
    require_merchant_user(user)
    return list(db.scalars(select(GenerationJob).order_by(GenerationJob.created_at.desc())))


@router.get("/{job_id}", response_model=JobDetail)
def get_job(job_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    job = db.scalar(
        select(GenerationJob)
        .where(GenerationJob.id == job_id)
        .options(
            selectinload(GenerationJob.model_runs),
            selectinload(GenerationJob.generated_assets),
            selectinload(GenerationJob.quality_reports),
            selectinload(GenerationJob.approvals),
        )
    )
    if not job:
        raise HTTPException(status_code=404, detail="Generation job not found.")
    return job


@router.post("/{job_id}/retry", response_model=GenerationJobRead)
def retry_job(job_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    return retry_generation_job(db, job_id=job_id, user=user)


@router.post("/{job_id}/cancel", response_model=GenerationJobRead)
def cancel_job(job_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    job = db.get(GenerationJob, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Generation job not found.")
    if job.status not in {"queued", "running", "waiting_webhook"}:
        raise HTTPException(status_code=400, detail="Only queued or running jobs can be cancelled.")
    job.status = "cancelled"
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.post("/{job_id}/select-asset")
def select_asset(job_id: str, payload: SelectAssetRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict[str, str]:
    require_merchant_user(user)
    assets = list(db.scalars(select(GeneratedAsset).where(GeneratedAsset.generation_job_id == job_id)))
    if not assets:
        raise HTTPException(status_code=404, detail="No assets found for this job.")
    for asset in assets:
        asset.is_selected = asset.id == payload.generated_asset_id
        db.add(asset)
    db.commit()
    return {"status": "ok"}
