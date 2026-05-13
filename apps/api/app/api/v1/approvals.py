from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_merchant_user
from app.db.session import get_db
from app.models.entities import GenerationJob, User
from app.schemas import ApprovalRequest, GenerationJobRead
from app.services.approval_service import record_approval

router = APIRouter(prefix="/generation-jobs", tags=["approvals"])


@router.post("/{job_id}/approve", response_model=GenerationJobRead)
def approve(job_id: str, payload: ApprovalRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    return record_approval(db, job_id=job_id, user=user, action="approve", comment=payload.comment)


@router.post("/{job_id}/reject", response_model=GenerationJobRead)
def reject(job_id: str, payload: ApprovalRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    return record_approval(db, job_id=job_id, user=user, action="reject", comment=payload.comment)


@router.post("/{job_id}/request-regeneration", response_model=GenerationJobRead)
def request_regeneration(job_id: str, payload: ApprovalRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> GenerationJob:
    require_merchant_user(user)
    return record_approval(db, job_id=job_id, user=user, action="request_regeneration", comment=payload.comment)
