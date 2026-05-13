/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Heart,
  LoaderCircle,
  Home,
  ImagePlus,
  Lock,
  Package,
  Search,
  Shirt,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UserPlus,
  Wallet,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

import { useDemo } from "@/components/demo-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { buildStyleAnalysis, seedProducts, seedSellers } from "@/lib/seed";
import { cn } from "@/lib/utils";
import type {
  AIStyledPostDraft,
  Blogger,
  CampaignBrief,
  GeneratedContentDraft,
  Post,
  Product,
  ProductRecognitionDraft,
  ProfileSectionKey,
  ProfileVisibility,
  PublishDestination,
  PublishResult,
  PublishStatus,
  RequestPost,
  Seller,
  StyleAnalysis,
} from "@/lib/types";

type AppMode = "creator" | "seller" | "community" | "buyer";

type FollowerProfile = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
};

type ProfileSection = {
  key: ProfileSectionKey;
  title: string;
  count: number;
  content: React.ReactNode;
  emptyLabel: string;
  forceContent?: boolean;
};

const visibilityLabels: Record<ProfileVisibility, string> = {
  public: "公开可见",
  following: "关注的人可见",
  followers: "粉丝可见",
  mutual: "互关可见",
};

const sectionTitles: Record<ProfileSectionKey, string> = {
  likedPosts: "点赞的帖子",
  savedPosts: "收藏的帖子",
  followedBloggers: "关注的博主",
  followedSellers: "关注的商户",
};

const destinationLabels: Record<PublishDestination, string> = {
  community: "我的社区",
  douyin: "抖音",
  "xhs-miniapp": "小红书小程序挂载",
};

const destinationDescriptions: Record<PublishDestination, string> = {
  community: "默认沉淀到站内内容池",
  douyin: "待开放平台应用授权后发布",
  "xhs-miniapp": "通过小程序/商品挂载承接",
};

function formatCurrency(value: number) {
  return `¥${value}`;
}

function buildPublishStatusMap(results: PublishResult[]) {
  return results.reduce<Partial<Record<PublishDestination, PublishStatus>>>(
    (current, result) => ({
      ...current,
      [result.destination]: result.status,
    }),
    {},
  );
}

function getPublishMessage(results: PublishResult[]) {
  return results.map((result) => `${destinationLabels[result.destination]}：${result.message}`).join("\n");
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function resolveSeller(sellers: Seller[], sellerId?: string) {
  return sellers.find((seller) => seller.id === sellerId);
}

function resolveBlogger(bloggers: Blogger[], bloggerId?: string) {
  return bloggers.find((blogger) => blogger.id === bloggerId);
}

function resolveProduct(products: Product[], productId?: string) {
  return products.find((product) => product.id === productId);
}

function getPostProductIds(post?: Post) {
  if (!post) {
    return [];
  }

  return post.productIds?.length ? post.productIds : post.productId ? [post.productId] : [];
}

function getProductPosts(posts: Post[], productId: string) {
  return posts.filter((post) => getPostProductIds(post).includes(productId));
}

function getBloggerPosts(posts: Post[], bloggerId: string) {
  return posts.filter((post) => post.bloggerId === bloggerId);
}

function getSizeGuide(product: Product) {
  return product.sizeGuide?.length
    ? product.sizeGuide
    : product.sizes.map((size, index) => ({
        size,
        shoulder: `${42 + index * 2}cm`,
        chest: `${104 + index * 6}cm`,
        length: `${62 + index * 2}cm`,
      }));
}

function getRecommendedBloggers(product: Product | null, bloggers: Blogger[]) {
  if (!product) {
    return bloggers.slice(0, 3).map((blogger) => ({ blogger, score: 90 }));
  }

  return bloggers
    .map((blogger) => {
      const overlap = blogger.styleTags.filter((tag) => product.tags.includes(tag)).length;
      const score = Math.min(98, 82 + overlap * 6);
      return { blogger, score };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function buildCampaignBriefs(products: Product[], sellers: Seller[], blogger: Blogger | null): CampaignBrief[] {
  return products.slice(0, 8).map((product, index) => {
    const seller = resolveSeller(sellers, product.sellerId);
    const overlap = blogger
      ? blogger.styleTags.filter((tag) => product.tags.includes(tag)).length
      : 1;
    const fitScore = Math.min(98, 76 + overlap * 7 + (index % 4) * 3);
    const suggestedPrice = Math.round((160 + fitScore * 2.2 + index * 18) / 10) * 10;
    const deadline = new Date(Date.now() + (5 + index) * 24 * 60 * 60 * 1000).toISOString();

    return {
      id: `campaign-${product.id}`,
      sellerId: seller?.id ?? product.sellerId,
      productId: product.id,
      deliverables: index % 2 === 0 ? ["AI图文 1组", "短视频脚本 1条"] : ["AI穿搭封面 2张", "图文种草文案"],
      suggestedPrice,
      fitScore,
      deadline,
      status: "open",
    };
  });
}

const hotStyles = ["通勤极简", "高街暗黑", "美式复古", "Clean Fit", "韩系宽松", "针织", "牛仔", "风衣"];

const communityTrends = [
  {
    id: "summer-office",
    title: "初夏通勤穿搭灵感",
    count: 8232,
    tone: "🔥",
    tags: ["通勤极简", "Clean Fit", "沙色西装"],
    summary: [
      "初夏通勤的重点不是正式，而是轻、干净、能直接从办公室切到咖啡店。低饱和西装、浅色内搭和利落裤装是这个趋势的核心。",
      "社区里这类内容的成交路径很短：用户先收藏穿搭公式，再从图片 tag 或同款小条进入商品试穿。",
    ],
  },
  {
    id: "denim-guide",
    title: "牛仔单品百搭指南",
    count: 6114,
    tone: "🌿",
    tags: ["美式复古", "水洗牛仔", "咖啡店穿搭"],
    summary: [
      "浅水洗牛仔正在从复古单品变成日常基础款，白T、深色直筒裤和棕色配件是最稳定的组合。",
      "这一趋势下的商品更适合用博主 OOTD 做信任入口，买家需要看到真实穿搭氛围，而不是只看平铺图。",
    ],
  },
  {
    id: "light-layer",
    title: "薄外套叠穿公式",
    count: 5077,
    tone: "💧",
    tags: ["风衣", "橄榄风衣", "韩系宽松", "象牙针织"],
    summary: [
      "薄外套叠穿解决的是早晚温差和层次感问题，橄榄风衣、象牙针织和低对比色搭配最容易被复刻。",
      "适合把商品放进相似风格推荐里承接需求，用户不一定买同款，但会沿着相同风格继续找。",
    ],
  },
];

function postMatchesTags(post: Post, tags: string[]) {
  if (tags.length === 0) {
    return true;
  }

  return tags.some((tag) => post.styleTags.includes(tag) || post.title.includes(tag) || post.body.includes(tag));
}

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase();
}

function textMatchesQuery(values: Array<string | undefined>, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return true;
  }

  return values.some((value) => normalizeSearchText(value ?? "").includes(normalizedQuery));
}

function getCurrentUserFollowers(bloggers: Blogger[]) {
  const bloggerFollowers: FollowerProfile[] = bloggers
    .filter((blogger) => blogger.id !== "blogger-me")
    .map((blogger) => ({
      id: blogger.id,
      name: blogger.name,
      avatar: blogger.avatar,
      bio: `穿搭博主 · ${blogger.styleTags.slice(0, 2).join(" / ")}`,
    }));
  const generatedFollowers: FollowerProfile[] = Array.from({ length: 1204 }, (_, index) => {
    const serial = index + 1;
    return {
      id: `user-follower-${serial}`,
      name: `市集粉丝 ${serial.toString().padStart(4, "0")}`,
      avatar: `F${serial % 10}`,
      bio: serial % 3 === 0 ? "关注通勤穿搭和 AI 试衣" : serial % 3 === 1 ? "喜欢 OOTD 和同款找衣" : "收藏 clean fit 灵感",
    };
  });

  return [...bloggerFollowers, ...generatedFollowers];
}

function FollowerMiniCard({ follower }: { follower: FollowerProfile }) {
  return (
    <div className="rounded-[22px] border border-border/70 bg-white p-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-12 border border-border/70 bg-secondary">
          <AvatarFallback>{follower.avatar}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{follower.name}</p>
          <p className="line-clamp-1 text-sm text-muted-foreground">{follower.bio}</p>
        </div>
      </div>
    </div>
  );
}

function readImageFiles(files: FileList | File[]) {
  return Promise.all(
    Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
  );
}

function LocalImageUploader({
  label,
  images,
  onChange,
  multiple = true,
}: {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(files: FileList | File[]) {
    const nextImages = await readImageFiles(files);
    if (!nextImages.length) {
      toast.error("请选择图片文件。");
      return;
    }
    onChange(multiple ? [...images, ...nextImages].slice(0, 9) : [nextImages[0]]);
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void addFiles(event.dataTransfer.files);
        }}
        className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-[26px] border border-dashed border-border bg-secondary/30 px-5 py-8 text-center transition hover:bg-secondary/60"
      >
        <ImagePlus className="size-8" />
        <div>
          <p className="font-semibold">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">拖动图片到这里，或点击上传本地图片。</p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            void addFiles(event.target.files);
          }
          event.currentTarget.value = "";
        }}
      />
      {images.length ? (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-[18px] border border-border/70">
              <img src={image} alt={`上传图片 ${index + 1}`} className="h-28 w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, imageIndex) => imageIndex !== index))}
                className="absolute right-2 top-2 rounded-full bg-primary/90 px-2 py-1 text-xs text-primary-foreground opacity-0 transition group-hover:opacity-100"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AppHeader({ mode }: { mode: AppMode }) {
  const pathname = usePathname();
  const isSeller = mode === "seller";
  const [publishOpen, setPublishOpen] = useState(false);
  const creatorNav = [
    { href: "/campaigns", label: "商单广场" },
    { href: "/creator", label: "AI内容台" },
    { href: "/products", label: "商城" },
    { href: "/community", label: "我的社区" },
  ];
  const sellerNav = [
    { href: "/seller", label: "商户工作台" },
    { href: "/seller/products", label: "商品" },
    { href: "/community", label: "内容社区" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/92 backdrop-blur-xl">
      <div className="page-shell grid items-center gap-4 py-4 lg:grid-cols-[220px_minmax(180px,1fr)_minmax(520px,max-content)] xl:grid-cols-[250px_minmax(260px,1fr)_minmax(620px,max-content)]">
        <div className="flex items-center gap-3">
          <div>
            <Link href="/" className="font-heading text-4xl leading-none tracking-[-0.05em]">
              Jasmine
            </Link>
            <p className="mt-1 text-xs tracking-[0.18em] text-muted-foreground">
              {isSeller ? "商户端 · 商品识别与商单合作" : "博主端 · AI内容与变现工作台"}
            </p>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-8 text-sm md:flex">
          {(isSeller ? sellerNav : creatorNav).map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-1 py-2 text-muted-foreground transition hover:text-foreground",
                  active &&
                    "font-semibold text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-2 xl:gap-3">
          {!isSeller ? (
            <>
              <Dialog open={publishOpen} onOpenChange={setPublishOpen}>
                <Button className="hidden bg-primary px-5 md:inline-flex" onClick={() => setPublishOpen(true)}>
                  <Sparkles data-icon="inline-start" />
                  发布
                </Button>
                <DialogContent className="max-w-md rounded-[28px] p-0">
                  <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-3xl">发布内容</DialogTitle>
                    <DialogDescription>选择发布类型，图文发布支持多图上传，AI 生成统一进入试衣间。</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 px-6 pb-6">
                    <Link
                      href="/creator"
                      onClick={() => setPublishOpen(false)}
                      className="rounded-[24px] border border-border/70 p-4 transition hover:bg-secondary/50"
                    >
                      <p className="text-xl font-semibold">AI 图文</p>
                      <p className="mt-1 text-sm text-muted-foreground">生成草稿 / 商单广场 / 多平台发布包。</p>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setPublishOpen(false);
                        window.location.href = "/creator?format=video-script";
                      }}
                      className="rounded-[24px] border border-border/70 p-4 text-left transition hover:bg-secondary/50"
                    >
                      <p className="text-xl font-semibold">短视频脚本</p>
                      <p className="mt-1 text-sm text-muted-foreground">生成封面、脚本和平台发布清单。</p>
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : null}

          <Link href={isSeller ? "/" : "/seller"} className={cn(buttonVariants({ variant: "outline" }), "hidden h-11 shrink-0 rounded-full px-4 lg:inline-flex")}>
            {isSeller ? <Home data-icon="inline-start" /> : <Store data-icon="inline-start" />}
            {isSeller ? "选择入口" : "商户端"}
          </Link>
          <StatusSheet mode={mode} />
        </div>
      </div>
    </header>
  );
}

function LayoutFrame({
  title,
  actions,
  mode = "creator",
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  mode?: AppMode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-12">
      <AppHeader mode={mode} />
      <main className="page-shell pt-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl leading-none sm:text-4xl">{title}</h1>
          {actions ? <div className="flex flex-wrap gap-3 lg:justify-end">{actions}</div> : null}
        </div>
        {children}
      </main>
    </div>
  );
}

function StatusSheet({ mode }: { mode: AppMode }) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline">
              <Wallet data-icon="inline-start" />
              状态
            </Button>
          }
        />
        <SheetContent side="right" className="w-[92vw] max-w-md overflow-y-auto p-0">
          <SheetHeader className="border-b border-border/70">
            <SheetTitle>当前状态</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <StatusRail mode={mode} compact />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatusRail({ mode, compact = false }: { mode: AppMode; compact?: boolean }) {
  const { state } = useDemo();
  const totalRevenue = state.sellers.reduce((sum, seller) => sum + seller.revenue, 0);

  if (mode === "seller") {
    return (
      <div className={cn("flex flex-col gap-4", compact && "gap-3")}>
        <Card className="soft-panel border-0 bg-white/92 shadow-none">
          <CardHeader>
            <CardTitle>商户工作台</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[22px] bg-primary px-5 py-4 text-primary-foreground">
              <p className="text-sm opacity-80">累计收入</p>
              <p className="mt-2 text-4xl font-semibold">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MetricCard label="商品数" value={state.products.length.toString()} />
              <MetricCard label="穿搭帖" value={state.posts.filter((post) => post.type === "seller-look").length.toString()} />
            </div>
          </CardContent>
          <CardFooter className="bg-transparent">
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              切回用户
            </Link>
          </CardFooter>
        </Card>

        <Card className="soft-panel border-0 bg-white/92 shadow-none">
          <CardHeader>
            <CardTitle>商户收入</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {state.sellers.map((seller) => (
              <div
                key={seller.id}
                className="flex items-center justify-between rounded-lg border border-border/70 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">{seller.styleFocus}</p>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(seller.revenue)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", compact && "gap-3")}>
        <Card className="soft-panel border-0 bg-white/92 shadow-none">
        <CardHeader>
          <CardTitle>博主变现状态</CardTitle>
          </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-[22px] bg-primary px-5 py-4 text-primary-foreground">
            <p className="text-sm opacity-80">内容资产</p>
            <p className="mt-2 text-4xl font-semibold">{state.posts.filter((post) => post.bloggerId === "blogger-me").length}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="关注博主" value={state.viewer.followedBloggerIds.length.toString()} />
            <MetricCard label="点赞帖子" value={state.viewer.likedPostIds.length.toString()} />
            <MetricCard label="购物车" value={state.viewer.cartProductIds.length.toString()} />
            <MetricCard label="商单商品" value={state.products.length.toString()} />
          </div>
        </CardContent>
      </Card>

      <Card className="soft-panel border-0 bg-white/92 shadow-none">
        <CardHeader>
          <CardTitle>平台发布状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {(["community", "douyin", "xhs-miniapp"] as PublishDestination[]).map((destination) => (
              <div key={destination} className="rounded-2xl border border-border/70 px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{destinationLabels[destination]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{destinationDescriptions[destination]}</p>
                  </div>
                  <Badge variant={destination === "community" ? "default" : "secondary"}>
                    {destination === "community" ? "可发布" : "待配置"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  const content = (
    <>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-left transition hover:bg-secondary/50"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card px-4 py-3">
      {content}
    </div>
  );
}

export function LandingPage() {
  const { state, hydrated } = useDemo();
  const currentBlogger = resolveBlogger(state.bloggers, "blogger-me") ?? state.bloggers[0];
  const campaignCount = Math.min(state.products.length, 8);
  const communityPosts = state.posts.filter((post) => post.publishDestinations?.includes("community") || post.bloggerId === "blogger-me").length;

  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  return (
    <main className="min-h-screen">
      <section className="page-shell grid min-h-screen items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <div>
            <p className="editorial-kicker">Jasmine MVP</p>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              AI 内容生产和商单合作，从第一天服务变现。
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              为穿搭博主、自媒体工作者和服饰商家搭建一条短链路：快速生成可发布内容，展示商业潜力，匹配商品和商单。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="可接商单" value={campaignCount.toString()} />
            <MetricCard label="商城商品" value={state.products.length.toString()} />
            <MetricCard label="社区沉淀" value={communityPosts.toString()} />
          </div>
        </div>

        <div className="grid gap-5">
          <Link
            href="/campaigns"
            className="group overflow-hidden rounded-[28px] border border-border/70 bg-white/96 shadow-[0_18px_50px_-34px_rgba(49,40,27,0.6)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-38px_rgba(49,40,27,0.72)]"
          >
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <img src={currentBlogger?.coverImage ?? seedProducts[0].tryOnPreset} alt="博主内容工作台" className="h-72 w-full object-cover md:h-full" />
              <div className="space-y-5 p-6">
                <Badge>博主端</Badge>
                <div>
                  <h2 className="text-4xl">AI 内容与商单广场</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    先从商单广场挑选合作，再生成穿搭图文、短视频脚本和平台发布包。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AI 图文</Badge>
                  <Badge variant="secondary">短视频脚本</Badge>
                  <Badge variant="secondary">商单匹配</Badge>
                </div>
                <span className={cn(buttonVariants(), "rounded-full")}>
                  进入博主端 <ArrowRight data-icon="inline-end" />
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/seller"
            className="group overflow-hidden rounded-[28px] border border-border/70 bg-[#28231f] text-white shadow-[0_18px_50px_-34px_rgba(49,40,27,0.6)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-38px_rgba(49,40,27,0.72)]"
          >
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5 p-6">
                <Badge className="bg-white text-[#28231f] hover:bg-white">商户端</Badge>
                <div>
                  <h2 className="text-4xl">商品识别与合作发布</h2>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    上传商品图自动生成上架草稿，一键进入商城，并把商品转成商单 brief 和 AI 内容素材。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">商品识别</Badge>
                  <Badge variant="secondary">一键上架</Badge>
                  <Badge variant="secondary">博主推荐</Badge>
                </div>
                <span className={cn(buttonVariants({ variant: "secondary" }), "rounded-full")}>
                  进入商户端 <ArrowRight data-icon="inline-end" />
                </span>
              </div>
              <img src={state.products[0]?.image ?? seedProducts[0].image} alt="商户商品工作台" className="h-72 w-full object-cover md:h-full" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeedPostCard({ post, index }: { post: Post; index: number }) {
  const { state, toggleLike, toggleBloggerFollow } = useDemo();
  const seller = resolveSeller(state.sellers, post.sellerId);
  const blogger = resolveBlogger(state.bloggers, post.bloggerId);
  const isLiked = state.viewer.likedPostIds.includes(post.id);
  const isFollowed = blogger ? state.viewer.followedBloggerIds.includes(blogger.id) : false;
  const href = post.type === "seller-look" ? `/posts/${post.id}` : "/creator";
  const imageHeights = ["h-[310px]", "h-[390px]", "h-[280px]", "h-[350px]", "h-[430px]", "h-[300px]"];
  const attachedProduct = getPostProductIds(post)
    .map((id) => resolveProduct(state.products, id))
    .find((product): product is Product => Boolean(product));
  const request = post.requestId ? state.requests.find((item) => item.id === post.requestId) : null;

  if (post.type === "buyer-request") {
    const offerProducts = request?.matchedOffers
      .map((offer) => resolveProduct(state.products, offer.productId))
      .filter((product): product is Product => Boolean(product))
      .slice(0, 4) ?? [];

    return (
      <article className="relative mb-5 flex aspect-square break-inside-avoid flex-col overflow-hidden rounded-[26px] border border-dashed border-[#d9a47d] bg-[#fff8ef] p-4 shadow-[0_18px_46px_-34px_rgba(132,82,42,0.65)] transition hover:-translate-y-0.5">
        <div className="absolute -left-4 top-1/2 size-8 -translate-y-1/2 rounded-full bg-background" />
        <div className="absolute -right-4 top-1/2 size-8 -translate-y-1/2 rounded-full bg-background" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-[#ef7d3a] text-white hover:bg-[#ef7d3a]">求助贴</Badge>
              <span className="text-xs text-muted-foreground">{post.priceLabel ?? "预算待定"}</span>
            </div>
            <Link href={href}>
              <h3 className="line-clamp-2 text-xl leading-tight">{post.title}</h3>
            </Link>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.body}</p>
          </div>
          <Avatar className="size-10 shrink-0 border border-[#e8c7a8] bg-white">
            <AvatarFallback>求</AvatarFallback>
          </Avatar>
        </div>
        <div className="relative mt-4 grid flex-1 grid-cols-2 gap-2 overflow-hidden">
          {(offerProducts.length ? offerProducts : [{ id: post.id, image: post.coverImage, name: post.title } as Product]).map((product, productIndex) => (
            <Link
              key={`${product.id}-${productIndex}`}
              href={product.id === post.id ? href : `/products/${product.id}`}
              className="relative min-h-0 overflow-hidden rounded-[16px] border border-white bg-white"
            >
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {productIndex === 0 ? (
                <span className="absolute bottom-1 left-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px]">求购需求</span>
              ) : null}
            </Link>
          ))}
        </div>
        <div className="relative mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button type="button" onClick={() => toggleLike(post.id)} className="inline-flex items-center gap-1 hover:text-foreground">
              <Heart className={cn("size-4", isLiked && "fill-current text-[#ef7d3a]")} />
              {post.likes}
            </button>
            <span className="text-xs">响应 {request?.matchedOffers.length ?? 0}</span>
          </div>
          <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-[#9e6f48] text-[#744f31] hover:bg-[#fff1df]")}>
            帮我找
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="mb-5 break-inside-avoid overflow-hidden rounded-[22px] border border-border/70 bg-white shadow-[0_14px_36px_-28px_rgba(49,40,27,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-30px_rgba(49,40,27,0.48)]">
      <Link href={href} className="relative block bg-secondary">
        <img
          src={post.coverImage}
          alt={post.title}
          className={cn("w-full object-cover", imageHeights[index % imageHeights.length])}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary">AI 穿搭</Badge>
          {attachedProduct ? (
            <Badge className="bg-white/90 text-foreground hover:bg-white/90">{formatCurrency(attachedProduct.price)}</Badge>
          ) : null}
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <Link href={href}>
          <h3 className="line-clamp-2 text-base font-semibold leading-6">{post.title}</h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{post.body}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.styleTags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full px-2.5 py-0.5 text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <Link href={blogger?.id === "blogger-me" ? "/me" : blogger ? `/bloggers/${blogger.id}` : href} className="flex min-w-0 items-center gap-2">
            <Avatar className="size-8 border border-border/70 bg-secondary">
              <AvatarFallback>{blogger?.avatar ?? seller?.avatar ?? "穿"}</AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">{blogger?.name ?? seller?.name ?? "穿搭用户"}</span>
          </Link>
          {blogger ? (
            <button
              type="button"
              onClick={() => toggleBloggerFollow(blogger.id)}
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-1 text-xs transition",
                isFollowed ? "border-primary bg-primary text-primary-foreground" : "border-border/70 text-muted-foreground hover:text-foreground",
              )}
            >
              {isFollowed ? "已关注" : "关注"}
            </button>
          ) : null}
        </div>
        <div className="flex items-center justify-between border-t border-border/60 pt-3 text-sm text-muted-foreground">
          <button type="button" onClick={() => toggleLike(post.id)} className="inline-flex items-center gap-1 transition hover:text-foreground">
            <Heart className={cn("size-4", isLiked && "fill-current text-foreground")} />
            {post.likes}
          </button>
          <div className="flex items-center gap-2">
            <span>评论 {Math.max(12, Math.round(post.likes / 8))}</span>
            <Link href={attachedProduct ? `/products/${attachedProduct.id}` : href} className="font-medium text-foreground hover:underline">
              看同款
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function SimilarProductList({
  products,
  sort,
  onSortChange,
}: {
  products: Product[];
  sort: string;
  onSortChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="editorial-kicker">Similar Picks</p>
          <h3 className="text-3xl">相似商品推荐</h3>
        </div>
        <ToggleGroup
          value={[sort]}
          onValueChange={(value) => value[0] && onSortChange(value[0])}
        >
          <ToggleGroupItem value="similarity">相似度</ToggleGroupItem>
          <ToggleGroupItem value="price">价格</ToggleGroupItem>
          <ToggleGroupItem value="value">性价比</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="soft-panel border-0 bg-white/94 shadow-none">
            <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.similarityReason}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">价格</span>
                <span className="font-semibold">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">库存</span>
                <span className="font-semibold">{product.stock}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between gap-3 bg-transparent">
              <Badge>{product.similarityScore}% 相似度</Badge>
              <Link href={`/products/${product.id}`} className={cn(buttonVariants({ variant: "outline" }))}>
                查看商品
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductSideSection({
  title,
  products,
  emptyLabel,
}: {
  title: string;
  products: Product[];
  emptyLabel: string;
}) {
  return (
    <Card className="soft-panel border-0 bg-white/96 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {products.length ? (
          products.slice(0, 5).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 rounded-[20px] border border-border/70 bg-white p-2 transition hover:-translate-y-0.5 hover:bg-secondary/40"
            >
              <img src={product.image} alt={product.name} className="h-24 w-full rounded-[16px] object-cover" />
              <div className="min-w-0 py-1">
                <p className="line-clamp-2 text-sm font-semibold leading-5">{product.name}</p>
                <p className="mt-1 text-base font-semibold">{formatCurrency(product.price)}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{product.similarityReason}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState label={emptyLabel} />
        )}
      </CardContent>
    </Card>
  );
}

function ProductGridCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-lg border border-border/70 bg-white shadow-[0_14px_36px_-28px_rgba(49,40,27,0.42)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-30px_rgba(49,40,27,0.48)]"
    >
      <img src={product.image} alt={product.name} className="h-72 w-full object-cover" />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="line-clamp-2 font-semibold leading-6">{product.name}</p>
          <p className="shrink-0 text-lg font-semibold">{formatCurrency(product.price)}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{product.similarityReason}</p>
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function ProductCatalogPage({ mode = "creator" }: { mode?: AppMode }) {
  const { state, hydrated } = useDemo();
  const cartProducts = state.products.filter((product) => state.viewer.cartProductIds.includes(product.id));

  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  return (
    <LayoutFrame
      mode={mode}
      title={mode === "seller" ? "商品" : "商城"}
      actions={
        mode === "seller" ? (
          <Link href="/seller" className={cn(buttonVariants({ variant: "default" }))}>
            <Store data-icon="inline-start" />
            上架商品
          </Link>
        ) : (
          <div className="flex flex-wrap gap-3">
            <a href="#cart" className={cn(buttonVariants({ variant: "default" }))}>
              <ShoppingCart data-icon="inline-start" />
              购物车 {cartProducts.length}
            </a>
          </div>
        )
      }
    >
      {mode !== "seller" ? (
        <a
          href="#cart"
          className="fixed bottom-8 right-8 z-20 hidden size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_42px_-18px_rgba(49,40,27,0.55)] transition hover:-translate-y-1 lg:flex"
          aria-label="进入购物车"
        >
          <ShoppingCart />
          <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary">
            {cartProducts.length}
          </span>
        </a>
      ) : null}

      <section className={cn("grid gap-6", mode !== "seller" && "xl:grid-cols-[minmax(0,1fr)_360px]")}>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {state.products.map((product) => (
            <ProductGridCard key={product.id} product={product} />
          ))}
        </div>

        {mode !== "seller" ? (
          <aside className="space-y-5">
            <Card id="cart" className="soft-panel border-0 bg-white/96 shadow-none xl:sticky xl:top-24">
              <CardHeader>
                <CardTitle>购物车</CardTitle>
                <p className="text-sm text-muted-foreground">从商品页加入的商品会出现在这里。</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {cartProducts.length > 0 ? (
                  cartProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-[18px] border border-border/70 p-3 transition hover:bg-secondary/40"
                    >
                      <img src={product.image} alt={product.name} className="h-20 w-full rounded-[14px] object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{product.name}</p>
                        <p className="mt-1 text-sm font-semibold">{formatCurrency(product.price)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">库存 {product.stock} · 尺码 {product.sizes.join(" / ")}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <EmptyState label="购物车为空。进入商品页可加入购物车。" />
                )}
              </CardContent>
            </Card>
          </aside>
        ) : null}
      </section>
    </LayoutFrame>
  );
}

export function SellerPostsPage() {
  const { state, hydrated } = useDemo();
  const posts = state.posts.filter((post) => post.type === "seller-look");

  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  return (
    <LayoutFrame
      mode="seller"
      title="社区"
      actions={
        <Link href="/seller" className={cn(buttonVariants({ variant: "default" }))}>
          <Sparkles data-icon="inline-start" />
          生成帖子
        </Link>
      }
    >
      <section className="columns-2 gap-5 md:columns-3 xl:columns-4">
        {posts.map((post, index) => (
          <FeedPostCard key={post.id} post={post} index={index} />
        ))}
      </section>
    </LayoutFrame>
  );
}

function PostMiniCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.type === "seller-look" ? `/posts/${post.id}` : "/creator"}
      className="break-inside-avoid overflow-hidden rounded-[22px] border border-border/70 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-32px_rgba(49,40,27,0.45)]"
    >
      <img src={post.coverImage} alt={post.title} className="h-56 w-full object-cover" />
      <div className="space-y-2 p-3">
        <p className="line-clamp-2 font-semibold leading-6">{post.title}</p>
        <div className="flex flex-wrap gap-1.5">
          {post.styleTags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="overflow-hidden rounded-[22px] border border-border/70 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-32px_rgba(49,40,27,0.45)]"
    >
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      <div className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-3">
          <p className="line-clamp-2 font-semibold leading-6">{product.name}</p>
          <span className="shrink-0 text-sm font-semibold">{formatCurrency(product.price)}</span>
        </div>
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{product.similarityReason}</p>
      </div>
    </Link>
  );
}

function BloggerMiniCard({ blogger }: { blogger: Blogger }) {
  return (
    <Link href={`/bloggers/${blogger.id}`} className="rounded-[22px] border border-border/70 bg-white p-4 transition hover:bg-secondary/40">
      <div className="flex items-center gap-3">
        <Avatar className="size-12 border border-border/70 bg-secondary">
          <AvatarFallback>{blogger.avatar}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{blogger.name}</p>
          <p className="line-clamp-1 text-sm text-muted-foreground">{blogger.bio}</p>
        </div>
      </div>
    </Link>
  );
}

function SellerMiniCard({ seller }: { seller: Seller }) {
  return (
    <div className="rounded-[22px] border border-border/70 bg-white p-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-12 border border-border/70 bg-secondary">
          <AvatarFallback>{seller.avatar}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{seller.name}</p>
          <p className="line-clamp-1 text-sm text-muted-foreground">{seller.bio}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileSectionCard({
  section,
  visibility,
}: {
  section: ProfileSection;
  visibility?: ProfileVisibility;
}) {
  return (
    <Card className="soft-panel border-0 bg-white/96 shadow-none">
      <CardHeader className="flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-3xl">{section.title}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{section.count} 项</p>
        </div>
        {visibility ? <Badge variant="secondary">{visibilityLabels[visibility]}</Badge> : null}
      </CardHeader>
      <CardContent>
        {section.forceContent || section.count > 0 ? section.content : <EmptyState label={section.emptyLabel} />}
      </CardContent>
    </Card>
  );
}

function ProfilePageShell({
  title,
  avatar,
  name,
  subtitle,
  actions,
  profileAction,
  stats,
  sections,
  visibility,
  sideRail,
}: {
  title: string;
  avatar: string;
  name: string;
  subtitle: string;
  actions?: React.ReactNode;
  profileAction?: React.ReactNode;
  stats: { label: string; value: string; onClick?: () => void }[];
  sections: ProfileSection[];
  visibility?: Record<ProfileSectionKey, ProfileVisibility>;
  sideRail?: React.ReactNode;
}) {
  return (
    <LayoutFrame title={title} actions={actions}>
      <section className={cn("grid gap-6", sideRail ? "lg:grid-cols-[320px_minmax(0,1fr)_42px]" : "lg:grid-cols-[320px_minmax(0,1fr)]")}>
        <Card className="soft-panel h-fit overflow-hidden border-0 bg-white/96 shadow-none lg:sticky lg:top-24">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="size-16 border border-border/70 bg-secondary">
                <AvatarFallback>{avatar}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate">{name}</CardTitle>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
              {profileAction ? <div className="shrink-0">{profileAction}</div> : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <MetricCard key={stat.label} label={stat.label} value={stat.value} onClick={stat.onClick} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {sections.map((section) => (
            <div key={`${section.key}-${section.title}`} className="animate-in fade-in-0 slide-in-from-bottom-3 duration-300">
              <ProfileSectionCard
                section={section}
                visibility={visibility?.[section.key]}
              />
            </div>
          ))}
        </div>
        {sideRail ? <aside className="hidden lg:block">{sideRail}</aside> : null}
      </section>
    </LayoutFrame>
  );
}

export function BloggerDetailPage({ bloggerId }: { bloggerId: string }) {
  const { state, hydrated, toggleBloggerFollow, trackView } = useDemo();
  const blogger = resolveBlogger(state.bloggers, bloggerId);
  const posts = blogger ? getBloggerPosts(state.posts, blogger.id) : [];
  const bloggerProductIds = new Set(posts.flatMap((post) => getPostProductIds(post)));
  const products = state.products.filter((product) => bloggerProductIds.has(product.id));
  const sellers = state.sellers.filter((seller) =>
    posts.some((post) => post.sellerId === seller.id),
  );
  const relatedBloggers = blogger
    ? state.bloggers.filter(
        (item) =>
          item.id !== blogger.id &&
          item.styleTags.some((tag) => blogger.styleTags.includes(tag)),
      )
    : [];

  useEffect(() => {
    if (bloggerId) {
      trackView(`blogger:${bloggerId}`);
    }
  }, [bloggerId, trackView]);

  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  if (!blogger) {
    return <MissingScreen title="博主不存在" description="回社区重新选择一个穿搭博主。" />;
  }

  const followed = state.viewer.followedBloggerIds.includes(blogger.id);
  const receivedLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <ProfilePageShell
      title={blogger.name}
      avatar={blogger.avatar}
      name={blogger.name}
      subtitle="访客视角 · 穿搭博主"
      profileAction={
        <Button size="sm" variant={followed ? "default" : "outline"} onClick={() => toggleBloggerFollow(blogger.id)}>
          <UserPlus data-icon="inline-start" />
          {followed ? "已关注" : "关注"}
        </Button>
      }
      stats={[
        { label: "关注", value: relatedBloggers.length.toString() },
        { label: "粉丝", value: blogger.followerCount.toString() },
        { label: "帖子数", value: posts.length.toString() },
        { label: "收到点赞", value: receivedLikes.toString() },
      ]}
      sections={[
        {
          key: "likedPosts",
          title: "TA 的帖子",
          count: posts.length,
          emptyLabel: "这个博主还没有公开帖子。",
          content: (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <PostMiniCard key={post.id} post={post} />
              ))}
            </div>
          ),
        },
        {
          key: "savedPosts",
          title: "穿搭商品",
          count: products.length,
          emptyLabel: "还没有关联商品。",
          content: (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductMiniCard key={product.id} product={product} />
              ))}
            </div>
          ),
        },
        {
          key: "followedBloggers",
          title: "相似博主",
          count: relatedBloggers.length,
          emptyLabel: "暂时没有相似博主。",
          content: (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedBloggers.map((item) => (
                <BloggerMiniCard key={item.id} blogger={item} />
              ))}
            </div>
          ),
        },
        {
          key: "followedSellers",
          title: "合作商户",
          count: sellers.length,
          emptyLabel: "还没有合作商户。",
          content: (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sellers.map((seller) => (
                <SellerMiniCard key={seller.id} seller={seller} />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}

export function CommunityPage() {
  const { state, hydrated } = useDemo();
  const [feedTab, setFeedTab] = useState("all");
  const communityPosts = [...state.posts]
    .filter((post) => post.publishDestinations?.includes("community") || post.type === "seller-look")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const myPosts = communityPosts.filter((post) => post.bloggerId === "blogger-me");
  const sellerPosts = communityPosts.filter((post) => post.sellerId);
  const feed = feedTab === "mine" ? myPosts : feedTab === "seller" ? sellerPosts : communityPosts;

  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  return (
    <LayoutFrame
      mode="community"
      title="我的社区"
      actions={
        <>
          <Link href="/creator" className={cn(buttonVariants({ variant: "default" }))}>
            <Sparkles data-icon="inline-start" />
            生成内容
          </Link>
          <Link href="/seller" className={cn(buttonVariants({ variant: "outline" }))}>
            <Store data-icon="inline-start" />
            商户端
          </Link>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ToggleGroup
              value={[feedTab]}
              onValueChange={(value) => value[0] && setFeedTab(value[0])}
              className="rounded-full bg-secondary/70 p-1"
            >
              <ToggleGroupItem value="all" className="rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                全部沉淀
              </ToggleGroupItem>
              <ToggleGroupItem value="mine" className="rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                我的内容
              </ToggleGroupItem>
              <ToggleGroupItem value="seller" className="rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                商户内容
              </ToggleGroupItem>
            </ToggleGroup>
            <Badge variant="secondary">社区暂作为默认发布沉淀，不做主增长入口</Badge>
          </div>
          {feed.length ? (
            <div className="columns-1 gap-5 md:columns-2 2xl:columns-3">
              {feed.map((post, index) => (
                <FeedPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState label="还没有内容。去博主端生成第一条 AI 内容。" />
          )}
        </div>
        <aside className="hidden xl:block">
          <StatusRail mode="community" />
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function FeedPage() {
  const { state, hydrated } = useDemo();
  const pathname = usePathname();
  const [feedTab, setFeedTab] = useState("recommend");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const activeTags = selectedStyle ? [selectedStyle] : [];

  function updateHash(hash: string) {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", hash ? `${pathname}${hash}` : pathname);
    }
  }

  function selectStyle(style: string) {
    setSelectedStyle(style);
    updateHash(`#style-${encodeURIComponent(style)}`);
  }

  function clearFeedFilter() {
    setSelectedStyle(null);
    updateHash("");
  }

  const sorted = [...state.posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter((post) => {
      if (activeTags.length === 0) {
        return true;
      }

      return postMatchesTags(post, activeTags);
    });
  const followedFeed = sorted.filter(
    (post) =>
      (post.bloggerId && state.viewer.followedBloggerIds.includes(post.bloggerId)) ||
      (post.sellerId && state.viewer.followedSellerIds.includes(post.sellerId)),
  );
  const feed =
    feedTab === "latest"
      ? sorted
      : feedTab === "following"
        ? followedFeed.length ? followedFeed : sorted.slice(0, 4)
        : [...sorted].sort((left, right) => {
            const typeWeight = (post: Post) => (post.type === "buyer-request" ? 0.92 : 1);
            const leftScore = left.likes * typeWeight(left) + new Date(left.createdAt).getTime() / 100000000000;
            const rightScore = right.likes * typeWeight(right) + new Date(right.createdAt).getTime() / 100000000000;
            return rightScore - leftScore;
          });
  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  return (
    <div className="min-h-screen pb-12">
      <AppHeader mode="buyer" />
      <main className="page-shell grid gap-6 pt-6 xl:grid-cols-[250px_minmax(0,1fr)_360px]">
        <aside className="space-y-5 xl:sticky xl:top-28 xl:h-fit">
          <Card className="rounded-[20px] border border-border/70 bg-white/96 shadow-[0_18px_46px_-36px_rgba(49,40,27,0.45)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Search className="size-5" />
                小红书解析
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-[14px] border border-border/70 bg-background px-3 py-3 text-xs text-muted-foreground">
                https://www.xiaohongshu.com/...
              </div>
              <Link href="/analyze" className={cn(buttonVariants({ variant: "default" }), "w-full bg-[#59623a] hover:bg-[#4b5430]")}>
                开始解析 <ArrowRight data-icon="inline-end" />
              </Link>
              <p className="text-xs text-muted-foreground">AI 提取穿搭与商品，快速发布。</p>
            </CardContent>
          </Card>

          <Card className="rounded-[20px] border border-border/70 bg-white/96 shadow-[0_18px_46px_-36px_rgba(49,40,27,0.45)]">
            <CardHeader className="flex-row items-center justify-between gap-3">
              <CardTitle className="text-xl">热门风格</CardTitle>
              {selectedStyle ? (
                <button
                  type="button"
                  onClick={clearFeedFilter}
                  className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  清除
                </button>
              ) : null}
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {hotStyles.map((style) => (
                <a
                  key={style}
                  href={`#style-${encodeURIComponent(style)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    selectStyle(style);
                  }}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm transition",
                    selectedStyle === style
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  {style}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[20px] border border-border/70 bg-white/96 shadow-[0_18px_46px_-36px_rgba(49,40,27,0.45)]">
            <CardHeader>
              <CardTitle className="text-xl">社区趋势</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {communityTrends.map((trend, index) => (
                <Link
                  key={trend.id}
                  href={`/trends/${trend.id}`}
                  className="flex items-center justify-between rounded-[14px] border-b border-border/60 px-2 py-2 transition last:border-b-0 hover:bg-secondary/50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{index + 1}. {trend.tone} {trend.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{trend.count} 人在看</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              ))}
              <Link href="/trends/summer-office" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                查看全部趋势 <ArrowRight className="ml-1 size-4" />
              </Link>
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ToggleGroup
              value={[feedTab]}
              onValueChange={(value) => value[0] && setFeedTab(value[0])}
              className="rounded-full bg-secondary/70 p-1"
            >
              <ToggleGroupItem value="recommend" className="rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                推荐
              </ToggleGroupItem>
              <ToggleGroupItem value="latest" className="rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                最新
              </ToggleGroupItem>
              <ToggleGroupItem value="following" className="rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                关注
              </ToggleGroupItem>
            </ToggleGroup>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => toast.info("当前展示全部类型，后续可接入 AI 风格筛选。")}
            >
              全部类型 <ChevronRight className="size-4 rotate-90" />
            </Button>
          </div>
          {selectedStyle ? (
            <div className="rounded-[18px] border border-border/70 bg-white/92 px-4 py-3 text-sm">
              <span>
                正在查看 <span className="font-semibold">{selectedStyle}</span> 相关社区内容
              </span>
            </div>
          ) : null}
          <div className="columns-1 gap-5 md:columns-2 2xl:columns-3">
            {feed.map((post, index) => (
              <FeedPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>

        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <StatusRail mode="buyer" />
          </div>
        </aside>
      </main>
    </div>
  );
}

export function TrendDetailPage({ trendId }: { trendId: string }) {
  const { state, hydrated } = useDemo();
  const trend = communityTrends.find((item) => item.id === trendId);

  if (!hydrated) {
    return <LoadingScreen label="正在加载..." />;
  }

  if (!trend) {
    return <MissingScreen title="趋势不存在" description="回社区重新选择一个正在发生的趋势。" />;
  }

  const trendPosts = state.posts
    .filter((post) => postMatchesTags(post, trend.tags))
    .sort((left, right) => right.likes - left.likes);

  return (
    <div className="min-h-screen pb-12">
      <AppHeader mode="buyer" />
      <main className="page-shell grid gap-6 pt-6 xl:grid-cols-[250px_minmax(0,1fr)_360px]">
        <aside className="space-y-5 xl:sticky xl:top-28 xl:h-fit">
          <Link
            href="/"
            className="flex items-center justify-between rounded-[20px] border border-border/70 bg-white/96 px-4 py-4 text-sm font-semibold shadow-[0_18px_46px_-36px_rgba(49,40,27,0.45)] transition hover:bg-secondary/50"
          >
            <span className="inline-flex items-center gap-2">
              <Home className="size-4" />
              返回首页
            </span>
            <ArrowRight className="size-4 rotate-180 text-muted-foreground" />
          </Link>

          <Card className="rounded-[20px] border border-border/70 bg-white/96 shadow-[0_18px_46px_-36px_rgba(49,40,27,0.45)]">
            <CardHeader>
              <CardTitle className="text-xl">趋势榜单</CardTitle>
              <CardDescription>点击切换不同社区活动。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {communityTrends.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/trends/${item.id}`}
                  className={cn(
                    "grid grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-[16px] px-3 py-3 transition",
                    item.id === trend.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary/60",
                  )}
                >
                  <span className={cn("font-heading text-2xl leading-none", item.id !== trend.id && "text-muted-foreground")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{item.tone} {item.title}</span>
                    <span className={cn("mt-1 block text-xs", item.id === trend.id ? "text-primary-foreground/72" : "text-muted-foreground")}>
                      {item.count} 人在看
                    </span>
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0 space-y-6">
          <Card className="overflow-hidden rounded-[28px] border border-border/70 bg-white/96 shadow-[0_18px_54px_-40px_rgba(49,40,27,0.55)]">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_220px]">
              <div>
                <p className="editorial-kicker">Community Trend</p>
                <h1 className="mt-3 text-5xl leading-tight">{trend.tone} {trend.title}</h1>
                <div className="mt-5 space-y-4 text-base leading-8 text-foreground/78">
                  {trend.summary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {trend.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] bg-primary px-5 py-5 text-primary-foreground">
                <p className="text-sm opacity-75">当前热度</p>
                <p className="mt-2 text-4xl font-semibold">{trend.count.toLocaleString("zh-CN")}</p>
                <p className="mt-4 text-sm leading-6 opacity-75">匹配帖子 {trendPosts.length} 条，包含同款、相似风格和征集需求。</p>
              </div>
            </CardContent>
          </Card>

          <div className="columns-1 gap-5 md:columns-2 2xl:columns-3">
            {trendPosts.map((post, index) => (
              <FeedPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>

        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <StatusRail mode="buyer" />
          </div>
        </aside>
      </main>
    </div>
  );
}

export function SearchResultsPage({ query }: { query: string }) {
  const { state, hydrated } = useDemo();
  const trimmedQuery = query.trim();
  const postResults = trimmedQuery
    ? state.posts.filter((post) => {
        const blogger = resolveBlogger(state.bloggers, post.bloggerId);
        const seller = resolveSeller(state.sellers, post.sellerId);
        const products = getPostProductIds(post)
          .map((productId) => resolveProduct(state.products, productId))
          .filter((product): product is Product => Boolean(product));

        return textMatchesQuery(
          [
            post.title,
            post.body,
            post.styleTags.join(" "),
            blogger?.name,
            seller?.name,
            products.map((product) => product.name).join(" "),
            products.flatMap((product) => product.tags).join(" "),
          ],
          trimmedQuery,
        );
      })
    : [];
  const productResults = trimmedQuery
    ? state.products.filter((product) => {
        const seller = resolveSeller(state.sellers, product.sellerId);

        return textMatchesQuery(
          [product.name, product.tags.join(" "), product.material, product.similarityReason, seller?.name, seller?.styleFocus],
          trimmedQuery,
        );
      })
    : [];
  const bloggerResults = trimmedQuery
    ? state.bloggers.filter((blogger) =>
        textMatchesQuery([blogger.name, blogger.bio, blogger.styleTags.join(" ")], trimmedQuery),
      )
    : [];
  const sellerResults = trimmedQuery
    ? state.sellers.filter((seller) =>
        textMatchesQuery([seller.name, seller.bio, seller.styleFocus], trimmedQuery),
      )
    : [];
  const totalResults = postResults.length + productResults.length + bloggerResults.length + sellerResults.length;

  if (!hydrated) {
    return <LoadingScreen label="正在搜索..." />;
  }

  return (
    <LayoutFrame
      title={trimmedQuery ? `搜索：${trimmedQuery}` : "搜索"}
      actions={
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          <Home data-icon="inline-start" />
          返回社区
        </Link>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="editorial-kicker">Search Results</p>
                <p className="mt-2 text-2xl font-semibold">
                  {trimmedQuery ? `找到 ${totalResults} 个相关结果` : "在顶部输入关键词后回车搜索"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">帖子 {postResults.length}</Badge>
                <Badge variant="secondary">商品 {productResults.length}</Badge>
                <Badge variant="secondary">博主 {bloggerResults.length}</Badge>
                <Badge variant="secondary">商户 {sellerResults.length}</Badge>
              </div>
            </CardContent>
          </Card>

          {postResults.length ? (
            <section className="space-y-3">
              <h2 className="text-3xl">相关社区帖子</h2>
              <div className="columns-1 gap-5 md:columns-2 2xl:columns-3">
                {postResults.map((post, index) => (
                  <FeedPostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </section>
          ) : null}

          {productResults.length ? (
            <section className="space-y-3">
              <h2 className="text-3xl">相关商品</h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {productResults.map((product) => (
                  <ProductGridCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ) : null}

          {bloggerResults.length || sellerResults.length ? (
            <section className="grid gap-5 lg:grid-cols-2">
              <Card className="soft-panel border-0 bg-white/96 shadow-none">
                <CardHeader>
                  <CardTitle>相关博主</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bloggerResults.length ? (
                    bloggerResults.map((blogger) => <BloggerMiniCard key={blogger.id} blogger={blogger} />)
                  ) : (
                    <EmptyState label="没有匹配博主。" />
                  )}
                </CardContent>
              </Card>

              <Card className="soft-panel border-0 bg-white/96 shadow-none">
                <CardHeader>
                  <CardTitle>相关商户</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sellerResults.length ? (
                    sellerResults.map((seller) => <SellerMiniCard key={seller.id} seller={seller} />)
                  ) : (
                    <EmptyState label="没有匹配商户。" />
                  )}
                </CardContent>
              </Card>
            </section>
          ) : null}

          {trimmedQuery && totalResults === 0 ? (
            <Card className="soft-panel border-0 bg-white/96 shadow-none">
              <CardContent className="p-6">
                <EmptyState label="没有找到结果。可以换个风格词，或去小红书解析发布征集帖。" />
              </CardContent>
            </Card>
          ) : null}
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <StatusRail mode="buyer" />
          </div>
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function PostDetailPage({ postId }: { postId: string }) {
  const { state, toggleFollow, toggleBloggerFollow, toggleLike, toggleSavePost, trackView } = useDemo();
  const [activeImage, setActiveImage] = useState("");
  const post = state.posts.find((item) => item.id === postId);
  const seller = resolveSeller(state.sellers, post?.sellerId);
  const blogger = resolveBlogger(state.bloggers, post?.bloggerId);
  const postProductIds = getPostProductIds(post);
  const attachedProducts = postProductIds
    .map((id) => resolveProduct(state.products, id))
    .filter((product): product is Product => Boolean(product));

  useEffect(() => {
    if (postId) {
      trackView(`post:${postId}`);
    }
  }, [postId, trackView]);

  const similarProducts = !post
    ? []
    : state.products
        .filter((item) => item.tags.some((tag) => post.styleTags.includes(tag)))
        .filter((item) => !postProductIds.includes(item.id))
        .sort((left, right) => right.similarityScore - left.similarityScore);

  if (!post) {
    return <MissingScreen title="帖子不存在" description="这个帖子可能还没有发布，或已被下线。" />;
  }

  if (post.type === "buyer-request" && post.requestId) {
    return <RequestDetailPage requestId={post.requestId} />;
  }

  const liked = state.viewer.likedPostIds.includes(post.id);
  const saved = state.viewer.savedPostIds.includes(post.id);
  const followed = seller ? state.viewer.followedSellerIds.includes(seller.id) : false;
  const bloggerFollowed = blogger ? state.viewer.followedBloggerIds.includes(blogger.id) : false;
  const postImages = post.images?.length ? post.images : [post.coverImage];
  const displayImage = activeImage && postImages.includes(activeImage) ? activeImage : postImages[0];
  const floatingTags =
    post.productTags?.length
      ? post.productTags
      : attachedProducts.slice(0, 2).map((item, index) => ({
          productId: item.id,
          label: item.name,
          x: index === 0 ? 56 : 40,
          y: index === 0 ? 38 : 60,
        }));

  return (
    <LayoutFrame
      title="帖子"
    >
      <section className="grid gap-6 xl:grid-cols-[300px_minmax(0,720px)_320px] xl:items-start xl:justify-center">
        <aside className="order-2 space-y-4 xl:order-1 xl:sticky xl:top-24">
          <ProductSideSection title="本帖同款" products={attachedProducts} emptyLabel="本帖暂无同款商品。" />
          <ProductSideSection title="相似风格" products={similarProducts} emptyLabel="暂无相似风格商品。" />
        </aside>

        <div className="order-1 space-y-4 xl:order-2">
          <Card className="soft-panel overflow-hidden border-0 bg-white/96 shadow-none">
            <div className="relative bg-[#f2ece3]">
              <img src={displayImage} alt={post.title} className="mx-auto max-h-[780px] min-h-[560px] w-full object-contain" />
              {floatingTags.map((tag) => {
                const linkedProduct = resolveProduct(state.products, tag.productId);
                if (!linkedProduct) {
                  return null;
                }

                return (
                  <Link
                    key={`${tag.productId}-${tag.label}`}
                    href={`/products/${tag.productId}`}
                    className="absolute inline-flex max-w-[220px] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-primary/92 py-1.5 pl-1.5 pr-3 text-xs font-semibold text-primary-foreground shadow-[0_14px_34px_-20px_rgba(0,0,0,0.55)] backdrop-blur transition hover:bg-primary"
                    style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                  >
                    <span className="size-7 shrink-0 overflow-hidden rounded-full border border-white/40 bg-white">
                      <img src={linkedProduct.image} alt={linkedProduct.name} className="h-full w-full object-cover" />
                    </span>
                    <span className="truncate">{linkedProduct.name}</span>
                  </Link>
                );
              })}
            </div>
            {postImages.length > 1 ? (
              <div className="flex gap-3 overflow-x-auto border-t border-border/70 px-4 py-3">
                {postImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={cn(
                      "h-20 w-16 shrink-0 overflow-hidden rounded-[14px] border transition",
                      displayImage === image ? "border-primary" : "border-border/70",
                    )}
                  >
                    <img src={image} alt={`帖子图片 ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
            <CardHeader className="space-y-4">
              {blogger ? (
                <Link href={`/bloggers/${blogger.id}`} className="mb-2 flex w-fit items-center gap-3 rounded-full pr-3 transition hover:bg-secondary">
                  <Avatar className="size-11 border border-border/70 bg-secondary">
                    <AvatarFallback>{blogger.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{blogger.name}</p>
                    <p className="text-xs text-muted-foreground">穿搭博主</p>
                  </div>
                </Link>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {post.styleTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-3xl leading-tight sm:text-4xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-base leading-8 text-foreground/82">{post.body}</p>
            </CardContent>
            <CardFooter className="flex-wrap justify-between gap-3 bg-transparent">
              <button
                type="button"
                onClick={() => toggleLike(post.id)}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-accent"
              >
                <Heart className={cn(liked && "fill-current")} />
                {liked ? "已点赞" : "点赞"} · {post.likes}
              </button>
              <Button variant={saved ? "default" : "outline"} onClick={() => toggleSavePost(post.id)}>
                <Star data-icon="inline-start" className={cn(saved && "fill-current")} />
                {saved ? "已收藏" : "收藏帖子"}
              </Button>
            </CardFooter>
          </Card>

          {attachedProducts[0] ? (
            <Link
              href={`/try-on?productId=${attachedProducts[0].id}&postId=${post.id}`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-16 w-full rounded-[26px] text-lg shadow-[0_18px_44px_-24px_rgba(49,40,27,0.55)]",
              )}
            >
              <Sparkles data-icon="inline-start" />
              生成同款穿搭
            </Link>
          ) : null}
        </div>

        <aside className="order-3 space-y-4 xl:sticky xl:top-24">
          {blogger ? (
            <Card className="soft-panel border-0 bg-white/96 shadow-none">
              <CardHeader>
                <CardTitle>穿搭博主</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/bloggers/${blogger.id}`} className="flex items-center gap-3 rounded-[22px] border border-border/70 p-3 transition hover:bg-secondary/40">
                  <Avatar className="size-14 border border-border/70 bg-secondary">
                    <AvatarFallback>{blogger.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">{blogger.name}</p>
                    <p className="text-sm text-muted-foreground">{blogger.bio}</p>
                  </div>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label="粉丝" value={blogger.followerCount.toString()} />
                  <MetricCard label="帖子" value={getBloggerPosts(state.posts, blogger.id).length.toString()} />
                </div>
              </CardContent>
              <CardFooter className="gap-3 bg-transparent">
                <Button variant={bloggerFollowed ? "default" : "outline"} onClick={() => toggleBloggerFollow(blogger.id)} className="w-full">
                  <UserPlus data-icon="inline-start" />
                  {bloggerFollowed ? "已关注博主" : "关注博主"}
                </Button>
              </CardFooter>
            </Card>
          ) : null}

          {seller ? (
            <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle>商户信息</CardTitle>
            </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-14 border border-border/70 bg-secondary">
                    <AvatarFallback>{seller.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">{seller.name}</p>
                    <p className="text-sm text-muted-foreground">{seller.bio}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label="粉丝" value={seller.followerCount.toString()} />
                  <MetricCard label="收入" value={formatCurrency(seller.revenue)} />
                </div>
              </CardContent>
              <CardFooter className="gap-3 bg-transparent">
                <Button variant={followed ? "default" : "outline"} onClick={() => toggleFollow(seller.id)} className="w-full">
                  <UserPlus data-icon="inline-start" />
                  {followed ? "已关注商户" : "关注商户"}
                </Button>
              </CardFooter>
            </Card>
          ) : null}
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function ProductDetailPage({ productId }: { productId: string }) {
  const { state, toggleCartProduct, trackView } = useDemo();
  const [selectedSize, setSelectedSize] = useState("");
  const [sort, setSort] = useState("similarity");
  const product = state.products.find((item) => item.id === productId);
  const seller = resolveSeller(state.sellers, product?.sellerId);
  const inCart = state.viewer.cartProductIds.includes(productId);

  useEffect(() => {
    if (productId) {
      trackView(`product:${productId}`);
    }
  }, [productId, trackView]);

  const similarProducts = !product
    ? []
    : [
        ...state.products.filter(
          (item) => item.id !== product.id && item.tags.some((tag) => product.tags.includes(tag)),
        ),
      ].sort((left, right) => {
        if (sort === "price") {
          return left.price - right.price;
        }
        if (sort === "value") {
          return right.similarityScore / right.price - left.similarityScore / left.price;
        }
        return right.similarityScore - left.similarityScore;
      });

  if (!product) {
    return <MissingScreen title="商品不存在" description="这个商品可能已被下架，回商城重新挑一件。" />;
  }

  const activeProduct = product;
  const associatedPosts = getProductPosts(state.posts, activeProduct.id);
  const sizeGuide = getSizeGuide(activeProduct);

  return (
    <LayoutFrame
      title={activeProduct.name}
      description="商品详情保留尺码、素材和内容联动；成交闭环暂不进入 MVP。"
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <img src={activeProduct.image} alt={activeProduct.name} className="h-[520px] w-full object-cover" />
              <div className="space-y-6 px-6 py-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-4xl">{activeProduct.name}</h2>
                  <p className="text-lg leading-8 text-muted-foreground">{activeProduct.similarityReason}</p>
                </div>
                <div className="grid gap-3 rounded-[24px] border border-border/70 bg-secondary/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">商户</span>
                    <span className="font-semibold">{seller?.name ?? "未知商户"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">价格</span>
                    <span className="text-2xl font-semibold">{formatCurrency(activeProduct.price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">库存</span>
                    <span className="font-semibold">{activeProduct.stock}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">材质</span>
                    <span className="max-w-[220px] text-right text-sm font-semibold">{activeProduct.material ?? "混纺面料"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">相似度</span>
                    <span className="font-semibold">{activeProduct.similarityScore}%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">选择尺码</p>
                  <ToggleGroup
                    value={selectedSize ? [selectedSize] : []}
                    onValueChange={(value) => setSelectedSize(value[0] ?? "")}
                  >
                    {activeProduct.sizes.map((size) => (
                      <ToggleGroupItem key={size} value={size}>
                        {size}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link href={`/creator?productId=${activeProduct.id}`} className={cn(buttonVariants({ variant: "outline" }))}>
                    <Sparkles data-icon="inline-start" />
                    生成商单内容
                  </Link>
                  <Link href={`/try-on?productId=${activeProduct.id}`} className={cn(buttonVariants({ variant: "outline" }))}>
                    <ImagePlus data-icon="inline-start" />
                    打开试衣间
                  </Link>
                </div>
                <Button variant={inCart ? "default" : "secondary"} onClick={() => toggleCartProduct(activeProduct.id)}>
                  <ShoppingCart data-icon="inline-start" />
                  {inCart ? "已加入购物车" : "加入购物车"}
                </Button>
              </div>
            </div>
          </Card>

          {associatedPosts.length > 0 ? (
            <Card className="soft-panel border-0 bg-white/96 shadow-none">
              <CardHeader>
                <CardTitle className="text-3xl">穿搭帖子</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {associatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="group overflow-hidden rounded-[24px] border border-border/70 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-32px_rgba(49,40,27,0.45)]"
                    >
                      <img src={post.coverImage} alt={post.title} className="h-64 w-full object-cover" />
                      <div className="space-y-2 p-4">
                        <p className="line-clamp-2 font-semibold leading-6">{post.title}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {post.styleTags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-muted-foreground">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}

          <SimilarProductList products={similarProducts} sort={sort} onSortChange={setSort} />
        </div>

        <div className="space-y-4">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle>尺码与材质</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-hidden rounded-[22px] border border-border/70">
                <div className="grid grid-cols-4 bg-secondary/60 px-4 py-3 text-xs font-semibold text-muted-foreground">
                  <span>尺码</span>
                  <span>肩宽</span>
                  <span>胸围</span>
                  <span>衣长</span>
                </div>
                {sizeGuide.map((row) => (
                  <div key={row.size} className="grid grid-cols-4 border-t border-border/70 px-4 py-3 text-sm">
                    <span className="font-semibold">{row.size}</span>
                    <span>{row.shoulder}</span>
                    <span>{row.chest}</span>
                    <span>{row.length}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-[22px] border border-border/70 px-4 py-4">
                <p className="text-sm text-muted-foreground">材质</p>
                <p className="mt-2 leading-7">{activeProduct.material ?? "混纺面料，适合日常穿搭。"}</p>
              </div>
              <div className="rounded-[22px] border border-border/70 px-4 py-4">
                <p className="text-sm text-muted-foreground">护理</p>
                <p className="mt-2 leading-7">{activeProduct.care ?? "建议低温洗涤，悬挂晾干。"}</p>
              </div>
              <div className="rounded-[22px] border border-border/70 px-4 py-4">
                <p className="text-sm text-muted-foreground">相似理由</p>
                <p className="mt-2 leading-7">{activeProduct.similarityReason}</p>
              </div>
              <div className="rounded-[22px] border border-border/70 px-4 py-4">
                <p className="text-sm text-muted-foreground">风格标签</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProduct.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </LayoutFrame>
  );
}

export function SellPage() {
  const { state, addProduct, publishSellerPost, approveCollabRequest } = useDemo();
  const router = useRouter();
  const [form, setForm] = useState({
    sellerId: state.sellers[0]?.id ?? seedSellers[0].id,
    name: "",
    price: "189",
    stock: "3",
    sizes: "S,M,L",
    material: "棉混纺斜纹布，挺阔微哑光表面",
    tags: "高街暗黑,短夹克,通勤",
    image: seedProducts[0].image,
  });
  const [productImages, setProductImages] = useState<string[]>([seedProducts[0].image]);
  const [recognitionDraft, setRecognitionDraft] = useState<ProductRecognitionDraft | null>(null);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
  const [draft, setDraft] = useState<AIStyledPostDraft | null>(null);
  const [invitedBloggerId, setInvitedBloggerId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const recommendedBloggers = getRecommendedBloggers(createdProduct, state.bloggers);
  const pendingCollabRequests = state.collabRequests.filter((request) => request.status === "pending");

  async function analyzeProductImage() {
    const image = productImages[0] ?? form.image;
    setSubmitting(true);
    try {
      const response = await fetch("/api/seller/products/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerId: form.sellerId, image, hint: form.name }),
      });
      const draft = (await response.json()) as ProductRecognitionDraft;
      setRecognitionDraft(draft);
      setForm((current) => ({
        ...current,
        sellerId: draft.sellerId,
        name: draft.name,
        price: draft.price,
        stock: draft.stock,
        sizes: draft.sizes,
        material: draft.material,
        tags: draft.tags.join(","),
        image: draft.image,
      }));
      setProductImages([draft.image]);
      toast.success("商品识别草稿已生成，可编辑后上架。");
    } finally {
      setSubmitting(false);
    }
  }

  async function createProduct() {
    setSubmitting(true);
    try {
      const response = await fetch("/api/seller/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: productImages[0] ?? form.image }),
      });
      const product = (await response.json()) as Product;
      addProduct(product);
      setCreatedProduct(product);
      toast.success("商品已上架，可以生成帖子了。");
    } finally {
      setSubmitting(false);
    }
  }

  async function generateDraft() {
    if (!createdProduct) {
      toast.error("请先上架商品。");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/seller/posts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: createdProduct.id,
          sellerId: createdProduct.sellerId,
          product: createdProduct,
        }),
      });
      const payload = (await response.json()) as AIStyledPostDraft;
      setDraft(payload);
      toast.success("AI 穿搭帖草稿已生成。");
    } catch {
      toast.error("生成失败，已回退到模板方案。");
    } finally {
      setSubmitting(false);
    }
  }

  async function publishDraft() {
    if (!createdProduct || !draft) {
      toast.error("请先生成帖子草稿。");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/seller/posts/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: createdProduct.id, draft }),
      });
      publishSellerPost(createdProduct, draft);
      toast.success("内容已发布到社区沉淀页。");
      router.push("/community");
    } finally {
      setSubmitting(false);
    }
  }

  function inviteBlogger(blogger: Blogger) {
    if (!createdProduct) {
      toast.error("请先上架商品。");
      return;
    }

    setInvitedBloggerId(blogger.id);
    toast.success(`已邀请 ${blogger.name} 做商单。`);
  }

  return (
    <LayoutFrame
      mode="seller"
      title="商户工作台"
      description="识别商品、上架商城，并生成可用于商单合作的内容素材。"
      actions={
        <>
          <Link href="/seller/products" className={cn(buttonVariants({ variant: "outline" }))}>
            <Package data-icon="inline-start" />
            商品
          </Link>
          <Link href="/community" className={cn(buttonVariants({ variant: "outline" }))}>
            <Shirt data-icon="inline-start" />
            内容社区
          </Link>
          <Link href="/creator" className={cn(buttonVariants({ variant: "outline" }))}>
            <Home data-icon="inline-start" />
            博主端
          </Link>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="soft-panel border-0 bg-white/96 shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl">1. 商品识别与上架</CardTitle>
            <CardDescription>先上传商品图，系统生成可编辑的商品信息草稿；确认后进入商城和商单素材库。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <LocalImageUploader label="上传商品图片" images={productImages} onChange={setProductImages} multiple={false} />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button type="button" variant="outline" onClick={analyzeProductImage} disabled={submitting || !productImages.length}>
                  {submitting ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Search data-icon="inline-start" />}
                  AI 识别商品
                </Button>
                {recognitionDraft ? (
                  <Badge variant="secondary">{recognitionDraft.confidence}% 识别置信度</Badge>
                ) : null}
              </div>
              {recognitionDraft ? (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{recognitionDraft.notes}</p>
              ) : null}
            </div>
            <label className="flex flex-col gap-2 text-sm">
              商户
              <select
                value={form.sellerId}
                onChange={(event) => setForm((current) => ({ ...current, sellerId: event.target.value }))}
                className="h-11 rounded-2xl border border-input bg-background px-4"
              >
                {state.sellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              商品名
              <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="例如 Urban 黑色短夹克" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              价格
              <Input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              库存
              <Input value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              尺码
              <Input value={form.sizes} onChange={(event) => setForm((current) => ({ ...current, sizes: event.target.value }))} placeholder="S,M,L" />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              材质
              <Input value={form.material} onChange={(event) => setForm((current) => ({ ...current, material: event.target.value }))} />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              风格标签
              <Input value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} placeholder="高街暗黑,短夹克,通勤" />
            </label>
          </CardContent>
          <CardFooter className="justify-end gap-3 bg-transparent">
            <Button onClick={createProduct} disabled={submitting || !form.name.trim()}>
              {submitting ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <ShoppingBag data-icon="inline-start" />}
              一键上架到商城
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl">待确认商单</CardTitle>
              <CardDescription>博主发送样图和帖子信息后，商户在这里确认合作并发布带货帖。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingCollabRequests.length ? (
                pendingCollabRequests.map((request) => {
                  const product = resolveProduct(state.products, request.productId);
                  const blogger = resolveBlogger(state.bloggers, request.bloggerId);

                  return (
                    <div key={request.id} className="rounded-[24px] border border-border/70 p-4">
                      <img src={request.coverImage} alt={request.title} className="h-52 w-full rounded-[18px] object-cover" />
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{request.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {blogger?.name ?? "博主"} · {product?.name ?? "商品"}
                            </p>
                          </div>
                          <Badge>{formatCurrency(request.suggestedPrice)}</Badge>
                        </div>
                        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{request.body}</p>
                        <div className="flex flex-wrap gap-2">
                          {request.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button onClick={() => approveCollabRequest(request.id)} className="w-full">
                          <ArrowRight data-icon="inline-start" />
                          确认合作并发布
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState label="暂无待确认商单。博主在发布页发送后会出现在这里。" />
              )}
            </CardContent>
          </Card>

          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl">2. 生成穿搭帖</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {createdProduct ? (
                <div className="rounded-[24px] border border-border/70 p-4">
                  <img src={createdProduct.image} alt={createdProduct.name} className="h-48 w-full rounded-[18px] object-cover" />
                  <div className="mt-4 space-y-2">
                    <p className="text-xl font-semibold">{createdProduct.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(createdProduct.price)} · 库存 {createdProduct.stock} · {createdProduct.tags.join(" / ")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
                  先完成商品上架，右侧才能生成对应的 AI 穿搭帖。
                </div>
              )}

              {draft ? (
                <div className="rounded-[24px] border border-border/70 bg-secondary/40 p-4">
                  <img src={draft.modelImage} alt={draft.title} className="h-56 w-full rounded-[18px] object-cover" />
                  <p className="mt-4 text-2xl font-semibold">{draft.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{draft.caption}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {draft.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex-col gap-3 bg-transparent">
              <Button onClick={generateDraft} disabled={submitting || !createdProduct} className="w-full">
                <Sparkles data-icon="inline-start" />
                一键生成穿搭帖
              </Button>
              <Button onClick={publishDraft} disabled={submitting || !createdProduct || !draft} variant="outline" className="w-full">
                <ArrowRight data-icon="inline-start" />
                发布到社区
              </Button>
            </CardFooter>
          </Card>

          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl">3. 推荐博主商单</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendedBloggers.map(({ blogger, score }) => {
                const invited = invitedBloggerId === blogger.id;

                return (
                  <div key={blogger.id} className="rounded-[24px] border border-border/70 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-12 border border-border/70 bg-secondary">
                        <AvatarFallback>{blogger.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link href={`/bloggers/${blogger.id}`} className="font-semibold hover:underline">
                              {blogger.name}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">风格匹配 {score}%</p>
                          </div>
                          <Badge variant={invited ? "default" : "secondary"}>{invited ? "已邀请" : "推荐"}</Badge>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{blogger.bio}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {blogger.styleTags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          <Button variant="outline" onClick={() => inviteBlogger(blogger)} disabled={!createdProduct}>
                            邀请做商单
                          </Button>
                          <div className="rounded-2xl bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
                            {invited ? "等待博主发送样图请求" : "邀请后由博主发起请求"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>
    </LayoutFrame>
  );
}

export function AnalyzePage() {
  const { addRequest } = useDemo();
  const router = useRouter();
  const [linkInput, setLinkInput] = useState("https://www.xiaohongshu.com/explore/ootd-clean-fit");
  const [coverImage, setCoverImage] = useState(buildStyleAnalysis("demo").coverImage);
  const [description, setDescription] = useState("喜欢这条内容的 clean fit 通勤氛围，想找更接近的宽松西装或针织。");
  const [analysis, setAnalysis] = useState<StyleAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  async function runAnalysis() {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze/xhs-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: linkInput, coverImage }),
      });
      const payload = (await response.json()) as StyleAnalysis;
      setAnalysis(payload);
      toast.success("风格分析已生成。");
    } finally {
      setLoading(false);
    }
  }

  async function publishRequest() {
    if (!analysis) {
      toast.error("请先完成风格分析。");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coverImage,
          description,
          tags: analysis.styleTags,
          expectedItem: "宽松西装或针织",
          budget: 220,
          matchedProducts: analysis.matchedProducts,
        }),
      });
      const payload = (await response.json()) as { request: RequestPost; post: Post };
      addRequest(payload.request, payload.post);
      toast.success("征集帖已发布，商户响应已生成。");
      router.push(`/requests/${payload.request.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutFrame
      title="链接找款"
      description="粘贴分享链接，确认封面后查找相似商品。"
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="soft-panel border-0 bg-white/96 shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl">链接解析入口</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex flex-col gap-2 text-sm">
              小红书分享链接
              <Input value={linkInput} onChange={(event) => setLinkInput(event.target.value)} />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              手动确认封面图
              <Input value={coverImage} onChange={(event) => setCoverImage(event.target.value)} />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              用户补充描述
              <Textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-28" />
            </label>
            <Button onClick={runAnalysis} disabled={loading} className="w-full">
              {loading ? <LoaderCircle data-icon="inline-start" className="animate-spin" /> : <Search data-icon="inline-start" />}
              开始风格分析
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {analysis ? (
            <>
              <Card className="soft-panel border-0 bg-white/96 shadow-none">
                <CardHeader>
                  <CardTitle>风格分析结果</CardTitle>
                  <CardDescription>{analysis.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img src={analysis.coverImage} alt="解析封面" className="h-60 w-full rounded-[22px] object-cover" />
                  <div className="flex flex-wrap gap-2">
                    {analysis.styleTags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid gap-3">
                    {analysis.matchedProducts.map((productId) => {
                      const product = resolveProduct(seedProducts, productId);
                      if (!product) {
                        return null;
                      }

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex items-center justify-between rounded-[22px] border border-border/70 px-4 py-4 transition hover:bg-secondary/40"
                        >
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.similarityScore}% 相似度 · {formatCurrency(product.price)}</p>
                          </div>
                          <ArrowRight />
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3 bg-transparent">
                  <Link href={`/try-on?productId=${analysis.matchedProducts[0]}`} className={cn(buttonVariants({ variant: "default" }), "w-full")}>
                    进 AI 试衣间
                  </Link>
                  <Button variant="outline" className="w-full" onClick={publishRequest}>
                    <Star data-icon="inline-start" />
                    没找到满意款，发布征集帖
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card className="soft-panel border-0 bg-white/96 shadow-none">
              <CardHeader>
                <CardTitle>分析结果</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-[24px] border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                  粘贴链接并确认封面图后，这里会展示风格标签、相似商品和试穿入口。
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </LayoutFrame>
  );
}

export function RequestDetailPage({ requestId }: { requestId: string }) {
  const { state, trackView } = useDemo();
  const request = state.requests.find((item) => item.id === requestId);

  useEffect(() => {
    if (requestId) {
      trackView(`request:${requestId}`);
    }
  }, [requestId, trackView]);

  if (!request) {
    return <MissingScreen title="征集帖不存在" description="可能还没有发布，回社区再发一次需求即可。" />;
  }

  return (
    <LayoutFrame
      title={`征集：${request.expectedItem}`}
      description="查看商户响应，选择商品继续成交。"
    >
      <section className="space-y-6">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
              <img src={request.image} alt={request.expectedItem} className="h-[420px] w-full object-cover" />
              <div className="space-y-5 px-6 py-6">
                <div>
                  <p className="editorial-kicker">Buyer Request</p>
                  <h2 className="mt-3 text-4xl">{request.expectedItem}</h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{request.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label="预算" value={formatCurrency(request.budget)} />
                  <MetricCard label="商户响应" value={request.matchedOffers.length.toString()} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {request.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div>
              <p className="editorial-kicker">Seller Offers</p>
              <h3 className="text-4xl">商户响应 / 报价</h3>
            </div>
            <div className="grid gap-4">
              {request.matchedOffers.map((offer) => {
                const seller = resolveSeller(state.sellers, offer.sellerId);
                const product = resolveProduct(state.products, offer.productId);

                if (!seller || !product) {
                  return null;
                }

                return (
                  <Card key={`${offer.sellerId}-${offer.productId}`} className="soft-panel border-0 bg-white/96 shadow-none">
                    <CardContent className="grid gap-4 py-4 md:grid-cols-[170px_minmax(0,1fr)_140px]">
                      <img src={product.image} alt={product.name} className="h-40 w-full rounded-[20px] object-cover" />
                      <div className="space-y-3">
                        <div>
                          <p className="text-2xl font-semibold">{product.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{seller.name} · {seller.styleFocus}</p>
                        </div>
                        <p className="text-sm leading-7 text-muted-foreground">{offer.note}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-4">
                        <div className="rounded-[20px] bg-secondary/60 p-4">
                          <p className="text-sm text-muted-foreground">报价 / 相似度</p>
                          <p className="mt-2 text-xl font-semibold">{formatCurrency(offer.price)}</p>
                          <p className="text-sm text-muted-foreground">{offer.similarityScore}%</p>
                        </div>
                        <Link href={`/products/${product.id}`} className={cn(buttonVariants({ variant: "default" }), "w-full")}>
                          进商品成交
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </LayoutFrame>
  );
}

export function TryOnRoomPage() {
  const { state, publishUserPost, submitCollabRequest } = useDemo();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentBlogger = resolveBlogger(state.bloggers, "blogger-me") ?? state.bloggers[0];
  const initialProductId = searchParams.get("productId") ?? state.products[0]?.id ?? "";
  const isCommission = searchParams.get("commission") === "1";
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [personalImages, setPersonalImages] = useState<string[]>([currentBlogger?.coverImage ?? seedProducts[0].tryOnPreset]);
  const [generatingTryOn, setGeneratingTryOn] = useState(false);
  const selectedProduct = resolveProduct(state.products, selectedProductId) ?? state.products[0];
  const seller = resolveSeller(state.sellers, selectedProduct?.sellerId);
  const overlap = selectedProduct && currentBlogger
    ? currentBlogger.styleTags.filter((tag) => selectedProduct.tags.includes(tag)).length
    : 1;
  const fitScore = Math.min(98, 80 + overlap * 7);
  const realFollowers = getCurrentUserFollowers(state.bloggers);
  const realFollowerCount = realFollowers.length;
  const suggestedPrice = Math.round((120 + realFollowerCount * 0.55 + fitScore * 1.8) / 10) * 10;
  const commissionUnlocked = realFollowerCount > 1000;
  const [resultImages, setResultImages] = useState<string[]>([selectedProduct?.tryOnPreset ?? seedProducts[0].tryOnPreset]);
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const resultImage = resultImages[activeResultIndex] ?? resultImages[0];
  const [title, setTitle] = useState(`${currentBlogger?.name ?? "我"} 的 ${selectedProduct?.tags[0] ?? "AI"} 穿搭`);
  const [body, setBody] = useState(
    selectedProduct
      ? `使用个人形象和 ${selectedProduct.name} 生成的 AI 试穿图，风格重点是 ${selectedProduct.tags.join(" / ")}。`
      : "使用个人形象和商品生成 AI 试穿图。",
  );
  const [tags, setTags] = useState(
    selectedProduct
      ? [...new Set([...(currentBlogger?.styleTags ?? []), ...selectedProduct.tags])].slice(0, 5).join(",")
      : "AI试穿",
  );

  function selectProduct(productId: string) {
    const nextProduct = resolveProduct(state.products, productId);
    setSelectedProductId(productId);
    if (!nextProduct) {
      return;
    }
    setResultImages([nextProduct.tryOnPreset]);
    setActiveResultIndex(0);
    setTitle(`${currentBlogger?.name ?? "我"} 的 ${nextProduct.tags[0] ?? "AI"} 穿搭`);
    setBody(`使用个人形象和 ${nextProduct.name} 生成的 AI 试穿图，风格重点是 ${nextProduct.tags.join(" / ")}。`);
    setTags([...new Set([...(currentBlogger?.styleTags ?? []), ...nextProduct.tags])].slice(0, 5).join(","));
  }

  async function generateTryOn() {
    if (!selectedProduct) {
      toast.error("请先选择衣服。");
      return;
    }

    setGeneratingTryOn(true);
    setResultImages([]);
    setActiveResultIndex(0);
    try {
      const maxImages = Math.min(Math.max(personalImages.length, 1), 6);
      const response = await fetch("/api/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productTags: selectedProduct.tags,
          productImage: selectedProduct.image,
          sourceImages: personalImages,
          maxImages,
        }),
      });
      const payload = (await response.json()) as { status: string; images?: string[]; resultImage?: string; error?: string };
      const presets = [
        selectedProduct.tryOnPreset,
        selectedProduct.detailImages[1] ?? selectedProduct.image,
        selectedProduct.detailImages[0] ?? selectedProduct.tryOnPreset,
      ];
      const fallbackImages = (personalImages.length ? personalImages : [currentBlogger?.coverImage ?? selectedProduct.image]).map(
        (_, index) => presets[index % presets.length],
      );
      const nextImages = payload.images?.length ? payload.images : payload.resultImage ? [payload.resultImage] : fallbackImages;

      for (const image of nextImages) {
        await new Promise((resolve) => window.setTimeout(resolve, 320));
        setResultImages((current) => [...current, image].slice(0, 9));
      }
      if (payload.status === "fallback") {
        toast.error(payload.error ? `真实生成失败，已使用预设图：${payload.error}` : "真实生成失败，已使用预设图。");
      } else if (payload.status === "mock") {
        toast.success(`已载入 ${nextImages.length} 张 mock 试穿图。`);
      } else {
        toast.success(`Seedream 已生成 ${nextImages.length} 张 AI 试穿图。`);
      }
    } catch {
      setResultImages([]);
      setActiveResultIndex(0);
      await new Promise((resolve) => window.setTimeout(resolve, 320));
      setResultImages([selectedProduct.tryOnPreset]);
      toast.error("真实生成请求失败，已使用预设图。");
    } finally {
      setGeneratingTryOn(false);
    }
  }

  function publishAiPost() {
    if (!selectedProduct || !resultImages.length) {
      toast.error("请先生成试穿图。");
      return;
    }
    const post = publishUserPost({
      title,
      body,
      coverImage: resultImages[0],
      images: resultImages,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      productIds: [selectedProduct.id],
    });
    router.push(`/posts/${post.id}`);
  }

  function sendToSeller() {
    if (!commissionUnlocked) {
      toast.error("粉丝数大于 1000 才能发送商单合作。");
      return;
    }
    if (!selectedProduct || !resultImages.length) {
      toast.error("请先生成试穿图。");
      return;
    }
    submitCollabRequest({
      sellerId: selectedProduct.sellerId,
      productId: selectedProduct.id,
      bloggerId: currentBlogger.id,
      title,
      body,
      coverImage: resultImages[0],
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      suggestedPrice,
      fitScore,
    });
    router.push("/creator");
  }

  return (
    <LayoutFrame
      title="AI 试衣间"
      actions={
        <Link href={isCommission ? "/creator" : "/products"} className={cn(buttonVariants({ variant: "outline" }))}>
          <Home data-icon="inline-start" />
          返回
        </Link>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl">选择形象和衣服</CardTitle>
              <CardDescription>从商品页或帖子进入时，会默认带入对应服装。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div>
                <LocalImageUploader label="上传个人形象" images={personalImages} onChange={setPersonalImages} />
              </div>
              <label className="rounded-[26px] border border-border/70 p-4 text-sm">
                要试穿的衣服
                <select
                  value={selectedProductId}
                  onChange={(event) => selectProduct(event.target.value)}
                  className="mt-3 h-11 w-full rounded-2xl border border-input bg-background px-4"
                >
                  {state.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {selectedProduct ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="mt-4 h-72 w-full rounded-[20px] object-cover" />
                ) : null}
              </label>
            </CardContent>
            <CardFooter className="justify-end bg-transparent">
              <Button onClick={generateTryOn} disabled={generatingTryOn}>
                {generatingTryOn ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Sparkles data-icon="inline-start" />}
                {generatingTryOn ? "正在调用 Seedream" : "生成试穿图"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl">{isCommission ? "商单帖子信息" : "发布为穿搭帖"}</CardTitle>
              <CardDescription>
                {isCommission ? "编辑标题、正文和标签后发送给商户，由商户端确认合作并发布。" : "生成结果可以直接发布成带商品标签的穿搭帖。"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <label className="flex flex-col gap-2 text-sm">
                标题
                <Input value={title} onChange={(event) => setTitle(event.target.value)} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                正文
                <Textarea value={body} onChange={(event) => setBody(event.target.value)} rows={5} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                标签
                <Input value={tags} onChange={(event) => setTags(event.target.value)} />
              </label>
              <LocalImageUploader label="编辑 / 补充试穿结果图" images={resultImages} onChange={setResultImages} />
              {isCommission ? (
                <div className="grid gap-3 rounded-[22px] bg-secondary/50 p-4 sm:grid-cols-2">
                  <MetricCard label="适配度" value={`${fitScore}%`} />
                  <MetricCard label="建议报价" value={formatCurrency(suggestedPrice)} />
                  <MetricCard label="粉丝门槛" value={`${realFollowerCount}/1000`} />
                  <MetricCard label="商单状态" value={commissionUnlocked ? "已解锁" : "未解锁"} />
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="justify-end bg-transparent">
              <Button onClick={isCommission ? sendToSeller : publishAiPost} disabled={!title.trim() || !resultImages.length || (isCommission && !commissionUnlocked)}>
                <ArrowRight data-icon="inline-start" />
                {isCommission ? "确定并发送给商家" : "发布 AI 穿搭帖"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="soft-panel border-0 bg-white/96 shadow-none lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>试穿结果</CardTitle>
              <CardDescription>{seller?.name ?? "商户"} · {selectedProduct?.name ?? "商品"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resultImage ? (
                <img src={resultImage} alt="AI 试穿结果" className="h-[580px] w-full rounded-[28px] object-cover" />
              ) : (
                <div className="flex h-[580px] items-center justify-center rounded-[28px] border border-dashed border-border bg-secondary/40">
                  <div className="text-center text-sm text-muted-foreground">
                    <LoaderCircle className="mx-auto mb-3 animate-spin" />
                    Seedream 正在生成，图片会逐张出现在这里。
                  </div>
                </div>
              )}
              {resultImages.length > 1 ? (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {resultImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveResultIndex(index)}
                      className={cn(
                        "h-20 w-16 shrink-0 overflow-hidden rounded-[14px] border",
                        index === activeResultIndex ? "border-primary" : "border-border/70",
                      )}
                    >
                      <img src={image} alt={`试穿结果 ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {(tags ? tags.split(",") : selectedProduct?.tags ?? []).map((tag) => (
                  <Badge key={tag.trim()} variant="secondary">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function CampaignsPage() {
  const { state } = useDemo();
  const currentBlogger = resolveBlogger(state.bloggers, "blogger-me") ?? state.bloggers[0];
  const campaignBriefs = buildCampaignBriefs(state.products, state.sellers, currentBlogger);
  const realFollowers = getCurrentUserFollowers(state.bloggers);
  const receivedLikes = getBloggerPosts(state.posts, currentBlogger?.id ?? "blogger-me").reduce((sum, post) => sum + post.likes, 0);
  const monetizationScore = Math.min(98, 62 + Math.floor(realFollowers.length / 120) + Math.floor(receivedLikes / 12));

  return (
    <LayoutFrame
      mode="creator"
      title="商单广场"
      actions={
        <>
          <Link href="/creator" className={cn(buttonVariants({ variant: "outline" }))}>
            <Sparkles data-icon="inline-start" />
            AI内容台
          </Link>
          <Link href="/me" className={cn(buttonVariants({ variant: "outline" }))}>
            <Home data-icon="inline-start" />
            我的
          </Link>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl">可接商单</CardTitle>
                  <CardDescription>按商品和博主风格自动计算适配度与建议报价，粉丝门槛仅作为潜力提示。</CardDescription>
                </div>
                <Badge>{campaignBriefs.length} 个开放商单</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {campaignBriefs.map((brief) => {
                const product = resolveProduct(state.products, brief.productId);
                const seller = resolveSeller(state.sellers, brief.sellerId);
                if (!product) {
                  return null;
                }

                return (
                  <div key={brief.id} className="rounded-[24px] border border-border/70 bg-white p-4">
                    <img src={product.image} alt={product.name} className="h-48 w-full rounded-[18px] object-cover" />
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {seller?.name ?? "商户"} · {formatShortDate(brief.deadline)} 截止
                          </p>
                        </div>
                        <Badge>{brief.fitScore}% 适配</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {brief.deliverables.map((item) => (
                          <Badge key={item} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="rounded-[18px] bg-secondary/60 px-4 py-3">
                        <p className="text-xs text-muted-foreground">建议报价</p>
                        <p className="mt-1 text-2xl font-semibold">{formatCurrency(brief.suggestedPrice)}</p>
                      </div>
                      <Link href={`/creator?productId=${product.id}`} className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                        <Sparkles data-icon="inline-start" />
                        用这个商单生成内容
                      </Link>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="soft-panel border-0 bg-white/96 shadow-none lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>我的接单状态</CardTitle>
              <CardDescription>用于判断当前账号的商单表现，不阻塞接单。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <MetricCard label="变现潜力" value={`${monetizationScore}%`} />
              <MetricCard label="平台粉丝" value={realFollowers.length.toString()} />
              <MetricCard label="内容资产" value={getBloggerPosts(state.posts, currentBlogger?.id ?? "blogger-me").length.toString()} />
              <MetricCard label="收到点赞" value={receivedLikes.toString()} />
            </CardContent>
          </Card>
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function CreatorWorkspacePage() {
  const { state, publishUserPost, submitCollabRequest } = useDemo();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentBlogger = resolveBlogger(state.bloggers, "blogger-me") ?? state.bloggers[0];
  const initialProductId = searchParams.get("productId") ?? state.products[0]?.id ?? "";
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);
  const [format, setFormat] = useState<GeneratedContentDraft["format"]>(
    searchParams.get("format") === "video-script" ? "video-script" : "image-post",
  );
  const [prompt, setPrompt] = useState("突出真实上身效果、适合人群和可复用搭配公式。");
  const [destinations, setDestinations] = useState<PublishDestination[]>(["community"]);
  const [draft, setDraft] = useState<GeneratedContentDraft | null>(null);
  const [publishResults, setPublishResults] = useState<PublishResult[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedProduct = resolveProduct(state.products, selectedProductId) ?? state.products[0];
  const selectedSeller = resolveSeller(state.sellers, selectedProduct?.sellerId);
  const campaignBriefs = buildCampaignBriefs(state.products, state.sellers, currentBlogger);
  const realFollowers = getCurrentUserFollowers(state.bloggers);
  const receivedLikes = getBloggerPosts(state.posts, currentBlogger?.id ?? "blogger-me").reduce((sum, post) => sum + post.likes, 0);
  const monetizationScore = Math.min(98, 62 + Math.floor(realFollowers.length / 120) + Math.floor(receivedLikes / 12));

  function toggleDestination(destination: PublishDestination) {
    setDestinations((current) => {
      if (destination === "community") {
        return current.includes(destination) ? current : [destination, ...current];
      }

      return current.includes(destination)
        ? current.filter((item) => item !== destination)
        : [...current, destination];
    });
  }

  async function generateContent(nextProductId = selectedProductId, nextFormat = format) {
    const product = resolveProduct(state.products, nextProductId) ?? selectedProduct;
    if (!product) {
      toast.error("请先选择一个商品或商单。");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: nextFormat,
          productId: product.id,
          sellerId: product.sellerId,
          bloggerId: currentBlogger?.id ?? "blogger-me",
          prompt,
          destinations,
        }),
      });
      const payload = (await response.json()) as GeneratedContentDraft;
      setDraft(payload);
      setPublishResults([]);
      toast.success(nextFormat === "video-script" ? "短视频脚本已生成。" : "AI 图文草稿已生成。");
    } finally {
      setLoading(false);
    }
  }

  async function publishDraft() {
    if (!draft) {
      toast.error("请先生成内容草稿。");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft, destinations }),
      });
      const payload = (await response.json()) as { results: PublishResult[]; summary: string };
      setPublishResults(payload.results);
      toast.info(getPublishMessage(payload.results));

      if (destinations.includes("community")) {
        const post = publishUserPost({
          title: draft.title,
          body: draft.body,
          coverImage: draft.media[0] ?? selectedProduct?.tryOnPreset ?? seedProducts[0].tryOnPreset,
          images: draft.media,
          tags: draft.tags,
          productIds: draft.productIds,
          contentFormat: draft.format,
          publishDestinations: destinations,
          externalPublishStatus: buildPublishStatusMap(payload.results),
        });
        router.push(`/posts/${post.id}`);
      }
    } finally {
      setLoading(false);
    }
  }

  function sendDraftToSeller() {
    if (!draft || !selectedProduct || !currentBlogger) {
      toast.error("请先生成商单内容草稿。");
      return;
    }

    const fitScore = campaignBriefs.find((brief) => brief.productId === selectedProduct.id)?.fitScore ?? 88;
    const suggestedPrice = campaignBriefs.find((brief) => brief.productId === selectedProduct.id)?.suggestedPrice ?? 360;
    submitCollabRequest({
      sellerId: selectedProduct.sellerId,
      productId: selectedProduct.id,
      bloggerId: currentBlogger.id,
      title: draft.title,
      body: draft.body,
      coverImage: draft.media[0] ?? selectedProduct.tryOnPreset,
      tags: draft.tags,
      suggestedPrice,
      fitScore,
    });
    router.push("/seller");
  }

  return (
    <LayoutFrame
      mode="creator"
      title="博主 AI 内容工作台"
      actions={
        <>
          <Link href="/community" className={cn(buttonVariants({ variant: "outline" }))}>
            <Shirt data-icon="inline-start" />
            我的社区
          </Link>
          <Link href="/products" className={cn(buttonVariants({ variant: "outline" }))}>
            <ShoppingCart data-icon="inline-start" />
            商城
          </Link>
        </>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl">AI 内容生成</CardTitle>
                  <CardDescription>先选商品，再生成图文或短视频脚本；我的社区默认开启，用于沉淀内容资产。</CardDescription>
                </div>
                <Badge>{monetizationScore}% 变现潜力</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  商单商品
                  <select
                    value={selectedProductId}
                    onChange={(event) => setSelectedProductId(event.target.value)}
                    className="h-11 rounded-2xl border border-input bg-background px-4"
                  >
                    {state.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex flex-col gap-2 text-sm">
                  内容格式
                  <div className="flex flex-wrap items-center gap-2">
                    <ToggleGroup
                      value={[format]}
                      onValueChange={(value) => {
                        const next = value[0] as GeneratedContentDraft["format"] | undefined;
                        if (next) {
                          setFormat(next);
                        }
                      }}
                      className="justify-start"
                    >
                      <ToggleGroupItem value="image-post">AI图文</ToggleGroupItem>
                      <ToggleGroupItem value="video-script">短视频脚本</ToggleGroupItem>
                    </ToggleGroup>
                    <Link
                      href="https://jimeng.jianying.com/"
                      target="_blank"
                      rel="noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
                    >
                      <ExternalLink data-icon="inline-start" />
                      一键生成视频
                    </Link>
                  </div>
                </div>
              </div>
              <label className="flex flex-col gap-2 text-sm">
                内容要求
                <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={4} />
              </label>
              <div className="grid gap-3 rounded-[22px] border border-border/70 p-4">
                <p className="text-sm font-medium">发布目的地</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(["community", "douyin", "xhs-miniapp"] as PublishDestination[]).map((destination) => (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => toggleDestination(destination)}
                      className={cn(
                        "rounded-[18px] border px-4 py-3 text-left text-sm transition",
                        destinations.includes(destination)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 bg-white hover:bg-secondary/50",
                      )}
                    >
                      <span className="block font-semibold">{destinationLabels[destination]}</span>
                      <span className="mt-1 block text-xs opacity-75">{destinationDescriptions[destination]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-wrap justify-end gap-3 bg-transparent">
              <Button onClick={() => generateContent()} disabled={loading || !selectedProduct}>
                {loading ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Sparkles data-icon="inline-start" />}
                生成内容草稿
              </Button>
              <Button variant="outline" onClick={publishDraft} disabled={loading || !draft}>
                <ArrowRight data-icon="inline-start" />
                一键发布/生成发布包
              </Button>
            </CardFooter>
          </Card>

        </div>

        <aside className="space-y-4">
          <Card className="soft-panel border-0 bg-white/96 shadow-none lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>草稿预览</CardTitle>
              <CardDescription>{selectedSeller?.name ?? "商户"} · {selectedProduct?.name ?? "商品"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={draft?.media[0] ?? selectedProduct?.tryOnPreset ?? seedProducts[0].tryOnPreset}
                alt="内容草稿预览"
                className="h-[520px] w-full rounded-[26px] object-cover"
              />
              <div>
                <p className="text-xl font-semibold">{draft?.title ?? "生成后这里会展示标题"}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {draft?.body ?? "AI 图文会展示正文，短视频模式会展示分镜脚本。"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(draft?.tags ?? selectedProduct?.tags ?? []).slice(0, 6).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              {publishResults.length ? (
                <div className="grid gap-2">
                  {publishResults.map((result) => (
                    <div key={result.destination} className="rounded-[16px] border border-border/70 px-3 py-3 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">{destinationLabels[result.destination]}</span>
                        <Badge variant={result.status === "published" ? "default" : "secondary"}>{result.status}</Badge>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{result.message}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              <Button variant="outline" onClick={sendDraftToSeller} disabled={!draft} className="w-full">
                <Store data-icon="inline-start" />
                发送给商户确认合作
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function CreatePage() {
  return <CreatorWorkspacePage />;
}

export function LegacyCreatePage() {
  const { state, publishUserPost } = useDemo();
  const router = useRouter();
  const currentBlogger = resolveBlogger(state.bloggers, "blogger-me") ?? state.bloggers[0];
  const [title, setTitle] = useState("今天的通勤 Clean Fit");
  const [body, setBody] = useState("用一件干净的外套搭配利落下装，整体适合日常通勤和周末出门。");
  const [tags, setTags] = useState("Clean Fit,通勤,极简");
  const [postImages, setPostImages] = useState<string[]>([currentBlogger?.coverImage ?? seedProducts[0].tryOnPreset]);
  const realFollowers = getCurrentUserFollowers(state.bloggers);
  const realFollowerCount = realFollowers.length;
  const commissionUnlocked = realFollowerCount > 1000;
  const commissionCards = state.products.slice(0, 6).map((product, index) => {
    const seller = resolveSeller(state.sellers, product.sellerId);
    const overlap = currentBlogger
      ? currentBlogger.styleTags.filter((tag) => product.tags.includes(tag)).length
      : 1;
    const fitScore = Math.min(98, 78 + overlap * 7 + (index % 3) * 3);
    const suggestedPrice = Math.round((120 + realFollowerCount * 0.55 + fitScore * 1.8) / 10) * 10;

    return {
      id: `commission-${product.id}`,
      product,
      seller,
      fitScore,
      suggestedPrice,
      requirement: `寻找 ${product.tags.slice(0, 2).join(" / ")} 风格的图文带货帖。`,
    };
  });

  function publishTraditionalPost() {
    const coverImage = postImages[0];
    if (!coverImage) {
      toast.error("请先上传至少一张帖子图片。");
      return;
    }

    const post = publishUserPost({
      title,
      body,
      coverImage,
      images: postImages,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    });
    router.push(`/posts/${post.id}`);
  }

  return (
    <LayoutFrame
      title="发图文"
      actions={
        <Link href="/me" className={cn(buttonVariants({ variant: "outline" }))}>
          <Home data-icon="inline-start" />
          返回我的
        </Link>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <CardTitle className="text-3xl">发布图文</CardTitle>
              <CardDescription>上传多张本地图片，填写标题、正文和标签后发布到社区。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <LocalImageUploader label="上传帖子图片" images={postImages} onChange={setPostImages} />
              <label className="flex flex-col gap-2 text-sm">
                标题
                <Input value={title} onChange={(event) => setTitle(event.target.value)} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                正文
                <Textarea value={body} onChange={(event) => setBody(event.target.value)} rows={5} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                标签
                <Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="Clean Fit,通勤" />
              </label>
              <Button onClick={publishTraditionalPost} disabled={!title.trim() || !postImages.length}>
                <ArrowRight data-icon="inline-start" />
                发布图文
              </Button>
            </CardContent>
          </Card>

          <Card className="soft-panel border-0 bg-white/96 shadow-none">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-3xl">商单广场</CardTitle>
                  <CardDescription>粉丝数大于 1000 后解锁，系统按适配度和粉丝数给出建议报价。</CardDescription>
                </div>
                <Badge variant={commissionUnlocked ? "default" : "secondary"}>
                  {commissionUnlocked ? `已解锁 · ${realFollowerCount} 粉` : `未解锁 · ${realFollowerCount}/1000`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {commissionCards.map((card) => (
                <div key={card.id} className={cn("rounded-[26px] border border-border/70 bg-white p-4", !commissionUnlocked && "opacity-70")}>
                  <img src={card.product.image} alt={card.product.name} className="h-52 w-full rounded-[20px] object-cover" />
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{card.product.name}</p>
                        <p className="text-sm text-muted-foreground">{card.seller?.name ?? "商户"}</p>
                      </div>
                      <Badge>{card.fitScore}% 适配</Badge>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{card.requirement}</p>
                    <div className="rounded-[18px] bg-secondary/60 px-4 py-3">
                      <p className="text-xs text-muted-foreground">智能阶梯报价</p>
                      <p className="mt-1 text-2xl font-semibold">{formatCurrency(card.suggestedPrice)}</p>
                    </div>
                    <div className="grid gap-2">
                      {commissionUnlocked ? (
                        <Link href={`/try-on?productId=${card.product.id}&commission=1`} className={cn(buttonVariants({ variant: "outline" }))}>
                          <Sparkles data-icon="inline-start" />
                          生成穿搭图
                        </Link>
                      ) : (
                        <Button variant="outline" disabled>
                          <Lock data-icon="inline-start" />
                          1000 粉后解锁
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="soft-panel border-0 bg-white/96 shadow-none lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>发布预览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={postImages[0] ?? currentBlogger?.coverImage}
                alt="发布预览"
                className="h-[520px] w-full rounded-[26px] object-cover"
              />
              <div>
                <p className="text-xl font-semibold">{title}</p>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </LayoutFrame>
  );
}

export function MePage() {
  const { state } = useDemo();
  const [listType, setListType] = useState<"following" | "followers" | null>(null);
  const [activeProfileSection, setActiveProfileSection] = useState<"published" | "liked" | "saved">("published");
  const currentBlogger = resolveBlogger(state.bloggers, "blogger-me") ?? {
    id: "blogger-me",
    name: "游客用户",
    avatar: "ME",
    bio: "",
    followerCount: 0,
    styleTags: [],
    coverImage: "",
  };
  const publishedPosts = getBloggerPosts(state.posts, currentBlogger.id);
  const likedPosts = state.posts.filter((post) => state.viewer.likedPostIds.includes(post.id));
  const savedPosts = state.posts.filter((post) => state.viewer.savedPostIds.includes(post.id));
  const followedBloggers = state.bloggers.filter((blogger) => state.viewer.followedBloggerIds.includes(blogger.id));
  const followedSellers = state.sellers.filter((seller) => state.viewer.followedSellerIds.includes(seller.id));
  const realFollowers = getCurrentUserFollowers(state.bloggers);
  const realFollowerCount = realFollowers.length;
  const receivedLikes = publishedPosts.reduce((sum, post) => sum + post.likes, 0);
  const followingCount = followedBloggers.length + followedSellers.length;
  const activeSections: Record<typeof activeProfileSection, ProfileSection> = {
    published: {
      key: "likedPosts",
      title: "发布的帖子",
      count: publishedPosts.length,
      emptyLabel: "还没有发布帖子，点击顶部发布按钮创建第一篇。",
      content: (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publishedPosts.map((post) => (
            <PostMiniCard key={post.id} post={post} />
          ))}
        </div>
      ),
    },
    liked: {
      key: "likedPosts",
      title: "点赞的帖子",
      count: likedPosts.length,
      emptyLabel: "还没有点赞的帖子，先去社区逛逛。",
      content: (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {likedPosts.map((post) => (
            <PostMiniCard key={post.id} post={post} />
          ))}
        </div>
      ),
    },
    saved: {
      key: "savedPosts",
      title: "收藏的帖子",
      count: savedPosts.length,
      emptyLabel: "还没有收藏帖子，进入帖子详情页可收藏。",
      content: (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {savedPosts.map((post) => (
            <PostMiniCard key={post.id} post={post} />
          ))}
        </div>
      ),
    },
  };
  const switchItems = [
    { id: "published" as const, label: "发布的帖子", count: publishedPosts.length },
    { id: "liked" as const, label: "点赞的帖子", count: likedPosts.length },
    { id: "saved" as const, label: "收藏的帖子", count: savedPosts.length },
  ];
  const activeSectionIndex = switchItems.findIndex((item) => item.id === activeProfileSection);
  const activeSection = activeSections[activeProfileSection];

  return (
    <>
      <ProfilePageShell
        title="我的"
        avatar={currentBlogger.avatar}
        name={currentBlogger.name}
        subtitle="本人视角 · 用户主页"
        actions={
          <Link href="/creator" className={cn(buttonVariants({ variant: "outline" }))}>
            <Sparkles data-icon="inline-start" />
            内容工作台
          </Link>
        }
        stats={[
          { label: "关注", value: followingCount.toString(), onClick: () => setListType("following") },
          { label: "粉丝", value: realFollowerCount.toString(), onClick: () => setListType("followers") },
          { label: "帖子数", value: publishedPosts.length.toString() },
          { label: "收到点赞", value: receivedLikes.toString() },
        ]}
        visibility={activeProfileSection === "published" ? undefined : state.viewer.sectionVisibility}
        sections={[
          {
            key: activeSection.key,
            title: "我的内容",
            count: activeSection.count,
            emptyLabel: activeSection.emptyLabel,
            forceContent: true,
            content: (
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-[30px] border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(238,231,218,0.72))] p-2 shadow-[0_18px_50px_-34px_rgba(49,40,27,0.65)]">
                  <div
                    className="absolute bottom-2 top-2 rounded-[24px] bg-primary shadow-[0_18px_32px_-20px_rgba(49,40,27,0.7)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      width: "calc((100% - 1rem) / 3)",
                      transform: `translateX(calc(${activeSectionIndex} * (100% + 0.5rem)))`,
                    }}
                  />
                  <div className="relative grid grid-cols-3 gap-2">
                    {switchItems.map((item) => {
                      const active = activeProfileSection === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveProfileSection(item.id)}
                          className={cn(
                            "rounded-[24px] px-3 py-4 text-left transition duration-300",
                            active ? "text-primary-foreground" : "text-muted-foreground hover:bg-white/60 hover:text-foreground",
                          )}
                        >
                          <span className="block text-sm font-semibold">{item.label}</span>
                          <span className={cn("mt-1 block text-2xl font-semibold", active ? "text-primary-foreground" : "text-foreground")}>
                            {item.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div key={activeProfileSection} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                  {activeSection.count > 0 ? activeSection.content : <EmptyState label={activeSection.emptyLabel} />}
                </div>
              </div>
            ),
          },
        ]}
      />

      <Dialog open={listType !== null} onOpenChange={(open) => !open && setListType(null)}>
        <DialogContent className="max-w-xl rounded-[28px]">
          <DialogHeader>
            <DialogTitle>{listType === "followers" ? "粉丝" : "关注"}</DialogTitle>
            <DialogDescription>
              {listType === "followers" ? "关注你的用户列表。" : "你关注的博主和商户。"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid max-h-[520px] gap-3 overflow-y-auto">
            {listType === "followers" ? (
              realFollowers.length ? (
                realFollowers.map((follower) => <FollowerMiniCard key={follower.id} follower={follower} />)
              ) : (
                <EmptyState label="暂时还没有粉丝。" />
              )
            ) : followingCount ? (
              <>
                {followedBloggers.map((blogger) => (
                  <BloggerMiniCard key={blogger.id} blogger={blogger} />
                ))}
                {followedSellers.map((seller) => (
                  <SellerMiniCard key={seller.id} seller={seller} />
                ))}
              </>
            ) : (
              <EmptyState label="还没有关注任何博主或商户。" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SettingsPage() {
  const { state, setSectionVisibility } = useDemo();
  const sections = Object.keys(sectionTitles) as ProfileSectionKey[];

  return (
    <LayoutFrame
      title="设置"
      actions={
        <Link href="/me" className={cn(buttonVariants({ variant: "outline" }))}>
          <Home data-icon="inline-start" />
          返回我的主页
        </Link>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="soft-panel border-0 bg-white/96 shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl">主页可见度</CardTitle>
            <CardDescription>设置我的主页里每个 section 对外展示的权限。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section) => (
              <div
                key={section}
                className="grid gap-3 rounded-[24px] border border-border/70 p-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-center"
              >
                <div>
                  <p className="font-semibold">{sectionTitles[section]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    当前：{visibilityLabels[state.viewer.sectionVisibility[section]]}
                  </p>
                </div>
                <ToggleGroup
                  value={[state.viewer.sectionVisibility[section]]}
                  onValueChange={(value) => {
                    const next = value[0] as ProfileVisibility | undefined;
                    if (next) {
                      setSectionVisibility(section, next);
                    }
                  }}
                  className="flex-wrap justify-start"
                >
                  {(Object.keys(visibilityLabels) as ProfileVisibility[]).map((visibility) => (
                    <ToggleGroupItem key={visibility} value={visibility}>
                      {visibilityLabels[visibility]}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="soft-panel h-fit border-0 bg-white/96 shadow-none lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>可见度说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>公开可见：任何访客都能看到。</p>
            <p>关注的人可见：你关注的人能看到。</p>
            <p>粉丝可见：关注你的人能看到。</p>
            <p>互关可见：双方互相关注时可见。</p>
          </CardContent>
        </Card>
      </section>
    </LayoutFrame>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-[24px] border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
      {label}
    </div>
  );
}

function LoadingScreen({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-border/70 bg-white/90 px-6 py-3">
        <LoaderCircle className="animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
}

function MissingScreen({ title, description }: { title: string; description: string }) {
  return (
    <LayoutFrame title={title} description={description}>
      <Card className="soft-panel border-0 bg-white/96 shadow-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="bg-transparent">
          <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
            回到入口页
          </Link>
        </CardFooter>
      </Card>
    </LayoutFrame>
  );
}
