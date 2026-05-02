import { NextResponse } from "next/server";

import { seedPosts, seedProducts } from "@/lib/seed";

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

  const maxImages = Math.min(Math.max(body.maxImages ?? body.sourceImages?.length ?? 1, 1), 6);
  const postImages = seedPosts
    .filter((post) => post.type === "seller-look")
    .filter((post) => {
      const ids = post.productIds ?? (post.productId ? [post.productId] : []);
      return ids.includes(product.id);
    })
    .map((post) => post.coverImage);
  const fallbackImages = [
    product.tryOnPreset,
    ...postImages,
    product.detailImages[1],
    product.detailImages[0],
  ].filter((image): image is string => Boolean(image));
  const uniqueImages = [...new Set(fallbackImages)].slice(0, maxImages);
  const images = uniqueImages.length ? uniqueImages : [product.tryOnPreset];

  return NextResponse.json({
    status: "mock",
    images,
    resultImage: images[0],
  });
}
