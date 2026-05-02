import { NextResponse } from "next/server";

import { buildStyleAnalysis } from "@/lib/seed";

export async function POST(request: Request) {
  const body = (await request.json()) as { link: string; coverImage?: string };
  const analysis = buildStyleAnalysis(body.link);

  return NextResponse.json({
    ...analysis,
    coverImage: body.coverImage || analysis.coverImage,
  });
}
