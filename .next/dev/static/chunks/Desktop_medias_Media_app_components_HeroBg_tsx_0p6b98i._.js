(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/medias/Media/app/components/HeroBg.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroBg
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/medias/Media/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/medias/Media/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const OVERLAY = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
    style: {
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        background: "linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.15) 45%,rgba(0,0,0,0.82) 100%)"
    }
}, void 0, false, {
    fileName: "[project]/Desktop/medias/Media/app/components/HeroBg.tsx",
    lineNumber: 10,
    columnNumber: 3
}, ("TURBOPACK compile-time value", void 0));
function HeroBg({ type, value }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroBg.useEffect": ()=>{
            setMounted(true);
        }
    }["HeroBg.useEffect"], []);
    if (!mounted || !value) return null;
    /* ── Image ── */ if (type === "image") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            inset: 0,
            zIndex: 1,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: value,
                alt: "",
                style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/medias/Media/app/components/HeroBg.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            OVERLAY
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/medias/Media/app/components/HeroBg.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
    /* ── YouTube video ─────────────────────────────────────────────────
     Key trick: wrap in a box bigger than viewport so it always fills
     the screen regardless of aspect ratio, on any device.
  ─────────────────────────────────────────────────────────────────── */ const src = [
        `https://www.youtube-nocookie.com/embed/${value}`,
        "?autoplay=1&mute=1&loop=1",
        `&playlist=${value}`,
        "&controls=0&disablekb=1&fs=0",
        "&iv_load_policy=3&modestbranding=1",
        "&playsinline=1&rel=0&showinfo=0"
    ].join("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            inset: 0,
            zIndex: 1,
            overflow: "hidden",
            background: "#000"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    /* always bigger than viewport — covers any screen / aspect ratio */ top: "50%",
                    left: "50%",
                    width: "max(100vw, 177.8vh)",
                    height: "max(100vh, 56.3vw)",
                    transform: "translate(-50%,-50%)",
                    pointerEvents: "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                    src: src,
                    allow: "autoplay; encrypted-media",
                    allowFullScreen: true,
                    style: {
                        width: "100%",
                        height: "100%",
                        border: "none",
                        display: "block"
                    },
                    title: "hero-bg"
                }, void 0, false, {
                    fileName: "[project]/Desktop/medias/Media/app/components/HeroBg.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/medias/Media/app/components/HeroBg.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            OVERLAY
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/medias/Media/app/components/HeroBg.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(HeroBg, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = HeroBg;
var _c;
__turbopack_context__.k.register(_c, "HeroBg");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/medias/Media/app/components/HeroBg.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/medias/Media/app/components/HeroBg.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Desktop_medias_Media_app_components_HeroBg_tsx_0p6b98i._.js.map