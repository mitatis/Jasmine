import { RoleGate } from "@/components/auth/role-gate";
import { CreatorVisitorProfilePage } from "@/components/creator-profile-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RoleGate accountType="creator">
      <CreatorVisitorProfilePage creatorId={id} />
    </RoleGate>
  );
}
