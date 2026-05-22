(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/medias/Media/app/components/Cursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/medias/Media/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/medias/Media/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Cursor() {
    _s();
    const curRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const folRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cursor.useEffect": ()=>{
            let fx = window.innerWidth / 2, fy = window.innerHeight / 2, rafId;
            const onMove = {
                "Cursor.useEffect.onMove": (e)=>{
                    if (curRef.current) {
                        curRef.current.style.left = e.clientX + "px";
                        curRef.current.style.top = e.clientY + "px";
                    }
                    fx += (e.clientX - fx) * 0.14;
                    fy += (e.clientY - fy) * 0.14;
                }
            }["Cursor.useEffect.onMove"];
            const loop = {
                "Cursor.useEffect.loop": ()=>{
                    if (folRef.current) {
                        folRef.current.style.left = fx + "px";
                        folRef.current.style.top = fy + "px";
                    }
                    rafId = requestAnimationFrame(loop);
                }
            }["Cursor.useEffect.loop"];
            window.addEventListener("mousemove", onMove);
            loop();
            const addHover = {
                "Cursor.useEffect.addHover": ()=>{
                    document.querySelectorAll("a,button,[data-hover]").forEach({
                        "Cursor.useEffect.addHover": (el)=>{
                            el.addEventListener("mouseenter", {
                                "Cursor.useEffect.addHover": ()=>{
                                    curRef.current?.classList.add("cursor-hover");
                                    folRef.current?.classList.add("follower-hover");
                                }
                            }["Cursor.useEffect.addHover"]);
                            el.addEventListener("mouseleave", {
                                "Cursor.useEffect.addHover": ()=>{
                                    curRef.current?.classList.remove("cursor-hover");
                                    folRef.current?.classList.remove("follower-hover");
                                }
                            }["Cursor.useEffect.addHover"]);
                        }
                    }["Cursor.useEffect.addHover"]);
                }
            }["Cursor.useEffect.addHover"];
            addHover();
            const obs = new MutationObserver(addHover);
            obs.observe(document.body, {
                childList: true,
                subtree: true
            });
            return ({
                "Cursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", onMove);
                    cancelAnimationFrame(rafId);
                    obs.disconnect();
                }
            })["Cursor.useEffect"];
        }
    }["Cursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: curRef,
                className: "cursor"
            }, void 0, false, {
                fileName: "[project]/Desktop/medias/Media/app/components/Cursor.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$medias$2f$Media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: folRef,
                className: "cursor-follower"
            }, void 0, false, {
                fileName: "[project]/Desktop/medias/Media/app/components/Cursor.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Cursor, "qqEv1yZyR+lQHFxBLmqJGhtWitc=");
_c = Cursor;
var _c;
__turbopack_context__.k.register(_c, "Cursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/medias/Media/app/components/Cursor.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/medias/Media/app/components/Cursor.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Desktop_medias_Media_app_components_Cursor_tsx_0a1sqrp._.js.map