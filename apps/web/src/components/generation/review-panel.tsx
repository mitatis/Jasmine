"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, RotateCcw, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export function ReviewPanel({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["job", jobId] });
  const approve = useMutation({ mutationFn: () => api.approveJob(jobId, "Approved from merchant review panel."), onSuccess: refresh });
  const reject = useMutation({ mutationFn: () => api.rejectJob(jobId, "Rejected from review panel."), onSuccess: refresh });
  const retry = useMutation({ mutationFn: () => api.retryJob(jobId), onSuccess: refresh });

  return (
    <div className="rounded-md border bg-white p-4">
      <div className="mb-4 text-sm font-medium">审核操作</div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => approve.mutate(undefined, { onSuccess: () => toast.success("已通过") })}>
          <Check className="size-4" />
          通过
        </Button>
        <Button variant="secondary" onClick={() => retry.mutate(undefined, { onSuccess: () => toast.info("已重新生成") })}>
          <RotateCcw className="size-4" />
          重新生成
        </Button>
        <Button variant="destructive" onClick={() => reject.mutate(undefined, { onSuccess: () => toast.error("已拒绝") })}>
          <X className="size-4" />
          拒绝
        </Button>
      </div>
    </div>
  );
}
