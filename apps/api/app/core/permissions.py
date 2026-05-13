from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.entities import BrandProfile, OrgMembership, User


def require_merchant_user(user: User) -> None:
    if user.account_type != "merchant":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Merchant account required.")


def require_creator_user(user: User) -> None:
    if user.account_type != "creator":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Creator account required.")


def user_org_ids(db: Session, user_id: str) -> set[str]:
    rows = db.execute(select(OrgMembership.org_id).where(OrgMembership.user_id == user_id)).all()
    return {row[0] for row in rows}


def is_admin(db: Session, user_id: str) -> bool:
    rows = db.execute(
        select(OrgMembership)
        .join(OrgMembership.organization)
        .where(OrgMembership.user_id == user_id)
    ).scalars()
    return any(row.role in {"owner", "admin"} and row.organization.org_type == "platform_admin" for row in rows)


def require_org_member(db: Session, user: User, org_id: str) -> None:
    if is_admin(db, user.id):
        return
    membership = db.scalar(
        select(OrgMembership).where(OrgMembership.user_id == user.id, OrgMembership.org_id == org_id)
    )
    if not membership:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You do not have access to this organization.")


def require_brand_access(db: Session, user: User, brand_id: str) -> BrandProfile:
    brand = db.get(BrandProfile, brand_id)
    if not brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found.")
    require_org_member(db, user, brand.org_id)
    return brand


def infer_actor_role(db: Session, user: User, org_id: str | None = None) -> str:
    if is_admin(db, user.id):
        return "admin"
    if org_id:
        membership = db.scalar(
            select(OrgMembership).where(OrgMembership.user_id == user.id, OrgMembership.org_id == org_id)
        )
        if membership and membership.role == "reviewer":
            return "reviewer"
        if membership:
            return "merchant"
    return "creator"
