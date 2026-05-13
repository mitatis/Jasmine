"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MvpShell } from "@/components/layout/mvp-shell";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export default function NewCampaignPage() {
  const router = useRouter();
  const brands = useQuery({ queryKey: ["brands"], queryFn: api.brands });
  const mutation = useMutation({
    mutationFn: async () => {
      const brand = brands.data?.[0] ?? (await createDefaultBrand());
      return api.createCampaign({
        brand_id: brand.id,
        title: "小红书春季新品商单",
        brief: "生成 2 张 3:4 高级灰街拍感穿搭图，突出商品颜色和廓形。",
        objective: "launch",
        target_platform: "xiaohongshu",
        deliverables: { images: 2, aspect_ratios: ["3:4"], need_caption: true },
        requirements: { tone: "minimal premium" },
        forbidden_content: ["wrong logo", "distorted body"],
        status: "active",
      });
    },
    onSuccess: () => {
      toast.success("商单已创建");
      router.push("/merchant/campaigns");
    },
  });

  async function createDefaultBrand() {
    const org = await api.createOrganization({ name: "Jasmine Demo Brand", org_type: "merchant_brand" });
    return api.createBrand({ org_id: org.id, brand_name: "Jasmine Demo Brand" });
  }

  return (
    <MvpShell title="创建商单" description="MVP 提供一键 demo brief，后续可以扩展为完整表单。">
      <div className="rounded-md border bg-white p-5">
        <p className="mb-6 text-sm text-muted-foreground">默认 brief 会创建一个小红书新品 launch campaign。</p>
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          创建 demo 商单
        </Button>
      </div>
    </MvpShell>
  );
}
