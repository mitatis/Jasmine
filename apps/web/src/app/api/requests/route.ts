import { NextResponse } from "next/server";

import { seedProducts, seedSellers } from "@/lib/seed";
import type { Offer, Post, RequestPost } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    coverImage: string;
    description: string;
    tags: string[];
    expectedItem: string;
    budget: number;
    matchedProducts: string[];
  };

  const matchedOffers: Offer[] = body.matchedProducts.slice(0, 3).flatMap((productId) => {
    const product = seedProducts.find((item) => item.id === productId);
    if (!product) {
      return [];
    }

    return [
      {
        sellerId: product.sellerId,
        productId: product.id,
        price: product.price,
        similarityScore: product.similarityScore,
        note: `系统根据 ${body.tags.slice(0, 2).join("、")} 匹配到这件商品，适合作为第一轮商户响应。`,
      },
    ];
  });

  const requestId = `request-${Date.now()}`;
  const requestPost: RequestPost = {
    id: requestId,
    image: body.coverImage,
    description: body.description,
    budget: body.budget,
    tags: body.tags,
    expectedItem: body.expectedItem,
    matchedOffers,
    createdAt: new Date().toISOString(),
  };

  const post: Post = {
    id: `post-${requestId}`,
    type: "buyer-request",
    requestId,
    title: `征集：${body.expectedItem}`,
    body: body.description,
    coverImage: body.coverImage,
    styleTags: body.tags,
    likes: 0,
    createdAt: requestPost.createdAt,
    priceLabel: `预算 ¥${body.budget}`,
  };

  const sellerNames = matchedOffers
    .map((offer) => seedSellers.find((seller) => seller.id === offer.sellerId)?.name)
    .filter(Boolean);

  return NextResponse.json({
    request: requestPost,
    post,
    responders: sellerNames,
  });
}
