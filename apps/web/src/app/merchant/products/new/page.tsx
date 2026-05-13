"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { MvpShell } from "@/components/layout/mvp-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";

const schema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  image_url: z.string().url(),
  material: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const brands = useQuery({ queryKey: ["brands"], queryFn: api.brands });
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "黑色短款夹克",
      category: "tops",
      image_url: "https://example.com/product.png",
      material: "棉感尼龙混纺",
    },
  });
  const mutation = useMutation({
    mutationFn: async (values: FormData) => {
      const brand = brands.data?.[0] ?? (await createDefaultBrand());
      const product = await api.createProduct({
        brand_id: brand.id,
        title: values.title,
        category: values.category,
        status: "active",
        material: values.material,
        style_tags: ["minimal", "campaign"],
      });
      await api.addProductImage(product.id, {
        image_url: values.image_url,
        image_type: "main",
        width: 1200,
        height: 1600,
        mime_type: "image/png",
        is_primary: true,
      });
      return product;
    },
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("商品已创建");
      router.push(`/merchant/products/${product.id}`);
    },
  });

  async function createDefaultBrand() {
    const org = await api.createOrganization({ name: "Jasmine Demo Brand", org_type: "merchant_brand" });
    return api.createBrand({ org_id: org.id, brand_name: "Jasmine Demo Brand" });
  }

  return (
    <MvpShell title="新增商品" description="MVP 使用图片 URL 模拟上传；正式上传由 /uploads/presign 接口承接。">
      <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="grid max-w-2xl gap-4 rounded-md border bg-white p-5">
        <Input placeholder="商品标题" {...form.register("title")} />
        <select className="h-9 rounded-md border bg-background px-3 text-sm" {...form.register("category")}>
          <option value="tops">上衣</option>
          <option value="bottoms">下装</option>
          <option value="outerwear">外套</option>
          <option value="full_outfit">整套</option>
        </select>
        <Input placeholder="商品主图 URL" {...form.register("image_url")} />
        <Textarea placeholder="材质/版型" {...form.register("material")} />
        <Button type="submit" disabled={mutation.isPending}>
          保存商品
        </Button>
      </form>
    </MvpShell>
  );
}
