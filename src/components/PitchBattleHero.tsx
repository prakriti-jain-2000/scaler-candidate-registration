import heroImage from "@/assets/pitch-battle-hero.jpeg";

const PitchBattleHero = () => {
  return (
    <section
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
    >
      <img
        src={heroImage}
        alt="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
        style={{ display: "block", width: "100%", height: "auto" }}
      />
      {/* Overlay link aligned with the baked-in 'Already applied?' text */}
      <a
        href="https://candidate-dashboard-campus.lovable.app/login"
        className="absolute top-0 right-0 h-[10%] w-[28%] z-20"
        aria-label="Already applied? Check status"
      />
    </section>
  );
};

export default PitchBattleHero;
