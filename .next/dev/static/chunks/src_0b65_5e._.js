(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/sign-up/take-a-selfie-camera/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SelfieCameraPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.mjs [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$onboarding$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/onboarding-draft.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/feedback/loader.tsx [app-client] (ecmascript)");
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
function SelfieCameraPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [draft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$onboarding$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOnboardingDraft"])();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [facing, setFacing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("user");
    const [cameraError, setCameraError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [photo, setPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const stopCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SelfieCameraPage.useCallback[stopCamera]": ()=>{
            streamRef.current?.getTracks().forEach({
                "SelfieCameraPage.useCallback[stopCamera]": (t)=>t.stop()
            }["SelfieCameraPage.useCallback[stopCamera]"]);
            streamRef.current = null;
        }
    }["SelfieCameraPage.useCallback[stopCamera]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfieCameraPage.useEffect": ()=>{
            if (photo) return;
            let cancelled = false;
            ({
                "SelfieCameraPage.useEffect": async ()=>{
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: facing,
                                width: {
                                    ideal: 1080
                                },
                                height: {
                                    ideal: 1440
                                }
                            },
                            audio: false
                        });
                        if (cancelled) return stream.getTracks().forEach({
                            "SelfieCameraPage.useEffect": (t)=>t.stop()
                        }["SelfieCameraPage.useEffect"]);
                        streamRef.current = stream;
                        if (videoRef.current) videoRef.current.srcObject = stream;
                        setCameraError(null);
                    } catch  {
                        setCameraError("Camera permission is required.");
                    }
                }
            })["SelfieCameraPage.useEffect"]();
            return ({
                "SelfieCameraPage.useEffect": ()=>{
                    cancelled = true;
                    stopCamera();
                }
            })["SelfieCameraPage.useEffect"];
        }
    }["SelfieCameraPage.useEffect"], [
        facing,
        photo,
        stopCamera
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfieCameraPage.useEffect": ()=>({
                "SelfieCameraPage.useEffect": ()=>{
                    if (photo) URL.revokeObjectURL(photo.url);
                }
            })["SelfieCameraPage.useEffect"]
    }["SelfieCameraPage.useEffect"], [
        photo
    ]);
    function takePhoto() {
        const video = videoRef.current;
        if (!video || !video.videoWidth) return;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        if (facing === "user") {
            // Store the selfie as the user saw it (mirrored preview).
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob)=>blob && setPhoto({
                blob,
                url: URL.createObjectURL(blob)
            }), "image/jpeg", 0.92);
    }
    const verify = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "SelfieCameraPage.useMutation[verify]": (form)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])({
                    endpoint: "accounts/verify-bvn-selfie",
                    method: "POST",
                    body: form,
                    multipart: true
                })
        }["SelfieCameraPage.useMutation[verify]"],
        onSuccess: {
            "SelfieCameraPage.useMutation[verify]": (res)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOk"])(res)) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])({
                        type: "error",
                        text1: "Verification Failed",
                        text2: res?.message || "BVN selfie verification failed"
                    });
                    return;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])({
                    type: "success",
                    text1: "Verification Successful"
                });
                stopCamera();
                router.replace("/sign-up/select-scheme");
            }
        }["SelfieCameraPage.useMutation[verify]"],
        onError: {
            "SelfieCameraPage.useMutation[verify]": (error)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])({
                    type: "error",
                    text1: "Error",
                    text2: error.message || "Failed to verify BVN selfie"
                })
        }["SelfieCameraPage.useMutation[verify]"]
    });
    function handleProceed(blob) {
        const form = new FormData();
        form.append("bvn", draft.bvn ?? "");
        form.append("selfie", blob, `selfie_${Date.now()}.jpg`);
        verify.mutate(form);
    }
    if (photo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex min-h-dvh flex-1 flex-col bg-black",
            children: [
                verify.isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$feedback$2f$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"], {
                    message: "Verifying BVN and selfie..."
                }, void 0, false, {
                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                    lineNumber: 104,
                    columnNumber: 30
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: photo.url,
                    alt: "Your selfie",
                    className: "absolute inset-0 size-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mt-auto flex gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pt-16 pb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "cta",
                            variant: "white",
                            className: "flex-1",
                            onClick: ()=>setPhoto(null),
                            children: "Retake"
                        }, void 0, false, {
                            fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "cta",
                            className: "flex-1 bg-brand hover:bg-brand/90",
                            onClick: ()=>handleProceed(photo.blob),
                            children: "Proceed"
                        }, void 0, false, {
                            fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex min-h-dvh flex-1 flex-col overflow-hidden bg-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                autoPlay: true,
                playsInline: true,
                muted: true,
                className: `absolute inset-0 size-full object-cover ${facing === "user" ? "-scale-x-100" : ""}`
            }, void 0, false, {
                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 flex items-start justify-center pt-[14%]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "aspect-[3/4] w-[80%] rounded-[50%] border-2 border-dashed border-white/90 shadow-[0_0_0_9999px_rgba(0,0,0,0.25)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>router.replace("/sign-up/confirm-bvn"),
                "aria-label": "Back",
                className: "absolute top-12 left-4 flex size-11 items-center justify-center rounded-full bg-black/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                    className: "size-6"
                }, void 0, false, {
                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-auto flex flex-col items-center gap-8 pb-10",
                children: [
                    cameraError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-4 flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    cameraError,
                                    " Allow camera access in your browser, or upload a photo instead."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "cursor-pointer text-base font-medium text-brand",
                                children: [
                                    "Upload a photo",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        capture: "user",
                                        className: "sr-only",
                                        onChange: (e)=>{
                                            const file = e.target.files?.[0];
                                            if (file) setPhoto({
                                                blob: file,
                                                url: URL.createObjectURL(file)
                                            });
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-full bg-white px-5 py-2.5 text-base text-foreground",
                        children: "Align your face in the oval above"
                    }, void 0, false, {
                        fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "size-12"
                            }, void 0, false, {
                                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: takePhoto,
                                disabled: !!cameraError,
                                "aria-label": "Take photo",
                                className: "flex size-20 items-center justify-center rounded-full border-4 border-white/80 disabled:opacity-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex size-16 items-center justify-center rounded-full bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                        className: "size-7 text-brand"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setFacing((f)=>f === "user" ? "environment" : "user"),
                                "aria-label": "Switch camera",
                                className: "flex size-12 items-center justify-center rounded-full bg-black/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "size-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/sign-up/take-a-selfie-camera/page.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_s(SelfieCameraPage, "FAR95BNB1IqrixybWqAal1fvUTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$onboarding$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOnboardingDraft"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = SelfieCameraPage;
var _c;
__turbopack_context__.k.register(_c, "SelfieCameraPage");
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
"[project]/src/lib/onboarding-draft.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearDraft",
    ()=>clearDraft,
    "updateDraft",
    ()=>updateDraft,
    "useOnboardingDraft",
    ()=>useOnboardingDraft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const KEY = "cfm_onboarding_draft";
const listeners = new Set();
let cache = null;
function read() {
    if (cache) return cache;
    try {
        cache = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
    } catch  {
        cache = {};
    }
    return cache;
}
function updateDraft(patch) {
    cache = {
        ...read(),
        ...patch
    };
    try {
        sessionStorage.setItem(KEY, JSON.stringify(cache));
    } catch  {
    // Storage unavailable (private mode); keep the in-memory copy.
    }
    listeners.forEach((l)=>l());
}
function clearDraft() {
    cache = {};
    try {
        sessionStorage.removeItem(KEY);
    } catch  {}
    listeners.forEach((l)=>l());
}
const EMPTY = {};
function useOnboardingDraft() {
    _s();
    const draft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])({
        "useOnboardingDraft.useSyncExternalStore[draft]": (l)=>{
            listeners.add(l);
            return ({
                "useOnboardingDraft.useSyncExternalStore[draft]": ()=>listeners.delete(l)
            })["useOnboardingDraft.useSyncExternalStore[draft]"];
        }
    }["useOnboardingDraft.useSyncExternalStore[draft]"], read, {
        "useOnboardingDraft.useSyncExternalStore[draft]": ()=>EMPTY
    }["useOnboardingDraft.useSyncExternalStore[draft]"]);
    const update = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useOnboardingDraft.useCallback[update]": (patch)=>updateDraft(patch)
    }["useOnboardingDraft.useCallback[update]"], []);
    return [
        draft,
        update
    ];
}
_s(useOnboardingDraft, "wpG8TULNgYcw0HdKku/aSkyud74=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
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
"[project]/src/lib/utils.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0b65_5e._.js.map