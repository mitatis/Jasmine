from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.permissions import infer_actor_role
from app.models.entities import Approval, AuditLog, GenerationJob, User


def record_approval(db: Session, *, job_id: str, user: User, action: str, comment: str | None = None) -> GenerationJob:
    job = db.get(GenerationJob, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Generation job not found.")
    existing = db.scalar(
        select(Approval).where(
            Approval.generation_job_id == job_id,
            Approval.actor_user_id == user.id,
            Approval.action == action,
        )
    )
    if not existing:
        approval = Approval(
            generation_job_id=job_id,
            actor_user_id=user.id,
            actor_role=infer_actor_role(db, user, job.org_id),
            action=action,
            comment=comment,
        )
        db.add(approval)
    if action == "approve":
        job.status = "approved"
    elif action == "reject":
        job.status = "rejected"
    elif action == "request_regeneration":
        job.status = "running"
    db.add(AuditLog(actor_user_id=user.id, org_id=job.org_id, action=f"approval.{action}", entity_type="generation_job", entity_id=job.id, metadata_json={"comment": comment}))
    db.add(job)
    db.commit()
    db.refresh(job)
    return job
