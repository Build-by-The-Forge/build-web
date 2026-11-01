import BulbCanvas from "@/components/BulbCanvas";
import ManifestoText from "@/components/ManifestoText";
import ScrollEngine from "@/components/ScrollEngine";

/**
 * Set NEXT_PUBLIC_APP_DOWNLOAD_URL and NEXT_PUBLIC_WEB_APP_URL (see .env.example)
 * to connect your mobile APK download and web application endpoints.
 */
const APP_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "/downloads/BUILD.apk";
const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL || "#download";
const WHATSAPP_URL = "https://wa.me/2349160651088";

export default function Home() {
  return (
    <>
      <div id="bg" />
      <div id="stars" />

      {/* Technical HUD Frame (fades out smoothly once past Hero) */}
      <div className="hud" aria-hidden="true">
        <i className="tl" />
        <i className="tr" />
        <i className="bl" />
        <i className="br" />
        <div className="hud-meta hud-tl">
          <span className="hud-dot" />
          <span>SYS // CAMPUS AI INTELLIGENCE</span>
        </div>
        <div className="hud-meta hud-tr">
          <span>SYS // OFFLINE-FIRST ENGINE v2.4</span>
        </div>
      </div>

      <nav aria-label="Primary">
        <div className="nav-left">
          <div className="circ">
            <button aria-label="Explore sections" title="Explore sections" data-go="stack">
              <svg viewBox="0 0 24 24">
                <path d="M5 8h14M5 12h10M5 16h14" />
              </svg>
            </button>
            <button aria-label="Pause or play star drift" title="Toggle ambient star drift" id="wave">
              <svg viewBox="0 0 24 24">
                <path d="M3 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0" />
              </svg>
            </button>
            <button aria-label="Jump to app download" title="Download or launch app" data-go="download">
              <svg viewBox="0 0 24 24" style={{ fill: "currentColor", stroke: "none" }}>
                <path d="M8 5l11 7-11 7z" />
              </svg>
            </button>
          </div>

          <a className="logo" href="#top" data-top>
            <i className="mk2" />
            <span>BUILD</span>
            <em className="logo-tag">AI</em>
          </a>
        </div>

        <div className="pills">
          <a href="#stack">Overview</a>
          <a href="#cards">Features</a>
          <a href="#pricing">Pricing</a>
          <a className="pill-web" href={WEB_APP_URL}>
            Web App <span>↗</span>
          </a>
          <a className="pill-cta" href="#download" data-go="download">
            Get App <span>↓</span>
          </a>
        </div>
      </nav>

      <BulbCanvas />

      <div className="heroWrap" id="top">
        <header className="hero" id="hero">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-aura" aria-hidden="true" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lady"
            id="moon"
            src="/lady.webp"
            alt="Smiling student holding a notebook"
          />

          <h1 className="word" id="word">
            BUILD
          </h1>

          <div className="lede">
            <div className="lede-badge">
              <span className="pulse-dot" />
              <span>AI STUDY COMPANION · FOR UNIVERSITY STUDENTS</span>
            </div>
            <p className="lede-text">
              Learn, practise and ask questions in one place, and keep going even when the network drops.
            </p>
            <div className="lede-chips">
              <span>Android APK</span>
              <span>Web App</span>
              <span>CBT Simulator</span>
              <span>3D Campus Map</span>
            </div>
          </div>

          <div className="cta-wrap">
            <a className="cta" href="#stack" data-go="stack">
              <span>SCROLL TO BUILD</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <div className="hero-quick-links">
              <a href={APP_URL} download>
                ↓ Download BUILD
              </a>
              <span>·</span>
              <a href={WEB_APP_URL}>Launch Web ↗</a>
            </div>
          </div>

          <div className="snd">
            <span className="snd-dot" />
            WORKS ON POOR CONNECTIVITY
          </div>
        </header>
      </div>

      <section id="stack" className="pad stack" data-t="pale" data-o="solid">
        <div className="item sec-intro">
          <p className="eyebrow">01 // Propositions</p>
          <h2>
            The Stack for
            <br />
            Studying Smarter
          </h2>
          <p className="lead-sub">
            Engineered around how Nigerian university students actually prepare for lectures, tests, and semester exams.
          </p>
        </div>

        <div className="item row scrolly-card">
          <div className="scrolly-head">
            <span className="step-num">01</span>
            <p className="eyebrow">Curriculum</p>
          </div>
          <h3>
            Built on
            <br />
            Your Courses
          </h3>
          <p className="copy">
            BUILD follows your department’s course structure, so every note, video and practice question sits under the topic it belongs to.
          </p>
          <div className="micro-ui">
            <div className="chip-row">
              <span className="ui-chip active">MTH 101 · Algebra &amp; Trig</span>
              <span className="ui-chip">PHY 101 · Mechanics</span>
              <span className="ui-chip">CSC 201 · Programming</span>
              <span className="ui-chip">GST 111</span>
            </div>
            <div className="ui-status-bar">
              <span>✓ Synced with departmental course outlines</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="pad pillars" data-t="blue" data-o="solid">
        <div className="item row scrolly-card">
          <div className="scrolly-head">
            <span className="step-num">02</span>
            <p className="eyebrow">Learn</p>
          </div>
          <h3>
            Read and Watch
            <br />
            in One Place
          </h3>
          <p className="copy">
            Course material, lecture videos and your own uploaded notes, searchable together with instant concept summaries.
          </p>
          <div className="micro-ui">
            <div className="chip-row">
              <span className="ui-chip">▤ Structured Reader</span>
              <span className="ui-chip">▶ Timestamped Video</span>
              <span className="ui-chip">⌕ Instant Search</span>
            </div>
          </div>
        </div>

        <div className="item row scrolly-card">
          <div className="scrolly-head">
            <span className="step-num">03</span>
            <p className="eyebrow">Practise</p>
          </div>
          <h3>
            CBT That Feels
            <br />
            Like the Exam
          </h3>
          <p className="copy">
            Timed questions that mirror how exams are set, with answers checked against the official marking scheme.
          </p>
          <div className="micro-ui">
            <div className="cbt-strip">
              <span className="cbt-timer">⏱ 44:12</span>
              <div className="cbt-pips">
                <i className="done">1</i>
                <i className="done">2</i>
                <i className="done">3</i>
                <i className="curr">4</i>
                <i>5</i>
                <i>6</i>
              </div>
              <span className="cbt-tag">Marking Scheme Verified</span>
            </div>
          </div>
        </div>

        <div className="item row scrolly-card">
          <div className="scrolly-head">
            <span className="step-num">04</span>
            <p className="eyebrow">Transparency</p>
          </div>
          <h3>
            A Tutor That
            <br />
            Shows Its Sources
          </h3>
          <p className="copy">
            Answers come from verified academic material first. When BUILD isn’t sure, it says so—never hallucinating formulas.
          </p>
          <div className="micro-ui">
            <div className="citation-box">
              <span className="cite-badge">SOURCE VERIFIED</span>
              <span className="cite-text">Lecture Module 4 · Stress &amp; Strain, p. 14</span>
            </div>
          </div>
        </div>

        <div className="item row scrolly-card">
          <div className="scrolly-head">
            <span className="step-num">05</span>
            <p className="eyebrow">Collaboration</p>
          </div>
          <h3>
            Study With
            <br />
            Your Coursemates
          </h3>
          <p className="copy">
            Group chats, a departmental leaderboard and shared past questions, all inside the app.
          </p>
          <div className="micro-ui">
            <div className="chip-row">
              <span className="ui-chip">💬 Course Study Rooms</span>
              <span className="ui-chip">🏆 Weekly Leaderboard</span>
              <span className="ui-chip">📄 Past Questions Vault</span>
            </div>
          </div>
        </div>
      </section>

      <section id="offline" className="pad wire" data-t="black" data-o="wire">
        <div className="item offline-wrap">
          <div className="card">
            <div className="card-top">
              <div className="mk mk2" />
              <div className="net-pill">
                <span className="net-dot" />
                <span>OFFLINE-FIRST ARCHITECTURE</span>
              </div>
            </div>

            <div>
              <p className="eyebrow">Built for Campus Reality</p>
              <h3>
                Learning for Everyone,
                <br />
                <span>Engineered for Weak Networks.</span>
              </h3>
              <p className="offline-desc">
                Hostel network down? Lecture hall signal weak? Download your courses once and keep reading, practising CBT, and navigating campus without burning data.
              </p>
            </div>

            <div className="offline-grid">
              <div className="off-item">
                <b>Cached Course Packs</b>
                <small>Notes &amp; past questions stay on device</small>
              </div>
              <div className="off-item">
                <b>Offline CBT Engine</b>
                <small>Full mock exams with zero internet</small>
              </div>
              <div className="off-item">
                <b>Smart Sync Queue</b>
                <small>Progress syncs the moment 2G/3G returns</small>
              </div>
              <div className="off-item">
                <b>Bundled Campus Map</b>
                <small>1,200+ campus buildings stored locally</small>
              </div>
            </div>
          </div>

          <div className="btns">
            <a className="btn" href="#cards" data-go="cards">
              Explore features <i>→</i>
            </a>
            <a className="btn o" href="#download" data-go="download">
              Get Android &amp; Web App
            </a>
            <a className="btn o" href="#pricing" data-go="pricing">
              See pricing
            </a>
          </div>
        </div>
      </section>

      <section id="mani" className="pad mani" data-t="mani" data-o="none">
        <div className="in">
          <div className="mani-frame">
            <p className="eyebrow">Why BUILD</p>
            <ManifestoText />
            <div className="mani-foot">
              <span>DESIGNED FOR UNIVERSITY EXCELLENCE</span>
              <span>LEARN · PRACTISE · EXCEL</span>
            </div>
          </div>
        </div>
      </section>

      <section id="list" className="pad list" data-t="pale2" data-o="explode">
        <div className="list-header item">
          <p className="eyebrow">02 // Architecture</p>
          <h2>Designed for academic precision.</h2>
        </div>

        <div className="item list-card">
          <div className="list-icon">
            <svg viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="20" />
              <path d="M8 28h40M28 8c10 12 10 28 0 40M28 8c-10 12-10 28 0 40" />
            </svg>
          </div>
          <div>
            <span className="list-tag">01 · VERIFIED RETRIEVAL</span>
            <h4>Grounded in evidence</h4>
            <p>
              Every answer points back to retrieved lecture material and textbooks, so you can verify the exact page before you trust it.
            </p>
          </div>
        </div>

        <div className="item list-card">
          <div className="list-icon">
            <svg viewBox="0 0 56 56">
              <rect x="10" y="10" width="36" height="36" rx="6" />
              <path d="M10 28h36M28 10v36" />
            </svg>
          </div>
          <div>
            <span className="list-tag">02 · SYLLABUS GRAPH</span>
            <h4>Connected to your curriculum</h4>
            <p>
              Topics, lecture videos and past questions link directly back to the official course outline your department follows.
            </p>
          </div>
        </div>

        <div className="item list-card">
          <div className="list-icon">
            <svg viewBox="0 0 56 56">
              <path d="M6 42l14-16 10 8 20-24" />
              <path d="M6 50h44" />
            </svg>
          </div>
          <div>
            <span className="list-tag">03 · ADAPTIVE MASTERY</span>
            <h4>Personal to your progress</h4>
            <p>
              BUILD tracks your topic accuracy, speed and weak spots across mock tests, pointing you to what to revise next.
            </p>
          </div>
        </div>
      </section>

      <section id="cards" className="pad cards" data-t="pale2" data-o="none">
        <div className="cards-header">
          <div>
            <p className="eyebrow">03 // What’s inside</p>
            <h2>
              Everything for
              <br />
              the semester
            </h2>
          </div>
          <p className="cards-sub">
            One unified workspace across Android and Web—replacing scattered PDFs, WhatsApp past-question screenshots, and generic AI chats.
          </p>
        </div>

        <div className="grid bento-grid">
          {/* Bento Tile 1: CBT Practice */}
          <div className="tile bento-wide">
            <div className="tile-top">
              <small>01 // Practise</small>
              <span className="tile-pill">Exam Ready</span>
            </div>
            <div className="bento-preview cbt-preview">
              <div className="mock-bar">
                <span>QUESTION 07 OF 20 · MTH 101</span>
                <span className="mock-timer">⏱ 44:12</span>
              </div>
              <p className="mock-q">
                Which function describes BUILD AI’s adaptive CBT difficulty scaling?
              </p>
              <div className="mock-opts">
                <div className="mock-opt">
                  <span>A</span> End-of-semester static grading
                </div>
                <div className="mock-opt selected">
                  <span>B</span> Real-time topic mastery calibration <i>✓</i>
                </div>
              </div>
            </div>
            <div className="tile-foot">
              <b>CBT mode with instant, verified answers</b>
              <p>Timed mock tests with full step-by-step marking scheme breakdowns.</p>
            </div>
          </div>

          {/* Bento Tile 2: AI Tutor */}
          <div className="tile">
            <div className="tile-top">
              <small>02 // Ask</small>
              <span className="tile-pill">RAG Citations</span>
            </div>
            <div className="bento-preview chat-preview">
              <div className="chat-bubble user">Explain Bernoullis equation for MEE 203</div>
              <div className="chat-bubble ai">
                Conservation of energy in steady incompressible fluid flow:
                <span className="cite-pill">📄 Fluid Mechanics Note · p.22</span>
              </div>
            </div>
            <div className="tile-foot">
              <b>AI tutor that cites your course material</b>
              <p>Ask questions in plain English and jump straight to the source lecture slide.</p>
            </div>
          </div>

          {/* Bento Tile 3: Contribute & Study Groups */}
          <div id="study-groups" className="tile">
            <div className="tile-top">
              <small>03 // Contribute</small>
              <span className="tile-pill">Peer Network</span>
            </div>
            <div className="bento-preview group-preview">
              <div className="upload-row">
                <span className="up-icon">↑</span>
                <div>
                  <strong>PHY 102 Past Questions (2019–2025)</strong>
                  <span>Uploaded by 200L SEET · 142 upvotes</span>
                </div>
              </div>
              <div className="upload-row">
                <span className="up-icon">★</span>
                <div>
                  <strong>CHM 101 Organic Summary Sheet</strong>
                  <span>Verified by Course Rep · Offline Ready</span>
                </div>
              </div>
            </div>
            <div className="tile-foot">
              <b>Upload notes and past questions for your coursemates</b>
              <p>Earn reputation on your department leaderboard while helping the class excel.</p>
            </div>
          </div>

          {/* Bento Tile 4: 3D Campus Map */}
          <div id="campus-map" className="tile bento-wide">
            <div className="tile-top">
              <small>04 // Campus Explorer</small>
              <span className="tile-pill">2D / 3D Offline Map</span>
            </div>
            <div className="bento-preview map-preview">
              <div className="map-pins">
                <span className="map-pin primary">📍 Central Lecture Theater · 300m</span>
                <span className="map-pin">🏛 University Library</span>
                <span className="map-pin">⚙ Engineering Complex</span>
                <span className="map-pin">💻 Science &amp; Computing Hub</span>
              </div>
              <div className="map-controls-bar">
                <span>Interactive Campus Explorer · 1,240+ Footprints</span>
                <span className="badge-3d">3D Tilt View</span>
              </div>
            </div>
            <div className="tile-foot">
              <b>Find lecture halls, labs and offices on the 3D campus map</b>
              <p>Interactive 2D/3D campus buildings, category filters and instant search—even offline.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="price" data-t="price" data-o="none">
        <div className="price-head">
          <p className="eyebrow">04 // Simple Student Pricing</p>
          <h2>
            Start free.
            <br />
            Stay for ₦1,000.
          </h2>
          <p className="sub">
            Your first month is completely free. After that, BUILD costs just ₦1,000 a month—less than ₦35 a day.
          </p>
          <div className="price-guarantees">
            <span>✓ First 30 days ₦0</span>
            <span>✓ Full university curriculum access</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>

        <div className="plans">
          <div className="plan">
            <div className="plan-top">
              <h3>Free month</h3>
              <p className="tg">Experience the full BUILD stack</p>
            </div>
            <div className="amt">
              ₦0<small>/ first 30 days</small>
            </div>
            <ul className="ft">
              <li>Full access for your first month</li>
              <li>Read course notes &amp; watch lecture videos</li>
              <li>Unlimited CBT practice &amp; AI tutor citations</li>
              <li>Offline 2D/3D campus explorer</li>
            </ul>
            <a className="btn2" href="#download" data-go="download">
              Start your free month
            </a>
          </div>

          <div className="plan hot">
            <span className="badge">Most Popular · After Trial</span>
            <div className="plan-top">
              <h3>Student Pro</h3>
              <p className="tg">Keep building through exams</p>
            </div>
            <div className="amt">
              ₦1,000<small>/ month (~₦33/day)</small>
            </div>
            <ul className="ft">
              <li>Everything from your free month</li>
              <li>Unlimited CBT mocks, AI tutor &amp; study groups</li>
              <li>Offline course pack downloads for weak networks</li>
              <li>Upload notes, share past questions &amp; flexible monthly billing</li>
            </ul>
            <a className="btn2" href="#download" data-go="download">
              Get started now →
            </a>
          </div>
        </div>
      </section>

      <section id="finale" className="finale" data-t="cta" data-o="none">
        <p className="eyebrow">Ready When You Are</p>
        <h2>Build your best semester.</h2>
        <p className="sub">
          From 100-level general courses to final-year projects, BUILD keeps your study materials, practice exams, and campus map in one place—on Mobile and Web.
        </p>

        <div className="fbtns">
          <a className="pbtn" id="download-btn-top" href={APP_URL} download>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
            </svg>
            <span>Download BUILD</span>
          </a>
          <a className="gbtn" id="web-btn-top" href={WEB_APP_URL}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            <span>Launch Web App</span>
          </a>
        </div>

        <div className="stage">
          <svg
            className="scene"
            viewBox="0 0 1100 470"
            role="img"
            aria-label="Friendly lightbulb mascot surrounded by a book, graduation cap, checklist and rewards"
          >
            <defs>
              <radialGradient id="glow" cx="50%" cy="38%" r="70%">
                <stop offset="0" stopColor="#fff6c2" />
                <stop offset=".6" stopColor="#ffd24a" />
                <stop offset="1" stopColor="#ffa81c" />
              </radialGradient>
            </defs>
            <circle cx="550" cy="300" r="232" fill="#0b1630" />
            <circle cx="550" cy="300" r="196" fill="#10265a" />
            <circle cx="550" cy="300" r="164" fill="#16398a" />
            <path d="M486 396Q492 428 500 440H600Q608 428 614 396Z" fill="#ffc93c" />
            <circle cx="550" cy="276" r="140" fill="url(#glow)" />
            <path d="M505 214q22-28 45 0t45 0" fill="none" stroke="#ff8a1a" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="508" cy="272" rx="36" ry="40" fill="#fff" />
            <ellipse cx="592" cy="272" rx="36" ry="40" fill="#fff" />
            <circle cx="503" cy="259" r="18" fill="#1a1205" />
            <circle cx="587" cy="259" r="18" fill="#1a1205" />
            <path d="M524 334Q550 358 576 334" fill="none" stroke="#1a1205" strokeWidth="8" strokeLinecap="round" />
            <rect x="498" y="436" width="104" height="36" rx="8" fill="#8f98ab" />
            <path d="M498 449h104M498 461h104" stroke="#5b6478" strokeWidth="5" />
            <circle cx="232" cy="150" r="82" fill="#5fa86b" />
            <circle cx="246" cy="138" r="78" fill="#bfeac4" />
            <path d="M190 138l56-28 56 28-56 28z" fill="#2a5236" />
            <path d="M212 154v28q34 20 68 0v-28" fill="none" stroke="#2a5236" strokeWidth="12" strokeLinejoin="round" />
            <path d="M302 138v34" stroke="#2a5236" strokeWidth="6" strokeLinecap="round" />
            <g transform="rotate(-9 175 410)">
              <rect x="92" y="332" width="170" height="150" rx="12" fill="#1f5fff" />
              <rect x="92" y="332" width="28" height="150" rx="10" fill="#0d3fb8" />
              <rect x="138" y="366" width="96" height="11" rx="5" fill="#fff" />
              <rect x="138" y="390" width="62" height="11" rx="5" fill="#ffffffaa" />
            </g>
            <path d="M392 392c-32-30-4-74 17-102 6 28 42 33 42 74 0 31-24 46-46 46-9 0-13-8-13-18z" fill="#ff5a1f" />
            <ellipse cx="414" cy="388" rx="12" ry="19" fill="#ffb7a3" />
            <path d="M742 92l66-14 40 36-52 52z" fill="#e63e9c" />
            <path d="M786 98l28-6-16 24z" fill="#ffc2e6" />
            <circle cx="900" cy="258" r="86" fill="#4fa7ff" />
            <circle cx="887" cy="248" r="80" fill="#a9d7ff" />
            <rect x="866" y="212" width="24" height="76" rx="5" fill="#2d7fd0" transform="rotate(42 878 250)" />
            <g transform="rotate(8 960 400)">
              <rect x="888" y="340" width="150" height="132" rx="16" fill="#fff6e4" />
              <path d="M910 376l10 10 18-20M910 414l10 10 18-20" fill="none" stroke="#2e9e55" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="950" y="372" width="62" height="9" rx="4" fill="#b9b2a0" />
              <rect x="950" y="410" width="48" height="9" rx="4" fill="#b9b2a0" />
            </g>
            <path d="M1010 150l10 32 32 10-32 10-10 32-10-32-32-10 32-10z" fill="#fff6e4" />
            <path d="M120 270l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" fill="#fff6e4" />
            <circle cx="70" cy="190" r="10" fill="#fff6e4" />
            <circle cx="1050" cy="72" r="10" fill="#fff6e4" />
          </svg>
        </div>
      </section>

      <footer id="foot" className="foot" data-t="foot" data-o="none">
        {/* Distribution Hub for Mobile APK & Web App */}
        <div className="hub-banner" id="download">
          <div className="hub-intro">
            <p className="eyebrow">05 // Download &amp; Access Hub</p>
            <h3>Get BUILD on Mobile &amp; Web.</h3>
            <p>
              Install the native Android APK for full offline access in lectures and hostels, or launch the Web App directly from your laptop or iPhone browser.
            </p>
            <div className="install-steps">
              <div className="inst-step">
                <span>01</span>
                <div>
                  <b>Download APK</b>
                  <small>Tap Download BUILD below (choose &ldquo;Keep&rdquo; if browser prompts).</small>
                </div>
              </div>
              <div className="inst-step">
                <span>02</span>
                <div>
                  <b>Allow Install</b>
                  <small>Open BUILD.apk and allow &ldquo;Install unknown apps&rdquo; once.</small>
                </div>
              </div>
              <div className="inst-step">
                <span>03</span>
                <div>
                  <b>Sign In &amp; Sync</b>
                  <small>Pick your university, department &amp; level—your courses load automatically.</small>
                </div>
              </div>
            </div>
          </div>

          <div className="dl">
            <h5>Choose Your Platform</h5>
            <p className="dlnote">
              <strong>v1.0 Release</strong> · Syncs seamlessly across your phone and laptop.
            </p>

            <a className="dlbtn" id="download-btn" href={APP_URL} download>
              <svg viewBox="0 0 24 24">
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
              <span>Download BUILD</span>
            </a>

            <div className="stores">
              <a className="store" href={WEB_APP_URL}>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </span>
                <span className="tx">
                  <small>Laptop, Desktop &amp; Mobile Browser</small>
                  <b>Launch Web App ↗</b>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="fgrid">
          <div className="fbrand">
            <a className="flogo" href="#top" data-top>
              <i className="mk2" />
              BUILD
            </a>
            <p>
              The AI study companion for university students—learn, practise, and excel anywhere, anytime.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <a href="#stack">Curriculum Stack</a>
            <a href="#pillars">Study &amp; CBT</a>
            <a href="#offline">Offline Mode</a>
            <a href="#cards">Bento Features</a>
          </div>
          <div>
            <h5>Access</h5>
            <a href={APP_URL} download>
              Download BUILD (APK)
            </a>
            <a href={WEB_APP_URL}>Launch Web App</a>
            <a href="#pricing">Student Pricing</a>
            <a href="#mani">Why BUILD</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Contact Us (WhatsApp)
            </a>
          </div>
          <div>
            <h5>Campus</h5>
            <a href="#campus-map">3D Campus Map</a>
            <a href="#study-groups">Department Study Groups</a>
            <a href="#top" data-top>
              Back to top ↑
            </a>
          </div>
        </div>

        <p className="fbig" aria-hidden="true">
          BUILD
        </p>

        <div className="fbar">
          <span>© 2026 BUILD · Engineered for University Students.</span>
          <div className="fbar-links">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp: 09160651088
            </a>
            <a href="#top" data-top>
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Contact Us Button */}
      <a
        className="whatsapp-float"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact BUILD team on WhatsApp (09160651088)"
        title="Chat with BUILD team on WhatsApp (09160651088)"
      >
        <span className="wa-icon-wrap">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63a11.9 11.9 0 005.84 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.87h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.93 9.93 0 01-1.52-5.27c0-5.48 4.46-9.94 9.95-9.94 2.65 0 5.15 1.03 7.03 2.91a9.88 9.88 0 012.91 7.03c0 5.48-4.46 9.94-9.95 9.94zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
          </svg>
          <span className="wa-dot" />
        </span>
        <span className="wa-label">Contact Us</span>
      </a>

      <ScrollEngine />
    </>
  );
}
