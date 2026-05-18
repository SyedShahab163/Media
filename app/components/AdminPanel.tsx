"use client";
import { useState, useRef } from "react";

const PASS = "nohay2026";
const CATS = [
  { id: "Nohay", name: "Nohay"  },
  { id: "manqabat",      name: "Manqabat"      },
  { id: "majlis",        name: "Majlis"         },
  {id:"marsiya", name:"Marsiya" },
  {id:"naat", name:"Naat" },
];
const NOHa = [
  
  { id: "nadeem-sarwar", name: "Nadeem Sarwar" },
  { id: "Farhan ali waris", name: "Farhan ali waris" },
  { id: "Mir hasan Mir", name: "Mir Hasan Mir" },
  { id: "Shadman Raza ", name: "Shadman Raza " },
  { id: "nadeem-sarwar", name: "Nadeem Sarwar" },
  { id: "Shahid Baltistani", name: "Shahid Baltistani" },
  { id: "Irfan Haider", name: "Irfan Haider" },
  { id: "Raza Abbas", name: "Raza Abbas" },
  { id: "ALi Jee", name: "Ali Jee" },
];
const KARBALA_VIDEOS = [
  { id: "JYaOHMrQmKE", label: "Karbala Aerial View"       },
  { id: "JYaOHMrQmKE", label: "Imam Hussain Shrine 4K"    },
  { id: "FKkJCTbUPcM", label: "Muharram Atmosphere"       },
  { id: "C0DPdy98e4c", label: "Karbala Night Illuminated" },
  { id: "nBuAuQOThFI", label: "Shrine of Imam Hussain"    },
  { id: "T8pGAKHrfMo", label: "Karbala Documentary"       },
];

const KARBALA_IMAGES = [
  { url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=80", label: "Desert Sunset" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Imam_Hussein_Shrine.jpg/1280px-Imam_Hussein_Shrine.jpg", label: "Imam Hussain Shrine" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Karbala_overall.jpg/1280px-Karbala_overall.jpg", label: "Karbala City" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Abbas_Shrine_in_Karbala.jpg/1280px-Abbas_Shrine_in_Karbala.jpg", label: "Abbas Shrine" },
];

type Video = { id: string; title: string; youtubeId: string; category: string; artist: string; year: number; description?: string };
type Tab = "dash" | "videos" | "add" | "hero" | "settings";

export default function AdminPanel({ onClose, videos, onAdd, onDelete, onSaveHero, heroYt, heroImg, heroBg }: {
  onClose: () => void;
  videos: Video[];
  onAdd: (v: Video) => void;
  onDelete: (id: string) => void;
  onSaveHero: (type: "video" | "image", val: string) => void;
  heroYt: string;
  heroImg: string;
  heroBg: "video" | "image";
}) {
  const [authed, setAuthed]     = useState(false);
  const [pw, setPw]             = useState("");
  const [pwErr, setPwErr]       = useState(false);
  const [tab, setTab]           = useState<Tab>("dash");
  const [search, setSearch]     = useState("");
  const [catF, setCatF]         = useState("all");
  const [toast, setToast]       = useState("");
  const [preview, setPreview]   = useState("");
  const [form, setForm]         = useState({ title: "", youtubeId: "", category: "nadeem-sarwar", artist: "", year: 2025, description: "" });

  // Hero tab state
  const [hType, setHType]       = useState<"video" | "image">(heroBg);
  const [hYtId, setHYtId]       = useState(heroYt);
  const [hImg,  setHImg]        = useState(heroImg);
  const [hSaved, setHSaved]     = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const toast3 = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };
  const extractId = (v: string) => { const m = v.match(/(?:youtu\.be\/|watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/); return m ? m[1] : v.trim(); };
  const login = () => { if (pw === PASS) { setAuthed(true); setPwErr(false); } else setPwErr(true); };

  const handleAdd = () => {
    const ytId = extractId(form.youtubeId);
    if (!form.title.trim() || ytId.length !== 11) { toast3("Title and valid YouTube URL required"); return; }
    onAdd({ ...form, youtubeId: ytId, id: Date.now().toString() });
    setForm({ title: "", youtubeId: "", category: "nadeem-sarwar", artist: "", year: 2025, description: "" });
    setPreview(""); toast3("✓ Video added!"); setTab("videos");
  };

  const handleSaveHero = () => {
    const val = hType === "video" ? hYtId : hImg;
    if (!val) { toast3("Please enter a value first"); return; }
    onSaveHero(hType, val);
    setHSaved(true); toast3("✓ Hero background updated!");
    setTimeout(() => setHSaved(false), 4000);
  };

  // Image file upload → convert to data URL
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setHImg(reader.result as string); };
    reader.readAsDataURL(file);
  };

  const filtered = videos.filter(v => {
    const c = catF === "all" || v.category === catF;
    const s = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.artist.toLowerCase().includes(search.toLowerCase());
    return c && s;
  });

  const TABS: { id: Tab; label: string }[] = [
    { id: "dash",     label: "Dashboard"  },
    { id: "videos",   label: "Videos"     },
    { id: "add",      label: "Add Video"  },
    { id: "hero",     label: "Hero BG"    },
    { id: "settings", label: "Settings"   },
  ];

  const Icon = ({ d }: { d: string }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={d} />
    </svg>
  );

  // ── LOGIN ──
  if (!authed) return (
    <div className="admin-wrap" style={{ alignItems: "center", justifyContent: "center" }}>
      <div className="adm-login-card">
        <div className="adm-login-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
          Admin Panel
        </h2>
        <p style={{ fontSize: "0.75rem", color: "var(--text3)", marginBottom: "2rem" }}>Authorized access only</p>
        <div className="adm-field" style={{ marginBottom: "0.8rem" }}>
          <label>Password</label>
          <input type="password" placeholder="Enter password" value={pw}
            onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
        </div>
        {pwErr && <p style={{ color: "var(--accent)", fontSize: "0.7rem", marginBottom: "0.8rem" }}>Incorrect password</p>}
        <button className="adm-btn" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={login} data-hover>Login</button>
        <button className="adm-btn-ghost" style={{ width: "100%" }} onClick={onClose} data-hover>Go Back</button>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <div className="adm-side">
        <div className="adm-logo">
          <div className="adm-logo-txt">Matam<span>.</span>Media</div>
          <div className="adm-logo-sub">Admin Panel</div>
        </div>
        <nav className="adm-nav">
          {TABS.map(t => (
            <button key={t.id} className={`adm-nav-btn ${tab === t.id ? "act" : ""}`} onClick={() => setTab(t.id)}>
              {t.id === "dash"     && <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />}
              {t.id === "videos"   && <Icon d="M23 7l-7 5 7 5V7zM1 5h15v14H1z" />}
              {t.id === "add"      && <Icon d="M12 5v14M5 12h14" />}
              {t.id === "hero"     && <Icon d="M2 3h20v14H2zM8 21h8M12 17v4" />}
              {t.id === "settings" && <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />}
              {t.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
          <button className="adm-nav-btn" onClick={onClose}>
            <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            Exit to Site
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="adm-main">
        <div className="adm-topbar">
          <h1>{TABS.find(t => t.id === tab)?.label}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {toast && (
              <span style={{ fontSize: "0.7rem", color: "var(--accent)", border: "1px solid rgba(232,23,58,0.3)", padding: "6px 14px", background: "var(--accent-dim)" }}>
                {toast}
              </span>
            )}
            <button className="adm-btn-ghost" onClick={onClose}>✕ Close</button>
          </div>
        </div>

        <div className="adm-content">

          {/* ── DASHBOARD ── */}
          {tab === "dash" && (
            <>
              <div className="adm-stats">
                {[
                  { n: videos.length, l: "Total Videos" },
                  { n: CATS.length,   l: "Categories"   },
                  { n: videos.filter(v => v.year >= 2024).length, l: "2024+" },
                  { n: [...new Set(videos.map(v => v.artist))].filter(Boolean).length, l: "Artists" },
                ].map(s => (
                  <div key={s.l} className="adm-stat">
                    <div className="adm-stat-n">{s.n}<span>.</span></div>
                    <div className="adm-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="adm-box">
                <div className="adm-box-title">Videos by Category</div>
                {CATS.map(c => {
                  const cnt = videos.filter(v => v.category === c.id).length;
                  const pct = videos.length ? Math.round(cnt / videos.length * 100) : 0;
                  return (
                    <div key={c.id} style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--text2)", fontWeight: 500 }}>{c.name}</span>
                        <span style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 600 }}>{cnt}</span>
                      </div>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
                    </div>
                  );
                })}
              </div>

              <div className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="adm-box" style={{ background: "var(--accent-dim)", border: "1px solid rgba(232,23,58,0.2)", cursor: "pointer" }}
                  onClick={() => setTab("add")}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>＋</div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Add New Video</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text3)" }}>Paste YouTube link → live instantly</p>
                </div>
                <div className="adm-box" style={{ cursor: "pointer" }} onClick={() => setTab("hero")}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🖼</div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Change Hero BG</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text3)" }}>Video or image background</p>
                </div>
              </div>
            </>
          )}

          {/* ── VIDEOS ── */}
          {tab === "videos" && (
            <div className="adm-box">
              <div className="adm-box-title">All Videos ({filtered.length})</div>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
                <input placeholder="Search by title or artist…" value={search} onChange={e => setSearch(e.target.value)}
                  style={{ flex: 1, minWidth: "200px", background: "var(--bg3)", border: "1px solid var(--border)", padding: "9px 14px", color: "#fff", fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.8rem", outline: "none" }} />
                <select value={catF} onChange={e => setCatF(e.target.value)}
                  style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "9px 14px", color: "#fff", fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.75rem", outline: "none", cursor: "pointer" }}>
                  <option value="all">All Categories</option>
                  {CATS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                {filtered.length === 0
                  ? <p style={{ color: "var(--text3)", fontSize: "0.8rem", padding: "2rem", textAlign: "center" }}>No videos found</p>
                  : filtered.map(v => (
                    <div key={v.id} className="vli">
                      <img className="vli-thumb" src={`https://img.youtube.com/vi/${v.youtubeId}/default.jpg`} alt={v.title} />
                      <div className="vli-info">
                        <div className="vli-title">{v.title}</div>
                        <div className="vli-meta">{v.artist} · {v.year}</div>
                      </div>
                      <span className="vli-badge">{v.category.replace(/-/g, " ")}</span>
                      <a href={`https://youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noreferrer"
                        style={{ color: "var(--text3)", padding: "6px", display: "flex" }} data-hover>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                      <button className="del-btn" data-hover
                        onClick={() => { if (confirm("Delete this video?")) { onDelete(v.id); toast3("Video deleted"); } }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6m4-6v6" /><path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── ADD VIDEO ── */}
          {tab === "add" && (
            <div style={{ maxWidth: "620px" }}>
              <div className="adm-box">
                <div className="adm-box-title">Add New Video</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="adm-field" style={{ gridColumn: "1/-1" }}>
                    <label>Video Title *</label>
                    <input placeholder="e.g. Ya Hussain 2025" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div className="adm-field" style={{ gridColumn: "1/-1" }}>
                    <label>YouTube URL or Video ID *</label>
                    <input placeholder="https://youtube.com/watch?v=... or just the ID"
                      value={form.youtubeId}
                      onChange={e => {
                        setForm({ ...form, youtubeId: e.target.value });
                        const id = extractId(e.target.value);
                        setPreview(id.length === 11 ? id : "");
                      }} />
                    {preview && (
                      <div style={{ marginTop: "0.75rem" }}>
                        <img src={`https://img.youtube.com/vi/${preview}/mqdefault.jpg`} alt="preview"
                          style={{ width: "100%", maxHeight: "160px", objectFit: "cover", border: "1px solid var(--border)" }} />
                        <p style={{ fontSize: "0.62rem", color: "var(--accent)", marginTop: "5px", fontWeight: 600 }}>✓ Video found — ID: {preview}</p>
                      </div>
                    )}
                  </div>
                  <div className="adm-field">
                    <label>Category *</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      {CATS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="adm-field">
                    <label>Artist Name</label>
                    <input placeholder="e.g. Nadeem Sarwar" value={form.artist} onChange={e => setForm({ ...form, artist: e.target.value })} />
                  </div>
                  <div className="adm-field">
                    <label>Year</label>
                    <input type="number" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) || 2025 })} />
                  </div>
                  <div className="adm-field">
                    <label>Description (optional)</label>
                    <textarea placeholder="Short description…" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
                  <button className="adm-btn" onClick={handleAdd} data-hover>Add Video</button>
                  <button className="adm-btn-ghost" onClick={() => { setForm({ title: "", youtubeId: "", category: "nadeem-sarwar", artist: "", year: 2025, description: "" }); setPreview(""); }} data-hover>Clear</button>
                </div>
              </div>
            </div>
          )}

          {/* ── HERO BACKGROUND ── */}
          {tab === "hero" && (
            <div style={{ maxWidth: "680px" }}>
              <div className="adm-box">
                <div className="adm-box-title">Hero Background — Choose Type</div>

                {/* Toggle Video / Image */}
                <div style={{ display: "flex", border: "1px solid var(--border)", marginBottom: "2rem" }}>
                  {(["video", "image"] as const).map((t, i) => (
                    <button key={t} onClick={() => setHType(t)} data-hover
                      style={{
                        flex: 1, padding: "12px", fontFamily: "'Space Grotesk',sans-serif",
                        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                        border: "none", borderRight: i === 0 ? "1px solid var(--border)" : "none",
                        cursor: "pointer", transition: "all 0.2s",
                        background: hType === t ? "var(--accent)" : "var(--bg3)",
                        color: hType === t ? "#fff" : "var(--text3)",
                      }}>
                      {t === "video" ? "🎬  YouTube Video" : "🖼  Image"}
                    </button>
                  ))}
                </div>

                {/* ── VIDEO TAB ── */}
                {hType === "video" && (
                  <div>
                    <div className="adm-field" style={{ marginBottom: "1.5rem" }}>
                      <label>YouTube Video ID or URL</label>
                      <input placeholder="e.g. wTM0hT5EAFY or full YouTube URL"
                        value={hYtId}
                        onChange={e => {
                          const id = extractId(e.target.value);
                          setHYtId(id.length === 11 ? id : e.target.value);
                        }} />
                      <p style={{ fontSize: "0.6rem", color: "var(--text3)", marginTop: "5px" }}>
                        Video will autoplay muted and looped as a cinematic background
                      </p>
                    </div>

                    {/* Preview */}
                    {hYtId.length === 11 && (
                      <div style={{ marginBottom: "1.5rem", position: "relative" }}>
                        <img src={`https://img.youtube.com/vi/${hYtId}/maxresdefault.jpg`} alt="preview"
                          style={{ width: "100%", height: "200px", objectFit: "cover", border: "1px solid var(--border)", display: "block" }}
                          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${hYtId}/hqdefault.jpg`; }} />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "0.7rem", color: "#fff", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(232,23,58,0.8)", padding: "6px 14px" }}>
                            Hero Preview
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Preset Karbala videos */}
                    <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "1.2rem", marginBottom: "1.5rem" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text3)", marginBottom: "0.8rem" }}>
                        Suggested Karbala Videos
                      </p>
                      <div className="hero-img-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        {KARBALA_VIDEOS.map(v => (
                          <button key={v.id} onClick={() => setHYtId(v.id)} data-hover
                            style={{
                              padding: "8px 10px", fontFamily: "'Space Grotesk',sans-serif",
                              fontSize: "0.68rem", fontWeight: 500, textAlign: "left",
                              border: `1px solid ${hYtId === v.id ? "var(--accent)" : "var(--border)"}`,
                              cursor: "pointer", transition: "all 0.2s",
                              background: hYtId === v.id ? "var(--accent-dim)" : "transparent",
                              color: hYtId === v.id ? "var(--accent)" : "var(--text2)",
                            }}>
                            {hYtId === v.id ? "✓ " : "▶ "}{v.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── IMAGE TAB ── */}
                {hType === "image" && (
                  <div>
                    {/* Upload from device */}
                    <div style={{ border: "2px dashed var(--border)", padding: "2rem", textAlign: "center", marginBottom: "1.5rem", cursor: "pointer", transition: "border-color 0.2s" }}
                      onClick={() => imgRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          const reader = new FileReader();
                          reader.onload = () => setHImg(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      data-hover>
                      <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📁</div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text2)", marginBottom: "4px" }}>
                        Click or drag & drop to upload image
                      </p>
                      <p style={{ fontSize: "0.65rem", color: "var(--text3)" }}>
                        JPG, PNG, WEBP — any size (1920×1080 recommended)
                      </p>
                      <input ref={imgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImgUpload} />
                    </div>

                    {/* OR image URL */}
                    <div className="adm-field" style={{ marginBottom: "1.5rem" }}>
                      <label>Or paste Image URL</label>
                      <input placeholder="https://example.com/karbala.jpg" value={hImg.startsWith("data:") ? "" : hImg}
                        onChange={e => setHImg(e.target.value)} />
                    </div>

                    {/* Preview */}
                    {hImg && (
                      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                        <img src={hImg} alt="preview"
                          style={{ width: "100%", height: "200px", objectFit: "cover", border: "1px solid var(--border)", display: "block" }}
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                          <span style={{ fontSize: "0.7rem", color: "#fff", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(0,0,0,0.6)", padding: "6px 14px" }}>
                            Hero Preview
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Preset Karbala images */}
                    <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "1.2rem", marginBottom: "1.5rem" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text3)", marginBottom: "0.8rem" }}>
                        Suggested Karbala Images
                      </p>
                      <div className="hero-vid-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        {KARBALA_IMAGES.map(img => (
                          <div key={img.url} onClick={() => setHImg(img.url)} data-hover
                            style={{ cursor: "pointer", border: `2px solid ${hImg === img.url ? "var(--accent)" : "transparent"}`, position: "relative", transition: "border-color 0.2s" }}>
                            <img src={img.url} alt={img.label}
                              style={{ width: "100%", height: "80px", objectFit: "cover", display: "block" }}
                              onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }} />
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "4px 6px", background: "rgba(0,0,0,0.7)", fontSize: "0.58rem", color: "#fff" }}>
                              {img.label}
                            </div>
                            {hImg === img.url && <div style={{ position: "absolute", top: "4px", right: "4px", background: "var(--accent)", borderRadius: "50%", width: "16px", height: "16px", fontSize: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>✓</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Save */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                  <button className="adm-btn" onClick={handleSaveHero} data-hover>
                    Save & Apply
                  </button>
                  {hSaved && (
                    <span style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 600 }}>
                      ✓ Applied! Close admin to see the change.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === "settings" && (
            <div style={{ maxWidth: "500px" }}>
              <div className="adm-box">
                <div className="adm-box-title">Site Info</div>
                {[
                  ["Site Name",        "Matam.Media"],
                  ["Contact Email",    "matammedia@gmail.com"],
                  ["Admin Password",   PASS],
                  ["Total Videos",     String(videos.length)],
                  ["Hero BG Type",     heroBg],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text3)", fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: "0.78rem", color: k === "Admin Password" ? "var(--accent)" : "var(--text2)", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="adm-box" style={{ background: "var(--accent-dim)", border: "1px solid rgba(232,23,58,0.2)" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--text2)", lineHeight: 1.7 }}>
                  To change the admin password, open{" "}
                  <code style={{ color: "var(--accent)", fontSize: "0.7rem" }}>app/components/AdminPanel.tsx</code>{" "}
                  and update the <code style={{ color: "var(--accent)", fontSize: "0.7rem" }}>PASS</code> constant on line 1.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
