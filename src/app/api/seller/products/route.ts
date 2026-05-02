import { NextResponse } from "next/server";

import { seedProducts } from "@/lib/seed";
import type { Product } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    sellerId: string;
    name: string;
    price: string;
    stock: string;
    sizes: string;
    material?: string;
    tags: string;
    image: string;
  };

  const base = seedProducts[0];
  const sizes = body.sizes.split(",").map((item) => item.trim()).filter(Boolean);
  const product: Product = {
    id: `product-${body.name.toLowerCase().replaceAll(/\s+/g, "-")}-${Date.now()}`,
    sellerId: body.sellerId,
    name: body.name,
    price: Number(body.price),
    stock: Number(body.stock),
    sizes,
    sizeGuide: sizes.map((size, index) => ({
      size,
      shoulder: `${42 + index * 2}cm`,
      chest: `${104 + index * 6}cm`,
      length: `${62 + index * 2}cm`,
    })),
    material: body.material || "混纺面料，适合日常穿搭。",
    care: "建议低温洗涤，悬挂晾干。",
    tags: body.tags.split(",").map((item) => item.trim()).filter(Boolean),
    image: body.image || base.image,
    detailImages: [body.image || base.image, base.detailImages[1] ?? base.image],
    similarityScore: 90,
    similarityReason: "新上架商品默认按标签做匹配，后续可以接入更细的向量检索逻辑。",
    tryOnPreset: base.tryOnPreset,
  };

  return NextResponse.json(product);
}
