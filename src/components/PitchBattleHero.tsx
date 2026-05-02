import heroImage from "@/assets/pitch-battle-hero.jpeg";

const PitchBattleHero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 80px)" }}
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
    >
      {/* Pitch Battle image — fills full section, no cropping */}
      <img
        src={heroImage}
        alt="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-contain z-10"
        style={{ objectPosition: "center center" }}
      />

      {/* Overlay link aligned with the baked-in 'Already applied?' text */}
      <a
        href="https://candidate-dashboard-campus.lovable.app/login"
        className="absolute top-0 right-0 h-[18%] w-[28%] z-20"
        aria-label="Already applied? Check status"
      />

      {/* Bottom fade — blends into next section */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default PitchBattleHero;
