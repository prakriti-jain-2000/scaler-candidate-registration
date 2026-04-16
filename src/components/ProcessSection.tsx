import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: 1, title: "Apply", desc: "Fill a 3-minute form. Tell us about yourself.", badge: null },
  { num: 2, title: "Dashboard access", desc: "Get instant access to training material and the assessment guide.", badge: null },
  { num: 3, title: "AI Pitch Lab", desc: "Sell to our AI — it listens, scores, and sharpens your pitch. 4 shots. Best one counts.", badge: "AI-native" },
  { num: 4, title: "Interview rounds", desc: "1:1 with a BDM, then an AVP. Structured, fair, two-way.", badge: null },
  { num: 5, title: "Offer", desc: "Receive your offer letter and join the team.", badge: null },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Five steps from application to offer. The whole thing takes under 2 weeks.
          </p>
        </motion.div>

        {/* Desktop horizontal */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-primary origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="relative flex flex-col items-center text-center w-1/5"
            >
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
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex gap-4 relative"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {step.num}
                </div>
                {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-border my-2" />}
              </div>
              <div className="pb-8">
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                {step.badge && (
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold mt-1">
                    {step.badge}
                  </span>
                )}
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
