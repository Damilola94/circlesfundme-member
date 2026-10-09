// Cookie names and shapes shared by the API proxy, route guard (src/proxy.ts) and client.
// Safe to import anywhere: contains no secrets.

/** httpOnly: backend access token. */
export const ACCESS_COOKIE = "cfm_at";
/** httpOnly: backend refresh token. */
export const REFRESH_COOKIE = "cfm_rt";
/** Readable: non-sensitive session flags used for routing decisions. */
export const FLAGS_COOKIE = "cfm_session";
/** Readable: set once the user has gone through sign-up, so the app opens on Login. */
export const SEEN_ONBOARDING_COOKIE = "cfm_seen_onboarding";

/** Same as the mobile app: a login is only valid for 15 minutes. */
export const SESSION_TTL_MS = 15 * 60 * 1000;

export type SessionFlags = {
  loginTime: number;
  onboardingStatus?: string;
  isKycComplete?: boolean;
};

export function parseFlags(raw: string | undefined): SessionFlags | null {
  if (!raw) return null;
  try {
    const flags = JSON.parse(decodeURIComponent(raw)) as SessionFlags;
    return typeof flags.loginTime === "number" ? flags : null;
  } catch {
    return null;
  }
}

export function isExpired(flags: SessionFlags, now = Date.now()) {
  return now - flags.loginTime > SESSION_TTL_MS;
}
