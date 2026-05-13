import { NextResponse } from "next/server";

import { generateSeedreamImages } from "@/lib/seedream";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    prompt: string;
    images?: string[];
    maxImages?: number;
    sequential?: boolean;
  };

  if (!body.prompt?.trim()) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  try {
    const images = await generateSeedreamImages({
      prompt: body.prompt,
      images: body.images,
      maxImages: body.maxImages,
      sequential: body.sequential,
    });

    return NextResponse.json({
      status: "ready",
      images,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "fallback",
        error: error instanceof Error ? error.message : "Image generation failed",
        images: [],
      },
      { status: 200 },
    );
  }
}
