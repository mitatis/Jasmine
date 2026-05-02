import { redirect } from "next/navigation";

import { BloggerDetailPage } from "@/components/marketplace-app";

export default async function BloggerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "blogger-me") {
    redirect("/me");
  }

  return <BloggerDetailPage bloggerId={id} />;
}
