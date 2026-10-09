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
"[project]/src/app/api/session/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/session-cookies.ts [app-route] (ecmascript)");
;
;
;
async function PATCH(req) {
    const body = await req.json().catch(()=>({}));
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
    const accessToken = req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ACCESS_COOKIE"])?.value;
    const flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseFlags"])(req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FLAGS_COOKIE"])?.value);
    if (accessToken && flags) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeSession"])(res, {
            accessToken,
            refreshToken: req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REFRESH_COOKIE"])?.value
        }, {
            ...flags,
            ...body.onboardingStatus !== undefined && {
                onboardingStatus: body.onboardingStatus
            },
            ...body.isKycComplete !== undefined && {
                isKycComplete: body.isKycComplete
            }
        });
    }
    if (body.seenOnboarding) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["markOnboardingSeen"])(res);
    return res;
}
async function DELETE() {
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearSession"])(res);
    return res;
}
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

//# sourceMappingURL=%5Broot-of-the-server%5D__16x7iwz._.js.map