/* audio@inspiren: Issue 01 content (verbatim).
   Plain global so both plain + babel scripts can read it. */
window.NEWS = {
  brand: "audio@inspiren",
  issue: "JUNE 2026 · ISSUE 01",
  byline: "Internal. Drafted by Colby Leider. Reply in #eng-audio.",
  footer: "audio@inspiren / Issue 01 / June 2026. Internal only. Drafted by Colby Leider. Reply in #eng-audio.",

  tldr: "audio@inspiren landing page is now live in Notion, which covers all things audio-related. Enunciate, our custom internal speech testing framework, is going live with v1.0. This first issue recaps the audio engineering foundation in progress: measurement tooling, the 4-mic array case for AUGi/Link/Sense H, audio front-end processing, wake-word analysis, and an anti-spoofing voice detector. The Software team's Two-Way Voice for AUGi Gen 4 is on pace for an end-of-Q2 Beta in two communities. Voice Core is functional and deploying to Stage and Production. Finally, we highlight recent industry signals and newsworthy items.",
  tldrUrl: "https://app.notion.com/p/Audio-Inspiren-34a6637b7812800bb183d471890156c9",

  // ── 1 · Shipped + Roadmap ──────────────────────────────────
  shipped: {
    num: "01",
    eyebrow: "SHIPPED + ROADMAP",
    title: "Shipped + Roadmap",
    intro: "What landed since March, and what is next.",
    table: [
      { work: "Two-Way Voice Gen 4 Voice Core: bidirectional audio POC validated (CAR-3911), Stage + Prod deploys underway", owner: "Arnab, Soufiane", status: "Shipping to Stage", tone: "go" },
      { work: "Pre-alpha resident feedback session, Solera Bethesda\n(9 residents, 4 staff)", owner: "Liam, Product", status: "Done May 27–28", tone: "done" },
      { work: "AFE-sim: 2-mic vs 4-mic AUGi H simulation, +10 dB signal-to-noise (SNR) improvement at 6-meter distance", owner: "Colby", status: "Shipped (repo)", tone: "done" },
      { work: "speech-rating: reference-free and referenced audio-quality CLI for Enunciate bench tests", owner: "Colby", status: "Shipped (repo)", tone: "done" },
      { work: "augi-self-tune: AUGi calibrates its own audio output", owner: "Colby", status: "Shipped (repo)", tone: "done" },
      { work: "resident-TV-discriminator: anti-spoofing voice activity detector, HiFi5 DSP target (for AUGi 4 and H)", owner: "Colby", status: "In progress", tone: "wip" },
      { work: "Two-Way Voice earcons and call initiation/termination tones", owner: "Colby", status: "Strawman delivered", tone: "wip" },
      { work: "Ecosystem wake-word phonetic analysis, audio architecture, chip comparison (MTK Genio 420 vs Synaptics SR80 Series)", owner: "Colby", status: "Docs in Notion", tone: "done" },
    ],
    reposLabel: "AUDIO REPOS + TOOLING HIGHLIGHTS",
    reposIntro: "Four repos make up the audio engineering foundation stood up since March: three shipped, one in flight. All owned by Colby unless noted.",
    repos: [
      {
        name: "AFE-sim",
        tag: "Simulation",
        state: "Shipped",
        tone: "done",
        purpose: "Acoustic front-end (AFE) simulation comparing the 2-mic AUGi Gen 4 baseline against the proposed 4-mic square array for AUGi H.",
        result: "+10 dB SNR at 6 m, concentrated at distance.",
        why: "Quantifies the case for the 4-mic array: the gain lands exactly where ASR/STT needs it.",
      },
      {
        name: "speech-rating",
        tag: "CLI",
        state: "Shipped",
        tone: "done",
        purpose: "Reference-free and referenced audio-quality CLI for Enunciate bench tests.",
        result: null,
        why: "Gives the team objective, repeatable audio-quality scores instead of subjective listening.",
        extra: [
          "Includes industry-standard measurements of objective speech intelligibility.",
        ],
      },
      {
        name: "augi-self-tune",
        tag: "On-device",
        state: "Shipped",
        tone: "done",
        purpose: "Lets AUGi calibrate its own audio output.",
        result: null,
        why: "Takes manual per-unit calibration out of the deployment path.",
        extra: [
          "AUGi plays a sine-wave sweep, and the mics measure the frequency response.",
          "Computes biquad filter coefficients for old-school DSP self-tuning.",
        ],
      },
      {
        name: "resident-TV-discriminator",
        tag: "HiFi5 · VAD",
        state: "In flight",
        tone: "wip",
        purpose: "Anti-spoofing voice activity detector that separates resident speech from TV playback. HiFi5 DSP target.",
        result: "First model trained on 60 s live speech + 60 s TV at varying volumes.",
        why: "Stops TV audio from spoofing voice events. Negative-SNR cases and a larger corpus still pending.",
      },
    ],
    reposAlso: "Also in flight: Two-Way Voice earcons and call initiation/termination tones (strawman delivered), and AUGi H wake-word phonetic analysis + chip comparison, MTK Genio 420 vs Synaptics SR80 Series (docs in Notion).",
    enunciate: {
      eyebrow: "SPOTLIGHT · ENUNCIATE",
      url: "https://github.com/inspiren-inc/enunciate",
      title: "Enunciate v1.0: custom speech testing, in-house. Hooray!",
      body: "Enunciate is our custom internal speech testing framework, now going live with v1.0: the harness the speech-rating CLI runs its reference-free and referenced audio-quality measurements against. Standing it up in-house, instead of licensing a commercial speech-testing solution, saves us up to $500k.",
      attrib: "",
      statNum: "$250–500k",
      statLabel: "saved vs a commercial speech-testing solution",
    },
    roadmapLabel: "ROADMAP · 30 / 60 / 90",
    roadmap: "Week of Jun 8: Alpha at Solera Bethesda, Liam on site. Week of Jun 22: Beta go-live at Solera Bethesda and Dockerty Heritage, training Mon/Tue and go-live Wed; Two-Way Voice for all residents, Agentic AI triage for select residents only. Late Jul / early Aug: targeted GA for Gen 4 eCall clients. Gen 3 Two-Way Voice port is fully scoped (WP-1 thermal characterization, WP-2 noise suppression, WP-4 amp lifecycle, WP-5 pipeline port, WP-6 end-to-end validation) and is not on the Q2 critical path. Two-way voice acoustic KPI testing is starting up.",
    timeline: [
      { when: "Week of Jun 8", what: "Alpha at Solera Bethesda", detail: "Liam on site.", kind: "alpha" },
      { when: "Week of Jun 22", what: "Beta go-live", detail: "Solera Bethesda + Dockerty Heritage. Train Mon/Tue, go-live Wed. Two-Way Voice for all residents; Agentic AI triage for select residents only.", kind: "beta" },
      { when: "Late Jul / early Aug", what: "Targeted GA", detail: "Gen 4 eCall clients.", kind: "ga" },
    ],
  },

  // ── 2 · Metrics / KPIs ─────────────────────────────────────
  metrics: {
    num: "02",
    eyebrow: "METRICS / KPIS",
    title: "Metrics / KPIs",
    items: [
      { head: "4-mic vs 2-mic SNR.", body: "AFE-sim shows the 4-mic square array delivering roughly +10 dB SNR over the 2-mic AUGi Gen 4 baseline at 6 m. Most of the gain shows up at distance, which is exactly where ASR/STT transcription needs it." },
      { head: "31 audio repos.", body: "This includes our enunciate test suite, audio event detection, speech-enhancer, sleep quality analyzer, and many more in progress!" },
      { head: "Anti-spoofing VAD.", body: "The first internal voice activity detector (VAD) custom model, trained on only 60 sec of live speech plus 60 sec of TV at varying volumes, separates resident speech from live TV/media playback. Negative-SNR cases and a larger training corpus are in progress to improve accuracy. Goal: only respond to live human speech, never broadcast/media speech." },
    ],
    placeholder: "Placeholder: field SNR, end-to-end latency, and barge-in/double-talk numbers to be filled once Alpha telemetry lands.",
    cards: [
      { num: "+10", unit: "dB", label: "4-mic vs 2-mic Signal-to-Noise (SNR) at 6 meters", dir: "up" },
      { num: "31", unit: "", label: "audio-related repos currently in flight", dir: "flat" },
      { num: "2", unit: "communities", label: "in the Jun 22 Beta cohort", dir: "flat" },
    ],
  },

  // ── 3 · Customer Stories + Shoutouts ───────────────────────
  stories: {
    num: "03",
    eyebrow: "CUSTOMER STORIES + SHOUTOUTS",
    title: "Customer Stories + Shoutouts",
    items: [
      { head: "WellPointe workshop (co-founder Angela).", body: "Validated the design direction. Highest value is overnight (1–5 AM) when staffing is lowest; voice should be alert-initiated rather than always-on; best fit is eCall plus falls in resident rooms; audio quality and reliability are the biggest drivers of adoption." },
      { head: "Solera Bethesda pre-alpha.", body: "Residents and staff confirmed two-way voice audio quality and reacted positively over two days of live sessions." },
    ],
    quote: "Highest value is overnight, 1–5 AM, when staffing is lowest. Audio quality and reliability are the biggest drivers of adoption.",
    quoteAttr: "Direction validated at the WellPointe workshop with co-founder Angela",
    shoutoutLead: "Shoutouts.",
    shoutouts: [
      { who: "Soufiane", for: "first AI-triage PRs" },
      { who: "Arnab", for: "Gen 4 Two-way voice initiative steering" },
      { who: "Liam", for: "product lead, consent path, and site coordination" },
      { who: "Wassim", for: "edge MLLM distress-over-TV test" },
      { who: "Louis", for: "Synaptics/XMOS sourcing" },
      { who: "Evan", for: "AUGi H" },
      { who: "Apostolos", for: "Sense H" },
      { who: "Jon", for: "IL framework, IP work" },
      { who: "Kyle, Arnab, Tim, and team", for: "Two-Way Voice" },
    ],
  },

  // ── 4 · On the Wire ────────────────────────────────────────
  wire: {
    num: "04",
    eyebrow: "ON THE WIRE",
    title: "On the Wire",
    items: [
      { head: "Amazon Connect Health goes GA with agentic AI for providers.", body: "AWS made its agentic healthcare offering generally available with ambient listening, medical coding, and scheduling built into EHR workflows (AHA, Mar 24 2026).", why: "a hyperscaler is now shipping agentic voice handling of healthcare interactions, which sets the latency and accuracy bar our Agentic AI eCall triage will be measured against.", source: "aha.org", url: "https://www.aha.org/aha-center-health-innovation-market-scan/2026-03-24-amazon-introduces-agentic-ai-health-care-providers" },
      { head: "VA expands ambient AI scribes nationwide.", body: "The VA is rolling ambient AI documentation to all its medical centers through 2026, the largest US government healthcare AI deployment to date.", why: "large-scale ambient capture normalizes the consent and workflow patterns we are navigating for Two-Way Voice.", source: "patientnotes.ai", url: "https://patientnotes.ai/resources/ambient-listening-healthcare" },
      { head: "athenahealth launches athenaAmbient at no cost.", body: "athenahealth shipped a native ambient scribe free to all customers (Feb 2026).", why: "ambient audio capture is becoming table-stakes and free, which reinforces that our differentiation is real-time triage and response, not capture alone.", source: "soapnoteai.com", url: "https://www.soapnoteai.com/soap-note-guides-and-example/healthcare-ai-trends-2026/" },
      { head: "Samsung SmartThings adds mmWave ambient sensing for elder care.", body: "Samsung's 2026 update brings millimeter-wave ambient sensing for elderly monitoring, including a device that detects a person on the floor and opens two-way conversation.", why: "consumer platforms are now shipping ambient fall detection with two-way audio, and consumer-grade expectations will bleed into senior living buyers.", source: "thenextweb.com", url: "https://thenextweb.com/news/samsung-smartthings-family-care-elderly-monitoring-ambient-sensing" },
    ],
    watchLead: "Watchlist",
    watch: [
      { name: "Ato (heyato.ai)", body: "AI-native, voice-first, screen-free companion for older adults, 1,300+ devices in the field at an average user age of 82; a senior-living-adjacent player worth tracking on voice UX and engagement.", url: "https://www.heyato.ai/" },
      { name: "MDPI Sensors", body: "systematic review of ambient and smart-home fall detection, useful as a benchmark reference.", url: "https://www.mdpi.com/1424-8220/25/21/6540" },
      { name: "LiveKit", body: "HIPAA Scale tier and BAA terms, our production hosting path for two-way voice.", url: "https://livekit.com/" },
    ],
  },

  // ── 5 · Asks / Blockers ────────────────────────────────────
  asks: {
    num: "05",
    eyebrow: "ASKS",
    title: "Asks",
    body: "Consents are the gating risk for the June 22 Beta. Maryland is launchable with consents; California is pending state confirmation, where a CDSS reading may bar audio alongside privacy-protected imagery in licensed settings. New resident consents are required, and communities that have already signed new consents will move faster. There is no schedule buffer on Gen 4, and Gen 3 port resourcing and sequencing are still TBD.",
    askLead: "Ask:",
    songTitle: "Light Up Inspiren",
    songSub: "This issue's theme song.",
    songSrc: "assets/light-up-inspiren.mp3",
    ask: "if you have a corpus of stored AUGi Gen 3 or Gen 4 audio, ping #eng-audio. Model training and tuning for the front end needs it.",
    asks: [
      { lead: "Ask:", icon: "mic", body: "if you have a corpus of stored AUGi Gen 3 or Gen 4 audio, ping #eng-audio. Model training and tuning for the front end needs it." },
      { lead: "Ask:", icon: "sparkle", body: "anytime you solve a complex problem that might be worthy of intellectual property protection, consider pinging @colby to discuss the new IP Claude skills. More info coming soon." },
    ],
  },
};
