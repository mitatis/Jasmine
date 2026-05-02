import { SearchResultsPage } from "@/components/marketplace-app";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;

  return <SearchResultsPage query={rawQuery ?? ""} />;
}
