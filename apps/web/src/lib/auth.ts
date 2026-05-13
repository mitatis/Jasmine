"use client";

import { create } from "zustand";

import type { AccountType, UserRead } from "@/lib/types";

const TOKEN_KEYS: Record<AccountType, string> = {
  merchant: "jasmine_merchant_token",
  creator: "jasmine_creator_token",
};
const ACTIVE_ACCOUNT_KEY = "jasmine_active_account_type";

function isAccountType(value: string | null): value is AccountType {
  return value === "merchant" || value === "creator";
}

function storedActiveAccountType(): AccountType | null {
  if (typeof window === "undefined") {
    return null;
  }
  const value = window.localStorage.getItem(ACTIVE_ACCOUNT_KEY);
  return isAccountType(value) ? value : null;
}

function storedToken(accountType: AccountType): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(TOKEN_KEYS[accountType]);
}

type AuthState = {
  tokens: Record<AccountType, string | null>;
  activeAccountType: AccountType | null;
  token: string | null;
  user: UserRead | null;
  activateAccount: (accountType: AccountType) => void;
  setSession: (accountType: AccountType, token: string | null, user?: UserRead | null) => void;
  clearSession: (accountType?: AccountType) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  tokens: {
    merchant: storedToken("merchant"),
    creator: storedToken("creator"),
  },
  activeAccountType: storedActiveAccountType(),
  token: storedActiveAccountType() ? storedToken(storedActiveAccountType() as AccountType) : null,
  user: null,
  activateAccount: (accountType) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ACTIVE_ACCOUNT_KEY, accountType);
    }
    set((state) => ({
      activeAccountType: accountType,
      token: state.tokens[accountType],
    }));
  },
  setSession: (accountType, token, user = null) => {
    if (typeof window !== "undefined") {
      if (token) {
        window.localStorage.setItem(TOKEN_KEYS[accountType], token);
        window.localStorage.setItem(ACTIVE_ACCOUNT_KEY, accountType);
      } else {
        window.localStorage.removeItem(TOKEN_KEYS[accountType]);
      }
    }
    set((state) => ({
      tokens: { ...state.tokens, [accountType]: token },
      activeAccountType: token ? accountType : state.activeAccountType,
      token: token ?? (state.activeAccountType === accountType ? null : state.token),
      user,
    }));
  },
  clearSession: (accountType) => {
    if (typeof window !== "undefined") {
      if (accountType) {
        window.localStorage.removeItem(TOKEN_KEYS[accountType]);
        if (window.localStorage.getItem(ACTIVE_ACCOUNT_KEY) === accountType) {
          window.localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
        }
      } else {
        window.localStorage.removeItem(TOKEN_KEYS.merchant);
        window.localStorage.removeItem(TOKEN_KEYS.creator);
        window.localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
      }
    }
    set((state) => {
      if (!accountType) {
        return {
          tokens: { merchant: null, creator: null },
          activeAccountType: null,
          token: null,
          user: null,
        };
      }
      const nextTokens = { ...state.tokens, [accountType]: null };
      const nextActive = state.activeAccountType === accountType ? null : state.activeAccountType;
      return {
        tokens: nextTokens,
        activeAccountType: nextActive,
        token: nextActive ? nextTokens[nextActive] : null,
        user: state.activeAccountType === accountType ? null : state.user,
      };
    });
  },
}));

export function getStoredToken(accountType?: AccountType | null) {
  if (typeof window === "undefined") {
    return null;
  }
  const resolvedAccountType = accountType ?? storedActiveAccountType();
  return resolvedAccountType ? window.localStorage.getItem(TOKEN_KEYS[resolvedAccountType]) : null;
}

export function getStoredActiveAccountType() {
  return storedActiveAccountType();
}
