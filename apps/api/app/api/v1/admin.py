from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_merchant_user
from app.db.session import get_db
from app.models.entities import CostRecord, GenerationJob, ModelRun, User
from app.schemas import GenerationJobRead, ModelRunRead

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/jobs")
def jobs(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict:
    require_merchant_user(user)
    rows = list(db.scalars(select(GenerationJob).order_by(GenerationJob.created_at.desc())))
    return {"total": len(rows), "items": [GenerationJobRead.model_validate(row).model_dump(mode="json") for row in rows]}


@router.get("/model-runs")
def model_runs(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict:
    require_merchant_user(user)
    rows = list(db.scalars(select(ModelRun).order_by(ModelRun.created_at.desc())))
    return {"total": len(rows), "items": [ModelRunRead.model_validate(row).model_dump(mode="json") for row in rows]}


@router.get("/costs")
def costs(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict:
    require_merchant_user(user)
    total = db.scalar(select(func.sum(CostRecord.estimated_cost_usd))) or 0.0
    by_provider = [
        {"provider": provider, "estimated_cost_usd": float(cost or 0)}
        for provider, cost in db.execute(
            select(CostRecord.provider, func.sum(CostRecord.estimated_cost_usd)).group_by(CostRecord.provider)
        )
    ]
    by_model = [
        {"model_name": model_name, "estimated_cost_usd": float(cost or 0)}
        for model_name, cost in db.execute(
            select(CostRecord.model_name, func.sum(CostRecord.estimated_cost_usd)).group_by(CostRecord.model_name)
        )
    ]
    return {"total_estimated_cost_usd": float(total), "by_provider": by_provider, "by_model": by_model}


@router.get("/errors")
def errors(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict:
    require_merchant_user(user)
    rows = list(db.scalars(select(GenerationJob).where(GenerationJob.status == "failed")))
    return {"total": len(rows), "items": [GenerationJobRead.model_validate(row).model_dump(mode="json") for row in rows]}
