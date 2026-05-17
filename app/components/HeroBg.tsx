"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  type: "video" | "image";
  ytId: string;
  imgUrl: string;
}

export default function HeroBg({ type, ytId, imgUrl }: Props) {
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const overlay = (
    <div style={{
      position: "absolute", inset: 0, zIndex: 1,
      background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.75) 100%)"
    }} />
  );

  if (type === "image" && imgUrl) {
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <img src={imgUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        {overlay}
      </div>
    );
  }

  // YouTube video background — nocookie domain, proper params
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", background: "#000" }}>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&showinfo=0&enablejsapi=0&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%) scale(1.1)",
          width: "177.78vh",
          height: "100vh",
          minWidth: "100vw",
          minHeight: "56.25vw",
          border: "none",
          pointerEvents: "none",
          opacity: 0.85,
        }}
      />
      {overlay}
    </div>
  );
}
