/* Direction A: "Broadsheet": clean editorial, single column.
   Tweak-aware via optional `tw` prop; defaults reproduce the canvas look. */
(function () {
  const { NT: T, Ico, Arc, Ring, Plus, Spark, Pill, StatCard, LeadPara, Cite, Link, SectionHead, Logo, VideoSlot } = window;
  const RepoCard = window.RepoCard;
  const PAD = 60;

  const TW_DEFAULT = { masthead: "light", density: "airy", motifs: "balanced", tldr: true };

  function Rule() { return <div style={{ height: 1, background: T.rule }} />; }

  function Table({ rows }) {
    return (
      <div style={{ marginTop: 22, border: `1px solid ${T.rule}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 104px 158px", alignItems: "center", padding: "11px 20px", background: T.soft, borderBottom: `1px solid ${T.rule}` }}>
          {["Work", "Owner", "Status"].map((h, i) => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: T.tealDark, textAlign: i === 2 ? "right" : "left" }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 104px 158px", alignItems: "center", padding: "15px 20px", borderTop: i ? `1px solid ${T.ruleSoft}` : "none" }}>
            <div style={{ fontSize: 14, lineHeight: 1.45, color: T.fg1, paddingRight: 16, fontWeight: 400, whiteSpace: "pre-line" }}>{r.work}</div>
            <div style={{ fontSize: 12.5, color: T.fg2, fontWeight: 500 }}>{r.owner}</div>
            <div style={{ textAlign: "right" }}><Pill tone={r.tone}>{r.status}</Pill></div>
          </div>
        ))}
      </div>
    );
  }

  function DirectionA({ tw }) {
    const N = window.NEWS;
    const t = { ...TW_DEFAULT, ...(tw || {}) };
    const D = t.density === "compact" ? 0.66 : 1;
    const sp = (n) => Math.round(n * D);
    const showArc = t.motifs !== "subtle";
    const rich = t.motifs === "bold";
    const navy = t.masthead === "navy";

    const Section = ({ data, children, top = 44 }) => (
      <div style={{ marginTop: sp(top), position: "relative" }}>
        <SectionHead num={data.num} eyebrow={data.eyebrow} title={data.title} />
        <div style={{ marginTop: 20, paddingLeft: 58 }}>{children}</div>
      </div>
    );

    return (
      <div style={{ fontFamily: T.font, background: T.white, color: T.fg1, width: "100%", padding: `0 ${PAD}px`, boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
        {/* Masthead: light or navy band */}
        {navy ? (
          <div style={{ position: "relative", background: T.navy, margin: `0 ${-PAD}px`, padding: `46px ${PAD}px 40px`, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 40, left: PAD, width: 56, height: 11, borderRadius: 3, background: T.rasp }} />
            {showArc && <Ring size={210} sw={26} color="rgba(41,204,199,.16)" style={{ top: -66, right: -56 }} />}
            {rich && <Spark s={24} color={T.raspTint} style={{ top: 60, right: 86 }} />}
            <div style={{ position: "relative", paddingTop: 28 }}>
              <Logo variant="light" h={24} />
              <h1 style={{ margin: "26px 0 0", fontWeight: 600, fontSize: 60, letterSpacing: "-.03em", lineHeight: 1, color: "#fff" }}>
                audio<span style={{ color: T.raspTint }}>@</span>inspiren
              </h1>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".16em", color: T.teal, marginTop: 22 }}>{N.issue}</div>
              <p style={{ margin: "9px 0 0", fontSize: 13, color: "var(--fg-on-dark-mute)", fontWeight: 500 }}>{N.byline}</p>
            </div>
          </div>
        ) : (
          <div style={{ position: "relative", paddingTop: sp(52), overflow: "hidden" }}>
            {showArc && <Arc color={T.tintBlush} size={300} pos="tr" style={{ top: -150, right: -150 }} />}
            {rich && <Spark s={22} color={T.rasp} style={{ top: 120, right: 8 }} />}
            <div style={{ position: "relative" }}>
              <Logo variant="dark" h={26} />
              <h1 style={{ margin: "30px 0 0", fontWeight: 500, fontSize: 62, letterSpacing: "-.03em", lineHeight: 1, color: T.navy }}>
                audio<span style={{ color: T.rasp }}>@</span>inspiren
              </h1>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".16em", color: T.tealDark, marginTop: 20 }}>{N.issue}</div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: T.fg3, fontWeight: 500 }}>{N.byline}</p>
            </div>
            <div style={{ marginTop: sp(26) }}><Rule /></div>
          </div>
        )}

        {/* TL;DR */}
        {t.tldr && (
          <div style={{ marginTop: sp(28), background: T.tintBlue, borderRadius: 16, padding: `${sp(26)}px 30px` }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", color: T.navy600, marginBottom: 12 }}>TL;DR</div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.62, color: T.navy, fontWeight: 400 }}>{(() => {
              const parts = N.tldrUrl ? N.tldr.split("Notion") : [N.tldr];
              if (parts.length < 2) return N.tldr;
              return <React.Fragment>{parts[0]}<a href={N.tldrUrl} target="_blank" rel="noopener" className="hlink" style={{ color: T.tealDark, fontWeight: 600 }}>Notion</a>{parts.slice(1).join("Notion")}</React.Fragment>;
            })()}</p>
          </div>
        )}

        {/* 01 Shipped + Roadmap */}
        <Section data={N.shipped} top={t.tldr ? 48 : 40}>
          <p style={{ margin: 0, fontSize: 15.5, color: T.fg2, lineHeight: 1.55 }}>{N.shipped.intro}</p>
          <Table rows={N.shipped.table} />

          {/* Audio repos + tooling */}
          <div style={{ marginTop: sp(30) }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: T.tealDark, marginBottom: 10 }}>{N.shipped.reposLabel}</div>
            <p style={{ margin: "0 0 16px", fontSize: 14.5, color: T.fg2, lineHeight: 1.55 }}>{N.shipped.reposIntro}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {N.shipped.repos.map((r, i) => <RepoCard key={i} repo={r} accent={r.tone === "wip" ? T.rasp : T.tealDark} />)}
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 13, color: T.fg3, lineHeight: 1.55 }}>{N.shipped.reposAlso}</p>
          </div>

          {/* Enunciate spotlight */}
          <div style={{ marginTop: sp(30) }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: T.tealDark, marginBottom: 14 }}>{N.shipped.enunciate.eyebrow}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 232px", gap: 26, alignItems: "stretch", background: T.soft, borderRadius: 18, padding: "26px 28px" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 21, color: T.navy, lineHeight: 1.22, letterSpacing: "-.01em" }}>{(() => {
                  const e = N.shipped.enunciate;
                  const parts = e.url ? e.title.split("Enunciate") : [e.title];
                  if (parts.length < 2) return e.title;
                  return <React.Fragment>{parts[0]}<a href={e.url} target="_blank" rel="noopener" className="hlink" style={{ color: T.navy }}>Enunciate</a>{parts.slice(1).join("Enunciate")}</React.Fragment>;
                })()}</h3>
                <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.6, color: T.fg2 }}>{N.shipped.enunciate.body}</p>
                {N.shipped.enunciate.attrib && <p style={{ margin: "12px 0 0", fontSize: 12.5, fontWeight: 600, color: T.tealDark }}>{N.shipped.enunciate.attrib}</p>}
              </div>
              <div style={{ background: T.tintTeal, borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: T.tealDark, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Ico name="arrow-down" size={18} sw={2.2} /></div>
                <div style={{ fontWeight: 500, fontSize: 46, letterSpacing: "-.03em", lineHeight: .9, color: T.tealDark }}>{N.shipped.enunciate.statNum}</div>
                <div style={{ fontSize: 13, color: T.fg2, marginTop: 11, lineHeight: 1.4, fontWeight: 500 }}>{N.shipped.enunciate.statLabel}</div>
              </div>
            </div>
          </div>

          {/* HQ acoustics chamber feature */}
          <div style={{ marginTop: sp(30) }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: T.tealDark, marginBottom: 14 }}>HQ ACOUSTICS LAB</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 282px", gap: 26, alignItems: "stretch", background: T.tintTeal, borderRadius: 18, padding: "26px 28px" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 21, color: T.navy, lineHeight: 1.22, letterSpacing: "-.01em" }}>Acoustics planning for the entire HQ office is underway.</h3>
                <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.6, color: T.fg2 }}>A sample rendering of the acoustics test chamber.</p>
              </div>
              <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", minHeight: 320, boxShadow: "var(--shadow-md)", background: T.navy }}>
                <img src="assets/hq-acoustics-chamber.jpeg" alt="Rendering of the HQ acoustics test chamber" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: -52, right: -52, width: 104, height: 104, background: "rgba(255,255,255,.92)", borderRadius: "0 0 0 100%" }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: sp(30) }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: T.rasp, marginBottom: 10 }}>{N.shipped.roadmapLabel}</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: T.fg2 }}>{N.shipped.roadmap}</p>
          </div>
        </Section>

        {/* 02 Metrics */}
        <Section data={N.metrics}>
          {rich && <Plus s={16} color={T.rasp} style={{ top: -6, right: 2 }} />}
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            {N.metrics.cards.map((c, i) => <StatCard key={i} stat={c} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {N.metrics.items.map((it, i) => <LeadPara key={i} head={it.head} body={it.body} />)}
          </div>
          <VideoSlot src="assets/vad-demo.mp4" path="assets/vad-demo.mp4" accent={T.tealDark}
            label="Anti-spoofing VAD demo" sub="resident speech vs TV playback, first model (60s live + 60s TV training/validation set). Live speech is classified as RESIDENT; everything else is SILENCE." />
        </Section>

        {/* 03 Stories */}
        <Section data={N.stories}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {N.stories.items.map((it, i) => <LeadPara key={i} head={it.head} body={it.body} />)}
          </div>
          <div style={{ marginTop: 18 }}>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: T.fg2 }}>
              <b style={{ color: T.navy, fontWeight: 600 }}>{N.stories.shoutoutLead}</b>{" "}
              {N.stories.shoutouts.map((s, i) => (
                <span key={i}><b style={{ color: T.rasp, fontWeight: 600 }}>{s.who}</b>{s.for ? ` (${s.for})` : ""}{i < N.stories.shoutouts.length - 1 ? ", " : "."}</span>
              ))}
            </p>
          </div>
        </Section>

        {/* 04 On the Wire */}
        <Section data={N.wire}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {N.wire.items.map((it, i) => (
              <div key={i} style={{ paddingBottom: i < N.wire.items.length - 1 ? 20 : 0, borderBottom: i < N.wire.items.length - 1 ? `1px solid ${T.ruleSoft}` : "none" }}>
                <LeadPara head={it.head} body={it.body} why={it.why} headHref={it.url} />
                <div style={{ marginTop: 8 }}><Cite source={it.source} url={it.url} /></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, background: T.soft, borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 12 }}>{N.wire.watchLead}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {N.wire.watch.map((w, i) => (
                <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: T.fg2 }}>
                  <Link href={w.url}>{w.name}</Link>: {w.body}
                </p>
              ))}
            </div>
          </div>
        </Section>

        {/* 05 Asks */}
        <Section data={N.asks}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {N.asks.asks.map((a, i) => (
              <div key={i} style={{ position: "relative", background: T.tintBlush, borderRadius: 16, padding: rich && i === 0 ? "20px 56px 20px 26px" : "20px 26px", display: "flex", gap: 14, alignItems: "flex-start", overflow: "hidden" }}>
                {rich && i === 0 && <Spark s={20} color={T.raspTint} style={{ top: 16, right: 18 }} />}
                <div style={{ width: 30, height: 30, borderRadius: 9, background: T.rasp, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Ico name={a.icon} size={16} sw={2} /></div>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: T.navy }}>
                  <b style={{ color: T.rasp, fontWeight: 700 }}>{a.lead}</b> {a.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Theme song */}
        <div style={{ marginTop: sp(40) }}>
          <window.ThemeSong title={N.asks.songTitle} sub={N.asks.songSub} src={N.asks.songSrc} />
        </div>

        {/* Footer */}
        <div style={{ marginTop: sp(46), paddingBottom: sp(44), position: "relative" }}>
          {rich && showArc && <Arc color={T.tintBlue} size={240} pos="bl" style={{ bottom: -150, left: -150 }} />}
          <Rule />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, position: "relative" }}>
            <Logo variant="dark" h={20} />
            <span style={{ fontSize: 11.5, color: T.fg3, fontWeight: 500 }}>{N.footer}</span>
          </div>
        </div>
      </div>
    );
  }

  window.DirectionA = DirectionA;
})();
