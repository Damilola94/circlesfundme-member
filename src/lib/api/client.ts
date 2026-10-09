// Browser-side API helper. Same options as the mobile app's `handleFetch`, so screen logic ports 1:1.
// Requests go to our own `/api/backend/*` proxy, which attaches the session token.

type FetchOptions = {
  endpoint?: string;
  extra?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  /** Kept for parity with the mobile code; the proxy always attaches the session token if present. */
  auth?: boolean;
  body?: unknown;
  pQuery?: Record<string, string | number | boolean | undefined | null>;
  param?: string;
  /** Send `body` (a FormData) as multipart/form-data. */
  multipart?: boolean;
  /** Return the error body instead of throwing. */
  returnErrorData?: boolean;
  responseType?: "json" | "blob";
};

/** Every backend response is wrapped like this; `status`/`method` are added for parity with the mobile app. */
// Backend payloads are untyped; callers narrow them with the generic.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any> = {
  isSuccess?: boolean;
  statusCode?: string;
  message?: string;
  data: T;
  status: number;
  method: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
    super(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function api<T = any>({
  endpoint = "",
  extra = "",
  method = "GET",
  body,
  pQuery,
  param = "",
  multipart = false,
  returnErrorData = false,
  responseType = "json",
}: FetchOptions = {}): Promise<ApiResponse<T>> {
  let path = endpoint.replace(/^\/+/, "");
  if (extra) path += `/${extra}`;
  if (param) path += `/${param}`;

  const query = new URLSearchParams();
  for (const [key, val] of Object.entries(pQuery ?? {})) {
    if (val !== undefined && val !== null) query.append(key, String(val));
  }
  const url = `/api/backend/${path}${query.size ? `?${query}` : ""}`;

  const init: RequestInit = { method, credentials: "same-origin" };
  if (body !== undefined && method !== "GET" && method !== "HEAD") {
    if (multipart) {
      // The mobile app relied on axios turning plain objects into form data; do that explicitly.
      init.body = body instanceof FormData ? body : toFormData(body as Record<string, unknown>);
    } else {
      init.headers = { "Content-Type": "application/json" };
      init.body = JSON.stringify(body);
    }
  }

  const res = await fetch(url, init);

  if (responseType === "blob" && res.ok) {
    return { data: (await res.blob()) as T, status: res.status, method };
  }

  const json = await res.json().catch(() => ({}));
  if (res.ok) return { ...json, status: res.status, method };

  if (returnErrorData) return { ...json, status: res.status, method };

  if (res.status === 401 || res.status === 403) onUnauthorized();
  throw new ApiError(errorMessage(res, json), res.status, json);
}

function toFormData(values: Record<string, unknown>) {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue;
    form.append(key, value instanceof Blob ? value : String(value));
  }
  return form;
}

/** Mirrors utils/errorHandler.js from the mobile app. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorMessage(res: Response, data: any): string {
  if (data?.code === "ERR_NETWORK") return data.message;
  if (res.status === 401 || res.status === 403) {
    return (
      data?.detail ||
      data?.title ||
      data?.message ||
      "You are either not authorized to access this resource or your session has expired. Please login again."
    );
  }
  if (res.status === 422) return data?.errors?.[""]?.[0] || "Validation failed.";
  if (Array.isArray(data?.errors)) return data.errors.join(", ");
  if (Array.isArray(data?.Errors)) return data.Errors.join(", ");
  return (
    data?.detail ||
    data?.error?.message ||
    data?.message ||
    res.statusText ||
    "Something went wrong. Please, try again."
  );
}

let redirecting = false;
function onUnauthorized() {
  if (redirecting || typeof window === "undefined") return;
  // Only bounce signed-in areas; auth screens handle their own 401s (e.g. wrong password).
  if (/^\/(sign-in|sign-up|auth)(\/|$)/.test(window.location.pathname)) return;
  redirecting = true;
  // Full navigation on purpose: drops every cached query belonging to the expired session.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.assign("/sign-in/login");
}

/** True when the backend reports success the way the mobile screens check it. */
export function isOk(res: { statusCode?: string; status?: number } | undefined) {
  return res?.statusCode === "200" || res?.status === 200;
}

export function updateSession(flags: { onboardingStatus?: string; isKycComplete?: boolean; seenOnboarding?: boolean }) {
  return fetch("/api/session", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flags),
  });
}

export function logout() {
  return fetch("/api/session", { method: "DELETE" });
}
