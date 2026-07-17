"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Repeat2, Target, BarChart3, FileSpreadsheet } from "lucide-react";
import ResultsCarousel from "@/components/ResultsCarousel";
import AutoScrollCarousel, { CarouselItem } from "@/components/AutoScrollCarousel";
import Highlight from "@/components/Highlight";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const simplyWiseCreatives: CarouselItem[] = [
  { type: "static", src: "/videos/simplywise-1.png" },
  { type: "video",  src: "/videos/simplywise-2.mp4" },
  { type: "static", src: "/videos/simplywise-3.png" },
  { type: "video",  src: "/videos/simplywise-4.mp4" },
  { type: "static", src: "/videos/simplywise-5.png" },
  { type: "video",  src: "/videos/simplywise-6.mp4" },
  { type: "static", src: "/videos/simplywise-7.png" },
  { type: "video",  src: "/videos/simplywise-8.mp4" },
  { type: "static", src: "/videos/simplywise-9.png" },
  { type: "video",  src: "/videos/simplywise-10.mp4" },
  { type: "video",  src: "/videos/simplywise-11.mp4" },
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

export default function SimplyWisePage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;

  const approach = [
    t("simplywise.approach1", locale),
    t("simplywise.approach2", locale),
    t("simplywise.approach3", locale),
    t("simplywise.approach4", locale),
    t("simplywise.approach5", locale),
  ];

  const results = [
    { Icon: TrendingUp, text: t("simplywise.result1", locale) },
    { Icon: Repeat2,    text: t("simplywise.result2", locale) },
    { Icon: Target,     text: t("simplywise.result3", locale) },
    { Icon: BarChart3,  text: t("simplywise.result4", locale) },
    { Icon: FileSpreadsheet, text: t("simplywise.result5", locale) },
  ].filter(r => r.text);

  return (
    <main>
      <article className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-20">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-12">
          <Link href={lp("/work")} className="font-sans text-xs tracking-[0.15em] uppercase text-brown hover:text-cherry transition-colors duration-200">
            {t("common.allWork", locale)}
          </Link>
        </motion.div>

        {/* Header + Testimonial side by side with phone */}
        <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start mb-8">
          <div className="min-w-0">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="font-sans font-bold text-display-lg text-ink mb-6">
              {t("simplywise.title", locale)}
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="pt-5 border-t border-brown/15 mb-8">
              <p className="font-sans text-sm text-brown">
                {t("simplywise.metaRole", locale)}
                <MetaDot />
                {t("simplywise.metaGoal", locale)}
                <MetaDot />
                {t("simplywise.metaDate", locale)}
              </p>
            </motion.div>
            {/* Testimonial — directly below meta */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
              {locale === "pl" ? (
                <div className="font-sans text-base md:text-lg text-ink leading-relaxed italic mb-4 space-y-3" style={{ quotes: "none" }}>
                  <p>
                    Naprawdę nie chcę pisać tej rekomendacji, bo nie chcę, żeby Marta gdziekolwiek odeszła —{" "}
                    <Highlight>chciałabym zatrzymać ją tylko dla siebie</Highlight>. Ale jestem jej to winna, bo jest po prostu taka dobra.
                  </p>
                  <p>
                    Marta to <Highlight>absolutna maszyna</Highlight>: kreatywna, proaktywna i nieustępliwa, gdy trzeba doprowadzić coś do końca. Cokolwiek stanie przed nią — przebije się przez każdą ścianę, żeby to zrobić, i zrobi to rewelacyjnie. Już w pierwszym tygodniu rozmawiała bezpośrednio z klientami, prowadziła głębokie badania i angażowała własnych przyjaciół i rodzinę do pomysłów na content. Prawie rok później,{" "}
                    <Highlight>energia i tempo ani trochę nie zwolniły</Highlight>.
                  </p>
                  <p>
                    Ma <Highlight>rzadką kombinację strategicznego myślenia i szybkiej egzekucji, o jakiej marzy każdy startup</Highlight>. Nieustannie{" "}
                    <Highlight>wychodzi poza to, czego się oczekuje</Highlight>. Cieszę się, że będę z nią długo pracować, więc ręce z dala!
                  </p>
                </div>
              ) : (
                <div className="font-sans text-base md:text-lg text-ink leading-relaxed italic mb-4 space-y-3" style={{ quotes: "none" }}>
                  <p>
                    I truly don&apos;t want to write this recommendation because I don&apos;t want Marta going anywhere —{" "}
                    <Highlight>I want to keep her to myself forever</Highlight>. But I owe it to her, because she&apos;s just that good.
                  </p>
                  <p>
                    Marta is an <Highlight>absolute powerhouse</Highlight>: creative, proactive, and unstoppable when it comes to getting things done. Whatever the task in front of her, she&apos;ll bulldoze a wall to get it done, and get it done fabulously. Within her first week, she was already talking directly to customers, doing deep research, and enlisting her own friends and family for content ideas and shoots. Almost a year later,{" "}
                    <Highlight>the energy and pace haven&apos;t slowed for a second</Highlight>.
                  </p>
                  <p>
                    She has a{" "}
                    <Highlight>rare mix of strategic thinking and scrappy execution that every startup dreams of</Highlight>. She constantly{" "}
                    <Highlight>goes above and beyond</Highlight>, looks for new ways to contribute, and somehow still makes it all look effortless. I look forward to working with her for a long time, so hands off, folks!
                  </p>
                </div>
              )}
              <p className="font-sans text-sm text-brown">— Allie Fleder, Co-Founder, SimplyWise</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/simplywise-phone.png" alt="SimplyWise app" style={{ width: "100%", maxWidth: "300px", maxHeight: "600px", objectFit: "contain", display: "block", margin: "0 auto" }} />
          </motion.div>
        </div>


        {/* Engagement */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.engagement", locale)}</h2></motion.div>
          <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
            {t("simplywise.engagement", locale)}
          </motion.p>
        </div>

        {/* Challenge */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8 pt-8 border-t border-brown/10">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.challenge", locale)}</h2></motion.div>
          <motion.div {...fadeUp} className="space-y-4">
            <p className="font-sans text-base text-brown leading-relaxed">{t("simplywise.challenge1", locale)}</p>
            <p className="font-sans text-base text-brown leading-relaxed">{t("simplywise.challenge2", locale)}</p>
            <p className="font-sans text-base text-brown leading-relaxed">{t("simplywise.challenge3", locale)}</p>
          </motion.div>
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
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}>
            <ResultsCarousel results={results} />
          </motion.div>
        </div>

        {/* The creative */}
        <div className="pt-8 border-t border-brown/10 mb-8">
          <motion.h2 {...fadeUp} className="font-sans font-semibold text-2xl text-ink mb-8">{t("common.creative", locale)}</motion.h2>
          <AutoScrollCarousel items={simplyWiseCreatives} />
        </div>

        {/* Takeaway */}
        <motion.div {...fadeUp} className="pt-8 border-t border-brown/10 mb-8">
          <div className="bg-ink rounded-sm p-10 md:p-12">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50 mb-5">{t("common.takeaway", locale)}</p>
            <p className="font-sans font-medium text-2xl md:text-3xl text-cream leading-relaxed">
              {t("simplywise.takeaway", locale)}
            </p>
          </div>
        </motion.div>

        {/* Next */}
        <motion.div {...fadeUp} className="pt-8 border-t border-brown/10 flex justify-end">
          <Link href={lp("/work/awesome-maps")} className="group">
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-brown mb-2">{t("simplywise.nextLabel", locale)}</p>
            <h3 className="font-sans font-semibold text-2xl text-ink group-hover:text-cherry transition-colors duration-200">{t("simplywise.nextTitle", locale)}</h3>
          </Link>
        </motion.div>

      </article>
    </main>
  );
}
