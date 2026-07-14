"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AutoScrollCarousel, { CarouselItem } from "@/components/AutoScrollCarousel";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const abroadlyCreatives: CarouselItem[] = [
  { type: "static", src: "/videos/abroadly-1.png" },
  { type: "video",  src: "/videos/abroadly-5.mp4" },
  { type: "static", src: "/videos/abroadly-2.png" },
  { type: "static", src: "/videos/abroadly-3.png" },
  { type: "static", src: "/videos/abroadly-4.png" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

function MetaDot() {
  return <span className="text-cherry mx-2 select-none">·</span>;
}

export default function AbroadlyPage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;

  const approach = [
    t("abroadly.approach1", locale),
    t("abroadly.approach2", locale),
    t("abroadly.approach3", locale),
    t("abroadly.approach4", locale),
  ];

  const stats = [
    { number: "41%", label: t("abroadly.stat1Label", locale) },
    { number: "58%", label: t("abroadly.stat2Label", locale) },
    { number: "↑",   label: t("abroadly.stat3Label", locale) },
  ];

  return (
    <main>
      <article className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-20">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-12">
          <Link href={lp("/work")} className="font-sans text-xs tracking-[0.15em] uppercase text-brown hover:text-cherry transition-colors duration-200">
            {t("common.allWork", locale)}
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start mb-4">
          <div className="min-w-0">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="font-sans font-bold text-display-lg text-ink mb-8">
              {t("abroadly.title", locale)}
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="pt-6 border-t border-brown/15">
              <p className="font-sans text-sm text-brown">
                {t("abroadly.metaRole", locale)}
                <MetaDot />
                {t("abroadly.metaGoal", locale)}
                <MetaDot />
                {t("abroadly.metaDate", locale)}
              </p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/abroadly-phone.png" alt="Abroadly app" style={{ width: "100%", maxWidth: "320px", maxHeight: "480px", objectFit: "contain", mixBlendMode: "multiply" }} />
          </motion.div>
        </div>


        {/* Engagement */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.engagement", locale)}</h2></motion.div>
          <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
            {t("abroadly.engagement", locale)}
          </motion.p>
        </div>

        {/* Challenge */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8 pt-8 border-t border-brown/10">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.challenge", locale)}</h2></motion.div>
          <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
            {t("abroadly.challenge", locale)}
          </motion.p>
        </div>

        {/* Approach */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8 pt-8 border-t border-brown/10">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.approach", locale)}</h2></motion.div>
          <motion.ul {...fadeUp} className="space-y-4">
            {approach.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-cherry mt-0.5 shrink-0">—</span>
                <p className="font-sans text-base text-brown leading-relaxed">{item}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Results */}
        <div className="pt-8 border-t border-brown/10 mb-8">
          <motion.h2 {...fadeUp} className="font-sans font-semibold text-2xl text-ink mb-8">{t("common.results", locale)}</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-brown/5 rounded-sm p-8"
              >
                <p className="font-sans font-bold text-4xl text-cherry mb-3">{item.number}</p>
                <p className="font-sans text-sm text-brown leading-snug">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The creative */}
        <div className="pt-8 border-t border-brown/10 mb-8">
          <motion.h2 {...fadeUp} className="font-sans font-semibold text-2xl text-ink mb-8">{t("common.creative", locale)}</motion.h2>
          <AutoScrollCarousel items={abroadlyCreatives} />
        </div>

        {/* Prev / Back */}
        <motion.div {...fadeUp} className="pt-8 border-t border-brown/10 flex justify-between items-center">
          <Link href={lp("/work/awesome-maps")} className="group">
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-brown mb-2">{t("abroadly.prevLabel", locale)}</p>
            <h3 className="font-sans font-semibold text-xl text-ink group-hover:text-cherry transition-colors duration-200">{t("abroadly.prevTitle", locale)}</h3>
          </Link>
          <Link href={lp("/work")} className="group text-right">
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-brown mb-2">{t("abroadly.backLabel", locale)}</p>
            <h3 className="font-sans font-semibold text-xl text-ink group-hover:text-cherry transition-colors duration-200">{t("abroadly.backTitle", locale)}</h3>
          </Link>
        </motion.div>

      </article>
    </main>
  );
}
