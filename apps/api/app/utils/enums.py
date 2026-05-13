from enum import Enum


class StrEnum(str, Enum):
    def __str__(self) -> str:
        return self.value


class UserStatus(StrEnum):
    active = "active"
    disabled = "disabled"


class OrganizationType(StrEnum):
    merchant_brand = "merchant_brand"
    creator_studio = "creator_studio"
    platform_admin = "platform_admin"


class OrgRole(StrEnum):
    owner = "owner"
    admin = "admin"
    member = "member"
    reviewer = "reviewer"


class ConsentStatus(StrEnum):
    pending = "pending"
    active = "active"
    revoked = "revoked"


class ConsentType(StrEnum):
    tryon_only = "tryon_only"
    commercial_campaign = "commercial_campaign"
    full_ai_generation = "full_ai_generation"


class ProductCategory(StrEnum):
    tops = "tops"
    bottoms = "bottoms"
    one_pieces = "one_pieces"
    outerwear = "outerwear"
    shoes = "shoes"
    bags = "bags"
    hats = "hats"
    jewelry = "jewelry"
    accessories = "accessories"
    full_outfit = "full_outfit"


class ProductStatus(StrEnum):
    draft = "draft"
    active = "active"
    archived = "archived"


class ProductImageType(StrEnum):
    main = "main"
    flat_lay = "flat_lay"
    model_worn = "model_worn"
    detail = "detail"
    logo = "logo"
    fabric = "fabric"
    size_chart = "size_chart"


class CreatorAssetType(StrEnum):
    full_body = "full_body"
    half_body = "half_body"
    face_reference = "face_reference"
    style_reference = "style_reference"
    past_post = "past_post"
    pose_reference = "pose_reference"


class AssetUsageScope(StrEnum):
    private_reference = "private_reference"
    tryon_input = "tryon_input"
    commercial_generation = "commercial_generation"


class CampaignObjective(StrEnum):
    awareness = "awareness"
    conversion = "conversion"
    launch = "launch"
    seeding = "seeding"
    lookbook = "lookbook"


class TargetPlatform(StrEnum):
    xiaohongshu = "xiaohongshu"
    douyin = "douyin"
    instagram = "instagram"
    taobao = "taobao"
    tmall = "tmall"
    other = "other"


class CampaignStatus(StrEnum):
    draft = "draft"
    active = "active"
    paused = "paused"
    completed = "completed"
    archived = "archived"


class CampaignCreatorMatchStatus(StrEnum):
    invited = "invited"
    accepted = "accepted"
    rejected = "rejected"
    generating = "generating"
    submitted = "submitted"
    approved = "approved"
    paid = "paid"
    cancelled = "cancelled"


class GenerationJobType(StrEnum):
    preview = "preview"
    final_standard = "final_standard"
    final_premium = "final_premium"
    batch_creator_campaign = "batch_creator_campaign"


class GenerationJobStatus(StrEnum):
    queued = "queued"
    running = "running"
    waiting_webhook = "waiting_webhook"
    qc_running = "qc_running"
    needs_review = "needs_review"
    approved = "approved"
    rejected = "rejected"
    failed = "failed"
    cancelled = "cancelled"


class ModelProvider(StrEnum):
    fashn = "fashn"
    bfl = "bfl"
    openai = "openai"
    internal_mock = "internal_mock"


class ModelRunStatus(StrEnum):
    queued = "queued"
    running = "running"
    completed = "completed"
    failed = "failed"


class GeneratedAssetType(StrEnum):
    vto_base = "vto_base"
    social_refined = "social_refined"
    cover = "cover"
    final = "final"
    rejected_variant = "rejected_variant"
    qc_overlay = "qc_overlay"


class GenerationStep(StrEnum):
    preview = "preview"
    tryon_max = "tryon_max"
    flux_refine = "flux_refine"
    gpt_polish = "gpt_polish"
    final_selected = "final_selected"


class QualityRecommendation(StrEnum):
    pass_ = "pass"
    manual_review = "manual_review"
    fail = "fail"


class ActorRole(StrEnum):
    merchant = "merchant"
    creator = "creator"
    admin = "admin"
    reviewer = "reviewer"


class ApprovalAction(StrEnum):
    approve = "approve"
    reject = "reject"
    request_regeneration = "request_regeneration"
