import heroImage from "@/assets/pitch-battle-hero.jpeg";

const PitchBattleHero = () => {
  return (
    <section
      aria-label="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#020817",
      }}
    >
      <img
        src={heroImage}
        alt="Scaler Pitch Battle — India's Biggest MEGA AI Hackathon"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </section>
  );
};

export default PitchBattleHero;
