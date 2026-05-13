from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import User
from app.schemas import UploadConfirmRequest, UploadPresignRequest, UploadPresignResponse
from app.services.storage_service import storage_service

router = APIRouter(prefix="/uploads", tags=["uploads"])


@router.post("/presign", response_model=UploadPresignResponse)
def presign(payload: UploadPresignRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> UploadPresignResponse:
    upload = storage_service.presign_upload(
        db,
        user_id=user.id,
        org_id=payload.org_id,
        file_name=payload.file_name,
        mime_type=payload.mime_type,
        purpose=payload.purpose,
    )
    return UploadPresignResponse(
        upload_id=upload.id,
        upload_url=upload.upload_url,
        preview_url=upload.preview_url,
        expires_in=3600,
    )


@router.post("/confirm")
def confirm(payload: UploadConfirmRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict[str, str]:
    try:
        upload = storage_service.confirm_upload(db, payload.upload_id, user.id)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return {"upload_id": upload.id, "preview_url": upload.preview_url}
