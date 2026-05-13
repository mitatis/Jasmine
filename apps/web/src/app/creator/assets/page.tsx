"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MvpShell } from "@/components/layout/mvp-shell";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export default function CreatorAssetsPage() {
  const queryClient = useQueryClient();
  const profiles = useQuery({ queryKey: ["my-creators"], queryFn: api.myCreators });
  const mutation = useMutation({
    mutationFn: async () => {
      let profile = profiles.data?.[0];
      if (!profile) {
        const org = await api.createOrganization({ name: "Creator Studio", org_type: "creator_studio" });
        profile = await api.createCreator({ org_id: org.id, display_name: "Demo Creator", style_tags: [], platforms: {} });
      }
      const asset = await api.addCreatorAsset(profile.id, {
        asset_url: "https://example.com/creator.png",
        asset_type: "full_body",
        usage_scope: "commercial_generation",
        width: 1200,
        height: 1600,
        mime_type: "image/png",
      });
      await api.addConsent(profile.id, {
        consent_type: "commercial_campaign",
        signed_text: "I authorize commercial campaign AI generation for selected brands.",
      });
      return asset;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-creators"] });
      toast.success("资产和授权已保存");
    },
  });

  return (
    <MvpShell title="授权人像资产" description="上传全身照、风格参考和授权范围；无授权时后端会拒绝创建生成任务。">
      <div className="rounded-md border bg-white p-5">
        <p className="mb-6 text-sm text-muted-foreground">当前 demo 使用固定图片 URL 模拟上传，并创建 commercial_campaign 授权记录。</p>
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          添加 demo 全身照与授权
        </Button>
      </div>
    </MvpShell>
  );
}
