(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(tabs)/notification/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$infinite$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-infinite-scroll.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/loader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/widgets.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const PAGE_SIZE = 10;
/** Cluster invitations carry "ClusterId=...;ClusterName=...;Role=..." in `data`. */ function parseClusterData(data) {
    if (!data) return null;
    const parts = Object.fromEntries(data.split(";").map((part)=>{
        const [key, ...rest] = part.split("=");
        return [
            key,
            rest.join("=")
        ];
    }));
    return {
        clusterId: parts.ClusterId ?? "",
        clusterName: parts.ClusterName ?? "",
        role: parts.Role ?? ""
    };
}
function NotificationsPage() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const [respondingId, setRespondingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
        queryKey: [
            "notifications"
        ],
        initialPageParam: 1,
        queryFn: {
            "NotificationsPage.useInfiniteQuery": ({ pageParam })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])({
                    endpoint: "notifications",
                    pQuery: {
                        PageSize: PAGE_SIZE,
                        PageNumber: pageParam
                    }
                })
        }["NotificationsPage.useInfiniteQuery"],
        getNextPageParam: {
            "NotificationsPage.useInfiniteQuery": (last, pages)=>last?.data?.length === PAGE_SIZE ? pages.length + 1 : undefined
        }["NotificationsPage.useInfiniteQuery"]
    });
    const sentinel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$infinite$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteScroll"])({
        "NotificationsPage.useInfiniteScroll[sentinel]": ()=>!isFetchingNextPage && fetchNextPage()
    }["NotificationsPage.useInfiniteScroll[sentinel]"], !!hasNextPage);
    const respond = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "NotificationsPage.useMutation[respond]": (body)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])({
                    endpoint: "clusters/invitations/respond",
                    method: "POST",
                    body
                })
        }["NotificationsPage.useMutation[respond]"],
        onSuccess: {
            "NotificationsPage.useMutation[respond]": (res, vars)=>{
                if (res?.isSuccess) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])({
                        type: "success",
                        text1: vars.accept ? "Invitation Accepted" : "Invitation Declined",
                        text2: vars.accept ? "You have joined the cluster." : "You have declined the invitation."
                    });
                    queryClient.invalidateQueries({
                        queryKey: [
                            "notifications"
                        ]
                    });
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])({
                        type: "error",
                        text1: "Failed",
                        text2: res?.message || "Something went wrong."
                    });
                }
                setRespondingId(null);
            }
        }["NotificationsPage.useMutation[respond]"],
        onError: {
            "NotificationsPage.useMutation[respond]": (error)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])({
                    type: "error",
                    text1: "Error",
                    text2: error.message || "Something went wrong."
                });
                setRespondingId(null);
            }
        }["NotificationsPage.useMutation[respond]"]
    });
    function handleRespond(clusterMemberId, notificationId, accept) {
        setRespondingId(`${notificationId}-${accept ? "accept" : "reject"}`);
        respond.mutate({
            clusterMemberId,
            accept
        });
    }
    const items = data?.pages.flatMap((p)=>p?.data ?? []) ?? [];
    const sections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupByDay"])(items, (i)=>i.createdDate);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-[32px] font-medium",
                children: "Notifications"
            }, void 0, false, {
                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineLoader"], {
                message: "Notification Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No notifications yet"
            }, void 0, false, {
                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this) : sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-3xl bg-white px-4 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: section.title
                        }, void 0, false, {
                            fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: section.rows.map((item)=>{
                                const amount = item.type === "Contribution" ? `+₦${item.data}` : item.type === "Withdrawal" ? `-₦${item.data}` : undefined;
                                const cluster = item.type === 4 ? parseClusterData(item.data) : null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivityItem"], {
                                            as: "div",
                                            row: {
                                                id: item.id,
                                                title: item.title,
                                                time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeLabel"])(item.createdDate),
                                                amount,
                                                tone: amount?.startsWith("+") ? "credit" : amount ? "debit" : "pending"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 21
                                        }, this),
                                        cluster && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3 ml-14 flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        "Role: ",
                                                        cluster.role
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: "danger-outline",
                                                            className: "h-9 rounded-full px-4",
                                                            disabled: respondingId !== null,
                                                            onClick: ()=>handleRespond(cluster.clusterId, item.id, false),
                                                            children: respondingId === `${item.id}-reject` ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                                                lineNumber: 118,
                                                                columnNumber: 69
                                                            }, this) : "Decline"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            className: "h-9 rounded-full px-4",
                                                            disabled: respondingId !== null,
                                                            onClick: ()=>handleRespond(cluster.clusterId, item.id, true),
                                                            children: respondingId === `${item.id}-accept` ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 69
                                                            }, this) : "Accept"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this)
                    ]
                }, section.title, true, {
                    fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: sentinel
            }, void 0, false, {
                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            isFetchingNextPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-sm text-muted-foreground",
                children: "Loading more..."
            }, void 0, false, {
                fileName: "[project]/src/app/(tabs)/notification/page.tsx",
                lineNumber: 139,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(tabs)/notification/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(NotificationsPage, "a6qzm6sq51OehnjLQdyynA9zR4w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$infinite$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = NotificationsPage;
var _c;
__turbopack_context__.k.register(_c, "NotificationsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/brand/logo-mark.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogoMark",
    ()=>LogoMark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/cn/dist/index.js [app-client] (ecmascript) <locals>");
;
;
// Path taken verbatim from the Figma logo asset (public/images/logo-mark.svg).
const MARK_PATH = "M41.6436 46.1748C43.0192 47.4496 44.7746 48.3188 46.7217 48.5947C41.8535 53.7684 34.9448 56.9999 27.2803 57L26.5908 56.9912C19.2017 56.8039 12.5597 53.613 7.83789 48.5947C9.78476 48.3189 11.5395 47.4493 12.915 46.1748C16.7129 49.6153 21.752 51.7109 27.2803 51.7109C32.8081 51.7108 37.8458 49.6149 41.6436 46.1748ZM6.50195 32.748C10.0928 32.748 13.0037 35.6592 13.0039 39.25C13.0039 42.8409 10.0929 45.752 6.50195 45.752C2.91102 45.7519 0 42.8409 0 39.25C0.000218006 35.6592 2.91115 32.7481 6.50195 32.748ZM48.0576 32.748C51.6484 32.748 54.5594 35.6592 54.5596 39.25C54.5596 42.8409 51.6486 45.752 48.0576 45.752C44.4668 45.7518 41.5557 42.8408 41.5557 39.25C41.5559 35.6594 44.467 32.7482 48.0576 32.748ZM27.5742 21.7422C32.442 21.7424 36.3885 25.6888 36.3887 30.5566C36.3887 35.4246 32.4421 39.3709 27.5742 39.3711C22.7061 39.3711 18.7598 35.4247 18.7598 30.5566C18.7599 25.6886 22.7062 21.7422 27.5742 21.7422ZM17.5576 5.44141C17.5187 5.78961 17.4971 6.14336 17.4971 6.50195C17.4971 8.03974 17.8672 9.4905 18.5195 10.7734C11.203 14.0596 6.0682 21.3359 5.88281 29.832C3.90446 29.9602 2.09328 30.6971 0.632812 31.8584C0.616425 31.5723 0.603984 31.2846 0.59668 30.9961L0.587891 30.3076C0.588061 18.9964 7.62363 9.32836 17.5576 5.44141ZM36.2832 5.17285C46.5949 8.86686 53.9725 18.7254 53.9727 30.3076L53.9639 30.9961C53.9566 31.2846 53.9422 31.5722 53.9258 31.8584C52.4654 30.6974 50.6549 29.9602 48.6768 29.832C48.4866 21.1192 43.0911 13.6906 35.4756 10.5312C36.0534 9.30905 36.3779 7.94355 36.3779 6.50195C36.3779 6.05074 36.3444 5.60718 36.2832 5.17285ZM26.9375 0C30.5284 0 33.4394 2.91102 33.4395 6.50195C33.4395 10.0929 30.5284 13.0039 26.9375 13.0039C23.3467 13.0038 20.4355 10.0928 20.4355 6.50195C20.4356 2.91111 23.3467 0.000137611 26.9375 0Z";
// The three outer "members" of the circle, as they sit in the path above.
const DOTS = [
    {
        cx: 26.9375,
        cy: 6.502
    },
    {
        cx: 6.502,
        cy: 39.25
    },
    {
        cx: 48.0576,
        cy: 39.25
    }
];
function LogoMark({ className, color = "currentColor", dotColor, spin }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 54.5596 57",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("h-[57px] w-[54.56px]", spin && "animate-[spin_2.4s_linear_infinite]", className),
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: MARK_PATH,
                fill: color
            }, void 0, false, {
                fileName: "[project]/src/components/brand/logo-mark.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            dotColor && DOTS.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: d.cx,
                    cy: d.cy,
                    r: 6.502,
                    fill: dotColor
                }, d.cx, false, {
                    fileName: "[project]/src/components/brand/logo-mark.tsx",
                    lineNumber: 34,
                    columnNumber: 25
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/brand/logo-mark.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = LogoMark;
var _c;
__turbopack_context__.k.register(_c, "LogoMark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/dashboard/widgets.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityItem",
    ()=>ActivityItem,
    "EligibilityTracker",
    ()=>EligibilityTracker,
    "EmptyState",
    ()=>EmptyState,
    "EquityTopUpCard",
    ()=>EquityTopUpCard,
    "RecentActivityList",
    ()=>RecentActivityList,
    "dayLabel",
    ()=>dayLabel,
    "groupByDay",
    ()=>groupByDay,
    "parseServerDate",
    ()=>parseServerDate,
    "timeLabel",
    ()=>timeLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as CircleAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/cn/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/loader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$import$2d$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/import-icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$export$2d$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/export-icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$bronze$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/loan-progress-bronze.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$silver$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/loan-progress-silver.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$platinum$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/loan-progress-platinum.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$gold$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/loan-progress-gold.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
// ---------------------------------------------------------------- Eligibility tiers
var TierStatus = /*#__PURE__*/ function(TierStatus) {
    TierStatus[TierStatus["Completed"] = 1] = "Completed";
    TierStatus[TierStatus["Current"] = 2] = "Current";
    TierStatus[TierStatus["Locked"] = 3] = "Locked";
    return TierStatus;
}(TierStatus || {});
const TIER_ICONS = {
    1: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$bronze$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    2: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$silver$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    3: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$platinum$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    4: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$gold$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
};
function EligibilityTracker() {
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "loan-eligibility-tier"
        ],
        queryFn: {
            "EligibilityTracker.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])({
                    endpoint: "loanapplications/my-eligibility-tier"
                })
        }["EligibilityTracker.useQuery"]
    });
    const tiers = data?.data?.tiers ?? [];
    if (tiers.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl bg-white px-4 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center px-3",
                children: tiers.map((tier, i)=>{
                    const locked = tier.status === 3;
                    const fill = tier.status === 1 ? "100%" : tier.status === 2 ? "50%" : "0%";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("size-2.5 shrink-0 rounded-full", locked ? "bg-[#c9c9c9]" : "bg-brand")
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/widgets.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            i < tiers.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative h-1 flex-1 rounded-full bg-[#e3e3e3]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute inset-y-0 left-0 rounded-full bg-brand",
                                    style: {
                                        width: fill
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                                    lineNumber: 60,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/widgets.tsx",
                                lineNumber: 59,
                                columnNumber: 17
                            }, this)
                        ]
                    }, tier.tier, true, {
                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 grid",
                style: {
                    gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))`
                },
                children: tiers.map((tier)=>{
                    const Icon = TIER_ICONS[tier.tier] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$loan$2d$progress$2d$bronze$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
                    const locked = tier.status === 3;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center justify-center gap-1 text-[10px]", locked && "text-muted-foreground"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        width: 12,
                                        height: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this),
                                    tier.tierName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/widgets.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("text-sm font-medium", locked && "text-muted-foreground"),
                                children: [
                                    "₦",
                                    tier.eligibleAmount.toLocaleString("en-NG")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/widgets.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-muted-foreground",
                                children: [
                                    tier.repaymentInstallments,
                                    " Days"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/widgets.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this)
                        ]
                    }, tier.tier, true, {
                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                        lineNumber: 72,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/widgets.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(EligibilityTracker, "JtionF1PqWN50DPWu724eJIU2SM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = EligibilityTracker;
function EquityTopUpCard({ isEligible, ineligibilityReason, equityTarget, paidEquity, outstandingBalance, eligibleFromDate, progress, isPending, onTopUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl bg-white p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base font-medium",
                children: "Complete your equity"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 h-2 overflow-hidden rounded-full bg-[#e3e3e3]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full bg-brand",
                    style: {
                        width: `${progress * 100}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: paidEquity ?? "₦0.00"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: [
                            "of ",
                            equityTarget ?? "₦0.00"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground",
                children: [
                    outstandingBalance ?? "₦0.00",
                    " left to pay"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "pill",
                className: "mt-4 w-full",
                disabled: !isEligible || isPending,
                onClick: onTopUp,
                children: isPending ? "Starting payment..." : "Complete My Equity"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            !isEligible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-muted-foreground",
                children: ineligibilityReason ?? (eligibleFromDate ? `You can top up from ${eligibleFromDate}.` : "Equity top-up isn’t available yet.")
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/widgets.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c1 = EquityTopUpCard;
function parseServerDate(value) {
    if (!value) return new Date(NaN);
    return new Date(/[zZ]|[+-]\d{2}:?\d{2}$/.test(value) ? value : `${value}Z`);
}
function dayLabel(iso) {
    if (!iso) return "N/A";
    const date = parseServerDate(iso);
    if (isNaN(date.getTime())) return "N/A";
    const startOf = (d)=>new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diffDays = Math.round((startOf(new Date()) - startOf(date)) / 86_400_000);
    if (diffDays === 0) return "TODAY";
    if (diffDays === 1) return "YESTERDAY";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long"
    }).toUpperCase();
}
function timeLabel(iso) {
    if (!iso) return "N/A";
    const date = parseServerDate(iso);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}
function groupByDay(items, getDate) {
    const groups = new Map();
    for (const item of items){
        const key = dayLabel(getDate(item));
        groups.set(key, [
            ...groups.get(key) ?? [],
            item
        ]);
    }
    return Array.from(groups, ([title, rows])=>({
            title,
            rows
        }));
}
function ActivityItem({ row, as: Tag = "li" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        className: "flex items-center gap-3 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex size-11 shrink-0 items-center justify-center rounded-xl", row.tone === "pending" ? "bg-[#fef9e7]" : row.tone === "credit" ? "bg-[#e0f9f1]" : "bg-[#fde9e9]"),
                children: row.tone === "pending" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleAlert$3e$__["CircleAlert"], {
                    className: "size-6 text-[#e6bb1d]"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this) : row.tone === "credit" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$import$2d$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                    lineNumber: 187,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$export$2d$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "line-clamp-2 text-base",
                        children: row.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground",
                        children: row.time
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/widgets.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            row.amount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("shrink-0 text-base", row.tone === "credit" ? "text-[#00c281]" : "text-[#d01d1d]"),
                children: row.amount
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/widgets.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
_c2 = ActivityItem;
function EmptyState({ title, subtitle }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-1 py-10 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base text-muted-foreground",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 209,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/widgets.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_c3 = EmptyState;
function RecentActivityList() {
    _s1();
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "my-recent-activities"
        ],
        queryFn: {
            "RecentActivityList.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])({
                    endpoint: "users/my-recent-activities",
                    pQuery: {
                        PageSize: 20,
                        Type: "None",
                        PageNumber: 1
                    }
                })
        }["RecentActivityList.useQuery"]
    });
    const activities = data?.data ?? [];
    const sections = groupByDay(activities, (a)=>a.createdAt).map((s)=>({
            title: s.title,
            rows: s.rows.map((item)=>{
                const isCredit = item.type === 1 || item.type === 4;
                return {
                    id: item.id,
                    title: item.title || (isCredit ? "Contribution" : "Withdrawal"),
                    time: timeLabel(item.createdAt),
                    amount: item.type === 3 ? undefined : `${isCredit ? "+" : "-"} ₦${parseFloat(item.data || "0").toFixed(2)}`,
                    tone: item.type === 3 ? "pending" : isCredit ? "credit" : "debit"
                };
            })
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-3xl bg-white px-4 pt-4 pb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-medium",
                children: "Recent Activity"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineLoader"], {
                message: "Recent Activity Loading..."
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 239,
                columnNumber: 9
            }, this) : activities.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                title: "No recent activity"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/widgets.tsx",
                lineNumber: 241,
                columnNumber: 9
            }, this) : sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: section.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/widgets.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            children: section.rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivityItem, {
                                    row: row
                                }, row.id, false, {
                                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                                    lineNumber: 248,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/widgets.tsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, this)
                    ]
                }, section.title, true, {
                    fileName: "[project]/src/components/dashboard/widgets.tsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/widgets.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_s1(RecentActivityList, "0VB955moqGTEiUXXbAcRWgIKjHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c4 = RecentActivityList;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "EligibilityTracker");
__turbopack_context__.k.register(_c1, "EquityTopUpCard");
__turbopack_context__.k.register(_c2, "ActivityItem");
__turbopack_context__.k.register(_c3, "EmptyState");
__turbopack_context__.k.register(_c4, "RecentActivityList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/feedback/loader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineLoader",
    ()=>InlineLoader,
    "Loader",
    ()=>Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brand$2f$logo$2d$mark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/brand/logo-mark.tsx [app-client] (ecmascript)");
;
;
function Loader({ message = "Loading..." }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-live": "polite",
        className: "fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-background/85 backdrop-blur-[2px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brand$2f$logo$2d$mark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogoMark"], {
                color: "var(--brand)",
                dotColor: "#f4ce14",
                spin: true,
                className: "h-[100px] w-auto"
            }, void 0, false, {
                fileName: "[project]/src/components/feedback/loader.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base text-muted-foreground",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/feedback/loader.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feedback/loader.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Loader;
function InlineLoader({ message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        className: "flex flex-col items-center justify-center gap-3 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$brand$2f$logo$2d$mark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogoMark"], {
                color: "var(--brand)",
                dotColor: "#f4ce14",
                spin: true,
                className: "h-12 w-auto"
            }, void 0, false, {
                fileName: "[project]/src/components/feedback/loader.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/feedback/loader.tsx",
                lineNumber: 22,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/feedback/loader.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = InlineLoader;
var _c, _c1;
__turbopack_context__.k.register(_c, "Loader");
__turbopack_context__.k.register(_c1, "InlineLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/export-icons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const SvgComponent = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                stroke: "#C60808",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                strokeWidth: 1.5,
                d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/export-icons.tsx",
                lineNumber: 10,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                stroke: "#C60808",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
                d: "m13 11 8.2-8.2M22 6.83V2h-4.83"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/export-icons.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/icons/export-icons.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = SvgComponent;
const __TURBOPACK__default__export__ = SvgComponent;
var _c;
__turbopack_context__.k.register(_c, "SvgComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/import-icons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ImportIcons = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        fill: "none",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                stroke: "#00A86B",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                strokeWidth: 1.5,
                d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/import-icons.tsx",
                lineNumber: 10,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                stroke: "#00A86B",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
                d: "m22 2-8.2 8.2M13 6.17V11h4.83"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/import-icons.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/icons/import-icons.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = ImportIcons;
const __TURBOPACK__default__export__ = ImportIcons;
var _c;
__turbopack_context__.k.register(_c, "ImportIcons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/loan-progress-bronze.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoanProgressBronze = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 14,
        height: 14,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "#D2BC82",
            d: "m7 10.077-2.421 1.458a.529.529 0 0 1-.336.088.564.564 0 0 1-.306-.117.7.7 0 0 1-.204-.255.51.51 0 0 1-.03-.343l.643-2.756L2.202 6.3a.557.557 0 0 1-.16-.627.622.622 0 0 1 .174-.263.603.603 0 0 1 .321-.13l2.83-.249L6.46 2.435a.523.523 0 0 1 .226-.262A.625.625 0 0 1 7 2.085c.106 0 .21.03.313.088a.523.523 0 0 1 .226.262l1.094 2.596 2.83.248c.135.02.242.063.32.131a.625.625 0 0 1 .197.591.553.553 0 0 1-.182.299L9.654 8.152l.642 2.756a.51.51 0 0 1-.03.343.694.694 0 0 1-.204.255.57.57 0 0 1-.306.117.524.524 0 0 1-.335-.088L7 10.077Z"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/loan-progress-bronze.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/loan-progress-bronze.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = LoanProgressBronze;
const __TURBOPACK__default__export__ = LoanProgressBronze;
var _c;
__turbopack_context__.k.register(_c, "LoanProgressBronze");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/loan-progress-gold.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoanProgressGold = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 10,
        height: 10,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "gold",
            d: "M4.994 7.992 2.573 9.45a.53.53 0 0 1-.335.088.564.564 0 0 1-.307-.117.7.7 0 0 1-.204-.255.51.51 0 0 1-.029-.343l.642-2.756L.196 4.215a.557.557 0 0 1-.16-.627.623.623 0 0 1 .175-.263.603.603 0 0 1 .32-.131l2.83-.248L4.454.35a.523.523 0 0 1 .227-.263A.625.625 0 0 1 4.994 0c.106 0 .21.03.313.087a.523.523 0 0 1 .226.263l1.094 2.596 2.83.248c.135.02.242.063.32.131a.625.625 0 0 1 .197.59.553.553 0 0 1-.182.3L7.648 6.067l.642 2.756a.51.51 0 0 1-.03.343.694.694 0 0 1-.204.255.57.57 0 0 1-.306.117.525.525 0 0 1-.335-.088L4.994 7.992Z"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/loan-progress-gold.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/loan-progress-gold.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = LoanProgressGold;
const __TURBOPACK__default__export__ = LoanProgressGold;
var _c;
__turbopack_context__.k.register(_c, "LoanProgressGold");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/loan-progress-platinum.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoanProgressPlatinum = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 10,
        height: 10,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "#E5E4E2",
            d: "M4.994 7.992 2.573 9.45a.53.53 0 0 1-.335.088.564.564 0 0 1-.307-.117.7.7 0 0 1-.204-.255.51.51 0 0 1-.029-.343l.642-2.756L.196 4.215a.557.557 0 0 1-.16-.627.623.623 0 0 1 .175-.263.603.603 0 0 1 .32-.131l2.83-.248L4.454.35a.523.523 0 0 1 .227-.263A.625.625 0 0 1 4.994 0c.106 0 .21.03.313.087a.523.523 0 0 1 .226.263l1.094 2.596 2.83.248c.135.02.242.063.32.131a.625.625 0 0 1 .197.59.553.553 0 0 1-.182.3L7.648 6.067l.642 2.756a.51.51 0 0 1-.03.343.694.694 0 0 1-.204.255.57.57 0 0 1-.306.117.525.525 0 0 1-.335-.088L4.994 7.992Z"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/loan-progress-platinum.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/loan-progress-platinum.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = LoanProgressPlatinum;
const __TURBOPACK__default__export__ = LoanProgressPlatinum;
var _c;
__turbopack_context__.k.register(_c, "LoanProgressPlatinum");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/loan-progress-silver.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoanProgressSilver = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 14,
        height: 14,
        fill: "none",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "#C2DFFF",
            d: "m7 10.077-2.421 1.458a.529.529 0 0 1-.336.088.564.564 0 0 1-.306-.117.7.7 0 0 1-.204-.255.51.51 0 0 1-.03-.343l.643-2.756L2.202 6.3a.557.557 0 0 1-.16-.627.622.622 0 0 1 .174-.263.603.603 0 0 1 .321-.13l2.83-.249L6.46 2.435a.523.523 0 0 1 .226-.262A.625.625 0 0 1 7 2.085c.106 0 .21.03.313.088a.523.523 0 0 1 .226.262l1.094 2.596 2.83.248c.135.02.242.063.32.131a.625.625 0 0 1 .197.591.553.553 0 0 1-.182.299L9.654 8.152l.642 2.756a.51.51 0 0 1-.03.343.694.694 0 0 1-.204.255.57.57 0 0 1-.306.117.524.524 0 0 1-.335-.088L7 10.077Z"
        }, void 0, false, {
            fileName: "[project]/src/components/icons/loan-progress-silver.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/icons/loan-progress-silver.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = LoanProgressSilver;
const __TURBOPACK__default__export__ = LoanProgressSilver;
var _c;
__turbopack_context__.k.register(_c, "LoanProgressSilver");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui/react/button/Button.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/cn/dist/index.js [app-client] (ecmascript) <locals>");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline",
            danger: "bg-destructive text-white hover:bg-destructive/90",
            "danger-outline": "border-destructive bg-transparent text-destructive hover:bg-danger-soft",
            white: "bg-white text-foreground hover:bg-white/90"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            cta: "h-14 w-full gap-2 rounded-full px-6 text-base font-normal",
            pill: "h-10 gap-1.5 rounded-full px-6 text-base font-normal",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$button$2f$Button$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cn$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-infinite-scroll.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteScroll",
    ()=>useInfiniteScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useInfiniteScroll(onReachEnd, enabled) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInfiniteScroll.useEffect": ()=>{
            const el = ref.current;
            if (!el || !enabled) return;
            const observer = new IntersectionObserver({
                "useInfiniteScroll.useEffect": (entries)=>entries[0]?.isIntersecting && onReachEnd()
            }["useInfiniteScroll.useEffect"], {
                rootMargin: "200px"
            });
            observer.observe(el);
            return ({
                "useInfiniteScroll.useEffect": ()=>observer.disconnect()
            })["useInfiniteScroll.useEffect"];
        }
    }["useInfiniteScroll.useEffect"], [
        onReachEnd,
        enabled
    ]);
    return ref;
}
_s(useInfiniteScroll, "8uVE59eA/r6b92xF80p7sH8rXLk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Browser-side API helper. Same options as the mobile app's `handleFetch`, so screen logic ports 1:1.
// Requests go to our own `/api/backend/*` proxy, which attaches the session token.
__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api,
    "isOk",
    ()=>isOk,
    "logout",
    ()=>logout,
    "updateSession",
    ()=>updateSession
]);
class ApiError extends Error {
    status;
    data;
    constructor(message, status, data){
        super(message), this.status = status, this.data = data;
    }
}
async function api({ endpoint = "", extra = "", method = "GET", body, pQuery, param = "", multipart = false, returnErrorData = false, responseType = "json" } = {}) {
    let path = endpoint.replace(/^\/+/, "");
    if (extra) path += `/${extra}`;
    if (param) path += `/${param}`;
    const query = new URLSearchParams();
    for (const [key, val] of Object.entries(pQuery ?? {})){
        if (val !== undefined && val !== null) query.append(key, String(val));
    }
    const url = `/api/backend/${path}${query.size ? `?${query}` : ""}`;
    const init = {
        method,
        credentials: "same-origin"
    };
    if (body !== undefined && method !== "GET" && method !== "HEAD") {
        if (multipart) {
            // The mobile app relied on axios turning plain objects into form data; do that explicitly.
            init.body = body instanceof FormData ? body : toFormData(body);
        } else {
            init.headers = {
                "Content-Type": "application/json"
            };
            init.body = JSON.stringify(body);
        }
    }
    const res = await fetch(url, init);
    if (responseType === "blob" && res.ok) {
        return {
            data: await res.blob(),
            status: res.status,
            method
        };
    }
    const json = await res.json().catch(()=>({}));
    if (res.ok) return {
        ...json,
        status: res.status,
        method
    };
    if (returnErrorData) return {
        ...json,
        status: res.status,
        method
    };
    if (res.status === 401 || res.status === 403) onUnauthorized();
    throw new ApiError(errorMessage(res, json), res.status, json);
}
function toFormData(values) {
    const form = new FormData();
    for (const [key, value] of Object.entries(values)){
        if (value === undefined || value === null) continue;
        form.append(key, value instanceof Blob ? value : String(value));
    }
    return form;
}
/** Mirrors utils/errorHandler.js from the mobile app. */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorMessage(res, data) {
    if (data?.code === "ERR_NETWORK") return data.message;
    if (res.status === 401 || res.status === 403) {
        return data?.detail || data?.title || data?.message || "You are either not authorized to access this resource or your session has expired. Please login again.";
    }
    if (res.status === 422) return data?.errors?.[""]?.[0] || "Validation failed.";
    if (Array.isArray(data?.errors)) return data.errors.join(", ");
    if (Array.isArray(data?.Errors)) return data.Errors.join(", ");
    return data?.detail || data?.error?.message || data?.message || res.statusText || "Something went wrong. Please, try again.";
}
let redirecting = false;
function onUnauthorized() {
    if (redirecting || ("TURBOPACK compile-time value", "object") === "undefined") return;
    // Only bounce signed-in areas; auth screens handle their own 401s (e.g. wrong password).
    if (/^\/(sign-in|sign-up|auth)(\/|$)/.test(window.location.pathname)) return;
    redirecting = true;
    // Full navigation on purpose: drops every cached query belonging to the expired session.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign("/sign-in/login");
}
function isOk(res) {
    return res?.statusCode === "200" || res?.status === 200;
}
function updateSession(flags) {
    return fetch("/api/session", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(flags)
    });
}
function logout() {
    return fetch("/api/session", {
        method: "DELETE"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "showToast",
    ()=>showToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
function showToast({ type, text1, text2 }) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"][type](text1, text2 ? {
        description: text2
    } : undefined);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1oso45k._.js.map