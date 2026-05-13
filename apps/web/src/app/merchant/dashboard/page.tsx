"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Image, Package, Send, Sparkles } from "lucide-react";

import { MvpShell } from "@/components/layout/mvp-shell";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { generationStatusLabels } from "@/lib/types";

export default function MerchantDashboardPage() {
  const brands = useQuery({ queryKey: ["brands"], queryFn: api.brands });
  const products = useQuery({ queryKey: ["products"], queryFn: api.products });
  const campaigns = useQuery({ queryKey: ["campaigns"], queryFn: api.campaigns });
  const jobs = useQuery({ queryKey: ["jobs"], queryFn: api.jobs });

  const stats = [
    { label: "品牌", value: brands.data?.length ?? 0, icon: Sparkles },
    { label: "商品", value: products.data?.length ?? 0, icon: Package },
    { label: "商单", value: campaigns.data?.length ?? 0, icon: Send },
    { label: "待审核", value: jobs.data?.filter((job) => job.status === "needs_review").length ?? 0, icon: Image },
  ];

  return (
    <MvpShell
      title="商家工作台"
      description="管理品牌、商品、brief 和需要审核的 AI 商单图。"
      actions={
        <>
          <Link className={buttonVariants()} href="/merchant/products/new">新增商品</Link>
          <Link className={buttonVariants({ variant: "secondary" })} href="/studio/generate">创建生成</Link>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md border bg-white p-5">
            <stat.icon className="mb-6 size-5 text-muted-foreground" />
            <div className="text-3xl font-semibold">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded-md border bg-white">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-sans text-lg font-semibold tracking-normal">最近生成任务</h2>
          <Link href="/admin/jobs" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            查看全部 <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="divide-y">
          {(jobs.data ?? []).slice(0, 6).map((job) => (
            <Link key={job.id} href={`/studio/jobs/${job.id}`} className="flex items-center justify-between px-5 py-4 text-sm hover:bg-muted">
              <span>{job.job_type}</span>
              <span className="text-muted-foreground">{generationStatusLabels[job.status] ?? job.status}</span>
            </Link>
          ))}
          {!jobs.data?.length ? <div className="px-5 py-8 text-sm text-muted-foreground">还没有生成任务。</div> : null}
        </div>
      </section>
    </MvpShell>
  );
}
