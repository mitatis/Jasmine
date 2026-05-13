"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { MvpShell } from "@/components/layout/mvp-shell";
import { api } from "@/lib/api-client";
import { generationStatusLabels } from "@/lib/types";

export default function AdminJobsPage() {
  const jobs = useQuery({ queryKey: ["admin-jobs"], queryFn: api.adminJobs });
  const costs = useQuery({ queryKey: ["admin-costs"], queryFn: api.adminCosts });

  return (
    <MvpShell title="管理后台：任务" description="查看全部生成任务、状态、失败原因和成本估算。">
      <div className="mb-4 rounded-md border bg-white p-5 text-sm">
        总成本估算：${Number(costs.data?.total_estimated_cost_usd ?? 0).toFixed(2)}
      </div>
      <div className="overflow-hidden rounded-md border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">模式</th>
              <th className="px-4 py-3">状态</th>
              <th className="px-4 py-3">成本</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(jobs.data?.items ?? []).map((job) => (
              <tr key={job.id}>
                <td className="px-4 py-3">
                  <Link href={`/studio/jobs/${job.id}`} className="hover:underline">{job.id.slice(0, 8)}</Link>
                </td>
                <td className="px-4 py-3">{job.job_type}</td>
                <td className="px-4 py-3">{generationStatusLabels[job.status] ?? job.status}</td>
                <td className="px-4 py-3">${Number(job.cost_estimate_usd ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MvpShell>
  );
}
