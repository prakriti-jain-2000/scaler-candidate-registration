import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    tag: "Fresher friendly",
    tagColor: "bg-scaler-green/15 text-scaler-green border-scaler-green/30",
    title: "Business Development Associate",
    ctc: "Competitive CTC + variable",
    eligibility: "2024 / 2025 MBA or BBA passout · No prior sales exp required",
    highlights: [
      { text: "Own the full sales cycle — from first call to enrolment" },
      { text: "Engage with working professionals exploring career transitions" },
      { text: "Work with AI-powered tools that make every rep more effective" },
      { text: "Fast track to Senior BDA within 6–9 months based on performance" },
    ],
    cta: "Apply for BDA →",
  },
];

const RolesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="roles" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            The Role
          </h2>
          <p className="text-lg text-muted-foreground">
            One mission. Built for fresh grads ready to own the sales floor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative card-surface rounded-2xl overflow-hidden group"
            >
              {/* Orange top accent */}
              <div className="h-1 bg-primary w-full" />

              <div className="p-6 md:p-8">
                {/* Tag */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${role.tagColor} mb-5`}>
                  {role.tag}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{role.title}</h3>

                <p className="text-2xl md:text-3xl font-extrabold text-primary mb-3">{role.ctc}</p>

                <p className="text-sm text-muted-foreground mb-6">{role.eligibility}</p>

                <div className="space-y-3 mb-8">
                  {role.highlights.map((h) => (
                    <div key={h.text} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{h.text}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {role.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
