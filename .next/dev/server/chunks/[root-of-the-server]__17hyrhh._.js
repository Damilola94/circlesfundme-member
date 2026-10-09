module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/build/adapter/setup-node-env.external.js [external] (next/dist/build/adapter/setup-node-env.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/build/adapter/setup-node-env.external.js", () => require("next/dist/build/adapter/setup-node-env.external.js"));

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
"[externals]/next/dist/server/lib/incremental-cache/memory-cache.external.js [external] (next/dist/server/lib/incremental-cache/memory-cache.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/memory-cache.external.js", () => require("next/dist/server/lib/incremental-cache/memory-cache.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/shared-cache-controls.external.js [external] (next/dist/server/lib/incremental-cache/shared-cache-controls.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js", () => require("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/router-utils/instrumentation-globals.external.js [external] (next/dist/server/lib/router-utils/instrumentation-globals.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/lib/router-utils/instrumentation-globals.external.js", () => require("next/dist/server/lib/router-utils/instrumentation-globals.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

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
"[project]/src/lib/api/session-cookies.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/session-cookies.ts [middleware] (ecmascript)");
;
;
function proxy(req) {
    const { pathname } = req.nextUrl;
    const hasToken = !!req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ACCESS_COOKIE"])?.value;
    const flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["parseFlags"])(req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["FLAGS_COOKIE"])?.value);
    const seenOnboarding = !!req.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["SEEN_ONBOARDING_COOKIE"])?.value;
    const to = (path)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(path, req.url));
    const signedOut = ()=>to(seenOnboarding ? "/sign-in/login" : "/sign-up/onboarding");
    if (hasToken && flags && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["isExpired"])(flags)) {
        const res = to("/sign-in/login");
        for (const name of [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ACCESS_COOKIE"],
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["REFRESH_COOKIE"],
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$session$2d$cookies$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["FLAGS_COOKIE"]
        ])res.cookies.delete(name);
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    // Everything except auth/sign-up screens, API routes and static files.
    matcher: [
        "/((?!api|_next|images|favicon.ico|sign-in|sign-up|auth|.*\\.[\\w]+$).*)"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__17hyrhh._.js.map