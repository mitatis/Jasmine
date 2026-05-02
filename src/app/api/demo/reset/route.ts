import { NextResponse } from "next/server";

import { seedDemoState } from "@/lib/seed";

export async function POST() {
  return NextResponse.json(seedDemoState);
}
