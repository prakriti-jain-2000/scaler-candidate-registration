const HouseIcon = ({ size = 20, stroke = "#fff", strokeWidth = 2 }: { size?: number; stroke?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 20V7.5L12 3l8 4.5V20h-5V10.8l-6 3.4V20H4Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M9.5 11L12 9.5l2.5 1.5" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VoxelCube = ({ x, y, size = 14, palette = ["#1A5090", "#2A6EB8", "#0E3868"] }: { x: number; y: number; size?: number; palette?: [string, string, string] | string[] }) => (
  <g>
    <rect x={x} y={y} width={size} height={size * 0.35} fill={palette[1]} />
    <rect x={x} y={y + size * 0.35} width={size} height={size * 0.4} fill={palette[0]} />
    <rect x={x} y={y + size * 0.75} width={size} height={size * 0.25} fill={palette[2]} />
  </g>
);

const IllustrationScene = () => (
  <svg viewBox="0 0 340 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Background */}
    <rect width="340" height="400" fill="#020B1E" />
    <ellipse cx="153" cy="155" rx="128" ry="118" fill="#0A4FBF" opacity="0.18" />
    <ellipse cx="153" cy="155" rx="82" ry="78" fill="#1060D8" opacity="0.16" />
    <ellipse cx="170" cy="372" rx="155" ry="24" fill="#0A3080" opacity="0.2" />

    {/* Stars */}
    {[
      [30, 40], [310, 60], [60, 90], [290, 130], [20, 200], [320, 220], [40, 320], [300, 340],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.2 : 1.6} fill={i % 3 === 0 ? "#28E7E0" : "#fff"} opacity={0.85} />
    ))}

    {/* Floating voxel cubes */}
    <VoxelCube x={28} y={70} size={14} />
    <VoxelCube x={290} y={50} size={12} />
    <VoxelCube x={296} y={170} size={10} palette={["#0C8878", "#10B098", "#075048"]} />
    <VoxelCube x={20} y={180} size={11} />
    <VoxelCube x={42} y={282} size={9} palette={["#0C8878", "#10B098", "#075048"]} />
    <VoxelCube x={302} y={290} size={12} />
    <VoxelCube x={270} y={20} size={8} palette={["#0C8878", "#10B098", "#075048"]} />
    <VoxelCube x={50} y={20} size={9} />

    {/* Staircase — 6 steps, centered at x=154 */}
    {[
      { y: 348, w: 292, main: "#0A1C3C", top: "#152E58", h: 22 },
      { y: 322, w: 252, main: "#0B2044", top: "#163252", h: 22 },
      { y: 298, w: 208, main: "#0C244C", top: "#173658", h: 22 },
      { y: 276, w: 164, main: "#0D2854", top: "#183A60", h: 22 },
      { y: 255, w: 124, main: "#0E2C5C", top: "#193E68", h: 22 },
      { y: 235, w: 88, main: "#0F3064", top: "#1A4270", h: 22 },
    ].map((s, i) => (
      <g key={i}>
        <rect x={154 - s.w / 2} y={s.y} width={s.w} height={s.h} fill={s.main} />
        <rect x={154 - s.w / 2} y={s.y} width={s.w} height={5} fill={s.top} />
      </g>
    ))}

    {/* Trophy — centered at x=154 */}
    {/* Base platform */}
    <rect x="97" y="222" width="114" height="14" fill="#A07010" />
    <rect x="97" y="222" width="114" height="4" fill="#D4A020" />
    {/* Stem */}
    <rect x="129" y="192" width="50" height="32" fill="#A07010" />
    <rect x="129" y="192" width="50" height="5" fill="#D4A020" />
    {/* Cup lower body */}
    <rect x="87" y="134" width="134" height="60" rx="2" fill="#B07C10" />
    <rect x="87" y="134" width="134" height="9" fill="#E8B820" />
    <rect x="87" y="185" width="134" height="9" fill="#8A6008" />
    <rect x="87" y="143" width="14" height="42" fill="#8A6008" opacity="0.7" />
    <rect x="207" y="143" width="14" height="42" fill="#8A6008" opacity="0.7" />
    <rect x="103" y="146" width="102" height="3" fill="#F0C840" opacity="0.8" />
    {/* Cup upper body */}
    <rect x="97" y="96" width="114" height="42" rx="2" fill="#C08818" />
    <rect x="97" y="96" width="114" height="8" fill="#ECC020" />
    <rect x="97" y="130" width="114" height="8" fill="#906010" />
    {/* Cup rim */}
    <rect x="91" y="88" width="126" height="12" fill="#D09A18" />
    <rect x="91" y="88" width="126" height="4" fill="#F0C820" />
    {/* Cup opening top */}
    <rect x="103" y="68" width="102" height="24" fill="#6A4A08" />
    <rect x="103" y="68" width="102" height="6" fill="#C89010" />
    <rect x="103" y="84" width="102" height="8" fill="#3A2804" />

    {/* Left handle */}
    <rect x="55" y="138" width="34" height="46" fill="#9A7010" />
    <rect x="55" y="138" width="34" height="5" fill="#C89018" />
    <rect x="44" y="146" width="14" height="30" fill="#806008" />
    <rect x="44" y="146" width="14" height="4" fill="#A07810" />
    {/* Right handle */}
    <rect x="219" y="138" width="34" height="46" fill="#9A7010" />
    <rect x="219" y="138" width="34" height="5" fill="#C89018" />
    <rect x="250" y="146" width="14" height="30" fill="#806008" />
    <rect x="250" y="146" width="14" height="4" fill="#A07810" />

    {/* Icon face on cup */}
    <rect x="125" y="116" width="58" height="46" rx="3" fill="#0A2030" opacity="0.7" />
    <g transform="translate(140, 124) scale(1.17)">
      <path d="M4 20V7.5L12 3l8 4.5V20h-5V10.8l-6 3.4V20H4Z" stroke="#28E7E0" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M9.5 11L12 9.5l2.5 1.5" stroke="#28E7E0" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Sparkles above trophy */}
    <circle cx="120" cy="56" r="2" fill="#fff" />
    <circle cx="155" cy="44" r="2.5" fill="#28E7E0" />
    <circle cx="190" cy="58" r="2" fill="#fff" />
    <circle cx="170" cy="30" r="1.6" fill="#fff" opacity="0.8" />

    {/* Pixel Kid centered at x=245, standing on step (y top ~ 225) */}
    <g>
      {/* Shadow */}
      <ellipse cx="245" cy="232" rx="14" ry="2.5" fill="#000" opacity="0.4" />
      {/* Shoes */}
      <rect x="236" y="226" width="7" height="6" fill="#181828" />
      <rect x="236" y="226" width="7" height="2" fill="#2A2A40" />
      <rect x="247" y="226" width="7" height="6" fill="#181828" />
      <rect x="247" y="226" width="7" height="2" fill="#2A2A40" />
      {/* Legs */}
      <rect x="237" y="210" width="6" height="16" fill="#1A2660" />
      <rect x="247" y="210" width="6" height="16" fill="#1A2660" />
      <rect x="237" y="210" width="6" height="3" fill="#26367A" />
      <rect x="247" y="210" width="6" height="3" fill="#26367A" />
      {/* Body */}
      <rect x="234" y="190" width="22" height="22" fill="#CC1A1A" />
      <rect x="234" y="190" width="22" height="4" fill="#E02828" />
      <rect x="244" y="194" width="2" height="16" fill="#9A1010" opacity="0.6" />
      {/* Arms */}
      <rect x="228" y="192" width="6" height="16" fill="#CC1A1A" />
      <rect x="228" y="192" width="6" height="3" fill="#E02828" />
      <rect x="256" y="194" width="6" height="16" fill="#CC1A1A" />
      <rect x="256" y="194" width="6" height="3" fill="#E02828" />
      {/* Hands */}
      <rect x="228" y="208" width="6" height="5" fill="#C89068" />
      <rect x="256" y="210" width="6" height="5" fill="#C89068" />
      {/* Neck */}
      <rect x="241" y="186" width="8" height="5" fill="#C89068" />
      {/* Head */}
      <rect x="234" y="168" width="22" height="20" rx="3" fill="#D4946A" />
      {/* Hair */}
      <rect x="234" y="168" width="22" height="7" fill="#1A1010" />
      <rect x="234" y="168" width="6" height="16" fill="#1A1010" />
      {/* Eyes */}
      <rect x="240" y="178" width="3" height="3" fill="#101018" />
      <rect x="241" y="178" width="1" height="1" fill="#fff" />
      <rect x="249" y="178" width="3" height="3" fill="#101018" />
      <rect x="250" y="178" width="1" height="1" fill="#fff" />
      {/* Mouth */}
      <rect x="244" y="184" width="4" height="1.5" fill="#7A4030" />
    </g>

    {/* Motion trail dots — left of kid pointing toward trophy */}
    <circle cx="222" cy="200" r="2.4" fill="#28E7E0" opacity="0.9" />
    <circle cx="212" cy="201" r="1.8" fill="#28E7E0" opacity="0.6" />
    <circle cx="204" cy="202" r="1.2" fill="#28E7E0" opacity="0.35" />
  </svg>
);

const PitchBattleHero = () => {
  return (
    <section
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
      className="relative w-full"
      style={{ minHeight: "100vh", background: "#020B1E" }}
    >
      <div className="flex flex-col md:flex-row w-full" style={{ minHeight: "100vh" }}>
        {/* LEFT COLUMN — Illustration */}
        <div
          className="relative w-full md:w-[48%] flex items-center justify-center"
          style={{ paddingTop: "56px" }}
        >
          <div className="w-full" style={{ height: "min(100vh - 56px, 720px)" }}>
            <div className="w-full h-full md:h-full" style={{ height: "100%" }}>
              <div className="md:hidden" style={{ height: 280 }}>
                <IllustrationScene />
              </div>
              <div className="hidden md:block w-full h-full">
                <IllustrationScene />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Typography */}
        <div
          className="relative w-full md:w-[52%] flex flex-col justify-center"
          style={{
            paddingLeft: 20,
            paddingRight: 32,
            paddingTop: 80,
            paddingBottom: 40,
          }}
        >
          {/* FY26 badge */}
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 24,
              background: "#1565D8",
              color: "#fff",
              fontWeight: 900,
              fontSize: 14,
              padding: "6px 10px",
              borderRadius: 5,
              lineHeight: 1.3,
              textAlign: "center",
            }}
            aria-label="FY26"
          >
            <div>FY</div>
            <div>26</div>
          </div>

          {/* SCALER label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
              marginBottom: 6,
            }}
          >
            <HouseIcon size={13} stroke="#fff" strokeWidth={2} />
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#fff",
              }}
            >
              SCALER
            </span>
          </div>

          {/* PITCH */}
          <div
            style={{
              fontSize: "clamp(52px, 8vw, 92px)",
              fontWeight: 900,
              color: "#fff",
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-3px",
            }}
          >
            PITCH
          </div>
          {/* BATTLE */}
          <div
            style={{
              fontSize: "clamp(52px, 8vw, 92px)",
              fontWeight: 900,
              color: "#F5C842",
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-3px",
            }}
          >
            BATTLE
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.5)",
              marginTop: 14,
            }}
          >
            INDIA'S BIGGEST MEGA AI HACKATHON
          </div>

          {/* Pill badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 14,
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.06em",
              }}
            >
              POWERED BY <span style={{ color: "#28E7E0" }}>SCALER</span>
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#1565D8",
                  boxShadow: "0 0 8px #1565D8",
                  display: "inline-block",
                }}
              />
              Now hiring · FY26 · AI-first EdTech
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PitchBattleHero;
