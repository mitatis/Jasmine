export type Seller = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  revenue: number;
  followerCount: number;
  styleFocus: string;
};

export type Blogger = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followerCount: number;
  styleTags: string[];
  coverImage: string;
};

export type Product = {
  id: string;
  sellerId: string;
  name: string;
  price: number;
  stock: number;
  sizes: string[];
  sizeGuide?: {
    size: string;
    shoulder: string;
    chest: string;
    length: string;
  }[];
  material?: string;
  care?: string;
  tags: string[];
  image: string;
  detailImages: string[];
  similarityScore: number;
  similarityReason: string;
  tryOnPreset: string;
  sourcePostId?: string;
  sourcePostIds?: string[];
};

export type PostType = "seller-look" | "buyer-request";

export type Post = {
  id: string;
  type: PostType;
  sellerId?: string;
  bloggerId?: string;
  productId?: string;
  productIds?: string[];
  productTags?: {
    productId: string;
    label: string;
    x: number;
    y: number;
  }[];
  requestId?: string;
  title: string;
  body: string;
  coverImage: string;
  images?: string[];
  styleTags: string[];
  likes: number;
  createdAt: string;
  priceLabel?: string;
  contentFormat?: GeneratedContentFormat;
  publishDestinations?: PublishDestination[];
  externalPublishStatus?: Partial<Record<PublishDestination, PublishStatus>>;
};

export type GeneratedContentFormat = "image-post" | "video-script";

export type PublishDestination = "community" | "douyin" | "xhs-miniapp";

export type PublishStatus = "published" | "needs_auth" | "configured" | "failed";

export type PublishResult = {
  destination: PublishDestination;
  status: PublishStatus;
  message: string;
  externalUrl?: string;
};

export type CampaignBrief = {
  id: string;
  sellerId: string;
  productId: string;
  deliverables: string[];
  suggestedPrice: number;
  fitScore: number;
  deadline: string;
  status: "open" | "matched" | "closed";
};

export type AIStyledPostDraft = {
  productId: string;
  sellerId: string;
  title: string;
  caption: string;
  modelImage: string;
  tags: string[];
  status: "draft" | "ready" | "failed";
};

export type GeneratedContentDraft = {
  id: string;
  format: GeneratedContentFormat;
  title: string;
  body: string;
  tags: string[];
  media: string[];
  productIds: string[];
  sellerId?: string;
  bloggerId?: string;
  publishDestinations: PublishDestination[];
};

export type ProductRecognitionDraft = {
  sellerId: string;
  image: string;
  name: string;
  price: string;
  stock: string;
  sizes: string;
  material: string;
  tags: string[];
  confidence: number;
  notes: string;
};

export type Offer = {
  sellerId: string;
  productId: string;
  price: number;
  similarityScore: number;
  note: string;
};

export type RequestPost = {
  id: string;
  image: string;
  description: string;
  budget: number;
  tags: string[];
  expectedItem: string;
  matchedOffers: Offer[];
  createdAt: string;
};

export type StyleAnalysis = {
  sourceType: "xhs-link" | "image";
  sourceInput: string;
  coverImage: string;
  styleTags: string[];
  summary: string;
  matchedProducts: string[];
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  sellerId: string;
  amount: number;
  size: string;
  status: string;
  createdAt: string;
};

export type CollabRequest = {
  id: string;
  sellerId: string;
  productId: string;
  bloggerId: string;
  title: string;
  body: string;
  coverImage: string;
  tags: string[];
  suggestedPrice: number;
  fitScore: number;
  status: "pending" | "approved";
  createdAt: string;
};

export type ViewerState = {
  likedPostIds: string[];
  savedPostIds: string[];
  followedSellerIds: string[];
  followedBloggerIds: string[];
  favoriteProductIds: string[];
  cartProductIds: string[];
  sectionVisibility: Record<ProfileSectionKey, ProfileVisibility>;
  viewHistory: string[];
};

export type ProfileSectionKey =
  | "likedPosts"
  | "savedPosts"
  | "followedBloggers"
  | "followedSellers";

export type ProfileVisibility = "public" | "following" | "followers" | "mutual";

export type DemoState = {
  sellers: Seller[];
  bloggers: Blogger[];
  products: Product[];
  posts: Post[];
  requests: RequestPost[];
  collabRequests: CollabRequest[];
  viewer: ViewerState;
};

export type AuthToken = {
  access_token: string;
  token_type: "bearer";
};

export type AccountType = "merchant" | "creator";

export type UserRead = {
  id: string;
  email: string;
  account_type: AccountType;
  display_name?: string | null;
  avatar_url?: string | null;
  status: "active" | "disabled";
};

export type OrganizationRead = {
  id: string;
  name: string;
  org_type: "merchant_brand" | "creator_studio" | "platform_admin";
  description?: string | null;
};

export type BrandRead = {
  id: string;
  org_id: string;
  brand_name: string;
  brand_positioning?: string | null;
  target_audience?: string | null;
  visual_guidelines?: Record<string, unknown> | null;
};

export type ProductRead = {
  id: string;
  brand_id: string;
  title: string;
  sku?: string | null;
  category: string;
  status: "draft" | "active" | "archived";
  style_tags?: unknown;
};

export type ProductImageRead = {
  id: string;
  product_id: string;
  image_url: string;
  image_type: string;
  width?: number | null;
  height?: number | null;
  mime_type?: string | null;
  is_primary: boolean;
};

export type CreatorProfileRead = {
  id: string;
  user_id: string;
  org_id?: string | null;
  display_name: string;
  bio?: string | null;
  style_tags: unknown;
  platforms: unknown;
  consent_status: "pending" | "active" | "revoked";
  default_usage_scope: "tryon_only" | "commercial_campaign" | "full_ai_generation";
};

export type CreatorAssetRead = {
  id: string;
  creator_id: string;
  asset_url: string;
  asset_type: string;
  usage_scope: string;
  width?: number | null;
  height?: number | null;
  mime_type?: string | null;
  quality_score?: number | null;
};

export type CampaignRead = {
  id: string;
  brand_id: string;
  title: string;
  brief: string;
  objective: string;
  target_platform: string;
  visual_direction?: string | null;
  deliverables: unknown;
  requirements: unknown;
  forbidden_content: unknown;
  status: "draft" | "active" | "paused" | "completed" | "archived";
};

export type GenerationJobCreate = {
  campaign_id?: string | null;
  creator_id: string;
  product_id: string;
  job_type: "preview" | "final_standard" | "final_premium" | "batch_creator_campaign";
  options: {
    platform?: string;
    aspect_ratio?: string;
    scene_direction?: string;
    brand_direction?: string;
    style?: string;
  };
};

export type GenerationJobRead = {
  id: string;
  campaign_id?: string | null;
  creator_id: string;
  product_id: string;
  requested_by_user_id: string;
  org_id: string;
  job_type: string;
  status: string;
  input_payload: Record<string, unknown>;
  selected_model_route: { steps?: string[]; [key: string]: unknown };
  error_message?: string | null;
  cost_estimate_usd?: number | null;
};

export type ModelRunRead = {
  id: string;
  generation_job_id: string;
  provider: string;
  model_name: string;
  provider_run_id?: string | null;
  request_payload: Record<string, unknown>;
  response_payload?: Record<string, unknown> | null;
  status: string;
  input_image_urls: string[];
  output_image_urls?: string[] | null;
  cost_estimate_usd?: number | null;
  latency_ms?: number | null;
  error_message?: string | null;
};

export type GeneratedAssetRead = {
  id: string;
  generation_job_id: string;
  model_run_id?: string | null;
  asset_url: string;
  asset_type: string;
  width?: number | null;
  height?: number | null;
  mime_type?: string | null;
  generation_step: string;
  is_selected: boolean;
};

export type QualityReportRead = {
  id: string;
  generation_job_id: string;
  generated_asset_id: string;
  overall_score: number;
  garment_fidelity_score: number;
  identity_consistency_score: number;
  body_naturalness_score: number;
  social_media_quality_score: number;
  brand_safety_score: number;
  failure_reasons?: string[] | null;
  recommendation: "pass" | "manual_review" | "fail";
  vlm_comments?: string | null;
};

export type ApprovalRead = {
  id: string;
  generation_job_id: string;
  actor_user_id: string;
  actor_role: string;
  action: string;
  comment?: string | null;
  created_at: string;
};

export type GenerationJobDetail = GenerationJobRead & {
  model_runs: ModelRunRead[];
  generated_assets: GeneratedAssetRead[];
  quality_reports: QualityReportRead[];
  approvals: ApprovalRead[];
};

export type AdminCosts = {
  total_estimated_cost_usd: number;
  by_provider: { provider: string; estimated_cost_usd: number }[];
  by_model: { model_name: string; estimated_cost_usd: number }[];
};

export const generationStatusLabels: Record<string, string> = {
  queued: "排队中",
  running: "生成中",
  waiting_webhook: "等待回调",
  qc_running: "质检中",
  needs_review: "待审核",
  approved: "已通过",
  rejected: "已拒绝",
  failed: "失败",
  cancelled: "已取消",
};
