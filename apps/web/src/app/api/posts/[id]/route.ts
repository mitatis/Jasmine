import { NextResponse } from "next/server";

import { seedBloggers, seedPosts, seedProducts, seedRequests, seedSellers } from "@/lib/seed";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = seedPosts.find((item) => item.id === id);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({
    post,
    blogger: seedBloggers.find((blogger) => blogger.id === post.bloggerId) ?? null,
    seller: seedSellers.find((seller) => seller.id === post.sellerId) ?? null,
    products: seedProducts.filter((product) =>
      (post.productIds?.length ? post.productIds : post.productId ? [post.productId] : []).includes(product.id),
    ),
    request: seedRequests.find((request) => request.id === post.requestId) ?? null,
    similarProducts: seedProducts.filter((product) =>
      product.tags.some((tag) => post.styleTags.includes(tag)),
    ),
  });
}
