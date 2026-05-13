import { CampaignsPage } from "@/components/marketplace-app";
import { RoleGate } from "@/components/auth/role-gate";

export default function Page() {
  return (
    <RoleGate accountType="creator">
      <CampaignsPage />
    </RoleGate>
  );
}
