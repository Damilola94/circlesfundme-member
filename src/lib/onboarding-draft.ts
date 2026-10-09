"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Data collected across the onboarding steps and submitted together by
 * `accounts/complete-onboarding`. The mobile app threaded these through route params;
 * on the web they live in sessionStorage so they never appear in URLs.
 */
export type OnboardingDraft = {
  fullName?: string;
  phone?: string;
  /** DD/MM/YYYY, as the mobile app stores it. */
  dob?: string;
  gender?: string;
  bvn?: string;
  documentUrl?: string;
  userAddress?: string;
  utilityBillUrl?: string;
  selfieUrl?: string;
};

const KEY = "cfm_onboarding_draft";
const listeners = new Set<() => void>();
let cache: OnboardingDraft | null = null;

function read(): OnboardingDraft {
  if (cache) return cache;
  try {
    cache = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as OnboardingDraft;
  } catch {
    cache = {};
  }
  return cache;
}

export function updateDraft(patch: Partial<OnboardingDraft>) {
  cache = { ...read(), ...patch };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Storage unavailable (private mode); keep the in-memory copy.
  }
  listeners.forEach((l) => l());
}

export function clearDraft() {
  cache = {};
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}

const EMPTY: OnboardingDraft = {};

export function useOnboardingDraft() {
  const draft = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    () => EMPTY
  );
  const update = useCallback((patch: Partial<OnboardingDraft>) => updateDraft(patch), []);
  return [draft, update] as const;
}
