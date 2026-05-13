import { NextResponse } from "next/server";

import { seedRequests } from "@/lib/seed";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const requestPost = seedRequests.find((item) => item.id === id);

  if (!requestPost) {
    return NextResponse.json({ message: "Request not found" }, { status: 404 });
  }

  return NextResponse.json({
    offers: requestPost.matchedOffers,
  });
}
