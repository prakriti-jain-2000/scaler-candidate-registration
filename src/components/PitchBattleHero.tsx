function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 36px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(2,11,30,0.96)',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '0.16em', fontFamily: 'Inter, sans-serif' }}>SCALER</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20V7.5L12 3l8 4.5V20h-5V10.8l-6 3.4V20H4Z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
            <path d="M9.5 11L12 9.5l2.5 1.5" stroke="white" strokeWidth="1.8" fill="none"/>
          </svg>
        </div>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>By InterviewBit</span>
      </div>
      <a href="#status" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>
        Already applied? Check status →
      </a>
    </nav>
  );
}

function FirstFold() {
  return (
    <>
      <Navbar />
      <section style={{
        width: '100%',
        height: '100vh',
        background: '#020B1E',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '60px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* Constellation background dots */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <g opacity="0.45">
            <circle cx="80"  cy="120" r="1.5" fill="#28E7E0"/>
            <circle cx="240" cy="60"  r="1"   fill="#0A7CFF"/>
            <circle cx="420" cy="100" r="1.5" fill="#28E7E0"/>
            <circle cx="900" cy="80"  r="1"   fill="#0A7CFF"/>
            <circle cx="1100" cy="140" r="1.5" fill="#28E7E0"/>
            <circle cx="1360" cy="90" r="1"   fill="#0A7CFF"/>
            <circle cx="160" cy="400" r="1"   fill="#0A7CFF"/>
            <circle cx="1280" cy="600" r="1.5" fill="#28E7E0"/>
            <line x1="80"  y1="120" x2="240" y2="60"  stroke="#237CFF" strokeWidth="0.5" opacity="0.35"/>
            <line x1="240" y1="60"  x2="420" y2="100" stroke="#28E7E0" strokeWidth="0.5" opacity="0.3"/>
            <line x1="900" y1="80"  x2="1100" y2="140" stroke="#237CFF" strokeWidth="0.5" opacity="0.35"/>
            <line x1="1100" y1="140" x2="1360" y2="90" stroke="#28E7E0" strokeWidth="0.5" opacity="0.3"/>
          </g>
        </svg>

        {/* LEFT COLUMN — Scene */}
        <div style={{ flex: '0 0 48%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <svg viewBox="0 0 340 400" style={{ width: '90%', maxWidth: '480px', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
            <rect width="340" height="400" fill="#020B1E"/>
            {/* Glow halo behind trophy */}
            <ellipse cx="153" cy="155" rx="128" ry="118" fill="#0A4FBF" opacity="0.18"/>
            <ellipse cx="153" cy="155" rx="82"  ry="78"  fill="#1060D8" opacity="0.16"/>
            <ellipse cx="170" cy="375" rx="155" ry="24"  fill="#0A3080" opacity="0.2"/>
            {/* Stars */}
            <circle cx="20"  cy="22"  r="1"   fill="#fff" opacity="0.5"/>
            <circle cx="65"  cy="12"  r="0.8" fill="#adf" opacity="0.55"/>
            <circle cx="185" cy="18"  r="1.2" fill="#fff" opacity="0.4"/>
            <circle cx="292" cy="24"  r="0.8" fill="#adf" opacity="0.5"/>
            <circle cx="318" cy="58"  r="1"   fill="#fff" opacity="0.45"/>
            <circle cx="14"  cy="165" r="1"   fill="#7ef" opacity="0.4"/>
            {/* Floating cubes */}
            <rect x="12"  y="88"  width="18" height="18" fill="#1A5090" rx="2" opacity="0.85"/>
            <rect x="12"  y="88"  width="18" height="5"  fill="#2A6EB8" rx="1"/>
            <rect x="21"  y="106" width="9"  height="5"  fill="#0E3868" rx="1"/>
            <rect x="292" y="65"  width="22" height="22" fill="#1A5090" rx="2" opacity="0.8"/>
            <rect x="292" y="65"  width="22" height="6"  fill="#2A6EB8" rx="1"/>
            <rect x="303" y="87"  width="11" height="6"  fill="#0E3868" rx="1"/>
            <rect x="274" y="160" width="15" height="15" fill="#0C8878" rx="2" opacity="0.75"/>
            <rect x="274" y="160" width="15" height="5"  fill="#10B098" rx="1"/>
            <rect x="46"  y="46"  width="13" height="13" fill="#0C8878" rx="2" opacity="0.65"/>
            <rect x="308" y="198" width="12" height="12" fill="#1A5090" rx="1" opacity="0.6"/>
            <rect x="16"  y="228" width="11" height="11" fill="#0C8878" rx="1" opacity="0.55"/>
            {/* Staircase */}
            <rect x="8"   y="348" width="292" height="30" fill="#0A1C3C"/>
            <rect x="8"   y="348" width="292" height="5"  fill="#152E58"/>
            <rect x="28"  y="322" width="252" height="28" fill="#0B2044"/>
            <rect x="28"  y="322" width="252" height="5"  fill="#163252"/>
            <rect x="50"  y="298" width="208" height="26" fill="#0C244C"/>
            <rect x="50"  y="298" width="208" height="5"  fill="#173658"/>
            <rect x="72"  y="276" width="164" height="24" fill="#0D2854"/>
            <rect x="72"  y="276" width="164" height="5"  fill="#183A60"/>
            <rect x="92"  y="255" width="124" height="23" fill="#0E2C5C"/>
            <rect x="92"  y="255" width="124" height="5"  fill="#193E68"/>
            <rect x="110" y="235" width="88"  height="22" fill="#0F3064"/>
            <rect x="110" y="235" width="88"  height="5"  fill="#1A4270"/>
            {/* Trophy */}
            <rect x="97"  y="222" width="114" height="14" fill="#A07010" rx="1"/>
            <rect x="97"  y="222" width="114" height="4"  fill="#D4A020" rx="1"/>
            <rect x="129" y="192" width="50"  height="32" fill="#A07010"/>
            <rect x="129" y="192" width="50"  height="5"  fill="#D4A020"/>
            <rect x="87"  y="134" width="134" height="60" fill="#B07C10" rx="2"/>
            <rect x="87"  y="134" width="134" height="9"  fill="#E8B820" rx="2"/>
            <rect x="87"  y="185" width="134" height="9"  fill="#8A6008" rx="2"/>
            <rect x="87"  y="134" width="14"  height="60" fill="#7A5408" rx="1" opacity="0.45"/>
            <rect x="207" y="134" width="14"  height="60" fill="#7A5408" rx="1" opacity="0.45"/>
            <rect x="112" y="140" width="84"  height="8"  fill="#F0CC30" rx="1" opacity="0.55"/>
            <rect x="97"  y="96"  width="114" height="42" fill="#C08818" rx="2"/>
            <rect x="97"  y="96"  width="114" height="8"  fill="#ECC020" rx="2"/>
            <rect x="97"  y="130" width="114" height="8"  fill="#906010" rx="2"/>
            <rect x="91"  y="88"  width="126" height="12" fill="#D09A18" rx="2"/>
            <rect x="91"  y="88"  width="126" height="4"  fill="#F0C820" rx="2"/>
            <rect x="103" y="68"  width="102" height="24" fill="#6A4A08" rx="2"/>
            <rect x="103" y="68"  width="102" height="6"  fill="#C89010" rx="2"/>
            <rect x="55"  y="138" width="34"  height="46" fill="#9A7010" rx="2"/>
            <rect x="55"  y="138" width="34"  height="6"  fill="#D4A020" rx="2"/>
            <rect x="44"  y="146" width="14"  height="30" fill="#806008" rx="2"/>
            <rect x="219" y="138" width="34"  height="46" fill="#9A7010" rx="2"/>
            <rect x="219" y="138" width="34"  height="6"  fill="#D4A020" rx="2"/>
            <rect x="250" y="146" width="14"  height="30" fill="#806008" rx="2"/>
            <rect x="125" y="116" width="58"  height="46" fill="#0A2030" rx="3" opacity="0.75"/>
            <path d="M150 158 L150 145 L154 141 L158 145 L158 158 Z" fill="none" stroke="#28E7E0" strokeWidth="2"/>
            <path d="M145 146 L154 138 L163 146" fill="none" stroke="#28E7E0" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="151" y="151" width="6"   height="7"  fill="#28E7E0" rx="0.5" opacity="0.9"/>
            <circle cx="154" cy="58" r="3.5" fill="#F8D840" opacity="0.75"/>
            <circle cx="168" cy="52" r="2"   fill="#fff"    opacity="0.5"/>
            <circle cx="140" cy="54" r="1.8" fill="#F8D840" opacity="0.5"/>
            {/* Pixel kid */}
            <ellipse cx="245" cy="370" rx="19" ry="5" fill="#000" opacity="0.3"/>
            <rect x="230" y="352" width="15" height="8" fill="#181828" rx="1"/>
            <rect x="246" y="352" width="15" height="8" fill="#181828" rx="1"/>
            <rect x="232" y="320" width="13" height="34" fill="#1A2660" rx="1"/>
            <rect x="247" y="320" width="13" height="34" fill="#1A2660" rx="1"/>
            <rect x="227" y="279" width="38" height="44" fill="#CC1A1A" rx="1"/>
            <rect x="227" y="279" width="38" height="7"  fill="#E02828" rx="1"/>
            <rect x="212" y="281" width="16" height="30" fill="#CC1A1A" rx="1"/>
            <rect x="210" y="309" width="13" height="10" fill="#C89068" rx="1"/>
            <rect x="264" y="285" width="14" height="28" fill="#CC1A1A" rx="1"/>
            <rect x="239" y="269" width="14" height="12" fill="#C89068" rx="1"/>
            <rect x="227" y="239" width="38" height="32" fill="#D4946A" rx="3"/>
            <rect x="225" y="237" width="42" height="14" fill="#1A1010" rx="3"/>
            <rect x="223" y="242" width="8"  height="14" fill="#1A1010" rx="2"/>
            <rect x="231" y="253" width="7"  height="5"  fill="#1A0808" rx="1"/>
            <rect x="244" y="253" width="7"  height="5"  fill="#1A0808" rx="1"/>
            <rect x="232" y="254" width="2"  height="2"  fill="#fff"    rx="0.5" opacity="0.75"/>
            <rect x="245" y="254" width="2"  height="2"  fill="#fff"    rx="0.5" opacity="0.75"/>
            <circle cx="207" cy="355" r="2.5" fill="#28E7E0" opacity="0.4"/>
            <circle cx="197" cy="358" r="1.8" fill="#28E7E0" opacity="0.25"/>
            <circle cx="188" cy="361" r="1.2" fill="#28E7E0" opacity="0.15"/>
          </svg>
        </div>

        {/* RIGHT COLUMN — Text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '24px', paddingRight: '48px', position: 'relative', zIndex: 1 }}>
          {/* FY26 badge — top right of this column */}
          <div style={{ position: 'absolute', top: '0', right: '48px', background: '#1565D8', color: '#fff', fontSize: '14px', fontWeight: 900, padding: '7px 12px', borderRadius: '6px', lineHeight: 1.3, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
            FY<br/>26
          </div>
          {/* SCALER label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.18em', fontFamily: 'Inter, sans-serif', marginBottom: '8px', marginTop: '8px' }}>
            SCALER
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M4 20V7.5L12 3l8 4.5V20h-5V10.8l-6 3.4V20H4Z" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
              <path d="M9.5 11L12 9.5l2.5 1.5" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          {/* PITCH */}
          <div style={{ fontSize: 'clamp(58px, 7vw, 96px)', fontWeight: 900, color: '#ffffff', lineHeight: 0.88, letterSpacing: '-3px', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
            PITCH
          </div>
          {/* BATTLE */}
          <div style={{ fontSize: 'clamp(58px, 7vw, 96px)', fontWeight: 900, color: '#F5C842', lineHeight: 0.88, letterSpacing: '-3px', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
            BATTLE
          </div>
          {/* Tagline */}
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.26em', marginTop: '16px', fontFamily: 'Inter, sans-serif' }}>
            INDIA'S BIGGEST MEGA AI HACKATHON
          </div>
          {/* Pills */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', padding: '7px 18px', fontSize: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
              POWERED BY&nbsp;<strong style={{ color: '#28E7E0', letterSpacing: '0.1em' }}>SCALER</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', padding: '7px 18px', fontSize: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1565D8', display: 'inline-block' }}/>
              Now hiring · FY26 · AI-first EdTech
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FirstFold;
