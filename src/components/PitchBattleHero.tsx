import pitchBattle from "@/assets/pitch-battle.jpeg";

const PitchBattleHero = () => {
  return (
    <section className="relative pt-24 md:pt-28 pb-10 md:pb-14 px-4 md:px-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={pitchBattle}
            alt="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
};

export default PitchBattleHero;
