import { RoleGate } from "@/components/auth/role-gate";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate accountType="merchant">{children}</RoleGate>;
}
