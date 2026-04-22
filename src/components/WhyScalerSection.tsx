import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Trophy } from "lucide-react";

const stats = [
  { value: 1200, suffix: "+", label: "Companies hire from Scaler" },
  { value: 126, suffix: "%", label: "Average salary hike for learners" },
  { value: 710, prefix: "₹", suffix: "M", label: "Valuation (Peak XV Partners, Tiger Global backed)" },
  { value: 0, label: "Industry-best compensation and incentives", icon: "trophy" as const },
];

const culturePoints = [
  { title: "AI-native workflows", desc: "From lead scoring to pitch practice — AI isn't a buzzword here, it's the operating system." },
  { title: "Engineering-grade sales", desc: "We build internal tools most startups dream of. Data dashboards, real-time coaching, smart CRMs." },
  { title: "Learn like a founder", desc: "Weekly deep-dives, product walkthroughs, and direct access to leadership. Growth isn't optional." },
];

const CountUp = ({ target, prefix, suffix }: { target: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-primary">
      {`${prefix || ""}${count}${suffix || ""}`}
    </span>
  );
};

const WhyScalerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Why Scaler?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not a typical EdTech. We're a tech company that happens to be in education — and it shows in everything we build.
          </p>
        </motion.div>

        {/* Culture points */}
        <div className="grid md:grid-cols-3 gap-5 mb-16 mt-12">
          {culturePoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="card-surface rounded-2xl p-6"
            >
              <h3 className="text-base font-bold text-foreground mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} displayAs={stat.displayAs} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              quote: "Scaler being my first company gave me a lot of exposure to sales.",
              author: "BDA, Batch 2024",
            },
            {
              quote: "There is a leadership mindset here of not committing anything false to customers.",
              author: "Senior BDA, Batch 2023",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="card-surface rounded-2xl p-6 md:p-8 border-l-4 border-l-primary"
            >
              <p className="text-base md:text-lg italic text-foreground/90 mb-4">"{t.quote}"</p>
              <p className="text-sm text-muted-foreground">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyScalerSection;
