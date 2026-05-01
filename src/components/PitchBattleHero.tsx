import trophy from "@/assets/pitch-battle-trophy.jpg";
import scalerLogo from "@/assets/scaler-logo.svg";

const PitchBattleHero = () => {
  return (
    <section className="relative w-screen h-screen overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Full-bleed background image */}
      <img
        src={trophy}
        alt="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
        draggable={false}
      />

      {/* Subtle dark gradient for header legibility */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

      {/* Overlay header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8">
        <div className="flex flex-col leading-tight">
          <img
            src={scalerLogo}
            alt="Scaler"
            className="h-7 md:h-9 w-auto brightness-0 invert drop-shadow-md"
          />
          <span className="text-[10px] md:text-xs text-white/80 mt-1 ml-0.5 drop-shadow">
            By InterviewBit
          </span>
        </div>
        <a
          href="https://candidate-dashboard-campus.lovable.app/login"
          className="text-xs md:text-sm text-white/90 hover:text-white transition-colors drop-shadow"
        >
          Already applied? Check status →
        </a>
      </header>
    </section>
  );
};

export default PitchBattleHero;
