import "server-only";

import type { NextResponse } from "next/server";

import {
  ACCESS_COOKIE,
  FLAGS_COOKIE,
  REFRESH_COOKIE,
  SEEN_ONBOARDING_COOKIE,
  SESSION_TTL_MS,
  type SessionFlags,
} from "./session-cookies";

export const API_URL = (process.env.CFM_API_URL ?? "https://api.circlesfundme.com/api/v1").replace(/\/$/, "");

const secure = process.env.NODE_ENV === "production";

type Tokens = { accessToken: string; refreshToken?: string };

/** Store tokens in httpOnly cookies that expire with the 15-minute session window. */
export function writeSession(res: NextResponse, tokens: Tokens, flags: SessionFlags) {
  const maxAge = Math.max(1, Math.floor((flags.loginTime + SESSION_TTL_MS - Date.now()) / 1000));
  const base = { path: "/", sameSite: "lax" as const, secure, maxAge };
  res.cookies.set(ACCESS_COOKIE, tokens.accessToken, { ...base, httpOnly: true });
  if (tokens.refreshToken) res.cookies.set(REFRESH_COOKIE, tokens.refreshToken, { ...base, httpOnly: true });
  res.cookies.set(FLAGS_COOKIE, encodeURIComponent(JSON.stringify(flags)), base);
}

export function clearSession(res: NextResponse) {
  for (const name of [ACCESS_COOKIE, REFRESH_COOKIE, FLAGS_COOKIE]) res.cookies.delete(name);
}

export function markOnboardingSeen(res: NextResponse) {
  res.cookies.set(SEEN_ONBOARDING_COOKIE, "1", {
    path: "/",
    sameSite: "lax",
    secure,
    maxAge: 60 * 60 * 24 * 365,
  });
}

/** Mirrors services/api/refreshToken.js in the mobile app. */
export async function refreshTokens(accessToken: string | undefined, refreshToken: string | undefined) {
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expiredToken: accessToken, refreshToken }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    const session = json?.data;
    return session?.accessToken ? (session as Tokens) : null;
  } catch {
    return null;
  }
}
