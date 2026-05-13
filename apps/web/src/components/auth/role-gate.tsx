"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/auth";
import type { AccountType } from "@/lib/types";

const loginPaths: Record<AccountType, string> = {
  merchant: "/merchant/login",
  creator: "/creator/login",
};

const registerPaths: Record<AccountType, string> = {
  merchant: "/merchant/register",
  creator: "/creator/register",
};

export function RoleGate({ accountType, children }: { accountType: AccountType; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.tokens[accountType]);
  const activeAccountType = useAuthStore((state) => state.activeAccountType);
  const activateAccount = useAuthStore((state) => state.activateAccount);
  const isAuthPath = pathname === loginPaths[accountType] || pathname === registerPaths[accountType];
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (isAuthPath) {
      return;
    }

    if (token) {
      activateAccount(accountType);
      return;
    }

    const next = `${pathname}${window.location.search}`;
    router.replace(`${loginPaths[accountType]}?next=${encodeURIComponent(next)}`);
  }, [accountType, activateAccount, hydrated, isAuthPath, pathname, router, token]);

  if (!hydrated || (!isAuthPath && (!token || activeAccountType !== accountType))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 rounded-full border border-border/70 bg-white px-5 py-3 text-sm text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" />
          正在验证账号...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
