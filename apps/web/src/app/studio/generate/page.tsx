"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { MvpShell } from "@/components/layout/mvp-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";
import type { CreatorProfileRead } from "@/lib/types";

const schema = z.object({
  job_type: z.enum(["preview", "final_standard", "final_premium"]),
  platform: z.string().min(1),
  aspect_ratio: z.string().min(1),
  scene_direction: z.string().min(1),
  brand_direction: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function StudioGeneratePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const products = useQuery({ queryKey: ["products"], queryFn: api.products });
  const creators = useQuery({ queryKey: ["creators"], queryFn: api.creators });
  const campaigns = useQuery({ queryKey: ["campaigns"], queryFn: api.campaigns });
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      job_type: "final_standard",
      platform: "xiaohongshu",
      aspect_ratio: "3:4",
      scene_direction: "urban street, premium editorial, clean background",
      brand_direction: "quiet luxury, minimal, natural light",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormData) => {
      const seed = await ensureDemoData();
      return api.createJob({
        campaign_id: seed.campaignId,
        creator_id: seed.creatorId,
        product_id: seed.productId,
        job_type: values.job_type,
        options: {
          platform: values.platform,
          aspect_ratio: values.aspect_ratio,
          scene_direction: values.scene_direction,
          brand_direction: values.brand_direction,
        },
      });
    },
    onSuccess: (job) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("生成任务已完成 mock 链路");
      router.push(`/studio/jobs/${job.id}`);
    },
  });

  async function ensureDemoData() {
    let product = products.data?.[0];
    let creator: CreatorProfileRead | undefined;
    let campaign = campaigns.data?.[0];
    let brandId = product?.brand_id;
    if (!brandId) {
      const org = await api.createOrganization({ name: "Jasmine Demo Brand", org_type: "merchant_brand" });
      const brand = await api.createBrand({ org_id: org.id, brand_name: "Jasmine Demo Brand" });
      brandId = brand.id;
    }
    if (!product) {
      product = await api.createProduct({
        brand_id: brandId,
        title: "黑色短款夹克",
        category: "tops",
        status: "active",
        style_tags: ["minimal", "street"],
      });
      await api.addProductImage(product.id, {
        image_url: "https://example.com/product.png",
        image_type: "main",
        width: 1200,
        height: 1600,
        mime_type: "image/png",
        is_primary: true,
      });
    }
    if (!creator) {
      const org = await api.createOrganization({ name: "Nora Studio", org_type: "creator_studio" });
      creator = await api.createCreator({
        org_id: org.id,
        display_name: "Nora 黑白日常",
        style_tags: ["高街暗黑", "通勤"],
        platforms: { xiaohongshu: { handle: "nora", followers: 12000 } },
        default_usage_scope: "commercial_campaign",
      });
      await api.addCreatorAsset(creator.id, {
        asset_url: "https://example.com/creator.png",
        asset_type: "full_body",
        usage_scope: "commercial_generation",
        width: 1200,
        height: 1600,
        mime_type: "image/png",
      });
      await api.addConsent(creator.id, {
        consent_type: "commercial_campaign",
        signed_text: "I authorize AI generation for MVP demo campaigns.",
      });
    }
    if (!campaign) {
      campaign = await api.createCampaign({
        brand_id: brandId,
        title: "小红书新品商单",
        brief: "生成高级灰街拍感商单图。",
        objective: "launch",
        target_platform: "xiaohongshu",
        deliverables: { images: 2, aspect_ratios: ["3:4"] },
        requirements: { tone: "minimal premium" },
        forbidden_content: ["wrong logo"],
        status: "active",
      });
    }
    return { productId: product.id, creatorId: creator.id, campaignId: campaign.id };
  }

  return (
    <MvpShell title="生成 Studio" description="选择商品、博主、brief 和模型模式，生成可审核的穿搭商单图。">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="grid gap-4 rounded-md border bg-white p-5">
          <select className="h-9 rounded-md border bg-background px-3 text-sm" {...form.register("job_type")}>
            <option value="preview">preview</option>
            <option value="final_standard">final_standard</option>
            <option value="final_premium">final_premium</option>
          </select>
          <select className="h-9 rounded-md border bg-background px-3 text-sm" {...form.register("platform")}>
            <option value="xiaohongshu">小红书</option>
            <option value="douyin">抖音</option>
            <option value="instagram">Instagram</option>
          </select>
          <select className="h-9 rounded-md border bg-background px-3 text-sm" {...form.register("aspect_ratio")}>
            <option value="3:4">3:4</option>
            <option value="4:5">4:5</option>
            <option value="1:1">1:1</option>
          </select>
          <Textarea className="min-h-24" {...form.register("scene_direction")} />
          <Textarea className="min-h-24" {...form.register("brand_direction")} />
          <Button type="submit" disabled={mutation.isPending}>
            创建生成任务
          </Button>
        </form>
        <aside className="rounded-md border bg-white p-5 text-sm">
          <div className="font-medium">当前可选数据</div>
          <dl className="mt-4 grid gap-2 text-muted-foreground">
            <div className="flex justify-between"><dt>商品</dt><dd>{products.data?.length ?? 0}</dd></div>
            <div className="flex justify-between"><dt>博主</dt><dd>{creators.data?.length ?? 0}</dd></div>
            <div className="flex justify-between"><dt>商单</dt><dd>{campaigns.data?.length ?? 0}</dd></div>
          </dl>
        </aside>
      </div>
    </MvpShell>
  );
}
