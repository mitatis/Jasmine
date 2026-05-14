"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, LoaderCircle, Save, ShieldCheck, UserRound } from "lucide-react";
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
type CollaborationInfo = {
  contact_email: string;
  preferred_platforms: string[];
  rate_card: Record<string, number>;
  categories: string[];
  notes: string;
};
type PlatformLink = {
  handle: string;
  url: string;
  linked: boolean;
};

const defaultVisibility: VisibilitySettings = {
  business: "public",
  platforms: "public",
  stats: "public",
  assets: "private",
};

const platformDefs: { key: "xhs" | "douyin" | "weibo" | "bilibili"; label: string }[] = [
  { key: "xhs", label: "小红书" },
  { key: "douyin", label: "抖音" },
  { key: "weibo", label: "微博" },
  { key: "bilibili", label: "B站" },
];

const emptyCollaboration: CollaborationInfo = {
  contact_email: "",
  preferred_platforms: [],
  rate_card: {},
  categories: [],
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
  const [platforms, setPlatforms] = useState<Record<string, PlatformLink>>(emptyPlatforms());

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

  function updatePlatform(key: string, field: keyof PlatformLink, value: string | boolean) {
    setPlatforms((current) => ({
      ...current,
      [key]: {
        ...(current[key] ?? { handle: "", url: "", linked: false }),
        [field]: value,
      },
    }));
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
      },
      platforms,
    });
  }

  return (
    <main className="min-h-screen bg-background pb-12">
      <section className="page-shell py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/campaigns" className="font-heading text-4xl leading-none tracking-[-0.05em]">
              Jasmine
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">博主端 · 我的资料</p>
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
          <ProfileReadOnly profile={visibleProfile} title="访客预览" />
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-6">
              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">基础资料</CardTitle>
                  <CardDescription>这些信息会作为博主合作资料的默认展示。</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="显示名称" />
                  <Textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} placeholder="简介" />
                  <Input value={styleTags} onChange={(event) => setStyleTags(event.target.value)} placeholder="通勤极简, Clean Fit" />
                </CardContent>
              </Card>

              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">商务合作信息</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Input
                    value={collaboration.contact_email}
                    onChange={(event) => setCollaboration((current) => ({ ...current, contact_email: event.target.value }))}
                    placeholder="合作邮箱"
                  />
                  <Input
                    value={collaboration.preferred_platforms.join(", ")}
                    onChange={(event) => setCollaboration((current) => ({ ...current, preferred_platforms: splitList(event.target.value) }))}
                    placeholder="优先平台"
                  />
                  <Input
                    value={collaboration.categories.join(", ")}
                    onChange={(event) => setCollaboration((current) => ({ ...current, categories: splitList(event.target.value) }))}
                    placeholder="合作品类"
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      value={String(collaboration.rate_card.image_post ?? "")}
                      onChange={(event) => setCollaboration((current) => ({
                        ...current,
                        rate_card: { ...current.rate_card, image_post: Number(event.target.value) || 0 },
                      }))}
                      placeholder="图文报价"
                    />
                    <Input
                      value={String(collaboration.rate_card.video_script ?? "")}
                      onChange={(event) => setCollaboration((current) => ({
                        ...current,
                        rate_card: { ...current.rate_card, video_script: Number(event.target.value) || 0 },
                      }))}
                      placeholder="短视频脚本报价"
                    />
                  </div>
                  <Textarea
                    value={collaboration.notes}
                    onChange={(event) => setCollaboration((current) => ({ ...current, notes: event.target.value }))}
                    rows={3}
                    placeholder="合作备注"
                  />
                </CardContent>
              </Card>

              <Card className="border bg-white shadow-none">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">第三方账号</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {platformDefs.map((platform) => (
                    <div key={platform.key} className="grid gap-3 rounded-md border p-4 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)] md:items-center">
                      <div className="font-medium">{platform.label}</div>
                      <Input
                        value={platforms[platform.key]?.handle ?? ""}
                        onChange={(event) => updatePlatform(platform.key, "handle", event.target.value)}
                        placeholder="账号名"
                      />
                      <Input
                        value={platforms[platform.key]?.url ?? ""}
                        onChange={(event) => updatePlatform(platform.key, "url", event.target.value)}
                        placeholder="主页链接"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6">
              <Card className="border bg-white shadow-none xl:sticky xl:top-24">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl font-semibold tracking-normal">权限</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {(["business", "platforms", "stats", "assets"] as VisibilityKey[]).map((key) => (
                    <div key={key} className="rounded-md border p-4">
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
            <Link href="/campaigns" className="font-heading text-4xl leading-none tracking-[-0.05em]">
              Jasmine
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">博主公开资料</p>
          </div>
          <Link href="/me" className={cn(buttonVariants({ variant: "outline" }))}>
            返回我的
          </Link>
        </div>
        <ProfileReadOnly profile={profile.data} title="访客视角" />
      </section>
    </main>
  );
}

function ProfileReadOnly({ profile, title }: { profile: CreatorProfileRead | null; title: string }) {
  const collaboration = profile ? readCollaboration(profile) : emptyCollaboration;
  const platforms = profile ? readPlatforms(profile) : emptyPlatforms();
  const tags = profile ? readTags(profile) : [];

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <Card className="border bg-white shadow-none">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-foreground text-xl font-semibold text-background">
              {profile?.display_name?.slice(0, 1) ?? "J"}
            </div>
            <div>
              <CardDescription>{title}</CardDescription>
              <CardTitle className="mt-1 font-sans text-3xl font-semibold tracking-normal">{profile?.display_name ?? "博主资料"}</CardTitle>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{profile?.bio ?? "暂无简介"}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {tags.length ? tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>) : <Badge variant="secondary">暂无风格标签</Badge>}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <MetricTile icon={<UserRound className="size-4" />} label="资料状态" value={profile?.consent_status ?? "-"} />
            <MetricTile icon={<ShieldCheck className="size-4" />} label="授权范围" value={profile?.default_usage_scope ?? "-"} />
            <MetricTile icon={<ExternalLink className="size-4" />} label="已链接账号" value={countLinkedPlatforms(platforms).toString()} />
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-6">
        <Card className="border bg-white shadow-none">
          <CardHeader>
            <CardTitle className="font-sans text-xl font-semibold tracking-normal">商务合作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {profile?.collaboration_info ? (
              <>
                <InfoRow label="邮箱" value={collaboration.contact_email || "未填写"} />
                <InfoRow label="平台" value={collaboration.preferred_platforms.join(" / ") || "未填写"} />
                <InfoRow label="品类" value={collaboration.categories.join(" / ") || "未填写"} />
                <InfoRow label="报价" value={formatRateCard(collaboration.rate_card)} />
                <p className="rounded-md bg-secondary/60 p-3 leading-6 text-muted-foreground">{collaboration.notes || "暂无备注"}</p>
              </>
            ) : (
              <p className="text-muted-foreground">商务合作信息未公开。</p>
            )}
          </CardContent>
        </Card>

        <Card className="border bg-white shadow-none">
          <CardHeader>
            <CardTitle className="font-sans text-xl font-semibold tracking-normal">第三方账号</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {profile?.platforms ? (
              platformDefs.map((platform) => {
                const item = platforms[platform.key];
                return (
                  <InfoRow
                    key={platform.key}
                    label={platform.label}
                    value={item?.handle || item?.url || "未链接"}
                  />
                );
              })
            ) : (
              <p className="text-muted-foreground">第三方账号未公开。</p>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function MetricTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border bg-secondary/30 p-4">
      <div className="mb-4 text-muted-foreground">{icon}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
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
  return {
    contact_email: String(source.contact_email ?? ""),
    preferred_platforms: asStringArray(source.preferred_platforms),
    rate_card: {
      image_post: Number(rateCard.image_post ?? 0),
      video_script: Number(rateCard.video_script ?? 0),
    },
    categories: asStringArray(source.categories),
    notes: String(source.notes ?? ""),
  };
}

function readPlatforms(profile: CreatorProfileRead): Record<string, PlatformLink> {
  const source = asRecord(profile.platforms);
  const result = emptyPlatforms();
  for (const platform of platformDefs) {
    const item = asRecord(source[platform.key]);
    result[platform.key] = {
      handle: String(item.handle ?? ""),
      url: String(item.url ?? ""),
      linked: Boolean(item.linked ?? item.handle ?? item.url),
    };
  }
  return result;
}

function emptyPlatforms(): Record<string, PlatformLink> {
  return Object.fromEntries(platformDefs.map((platform) => [platform.key, { handle: "", url: "", linked: false }]));
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
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

function countLinkedPlatforms(platforms: Record<string, PlatformLink>) {
  return Object.values(platforms).filter((item) => item.linked || item.handle || item.url).length;
}

function formatRateCard(rateCard: Record<string, number>) {
  const imagePost = rateCard.image_post ? `图文 ¥${rateCard.image_post}` : "";
  const videoScript = rateCard.video_script ? `脚本 ¥${rateCard.video_script}` : "";
  return [imagePost, videoScript].filter(Boolean).join(" / ") || "未填写";
}
