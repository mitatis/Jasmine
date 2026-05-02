import { NextResponse } from "next/server";

import { seedProducts, seedSellers } from "@/lib/seed";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    productId: string;
    size: string;
    balance: number;
  };
  const product = seedProducts.find((item) => item.id === body.productId);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  if (!body.size) {
    return NextResponse.json({ message: "Size is required" }, { status: 400 });
  }

  if (product.stock < 1) {
    return NextResponse.json({ message: "Out of stock" }, { status: 400 });
  }

  if (body.balance < product.price) {
    return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
  }

  const seller = seedSellers.find((item) => item.id === product.sellerId);

  return NextResponse.json({
    ok: true,
    amount: product.price,
    sellerId: seller?.id,
  });
}
