from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_creator_user
from app.db.session import get_db
from app.models.entities import ConsentRecord, CreatorAsset, CreatorProfile, User
from app.schemas import (
    ConsentCreate,
    ConsentRead,
    CreatorAssetCreate,
    CreatorAssetRead,
    CreatorProfileCreate,
    CreatorProfileRead,
    CreatorProfileUpdate,
)
from app.services.creator_profiles import (
    creator_profile_payload,
    normalize_collaboration_info,
    normalize_visibility_settings,
)

router = APIRouter(tags=["creators"])


@router.get("/creators", response_model=list[CreatorProfileRead])
def list_creators(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[CreatorProfile]:
    del user
    return list(db.scalars(select(CreatorProfile)))


@router.post("/creators/profile", response_model=CreatorProfileRead)
def create_profile(payload: CreatorProfileCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> CreatorProfile:
    require_creator_user(user)
    data = payload.model_dump()
    data["visibility_settings"] = normalize_visibility_settings(data.get("visibility_settings"))
    data["collaboration_info"] = normalize_collaboration_info(data.get("collaboration_info"), contact_email=user.email)
    profile = CreatorProfile(user_id=user.id, **data)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


@router.get("/creators/me", response_model=list[CreatorProfileRead])
def my_profiles(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[CreatorProfile]:
    require_creator_user(user)
    return list(db.scalars(select(CreatorProfile).where(CreatorProfile.user_id == user.id)))


@router.get("/creators/{creator_id}", response_model=CreatorProfileRead)
def get_profile(
    creator_id: str,
    view: Literal["owner", "visitor"] | None = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    profile = db.get(CreatorProfile, creator_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Creator profile not found.")
    is_owner = profile.user_id == user.id
    return creator_profile_payload(profile, owner=is_owner, force_visitor=view == "visitor")


@router.patch("/creators/{creator_id}", response_model=CreatorProfileRead)
def update_profile(
    creator_id: str,
    payload: CreatorProfileUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    require_creator_user(user)
    profile = _creator_for_user(db, creator_id, user)
    data = payload.model_dump(exclude_unset=True)
    if "visibility_settings" in data:
        data["visibility_settings"] = normalize_visibility_settings(data["visibility_settings"])
    if "collaboration_info" in data:
        data["collaboration_info"] = normalize_collaboration_info(
            {
                **(profile.collaboration_info or {}),
                **(data["collaboration_info"] or {}),
            },
            contact_email=user.email,
        )

    for key, value in data.items():
        if key == "display_name" and value is None:
            continue
        setattr(profile, key, value)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return creator_profile_payload(profile, owner=True)


@router.post("/creators/{creator_id}/assets", response_model=CreatorAssetRead)
def add_asset(creator_id: str, payload: CreatorAssetCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> CreatorAsset:
    require_creator_user(user)
    profile = _creator_for_user(db, creator_id, user)
    asset = CreatorAsset(creator_id=profile.id, **payload.model_dump())
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


@router.post("/creators/{creator_id}/consents", response_model=ConsentRead)
def add_consent(creator_id: str, payload: ConsentCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> ConsentRecord:
    require_creator_user(user)
    profile = _creator_for_user(db, creator_id, user)
    consent = ConsentRecord(creator_id=profile.id, user_id=user.id, **payload.model_dump())
    profile.consent_status = "active"
    db.add(consent)
    db.add(profile)
    db.commit()
    db.refresh(consent)
    return consent


@router.post("/consents/{consent_id}/revoke", response_model=ConsentRead)
def revoke_consent(consent_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> ConsentRecord:
    require_creator_user(user)
    consent = db.get(ConsentRecord, consent_id)
    if not consent:
        raise HTTPException(status_code=404, detail="Consent not found.")
    profile = _creator_for_user(db, consent.creator_id, user)
    consent.revoked_at = datetime.now(UTC)
    profile.consent_status = "revoked"
    db.add(consent)
    db.add(profile)
    db.commit()
    db.refresh(consent)
    return consent


def _creator_for_user(db: Session, creator_id: str, user: User, allow_cross_user: bool = False) -> CreatorProfile:
    profile = db.get(CreatorProfile, creator_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Creator profile not found.")
    if profile.user_id != user.id and not allow_cross_user:
        raise HTTPException(status_code=403, detail="You do not own this creator profile.")
    return profile
