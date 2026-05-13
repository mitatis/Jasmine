from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_brand_access, require_merchant_user, require_org_member, user_org_ids
from app.db.session import get_db
from app.models.entities import BrandProfile, User
from app.schemas import BrandCreate, BrandRead

router = APIRouter(prefix="/brands", tags=["brands"])


@router.post("", response_model=BrandRead)
def create_brand(payload: BrandCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> BrandProfile:
    require_merchant_user(user)
    require_org_member(db, user, payload.org_id)
    brand = BrandProfile(**payload.model_dump())
    db.add(brand)
    db.commit()
    db.refresh(brand)
    return brand


@router.get("/me", response_model=list[BrandRead])
def my_brands(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[BrandProfile]:
    require_merchant_user(user)
    ids = user_org_ids(db, user.id)
    return list(db.scalars(select(BrandProfile).where(BrandProfile.org_id.in_(ids)))) if ids else []


@router.patch("/{brand_id}", response_model=BrandRead)
def update_brand(brand_id: str, payload: BrandCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> BrandProfile:
    require_merchant_user(user)
    brand = require_brand_access(db, user, brand_id)
    for key, value in payload.model_dump(exclude={"org_id"}).items():
        setattr(brand, key, value)
    db.add(brand)
    db.commit()
    db.refresh(brand)
    return brand
