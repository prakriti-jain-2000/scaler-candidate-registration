import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import photo1 from "@/assets/life/photo-1.jpeg";
import photo2 from "@/assets/life/photo-2.jpeg";
import photoBlr from "@/assets/life/photo-blr.jpeg";
import photoHyd from "@/assets/life/photo-hyd.jpg";
import photoGurgaonPark from "@/assets/life/photo-gurgaon-park.jpg";
import photoBadminton from "@/assets/life/photo-badminton.jpeg";
import photoGurgaonEvent from "@/assets/life/photo-gurgaon-event.jpeg";
import photoTeam from "@/assets/life/photo-team.jpeg";

const TEAL = "hsl(220 100% 50%)";

const photos = [
  { src: photoBlr, label: "Bangalore HQ", h: 280 },
  { src: photo1, label: "Team Offsite — Belur", h: 220 },
  { src: photoGurgaonEvent, label: "Gurugram Fireside", h: 280 },
  { src: photoHyd, label: "Sports Day", h: 220 },
  { src: photo2, label: "Sunrise Trek", h: 280 },
  { src: photoBadminton, label: "Friday Badminton", h: 220 },
  { src: photoGurgaonPark, label: "Gurugram Team Day", h: 280 },
  { src: photoTeam, label: "Hallway Conversations", h: 220 },
];

const news = [
  {
    publication: "Business Today",
    headline: "Upskilling start-up Scaler acquires Applied Roots for $50 mn",
    excerpt: "Scaler doubles down on advanced tech education with a landmark acquisition of Applied Roots.",
    url: "https://www.businesstoday.in/entrepreneurship/news/story/upksilling-start-up-scaler-acquires-applied-roots-for-50-mn-324588-2022-03-03",
  },
  {
    publication: "ANI News",
    headline: "Scaler becomes India's first fully AI-native tech career platform",
    excerpt: "New research finds only 19% of engineers are truly AI-ready as Scaler reinvents the career platform from the ground up.",
    url: "https://www.aninews.in/news/business/scaler-becomes-indias-first-fully-ai-native-tech-career-platform-finds-only-19-of-engineers-are-truly-ai-ready20260416183113/",
  },
  {
    publication: "Careers360",
    headline: "IIM Tiruchirappalli & Scaler sign MoU for AI-MBA programs",
    excerpt: "A first-of-its-kind partnership bringing AI tools and industry-grade tech into management education.",
    url: "https://news.careers360.com/iim-tiruchirappalli-trichy-scaler-mou-ai-mba-management-courses-2025-industry-need-technology-tools",
  },
  {
    publication: "Times of India",
    headline: "Google for Startups & Scaler launch AI skilling program for Indian founders",
    excerpt: "An ambitious program to equip India's next wave of founders with cutting-edge AI capabilities.",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/google-for-startups-and-scaler-launch-ai-skilling-program-for-indian-founders/articleshow/125226668.cms",
  },
  {
    publication: "Times of India",
    headline: "Scaler Academy sets records in tech education — highest package INR 1.5 Cr",
    excerpt: "Scaler's professional learners land industry-leading offers, reshaping outcomes in tech education.",
    url: "https://timesofindia.indiatimes.com/scaler-academy-sets-records-in-tech-education-to-professionals-sees-highest-package-of-inr-1-5-cr/articleshow/82289759.cms",
  },
];

const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const CircuitDivider = () => (
  <div className="flex items-center justify-center my-20" aria-hidden>
    <svg width="100%" height="20" viewBox="0 0 800 20" preserveAspectRatio="none" className="max-w-3xl">
      <line x1="0" y1="10" x2="800" y2="10" stroke={TEAL} strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="120" cy="10" r="3" fill={TEAL} fillOpacity="0.5" />
      <circle cx="400" cy="10" r="4" fill={TEAL} fillOpacity="0.7" />
      <circle cx="680" cy="10" r="3" fill={TEAL} fillOpacity="0.5" />
    </svg>
  </div>
);

const LifeAtScalerSection = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Auto-scroll the photo strip slowly to the left
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      if (!paused && el) {
        el.scrollLeft += 0.4;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Sticky vertical label (desktop only) */}
      <div
        className="hidden lg:block absolute left-6 top-0 h-full pointer-events-none"
        aria-hidden
      >
        <div
          className="sticky top-1/2 -translate-y-1/2 text-xs tracking-[0.4em] font-semibold uppercase"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: TEAL,
            opacity: 0.7,
          }}
        >
          Life at Scaler
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Life</span>{" "}
              <span style={{ color: TEAL }}>at Scaler</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              We build hard things. We celebrate harder.
            </p>
            <div
              className="mx-auto mt-6 h-px w-32"
              style={{
                background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
                boxShadow: `0 0 12px ${TEAL}`,
              }}
            />
          </div>
        </Reveal>

        {/* BLOCK 1 — Featured Video */}
        <Reveal delay={0.1}>
          <div className="mt-16">
            <div className="mx-auto max-w-[900px]">
              {/* VIDEO PLACEHOLDER — replace src with YouTube/Vimeo embed URL */}
              <div
                className="relative w-full rounded-2xl overflow-hidden border"
                style={{
                  aspectRatio: "16 / 9",
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "hsla(220, 100%, 50%, 0.25)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Play video"
                    className="relative flex items-center justify-center w-20 h-20 rounded-full"
                    style={{
                      background: "hsla(220, 100%, 50%, 0.18)",
                      border: `1px solid ${TEAL}`,
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full animate-glow-pulse"
                      style={{ boxShadow: `0 0 24px ${TEAL}` }}
                    />
                    <Play className="w-8 h-8 ml-1" style={{ color: TEAL }} fill={TEAL} />
                  </button>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Inside Scaler: Culture, chaos, and code.
              </p>
            </div>
          </div>
        </Reveal>

        <CircuitDivider />

        {/* BLOCK 2 — Photo Gallery */}
        <Reveal delay={0.1}>
          <div>
            <div className="text-center mb-8">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: TEAL }}
              >
                Inside Scaler
              </span>
              <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                Moments from the floor
              </h3>
            </div>

            {/* PHOTO PLACEHOLDERS — replace card backgrounds with actual image URLs */}
            <div
              ref={stripRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="flex gap-5 overflow-x-auto pb-6 px-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                alignItems: "center",
              }}
            >
              {[...photos, ...photos].map((p, i) => (
                <div
                  key={i}
                  className="group shrink-0 w-[260px] rounded-xl border flex flex-col justify-end transition-all duration-300"
                  style={{
                    height: p.h,
                    background:
                      "radial-gradient(circle at 1px 1px, hsla(220, 100%, 50%, 0.18) 1px, transparent 0) 0 0 / 18px 18px, rgba(255,255,255,0.03)",
                    borderColor: "hsla(220, 100%, 50%, 0.22)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 0 16px hsla(220, 100%, 50%, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 opacity-30" style={{ color: TEAL }} />
                  </div>
                  <div className="px-4 py-3 border-t" style={{ borderColor: "hsla(220, 100%, 50%, 0.18)" }}>
                    <p className="text-sm text-white/90 font-medium">{p.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  border: `1px solid ${TEAL}`,
                  color: TEAL,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsla(220, 100%, 50%, 0.15)";
                  e.currentTarget.style.boxShadow = "0 0 16px hsla(220, 100%, 50%, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View All Photos <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <CircuitDivider />

        {/* BLOCK 3 — Scaler in the News */}
        <Reveal delay={0.1}>
          <div>
            <div className="text-center mb-10">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: TEAL }}
              >
                Press & Media
              </span>
              <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                Scaler in the News
              </h3>
            </div>

            {/* NEWS PLACEHOLDERS — replace with real article headlines, logos, and URLs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((n, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <article
                    className="h-full rounded-2xl p-6 flex flex-col transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid hsla(220, 100%, 50%, 0.22)",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 0 24px hsla(220, 100%, 50%, 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="h-10 w-32 rounded-md mb-5 flex items-center justify-center text-[10px] tracking-widest text-white/50"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      PUBLICATION LOGO
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug">
                      {n.headline}
                    </h4>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {n.excerpt}
                    </p>
                    <a
                      href="#"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: TEAL }}
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LifeAtScalerSection;
