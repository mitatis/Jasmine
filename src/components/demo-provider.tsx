"use client";

import {
  useCallback,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { toast } from "sonner";

import { seedBloggers, seedDemoState } from "@/lib/seed";
import type {
  Blogger,
  CollabRequest,
  DemoState,
  Post,
  Product,
  ProfileSectionKey,
  ProfileVisibility,
  PublishDestination,
  PublishStatus,
  RequestPost,
  Seller,
} from "@/lib/types";

const STORAGE_KEY = "jasmine-demo-state-v1";

type DemoContextValue = {
  state: DemoState;
  hydrated: boolean;
  toggleLike: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  toggleFollow: (sellerId: string) => void;
  toggleBloggerFollow: (bloggerId: string) => void;
  toggleCartProduct: (productId: string) => void;
  setSectionVisibility: (section: ProfileSectionKey, visibility: ProfileVisibility) => void;
  trackView: (entry: string) => void;
  publishUserPost: (payload: {
    title: string;
    body: string;
    coverImage: string;
    images?: string[];
    tags: string[];
    productIds?: string[];
    contentFormat?: Post["contentFormat"];
    publishDestinations?: PublishDestination[];
    externalPublishStatus?: Partial<Record<PublishDestination, PublishStatus>>;
  }) => Post;
  publishSellerPost: (product: Product, draft: { title: string; caption: string; modelImage: string; tags: string[] }) => void;
  publishBloggerCollabPost: (product: Product, blogger: Blogger) => void;
  submitCollabRequest: (request: Omit<CollabRequest, "id" | "status" | "createdAt">) => void;
  approveCollabRequest: (requestId: string) => void;
  addProduct: (product: Product) => void;
  addRequest: (request: RequestPost, post: Post) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

function cloneSeedState(): DemoState {
  return JSON.parse(JSON.stringify(seedDemoState)) as DemoState;
}

function mergeSeedBackedItems<T extends { id: string }>(
  seedItems: T[],
  storedItems: T[] | undefined,
  mergeSeedItem: (seedItem: T, storedItem: T) => T,
) {
  if (!storedItems?.length) {
    return seedItems;
  }

  const seedIds = new Set(seedItems.map((item) => item.id));
  const storedById = new Map(storedItems.map((item) => [item.id, item]));
  const customItems = storedItems.filter((item) => !seedIds.has(item.id));

  return [
    ...customItems,
    ...seedItems.map((seedItem) => {
      const storedItem = storedById.get(seedItem.id);
      return storedItem ? mergeSeedItem(seedItem, storedItem) : seedItem;
    }),
  ];
}

function alignPostProductTags(posts: Post[], products: Product[]) {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return posts.map((post) => {
    const productIds = getPostProductIdsForState(post).filter((productId) => productsById.has(productId));

    if (!productIds.length) {
      return post;
    }

    return {
      ...post,
      productId: productIds[0],
      productIds,
      productTags: productIds.map((productId, index) => {
        const sourceTag = post.productTags?.find((tag) => tag.productId === productId);
        const product = productsById.get(productId);

        return {
          productId,
          label: product?.name ?? sourceTag?.label ?? "同款商品",
          x: sourceTag?.x ?? (index === 0 ? 54 : 42),
          y: sourceTag?.y ?? (index === 0 ? 40 : 62),
        };
      }),
    };
  });
}

function getPostProductIdsForState(post: Post) {
  const tagIds = post.productTags?.map((tag) => tag.productId) ?? [];
  const ids = [
    ...tagIds,
    ...(post.productIds ?? []),
    ...(post.productId ? [post.productId] : []),
  ];

  return [...new Set(ids)];
}

function normalizeState(value: DemoState): DemoState {
  const seed = cloneSeedState();
  const sellers = mergeSeedBackedItems<Seller>(seed.sellers, value.sellers, (seedSeller, storedSeller) => ({
    ...seedSeller,
    revenue: storedSeller.revenue,
    followerCount: storedSeller.followerCount,
  }));
  const bloggers = mergeSeedBackedItems<Blogger>(seed.bloggers, value.bloggers, (seedBlogger, storedBlogger) => ({
    ...seedBlogger,
    followerCount: storedBlogger.followerCount,
  }));
  const products = mergeSeedBackedItems<Product>(seed.products, value.products, (seedProduct, storedProduct) => {
    return {
      ...seedProduct,
      stock: storedProduct.stock,
      sourcePostId: storedProduct.sourcePostId ?? seedProduct.sourcePostId,
      sourcePostIds: [
        ...new Set([
          ...(storedProduct.sourcePostIds ?? []),
          ...(seedProduct.sourcePostIds ?? []),
        ]),
      ],
    };
  });
  const posts = alignPostProductTags(
    mergeSeedBackedItems<Post>(seed.posts, value.posts, (seedPost, storedPost) => {
      return {
        ...seedPost,
        likes: storedPost.likes,
        createdAt: storedPost.createdAt,
      };
    }),
    products,
  );

  return {
    ...seed,
    ...value,
    sellers,
    bloggers,
    collabRequests: value.collabRequests ?? [],
    requests: mergeSeedBackedItems<RequestPost>(seed.requests, value.requests, (seedRequest) => seedRequest),
    products,
    posts,
    viewer: {
      ...seed.viewer,
      ...value.viewer,
      followedSellerIds: value.viewer?.followedSellerIds ?? [],
      followedBloggerIds: value.viewer?.followedBloggerIds ?? [],
      likedPostIds: value.viewer?.likedPostIds ?? [],
      savedPostIds: value.viewer?.savedPostIds ?? [],
      favoriteProductIds: value.viewer?.favoriteProductIds ?? [],
      cartProductIds: value.viewer?.cartProductIds ?? value.viewer?.favoriteProductIds ?? [],
      sectionVisibility: {
        ...seed.viewer.sectionVisibility,
        ...(value.viewer?.sectionVisibility ?? {}),
      },
      viewHistory: value.viewer?.viewHistory ?? [],
    },
  };
}

function resolveProduct(products: Product[], productId?: string) {
  return products.find((product) => product.id === productId);
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(() => cloneSeedState());
  const [storageReady, setStorageReady] = useState(false);
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    queueMicrotask(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          setState(normalizeState(JSON.parse(raw) as DemoState));
        }
      } catch {
        setState(cloneSeedState());
      } finally {
        setStorageReady(true);
      }
    });
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated || !storageReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state, storageReady]);

  const trackView = useCallback((entry: string) => {
    setState((current) => {
      if (current.viewer.viewHistory[0] === entry) {
        return current;
      }

      const nextHistory = [entry, ...current.viewer.viewHistory.filter((item) => item !== entry)].slice(0, 10);

      return {
        ...current,
        viewer: {
          ...current.viewer,
          viewHistory: nextHistory,
        },
      };
    });
  }, []);

  const value = useMemo<DemoContextValue>(() => {
    return {
      state,
      hydrated: hydrated && storageReady,
      toggleLike(postId) {
        startTransition(() => {
          setState((current) => {
            const liked = current.viewer.likedPostIds.includes(postId);

            return {
              ...current,
              posts: current.posts.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likes: liked ? Math.max(post.likes - 1, 0) : post.likes + 1,
                    }
                  : post,
              ),
              viewer: {
                ...current.viewer,
                likedPostIds: liked
                  ? current.viewer.likedPostIds.filter((id) => id !== postId)
                  : [...current.viewer.likedPostIds, postId],
              },
            };
          });
        });
      },
      toggleSavePost(postId) {
        startTransition(() => {
          setState((current) => {
            const saved = current.viewer.savedPostIds.includes(postId);

            return {
              ...current,
              viewer: {
                ...current.viewer,
                savedPostIds: saved
                  ? current.viewer.savedPostIds.filter((id) => id !== postId)
                  : [...current.viewer.savedPostIds, postId],
              },
            };
          });
        });
      },
      toggleFollow(sellerId) {
        startTransition(() => {
          setState((current) => {
            const following = current.viewer.followedSellerIds.includes(sellerId);

            return {
              ...current,
              sellers: current.sellers.map((seller) =>
                seller.id === sellerId
                  ? {
                      ...seller,
                      followerCount: following
                        ? Math.max(seller.followerCount - 1, 0)
                        : seller.followerCount + 1,
                    }
                  : seller,
              ),
              viewer: {
                ...current.viewer,
                followedSellerIds: following
                  ? current.viewer.followedSellerIds.filter((id) => id !== sellerId)
                  : [...current.viewer.followedSellerIds, sellerId],
              },
            };
          });
        });
      },
      toggleBloggerFollow(bloggerId) {
        startTransition(() => {
          setState((current) => {
            const following = current.viewer.followedBloggerIds.includes(bloggerId);

            return {
              ...current,
              bloggers: current.bloggers.map((blogger) =>
                blogger.id === bloggerId
                  ? {
                      ...blogger,
                      followerCount: following
                        ? Math.max(blogger.followerCount - 1, 0)
                        : blogger.followerCount + 1,
                    }
                  : blogger,
              ),
              viewer: {
                ...current.viewer,
                followedBloggerIds: following
                  ? current.viewer.followedBloggerIds.filter((id) => id !== bloggerId)
                  : [...current.viewer.followedBloggerIds, bloggerId],
              },
            };
          });
        });
      },
      toggleCartProduct(productId) {
        startTransition(() => {
          setState((current) => {
            const inCart = current.viewer.cartProductIds.includes(productId);

            return {
              ...current,
              viewer: {
                ...current.viewer,
                favoriteProductIds: inCart
                  ? current.viewer.favoriteProductIds.filter((id) => id !== productId)
                  : [...current.viewer.favoriteProductIds.filter((id) => id !== productId), productId],
                cartProductIds: inCart
                  ? current.viewer.cartProductIds.filter((id) => id !== productId)
                  : [...current.viewer.cartProductIds, productId],
              },
            };
          });
        });
      },
      setSectionVisibility(section, visibility) {
        setState((current) => ({
          ...current,
          viewer: {
            ...current.viewer,
            sectionVisibility: {
              ...current.viewer.sectionVisibility,
              [section]: visibility,
            },
          },
        }));
      },
      trackView,
      publishUserPost(payload) {
        const productTags = payload.productIds?.map((productId, index) => {
          const product = resolveProduct(state.products, productId);

          return {
            productId,
            label: product?.name ?? (index === 0 ? "同款商品" : "搭配商品"),
            x: index === 0 ? 54 : 42,
            y: index === 0 ? 40 : 62,
          };
        });
        const post: Post = {
          id: `post-user-${Date.now()}`,
          type: "seller-look",
          bloggerId: "blogger-me",
          productId: payload.productIds?.[0],
          productIds: payload.productIds,
          productTags,
          title: payload.title,
          body: payload.body,
          coverImage: payload.coverImage,
          images: payload.images?.length ? payload.images : [payload.coverImage],
          styleTags: payload.tags,
          likes: 0,
          createdAt: new Date().toISOString(),
          contentFormat: payload.contentFormat ?? "image-post",
          publishDestinations: payload.publishDestinations ?? ["community"],
          externalPublishStatus: payload.externalPublishStatus,
        };

        setState((current) => ({
          ...current,
          posts: [post, ...current.posts],
          products: current.products.map((product) =>
            payload.productIds?.includes(product.id)
              ? {
                  ...product,
                  sourcePostId: product.sourcePostId ?? post.id,
                  sourcePostIds: [post.id, ...(product.sourcePostIds ?? [])],
                }
              : product,
          ),
        }));
        toast.success("图文已发布。");
        return post;
      },
      addProduct(product) {
        setState((current) => ({
          ...current,
          products: [product, ...current.products],
        }));
      },
      publishSellerPost(product, draft) {
        setState((current) => {
          const postId = `post-${product.id}`;
          const nextPost: Post = {
            id: postId,
            type: "seller-look",
            sellerId: product.sellerId,
            bloggerId: seedBloggers[0]?.id,
            productId: product.id,
            productIds: [product.id],
            productTags: [{ productId: product.id, label: product.name, x: 54, y: 42 }],
            title: draft.title,
            body: draft.caption,
            coverImage: draft.modelImage,
            images: [draft.modelImage],
            styleTags: draft.tags,
            likes: 0,
            createdAt: new Date().toISOString(),
            priceLabel: `¥${product.price} 起`,
          };

          return {
            ...current,
            posts: [nextPost, ...current.posts.filter((post) => post.id !== postId)],
            products: current.products.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    sourcePostId: postId,
                    sourcePostIds: [postId, ...(item.sourcePostIds ?? []).filter((id) => id !== postId)],
                  }
                : item,
            ),
          };
        });
      },
      publishBloggerCollabPost(product, blogger) {
        setState((current) => {
          const postId = `post-collab-${blogger.id}-${product.id}-${Date.now()}`;
          const primaryTag = product.tags[0] ?? blogger.styleTags[0] ?? "穿搭";
          const nextPost: Post = {
            id: postId,
            type: "seller-look",
            sellerId: product.sellerId,
            bloggerId: blogger.id,
            productId: product.id,
            productIds: [product.id],
            productTags: [{ productId: product.id, label: product.name, x: 54, y: 40 }],
            title: `${blogger.name} 的 ${primaryTag} 商单穿搭`,
            body: `${blogger.name} 接受商单后，基于 ${product.name} 生成了一套 ${primaryTag} 穿搭。重点是 ${product.tags
              .slice(1)
              .join(" / ")}，用户可以从图片标签直接进入商品。`,
            coverImage: product.tryOnPreset,
            images: [product.tryOnPreset],
            styleTags: [...new Set([primaryTag, ...blogger.styleTags, ...product.tags])].slice(0, 5),
            likes: 0,
            createdAt: new Date().toISOString(),
            priceLabel: `¥${product.price} 起`,
          };

          return {
            ...current,
            posts: [nextPost, ...current.posts],
            products: current.products.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    sourcePostId: item.sourcePostId ?? postId,
                    sourcePostIds: [postId, ...(item.sourcePostIds ?? [])],
                  }
                : item,
            ),
          };
        });
        toast.success(`${blogger.name} 已接受商单，穿搭帖已生成。`);
      },
      submitCollabRequest(request) {
        setState((current) => ({
          ...current,
          collabRequests: [
            {
              ...request,
              id: `collab-${Date.now()}`,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
            ...current.collabRequests,
          ],
        }));
        toast.success("商单样图和帖子信息已发送给商户。");
      },
      approveCollabRequest(requestId) {
        setState((current) => {
          const request = current.collabRequests.find((item) => item.id === requestId);
          const product = request ? current.products.find((item) => item.id === request.productId) : null;

          if (!request || !product) {
            toast.error("商单请求不存在。");
            return current;
          }

          const postId = `post-collab-${request.bloggerId}-${request.productId}-${Date.now()}`;
          const nextPost: Post = {
            id: postId,
            type: "seller-look",
            sellerId: request.sellerId,
            bloggerId: request.bloggerId,
            productId: request.productId,
            productIds: [request.productId],
            productTags: [{ productId: request.productId, label: product.name, x: 54, y: 40 }],
            title: request.title,
            body: request.body,
            coverImage: request.coverImage,
            images: [request.coverImage],
            styleTags: request.tags,
            likes: 0,
            createdAt: new Date().toISOString(),
            priceLabel: `¥${product.price} 起`,
          };

          return {
            ...current,
            collabRequests: current.collabRequests.map((item) =>
              item.id === requestId ? { ...item, status: "approved" } : item,
            ),
            posts: [nextPost, ...current.posts],
            products: current.products.map((item) =>
              item.id === request.productId
                ? {
                    ...item,
                    sourcePostId: item.sourcePostId ?? postId,
                    sourcePostIds: [postId, ...(item.sourcePostIds ?? [])],
                  }
                : item,
            ),
          };
        });
        toast.success("商户已确认合作，带货帖已发布。");
      },
      addRequest(request, post) {
        setState((current) => ({
          ...current,
          requests: [request, ...current.requests],
          posts: [post, ...current.posts],
        }));
      },
      resetDemo() {
        setState(cloneSeedState());
        toast.success("状态已重置。");
      },
    };
  }, [hydrated, state, storageReady, trackView]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);

  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }

  return context;
}
