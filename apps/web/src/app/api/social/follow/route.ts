import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { sellerId: string; nextState: boolean };

  return NextResponse.json({
    sellerId: body.sellerId,
    followed: body.nextState,
  });
}
