from datetime import UTC, datetime, timedelta
from pathlib import Path
from uuid import uuid4

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.entities import UploadSession


class StorageService:
    def __init__(self) -> None:
        self.local_root = Path(settings.local_storage_dir)

    def presign_upload(
        self,
        db: Session,
        *,
        user_id: str,
        file_name: str,
        mime_type: str,
        purpose: str,
        org_id: str | None = None,
        expires_in: int = 3600,
    ) -> UploadSession:
        safe_name = file_name.replace("/", "-").replace(" ", "-")
        storage_key = f"raw/{purpose}/{uuid4()}-{safe_name}"
        preview_url = f"{settings.backend_public_base_url}/storage/{storage_key}"
        upload = UploadSession(
            user_id=user_id,
            org_id=org_id,
            file_name=file_name,
            mime_type=mime_type,
            purpose=purpose,
            storage_key=storage_key,
            upload_url=f"file://{self.local_root / storage_key}",
            preview_url=preview_url,
            expires_at=datetime.now(UTC) + timedelta(seconds=expires_in),
        )
        db.add(upload)
        db.commit()
        db.refresh(upload)
        return upload

    def confirm_upload(self, db: Session, upload_id: str, user_id: str) -> UploadSession:
        upload = db.get(UploadSession, upload_id)
        if not upload or upload.user_id != user_id:
            raise ValueError("Upload session not found.")
        if upload.confirmed_at is None:
            upload.confirmed_at = datetime.now(UTC)
            db.add(upload)
            db.commit()
            db.refresh(upload)
        return upload

    def save_remote_output(self, source_url: str, folder: str, index: int) -> tuple[str, str]:
        extension = ".jpg" if ".png" not in source_url.lower() else ".png"
        storage_key = f"{folder}/{uuid4()}-{index}{extension}"
        if source_url.startswith("/generated/"):
            return storage_key, source_url
        return storage_key, f"{settings.s3_public_base_url.rstrip('/')}/{storage_key}"

    def signed_read_url(self, image_url: str, expires_in: int = 7200) -> str:
        separator = "&" if "?" in image_url else "?"
        return f"{image_url}{separator}expires_in={expires_in}"


storage_service = StorageService()
