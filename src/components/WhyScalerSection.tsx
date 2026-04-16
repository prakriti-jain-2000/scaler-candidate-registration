import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 900, suffix: "+", label: "Companies hiring from Scaler" },
  { value: 126, suffix: "%", label: "Average salary hike for learners" },
  { value: 710, prefix: "₹", suffix: "M", label: "Valuation (Sequoia, Tiger Global backed)" },
  { value: 1, label: "in 5 IIT grads in our learner community", displayAs: "1 in 5" },
];

const CountUp = ({ target, prefix, suffix, displayAs }: { target: number; prefix?: string; suffix?: string; displayAs?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    if (displayAs) { setCount(target); return; }
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, displayAs]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-primary">
      {displayAs || `${prefix || ""}${count}${suffix || ""}`}
    </span>
  );
};

const WhyScalerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-extrabold text-foreground text-center mb-16"
        >
          Why Scaler?
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} displayAs={stat.displayAs} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto card-surface rounded-2xl p-6 md:p-8 border-l-4 border-l-primary"
        >
          <p className="text-lg italic text-foreground/90 mb-4">
            "This is the rare company where a sales role actually feels like a product role. You're not pushing — you're solving."
          </p>
          <p className="text-sm text-muted-foreground">— BDA, Batch 2024</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyScalerSection;
