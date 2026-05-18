"use client";
import { useEffect, useState } from "react";

const LINKS = [
  ["noha-khan", "Artists"],
  ["videos",    "Videos"],
  ["manqabat",  "Manqabat"],
  ["majlis",    "Majlis"],
  ["contact",   "Contact"],
];

export default function Navbar({ onAdmin }: { onAdmin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer" }} data-hover>
          Nohay<span>.</span>Manqabat
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {LINKS.map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => go(id)} data-hover>{label}</button>
          ))}
          <button className="nav-btn" onClick={onAdmin} data-hover>Admin</button>
        </div>

        {/* Mobile hamburger */}
        <button className="mob-menu-btn" onClick={() => setOpen(true)} data-hover aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6"  x2="21" y2="6"  />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      <div className={`mob-drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />

      {/* Drawer */}
      <div className={`mob-drawer ${open ? "open" : ""}`}>
        {/* Close btn */}
        <button onClick={() => setOpen(false)}
          style={{ alignSelf: "flex-end", background: "none", border: "1px solid var(--border)", color: "var(--text2)", width: "34px", height: "34px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Logo in drawer */}
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "2rem", color: "#fff" }}>
          Nohay<span style={{ color: "var(--accent)" }}>.</span>Manqabat
        </div>

        {LINKS.map(([id, label]) => (
          <button key={id} className="mob-drawer-link" onClick={() => go(id)}>{label}</button>
        ))}
        <button className="mob-drawer-admin" onClick={() => { setOpen(false); onAdmin(); }}>
          Studio
        </button>
      </div>
    </>
  );
}
