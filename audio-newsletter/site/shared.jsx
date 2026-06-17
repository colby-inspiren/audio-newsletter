/* audio@inspiren: shared primitives for all three directions.
   Exports to window. Uses Inspiren tokens from colors_and_type.css. */

const T = {
  navy: "var(--navy)", navy600: "var(--navy-600)", navy900: "var(--navy-900)",
  rasp: "var(--raspberry)", raspTint: "var(--raspberry-tint)", raspDeep: "var(--raspberry-deep)",
  tealDark: "var(--teal-dark)", teal: "var(--teal)",
  blue: "var(--blue)", blueDeep: "var(--blue-deep)",
  fg1: "var(--fg1)", fg2: "var(--fg2)", fg3: "var(--fg3)",
  white: "var(--surface-white)", soft: "var(--surface-soft)", mute: "var(--surface-mute)",
  tintBlush: "var(--tint-blush)", tintBlue: "var(--tint-blue)", tintTeal: "var(--tint-teal)",
  rule: "var(--rule)", ruleSoft: "var(--rule-soft)",
  font: "var(--font-sans)",
};

// ── Inline icons (Lucide-style geometry, currentColor stroke) ──
function Ico({ name, size = 20, sw = 1.8, style }) {
  const paths = {
    "arrow-up": <path d="M12 19V5M5 12l7-7 7 7" />,
    "arrow-down": <path d="M12 5v14M19 12l-7 7-7-7" />,
    check: <path d="M20 6L9 17l-5-5" />,
    dot: <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />,
    "chevron-right": <path d="M9 6l6 6-6 6" />,
    "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
    alert: <><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
    mic: <><rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4" /></>,
    radio: <><circle cx="12" cy="12" r="2" /><path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>,
    flag: <><path d="M4 21V4M4 4h13l-2 4 2 4H4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    map: <><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" /><path d="M16 5.2a3.2 3.2 0 0 1 0 6M21 20c0-2.6-1.4-4.2-3.5-4.8" /></>,
    rocket: <><path d="M5 15c-1.5 1.2-2 5-2 5s3.8-.5 5-2M12.5 6.5a7 7 0 0 1 5-2.5 7 7 0 0 1-2.5 5L9 15l-1.5-1.5L4.5 10Z" /><circle cx="14.5" cy="9.5" r="1.2" /></>,
    sparkle: <path d="M12 3l1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z" fill="currentColor" stroke="none" />,
    quote: <path d="M7 7h4v6c0 2.2-1.6 3.6-4 4v-2c1.2-.4 2-1.1 2-2H7Zm9 0h4v6c0 2.2-1.6 3.6-4 4v-2c1.2-.4 2-1.1 2-2h-2Z" fill="currentColor" stroke="none" />,
    play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
    pause: <><rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" /><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" /></>,
    film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M3 15h18M8 4v16M16 4v16" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", flex: "none", ...style }}>
      {paths[name]}
    </svg>
  );
}

// ── Audio waveform motif: geometric bars, deterministic heights ──
function Waveform({ bars = 48, height = 40, color = T.tealDark, gap = 4, w = 3, opacity = 1, min = 0.12, seed = 7 }) {
  const hs = [];
  let s = seed;
  for (let i = 0; i < bars; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    // smooth envelope so it reads as a waveform, not noise
    const env = 0.5 - 0.5 * Math.cos((i / (bars - 1)) * Math.PI * 2);
    const h = min + (0.18 + 0.82 * r) * (0.35 + 0.65 * env);
    hs.push(Math.max(min, Math.min(1, h)));
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap, height, opacity }}>
      {hs.map((h, i) => (
        <div key={i} style={{ width: w, height: `${h * 100}%`, minHeight: 2, borderRadius: w, background: color }} />
      ))}
    </div>
  );
}

// ── Brand motifs ──
function Arc({ color = T.tintBlush, size = 320, pos = "tr", style }) {
  const map = {
    tr: { top: -size * 0.42, right: -size * 0.42, borderRadius: "0 0 0 100%" },
    tl: { top: -size * 0.42, left: -size * 0.42, borderRadius: "0 0 100% 0" },
    bl: { bottom: -size * 0.42, left: -size * 0.42, borderRadius: "0 100% 0 0" },
    br: { bottom: -size * 0.42, right: -size * 0.42, borderRadius: "100% 0 0 0" },
  };
  return <div style={{ position: "absolute", width: size, height: size, background: color, pointerEvents: "none", ...map[pos], ...style }} />;
}
function Ring({ size = 90, sw = 12, color = T.tealDark, style }) {
  return <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `${sw}px solid ${color}`, pointerEvents: "none", ...style }} />;
}
function Plus({ s = 24, color = T.rasp, style }) {
  return (
    <div style={{ position: "absolute", width: s * 2, height: s * 2, pointerEvents: "none", ...style }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: s, height: s, background: color }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: s, height: s, background: color }} />
    </div>
  );
}
function Spark({ s = 34, color = T.rasp, style }) {
  return <div style={{ position: "absolute", width: s, height: s, background: color, pointerEvents: "none", clipPath: "polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)", ...style }} />;
}

// ── Logo lockup (img: never redraw) ──
function Logo({ variant = "dark", h = 30, style }) {
  return <img src={`assets/logo-horizontal-${variant}.svg`} alt="Inspiren" style={{ height: h, display: "block", ...style }} />;
}
function BrandSymbol({ h = 30, style }) {
  return <img src="assets/symbol-raspberry.svg" alt="" style={{ height: h, display: "block", ...style }} />;
}

// ── Status pill ──
const STATUS_TONE = {
  go: { bg: T.tintTeal, fg: T.tealDark },
  done: { bg: "#EAF1EC", fg: "#2E7D52" },
  wip: { bg: T.tintBlush, fg: T.rasp },
};
function Pill({ tone = "done", children, style }) {
  const c = STATUS_TONE[tone] || STATUS_TONE.done;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 11px", borderRadius: 999, background: c.bg, color: c.fg, fontSize: 12.5, fontWeight: 600, letterSpacing: ".01em", whiteSpace: "nowrap", ...style }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: "currentColor" }} />{children}
    </span>
  );
}

// ── Stat card (tinted) ──
function StatCard({ stat, big = false }) {
  const up = stat.dir === "up";
  const flat = stat.dir === "flat";
  const bg = up ? T.tintBlush : flat ? T.tintTeal : T.tintTeal;
  const accent = up ? T.rasp : T.tealDark;
  return (
    <div style={{ flex: 1, minWidth: 0, background: bg, borderRadius: 18, padding: big ? "26px 26px 24px" : "20px 20px 18px" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Ico name={up ? "arrow-up" : "radio"} size={18} sw={2.2} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 5, color: accent }}>
        <span style={{ fontWeight: 500, fontSize: big ? 60 : 46, letterSpacing: "-.03em", lineHeight: .9 }}>{stat.num}</span>
        <span style={{ fontWeight: 600, fontSize: big ? 22 : 18 }}>{stat.unit}</span>
      </div>
      <div style={{ fontSize: 14, color: T.fg2, marginTop: 11, lineHeight: 1.4, fontWeight: 500 }}>{stat.label}</div>
      {stat.note && <div style={{ fontSize: 11.5, color: T.fg3, marginTop: 6, letterSpacing: ".01em" }}>{stat.note}</div>}
    </div>
  );
}

// ── Lead+body paragraph (bold lead inline; optional headHref makes lead a link) ──
function LeadPara({ head, body, why, headColor = T.navy, headHref, style }) {
  const lead = <b style={{ color: headColor, fontWeight: 600 }}>{head}</b>;
  return (
    <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: T.fg2, ...style }}>
      {headHref ? <a href={headHref} target="_blank" rel="noopener" className="hlink">{lead}</a> : lead}{" "}{body}
      {why && <> <b style={{ color: T.fg1, fontWeight: 600 }}>Why we care:</b> {why}</>}
    </p>
  );
}

// ── Source citation chip ──
function Cite({ source, url, style }) {
  if (!source) return null;
  const inner = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: T.tealDark, letterSpacing: ".01em" }}>
      <Ico name="link" size={12.5} sw={2} />{source}
    </span>
  );
  return (
    <span style={{ ...style }}>
      {url ? <a href={url} target="_blank" rel="noopener" className="hlink" style={{ textDecoration: "none" }}>{inner}</a> : inner}
    </span>
  );
}

// ── Inline text hyperlink (watchlist names etc.) ──
function Link({ href, children, color = T.tealDark }) {
  if (!href) return <b style={{ color, fontWeight: 600 }}>{children}</b>;
  return <a href={href} target="_blank" rel="noopener" className="hlink"><b style={{ color, fontWeight: 600 }}>{children}</b></a>;
}

// ── Section number + eyebrow header (shared by A) ──
function SectionHead({ num, eyebrow, title, accent = T.rasp, style }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 18, ...style }}>
      <span style={{ fontWeight: 500, fontSize: 40, lineHeight: 1, color: T.navy, letterSpacing: "-.02em", fontVariantNumeric: "tabular-nums" }}>{num}</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".16em", color: accent, marginBottom: 6 }}>{eyebrow}</div>
        <h2 style={{ margin: 0, fontWeight: 500, fontSize: 27, letterSpacing: "-.015em", color: T.navy, lineHeight: 1.05 }}>{title}</h2>
      </div>
    </div>
  );
}

// ── Repo card (audio repos + tooling) ──
// Inspiren font everywhere: repo names/paths use the brand sans (Lexend Deca), not mono.
const MONO = "var(--font-sans)";
function RepoCard({ repo, accent = T.tealDark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#fff", border: `1px solid ${T.rule}`, borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, background: T.navy, color: T.teal, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", fontFamily: MONO, fontSize: 12, fontWeight: 700 }}>›</span>
          <span style={{ fontFamily: MONO, fontSize: 14.5, fontWeight: 600, color: T.navy, letterSpacing: "-.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{repo.name}</span>
        </div>
        <Pill tone={repo.tone}>{repo.state}</Pill>
      </div>
      <div style={{ marginBottom: 11 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.tealDark, background: T.tintTeal, padding: "3px 9px", borderRadius: 999 }}>{repo.tag}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: T.fg1, fontWeight: 400 }}>{repo.purpose}</p>
      {repo.result && (
        <div style={{ marginTop: 11, display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", background: T.soft, borderRadius: 9, padding: "7px 12px" }}>
          <Ico name="radio" size={14} style={{ color: accent }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: accent }}>{repo.result}</span>
        </div>
      )}
      <div style={{ marginTop: 13, paddingTop: 12, borderTop: `1px solid ${T.ruleSoft}`, display: "flex", flexDirection: "column", gap: 9 }}>
        {[repo.why, ...(repo.extra || [])].filter(Boolean).map((b, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <Ico name="arrow-right" size={14} sw={2} style={{ color: T.fg3, marginTop: 2, flex: "none" }} />
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: T.fg2 }}>{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Video slot: renders the clip directly (static src → reliably bundled/served);
//    falls back to a branded placeholder only if the file genuinely fails to load. ──
function VideoSlot({ src, label, sub, path, ratio = "16 / 9", accent = T.tealDark }) {
  const [err, setErr] = React.useState(false);
  const [dims, setDims] = React.useState(null);
  const portrait = dims && dims.h > dims.w;
  const ok = !err;
  return (
    <figure style={{ margin: "20px 0 0" }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-sm)", background: ok ? "#0B121D" : `linear-gradient(140deg, ${T.tintTeal}, ${T.tintBlue})`, ...(ok && portrait ? { width: "min(340px, 78%)", margin: "0 auto", aspectRatio: `${dims.w} / ${dims.h}` } : { width: "100%", aspectRatio: ratio }) }}>
        {!ok && <Arc color="rgba(255,255,255,.4)" size={170} pos="tr" style={{ top: -85, right: -85, zIndex: 2 }} />}
        {ok ? (
          <video src={src} controls playsInline preload="metadata"
            onLoadedMetadata={(e) => setDims({ w: e.target.videoWidth, h: e.target.videoHeight })}
            onError={() => setErr(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#fff", color: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", paddingLeft: 4 }}><Ico name="play" size={24} /></div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#41555A" }}>{label}</div>
            <div style={{ fontSize: 11.5, color: "#6E8186" }}>Drop a clip at <span style={{ fontFamily: MONO, color: "#41555A" }}>{path}</span></div>
          </div>
        )}
      </div>
      {(label || sub) && (
        <figcaption style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: T.fg3 }}>
          <Ico name="film" size={14} style={{ color: accent, flex: "none" }} />
          <span><b style={{ color: T.fg2, fontWeight: 600 }}>{label}</b>{sub ? ": " + sub : ""}</span>
        </figcaption>
      )}
    </figure>
  );
}

// ── Theme song: branded inline audio player with a live, clickable waveform ──
function ThemeSong({ title, sub, src, bars = 64 }) {
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0..1
  const [missing, setMissing] = React.useState(false);

  // deterministic bar heights (waveform envelope)
  const hs = React.useMemo(() => {
    const out = []; let s = 19;
    for (let i = 0; i < bars; i++) {
      s = (s * 9301 + 49297) % 233280; const r = s / 233280;
      const env = 0.5 - 0.5 * Math.cos((i / (bars - 1)) * Math.PI * 2);
      out.push(Math.max(0.14, Math.min(1, 0.16 + (0.2 + 0.8 * r) * (0.35 + 0.65 * env))));
    }
    return out;
  }, [bars]);

  const toggle = () => {
    const a = audioRef.current; if (!a) return;
    if (a.paused) { a.play().then(() => setPlaying(true)).catch(() => setMissing(true)); }
    else { a.pause(); setPlaying(false); }
  };
  const seek = (e) => {
    const a = audioRef.current; if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = p * a.duration; setProgress(p);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", background: T.navy, borderRadius: 18, padding: "22px 26px", display: "flex", alignItems: "center", gap: 20 }}>
      <Ring size={150} sw={20} color="rgba(41,204,199,.12)" style={{ bottom: -70, right: 40 }} />
      <audio ref={audioRef} src={src} preload="metadata"
        onTimeUpdate={(e) => { const a = e.target; if (a.duration) setProgress(a.currentTime / a.duration); }}
        onEnded={() => { setPlaying(false); setProgress(0); }}
        onError={() => setMissing(true)} />
      <button onClick={toggle} aria-label={playing ? "Pause" : "Play"}
        style={{ flex: "none", width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: T.rasp, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: playing ? 0 : 3, boxShadow: "0 6px 18px rgba(217,31,92,.4)", position: "relative", zIndex: 1 }}>
        <Ico name={playing ? "pause" : "play"} size={22} />
      </button>
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", color: T.teal }}>THEME SONG</span>
          <a href={src} target="_blank" rel="noopener" className="hlink" style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>{title}</a>
          <span style={{ fontSize: 12.5, color: "var(--fg-on-dark-mute)" }}>{missing ? "— add the clip at " + src : sub}</span>
        </div>
        <div onClick={seek} style={{ display: "flex", alignItems: "center", gap: 2.5, height: 38, cursor: "pointer" }}>
          {hs.map((h, i) => {
            const on = i / hs.length <= progress;
            return <div key={i} style={{ flex: 1, height: `${h * 100}%`, minHeight: 2, borderRadius: 2, background: on ? T.teal : "rgba(255,255,255,.22)", transition: "background .1s" }} />;
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  NT: T, Ico, Waveform, Arc, Ring, Plus, Spark, Logo, BrandSymbol, Pill, StatCard, LeadPara, Cite, Link, SectionHead, RepoCard, VideoSlot, ThemeSong, MONO,
});
