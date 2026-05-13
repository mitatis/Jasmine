"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { AssetGrid } from "@/components/generation/asset-grid";
import { CostBadge } from "@/components/generation/cost-badge";
import { GenerationTimeline } from "@/components/generation/generation-timeline";
import { ImageCompare } from "@/components/generation/image-compare";
import { PromptPreview } from "@/components/generation/prompt-preview";
import { QualityScoreCard } from "@/components/generation/quality-score-card";
import { ReviewPanel } from "@/components/generation/review-panel";
import { MvpShell } from "@/components/layout/mvp-shell";
import { api } from "@/lib/api-client";
import { generationStatusLabels } from "@/lib/types";

export default function JobDetailPage() {
  const params = useParams<{ jobId: string }>();
  const job = useQuery({ queryKey: ["job", params.jobId], queryFn: () => api.job(params.jobId) });
  const data = job.data;
  const firstRun = data?.model_runs[0];
  const selected = data?.generated_assets.find((asset) => asset.is_selected) ?? data?.generated_assets[0];

  return (
    <MvpShell
      title="任务详情"
      description={data ? `${data.job_type} / ${generationStatusLabels[data.status] ?? data.status}` : "加载生成任务"}
      actions={data ? <CostBadge value={data.cost_estimate_usd} /> : null}
    >
      {data ? (
        <div className="grid gap-6">
          <ImageCompare
            images={[
              { label: "商品图", url: String(data.input_payload.product_image_url ?? "") },
              { label: "博主人像", url: String(data.input_payload.creator_image_url ?? "") },
              { label: "选中生成图", url: selected?.asset_url },
            ]}
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-6">
              <section>
                <h2 className="mb-3 font-sans text-xl font-semibold tracking-normal">候选资产</h2>
                <AssetGrid assets={data.generated_assets} />
              </section>
              <section>
                <h2 className="mb-3 font-sans text-xl font-semibold tracking-normal">Prompt 和参数</h2>
                <PromptPreview payload={firstRun?.request_payload ?? data.input_payload} />
              </section>
            </div>
            <aside className="grid gap-4">
              <GenerationTimeline steps={data.selected_model_route.steps ?? []} />
              {data.quality_reports[0] ? <QualityScoreCard report={data.quality_reports[0]} /> : null}
              <ReviewPanel jobId={data.id} />
            </aside>
          </div>
        </div>
      ) : (
        <div className="rounded-md border bg-white p-5 text-sm text-muted-foreground">正在加载任务...</div>
      )}
    </MvpShell>
  );
}
