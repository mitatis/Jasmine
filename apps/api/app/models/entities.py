from datetime import datetime
from uuid import uuid4

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


def uuid_str() -> str:
    return str(uuid4())


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )


class User(Base, TimestampMixin):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("account_type", "email", name="uq_users_account_type_email"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    account_type: Mapped[str] = mapped_column(String(32), nullable=False, default="merchant", index=True)
    password_hash: Mapped[str | None] = mapped_column(String(255))
    display_name: Mapped[str | None] = mapped_column(String(255))
    avatar_url: Mapped[str | None] = mapped_column(String(1024))
    status: Mapped[str] = mapped_column(String(32), default="active", nullable=False)

    memberships: Mapped[list["OrgMembership"]] = relationship(back_populates="user")
    creator_profiles: Mapped[list["CreatorProfile"]] = relationship(back_populates="user")


class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    org_type: Mapped[str] = mapped_column(String(64), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    logo_url: Mapped[str | None] = mapped_column(String(1024))

    memberships: Mapped[list["OrgMembership"]] = relationship(back_populates="organization")
    brand_profile: Mapped["BrandProfile | None"] = relationship(back_populates="organization")


class OrgMembership(Base):
    __tablename__ = "org_memberships"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), nullable=False, index=True)
    role: Mapped[str] = mapped_column(String(32), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user: Mapped[User] = relationship(back_populates="memberships")
    organization: Mapped[Organization] = relationship(back_populates="memberships")


class BrandProfile(Base, TimestampMixin):
    __tablename__ = "brand_profiles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), nullable=False, index=True)
    brand_name: Mapped[str] = mapped_column(String(255), nullable=False)
    brand_positioning: Mapped[str | None] = mapped_column(Text)
    target_audience: Mapped[str | None] = mapped_column(Text)
    visual_guidelines: Mapped[dict | None] = mapped_column(JSON)
    banned_styles: Mapped[list | dict | None] = mapped_column(JSON)
    required_disclaimers: Mapped[list | dict | None] = mapped_column(JSON)

    organization: Mapped[Organization] = relationship(back_populates="brand_profile")
    products: Mapped[list["Product"]] = relationship(back_populates="brand")
    campaigns: Mapped[list["Campaign"]] = relationship(back_populates="brand")


class CreatorProfile(Base, TimestampMixin):
    __tablename__ = "creator_profiles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    org_id: Mapped[str | None] = mapped_column(ForeignKey("organizations.id"), index=True)
    display_name: Mapped[str] = mapped_column(String(255), nullable=False)
    bio: Mapped[str | None] = mapped_column(Text)
    gender_presentation: Mapped[str | None] = mapped_column(String(128))
    height_cm: Mapped[int | None] = mapped_column(Integer)
    body_type: Mapped[str | None] = mapped_column(String(128))
    style_tags: Mapped[list | dict] = mapped_column(JSON, default=list)
    platforms: Mapped[dict] = mapped_column(JSON, default=dict)
    content_examples: Mapped[list | dict | None] = mapped_column(JSON)
    consent_status: Mapped[str] = mapped_column(String(32), default="pending", nullable=False)
    default_usage_scope: Mapped[str] = mapped_column(String(64), default="tryon_only", nullable=False)

    user: Mapped[User] = relationship(back_populates="creator_profiles")
    assets: Mapped[list["CreatorAsset"]] = relationship(back_populates="creator")
    consents: Mapped[list["ConsentRecord"]] = relationship(back_populates="creator")


class ConsentRecord(Base):
    __tablename__ = "consent_records"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    creator_id: Mapped[str] = mapped_column(ForeignKey("creator_profiles.id"), nullable=False, index=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    consent_type: Mapped[str] = mapped_column(String(64), nullable=False)
    allowed_brand_ids: Mapped[list | None] = mapped_column(JSON)
    forbidden_brand_ids: Mapped[list | None] = mapped_column(JSON)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    signed_text: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    creator: Mapped[CreatorProfile] = relationship(back_populates="consents")


class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    brand_id: Mapped[str] = mapped_column(ForeignKey("brand_profiles.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    sku: Mapped[str | None] = mapped_column(String(128))
    category: Mapped[str] = mapped_column(String(64), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    color_name: Mapped[str | None] = mapped_column(String(128))
    material: Mapped[str | None] = mapped_column(String(255))
    fit: Mapped[str | None] = mapped_column(String(128))
    product_url: Mapped[str | None] = mapped_column(String(1024))
    price_cny: Mapped[float | None] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(32), default="draft", nullable=False)
    style_tags: Mapped[list | dict | None] = mapped_column(JSON, default=list)

    brand: Mapped[BrandProfile] = relationship(back_populates="products")
    images: Mapped[list["ProductImage"]] = relationship(back_populates="product")


class ProductImage(Base):
    __tablename__ = "product_images"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), nullable=False, index=True)
    image_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    storage_key: Mapped[str | None] = mapped_column(String(1024))
    image_type: Mapped[str] = mapped_column(String(64), nullable=False)
    width: Mapped[int | None] = mapped_column(Integer)
    height: Mapped[int | None] = mapped_column(Integer)
    mime_type: Mapped[str | None] = mapped_column(String(128))
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    product: Mapped[Product] = relationship(back_populates="images")


class CreatorAsset(Base):
    __tablename__ = "creator_assets"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    creator_id: Mapped[str] = mapped_column(ForeignKey("creator_profiles.id"), nullable=False, index=True)
    asset_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    storage_key: Mapped[str | None] = mapped_column(String(1024))
    asset_type: Mapped[str] = mapped_column(String(64), nullable=False)
    usage_scope: Mapped[str] = mapped_column(String(64), nullable=False)
    width: Mapped[int | None] = mapped_column(Integer)
    height: Mapped[int | None] = mapped_column(Integer)
    mime_type: Mapped[str | None] = mapped_column(String(128))
    quality_score: Mapped[float | None] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    creator: Mapped[CreatorProfile] = relationship(back_populates="assets")


class Campaign(Base, TimestampMixin):
    __tablename__ = "campaigns"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    brand_id: Mapped[str] = mapped_column(ForeignKey("brand_profiles.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    brief: Mapped[str] = mapped_column(Text, nullable=False)
    objective: Mapped[str] = mapped_column(String(64), nullable=False)
    target_platform: Mapped[str] = mapped_column(String(64), nullable=False)
    visual_direction: Mapped[str | None] = mapped_column(Text)
    deliverables: Mapped[dict | list] = mapped_column(JSON, default=dict)
    requirements: Mapped[dict | list] = mapped_column(JSON, default=dict)
    forbidden_content: Mapped[dict | list] = mapped_column(JSON, default=list)
    status: Mapped[str] = mapped_column(String(32), default="draft", nullable=False)

    brand: Mapped[BrandProfile] = relationship(back_populates="campaigns")


class CampaignProduct(Base):
    __tablename__ = "campaign_products"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    campaign_id: Mapped[str] = mapped_column(ForeignKey("campaigns.id"), nullable=False, index=True)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), nullable=False, index=True)
    priority: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class CampaignCreatorMatch(Base, TimestampMixin):
    __tablename__ = "campaign_creator_matches"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    campaign_id: Mapped[str] = mapped_column(ForeignKey("campaigns.id"), nullable=False, index=True)
    creator_id: Mapped[str] = mapped_column(ForeignKey("creator_profiles.id"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(64), default="invited", nullable=False)
    proposed_fee_cny: Mapped[float | None] = mapped_column(Float)
    final_fee_cny: Mapped[float | None] = mapped_column(Float)
    notes: Mapped[str | None] = mapped_column(Text)


class GenerationJob(Base, TimestampMixin):
    __tablename__ = "generation_jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    campaign_id: Mapped[str | None] = mapped_column(ForeignKey("campaigns.id"), index=True)
    creator_id: Mapped[str] = mapped_column(ForeignKey("creator_profiles.id"), nullable=False, index=True)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), nullable=False, index=True)
    requested_by_user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), nullable=False, index=True)
    job_type: Mapped[str] = mapped_column(String(64), nullable=False)
    status: Mapped[str] = mapped_column(String(64), default="queued", nullable=False)
    input_payload: Mapped[dict] = mapped_column(JSON, default=dict)
    selected_model_route: Mapped[dict] = mapped_column(JSON, default=dict)
    error_message: Mapped[str | None] = mapped_column(Text)
    cost_estimate_usd: Mapped[float | None] = mapped_column(Float)
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    model_runs: Mapped[list["ModelRun"]] = relationship(back_populates="generation_job")
    generated_assets: Mapped[list["GeneratedAsset"]] = relationship(back_populates="generation_job")
    quality_reports: Mapped[list["QualityReport"]] = relationship(back_populates="generation_job")
    approvals: Mapped[list["Approval"]] = relationship(back_populates="generation_job")


class ModelRun(Base, TimestampMixin):
    __tablename__ = "model_runs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    generation_job_id: Mapped[str] = mapped_column(ForeignKey("generation_jobs.id"), nullable=False, index=True)
    provider: Mapped[str] = mapped_column(String(64), nullable=False)
    model_name: Mapped[str] = mapped_column(String(128), nullable=False)
    provider_run_id: Mapped[str | None] = mapped_column(String(255), index=True)
    request_payload: Mapped[dict] = mapped_column(JSON, default=dict)
    response_payload: Mapped[dict | None] = mapped_column(JSON)
    status: Mapped[str] = mapped_column(String(64), default="queued", nullable=False)
    input_image_urls: Mapped[list | dict] = mapped_column(JSON, default=list)
    output_image_urls: Mapped[list | None] = mapped_column(JSON)
    cost_estimate_usd: Mapped[float | None] = mapped_column(Float)
    latency_ms: Mapped[int | None] = mapped_column(Integer)
    error_message: Mapped[str | None] = mapped_column(Text)

    generation_job: Mapped[GenerationJob] = relationship(back_populates="model_runs")


class GeneratedAsset(Base):
    __tablename__ = "generated_assets"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    generation_job_id: Mapped[str] = mapped_column(ForeignKey("generation_jobs.id"), nullable=False, index=True)
    model_run_id: Mapped[str | None] = mapped_column(ForeignKey("model_runs.id"), index=True)
    asset_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(1024), nullable=False)
    asset_type: Mapped[str] = mapped_column(String(64), nullable=False)
    width: Mapped[int | None] = mapped_column(Integer)
    height: Mapped[int | None] = mapped_column(Integer)
    mime_type: Mapped[str | None] = mapped_column(String(128))
    generation_step: Mapped[str] = mapped_column(String(64), nullable=False)
    is_selected: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    generation_job: Mapped[GenerationJob] = relationship(back_populates="generated_assets")
    quality_reports: Mapped[list["QualityReport"]] = relationship(back_populates="generated_asset")


class QualityReport(Base):
    __tablename__ = "quality_reports"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    generation_job_id: Mapped[str] = mapped_column(ForeignKey("generation_jobs.id"), nullable=False, index=True)
    generated_asset_id: Mapped[str] = mapped_column(ForeignKey("generated_assets.id"), nullable=False, index=True)
    overall_score: Mapped[float] = mapped_column(Float, nullable=False)
    garment_fidelity_score: Mapped[float] = mapped_column(Float, nullable=False)
    identity_consistency_score: Mapped[float] = mapped_column(Float, nullable=False)
    body_naturalness_score: Mapped[float] = mapped_column(Float, nullable=False)
    social_media_quality_score: Mapped[float] = mapped_column(Float, nullable=False)
    brand_safety_score: Mapped[float] = mapped_column(Float, nullable=False)
    color_delta: Mapped[float | None] = mapped_column(Float)
    ocr_result: Mapped[dict | None] = mapped_column(JSON)
    vlm_comments: Mapped[str | None] = mapped_column(Text)
    failure_reasons: Mapped[list | None] = mapped_column(JSON)
    recommendation: Mapped[str] = mapped_column(String(64), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    generation_job: Mapped[GenerationJob] = relationship(back_populates="quality_reports")
    generated_asset: Mapped[GeneratedAsset] = relationship(back_populates="quality_reports")


class Approval(Base):
    __tablename__ = "approvals"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    generation_job_id: Mapped[str] = mapped_column(ForeignKey("generation_jobs.id"), nullable=False, index=True)
    actor_user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    actor_role: Mapped[str] = mapped_column(String(64), nullable=False)
    action: Mapped[str] = mapped_column(String(64), nullable=False)
    comment: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    generation_job: Mapped[GenerationJob] = relationship(back_populates="approvals")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    actor_user_id: Mapped[str | None] = mapped_column(String(36), index=True)
    org_id: Mapped[str | None] = mapped_column(String(36), index=True)
    action: Mapped[str] = mapped_column(String(255), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(128), nullable=False)
    entity_id: Mapped[str] = mapped_column(String(128), nullable=False)
    metadata_json: Mapped[dict] = mapped_column("metadata", JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class UploadSession(Base):
    __tablename__ = "upload_sessions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    org_id: Mapped[str | None] = mapped_column(ForeignKey("organizations.id"), index=True)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(128), nullable=False)
    purpose: Mapped[str] = mapped_column(String(128), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(1024), nullable=False)
    upload_url: Mapped[str] = mapped_column(String(2048), nullable=False)
    preview_url: Mapped[str] = mapped_column(String(2048), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    confirmed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class WebhookEvent(Base):
    __tablename__ = "webhook_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    provider: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    provider_run_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    event_hash: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    payload: Mapped[dict] = mapped_column(JSON, default=dict)
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class CostRecord(Base):
    __tablename__ = "cost_records"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=uuid_str)
    model_run_id: Mapped[str] = mapped_column(ForeignKey("model_runs.id"), nullable=False, index=True)
    provider: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    model_name: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    estimated_input_units: Mapped[float | None] = mapped_column(Float)
    estimated_output_units: Mapped[float | None] = mapped_column(Float)
    estimated_cost_usd: Mapped[float | None] = mapped_column(Float)
    actual_cost_usd: Mapped[float | None] = mapped_column(Float)
    pricing_snapshot: Mapped[dict] = mapped_column(JSON, default=dict)
    campaign_id: Mapped[str | None] = mapped_column(String(36), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
