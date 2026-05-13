"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { EmptyState, MvpShell } from "@/components/layout/mvp-shell";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export default function MerchantCampaignsPage() {
  const campaigns = useQuery({ queryKey: ["campaigns"], queryFn: api.campaigns });
  return (
    <MvpShell
      title="商单管理"
      description="创建 campaign brief，选择商品和目标博主，进入生成与审核链路。"
      actions={
        <Link className={buttonVariants()} href="/merchant/campaigns/new">创建商单</Link>
      }
    >
      {campaigns.data?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {campaigns.data.map((campaign) => (
            <article key={campaign.id} className="rounded-md border bg-white p-5">
              <div className="text-xs text-muted-foreground">{campaign.target_platform}</div>
              <h2 className="mt-2 font-sans text-xl font-semibold tracking-normal">{campaign.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{campaign.brief}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="暂无商单" description="创建一个 brief 后，就可以在 Studio 里选择商品和博主生成图片。" />
      )}
    </MvpShell>
  );
}
