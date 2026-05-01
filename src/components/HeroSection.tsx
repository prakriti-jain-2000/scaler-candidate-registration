import { motion } from "framer-motion";
import { Sparkles, Trophy, Users } from "lucide-react";

const steps = [
  { num: 1, title: "Apply", desc: "Fill a 3-minute form. Tell us about yourself.", badge: null as string | null },
  { num: 2, title: "Dashboard access", desc: "Get instant access to training material and the assessment.", badge: null },
  { num: 3, title: "AI based assessment", desc: "Sell to our AI — it listens, scores, and gives real-time feedback.", badge: "AI-native" },
  { num: 4, title: "Interview rounds", desc: "1:1 with a BDM, then an AVP. Structured, fair, two-way.", badge: null },
  { num: 5, title: "Offer", desc: "Receive your offer letter and join the team.", badge: null },
];

const pills = [
  { icon: <Sparkles className="w-4 h-4 text-primary" />, label: "AI-first culture" },
  { icon: <Trophy className="w-4 h-4 text-yellow-400" />, label: "Peak XV Partners (fka Sequoia India) backed" },
  { icon: <Users className="w-4 h-4 text-primary" />, label: "2026 Batch" },
];

const HeroSection = () => {
  return (
    <section className="relative px-6 pt-16 md:pt-20 pb-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Turn conversations into{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
            careers.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join Scaler — one of India's leading EdTech platforms. We are building for an
          AI-first world and empowering learners with future-ready skills, and we are
          looking for people who can help tell that story.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {pills.map((p) => (
            <div
              key={p.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 text-sm font-medium text-white"
            >
              {p.icon}
              <span>{p.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="w-full max-w-5xl mx-auto">
          {/* Desktop */}
          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-white/15">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-cyan-300 origin-left"
              />
            </div>
            {steps.map((step) => {
              const active = step.num === 3;
              return (
                <div key={step.num} className="relative flex flex-col items-center text-center w-1/5 px-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 relative z-10 ${
                      active
                        ? "bg-gradient-to-br from-cyan-300 to-teal-400 text-[#0a0f2c] shadow-[0_0_24px_hsl(180_80%_55%/0.55)]"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                  {step.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-300 font-semibold mb-1">
                      {step.badge}
                    </span>
                  )}
                  <p className="text-xs text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-0 text-left">
            {steps.map((step, i) => {
              const active = step.num === 3;
              return (
                <div key={step.num} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        active
                          ? "bg-gradient-to-br from-cyan-300 to-teal-400 text-[#0a0f2c]"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {step.num}
                    </div>
                    {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-white/15 my-2" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    {step.badge && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-300 font-semibold mt-1">
                        {step.badge}
                      </span>
                    )}
                    <p className="text-sm text-white/60 mt-1">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
