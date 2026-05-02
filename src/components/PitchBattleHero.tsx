import heroImage from "@/assets/pitch-battle-hero.jpeg";
import ParticleBackground from "@/components/ParticleBackground";

function HackathonBanner() {
  return (
    <img
      src={heroImage}
      alt="Scaler Pitch Battle — India's Biggest Mega AI Hackathon"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  );
}

const PitchBattleHero = () => {
  return (
    <section
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#020817",
      }}
    >
      {/* Constellation decorations — behind everything */}
      <ParticleBackground
        className="absolute left-0 top-0 w-80 h-full opacity-50 pointer-events-none"
        style={{ zIndex: 0 }}
        color="120,170,255"
        linkDistance={140}
        dotOpacity={0.7}
      />
      <ParticleBackground
        className="absolute right-0 top-0 w-80 h-full opacity-50 pointer-events-none"
        style={{ zIndex: 0 }}
        color="120,170,255"
        linkDistance={140}
        dotOpacity={0.7}
      />

      {/* The actual Pitch Battle image — fills full viewport */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HackathonBanner />
      </div>

      {/* Bottom gradient fade into SecondFold */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #020817)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default PitchBattleHero;
