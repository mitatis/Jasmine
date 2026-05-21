"use client";

/* eslint-disable @next/next/no-img-element -- content covers can be arbitrary user-provided URLs. */

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BadgeCheck,
  Bookmark,
  ExternalLink,
  Eye,
  Flame,
  Heart,
  Link2,
  LoaderCircle,
  Mail,
  MessageCircle,
  Play,
  RefreshCw,
  Save,
  Share2,
  ShieldCheck,
  Star,
  Trophy,
  Unlink,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api } from "@/lib/api-client";
import type { CreatorProfileRead, CreatorProfileUpdate } from "@/lib/types";
import { cn } from "@/lib/utils";

type VisibilityKey = "business" | "platforms" | "stats" | "assets";
type VisibilitySettings = Record<VisibilityKey, "public" | "private">;
type StrengthKey = "visual_style" | "engagement" | "conversion" | "video" | "delivery";
type StrengthScores = Record<StrengthKey, number>;
type PlatformKey = "xhs" | "douyin" | "weibo" | "video_channel" | "email" | "bilibili";
type NumericPlatformField = "followers" | "total_likes" | "avg_likes" | "avg_views" | "engagement_rate";

type CollaborationInfo = {
  contact_email: string;
  preferred_platforms: string[];
  rate_card: Record<string, number>;
  quote_range: {
    min: number;
    max: number;
  };
  categories: string[];
  style_preferences: string[];
  content_strengths: StrengthScores;
  notes: string;
};

type PlatformLink = {
  handle: string;
  url: string;
  linked: boolean;
  followers: number;
  total_likes: number;
  avg_likes: number;
  avg_views: number;
  engagement_rate: number;
  last_synced: string;
};

type ContentExample = {
  id: string;
  title: string;
  platform: string;
  format: string;
  cover_url: string;
  hook: string;
  tags: string[];
  metrics: {
    views: number;
    likes: number;
    comments: number;
    saves: number;
    shares: number;
  };
};

const defaultVisibility: VisibilitySettings = {
  business: "public",
  platforms: "public",
  stats: "public",
  assets: "private",
};

const strengthDefs: { key: StrengthKey; label: string; shortLabel: string }[] = [
  { key: "visual_style", label: "视觉风格", shortLabel: "视觉" },
  { key: "engagement", label: "互动黏性", shortLabel: "互动" },
  { key: "conversion", label: "种草转化", shortLabel: "转化" },
  { key: "video", label: "短视频表现", shortLabel: "视频" },
  { key: "delivery", label: "商单履约", shortLabel: "履约" },
];

const platformDefs: {
  key: PlatformKey;
  label: string;
  accountLabel: string;
  accentClass: string;
  aliases?: string[];
  seed: Omit<PlatformLink, "linked" | "last_synced">;
}[] = [
  {
    key: "xhs",
    label: "小红书",
    accountLabel: "小红书主页",
    accentClass: "bg-rose-50 text-rose-700 ring-rose-100",
    aliases: ["xiaohongshu"],
    seed: {
      handle: "nora_cleanfit",
      url: "https://www.xiaohongshu.com/user/profile/nora_cleanfit",
      followers: 128000,
      total_likes: 936000,
      avg_likes: 8200,
      avg_views: 186000,
      engagement_rate: 7.8,
    },
  },
  {
    key: "douyin",
    label: "抖音",
    accountLabel: "抖音主页",
    accentClass: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    seed: {
      handle: "nora_stylelab",
      url: "https://www.douyin.com/user/nora_stylelab",
      followers: 76000,
      total_likes: 412000,
      avg_likes: 4600,
      avg_views: 92000,
      engagement_rate: 6.2,
    },
  },
  {
    key: "weibo",
    label: "微博",
    accountLabel: "微博主页",
    accentClass: "bg-orange-50 text-orange-700 ring-orange-100",
    seed: {
      handle: "Nora通勤衣橱",
      url: "https://weibo.com/nora-style",
      followers: 53000,
      total_likes: 180000,
      avg_likes: 1800,
      avg_views: 44000,
      engagement_rate: 4.1,
    },
  },
  {
    key: "video_channel",
    label: "视频号",
    accountLabel: "视频号名片",
    accentClass: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    aliases: ["wechat_video", "shipinhao"],
    seed: {
      handle: "Nora Clean Fit",
      url: "https://channels.weixin.qq.com/nora-cleanfit",
      followers: 41000,
      total_likes: 97000,
      avg_likes: 1600,
      avg_views: 36000,
      engagement_rate: 5.4,
    },
  },
  {
    key: "email",
    label: "邮箱",
    accountLabel: "合作邮箱",
    accentClass: "bg-violet-50 text-violet-700 ring-violet-100",
    seed: {
      handle: "collab@jasmine.demo",
      url: "mailto:collab@jasmine.demo",
      followers: 0,
      total_likes: 0,
      avg_likes: 0,
      avg_views: 0,
      engagement_rate: 0,
    },
  },
  {
    key: "bilibili",
    label: "B站",
    accountLabel: "B站主页",
    accentClass: "bg-sky-50 text-sky-700 ring-sky-100",
    seed: {
      handle: "NoraStyle",
      url: "https://space.bilibili.com/norastyle",
      followers: 28000,
      total_likes: 116000,
      avg_likes: 2100,
      avg_views: 52000,
      engagement_rate: 5.1,
    },
  },
];

const emptyCollaboration: CollaborationInfo = {
  contact_email: "",
  preferred_platforms: [],
  rate_card: {},
  quote_range: { min: 0, max: 0 },
  categories: [],
  style_preferences: [],
  content_strengths: {
    visual_style: 60,
    engagement: 60,
    conversion: 60,
    video: 60,
    delivery: 60,
  },
  notes: "",
};

export function CreatorMeProfilePage() {
  const queryClient = useQueryClient();
  const profiles = useQuery({ queryKey: ["my-creators"], queryFn: api.myCreators });
  const profile = profiles.data?.[0] ?? null;
  const [view, setView] = useState<"owner" | "visitor">("owner");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [styleTags, setStyleTags] = useState("");
  const [visibility, setVisibility] = useState<VisibilitySettings>(defaultVisibility);
  const [collaboration, setCollaboration] = useState<CollaborationInfo>(emptyCollaboration);
  const [platforms, setPlatforms] = useState<Record<PlatformKey, PlatformLink>>(emptyPlatforms());
  const [contentExamples, setContentExamples] = useState<ContentExample[]>([]);

  const visitorProfile = useQuery({
    queryKey: ["creator-profile", profile?.id, "visitor"],
    queryFn: () => api.creatorProfile(profile?.id ?? "", "visitor"),
    enabled: Boolean(profile?.id) && view === "visitor",
  });

  useEffect(() => {
    if (!profile) {
      return;
    }
    queueMicrotask(() => {
      setDisplayName(profile.display_name);
      setBio(profile.bio ?? "");
      setStyleTags(readTags(profile).join(", "));
      setVisibility(readVisibility(profile));
      setCollaboration(readCollaboration(profile));
      setPlatforms(readPlatforms(profile));
      setContentExamples(readContentExamples(profile));
    });
  }, [profile?.id, profile]);

  const saveProfile = useMutation({
    mutationFn: (payload: CreatorProfileUpdate) => {
      if (!profile) {
        throw new Error("Creator profile missing");
      }
      return api.updateCreator(profile.id, payload);
    },
    onSuccess: async () => {
      toast.success("资料已保存");
      await queryClient.invalidateQueries({ queryKey: ["my-creators"] });
      await queryClient.invalidateQueries({ queryKey: ["creator-profile", profile?.id] });
    },
  });

  const visibleProfile = view === "visitor" ? visitorProfile.data ?? profile : profile;
  const ownerDraftProfile = useMemo(() => {
    if (!profile) {
      return null;
    }
    return {
      ...profile,
      display_name: displayName,
      bio,
      style_tags: splitList(styleTags),
      visibility_settings: visibility,
      collaboration_info: collaboration,
      platforms,
      content_examples: contentExamples,
    } satisfies CreatorProfileRead;
  }, [bio, collaboration, contentExamples, displayName, platforms, profile, styleTags, visibility]);

  if (profiles.isLoading) {
    return <ProfileLoading label="正在加载我的资料..." />;
  }

  if (!profile) {
    return (
      <main className="page-shell py-8">
        <EmptyProfile title="暂无博主资料" description="当前账号还没有可展示的博主资料。" />
      </main>
    );
  }

  function updatePlatform(key: PlatformKey, field: keyof PlatformLink, value: string | boolean | number) {
    setPlatforms((current) => ({
      ...current,
      [key]: {
        ...current[key],
        [field]: value,
      },
    }));
  }

  function updatePlatformMetric(key: PlatformKey, field: NumericPlatformField, value: string) {
    updatePlatform(key, field, toNumber(value));
  }

  function connectPlatform(key: PlatformKey) {
    const definition = platformDefs.find((item) => item.key === key);
    if (!definition) {
      return;
    }
    const seededEmail = key === "email" && collaboration.contact_email ? collaboration.contact_email : definition.seed.handle;
    setPlatforms((current) => {
      const existing = current[key];
      return {
        ...current,
        [key]: {
          ...existing,
          ...definition.seed,
          handle: existing.handle || seededEmail,
          url: existing.url || (key === "email" && collaboration.contact_email ? `mailto:${collaboration.contact_email}` : definition.seed.url),
          followers: existing.followers || definition.seed.followers,
          total_likes: existing.total_likes || definition.seed.total_likes,
          avg_likes: existing.avg_likes || definition.seed.avg_likes,
          avg_views: existing.avg_views || definition.seed.avg_views,
          engagement_rate: existing.engagement_rate || definition.seed.engagement_rate,
          linked: true,
          last_synced: todayLabel(),
        },
      };
    });
    if (key !== "email") {
      setCollaboration((current) => ({
        ...current,
        preferred_platforms: uniqueList([...current.preferred_platforms, definition.label]),
      }));
    }
    toast.success(`${definition.label} 已关联`);
  }

  function disconnectPlatform(key: PlatformKey) {
    const definition = platformDefs.find((item) => item.key === key);
    setPlatforms((current) => ({
      ...current,
      [key]: {
        ...current[key],
        linked: false,
        last_synced: "",
      },
    }));
    toast.message(`${definition?.label ?? "账号"} 已取消关联`);
  }

  function refreshPlatform(key: PlatformKey) {
    const definition = platformDefs.find((item) => item.key === key);
    updatePlatform(key, "last_synced", todayLabel());
    toast.success(`${definition?.label ?? "账号"} 战绩已刷新`);
  }

  function updateContentExample(id: string, updater: (current: ContentExample) => ContentExample) {
    setContentExamples((current) => current.map((item) => (item.id === id ? updater(item) : item)));
  }

  function updateContentMetric(id: string, key: keyof ContentExample["metrics"], value: string) {
    updateContentExample(id, (item) => ({
      ...item,
      metrics: {
        ...item.metrics,
        [key]: toNumber(value),
      },
    }));
  }

  function addContentExample() {
    setContentExamples((current) => [...current, makeContentExample(current.length)]);
  }

  function loadExampleSet() {
    setContentExamples(defaultContentExamples());
    toast.success("已填入爆款内容样本");
  }

  function submitProfile() {
    saveProfile.mutate({
      display_name: displayName,
      bio,
      style_tags: splitList(styleTags),
      visibility_settings: visibility,
      collaboration_info: {
        ...collaboration,
        preferred_platforms: collaboration.preferred_platforms,
        categories: collaboration.categories,
        style_preferences: collaboration.style_preferences,
        quote_range: collaboration.quote_range,
        content_strengths: collaboration.content_strengths,
      },
      platforms,
      content_examples: contentExamples,
    });
  }

  return (
    <main className="min-h-screen bg-background pb-12">
      <section className="page-shell py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/campaigns" className="font-heading text-4xl leading-none tracking-normal">
              Jasmine
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">博主端 · 我的战绩资料</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ToggleGroup value={[view]} onValueChange={(value) => value[0] && setView(value[0] as typeof view)}>
              <ToggleGroupItem value="owner">本人视角</ToggleGroupItem>
              <ToggleGroupItem value="visitor">访客预览</ToggleGroupItem>
            </ToggleGroup>
            <Link href={`/creators/${profile.id}`} className={cn(buttonVariants({ variant: "outline" }))}>
              <ExternalLink data-icon="inline-start" />
              公开页
            </Link>
          </div>
        </div>

        {view === "visitor" ? (
          <ProfileReadOnly profile={visibleProfile} title="访客战绩卡" />
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-6">
              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">基础资料</CardTitle>
                  <CardDescription>访客页会优先读取这些字段作为博主合作资料的主视觉信息。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="显示名称" aria-label="显示名称" />
                  <Textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} placeholder="简介" aria-label="简介" />
                  <Input value={styleTags} onChange={(event) => setStyleTags(event.target.value)} placeholder="通勤极简, Clean Fit" aria-label="风格标签" />
                </CardContent>
              </Card>

              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">商务合作参数</CardTitle>
                  <CardDescription>报价、风格偏好和能力值会组成访客页的商单战绩面板。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      value={collaboration.contact_email}
                      onChange={(event) => setCollaboration((current) => ({ ...current, contact_email: event.target.value }))}
                      placeholder="合作邮箱"
                      aria-label="合作邮箱"
                    />
                    <Input
                      value={collaboration.preferred_platforms.join(", ")}
                      onChange={(event) => setCollaboration((current) => ({ ...current, preferred_platforms: splitList(event.target.value) }))}
                      placeholder="优先平台"
                      aria-label="优先平台"
                    />
                    <Input
                      value={collaboration.categories.join(", ")}
                      onChange={(event) => setCollaboration((current) => ({ ...current, categories: splitList(event.target.value) }))}
                      placeholder="合作品类"
                      aria-label="合作品类"
                    />
                    <Input
                      value={collaboration.style_preferences.join(", ")}
                      onChange={(event) => setCollaboration((current) => ({ ...current, style_preferences: splitList(event.target.value) }))}
                      placeholder="偏好风格"
                      aria-label="偏好风格"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-4">
                    <Input
                      type="number"
                      min="0"
                      value={collaboration.quote_range.min ? String(collaboration.quote_range.min) : ""}
                      onChange={(event) => setCollaboration((current) => ({
                        ...current,
                        quote_range: { ...current.quote_range, min: toNumber(event.target.value) },
                      }))}
                      placeholder="报价下限"
                      aria-label="报价下限"
                    />
                    <Input
                      type="number"
                      min="0"
                      value={collaboration.quote_range.max ? String(collaboration.quote_range.max) : ""}
                      onChange={(event) => setCollaboration((current) => ({
                        ...current,
                        quote_range: { ...current.quote_range, max: toNumber(event.target.value) },
                      }))}
                      placeholder="报价上限"
                      aria-label="报价上限"
                    />
                    <Input
                      type="number"
                      min="0"
                      value={collaboration.rate_card.image_post ? String(collaboration.rate_card.image_post) : ""}
                      onChange={(event) => setCollaboration((current) => ({
                        ...current,
                        rate_card: { ...current.rate_card, image_post: toNumber(event.target.value) },
                      }))}
                      placeholder="图文报价"
                      aria-label="图文报价"
                    />
                    <Input
                      type="number"
                      min="0"
                      value={collaboration.rate_card.video_script ? String(collaboration.rate_card.video_script) : ""}
                      onChange={(event) => setCollaboration((current) => ({
                        ...current,
                        rate_card: { ...current.rate_card, video_script: toNumber(event.target.value) },
                      }))}
                      placeholder="短视频报价"
                      aria-label="短视频报价"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-5">
                    {strengthDefs.map((strength) => (
                      <label key={strength.key} className="rounded-lg border bg-secondary/30 p-3">
                        <span className="flex items-center justify-between text-xs text-muted-foreground">
                          {strength.label}
                          <span className="font-semibold text-foreground">{collaboration.content_strengths[strength.key]}</span>
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={collaboration.content_strengths[strength.key]}
                          onChange={(event) => setCollaboration((current) => ({
                            ...current,
                            content_strengths: {
                              ...current.content_strengths,
                              [strength.key]: toNumber(event.target.value),
                            },
                          }))}
                          className="mt-3 w-full accent-foreground"
                          aria-label={`${strength.label}能力值`}
                        />
                      </label>
                    ))}
                  </div>
                  <Textarea
                    value={collaboration.notes}
                    onChange={(event) => setCollaboration((current) => ({ ...current, notes: event.target.value }))}
                    rows={3}
                    placeholder="合作备注"
                    aria-label="合作备注"
                  />
                </CardContent>
              </Card>

              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">第三方账号战绩</CardTitle>
                  <CardDescription>点击关联后会写入账号状态和可编辑的数据，用于公开页展示。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {platformDefs.map((platform) => {
                    const item = platforms[platform.key];
                    return (
                      <div key={platform.key} className="rounded-xl border bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className={cn("inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold ring-1", platform.accentClass)}>
                              {platform.label.slice(0, 1)}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 font-semibold">
                                {platform.label}
                                {item.linked ? <BadgeCheck className="size-4 text-emerald-600" /> : null}
                              </div>
                              <p className="text-xs text-muted-foreground">{item.last_synced ? `最近同步 ${item.last_synced}` : "未关联"}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.linked ? (
                              <>
                                <Button type="button" variant="outline" size="sm" onClick={() => refreshPlatform(platform.key)}>
                                  <RefreshCw data-icon="inline-start" />
                                  刷新
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => disconnectPlatform(platform.key)}>
                                  <Unlink data-icon="inline-start" />
                                  解除
                                </Button>
                              </>
                            ) : (
                              <Button type="button" variant="outline" size="sm" onClick={() => connectPlatform(platform.key)}>
                                {platform.key === "email" ? <Mail data-icon="inline-start" /> : <Link2 data-icon="inline-start" />}
                                关联
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                          <Input
                            value={item.handle}
                            onChange={(event) => updatePlatform(platform.key, "handle", event.target.value)}
                            placeholder={platform.accountLabel}
                            aria-label={`${platform.label}账号`}
                          />
                          <Input
                            value={item.url}
                            onChange={(event) => updatePlatform(platform.key, "url", event.target.value)}
                            placeholder="主页链接"
                            aria-label={`${platform.label}主页链接`}
                          />
                          <Input
                            type="number"
                            min="0"
                            value={item.followers ? String(item.followers) : ""}
                            onChange={(event) => updatePlatformMetric(platform.key, "followers", event.target.value)}
                            placeholder="粉丝数"
                            aria-label={`${platform.label}粉丝数`}
                          />
                          <Input
                            type="number"
                            min="0"
                            value={item.total_likes ? String(item.total_likes) : ""}
                            onChange={(event) => updatePlatformMetric(platform.key, "total_likes", event.target.value)}
                            placeholder="累计点赞"
                            aria-label={`${platform.label}累计点赞`}
                          />
                          <Input
                            type="number"
                            min="0"
                            value={item.avg_likes ? String(item.avg_likes) : ""}
                            onChange={(event) => updatePlatformMetric(platform.key, "avg_likes", event.target.value)}
                            placeholder="均赞"
                            aria-label={`${platform.label}均赞`}
                          />
                          <Input
                            type="number"
                            min="0"
                            value={item.avg_views ? String(item.avg_views) : ""}
                            onChange={(event) => updatePlatformMetric(platform.key, "avg_views", event.target.value)}
                            placeholder="均播放/阅读"
                            aria-label={`${platform.label}均播放`}
                          />
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={item.engagement_rate ? String(item.engagement_rate) : ""}
                            onChange={(event) => updatePlatformMetric(platform.key, "engagement_rate", event.target.value)}
                            placeholder="互动率 %"
                            aria-label={`${platform.label}互动率`}
                          />
                          <div className="flex items-center rounded-lg border bg-secondary/30 px-3 text-sm text-muted-foreground">
                            {item.linked ? "公开页展示" : "点击关联后展示"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="font-sans text-2xl font-semibold tracking-normal">爆款内容预览</CardTitle>
                      <CardDescription>用于访客页展示代表作、互动数据和内容钩子。</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={loadExampleSet}>
                        <Flame data-icon="inline-start" />
                        填入样本
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={addContentExample}>
                        <Star data-icon="inline-start" />
                        添加
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {contentExamples.length ? (
                    contentExamples.map((item, index) => (
                      <div key={item.id} className="grid gap-4 rounded-xl border p-4 lg:grid-cols-[160px_minmax(0,1fr)]">
                        <div className="overflow-hidden rounded-lg border bg-secondary">
                          {item.cover_url ? (
                            <img src={item.cover_url} alt={item.title} className="h-44 w-full object-cover lg:h-full" />
                          ) : (
                            <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">内容封面</div>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <div className="grid gap-3 md:grid-cols-2">
                            <Input
                              value={item.title}
                              onChange={(event) => updateContentExample(item.id, (current) => ({ ...current, title: event.target.value }))}
                              placeholder="标题"
                              aria-label={`爆款内容 ${index + 1} 标题`}
                            />
                            <Input
                              value={item.platform}
                              onChange={(event) => updateContentExample(item.id, (current) => ({ ...current, platform: event.target.value }))}
                              placeholder="平台"
                              aria-label={`爆款内容 ${index + 1} 平台`}
                            />
                            <Input
                              value={item.cover_url}
                              onChange={(event) => updateContentExample(item.id, (current) => ({ ...current, cover_url: event.target.value }))}
                              placeholder="封面 URL"
                              aria-label={`爆款内容 ${index + 1} 封面`}
                            />
                            <Input
                              value={item.tags.join(", ")}
                              onChange={(event) => updateContentExample(item.id, (current) => ({ ...current, tags: splitList(event.target.value) }))}
                              placeholder="内容标签"
                              aria-label={`爆款内容 ${index + 1} 标签`}
                            />
                          </div>
                          <Textarea
                            value={item.hook}
                            onChange={(event) => updateContentExample(item.id, (current) => ({ ...current, hook: event.target.value }))}
                            rows={2}
                            placeholder="内容钩子"
                            aria-label={`爆款内容 ${index + 1} 钩子`}
                          />
                          <div className="grid gap-3 md:grid-cols-5">
                            <Input type="number" min="0" value={item.metrics.views ? String(item.metrics.views) : ""} onChange={(event) => updateContentMetric(item.id, "views", event.target.value)} placeholder="浏览/播放" aria-label="浏览播放" />
                            <Input type="number" min="0" value={item.metrics.likes ? String(item.metrics.likes) : ""} onChange={(event) => updateContentMetric(item.id, "likes", event.target.value)} placeholder="点赞" aria-label="点赞" />
                            <Input type="number" min="0" value={item.metrics.comments ? String(item.metrics.comments) : ""} onChange={(event) => updateContentMetric(item.id, "comments", event.target.value)} placeholder="评论" aria-label="评论" />
                            <Input type="number" min="0" value={item.metrics.saves ? String(item.metrics.saves) : ""} onChange={(event) => updateContentMetric(item.id, "saves", event.target.value)} placeholder="收藏" aria-label="收藏" />
                            <Input type="number" min="0" value={item.metrics.shares ? String(item.metrics.shares) : ""} onChange={(event) => updateContentMetric(item.id, "shares", event.target.value)} placeholder="分享" aria-label="分享" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                      暂无爆款内容。可以添加一条，或填入样本后再编辑。
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6">
              <Card className="border bg-white shadow-none xl:sticky xl:top-24">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">公开权限</CardTitle>
                  <CardDescription>控制访客页看到的资料范围。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {(["business", "platforms", "stats", "assets"] as VisibilityKey[]).map((key) => (
                    <div key={key} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="font-medium">{visibilityLabel(key)}</span>
                        <Badge variant="secondary">{visibility[key] === "public" ? "公开" : "私有"}</Badge>
                      </div>
                      <ToggleGroup
                        value={[visibility[key]]}
                        onValueChange={(value) => {
                          const next = value[0] as "public" | "private" | undefined;
                          if (next) {
                            setVisibility((current) => ({ ...current, [key]: next }));
                          }
                        }}
                      >
                        <ToggleGroupItem value="public">公开</ToggleGroupItem>
                        <ToggleGroupItem value="private">私有</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  ))}
                  <Button onClick={submitProfile} disabled={saveProfile.isPending}>
                    {saveProfile.isPending ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : <Save data-icon="inline-start" />}
                    保存资料
                  </Button>
                </CardContent>
              </Card>

              <ProfileSnapshot profile={ownerDraftProfile} />
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export function CreatorVisitorProfilePage({ creatorId }: { creatorId: string }) {
  const profile = useQuery({
    queryKey: ["creator-profile", creatorId],
    queryFn: () => api.creatorProfile(creatorId),
  });

  if (profile.isLoading) {
    return <ProfileLoading label="正在加载博主资料..." />;
  }

  if (!profile.data) {
    return (
      <main className="page-shell py-8">
        <EmptyProfile title="资料不可用" description="这个博主资料不存在或暂时不可访问。" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-12">
      <section className="page-shell py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/campaigns" className="font-heading text-4xl leading-none tracking-normal">
              Jasmine
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">博主公开战绩</p>
          </div>
          <Link href="/me" className={cn(buttonVariants({ variant: "outline" }))}>
            返回我的
          </Link>
        </div>
        <ProfileReadOnly profile={profile.data} title="访客战绩卡" />
      </section>
    </main>
  );
}

function ProfileReadOnly({ profile, title }: { profile: CreatorProfileRead | null; title: string }) {
  const collaboration = profile ? readCollaboration(profile) : emptyCollaboration;
  const platforms = profile ? readPlatforms(profile) : emptyPlatforms();
  const tags = profile ? readTags(profile) : [];
  const examples = profile ? readContentExamples(profile) : [];
  const visibleExamples = examples.length ? examples : defaultContentExamples();
  const linkedPlatforms = platformDefs.map((platform) => ({ definition: platform, value: platforms[platform.key] })).filter(({ value }) => value.linked || value.handle || value.url);
  const totalFollowers = linkedPlatforms.reduce((sum, item) => sum + item.value.followers, 0);
  const totalLikes = linkedPlatforms.reduce((sum, item) => sum + item.value.total_likes, 0);
  const avgEngagement = average(linkedPlatforms.map((item) => item.value.engagement_rate).filter(Boolean));
  const powerScore = average(strengthDefs.map((item) => collaboration.content_strengths[item.key]));

  return (
    <div className="mt-6 space-y-6">
      <Card className="border bg-white shadow-none">
        <CardContent className="grid gap-6 p-4 md:p-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex min-w-0 flex-col justify-between gap-6 rounded-xl bg-foreground p-5 text-background md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-background text-2xl font-semibold text-foreground">
                  {profile?.display_name?.slice(0, 1) ?? "J"}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-background/60">{title}</p>
                  <h1 className="mt-1 font-sans text-3xl font-semibold tracking-normal md:text-4xl">{profile?.display_name ?? "博主资料"}</h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-background/70">{profile?.bio ?? "暂无简介"}</p>
                </div>
              </div>
              <div className="rounded-lg border border-background/20 px-3 py-2 text-right">
                <div className="text-xs text-background/55">商业段位</div>
                <div className="mt-1 text-2xl font-semibold">{rankLabel(powerScore)}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(tags.length ? tags : collaboration.style_preferences).slice(0, 8).map((tag) => (
                <span key={tag} className="rounded-full bg-background/10 px-3 py-1 text-xs text-background/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ScoreTile icon={<Trophy className="size-4" />} label="商单能力值" value={`${Math.round(powerScore)}`} caption={rankLabel(powerScore)} />
            <ScoreTile icon={<Users className="size-4" />} label="全网粉丝" value={formatCompactNumber(totalFollowers)} caption={`${linkedPlatforms.length} 个账号`} />
            <ScoreTile icon={<Heart className="size-4" />} label="累计获赞" value={formatCompactNumber(totalLikes)} caption="公开平台合计" />
            <ScoreTile icon={<Flame className="size-4" />} label="互动率" value={avgEngagement ? `${avgEngagement.toFixed(1)}%` : "-"} caption="近 30 天均值" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <Card className="border bg-white shadow-none">
            <CardHeader>
              <CardTitle className="font-sans text-2xl font-semibold tracking-normal">商单能力雷达</CardTitle>
              <CardDescription>按视觉、互动、转化、视频、履约五个维度展示合作能力。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <RadarChart scores={collaboration.content_strengths} />
              <div className="grid content-center gap-3">
                {strengthDefs.map((strength) => {
                  const score = collaboration.content_strengths[strength.key];
                  return (
                    <div key={strength.key} className="rounded-lg border bg-secondary/30 p-3">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{strength.label}</span>
                        <span className="font-semibold">{score}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-foreground" style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border bg-white shadow-none">
            <CardHeader>
              <CardTitle className="font-sans text-2xl font-semibold tracking-normal">爆款内容预览</CardTitle>
              <CardDescription>代表内容按播放、点赞、评论、收藏和分享呈现。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {visibleExamples.slice(0, 3).map((item) => (
                <article key={item.id} className="overflow-hidden rounded-xl border bg-white">
                  <div className="relative h-56 bg-secondary">
                    {item.cover_url ? (
                      <img src={item.cover_url} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">内容封面</div>
                    )}
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                      {item.platform}
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <h3 className="line-clamp-2 font-sans text-base font-semibold leading-snug tracking-normal">{item.title}</h3>
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{item.hook}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <MiniMetric icon={<Eye className="size-3" />} value={formatCompactNumber(item.metrics.views)} />
                      <MiniMetric icon={<Heart className="size-3" />} value={formatCompactNumber(item.metrics.likes)} />
                      <MiniMetric icon={<MessageCircle className="size-3" />} value={formatCompactNumber(item.metrics.comments)} />
                      <MiniMetric icon={<Bookmark className="size-3" />} value={formatCompactNumber(item.metrics.saves)} />
                      <MiniMetric icon={<Share2 className="size-3" />} value={formatCompactNumber(item.metrics.shares)} />
                      <MiniMetric icon={<Play className="size-3" />} value={item.format} />
                    </div>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="border bg-white shadow-none">
            <CardHeader>
              <CardTitle className="font-sans text-xl font-semibold tracking-normal">报价与偏好</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {profile?.collaboration_info ? (
                <>
                  <div className="rounded-xl bg-foreground p-4 text-background">
                    <div className="text-xs text-background/60">参考报价区间</div>
                    <div className="mt-2 text-3xl font-semibold">{formatCurrencyRange(collaboration)}</div>
                    <div className="mt-2 text-xs text-background/60">{formatRateCard(collaboration.rate_card)}</div>
                  </div>
                  <InfoRow label="合作邮箱" value={collaboration.contact_email || "未填写"} />
                  <InfoRow label="优先平台" value={collaboration.preferred_platforms.join(" / ") || "未填写"} />
                  <InfoRow label="合作品类" value={collaboration.categories.join(" / ") || "未填写"} />
                  <div className="flex flex-wrap gap-2">
                    {(collaboration.style_preferences.length ? collaboration.style_preferences : tags).map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <p className="rounded-lg bg-secondary/60 p-3 leading-6 text-muted-foreground">{collaboration.notes || "暂无备注"}</p>
                </>
              ) : (
                <p className="text-muted-foreground">商务合作信息未公开。</p>
              )}
            </CardContent>
          </Card>

          <Card className="border bg-white shadow-none">
            <CardHeader>
              <CardTitle className="font-sans text-xl font-semibold tracking-normal">第三方账号明细</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {profile?.platforms ? (
                linkedPlatforms.length ? (
                  linkedPlatforms.map(({ definition, value }) => (
                    <div key={definition.key} className="rounded-xl border p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold ring-1", definition.accentClass)}>
                            {definition.label.slice(0, 1)}
                          </span>
                          <div>
                            <div className="font-semibold">{definition.label}</div>
                            <div className="text-xs text-muted-foreground">{value.handle || "未填写"}</div>
                          </div>
                        </div>
                        {value.url ? (
                          <a href={value.url} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))} aria-label={`打开${definition.label}`}>
                            <ExternalLink />
                          </a>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <InfoPill label="粉丝" value={formatCompactNumber(value.followers)} />
                        <InfoPill label="累计赞" value={formatCompactNumber(value.total_likes)} />
                        <InfoPill label="均赞" value={formatCompactNumber(value.avg_likes)} />
                        <InfoPill label="均播放" value={formatCompactNumber(value.avg_views)} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">第三方账号暂未关联。</p>
                )
              ) : (
                <p className="text-muted-foreground">第三方账号未公开。</p>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function ProfileSnapshot({ profile }: { profile: CreatorProfileRead | null }) {
  if (!profile) {
    return null;
  }
  const collaboration = readCollaboration(profile);
  const platforms = readPlatforms(profile);
  const linkedCount = countLinkedPlatforms(platforms);
  const powerScore = average(strengthDefs.map((item) => collaboration.content_strengths[item.key]));

  return (
    <Card className="border bg-white shadow-none">
      <CardHeader>
        <CardTitle className="font-sans text-xl font-semibold tracking-normal">战绩快照</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ScoreTile icon={<ShieldCheck className="size-4" />} label="商业段位" value={rankLabel(powerScore)} caption={`${Math.round(powerScore)} / 100`} />
        <ScoreTile icon={<ExternalLink className="size-4" />} label="已关联账号" value={String(linkedCount)} caption="公开平台池" />
        <ScoreTile icon={<Flame className="size-4" />} label="参考报价" value={formatCurrencyRange(collaboration)} caption="可在表单中调整" />
      </CardContent>
    </Card>
  );
}

function RadarChart({ scores }: { scores: StrengthScores }) {
  const size = 300;
  const center = size / 2;
  const radius = 104;
  const axes = strengthDefs.map((strength, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / strengthDefs.length;
    return {
      ...strength,
      angle,
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  });
  const polygon = axes.map((axis) => {
    const scoreRadius = radius * (scores[axis.key] / 100);
    return `${center + Math.cos(axis.angle) * scoreRadius},${center + Math.sin(axis.angle) * scoreRadius}`;
  }).join(" ");
  const rings = [0.25, 0.5, 0.75, 1].map((scale) => axes.map((axis) => `${center + Math.cos(axis.angle) * radius * scale},${center + Math.sin(axis.angle) * radius * scale}`).join(" "));

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label="商单能力雷达图" className="h-auto w-full">
        {rings.map((points) => (
          <polygon key={points} points={points} fill="none" stroke="rgb(229 231 235)" strokeWidth="1" />
        ))}
        {axes.map((axis) => (
          <line key={axis.key} x1={center} y1={center} x2={axis.x} y2={axis.y} stroke="rgb(229 231 235)" strokeWidth="1" />
        ))}
        <polygon points={polygon} fill="rgba(17, 24, 39, 0.18)" stroke="rgb(17 24 39)" strokeWidth="2" />
        {axes.map((axis) => (
          <g key={axis.key}>
            <circle cx={center + Math.cos(axis.angle) * radius * (scores[axis.key] / 100)} cy={center + Math.sin(axis.angle) * radius * (scores[axis.key] / 100)} r="4" fill="rgb(17 24 39)" />
            <text x={center + Math.cos(axis.angle) * (radius + 28)} y={center + Math.sin(axis.angle) * (radius + 28)} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[11px] font-medium">
              {axis.shortLabel}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ScoreTile({ icon, label, value, caption }: { icon: ReactNode; label: string; value: string; caption: string }) {
  return (
    <div className="rounded-xl border bg-secondary/30 p-4">
      <div className="mb-4 flex items-center justify-between text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="break-words text-2xl font-semibold leading-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{caption}</div>
    </div>
  );
}

function MiniMetric({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-1 text-muted-foreground">
      {icon}
      <span className="truncate font-medium text-foreground">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/60 p-2">
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function ProfileLoading({ label }: { label: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-3 rounded-full border bg-white px-5 py-3 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" />
        {label}
      </div>
    </main>
  );
}

function EmptyProfile({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border bg-white shadow-none">
      <CardHeader>
        <CardTitle className="font-sans text-2xl font-semibold tracking-normal">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function readTags(profile: CreatorProfileRead) {
  return Array.isArray(profile.style_tags) ? profile.style_tags.map(String) : [];
}

function readVisibility(profile: CreatorProfileRead): VisibilitySettings {
  const source = asRecord(profile.visibility_settings);
  return {
    business: source.business === "private" ? "private" : "public",
    platforms: source.platforms === "private" ? "private" : "public",
    stats: source.stats === "private" ? "private" : "public",
    assets: source.assets === "public" ? "public" : "private",
  };
}

function readCollaboration(profile: CreatorProfileRead): CollaborationInfo {
  const source = asRecord(profile.collaboration_info);
  const rateCard = asRecord(source.rate_card);
  const quoteRange = asRecord(source.quote_range);
  return {
    contact_email: String(source.contact_email ?? ""),
    preferred_platforms: asStringArray(source.preferred_platforms),
    rate_card: {
      image_post: toNumber(rateCard.image_post),
      video_script: toNumber(rateCard.video_script),
    },
    quote_range: {
      min: toNumber(quoteRange.min),
      max: toNumber(quoteRange.max),
    },
    categories: asStringArray(source.categories),
    style_preferences: asStringArray(source.style_preferences),
    content_strengths: readStrengthScores(source.content_strengths),
    notes: String(source.notes ?? ""),
  };
}

function readStrengthScores(value: unknown): StrengthScores {
  const source = asRecord(value);
  return strengthDefs.reduce((result, strength) => {
    result[strength.key] = clampScore(source[strength.key] ?? emptyCollaboration.content_strengths[strength.key]);
    return result;
  }, {} as StrengthScores);
}

function readPlatforms(profile: CreatorProfileRead): Record<PlatformKey, PlatformLink> {
  const source = asRecord(profile.platforms);
  const result = emptyPlatforms();
  for (const platform of platformDefs) {
    const raw = source[platform.key] ?? platform.aliases?.map((alias) => source[alias]).find(Boolean);
    const item = asRecord(raw);
    result[platform.key] = {
      handle: String(item.handle ?? ""),
      url: String(item.url ?? ""),
      linked: Boolean(item.linked ?? item.handle ?? item.url),
      followers: toNumber(item.followers),
      total_likes: toNumber(item.total_likes ?? item.likes),
      avg_likes: toNumber(item.avg_likes),
      avg_views: toNumber(item.avg_views ?? item.views),
      engagement_rate: toNumber(item.engagement_rate),
      last_synced: String(item.last_synced ?? ""),
    };
  }
  return result;
}

function readContentExamples(profile: CreatorProfileRead): ContentExample[] {
  const source = Array.isArray(profile.content_examples) ? profile.content_examples : [];
  return source.map((item, index) => normalizeContentExample(item, index));
}

function normalizeContentExample(value: unknown, index: number): ContentExample {
  const item = asRecord(value);
  const metrics = asRecord(item.metrics);
  return {
    id: String(item.id ?? `content-${index + 1}`),
    title: String(item.title ?? "未命名内容"),
    platform: String(item.platform ?? "小红书"),
    format: String(item.format ?? "图文"),
    cover_url: String(item.cover_url ?? item.coverImage ?? ""),
    hook: String(item.hook ?? item.body ?? ""),
    tags: asStringArray(item.tags),
    metrics: {
      views: toNumber(metrics.views),
      likes: toNumber(metrics.likes),
      comments: toNumber(metrics.comments),
      saves: toNumber(metrics.saves),
      shares: toNumber(metrics.shares),
    },
  };
}

function emptyPlatforms(): Record<PlatformKey, PlatformLink> {
  return Object.fromEntries(
    platformDefs.map((platform) => [
      platform.key,
      {
        handle: "",
        url: "",
        linked: false,
        followers: 0,
        total_likes: 0,
        avg_likes: 0,
        avg_views: 0,
        engagement_rate: 0,
        last_synced: "",
      },
    ])
  ) as Record<PlatformKey, PlatformLink>;
}

function defaultContentExamples(): ContentExample[] {
  return [0, 1, 2].map(makeContentExample);
}

function makeContentExample(index: number): ContentExample {
  const templates = [
    {
      title: "黑白配也可以很高级，关键是版型",
      platform: "小红书",
      format: "图文",
      cover_url: "/generated/seedream-bulk/posts/post-bulk-005.jpg",
      hook: "短夹克做清晰分层，高腰直筒裤拉长比例，适合极简但不想沉闷的人。",
      tags: ["极简", "短夹克", "通勤"],
      metrics: { views: 286000, likes: 18200, comments: 860, saves: 11200, shares: 1900 },
    },
    {
      title: "橄榄绿风衣比黑白灰更有记忆点",
      platform: "抖音",
      format: "短视频",
      cover_url: "/generated/seedream-bulk/posts/post-bulk-002.jpg",
      hook: "安静颜色也能有画面，品牌新品可以自然嵌入通勤场景。",
      tags: ["风衣", "轻熟", "种草"],
      metrics: { views: 392000, likes: 23600, comments: 1240, saves: 15400, shares: 2800 },
    },
    {
      title: "象牙白针织，松弛感比纯白更柔和",
      platform: "视频号",
      format: "短视频",
      cover_url: "/generated/seedream-bulk/posts/post-bulk-004.jpg",
      hook: "柔和色调适合近景讲解，能承接护肤、香氛和生活方式商单。",
      tags: ["针织", "温柔", "生活方式"],
      metrics: { views: 168000, likes: 9600, comments: 520, saves: 6200, shares: 980 },
    },
  ];
  const template = templates[index % templates.length];
  return {
    id: `content-${index + 1}`,
    ...template,
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function splitList(value: string) {
  return uniqueList(value.split(",").map((item) => item.trim()).filter(Boolean));
}

function uniqueList(values: string[]) {
  return Array.from(new Set(values.map((item) => item.trim()).filter(Boolean)));
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? uniqueList(value.map(String)) : [];
}

function toNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function clampScore(value: unknown) {
  return Math.max(0, Math.min(100, Math.round(toNumber(value))));
}

function todayLabel() {
  return new Date().toISOString().slice(0, 10);
}

function visibilityLabel(key: VisibilityKey) {
  const labels: Record<VisibilityKey, string> = {
    business: "商务合作",
    platforms: "第三方账号",
    stats: "资料数据",
    assets: "授权资产",
  };
  return labels[key];
}

function countLinkedPlatforms(platforms: Record<PlatformKey, PlatformLink>) {
  return Object.values(platforms).filter((item) => item.linked || item.handle || item.url).length;
}

function formatRateCard(rateCard: Record<string, number>) {
  const imagePost = rateCard.image_post ? `图文 ¥${formatNumber(rateCard.image_post)}` : "";
  const videoScript = rateCard.video_script ? `短视频 ¥${formatNumber(rateCard.video_script)}` : "";
  return [imagePost, videoScript].filter(Boolean).join(" / ") || "单项报价待沟通";
}

function formatCurrencyRange(collaboration: CollaborationInfo) {
  const explicitMin = collaboration.quote_range.min;
  const explicitMax = collaboration.quote_range.max;
  if (explicitMin || explicitMax) {
    if (explicitMin && explicitMax) {
      return `¥${formatNumber(explicitMin)}-${formatNumber(explicitMax)}`;
    }
    return `¥${formatNumber(explicitMin || explicitMax)} 起`;
  }

  const rates = Object.values(collaboration.rate_card).filter((value) => value > 0);
  if (!rates.length) {
    return "待沟通";
  }
  return `¥${formatNumber(Math.min(...rates))}-${formatNumber(Math.max(...rates))}`;
}

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("zh-CN");
}

function formatCompactNumber(value: number) {
  if (!value) {
    return "-";
  }
  if (value >= 100000000) {
    return `${trimDecimal(value / 100000000)}亿`;
  }
  if (value >= 10000) {
    return `${trimDecimal(value / 10000)}万`;
  }
  return formatNumber(value);
}

function trimDecimal(value: number) {
  return value >= 10 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "");
}

function average(values: number[]) {
  const filtered = values.filter((value) => Number.isFinite(value) && value > 0);
  if (!filtered.length) {
    return 0;
  }
  return filtered.reduce((sum, value) => sum + value, 0) / filtered.length;
}

function rankLabel(score: number) {
  if (score >= 90) {
    return "S+";
  }
  if (score >= 80) {
    return "S";
  }
  if (score >= 70) {
    return "A";
  }
  if (score >= 60) {
    return "B";
  }
  return "待评级";
}
