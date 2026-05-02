import { ProductDetailPage } from "@/components/marketplace-app";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailPage productId={id} />;
}
