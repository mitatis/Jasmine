from typing import Literal

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.entities import BrandProfile, CreatorProfile, OrgMembership, Organization, User


AccountType = Literal["merchant", "creator"]


def register_user(
    db: Session,
    *,
    email: str,
    password: str,
    account_type: AccountType,
    display_name: str | None = None,
) -> tuple[User, str]:
    normalized_email = email.lower()
    user = User(
        email=normalized_email,
        account_type=account_type,
        password_hash=hash_password(password),
        display_name=display_name,
    )
    db.add(user)
    db.flush()
    _bootstrap_account(db, user=user)
    db.commit()
    db.refresh(user)
    return user, _token_for(user)


def authenticate_user(
    db: Session,
    *,
    email: str,
    password: str,
    account_type: AccountType,
) -> tuple[User | None, str | None]:
    user = db.scalar(select(User).where(User.email == email.lower(), User.account_type == account_type))
    if not user or not verify_password(password, user.password_hash):
        return None, None
    return user, _token_for(user)


def _token_for(user: User) -> str:
    return create_access_token(user.id, {"account_type": user.account_type})


def _bootstrap_account(db: Session, *, user: User) -> None:
    display_name = user.display_name or user.email.split("@", 1)[0]
    if user.account_type == "merchant":
        org = Organization(
            name=f"{display_name} Brand",
            org_type="merchant_brand",
            description="Auto-created merchant organization.",
        )
        db.add(org)
        db.flush()
        db.add(OrgMembership(user_id=user.id, org_id=org.id, role="owner"))
        db.add(
            BrandProfile(
                org_id=org.id,
                brand_name=display_name,
                brand_positioning="Jasmine merchant account",
            )
        )
        return

    org = Organization(
        name=f"{display_name} Studio",
        org_type="creator_studio",
        description="Auto-created creator studio.",
    )
    db.add(org)
    db.flush()
    db.add(OrgMembership(user_id=user.id, org_id=org.id, role="owner"))
    db.add(
        CreatorProfile(
            user_id=user.id,
            org_id=org.id,
            display_name=display_name,
            bio="Jasmine creator account",
            style_tags=[],
            platforms={},
        )
    )
