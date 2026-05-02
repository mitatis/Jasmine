import { NextResponse } from "next/server";

import { seedProducts } from "@/lib/seed";
import { generateSeedreamImages } from "@/lib/seedream";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    productId: string;
    sourceImages?: string[];
    productImage?: string;
    productName?: string;
    productTags?: string[];
    maxImages?: number;
  };
  const product = seedProducts.find((item) => item.id === body.productId) ?? seedProducts[0];

  try {
    const maxImages = Math.min(Math.max(body.maxImages ?? body.sourceImages?.length ?? 1, 1), 6);
    const images = await generateSeedreamImages({
      prompt: [
        "任务：生成真实时尚穿搭试衣图，用于小红书 OOTD 封面。",
        "人物一致性：严格保持第1张人物参考图中的人物主体身份、脸部五官、发型、体型比例、肤色、姿态方向和摄影透视，不要换脸，不要改变人物年龄和性别。",
        "服装一致性：严格参考商品图中的服装颜色、版型、领口、袖长、材质纹理、廓形和细节，将其自然穿在同一人物身上；不要凭空改变商品为其他款式。",
        "融合要求：衣服必须贴合身体姿态，褶皱、遮挡、光影和边缘要自然，保持真实街拍摄影质感。",
        `目标服装：${body.productName ?? product.name}。`,
        `风格标签：${(body.productTags ?? product.tags).join(" / ")}。`,
        "构图：全身或 3/4 身穿搭展示，背景干净，画面高级但像真实穿搭博主照片。",
        "禁止：不要添加品牌 logo、文字、水印、价格牌、畸形手指、多余肢体、重复人物。",
      ].join("\n"),
      images: [...(body.sourceImages ?? []), body.productImage ?? product.image].filter(Boolean),
      maxImages,
      sequential: maxImages > 1,
    });

    return NextResponse.json({
      status: "ready",
      images,
      resultImage: images[0],
    });
  } catch (error) {
    return NextResponse.json({
      status: "fallback",
      error: error instanceof Error ? error.message : "Try-on generation failed",
      images: [product.tryOnPreset],
      resultImage: product.tryOnPreset,
    });
  }
}
