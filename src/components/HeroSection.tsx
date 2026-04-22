import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

const words = ["Turn", "conversations", "into", "careers."];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-scaler-navy/20 blur-[120px] animate-mesh" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-mesh" style={{ animationDelay: "-7s" }} />
      </div>

      <ParticleBackground />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Now hiring · FY26 · AI-first EdTech</span>
        </motion.div>

        {/* Main heading - word by word */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          {words.map((word, i) => {
            const isAccent = word === "story.";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                className={`inline-block mr-2 md:mr-3 ${isAccent ? "text-gradient-orange" : "text-foreground"}`}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          At Scaler, we're preparing learners for an AI-first world — and we need sharp, driven people to bring that mission to every conversation. If you can sell a vision that actually changes careers, you belong here.
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            { label: "AI-first culture" },
            { label: "Peak XV Partners (fka Sequoia India) backed" },
            { label: "2026 Batch" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full card-surface text-sm font-medium text-foreground"
            >
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg glow-orange glow-orange-hover transition-all duration-300 hover:scale-105"
          >
            Apply now →
          </a>
          <a
            href="#roles"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            See how the process works ↓
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-primary animate-bounce-down" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
