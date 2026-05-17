"use client";
import { useEffect, useRef } from "react";

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let animId: number;
    let cleanupFn: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
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
      for (let i = 0; i < N; i++) {
        pos[i*3]   = (Math.random()-0.5)*30;
        pos[i*3+1] = (Math.random()-0.5)*30;
        pos[i*3+2] = (Math.random()-0.5)*20;
        const isRed = Math.random() > 0.7;
        col[i*3]   = isRed ? 0.91 : 1;
        col[i*3+1] = isRed ? 0.09 : 1;
        col[i*3+2] = isRed ? 0.14 : 1;
        if (!isRed) {
          // white but very dim
          col[i*3]   = 1; col[i*3+1] = 1; col[i*3+2] = 1;
        }
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.6 });
      const points = new THREE.Points(geo, pMat);
      scene.add(points);

      // ── WIREFRAME SHAPES ──
      type ShapeObj = { mesh: InstanceType<typeof THREE.Mesh>; vx: number; vy: number; vr: number };
      const shapes: ShapeObj[] = [];
      const geoList = [
        new THREE.IcosahedronGeometry(0.5, 0),
        new THREE.OctahedronGeometry(0.4, 0),
        new THREE.TetrahedronGeometry(0.45, 0),
        new THREE.IcosahedronGeometry(0.25, 0),
        new THREE.OctahedronGeometry(0.3, 0),
      ];
      for (let i = 0; i < 10; i++) {
        const g = geoList[i % geoList.length];
        const isRed = i % 3 === 0;
        const m = new THREE.MeshBasicMaterial({
          color: isRed ? 0xe8173a : 0xffffff,
          wireframe: true, transparent: true,
          opacity: isRed ? 0.12 : 0.05,
        });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set(
          (Math.random()-0.5)*18,
          (Math.random()-0.5)*12,
          (Math.random()-0.5)*8 - 3
        );
        scene.add(mesh);
        shapes.push({
          mesh,
          vx: (Math.random()-0.5)*0.003,
          vy: (Math.random()-0.5)*0.002,
          vr: Math.random()*0.006+0.001
        });
      }

      // ── HORIZONTAL LINES (grid feel) ──
      for (let i = 0; i < 5; i++) {
        const lGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-20, i*2-4, -5),
          new THREE.Vector3( 20, i*2-4, -5),
        ]);
        const lMat = new THREE.LineBasicMaterial({ color: 0xe8173a, transparent: true, opacity: 0.04 });
        scene.add(new THREE.Line(lGeo, lMat));
      }

      let mx = 0, my = 0;
      const onMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 0.8;
        my = -(e.clientY / window.innerHeight - 0.5) * 0.8;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        points.rotation.y += 0.0002;
        points.rotation.x += 0.00008;
        camera.position.x += (mx - camera.position.x) * 0.03;
        camera.position.y += (my - camera.position.y) * 0.03;
        shapes.forEach(s => {
          s.mesh.rotation.x += s.vr;
          s.mesh.rotation.y += s.vr * 0.6;
          s.mesh.position.x += s.vx;
          s.mesh.position.y += s.vy;
          if (Math.abs(s.mesh.position.x) > 10) s.vx *= -1;
          if (Math.abs(s.mesh.position.y) > 7)  s.vy *= -1;
        });
        renderer.render(scene, camera);
      };
      animate();

      cleanupFn = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    })();

    return () => { cleanupFn?.(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }}
    />
  );
}
