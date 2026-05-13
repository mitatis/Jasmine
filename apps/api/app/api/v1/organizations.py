from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_creator_user, require_merchant_user, require_org_member, user_org_ids
from app.db.session import get_db
from app.models.entities import Organization, OrgMembership, User
from app.schemas import MemberCreate, OrganizationCreate, OrganizationRead

router = APIRouter(prefix="/organizations", tags=["organizations"])


@router.get("", response_model=list[OrganizationRead])
def list_organizations(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[Organization]:
    ids = user_org_ids(db, user.id)
    return list(db.scalars(select(Organization).where(Organization.id.in_(ids)))) if ids else []


@router.post("", response_model=OrganizationRead)
def create_organization(payload: OrganizationCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Organization:
    if payload.org_type == "merchant_brand":
        require_merchant_user(user)
    elif payload.org_type == "creator_studio":
        require_creator_user(user)
    elif payload.org_type == "platform_admin":
        raise HTTPException(status_code=403, detail="Platform admin organizations cannot be created from this endpoint.")
    org = Organization(**payload.model_dump())
    db.add(org)
    db.flush()
    db.add(OrgMembership(user_id=user.id, org_id=org.id, role="owner"))
    db.commit()
    db.refresh(org)
    return org


@router.get("/{org_id}", response_model=OrganizationRead)
def get_organization(org_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Organization:
    org = db.get(Organization, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found.")
    require_org_member(db, user, org_id)
    return org


@router.post("/{org_id}/members")
def add_member(org_id: str, payload: MemberCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict[str, str]:
    require_org_member(db, user, org_id)
    db.add(OrgMembership(user_id=payload.user_id, org_id=org_id, role=payload.role))
    db.commit()
    return {"status": "ok"}
