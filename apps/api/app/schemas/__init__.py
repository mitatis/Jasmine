from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    display_name: str | None = None
    account_type: Literal["merchant", "creator"] | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    account_type: Literal["merchant", "creator"] | None = None


class UserRead(ORMModel):
    id: str
    email: EmailStr
    account_type: Literal["merchant", "creator"]
    display_name: str | None = None
    avatar_url: str | None = None
    status: str


class OrganizationCreate(BaseModel):
    name: str
    org_type: str
    description: str | None = None
    logo_url: str | None = None


class OrganizationRead(ORMModel):
    id: str
    name: str
    org_type: str
    description: str | None = None
    logo_url: str | None = None
    created_at: datetime
    updated_at: datetime


class MemberCreate(BaseModel):
    user_id: str
    role: str = "member"


class BrandCreate(BaseModel):
    org_id: str
    brand_name: str
    brand_positioning: str | None = None
    target_audience: str | None = None
    visual_guidelines: dict[str, Any] | None = None
    banned_styles: Any | None = None
    required_disclaimers: Any | None = None


class BrandRead(ORMModel):
    id: str
    org_id: str
    brand_name: str
    brand_positioning: str | None = None
    target_audience: str | None = None
    visual_guidelines: Any | None = None
    banned_styles: Any | None = None
    required_disclaimers: Any | None = None


class CreatorAssetCreate(BaseModel):
    asset_url: str
    storage_key: str | None = None
    asset_type: str
    usage_scope: str
    width: int | None = None
    height: int | None = None
    mime_type: str | None = None
    quality_score: float | None = None


class CreatorAssetRead(ORMModel):
    id: str
    creator_id: str
    asset_url: str
    asset_type: str
    usage_scope: str
    width: int | None = None
    height: int | None = None
    mime_type: str | None = None
    quality_score: float | None = None


class CreatorProfileCreate(BaseModel):
    org_id: str | None = None
    display_name: str
    bio: str | None = None
    gender_presentation: str | None = None
    height_cm: int | None = None
    body_type: str | None = None
    style_tags: Any = Field(default_factory=list)
    platforms: dict[str, Any] = Field(default_factory=dict)
    visibility_settings: dict[str, Any] | None = None
    collaboration_info: dict[str, Any] | None = None
    content_examples: Any = Field(default_factory=list)
    default_usage_scope: str = "tryon_only"


class CreatorProfileUpdate(BaseModel):
    org_id: str | None = None
    display_name: str | None = None
    bio: str | None = None
    gender_presentation: str | None = None
    height_cm: int | None = None
    body_type: str | None = None
    style_tags: Any | None = None
    platforms: dict[str, Any] | None = None
    visibility_settings: dict[str, Any] | None = None
    collaboration_info: dict[str, Any] | None = None
    content_examples: Any | None = None
    default_usage_scope: str | None = None


class CreatorProfileRead(ORMModel):
    id: str
    user_id: str
    org_id: str | None = None
    display_name: str
    bio: str | None = None
    gender_presentation: str | None = None
    height_cm: int | None = None
    body_type: str | None = None
    style_tags: Any
    platforms: Any | None = None
    visibility_settings: Any | None = None
    collaboration_info: Any | None = None
    content_examples: Any | None = None
    consent_status: str
    default_usage_scope: str
    assets: list[CreatorAssetRead] | None = None


class ConsentCreate(BaseModel):
    consent_type: str
    allowed_brand_ids: list[str] | None = None
    forbidden_brand_ids: list[str] | None = None
    expires_at: datetime | None = None
    signed_text: str


class ConsentRead(ORMModel):
    id: str
    creator_id: str
    user_id: str
    consent_type: str
    allowed_brand_ids: Any | None = None
    forbidden_brand_ids: Any | None = None
    expires_at: datetime | None = None
    revoked_at: datetime | None = None
    signed_text: str
    created_at: datetime


class ProductCreate(BaseModel):
    brand_id: str
    title: str
    sku: str | None = None
    category: str
    description: str | None = None
    color_name: str | None = None
    material: str | None = None
    fit: str | None = None
    product_url: str | None = None
    price_cny: float | None = None
    status: str = "draft"
    style_tags: Any = Field(default_factory=list)


class ProductRead(ORMModel):
    id: str
    brand_id: str
    title: str
    sku: str | None = None
    category: str
    status: str
    style_tags: Any | None = None


class ProductImageCreate(BaseModel):
    image_url: str
    storage_key: str | None = None
    image_type: str
    width: int | None = None
    height: int | None = None
    mime_type: str | None = None
    is_primary: bool = False


class ProductImageRead(ORMModel):
    id: str
    product_id: str
    image_url: str
    image_type: str
    width: int | None = None
    height: int | None = None
    mime_type: str | None = None
    is_primary: bool


class CampaignCreate(BaseModel):
    brand_id: str
    title: str
    brief: str
    objective: str
    target_platform: str
    visual_direction: str | None = None
    deliverables: Any = Field(default_factory=dict)
    requirements: Any = Field(default_factory=dict)
    forbidden_content: Any = Field(default_factory=list)
    status: str = "draft"


class CampaignRead(ORMModel):
    id: str
    brand_id: str
    title: str
    brief: str
    objective: str
    target_platform: str
    visual_direction: str | None = None
    deliverables: Any
    requirements: Any
    forbidden_content: Any
    status: str


class CampaignProductCreate(BaseModel):
    product_id: str
    priority: int = 0


class CampaignCreatorCreate(BaseModel):
    creator_id: str
    proposed_fee_cny: float | None = None
    notes: str | None = None


class UploadPresignRequest(BaseModel):
    file_name: str
    mime_type: str
    purpose: str
    org_id: str | None = None


class UploadPresignResponse(BaseModel):
    upload_id: str
    upload_url: str
    preview_url: str
    expires_in: int


class UploadConfirmRequest(BaseModel):
    upload_id: str


class GenerationJobCreate(BaseModel):
    campaign_id: str | None = None
    creator_id: str
    product_id: str
    job_type: str
    options: dict[str, Any] = Field(default_factory=dict)


class GenerationJobRead(ORMModel):
    id: str
    campaign_id: str | None = None
    creator_id: str
    product_id: str
    requested_by_user_id: str
    org_id: str
    job_type: str
    status: str
    input_payload: Any
    selected_model_route: Any
    error_message: str | None = None
    cost_estimate_usd: float | None = None


class ModelRunRead(ORMModel):
    id: str
    generation_job_id: str
    provider: str
    model_name: str
    provider_run_id: str | None = None
    request_payload: Any
    response_payload: Any | None = None
    status: str
    input_image_urls: Any
    output_image_urls: Any | None = None
    cost_estimate_usd: float | None = None
    latency_ms: int | None = None
    error_message: str | None = None


class GeneratedAssetRead(ORMModel):
    id: str
    generation_job_id: str
    model_run_id: str | None = None
    asset_url: str
    asset_type: str
    width: int | None = None
    height: int | None = None
    mime_type: str | None = None
    generation_step: str
    is_selected: bool


class QualityReportRead(ORMModel):
    id: str
    generation_job_id: str
    generated_asset_id: str
    overall_score: float
    garment_fidelity_score: float
    identity_consistency_score: float
    body_naturalness_score: float
    social_media_quality_score: float
    brand_safety_score: float
    failure_reasons: Any | None = None
    recommendation: str
    vlm_comments: str | None = None


class ApprovalRead(ORMModel):
    id: str
    generation_job_id: str
    actor_user_id: str
    actor_role: str
    action: str
    comment: str | None = None
    created_at: datetime


class JobDetail(GenerationJobRead):
    model_runs: list[ModelRunRead]
    generated_assets: list[GeneratedAssetRead]
    quality_reports: list[QualityReportRead]
    approvals: list[ApprovalRead]


class ApprovalRequest(BaseModel):
    comment: str | None = None


class SelectAssetRequest(BaseModel):
    generated_asset_id: str
