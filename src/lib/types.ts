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
