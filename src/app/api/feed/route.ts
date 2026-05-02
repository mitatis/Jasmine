import { NextResponse } from "next/server";

import { seedBloggers, seedPosts, seedProducts, seedRequests, seedSellers } from "@/lib/seed";

export async function GET() {
  return NextResponse.json({
    posts: seedPosts,
    bloggers: seedBloggers,
    sellers: seedSellers,
    products: seedProducts,
    requests: seedRequests,
  });
}
