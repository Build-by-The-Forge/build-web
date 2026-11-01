import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "/downloads/BUILD.apk";
const WHATSAPP_URL = "https://wa.me/2349160651088";

export default function NotFound() {
  return (
    <>
      {/* Ambient Cosmic Background */}
      <div
        id="bg"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 20%, rgba(31, 95, 255, 0.28), transparent 75%), linear-gradient(180deg, #09132e 0%, #030712 100%)",
        }}
      />
      <div id="stars" className="drifting" style={{ opacity: 0.55 }} />

      {/* Technical HUD Frame */}
      <div className="hud" aria-hidden="true">
        <i className="tl" />
        <i className="tr" />
        <i className="bl" />
        <i className="br" />
        <div className="hud-meta hud-tl">
          <span className="hud-dot" style={{ background: "#ef4444", boxShadow: "0 0 10px #ef4444" }} />
          <span>ERR // ROUTE_DESYNC</span>
        </div>
        <div className="hud-meta hud-tr">
          <span>CODE // 404_PAGE_NOT_FOUND</span>
        </div>
      </div>

      <div className="err-page">
        {/* Top Header */}
        <header className="err-nav">
          <Link
            href="/"
            className="logo"
            style={{
              position: "relative",
              opacity: 1,
              pointerEvents: "auto",
              transform: "none",
            }}
          >
            <i className="mk2" />
            <span>BUILD</span>
            <em className="logo-tag">AI</em>
          </Link>

          <div className="pills">
            <Link href="/" className="pill-web">
              Campus Home
            </Link>
            <Link href="/#download" className="pill-cta">
              Get App ↓
            </Link>
          </div>
        </header>

        {/* Center Card */}
        <main className="err-main">
          <div className="err-aura" aria-hidden="true" />

          <div className="err-badge">
            <span className="err-dot" />
            <span>ERROR 404 // UNRESOLVED LECTURE ROUTE</span>
          </div>

          <div className="err-number-wrap">
            <div className="err-number">404</div>
          </div>

          <h1 className="err-h2">You’ve stepped outside the syllabus.</h1>

          <p className="err-desc">
            The course material, lecture note, or page you’re trying to reach doesn’t exist or has moved to a new coordinate. Don’t panic—your study progress is completely safe.
          </p>

          <div className="err-actions">
            <Link href="/" className="err-btn-primary">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Campus Home</span>
            </Link>

            <Link href="/#download" className="err-btn-secondary">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
              <span>Download BUILD</span>
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="err-btn-wa"
              title="Chat with support on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63a11.9 11.9 0 005.84 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.87h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.93 9.93 0 01-1.52-5.27c0-5.48 4.46-9.94 9.95-9.94 2.65 0 5.15 1.03 7.03 2.91a9.88 9.88 0 012.91 7.03c0 5.48-4.46 9.94-9.95 9.94zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="err-chips-title">Or explore popular sections:</div>
          <div className="err-chips">
            <Link href="/#stack">📚 Curriculum Stack</Link>
            <Link href="/#pillars">⏱ CBT Practice Mocks</Link>
            <Link href="/#campus-map">🏛 3D Campus Explorer</Link>
            <Link href="/#pricing">💳 Student Pricing</Link>
          </div>

          <div className="err-telemetry">
            <span>STATUS: 404_PAGE_NOT_FOUND</span>
            <span>·</span>
            <span>DIAGNOSTIC: UNMAPPED_COORDINATE</span>
            <span>·</span>
            <span>HOST: BUILD-AI</span>
          </div>
        </main>

        {/* Bottom Footer */}
        <footer className="err-footer">
          <span>© 2026 BUILD · Engineered for University Students.</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Support: 09160651088
            </a>
            <Link href="/">Home</Link>
          </div>
        </footer>
      </div>

      {/* Floating WhatsApp Contact Button */}
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
    </>
  );
}
