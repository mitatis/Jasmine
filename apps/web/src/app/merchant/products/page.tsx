"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { EmptyState, MvpShell } from "@/components/layout/mvp-shell";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export default function ProductsPage() {
  const products = useQuery({ queryKey: ["products"], queryFn: api.products });

  return (
    <MvpShell
      title="商品管理"
      description="维护用于 AI 商单生成的商品主图、类目、颜色、材质和状态。"
      actions={
        <Link className={buttonVariants()} href="/merchant/products/new">
          <Plus className="size-4" />
          新增商品
        </Link>
      }
    >
      {products.data?.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {products.data.map((product) => (
            <article key={product.id} className="rounded-md border bg-white p-5">
              <div className="text-xs uppercase text-muted-foreground">{product.category}</div>
              <h2 className="mt-3 font-sans text-xl font-semibold tracking-normal">{product.title}</h2>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span>{product.status}</span>
                <Link href={`/merchant/products/${product.id}`} className="text-muted-foreground hover:text-foreground">
                  详情
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="暂无商品" description="先创建一件商品，并添加可用于试穿的主图。" />
      )}
    </MvpShell>
  );
}
