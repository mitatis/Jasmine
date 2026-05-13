import { RoleGate } from "@/components/auth/role-gate";
import { MePage } from "@/components/marketplace-app";

export default function Page() {
  return (
    <RoleGate accountType="creator">
      <MePage />
    </RoleGate>
  );
}
