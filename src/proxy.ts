import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_COOKIE,
  FLAGS_COOKIE,
  REFRESH_COOKIE,
  SEEN_ONBOARDING_COOKIE,
  isExpired,
  parseFlags,
} from "@/lib/api/session-cookies";

/**
 * Route guard. Mirrors app/index.tsx and app/protected-route.tsx from the mobile app:
 * - no session            -> /sign-in/login (or the intro if this browser never signed up)
 * - session > 15 min old  -> cleared, /sign-in/login
 * - onboarding InProgress -> /sign-in/welcome-onboarding
 * - KYC incomplete        -> /sign-up/personal-info
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasToken = !!req.cookies.get(ACCESS_COOKIE)?.value;
  const flags = parseFlags(req.cookies.get(FLAGS_COOKIE)?.value);
  const seenOnboarding = !!req.cookies.get(SEEN_ONBOARDING_COOKIE)?.value;

  const to = (path: string) => NextResponse.redirect(new URL(path, req.url));
  const signedOut = () => to(seenOnboarding ? "/sign-in/login" : "/sign-up/onboarding");

  if (hasToken && flags && isExpired(flags)) {
    const res = to("/sign-in/login");
    for (const name of [ACCESS_COOKIE, REFRESH_COOKIE, FLAGS_COOKIE]) res.cookies.delete(name);
    return res;
  }

  // Entry point: send people where the mobile app's index screen would.
  if (pathname === "/") {
    if (!hasToken || !flags) return signedOut();
    if (flags.onboardingStatus === "InProgress") return to("/sign-in/welcome-onboarding");
    return to(flags.isKycComplete ? "/dashboard" : "/sign-up/personal-info");
  }

  if (!hasToken || !flags) return signedOut();
  if (flags.onboardingStatus === "InProgress") return to("/sign-in/welcome-onboarding");
  if (!flags.isKycComplete) return to("/sign-up/personal-info");
  return NextResponse.next();
}

export const config = {
  // Everything except auth/sign-up screens, API routes and static files.
  matcher: [
    "/((?!api|_next|images|favicon.ico|sign-in|sign-up|auth|.*\\.[\\w]+$).*)",
  ],
};
