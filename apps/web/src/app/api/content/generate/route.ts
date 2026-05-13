import { NextResponse } from "next/server";

import { seedBloggers, seedProducts, seedSellers } from "@/lib/seed";
import type { GeneratedContentDraft, GeneratedContentFormat, PublishDestination } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    format?: GeneratedContentFormat;
    productId?: string;
    sellerId?: string;
    bloggerId?: string;
    prompt?: string;
    destinations?: PublishDestination[];
  };
  const format = body.format ?? "image-post";
  const product = seedProducts.find((item) => item.id === body.productId) ?? seedProducts[0];
  const seller = seedSellers.find((item) => item.id === (body.sellerId ?? product.sellerId)) ?? seedSellers[0];
  const blogger = seedBloggers.find((item) => item.id === body.bloggerId) ?? seedBloggers[0];
  const primaryTag = product.tags[0] ?? "穿搭";
  const destinations: PublishDestination[] = body.destinations?.length ? body.destinations : ["community"];
  const basePrompt = body.prompt?.trim();

  const draft: GeneratedContentDraft = {
    id: `draft-${Date.now()}`,
    format,
    title:
      format === "video-script"
        ? `${primaryTag}商单短视频脚本：3秒抓住版型`
        : `${blogger.name} 的 ${primaryTag} 商单穿搭`,
    body:
      format === "video-script"
        ? [
            `镜头1：用 ${product.name} 的正面上身画面做开场，字幕突出 ${primaryTag}。`,
            `镜头2：切到行走和转身，讲清 ${product.tags.slice(1, 3).join("、") || seller.styleFocus}。`,
            "镜头3：给出适合人群、尺码建议和评论区互动引导。",
            basePrompt ? `补充要求：${basePrompt}` : "",
          ]
            .filter(Boolean)
            .join("\n")
        : `基于 ${product.name} 生成一组可直接发布的 ${primaryTag} 图文。重点突出 ${product.tags
            .slice(1)
            .join(" / ")}，让商家能快速判断内容调性和带货潜力。${basePrompt ? `补充要求：${basePrompt}` : ""}`,
    tags: [...new Set([primaryTag, ...blogger.styleTags, ...product.tags])].slice(0, 6),
    media: [product.tryOnPreset, product.image].filter(Boolean),
    productIds: [product.id],
    sellerId: seller.id,
    bloggerId: blogger.id,
    publishDestinations: destinations,
  };

  return NextResponse.json(draft);
}
