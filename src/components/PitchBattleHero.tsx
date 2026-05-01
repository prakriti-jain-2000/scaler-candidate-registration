import trophy from "@/assets/pitch-battle-trophy.jpg";
import scalerLogo from "@/assets/scaler-logo.svg";

const PitchBattleHero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background gradient — deep navy like the reference */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_50%,hsl(220_90%_18%/0.9),transparent_60%),radial-gradient(ellipse_at_80%_60%,hsl(220_100%_25%/0.5),transparent_60%),linear-gradient(180deg,#03081f_0%,#050d2a_50%,#03081f_100%)]" />

      {/* Top bar / navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8">
        <div className="flex flex-col leading-tight">
          <img src={scalerLogo} alt="Scaler" className="h-7 md:h-9 w-auto brightness-0 invert" />
          <span className="text-[10px] md:text-xs text-white/70 mt-1 ml-0.5">By InterviewBit</span>
        </div>
        <a
          href="https://candidate-dashboard-campus.lovable.app/login"
          className="text-xs md:text-sm text-white/80 hover:text-white transition-colors"
        >
          Already applied? Check status →
        </a>
      </header>

      {/* FY26 stamp */}
      <div className="absolute top-6 md:top-10 right-6 md:right-12 z-20 hidden sm:flex">
        <div className="w-14 h-14 md:w-20 md:h-20 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg md:text-2xl tracking-tight border-2 border-white/20 shadow-lg rotate-3">
          <div className="text-center leading-none">
            <div>FY</div>
            <div>26</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-10 px-6 md:px-12 pb-10">
        {/* Left: trophy visual */}
        <div className="flex items-center justify-center">
          <img
            src={trophy}
            alt="Scaler Pitch Battle trophy"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto select-none drop-shadow-[0_0_60px_rgba(60,140,255,0.35)]"
            draggable={false}
          />
        </div>

        {/* Right: text */}
        <div className="flex flex-col items-start lg:items-start text-left">
          <div className="flex items-center gap-2 mb-3 md:mb-5">
            <img src={scalerLogo} alt="Scaler" className="h-6 md:h-8 w-auto brightness-0 invert" />
          </div>

          <h1 className="font-extrabold tracking-tight leading-[0.95] text-white">
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]">
              PITCH
            </span>
            <span
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] mt-1"
              style={{
                background: "linear-gradient(180deg,#ffd27a 0%,#f59e0b 60%,#b45309 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.4))",
              }}
            >
              BATTLE
            </span>
          </h1>

          <p className="mt-4 md:mt-6 text-sm md:text-lg font-semibold tracking-[0.2em] uppercase text-white/85">
            India's Biggest MEGA AI Hackathon
          </p>

          <div className="mt-5 md:mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-white/80">POWERED BY</span>
              <span className="w-px h-4 bg-white/20" />
              <div className="flex flex-col leading-tight">
                <img src={scalerLogo} alt="Scaler" className="h-3.5 md:h-4 w-auto brightness-0 invert" />
                <span className="text-[8px] md:text-[9px] text-white/60">By InterviewBit</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-white">Now hiring · FY26 · AI-first EdTech</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PitchBattleHero;
