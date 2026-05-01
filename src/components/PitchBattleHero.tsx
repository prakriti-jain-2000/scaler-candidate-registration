import heroImage from "@/assets/pitch-battle-hero.jpeg";

const PitchBattleHero = () => {
  return (
    <section
      className="relative w-screen min-h-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${heroImage})` }}
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
    >
      {/* Transparent overlay nav — branding is already baked into the image */}
      <a
        href="https://candidate-dashboard-campus.lovable.app/login"
        className="absolute top-4 right-4 md:top-6 md:right-8 z-20 text-[10px] md:text-sm text-white/0 hover:text-white/90 transition-colors"
      >
        Already applied? Check status →
      </a>
    </section>
  );
};

export default PitchBattleHero;
