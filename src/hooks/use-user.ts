"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import type { Bank, UserMe, WalletItem } from "@/lib/api/types";

export function useUser() {
  return useQuery({
    queryKey: ["users-me"],
    queryFn: () => api<UserMe>({ endpoint: "users/me" }),
    select: (res) => res.data,
  });
}

export function useWallets() {
  return useQuery({
    queryKey: ["financials-my-wallets"],
    queryFn: () => api<WalletItem[]>({ endpoint: "financials/my-wallets" }),
    select: (res) => res.data ?? [],
  });
}

export function useBanks() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => api<Bank[]>({ endpoint: "financials/banks" }),
    select: (res) => res.data ?? [],
    staleTime: 60 * 60 * 1000,
  });
}
