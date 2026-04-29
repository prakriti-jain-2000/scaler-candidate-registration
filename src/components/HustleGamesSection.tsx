import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    title: "The Anvil Hackathon",
    tag: "Hackathon",
    desc: "Forge real products in 48 hours. Build, break, and ship at Scaler School of Technology.",
    href: "https://unstop.com/hackathons/the-anvil-hackathon-ascent-scaler-school-of-technology-bengaluru-karnataka-1669632",
    accent: "from-primary/30 to-primary/5",
  },
  {
    title: "Ship to Scale",
    tag: "Build · Break · Bank",
    desc: "An ASCENT flagship — turn raw ideas into fundable, shippable products under pressure.",
    href: "https://unstop.com/events/ship-to-scale-build-break-bank-ascent-scaler-school-of-technology-bengaluru-karnataka-1679327",
    accent: "from-scaler-blue/30 to-scaler-blue/5",
  },
  {
    title: "Launchpad",
    tag: "Idea to Impact",
    desc: "Pitch, prototype, partner. From a napkin sketch to a real go-to-market in days.",
    href: "https://unstop.com/events/launchpad-from-idea-to-impact-ascent-scaler-school-of-technology-bengaluru-karnataka-1669644",
    accent: "from-scaler-green/30 to-scaler-green/5",
  },
];

const testimonials = [
  {
    quote: "Scaler being my first company gave me a lot of exposure to sales. The hustle here is unmatched.",
    author: "Revenue Associate, Batch 2025",
  },
  {
    quote: "There is a leadership mindset of not committing anything false to customers. That builds real trust.",
    author: "Senior RGA, Batch 2025",
  },
  {
    quote: "The hackathons and hustle games sharpened how I think on my feet. Every week feels like a sprint.",
    author: "RGA, Batch 2026",
  },
];

const HustleGamesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gradient-orange mb-4">
            Hustle Games · Hackathons · Live Events
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Where careers get forged.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From flagship hackathons to high-stakes pitch arenas — we don't lecture about hustle, we run it.
          </p>
        </motion.div>

        {/* Event cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {events.map((e, i) => (
            <motion.a
              key={e.title}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="group relative card-surface rounded-2xl overflow-hidden hover:border-primary/40 transition-all"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${e.accent} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl md:text-6xl font-extrabold text-foreground/90 tracking-tight text-center px-4 leading-none">
                    {e.title.split(" ")[0]}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-background/70 backdrop-blur border border-white/10 text-foreground">
                  {e.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground mb-1.5">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{e.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                  View on Unstop →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Highlight reel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Hustle Games · Highlight reel</h3>
            <p className="text-sm text-muted-foreground">Inside a Scaler hackathon weekend.</p>
          </div>
          <div className="card-surface rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PLP0qjz4U8-ZE4flbiMU8jL_hvYwfeCDS5"
                title="Scaler Hustle Games"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">From the floor.</h3>
            <p className="text-sm text-muted-foreground">Real words from people who've been on the field.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="card-surface rounded-2xl p-6 border-l-4 border-l-primary"
              >
                <p className="text-base italic text-foreground/90 mb-4 leading-relaxed">"{t.quote}"</p>
                <p className="text-xs text-muted-foreground font-semibold tracking-wide">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HustleGamesSection;
