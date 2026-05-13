"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ImagePlus, ShieldCheck, Sparkles } from "lucide-react";

import { EmptyState, MvpShell } from "@/components/layout/mvp-shell";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export default function CreatorDashboardPage() {
  const profiles = useQuery({ queryKey: ["my-creators"], queryFn: api.myCreators });
  const linkedPlatformCount = profiles.data?.filter(
    (item) => item.platforms && typeof item.platforms === "object" && Object.keys(item.platforms).length,
  ).length ?? 0;

  return (
    <MvpShell
      title="博主工作台"
      description="管理授权人像、资料、商单生成图和确认状态。"
      actions={
        <>
          <Link href="/creator/profile" className={buttonVariants()}>创建资料</Link>
          <Link href="/creator/assets" className={buttonVariants({ variant: "secondary" })}>上传资产</Link>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border bg-white p-5">
          <ShieldCheck className="mb-6 size-5 text-muted-foreground" />
          <div className="text-3xl font-semibold">{profiles.data?.filter((item) => item.consent_status === "active").length ?? 0}</div>
          <div className="mt-1 text-sm text-muted-foreground">已授权资料</div>
        </div>
        <div className="rounded-md border bg-white p-5">
          <ImagePlus className="mb-6 size-5 text-muted-foreground" />
          <div className="text-3xl font-semibold">{profiles.data?.length ?? 0}</div>
          <div className="mt-1 text-sm text-muted-foreground">博主资料</div>
        </div>
        <div className="rounded-md border bg-white p-5">
          <Sparkles className="mb-6 size-5 text-muted-foreground" />
          <div className="text-3xl font-semibold">{linkedPlatformCount}</div>
          <div className="mt-1 text-sm text-muted-foreground">已链接平台</div>
        </div>
      </div>
      <div className="mt-8">
        {profiles.data?.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {profiles.data.map((profile) => (
              <article key={profile.id} className="rounded-md border bg-white p-5">
                <div className="text-xs text-muted-foreground">{profile.consent_status}</div>
                <h2 className="mt-2 font-sans text-xl font-semibold tracking-normal">{profile.display_name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{profile.bio ?? "暂无简介"}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="暂无博主资料" description="创建资料并添加授权记录后，平台才允许生成商单图。" />
        )}
      </div>
    </MvpShell>
  );
}
