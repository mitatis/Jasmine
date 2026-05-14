import { RoleGate } from "@/components/auth/role-gate";
import { CreatorMeProfilePage } from "@/components/creator-profile-page";

export default function Page() {
  return (
    <RoleGate accountType="creator">
      <CreatorMeProfilePage />
    </RoleGate>
  );
}
