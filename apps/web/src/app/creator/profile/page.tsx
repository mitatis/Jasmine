"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MvpShell } from "@/components/layout/mvp-shell";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export default function CreatorProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const org = await api.createOrganization({ name: "Nora Studio", org_type: "creator_studio" });
      return api.createCreator({
        org_id: org.id,
        display_name: "Nora 黑白日常",
        bio: "高街暗黑、通勤夹克和干净黑白比例。",
        style_tags: ["高街暗黑", "通勤", "Clean Fit"],
        platforms: { xiaohongshu: { handle: "nora", followers: 12000 } },
        default_usage_scope: "commercial_campaign",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-creators"] });
      toast.success("博主资料已创建");
      router.push("/creator/dashboard");
    },
  });

  return (
    <MvpShell title="博主资料" description="MVP 提供一键创建 demo profile，后续可扩展为完整资料表单。">
      <div className="rounded-md border bg-white p-5">
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          创建 demo 博主资料
        </Button>
      </div>
    </MvpShell>
  );
}
