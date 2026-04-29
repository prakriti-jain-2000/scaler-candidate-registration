import { motion } from "framer-motion";
import scalerLogo from "@/assets/scaler-logo.svg";


const words = ["Turn", "conversations", "into", "careers."];

const steps = [
  { num: 1, title: "Apply", desc: "Fill a 3-minute form. Tell us about yourself.", badge: null as string | null },
  { num: 2, title: "Dashboard access", desc: "Get instant access to training material and the assessment guide.", badge: null },
  { num: 3, title: "AI based assessment", desc: "Sell to our AI — it listens, scores, and sharpens your pitch. 4 shots. Best one counts.", badge: "AI-native" },
  { num: 4, title: "Interview rounds", desc: "1:1 with a BDM, then an AVP. Structured, fair, two-way.", badge: null },
  { num: 5, title: "Offer", desc: "Receive your offer letter and join the team.", badge: null },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-16 overflow-hidden hero-dark">
      {/* Aurora + drifting starfield (constellation network is global) */}
      <div className="aurora" />
      <div className="starfield" />

      {/* Soft mesh blobs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-mesh" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-scaler-blue/15 blur-[120px] animate-mesh" style={{ animationDelay: "-7s" }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Powered by Scaler pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6"
        >
          <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-white/80">POWERED BY</span>
          <span className="w-px h-5 bg-white/20" />
          <img src={scalerLogo} alt="Scaler School of Technology" className="h-5 w-auto brightness-0 invert" />
        </motion.div>

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 mb-8 ml-0 md:ml-3"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-white">Now hiring · FY26 · AI-first EdTech</span>
        </motion.div>

        {/* Event label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-gradient-orange mb-4"
        >
          India's Biggest MEGA AI Hackathon
        </motion.p>

        {/* Main heading - word by word */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          {words.map((word, i) => {
            const isAccent = word === "careers.";
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
          Join Scaler — one of India's leading EdTech platforms. We are building for an AI-first world and empowering learners with future-ready skills, and we are looking for people who can help tell that story.
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
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-sm font-medium text-white"
            >
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* How it works - inline in hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="w-full max-w-5xl mx-auto mb-12"
        >
          {/* Desktop horizontal */}
          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-border">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
                className="h-full bg-primary origin-left"
              />
            </div>
            {steps.map((step) => (
              <div key={step.num} className="relative flex flex-col items-center text-center w-1/5">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-4 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                {step.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold mb-1">
                    {step.badge}
                  </span>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden space-y-0 text-left">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-border my-2" />}
                </div>
                <div className="pb-6">
                  <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                  {step.badge && (
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold mt-1">
                      {step.badge}
                    </span>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
