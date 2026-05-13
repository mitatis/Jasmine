import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { postId: string; nextState: boolean };

  return NextResponse.json({
    postId: body.postId,
    liked: body.nextState,
  });
}
