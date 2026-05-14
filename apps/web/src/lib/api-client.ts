import { getStoredToken } from "@/lib/auth";
import type {
  AccountType,
  AdminCosts,
  AuthToken,
  BrandRead,
  CampaignRead,
  CreatorAssetRead,
  CreatorProfileRead,
  CreatorProfileUpdate,
  GenerationJobCreate,
  GenerationJobDetail,
  GenerationJobRead,
  ModelRunRead,
  OrganizationRead,
  ProductImageRead,
  ProductRead,
  UserRead,
} from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

type RequestOptions = RequestInit & {
  token?: string | null;
  accountType?: AccountType | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token: explicitToken, accountType, ...init } = options;
  const token = explicitToken ?? getStoredToken(accountType);
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail ?? "API request failed");
  }
  return response.json() as Promise<T>;
}

export const api = {
  register: (payload: { email: string; password: string; display_name?: string; account_type?: AccountType }) =>
    request<AuthToken>("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string; account_type?: AccountType }) =>
    request<AuthToken>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  registerForAccount: (accountType: AccountType, payload: { email: string; password: string; display_name?: string }) =>
    request<AuthToken>(`/auth/${accountType}/register`, { method: "POST", body: JSON.stringify(payload), accountType }),
  loginForAccount: (accountType: AccountType, payload: { email: string; password: string }) =>
    request<AuthToken>(`/auth/${accountType}/login`, { method: "POST", body: JSON.stringify(payload), accountType }),
  me: () => request<UserRead>("/auth/me"),
  organizations: () => request<OrganizationRead[]>("/organizations"),
  createOrganization: (payload: { name: string; org_type: string; description?: string }) =>
    request<OrganizationRead>("/organizations", { method: "POST", body: JSON.stringify(payload) }),
  brands: () => request<BrandRead[]>("/brands/me"),
  createBrand: (payload: Partial<BrandRead> & { org_id: string; brand_name: string }) =>
    request<BrandRead>("/brands", { method: "POST", body: JSON.stringify(payload) }),
  products: () => request<ProductRead[]>("/products"),
  createProduct: (payload: Record<string, unknown> & { brand_id: string; title: string; category: string }) =>
    request<ProductRead>("/products", { method: "POST", body: JSON.stringify(payload) }),
  addProductImage: (productId: string, payload: Partial<ProductImageRead> & { image_url: string; image_type: string }) =>
    request<ProductImageRead>(`/products/${productId}/images`, { method: "POST", body: JSON.stringify(payload) }),
  creators: () => request<CreatorProfileRead[]>("/creators"),
  myCreators: () => request<CreatorProfileRead[]>("/creators/me"),
  creatorProfile: (creatorId: string, view?: "owner" | "visitor") =>
    request<CreatorProfileRead>(`/creators/${creatorId}${view ? `?view=${view}` : ""}`),
  createCreator: (payload: Partial<CreatorProfileRead> & { display_name: string }) =>
    request<CreatorProfileRead>("/creators/profile", { method: "POST", body: JSON.stringify(payload) }),
  updateCreator: (creatorId: string, payload: CreatorProfileUpdate) =>
    request<CreatorProfileRead>(`/creators/${creatorId}`, { method: "PATCH", body: JSON.stringify(payload) }),
  addCreatorAsset: (creatorId: string, payload: Partial<CreatorAssetRead> & { asset_url: string; asset_type: string; usage_scope: string }) =>
    request<CreatorAssetRead>(`/creators/${creatorId}/assets`, { method: "POST", body: JSON.stringify(payload) }),
  addConsent: (creatorId: string, payload: { consent_type: string; allowed_brand_ids?: string[]; signed_text: string }) =>
    request(`/creators/${creatorId}/consents`, { method: "POST", body: JSON.stringify(payload) }),
  campaigns: () => request<CampaignRead[]>("/campaigns"),
  createCampaign: (payload: Partial<CampaignRead> & { brand_id: string; title: string; brief: string; objective: string; target_platform: string }) =>
    request<CampaignRead>("/campaigns", { method: "POST", body: JSON.stringify(payload) }),
  createJob: (payload: GenerationJobCreate) =>
    request<GenerationJobRead>("/generation-jobs", { method: "POST", body: JSON.stringify(payload) }),
  jobs: () => request<GenerationJobRead[]>("/generation-jobs"),
  job: (id: string) => request<GenerationJobDetail>(`/generation-jobs/${id}`),
  approveJob: (id: string, comment?: string) =>
    request<GenerationJobRead>(`/generation-jobs/${id}/approve`, { method: "POST", body: JSON.stringify({ comment }) }),
  rejectJob: (id: string, comment?: string) =>
    request<GenerationJobRead>(`/generation-jobs/${id}/reject`, { method: "POST", body: JSON.stringify({ comment }) }),
  retryJob: (id: string) => request<GenerationJobRead>(`/generation-jobs/${id}/retry`, { method: "POST" }),
  adminJobs: () => request<{ total: number; items: GenerationJobRead[] }>("/admin/jobs"),
  adminModelRuns: () => request<{ total: number; items: ModelRunRead[] }>("/admin/model-runs"),
  adminCosts: () => request<AdminCosts>("/admin/costs"),
};
