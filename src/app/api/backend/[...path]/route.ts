import { NextResponse, type NextRequest } from "next/server";

import { API_URL, clearSession, refreshTokens, writeSession } from "@/lib/api/server";
import {
  ACCESS_COOKIE,
  FLAGS_COOKIE,
  REFRESH_COOKIE,
  parseFlags,
  type SessionFlags,
} from "@/lib/api/session-cookies";

/**
 * Same-origin proxy to the CirclesFundMe API.
 *
 * - Attaches the access token from the httpOnly cookie (the mobile app reads it from AsyncStorage).
 * - On 401/403, refreshes the token once and retries (services/api/index.js).
 * - Retries once after 2.5s on timeouts / network errors to ride out backend cold starts.
 * - Captures tokens returned by `auth/login` into cookies and strips them from the response,
 *   so page JavaScript never sees them.
 */

const TIMEOUT_MS = 15_000;
const HOP_BY_HOP = new Set(["connection", "content-encoding", "content-length", "transfer-encoding", "keep-alive"]);

async function forward(url: string, init: RequestInit, retried = false): Promise<Response> {
  try {
    return await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS), cache: "no-store" });
  } catch (error) {
    if (retried) throw error;
    await new Promise((r) => setTimeout(r, 2500));
    return forward(url, init, true);
  }
}

async function handle(req: NextRequest, ctx: RouteContext<"/api/backend/[...path]">) {
  const { path } = await ctx.params;
  const endpoint = path.map(encodeURIComponent).join("/");
  const url = `${API_URL}/${endpoint}${req.nextUrl.search}`;

  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  headers.set("accept", req.headers.get("accept") ?? "application/json");

  let accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  const flags = parseFlags(req.cookies.get(FLAGS_COOKIE)?.value);
  if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);

  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer();
  const init: RequestInit = { method: req.method, headers, body };

  let upstream: Response;
  try {
    upstream = await forward(url, init);
  } catch {
    return NextResponse.json(
      { message: "Network error. Please, check your internet connection.", code: "ERR_NETWORK" },
      { status: 504 }
    );
  }

  let refreshed: { accessToken: string; refreshToken?: string } | null = null;
  if (accessToken && (upstream.status === 401 || upstream.status === 403)) {
    refreshed = await refreshTokens(accessToken, refreshToken);
    if (!refreshed) {
      const res = new NextResponse(upstream.body, { status: upstream.status, headers: copyHeaders(upstream) });
      clearSession(res);
      return res;
    }
    accessToken = refreshed.accessToken;
    headers.set("authorization", `Bearer ${accessToken}`);
    upstream = await forward(url, { ...init, headers });
  }

  const isLogin = endpoint.toLowerCase() === "auth/login" && req.method === "POST";
  if (isLogin && upstream.ok) {
    const json = await upstream.json().catch(() => null);
    const data = json?.data;
    if (data?.accessToken) {
      const { accessToken: at, refreshToken: rt, ...user } = data;
      const res = NextResponse.json({ ...json, data: user }, { status: upstream.status });
      writeSession(
        res,
        { accessToken: at, refreshToken: rt },
        { loginTime: Date.now(), onboardingStatus: user.onboardingStatus, isKycComplete: true }
      );
      return res;
    }
    return NextResponse.json(json, { status: upstream.status });
  }

  const res = new NextResponse(upstream.body, { status: upstream.status, headers: copyHeaders(upstream) });
  if (refreshed) {
    writeSession(res, refreshed, flags ?? ({ loginTime: Date.now() } satisfies SessionFlags));
  }
  return res;
}

function copyHeaders(upstream: Response) {
  const out = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase()) && key.toLowerCase() !== "set-cookie") out.set(key, value);
  });
  return out;
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
