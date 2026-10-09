module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/backend/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/session-cookies.ts [app-route] (ecmascript)");
;
;
;
/**
 * Same-origin proxy to the CirclesFundMe API.
 *
 * - Attaches the access token from the httpOnly cookie (the mobile app reads it from AsyncStorage).
 * - On 401/403, refreshes the token once and retries (services/api/index.js).
 * - Retries once after 2.5s on timeouts / network errors to ride out backend cold starts.
 * - Captures tokens returned by `auth/login` into cookies and strips them from the response,
 *   so page JavaScript never sees them.
 */ const TIMEOUT_MS = 15_000;
const HOP_BY_HOP = new Set([
    "connection",
    "content-encoding",
    "content-length",
    "transfer-encoding",
    "keep-alive"
]);
async function forward(url, init, retried = false) {
    try {
        return await fetch(url, {
            ...init,
            signal: AbortSignal.timeout(TIMEOUT_MS),
            cache: "no-store"
        });
    } catch (error) {
        if (retried) throw error;
        await new Promise((r)=>setTimeout(r, 2500));
        return forward(url, init, true);
    }
}
async function handle(req, ctx) {
    const { path } = await ctx.params;
    const endpoint = path.map(encodeURIComponent).join("/");
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_URL"]}/${endpoint}${req.nextUrl.search}`;
    const headers = new Headers();
    const contentType = req.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    headers.set("accept", req.headers.get("accept") ?? "application/json");
    let accessToken = req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ACCESS_COOKIE"])?.value;
    const refreshToken = req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REFRESH_COOKIE"])?.value;
    const flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFlags"])(req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FLAGS_COOKIE"])?.value);
    if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);
    const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer();
    const init = {
        method: req.method,
        headers,
        body
    };
    let upstream;
    try {
        upstream = await forward(url, init);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Network error. Please, check your internet connection.",
            code: "ERR_NETWORK"
        }, {
            status: 504
        });
    }
    let refreshed = null;
    if (accessToken && (upstream.status === 401 || upstream.status === 403)) {
        refreshed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["refreshTokens"])(accessToken, refreshToken);
        if (!refreshed) {
            const res = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](upstream.body, {
                status: upstream.status,
                headers: copyHeaders(upstream)
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearSession"])(res);
            return res;
        }
        accessToken = refreshed.accessToken;
        headers.set("authorization", `Bearer ${accessToken}`);
        upstream = await forward(url, {
            ...init,
            headers
        });
    }
    const isLogin = endpoint.toLowerCase() === "auth/login" && req.method === "POST";
    if (isLogin && upstream.ok) {
        const json = await upstream.json().catch(()=>null);
        const data = json?.data;
        if (data?.accessToken) {
            const { accessToken: at, refreshToken: rt, ...user } = data;
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...json,
                data: user
            }, {
                status: upstream.status
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeSession"])(res, {
                accessToken: at,
                refreshToken: rt
            }, {
                loginTime: Date.now(),
                onboardingStatus: user.onboardingStatus,
                isKycComplete: true
            });
            return res;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(json, {
            status: upstream.status
        });
    }
    const res = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](upstream.body, {
        status: upstream.status,
        headers: copyHeaders(upstream)
    });
    if (refreshed) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeSession"])(res, refreshed, flags ?? {
            loginTime: Date.now()
        });
    }
    return res;
}
function copyHeaders(upstream) {
    const out = new Headers();
    upstream.headers.forEach((value, key)=>{
        if (!HOP_BY_HOP.has(key.toLowerCase()) && key.toLowerCase() !== "set-cookie") out.set(key, value);
    });
    return out;
}
const GET = handle;
const POST = handle;
const PUT = handle;
const PATCH = handle;
const DELETE = handle;
}),
"[project]/src/lib/api/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "clearSession",
    ()=>clearSession,
    "markOnboardingSeen",
    ()=>markOnboardingSeen,
    "refreshTokens",
    ()=>refreshTokens,
    "writeSession",
    ()=>writeSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/session-cookies.ts [app-route] (ecmascript)");
;
;
const API_URL = (process.env.CFM_API_URL ?? "https://api.circlesfundme.com/api/v1").replace(/\/$/, "");
const secure = ("TURBOPACK compile-time value", "development") === "production";
function writeSession(res, tokens, flags) {
    const maxAge = Math.max(1, Math.floor((flags.loginTime + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_TTL_MS"] - Date.now()) / 1000));
    const base = {
        path: "/",
        sameSite: "lax",
        secure,
        maxAge
    };
    res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ACCESS_COOKIE"], tokens.accessToken, {
        ...base,
        httpOnly: true
    });
    if (tokens.refreshToken) res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REFRESH_COOKIE"], tokens.refreshToken, {
        ...base,
        httpOnly: true
    });
    res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FLAGS_COOKIE"], encodeURIComponent(JSON.stringify(flags)), base);
}
function clearSession(res) {
    for (const name of [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ACCESS_COOKIE"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REFRESH_COOKIE"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FLAGS_COOKIE"]
    ])res.cookies.delete(name);
}
function markOnboardingSeen(res) {
    res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEEN_ONBOARDING_COOKIE"], "1", {
        path: "/",
        sameSite: "lax",
        secure,
        maxAge: 60 * 60 * 24 * 365
    });
}
async function refreshTokens(accessToken, refreshToken) {
    if (!refreshToken) return null;
    try {
        const res = await fetch(`${API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                expiredToken: accessToken,
                refreshToken
            }),
            cache: "no-store"
        });
        if (!res.ok) return null;
        const json = await res.json();
        const session = json?.data;
        return session?.accessToken ? session : null;
    } catch  {
        return null;
    }
}
}),
"[project]/src/lib/api/session-cookies.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Cookie names and shapes shared by the API proxy, route guard (src/proxy.ts) and client.
// Safe to import anywhere: contains no secrets.
/** httpOnly: backend access token. */ __turbopack_context__.s([
    "ACCESS_COOKIE",
    ()=>ACCESS_COOKIE,
    "FLAGS_COOKIE",
    ()=>FLAGS_COOKIE,
    "REFRESH_COOKIE",
    ()=>REFRESH_COOKIE,
    "SEEN_ONBOARDING_COOKIE",
    ()=>SEEN_ONBOARDING_COOKIE,
    "SESSION_TTL_MS",
    ()=>SESSION_TTL_MS,
    "isExpired",
    ()=>isExpired,
    "parseFlags",
    ()=>parseFlags
]);
const ACCESS_COOKIE = "cfm_at";
const REFRESH_COOKIE = "cfm_rt";
const FLAGS_COOKIE = "cfm_session";
const SEEN_ONBOARDING_COOKIE = "cfm_seen_onboarding";
const SESSION_TTL_MS = 15 * 60 * 1000;
function parseFlags(raw) {
    if (!raw) return null;
    try {
        const flags = JSON.parse(decodeURIComponent(raw));
        return typeof flags.loginTime === "number" ? flags : null;
    } catch  {
        return null;
    }
}
function isExpired(flags, now = Date.now()) {
    return now - flags.loginTime > SESSION_TTL_MS;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__194z5d5._.js.map