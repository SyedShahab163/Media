"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar    from "./components/Navbar";
import VideoModal from "./components/VideoModal";
import AdminPanel from "./components/AdminPanel";
import HeroBg from "./components/HeroBg";

const ThreeCanvas = dynamic(() => import("./components/ThreeCanvas"), { ssr: false });
const Cursor      = dynamic(() => import("./components/Cursor"),      { ssr: false });

type Video = { id: string; title: string; youtubeId: string; category: string; artist: string; year: number; description?: string };

const SEED: Video[] = [
  { id:"1",  title:"Aye Zainab",       youtubeId:"aXkqPNkKFfM", category:"nadeem-sarwar", artist:"Nadeem Sarwar", year:2023 },
  { id:"2",  title:"Ya Hussain",        youtubeId:"b5INxKaE3zU", category:"nadeem-sarwar", artist:"Nadeem Sarwar", year:2022 },
  { id:"3",  title:"Mera Imam",         youtubeId:"0cTxJeFBuoU", category:"nadeem-sarwar", artist:"Nadeem Sarwar", year:2022 },
  { id:"4",  title:"Woh Karbala Gaye",  youtubeId:"1hJfSPBgpnk", category:"mir-hasan-mir", artist:"Mir Hasan Mir", year:2023 },
  { id:"5",  title:"Ali Ali",           youtubeId:"ygT5kCKxd8o", category:"mir-hasan-mir", artist:"Mir Hasan Mir", year:2022 },
  { id:"6",  title:"Mola Hussain",      youtubeId:"LDU_Txk06tM", category:"ali-shanawar",  artist:"Ali Shanawar",  year:2023 },
  { id:"7",  title:"Ya Ali Madad",      youtubeId:"mGNtkdSLaA0", category:"shadman-raza",  artist:"Shadman Raza",  year:2023 },
  { id:"8",  title:"Manqabat Imam Ali", youtubeId:"YkgkThdzX-8", category:"manqabat",      artist:"Various",       year:2023 },
  { id:"9",  title:"Mola Ali Manqabat", youtubeId:"5rBRFB62Hkk", category:"manqabat",      artist:"Various",       year:2022 },
  { id:"10", title:"Majlis e Aza",      youtubeId:"HvELBwf-sY8", category:"majlis",         artist:"Molana Sahab",  year:2023 },
];

const ARTISTS = [
  { id:"nadeem-sarwar", name:"Nadeem Sarwar", role:"Noha Khan", desc:"The most iconic voice in Azadari — releasing new nohay every Muharram since decades." },
  { id:"mir-hasan-mir", name:"Mir Hasan Mir", role:"Noha Khan", desc:"Soulful recitations that bring the tragedy of Karbala to life with raw emotion." },
  { id:"ali-shanawar",  name:"Ali Shanawar",  role:"Noha Khan", desc:"Powerful and passionate nohay that resonate deeply with the Azadar community." },
  { id:"shadman-raza",  name:"Shadman Raza",  role:"Noha Khan", desc:"Moving elegies dedicated to the Ahle Bait, performed with heartfelt devotion." },
];

const FILTER_CATS = [
  { id:"all",           label:"All"          },
  { id:"nadeem-sarwar", label:"Nadeem Sarwar"},
  { id:"mir-hasan-mir", label:"Mir Hasan Mir"},
  { id:"ali-shanawar",  label:"Ali Shanawar" },
  { id:"shadman-raza",  label:"Shadman Raza" },
  { id:"manqabat",      label:"Manqabat"     },
  { id:"majlis",        label:"Majlis"       },
];

const MARQUEE_ITEMS = ["Nadeem Sarwar","Mir Hasan Mir","Ali Shanawar","Shadman Raza","Manqabat","Majlis","Karbala","Muharram","Azadari","Ya Hussain","Noha","Ya Ali"];

// Default hero background — YouTube video ID for Karbala footage
const DEFAULT_HERO_YT = "wTM0hT5EAFY"; // Karbala aerial footage
const DEFAULT_HERO_IMG = "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=80";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(() => {
    if (typeof window === "undefined") return SEED;
    try { const s = localStorage.getItem("mm_v2"); return s ? JSON.parse(s) : SEED; } catch { return SEED; }
  });
  const [cat,       setCat]       = useState("all");
  const [modal,     setModal]     = useState<{ytId:string;title:string}|null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [videoCount, setVideoCount] = useState(SEED.length);
  const [contact,   setContact]   = useState({ name:"", email:"", msg:"" });
  const [sent,      setSent]      = useState(false);
  const [heroYt,    setHeroYt]    = useState(DEFAULT_HERO_YT);
  const [heroImg,   setHeroImg]   = useState(DEFAULT_HERO_IMG);
  const [heroBg,    setHeroBg]    = useState<"video"|"image">("video");
  const [heroReady, setHeroReady] = useState(false);

  const saveHero = (type: "video"|"image", val: string) => {
    if (type === "video") { setHeroYt(val); localStorage.setItem("mm_hero_yt", val); }
    else { setHeroImg(val); localStorage.setItem("mm_hero_img", val); }
    setHeroBg(type);
    localStorage.setItem("mm_hero_type", type);
  };

  useEffect(() => { try { localStorage.setItem("mm_v2", JSON.stringify(videos)); } catch {} setVideoCount(videos.length); }, [videos]);

  // Load hero settings client-side only (avoids hydration mismatch)
  useEffect(() => {
    try {
      const yt   = localStorage.getItem("mm_hero_yt")   || DEFAULT_HERO_YT;
      const img  = localStorage.getItem("mm_hero_img")  || DEFAULT_HERO_IMG;
      const type = (localStorage.getItem("mm_hero_type") as "video"|"image") || "video";
      setHeroYt(yt); setHeroImg(img); setHeroBg(type);
    } catch {}
    setHeroReady(true);
    setVideoCount(videos.length);
  }, []);

  const addVideo    = (v: Video) => setVideos(p => [v, ...p]);
  const deleteVideo = (id: string) => setVideos(p => p.filter(v => v.id !== id));

  const visible = cat === "all" ? videos : videos.filter(v => v.category === cat);
  const manqVids = videos.filter(v => v.category === "manqabat").slice(0,4);
  const majlVids = videos.filter(v => v.category === "majlis");

  const play = (ytId: string, title: string) => setModal({ ytId, title });

  const VCard = ({ v }: { v: Video }) => (
    <div className="vcard" onClick={() => play(v.youtubeId, `${v.title} — ${v.artist}`)} data-hover>
      <div className="vcard-thumb">
        <img
          src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
          alt={v.title} loading="lazy"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`; }}
        />
        <div className="vcard-overlay">
          <div className="vcard-play">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>
      <div className="vcard-body">
        <div className="vcard-title">{v.title}</div>
        <div className="vcard-meta">
          <span className="vcard-artist">{v.artist}</span>
          <span className="vcard-year">{v.year}</span>
        </div>
      </div>
    </div>
  );

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <ThreeCanvas />
      <Cursor />
      <Navbar onAdmin={() => setAdminOpen(true)} />

      {/* ── HERO ── */}
      <section className="hero" style={{ zIndex:10, overflow:"hidden" }}>

        {/* ── BG: Video or Image (client only to avoid hydration) ── */}
        {heroReady && <HeroBg type={heroBg} ytId={heroYt} imgUrl={heroImg} />}

        {/* ── CONTENT ── */}
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 3rem", position:"relative", zIndex:2 }}>
          <div className="hero-tag">
            <span />
            Islamic Media Platform
          </div>
          <h1 className="hero-title">
            <span className="line"><span className="inner" style={{ transform:"none", animation:"none" }}>Matam</span></span>
            <span className="line"><span className="inner accent" style={{ transform:"none", animation:"none" }}>Media.</span></span>
          </h1>
          <p className="hero-sub">
            The ultimate destination for Nohay, Manqabat and Majalis.<br />
            All in one place — always free.
          </p>
          <div className="hero-ctas">
            <button className="btn-red" onClick={() => go("videos")} data-hover>Watch Nohay</button>
            <button className="btn-ghost" onClick={() => go("noha-khan")} data-hover>Our Artists</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" style={{ zIndex:2 }}>
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap" style={{ position:"relative", zIndex:10 }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item">
              {item}
              <div className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-row" style={{ position:"relative", zIndex:10 }}>
        {[
          { n: videoCount,      suf:"",  label:"Total Videos"    },
          { n: 4,               suf:"+", label:"Top Artists"      },
          { n: 6,               suf:"",  label:"Categories"       },
          { n: 100,             suf:"%", label:"Free Forever"     },
        ].map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-n">{s.n}<span>{s.suf}</span></div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ARTISTS ── */}
      <section id="noha-khan" style={{ position:"relative", zIndex:10, paddingTop:"7rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 3rem", marginBottom:"3rem" }}>
          <div className="sec-eyebrow">Our Artists</div>
          <h2 className="sec-title">The Voices of<br /><span style={{ color:"var(--accent)" }}>Karbala</span></h2>
        </div>
        <div className="artists-grid" style={{ borderTop:"1px solid var(--border)", borderLeft:"1px solid var(--border)" }}>
          {ARTISTS.map((a, i) => (
            <div key={a.id} className="artist-card" data-hover
              onClick={() => { setCat(a.id); go("videos"); }}>
              <div className="artist-num">0{i+1}</div>
              <div className="artist-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.5" width="18" height="18">
                  <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
                </svg>
              </div>
              <div className="artist-name">{a.name}</div>
              <div style={{ fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"0.6rem" }}>{a.role}</div>
              <div className="artist-desc">{a.desc}</div>
              <div className="artist-link">
                View Videos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section id="videos" style={{ position:"relative", zIndex:10, padding:"7rem 0 0" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 3rem", marginBottom:"3rem" }}>
          <div className="sec-eyebrow">Featured</div>
          <h2 className="sec-title">Start Here</h2>
        </div>
        <div className="featured-split">
          <div className="featured-text">
            <div style={{ fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"1rem" }}>
              Nadeem Sarwar · 2023
            </div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:"1.25rem" }}>
              Aye Zainab — <br /><span style={{ color:"var(--accent)" }}>The Masterpiece</span>
            </h3>
            <p style={{ fontSize:"0.95rem", color:"var(--text2)", lineHeight:1.75, marginBottom:"2.5rem", maxWidth:"420px" }}>
              One of the most emotional nohay by Nadeem Sarwar — dedicated to the tragedy of Karbala and the patience of Bibi Zainab (S.A).
            </p>
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
              <button className="btn-red" onClick={() => play("aXkqPNkKFfM","Aye Zainab — Nadeem Sarwar")} data-hover>
                ▶ Play Now
              </button>
              <button className="btn-ghost" onClick={() => { setCat("nadeem-sarwar"); go("all-videos"); }} data-hover>
                All Nohay
              </button>
            </div>
          </div>
          <div className="featured-media" onClick={() => play("aXkqPNkKFfM","Aye Zainab — Nadeem Sarwar")} data-hover>
            <img src="https://img.youtube.com/vi/aXkqPNkKFfM/maxresdefault.jpg" alt="Aye Zainab" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
            <div className="featured-play-btn">
              <div className="f-play-circle">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div className="featured-label">Now Playing</div>
          </div>
        </div>
      </section>

      {/* ── ALL VIDEOS ── */}
      <section id="all-videos" className="section-pad" style={{ position:"relative", zIndex:10, padding:"7rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"3rem", flexWrap:"wrap", gap:"1.5rem" }}>
            <div>
              <div className="sec-eyebrow">Library</div>
              <h2 className="sec-title" style={{ marginBottom:0 }}>All Videos</h2>
            </div>
            <div className="filter-row">
              {FILTER_CATS.map(f => (
                <button key={f.id} className={`filt-btn ${cat===f.id?"active":""}`} onClick={() => setCat(f.id)} data-hover>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <div style={{ textAlign:"center", padding:"5rem", color:"var(--text3)" }}>
              <p style={{ fontSize:"0.85rem" }}>No videos in this category yet. Add them via the Admin panel.</p>
            </div>
          ) : (
            <div className="vgrid">
              {visible.map(v => <VCard key={v.id} v={v} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── MANQABAT ── */}
      <section id="manqabat" className="section-pad" style={{ position:"relative", zIndex:10, padding:"7rem 3rem", background:"var(--bg2)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div className="manq-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"5rem", alignItems:"start" }}>
            <div className="manq-sticky" style={{ position:"sticky", top:"7rem" }}>
              <div className="sec-eyebrow">Manqabat</div>
              <h2 className="sec-title">Praise of the<br /><span style={{ color:"var(--accent)" }}>Ahle Bait</span></h2>
              <p className="sec-body" style={{ marginBottom:"2.5rem" }}>
                Manqabat is the devotional poetry praising the Ahle Bait and Awliya. These soul-soothing recitations bring peace and spiritual elevation.
              </p>
              <button className="btn-red" onClick={() => { setCat("manqabat"); go("all-videos"); }} data-hover>
                View All Manqabat
              </button>
            </div>
            <div className="vgrid" style={{ gridTemplateColumns:"1fr 1fr" }}>
              {manqVids.map(v => <VCard key={v.id} v={v} />)}
              {manqVids.length === 0 && (
                <p style={{ color:"var(--text3)", fontSize:"0.8rem", gridColumn:"1/-1" }}>No manqabat videos yet — add them from Admin panel.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAJLIS ── */}
      <section id="majlis" className="section-pad" style={{ position:"relative", zIndex:10, padding:"7rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div className="majlis-hd" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem", flexWrap:"wrap", gap:"1.5rem" }}>
            <div>
              <div className="sec-eyebrow">Majlis</div>
              <h2 className="sec-title" style={{ marginBottom:0 }}>Molana <span style={{ color:"var(--accent)" }}>Majalis</span></h2>
            </div>
            <p style={{ maxWidth:"380px", fontSize:"0.88rem", color:"var(--text2)", lineHeight:1.75 }}>
              Religious lectures by scholars — a curated collection of Majalis focused on the teachings of Ahle Bait.
            </p>
          </div>
          {majlVids.length === 0 ? (
            <p style={{ color:"var(--text3)", fontSize:"0.8rem" }}>No majlis videos yet — add them from the Admin panel.</p>
          ) : (
            <div className="vgrid">
              {majlVids.map(v => <VCard key={v.id} v={v} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ position:"relative", zIndex:10, padding:"7rem 3rem", background:"var(--bg2)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div className="contact-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"start" }}>
            <div>
              <div className="sec-eyebrow">Contact</div>
              <h2 className="sec-title">Get In<br /><span style={{ color:"var(--accent)" }}>Touch</span></h2>
              <p className="sec-body" style={{ marginBottom:"2.5rem" }}>
                Have a video request, suggestion or just want to get in touch? We&apos;d love to hear from you.
              </p>
              <a href="mailto:matammedia@gmail.com" className="contact-email-big" data-hover>
                matammedia@gmail.com
              </a>
              <div style={{ display:"flex", gap:"1rem", marginTop:"2rem" }}>
                {["Video Request","Feedback","Partnership"].map(tag => (
                  <span key={tag} style={{ fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", border:"1px solid var(--border)", padding:"6px 14px", color:"var(--text3)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {sent ? (
                <div style={{ padding:"3rem", border:"1px solid rgba(232,23,58,0.2)", background:"var(--accent-dim)", textAlign:"center" }}>
                  <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>✓</div>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:700, marginBottom:"0.5rem" }}>Message Sent!</p>
                  <p style={{ fontSize:"0.8rem", color:"var(--text2)" }}>We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                  <div className="contact-form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                    <div>
                      <label className="field-label">Your Name</label>
                      <input className="field-input" placeholder="Full name" value={contact.name} onChange={e => setContact({...contact, name:e.target.value})} />
                    </div>
                    <div>
                      <label className="field-label">Email</label>
                      <input className="field-input" type="email" placeholder="you@email.com" value={contact.email} onChange={e => setContact({...contact, email:e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Message</label>
                    <textarea className="field-textarea" placeholder="Your message or video request..." value={contact.msg} onChange={e => setContact({...contact, msg:e.target.value})} />
                  </div>
                  <button className="btn-red" style={{ alignSelf:"flex-start" }} data-hover
                    onClick={() => { if (!contact.name || !contact.email || !contact.msg) return; setSent(true); setContact({name:"",email:"",msg:""}); setTimeout(()=>setSent(false),6000); }}>
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="section-pad" style={{ position:"relative", zIndex:10, padding:"5rem 3rem 3rem", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"3rem", marginBottom:"4rem" }}>
            <div className="footer-brand">
              <div className="footer-logo">Matam<span>.</span>Media</div>
              <p className="footer-tagline">The ultimate Islamic media platform for Nohay, Manqabat and Majalis. Always free, always growing.</p>
            </div>
            <div>
              <div className="foot-col-title">Artists</div>
              {["Nadeem Sarwar","Mir Hasan Mir","Ali Shanawar","Shadman Raza"].map((a,i) => (
                <button key={a} className="foot-link" onClick={() => { setCat(["nadeem-sarwar","mir-hasan-mir","ali-shanawar","shadman-raza"][i]); go("all-videos"); }}>
                  {a}
                </button>
              ))}
            </div>
            <div>
              <div className="foot-col-title">Sections</div>
              {[["videos","Videos"],["manqabat","Manqabat"],["majlis","Majlis"],["contact","Contact"]].map(([id,l]) => (
                <button key={id} className="foot-link" onClick={() => go(id)}>{l}</button>
              ))}
            </div>
            <div>
              <div className="foot-col-title">Admin</div>
              <button className="foot-link" onClick={() => setAdminOpen(true)}>Admin Panel</button>
              <a href="mailto:matammedia@gmail.com" className="foot-link">Email Us</a>
            </div>
          </div>
          <div className="foot-bottom">
            <p className="foot-copy">© 2024 Matam.Media — All rights reserved</p>
            <div className="foot-red-dot" />
            <p className="foot-copy">Ya Hussain (A.S)</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modal && <VideoModal ytId={modal.ytId} title={modal.title} onClose={() => setModal(null)} />}

      {/* ADMIN */}
      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          videos={videos}
          onAdd={addVideo}
          onDelete={deleteVideo}
          onSaveHero={saveHero}
          heroYt={heroYt}
          heroImg={heroImg}
          heroBg={heroBg}
        />
      )}
    </>
  );
}
