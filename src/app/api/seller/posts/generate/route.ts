import { NextResponse } from "next/server";

import { buildDraftFromProduct, seedProducts, seedSellers } from "@/lib/seed";
import { generateSeedreamImages } from "@/lib/seedream";
import type { Product } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { productId: string; sellerId: string; product?: Product };
  const product = body.product ?? seedProducts.find((item) => item.id === body.productId) ?? seedProducts[0];
  const seller = seedSellers.find((item) => item.id === body.sellerId) ?? seedSellers[0];
  const draft = buildDraftFromProduct(product, seller);

  try {
    const images = await generateSeedreamImages({
      prompt: [
        "生成一张真实小红书 OOTD 风格的 AI 模特穿搭帖子封面。",
        "保持商品图中的服装颜色、版型、材质纹理、廓形和关键细节一致，不要改成其他衣服。",
        `核心商品：${product.name}。`,
        `商品风格：${product.tags.join(" / ")}。`,
        `商户：${seller.name}。`,
        "画面需要是完整穿搭展示，真人街拍质感，干净背景，人物自然真实，服装穿着贴合身体姿态。",
        "不要出现品牌 logo、文字、水印、畸形手指、多余肢体或重复人物。",
      ].join("\n"),
      images: [product.image],
      maxImages: 1,
      sequential: false,
    });

    return NextResponse.json({
      ...draft,
      modelImage: images[0],
      status: "ready",
    });
  } catch {
    return NextResponse.json(draft);
  }
}
