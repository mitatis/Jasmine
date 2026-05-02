import { NextResponse } from "next/server";

import { seedDemoState } from "@/lib/seed";

export async function GET() {
  return NextResponse.json({
    posts: seedDemoState.posts,
    bloggers: seedDemoState.bloggers,
    sellers: seedDemoState.sellers,
    products: seedDemoState.products,
    requests: seedDemoState.requests,
  });
}
