from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_brand_access, require_merchant_user, user_org_ids
from app.db.session import get_db
from app.models.entities import BrandProfile, Campaign, CampaignCreatorMatch, CampaignProduct, User
from app.schemas import CampaignCreate, CampaignCreatorCreate, CampaignProductCreate, CampaignRead

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("", response_model=list[CampaignRead])
def list_campaigns(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[Campaign]:
    require_merchant_user(user)
    org_ids = user_org_ids(db, user.id)
    brand_ids = select(BrandProfile.id).where(BrandProfile.org_id.in_(org_ids))
    return list(db.scalars(select(Campaign).where(Campaign.brand_id.in_(brand_ids))))


@router.post("", response_model=CampaignRead)
def create_campaign(payload: CampaignCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Campaign:
    require_merchant_user(user)
    require_brand_access(db, user, payload.brand_id)
    campaign = Campaign(**payload.model_dump())
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign


@router.get("/{campaign_id}", response_model=CampaignRead)
def get_campaign(campaign_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Campaign:
    require_merchant_user(user)
    campaign = db.get(Campaign, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found.")
    require_brand_access(db, user, campaign.brand_id)
    return campaign


@router.patch("/{campaign_id}", response_model=CampaignRead)
def update_campaign(campaign_id: str, payload: CampaignCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Campaign:
    require_merchant_user(user)
    campaign = get_campaign(campaign_id, db, user)
    for key, value in payload.model_dump().items():
        setattr(campaign, key, value)
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    return campaign


@router.post("/{campaign_id}/products")
def add_campaign_product(campaign_id: str, payload: CampaignProductCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict[str, str]:
    require_merchant_user(user)
    campaign = get_campaign(campaign_id, db, user)
    item = CampaignProduct(campaign_id=campaign.id, product_id=payload.product_id, priority=payload.priority)
    db.add(item)
    db.commit()
    return {"id": item.id}


@router.post("/{campaign_id}/creators")
def add_campaign_creator(campaign_id: str, payload: CampaignCreatorCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict[str, str]:
    require_merchant_user(user)
    campaign = get_campaign(campaign_id, db, user)
    item = CampaignCreatorMatch(
        campaign_id=campaign.id,
        creator_id=payload.creator_id,
        proposed_fee_cny=payload.proposed_fee_cny,
        notes=payload.notes,
    )
    db.add(item)
    db.commit()
    return {"id": item.id}
