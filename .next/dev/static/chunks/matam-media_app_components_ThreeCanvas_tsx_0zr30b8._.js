(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/matam-media/app/components/ThreeCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreeCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$matam$2d$media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/matam-media/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$matam$2d$media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/matam-media/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ThreeCanvas() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$matam$2d$media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$matam$2d$media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreeCanvas.useEffect": ()=>{
            if (!canvasRef.current) return;
            let animId;
            let cleanupFn;
            ({
                "ThreeCanvas.useEffect": async ()=>{
                    const THREE = await __turbopack_context__.A("[project]/matam-media/node_modules/three/build/three.module.js [app-client] (ecmascript, async loader)");
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const renderer = new THREE.WebGLRenderer({
                        canvas,
                        alpha: true,
                        antialias: true
                    });
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.z = 6;
                    // ── PARTICLES ──
                    const N = 3000;
                    const geo = new THREE.BufferGeometry();
                    const pos = new Float32Array(N * 3);
                    const col = new Float32Array(N * 3);
                    for(let i = 0; i < N; i++){
                        pos[i * 3] = (Math.random() - 0.5) * 30;
                        pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
                        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
                        const isRed = Math.random() > 0.7;
                        col[i * 3] = isRed ? 0.91 : 1;
                        col[i * 3 + 1] = isRed ? 0.09 : 1;
                        col[i * 3 + 2] = isRed ? 0.14 : 1;
                        if (!isRed) {
                            // white but very dim
                            col[i * 3] = 1;
                            col[i * 3 + 1] = 1;
                            col[i * 3 + 2] = 1;
                        }
                    }
                    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
                    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
                    const pMat = new THREE.PointsMaterial({
                        size: 0.025,
                        vertexColors: true,
                        transparent: true,
                        opacity: 0.6
                    });
                    const points = new THREE.Points(geo, pMat);
                    scene.add(points);
                    const shapes = [];
                    const geoList = [
                        new THREE.IcosahedronGeometry(0.5, 0),
                        new THREE.OctahedronGeometry(0.4, 0),
                        new THREE.TetrahedronGeometry(0.45, 0),
                        new THREE.IcosahedronGeometry(0.25, 0),
                        new THREE.OctahedronGeometry(0.3, 0)
                    ];
                    for(let i = 0; i < 10; i++){
                        const g = geoList[i % geoList.length];
                        const isRed = i % 3 === 0;
                        const m = new THREE.MeshBasicMaterial({
                            color: isRed ? 0xe8173a : 0xffffff,
                            wireframe: true,
                            transparent: true,
                            opacity: isRed ? 0.12 : 0.05
                        });
                        const mesh = new THREE.Mesh(g, m);
                        mesh.position.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 3);
                        scene.add(mesh);
                        shapes.push({
                            mesh,
                            vx: (Math.random() - 0.5) * 0.003,
                            vy: (Math.random() - 0.5) * 0.002,
                            vr: Math.random() * 0.006 + 0.001
                        });
                    }
                    // ── HORIZONTAL LINES (grid feel) ──
                    for(let i = 0; i < 5; i++){
                        const lGeo = new THREE.BufferGeometry().setFromPoints([
                            new THREE.Vector3(-20, i * 2 - 4, -5),
                            new THREE.Vector3(20, i * 2 - 4, -5)
                        ]);
                        const lMat = new THREE.LineBasicMaterial({
                            color: 0xe8173a,
                            transparent: true,
                            opacity: 0.04
                        });
                        scene.add(new THREE.Line(lGeo, lMat));
                    }
                    let mx = 0, my = 0;
                    const onMove = {
                        "ThreeCanvas.useEffect.onMove": (e)=>{
                            mx = (e.clientX / window.innerWidth - 0.5) * 0.8;
                            my = -(e.clientY / window.innerHeight - 0.5) * 0.8;
                        }
                    }["ThreeCanvas.useEffect.onMove"];
                    window.addEventListener("mousemove", onMove);
                    const onResize = {
                        "ThreeCanvas.useEffect.onResize": ()=>{
                            camera.aspect = window.innerWidth / window.innerHeight;
                            camera.updateProjectionMatrix();
                            renderer.setSize(window.innerWidth, window.innerHeight);
                        }
                    }["ThreeCanvas.useEffect.onResize"];
                    window.addEventListener("resize", onResize);
                    const animate = {
                        "ThreeCanvas.useEffect.animate": ()=>{
                            animId = requestAnimationFrame(animate);
                            points.rotation.y += 0.0002;
                            points.rotation.x += 0.00008;
                            camera.position.x += (mx - camera.position.x) * 0.03;
                            camera.position.y += (my - camera.position.y) * 0.03;
                            shapes.forEach({
                                "ThreeCanvas.useEffect.animate": (s)=>{
                                    s.mesh.rotation.x += s.vr;
                                    s.mesh.rotation.y += s.vr * 0.6;
                                    s.mesh.position.x += s.vx;
                                    s.mesh.position.y += s.vy;
                                    if (Math.abs(s.mesh.position.x) > 10) s.vx *= -1;
                                    if (Math.abs(s.mesh.position.y) > 7) s.vy *= -1;
                                }
                            }["ThreeCanvas.useEffect.animate"]);
                            renderer.render(scene, camera);
                        }
                    }["ThreeCanvas.useEffect.animate"];
                    animate();
                    cleanupFn = ({
                        "ThreeCanvas.useEffect": ()=>{
                            window.removeEventListener("mousemove", onMove);
                            window.removeEventListener("resize", onResize);
                            cancelAnimationFrame(animId);
                            renderer.dispose();
                        }
                    })["ThreeCanvas.useEffect"];
                }
            })["ThreeCanvas.useEffect"]();
            return ({
                "ThreeCanvas.useEffect": ()=>{
                    cleanupFn?.();
                }
            })["ThreeCanvas.useEffect"];
        }
    }["ThreeCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$matam$2d$media$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none"
        }
    }, void 0, false, {
        fileName: "[project]/matam-media/app/components/ThreeCanvas.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(ThreeCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ThreeCanvas;
var _c;
__turbopack_context__.k.register(_c, "ThreeCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/matam-media/app/components/ThreeCanvas.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/matam-media/app/components/ThreeCanvas.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=matam-media_app_components_ThreeCanvas_tsx_0zr30b8._.js.map