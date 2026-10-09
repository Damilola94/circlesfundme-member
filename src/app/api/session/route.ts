import { NextResponse, type NextRequest } from "next/server";

import { clearSession, markOnboardingSeen, writeSession } from "@/lib/api/server";
import { ACCESS_COOKIE, FLAGS_COOKIE, REFRESH_COOKIE, parseFlags } from "@/lib/api/session-cookies";

/**
 * PATCH: update the non-sensitive session flags the mobile app kept next to its tokens
 * (`onboardingStatus`, `isKycComplete`) and/or mark onboarding as seen.
 */
export async function PATCH(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    onboardingStatus?: string;
    isKycComplete?: boolean;
    seenOnboarding?: boolean;
  };
  const res = NextResponse.json({ ok: true });

  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const flags = parseFlags(req.cookies.get(FLAGS_COOKIE)?.value);
  if (accessToken && flags) {
    writeSession(
      res,
      { accessToken, refreshToken: req.cookies.get(REFRESH_COOKIE)?.value },
      {
        ...flags,
        ...(body.onboardingStatus !== undefined && { onboardingStatus: body.onboardingStatus }),
        ...(body.isKycComplete !== undefined && { isKycComplete: body.isKycComplete }),
      }
    );
  }
  if (body.seenOnboarding) markOnboardingSeen(res);
  return res;
}

/** Log out. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}
