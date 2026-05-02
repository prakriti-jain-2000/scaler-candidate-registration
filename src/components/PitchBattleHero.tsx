import scalerLogo from "@/assets/scaler-logo.svg";

function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(2,11,30,0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxSizing: "border-box",
      }}
    >
      <a href="#" aria-label="Scaler" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={scalerLogo}
          alt="Scaler"
          style={{ height: "40px", width: "auto", filter: "brightness(0) invert(1)" }}
        />
      </a>
      <a
        href="#status"
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.7)",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Already applied? Check status →
      </a>
    </nav>
  );
}

/**
 * Animated tech-first hero illustration.
 * - Rotating circuit/orbit ring
 * - Glowing trophy core
 * - Orbiting electrons
 * - Hex grid scanlines
 * Fully SVG, GPU-friendly transforms only.
 */
function TechOrb() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "520px",
        aspectRatio: "1 / 1",
        margin: "0 auto",
      }}
    >
      {/* Soft glow halo */}
      <div
        style={{
          position: "absolute",
          inset: "8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(40,231,224,0.22) 0%, rgba(21,101,216,0.18) 35%, transparent 70%)",
          filter: "blur(20px)",
          animation: "orb-pulse 4s ease-in-out infinite",
        }}
      />

      <svg
        viewBox="0 0 400 400"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28E7E0" />
            <stop offset="50%" stopColor="#1565D8" />
            <stop offset="100%" stopColor="#28E7E0" />
          </linearGradient>
          <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5C842" />
            <stop offset="50%" stopColor="#E8A820" />
            <stop offset="100%" stopColor="#A07010" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#28E7E0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#28E7E0" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rotating dashed ring */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin-slow 30s linear infinite" }}>
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.5"
          />
        </g>

        {/* Mid rotating ring with arc segments */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin-rev 18s linear infinite" }}>
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeDasharray="60 30 20 40"
            opacity="0.7"
          />
          {/* Tick marks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 142;
            const y1 = 200 + Math.sin(angle) * 142;
            const x2 = 200 + Math.cos(angle) * 150;
            const y2 = 200 + Math.sin(angle) * 150;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#28E7E0"
                strokeWidth="1"
                opacity={i % 3 === 0 ? 0.9 : 0.3}
              />
            );
          })}
        </g>

        {/* Inner ring */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin-slow 12s linear infinite" }}>
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="#1565D8"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="320" cy="200" r="3" fill="#28E7E0" filter="url(#softGlow)" />
          <circle cx="80" cy="200" r="2" fill="#F5C842" filter="url(#softGlow)" />
        </g>

        {/* Orbiting electrons */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin-rev 8s linear infinite" }}>
          <circle cx="200" cy="40" r="4" fill="#28E7E0" filter="url(#softGlow)" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spin-slow 10s linear infinite" }}>
          <circle cx="200" cy="360" r="3" fill="#F5C842" filter="url(#softGlow)" />
        </g>

        {/* Core glow disk */}
        <circle cx="200" cy="200" r="90" fill="url(#coreGlow)" />

        {/* Hex tech accents */}
        <g opacity="0.4">
          <polygon
            points="200,90 220,100 220,120 200,130 180,120 180,100"
            fill="none"
            stroke="#28E7E0"
            strokeWidth="1"
          />
          <polygon
            points="200,270 220,280 220,300 200,310 180,300 180,280"
            fill="none"
            stroke="#28E7E0"
            strokeWidth="1"
          />
        </g>

        {/* Central trophy — pixel/tech inspired */}
        <g style={{ animation: "trophy-float 3.5s ease-in-out infinite" }}>
          {/* Base */}
          <rect x="170" y="245" width="60" height="6" rx="1" fill="url(#trophyGrad)" />
          <rect x="178" y="232" width="44" height="14" fill="url(#trophyGrad)" />
          {/* Stem */}
          <rect x="190" y="218" width="20" height="16" fill="#A07010" />
          {/* Cup body */}
          <rect x="160" y="160" width="80" height="60" rx="3" fill="url(#trophyGrad)" />
          <rect x="160" y="160" width="80" height="6" fill="#F8DC60" />
          {/* Handles */}
          <path
            d="M160 175 Q140 180 140 200 Q140 215 160 215"
            fill="none"
            stroke="url(#trophyGrad)"
            strokeWidth="6"
          />
          <path
            d="M240 175 Q260 180 260 200 Q260 215 240 215"
            fill="none"
            stroke="url(#trophyGrad)"
            strokeWidth="6"
          />
          {/* Star on trophy */}
          <polygon
            points="200,178 204,188 215,188 206,195 209,205 200,199 191,205 194,195 185,188 196,188"
            fill="#FFFFFF"
            opacity="0.95"
          />
          {/* Trophy top crown */}
          <rect x="178" y="148" width="44" height="12" rx="2" fill="#D4A020" />
        </g>

        {/* Connecting nodes */}
        <g opacity="0.7">
          <circle cx="60" cy="60" r="2.5" fill="#28E7E0" />
          <circle cx="340" cy="60" r="2.5" fill="#28E7E0" />
          <circle cx="60" cy="340" r="2.5" fill="#1565D8" />
          <circle cx="340" cy="340" r="2.5" fill="#1565D8" />
          <line x1="60" y1="60" x2="340" y2="340" stroke="#28E7E0" strokeWidth="0.5" opacity="0.2" />
          <line x1="340" y1="60" x2="60" y2="340" stroke="#28E7E0" strokeWidth="0.5" opacity="0.2" />
        </g>

        {/* Scanline */}
        <g style={{ animation: "scan-down 4s linear infinite" }}>
          <line
            x1="80"
            y1="200"
            x2="320"
            y2="200"
            stroke="#28E7E0"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>
      </svg>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes trophy-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes scan-down {
          0%   { transform: translateY(-90px); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(90px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function FirstFold() {
  return (
    <>
      <Navbar />
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          paddingTop: "72px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial accent layered over the global constellation bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(21,101,216,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 60%, rgba(40,231,224,0.10) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            minHeight: "calc(100vh - 72px)",
            padding: "40px 48px",
            boxSizing: "border-box",
            gap: "32px",
            flexWrap: "wrap",
          }}
          className="hero-row"
        >
          {/* LEFT — Animated Tech Orb */}
          <div
            style={{
              flex: "1 1 420px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            <TechOrb />
          </div>

          {/* RIGHT — Typography */}
          <div
            style={{
              flex: "1 1 480px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.32em",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #28E7E0)",
                }}
              />
              POWERED BY SCALER
            </div>

            {/* PITCH BATTLE — hi-tech typography */}
            <div style={{ position: "relative", marginBottom: "8px", display: "inline-block" }}>
              <h1
                style={{
                  fontSize: "clamp(56px, 8vw, 112px)",
                  fontWeight: 900,
                  lineHeight: 0.86,
                  letterSpacing: "-0.04em",
                  fontFamily: "'DM Sans', sans-serif",
                  margin: 0,
                  textTransform: "uppercase",
                  fontStyle: "italic",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    position: "relative",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #b8c8ff 60%, #6890ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 40px rgba(40,231,224,0.15)",
                  }}
                >
                  Pitch
                  <span
                    style={{
                      position: "absolute",
                      top: "0.03em",
                      right: "-0.18em",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "translate(100%, -6%) rotate(4deg)",
                      background: "linear-gradient(135deg, #1565D8 0%, #0A3FA0 100%)",
                      WebkitTextFillColor: "#fff",
                      color: "#fff",
                      fontSize: "0.2em",
                      fontWeight: 800,
                      fontStyle: "normal",
                      padding: "0.48em 0.68em",
                      borderRadius: "0.55em",
                      lineHeight: 1.05,
                      letterSpacing: "0.08em",
                      textAlign: "center",
                      boxShadow:
                        "0 8px 24px rgba(21,101,216,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                      border: "1px solid rgba(40,231,224,0.4)",
                    }}
                  >
                    FY
                    <br />
                    26
                  </span>
                </span>
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(180deg, #28E7E0 0%, #1565D8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 4px 24px rgba(40,231,224,0.35))",
                  }}
                >
                  Battle
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.28em",
                marginTop: "20px",
                fontFamily: "'DM Sans', sans-serif",
                textTransform: "uppercase",
              }}
            >
              India's Biggest Mega AI Hackathon
            </div>

            {/* Pills */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "22px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(40,231,224,0.25)",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                POWERED BY&nbsp;
                <strong style={{ color: "#28E7E0", letterSpacing: "0.12em" }}>SCALER</strong>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#1565D8",
                    boxShadow: "0 0 10px #1565D8",
                    display: "inline-block",
                  }}
                />
                Now hiring · FY26 · AI-first EdTech
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FirstFold;
