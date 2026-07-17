"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Highlight from "@/components/Highlight";
import AutoScrollCarousel, { CarouselItem } from "@/components/AutoScrollCarousel";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const awesomeMapsCreatives: CarouselItem[] = [
  { type: "static", src: "/videos/awesome-maps-1.png" },
  { type: "video",  src: "/videos/awesome-maps-2.mp4" },
  { type: "static", src: "/videos/awesome-maps-4.png" },
  { type: "video",  src: "/videos/awesome-maps-3.mp4" },
  { type: "static", src: "/videos/awesome-maps-5.png" },
  { type: "video",  src: "/videos/awesome-maps-9.mp4" },
  { type: "static", src: "/videos/awesome-maps-6.png" },
  { type: "static", src: "/videos/awesome-maps-7.jpg" },
  { type: "static", src: "/videos/awesome-maps-8.jpg" },
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

export default function AwesomeMapsPage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;

  const approach = [
    t("awesomeMaps.approach1", locale),
    t("awesomeMaps.approach2", locale),
    t("awesomeMaps.approach3", locale),
    t("awesomeMaps.approach4", locale),
  ];

  return (
    <main>
      <article className="max-w-[1400px] mx-auto px-6 md:px-8 py-10 md:py-14">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-12">
          <Link href={lp("/work")} className="font-sans text-xs tracking-[0.15em] uppercase text-brown hover:text-cherry transition-colors duration-200">
            {t("common.allWork", locale)}
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_520px] gap-10 items-start mb-12">
          <div className="min-w-0">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="font-sans font-bold text-display-lg text-ink mb-8">
              {t("awesomeMaps.title", locale)}
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="pt-6 border-t border-brown/15 mb-8">
              <p className="font-sans text-sm text-brown flex flex-wrap items-center gap-y-0.5">
                <span className="whitespace-nowrap">{t("awesomeMaps.metaRole", locale)}</span>
                <MetaDot />
                <span className="whitespace-nowrap">{t("awesomeMaps.metaGoal", locale)}</span>
                <MetaDot />
                <span className="whitespace-nowrap">{t("awesomeMaps.metaDate", locale)}</span>
              </p>
            </motion.div>
            {/* Testimonial — inside left column, no gap from meta */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
              {locale === "pl" ? (
                <p className="font-sans text-base md:text-lg text-ink leading-relaxed italic mb-4">
                  Marta pomogła nam ze strategią kreatywną, analizując nasze konto w Meta Ads oraz tworząc i realizując kreacje. Ma{" "}
                  <Highlight>bardzo ustrukturyzowane podejście</Highlight>, jest bardzo{" "}
                  <Highlight>rzetelna i nastawiona na wyniki</Highlight> i{" "}
                  <Highlight>naprawdę pomogła nam osiągnąć to, co chcieliśmy osiągnąć</Highlight>.
                </p>
              ) : (
                <p className="font-sans text-base md:text-lg text-ink leading-relaxed italic mb-4">
                  Marta helped us with creative strategy, analyzing our meta ad account as well as ideating and executing creatives. She has a{" "}
                  <Highlight>very structured approach</Highlight>, is very{" "}
                  <Highlight>reliable and result oriented</Highlight> and{" "}
                  <Highlight>really helped us to achieve what we set out to do</Highlight>.
                </p>
              )}
              <p className="font-sans text-sm text-brown">— Simon S., Founder, Awesome Maps</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/awesome-maps-products.png" alt="Awesome Maps products" style={{ width: "100%", maxHeight: "680px", objectFit: "contain" }} />
          </motion.div>
        </div>

        {/* Engagement */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.engagement", locale)}</h2></motion.div>
          <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
            {t("awesomeMaps.engagement", locale)}
          </motion.p>
        </div>

        {/* Challenge */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-8 pt-8 border-t border-brown/10">
          <motion.div {...fadeUp}><h2 className="font-sans font-semibold text-2xl text-ink">{t("common.challenge", locale)}</h2></motion.div>
          <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
            {t("awesomeMaps.challenge", locale)}
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

        {/* The creative */}
        <div className="pt-8 border-t border-brown/10 mb-8">
          <motion.h2 {...fadeUp} className="font-sans font-semibold text-2xl text-ink mb-8">{t("common.creative", locale)}</motion.h2>
          <AutoScrollCarousel items={awesomeMapsCreatives} />
        </div>

        {/* Prev / Next */}
        <motion.div {...fadeUp} className="pt-8 border-t border-brown/10 flex justify-between items-center">
          <Link href={lp("/work/simplywise")} className="group">
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-brown mb-2">{t("awesomeMaps.prevLabel", locale)}</p>
            <h3 className="font-sans font-semibold text-xl text-ink group-hover:text-cherry transition-colors duration-200">{t("awesomeMaps.prevTitle", locale)}</h3>
          </Link>
          <Link href={lp("/work/abroadly")} className="group text-right">
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-brown mb-2">{t("awesomeMaps.nextLabel", locale)}</p>
            <h3 className="font-sans font-semibold text-xl text-ink group-hover:text-cherry transition-colors duration-200">{t("awesomeMaps.nextTitle", locale)}</h3>
          </Link>
        </motion.div>

      </article>
    </main>
  );
}
