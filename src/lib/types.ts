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
  balance: number;
  likedPostIds: string[];
  savedPostIds: string[];
  followedSellerIds: string[];
  followedBloggerIds: string[];
  favoriteProductIds: string[];
  cartProductIds: string[];
  sectionVisibility: Record<ProfileSectionKey, ProfileVisibility>;
  orders: Order[];
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
