"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { MvpShell } from "@/components/layout/mvp-shell";
import { api } from "@/lib/api-client";

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const products = useQuery({ queryKey: ["products"], queryFn: api.products });
  const product = products.data?.find((item) => item.id === params.productId);

  return (
    <MvpShell title={product?.title ?? "商品详情"} description="查看商品状态和后续生成历史。">
      <div className="rounded-md border bg-white p-5 text-sm">
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
    </MvpShell>
  );
}
