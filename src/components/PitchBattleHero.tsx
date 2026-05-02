import heroImage from "@/assets/pitch-battle-hero.jpeg";

const PitchBattleHero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
    >
      {/* Image as a natural block — zero cropping, zero letterbox */}
      <img
        src={heroImage}
        alt="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="relative z-10 w-full h-auto block"
      />

      {/* Overlay link aligned with the baked-in 'Already applied?' text */}
      <a
        href="https://candidate-dashboard-campus.lovable.app/login"
        className="absolute top-0 right-0 h-[18%] w-[28%] z-20"
        aria-label="Already applied? Check status"
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default PitchBattleHero;
