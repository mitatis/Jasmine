import hashlib
import json
from datetime import UTC, datetime

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.entities import ModelRun, WebhookEvent

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/fashn")
def fashn_webhook(payload: dict, db: Session = Depends(get_db)) -> dict[str, str]:
    return _record_webhook(db, "fashn", payload)


@router.post("/bfl")
def bfl_webhook(payload: dict, db: Session = Depends(get_db)) -> dict[str, str]:
    return _record_webhook(db, "bfl", payload)


@router.post("/openai")
def openai_webhook(payload: dict, db: Session = Depends(get_db)) -> dict[str, str]:
    return _record_webhook(db, "openai", payload)


def _record_webhook(db: Session, provider: str, payload: dict) -> dict[str, str]:
    provider_run_id = str(payload.get("provider_run_id") or payload.get("id") or payload.get("run_id") or "unknown")
    event_hash = hashlib.sha256(json.dumps(payload, sort_keys=True).encode("utf-8")).hexdigest()
    existing = db.scalar(select(WebhookEvent).where(WebhookEvent.event_hash == event_hash))
    if existing:
        return {"status": "duplicate"}
    event = WebhookEvent(provider=provider, provider_run_id=provider_run_id, event_hash=event_hash, payload=payload, processed_at=datetime.now(UTC))
    db.add(event)
    model_run = db.scalar(select(ModelRun).where(ModelRun.provider_run_id == provider_run_id))
    if model_run and payload.get("status") in {"completed", "succeeded"}:
        model_run.status = "completed"
        db.add(model_run)
    db.commit()
    return {"status": "ok"}
