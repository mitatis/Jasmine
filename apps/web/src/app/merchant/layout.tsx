import { RoleGate } from "@/components/auth/role-gate";

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate accountType="merchant">{children}</RoleGate>;
}
