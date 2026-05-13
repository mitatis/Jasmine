import { NextResponse } from "next/server";

import { seedProducts } from "@/lib/seed";
import type { ProductRecognitionDraft } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    sellerId?: string;
    image?: string;
    hint?: string;
  };
  const reference = seedProducts[0];
  const hint = body.hint?.trim();
  const tags = hint
    ? [...new Set([hint, "AI识别", "商单商品"])]
    : ["AI识别", "通勤", "商单商品"];

  const draft: ProductRecognitionDraft = {
    sellerId: body.sellerId ?? "seller-urban",
    image: body.image || reference.image,
    name: hint ? `${hint} 商单款` : "AI识别通勤外套",
    price: "229",
    stock: "12",
    sizes: "S,M,L,XL",
    material: "棉混纺斜纹布，挺阔微哑光表面，适合图文和短视频展示。",
    tags,
    confidence: 86,
    notes: "当前为可编辑识别草稿；接入视觉模型后可返回更细的版型、材质和颜色属性。",
  };

  return NextResponse.json(draft);
}
