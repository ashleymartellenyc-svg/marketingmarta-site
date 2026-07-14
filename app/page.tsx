"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MagneticButton from "@/components/MagneticButton";
import RotatingAsterisk from "@/components/decorative/RotatingAsterisk";
import DriftingShapes from "@/components/decorative/DriftingShapes";
import HeroAnimation from "@/components/HeroAnimation";
import ClientLogo from "@/components/ClientLogo";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const INNER = "max-w-[1400px] mx-auto px-6 md:px-8";

const caseStudies = [
  {
    slug: "simplywise",
    title: "SimplyWise",
    logo: "/logos/simplywise.png",
    accentColor: "#FAF6F0",
    summaryKey: "work.sw_summary" as const,
  },
  {
    slug: "awesome-maps",
    title: "Awesome Maps",
    logo: "/logos/awesome-maps.png",
    accentColor: "#FAF6F0",
    summaryKey: "work.am_summary" as const,
  },
  {
    slug: "abroadly",
    title: "Abroadly",
    logo: "/logos/abroadly.png",
    accentColor: "#0F1B3D",
    summaryKey: "work.ab_summary" as const,
  },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      setCount(Math.round(easeOut(elapsed) * target));
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function Stat1({ active }: { active: boolean }) {
  const locale = useLocale();
  const n = useCountUp(850, 700, active);
  return (
    <div className="text-center md:text-left">
      <div className="font-sans font-bold text-3xl md:text-4xl text-ink mb-2 leading-none">
        ${n}K+/mo
      </div>
      <p className="font-sans text-xs text-brown leading-snug max-w-[160px] mx-auto md:mx-0">
        {t("home.stat1Label", locale)}
      </p>
    </div>
  );
}

function Stat2({ active }: { active: boolean }) {
  const locale = useLocale();
  const n1 = useCountUp(4, 700, active);
  const n2 = useCountUp(5, 700, active);
  return (
    <div className="text-center md:text-left">
      <div className="font-sans font-bold text-3xl md:text-4xl text-ink mb-2 leading-none">
        {n1}–{n2}x
      </div>
      <p className="font-sans text-xs text-brown leading-snug max-w-[160px] mx-auto md:mx-0">
        {t("home.stat2Label", locale)}
      </p>
    </div>
  );
}

function Stat3({ active }: { active: boolean }) {
  const locale = useLocale();
  const a = useCountUp(41, 700, active);
  const b = useCountUp(58, 700, active);
  return (
    <div className="text-center md:text-left">
      <div className="font-sans font-bold text-3xl md:text-4xl text-ink mb-2 leading-none">
        {a}% &amp; {b}%
      </div>
      <p className="font-sans text-xs text-brown leading-snug max-w-[160px] mx-auto md:mx-0">
        {t("home.stat3Label", locale)}
      </p>
    </div>
  );
}

function Stat4({ active }: { active: boolean }) {
  const locale = useLocale();
  const n = useCountUp(1000, 700, active);
  return (
    <div className="text-center md:text-left">
      <div className="font-sans font-bold text-3xl md:text-4xl text-ink mb-2 leading-none">
        {n}+
      </div>
      <p className="font-sans text-xs text-brown leading-snug max-w-[160px] mx-auto md:mx-0">
        {t("home.stat4Label", locale)}
      </p>
    </div>
  );
}

// Each stat starts when previous finishes (~800ms intervals)
const STAT_OFFSETS = [0, 800, 1600, 2400];

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);
  const [vis, setVis] = useState([false, false, false, false]);
  const [active, setActive] = useState([false, false, false, false]);

  const resetAll = () => {
    setVis([false, false, false, false]);
    setActive([false, false, false, false]);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimKey((k) => k + 1);
        } else {
          resetAll();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (animKey === 0) return;
    resetAll();
    const timers: ReturnType<typeof setTimeout>[] = [];
    STAT_OFFSETS.forEach((base, i) => {
      timers.push(setTimeout(() => {
        setVis((v) => { const n = [...v]; n[i] = true; return n; });
        setActive((a) => { const n = [...a]; n[i] = true; return n; });
      }, base));
    });
    return () => timers.forEach(clearTimeout);
  }, [animKey]);

  const fade = (i: number) => ({
    opacity: vis[i] ? 1 : 0,
    transform: vis[i] ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 500ms ease, transform 500ms ease",
  });

  return (
    <section className="border-y border-brown/15 py-14">
      <div className={`${INNER} grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8`} ref={ref}>
        <div style={fade(0)}><Stat1 active={active[0]} /></div>
        <div style={fade(1)}><Stat2 active={active[1]} /></div>
        <div style={fade(2)}><Stat3 active={active[2]} /></div>
        <div style={fade(3)}><Stat4 active={active[3]} /></div>
      </div>
    </section>
  );
}

function LogoCard({ cs }: { cs: (typeof caseStudies)[0] }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex items-center justify-center mb-6">
      {!imgError ? (
        <ClientLogo
          src={cs.logo}
          alt={cs.title}
          hazeColor={cs.accentColor}
          width={620}
          height={240}
          maxHeight="220px"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-sans font-semibold text-lg text-brown/60 py-5">{cs.title}</span>
      )}
    </div>
  );
}

export default function Home() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? (href === "/" ? "/pl" : `/pl${href}`) : href;
  const heroFull = t("home.heroText", locale);
  const [heroPart1, heroPart2] = heroFull.split("\n");
  const heroWords1 = heroPart1.split(" ");
  const heroWords2 = heroPart2 ? heroPart2.split(" ") : [];

  return (
    <main>
      {/* Hero */}
      <section
        className={`relative py-20 md:py-28 ${INNER} overflow-hidden`}
        style={{ minHeight: "90vh" }}
      >
        <DriftingShapes />

        {/* Video — absolute, right side, behind text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "56%", zIndex: 0 }}
        >
          <HeroAnimation />
        </motion.div>

        {/* Text — in front of video */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-sans text-xs tracking-[0.22em] uppercase text-cherry mb-8 flex items-center gap-2"
          >
            <RotatingAsterisk size="text-xs" />
            {t("home.role", locale)}
          </motion.p>

          <h1 className="font-sans font-bold text-display-xl text-ink leading-tight mb-8">
            <span className="block md:max-w-[75%]">
              {heroWords1.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.22em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            {heroWords2.length > 0 && (
              <span className="block md:max-w-[65%]">
                {heroWords2.map((word, i) => (
                  <motion.span
                    key={`b${i}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + (heroWords1.length + i) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.22em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.85 }}
            className="font-sans text-base md:text-lg text-brown max-w-xl mb-12 leading-relaxed"
          >
            {t("home.subtext", locale)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="flex flex-wrap items-center gap-5"
          >
            <MagneticButton
              href={lp("/contact")}
              className="inline-flex items-center whitespace-nowrap px-7 py-3.5 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-ink transition-colors duration-200"
            >
              {t("nav.getInTouch", locale)} →
            </MagneticButton>
            <Link
              href={lp("/work")}
              className="font-sans text-sm font-medium text-ink border-b border-brown/40 pb-px hover:border-cherry hover:text-cherry transition-colors duration-200"
            >
              {t("home.ctaSeeWork", locale)}
            </Link>
          </motion.div>
        </div>

        {/* Mobile video — in flow, below CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="block md:hidden mt-8 -mx-6"
        >
          <HeroAnimation />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Featured Work */}
      <section className={`py-24 ${INNER}`}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="font-sans font-semibold text-display-md text-ink mb-16"
        >
          {t("home.selectedWork", locale)}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={lp(`/work/${cs.slug}`)} className="group block">
                <LogoCard cs={cs} />
                <h3 className="font-sans font-semibold text-xl text-ink mb-3 group-hover:text-cherry transition-colors duration-200">
                  {cs.title}
                </h3>
                <p className="font-sans text-sm text-brown/80 leading-relaxed mb-5">
                  {t(cs.summaryKey, locale)}
                </p>
                <span className="inline-block font-sans text-xs font-medium text-cherry tracking-wide border-b border-cherry/30 pb-px group-hover:border-cherry transition-colors duration-200">
                  {t("common.readCaseStudy", locale)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 border-t border-brown/15">
        <div className={INNER}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-ink rounded-sm p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div>
              <p className="font-sans font-semibold text-2xl text-cream mb-3 leading-snug">
                {t("home.openTo", locale)}
              </p>
            </div>
            <MagneticButton
              href={lp("/contact")}
              className="shrink-0 inline-flex items-center whitespace-nowrap px-7 py-3.5 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-cream hover:text-ink transition-colors duration-200"
            >
              {t("common.getInTouch", locale)}
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
