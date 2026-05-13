"use client";

import { useQuery } from "@tanstack/react-query";

import { PromptPreview } from "@/components/generation/prompt-preview";
import { MvpShell } from "@/components/layout/mvp-shell";
import { api } from "@/lib/api-client";

export default function AdminModelRunsPage() {
  const runs = useQuery({ queryKey: ["admin-model-runs"], queryFn: api.adminModelRuns });
  return (
    <MvpShell title="管理后台：模型调用" description="查看 provider、model、请求参数、响应和失败原因。">
      <div className="grid gap-4">
        {(runs.data?.items ?? []).map((run) => (
          <article key={run.id} className="rounded-md border bg-white p-5">
            <div className="flex items-center justify-between text-sm">
              <span>{run.provider} / {run.model_name}</span>
              <span className="text-muted-foreground">{run.status}</span>
            </div>
            <div className="mt-4">
              <PromptPreview payload={run.request_payload} />
            </div>
          </article>
        ))}
      </div>
    </MvpShell>
  );
}
