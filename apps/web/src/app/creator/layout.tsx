import { RoleGate } from "@/components/auth/role-gate";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate accountType="creator">{children}</RoleGate>;
}
