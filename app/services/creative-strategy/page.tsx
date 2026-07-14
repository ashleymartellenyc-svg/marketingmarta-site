"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RotatingAsterisk from "@/components/decorative/RotatingAsterisk";
import Accordion from "@/components/Accordion";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export default function CreativeStrategyPage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;

  const included = [
    t("cs.include1", locale),
    t("cs.include2", locale),
    t("cs.include3", locale),
    t("cs.include4", locale),
    t("cs.include5", locale),
    t("cs.include6", locale),
    t("cs.include7", locale),
    t("cs.include8", locale),
  ];

  const faqItems = [
    { question: t("cs.faq1q", locale), answer: t("cs.faq1a", locale) },
    { question: t("cs.faq2q", locale), answer: t("cs.faq2a", locale) },
    { question: t("cs.faq3q", locale), answer: t("cs.faq3a", locale) },
    { question: t("cs.faq4q", locale), answer: t("cs.faq4a", locale) },
    { question: t("cs.faq5q", locale), answer: t("cs.faq5a", locale) },
  ];

  return (
    <main>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-10">
          <Link href={lp("/services")} className="font-sans text-xs tracking-[0.15em] uppercase text-brown hover:text-cherry transition-colors duration-200">
            {t("cs.backLabel", locale)}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mb-16 max-w-3xl">
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-cherry mb-5 flex items-center gap-2">
            <RotatingAsterisk size="text-xs" />
            {t("cs.tag", locale)}
          </p>
          <h1 className="font-sans font-bold text-display-lg text-ink mb-8">{t("cs.title", locale)}</h1>
          <p className="font-sans text-lg text-brown leading-relaxed">{t("cs.subtitle", locale)}</p>
        </motion.div>

        {/* What's included */}
        <div className="mb-20 pb-20 border-b border-brown/15">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }} className="font-sans font-semibold text-2xl text-ink mb-10">
            {t("cs.includedTitle", locale)}
          </motion.h2>
          <div className="space-y-0">
            {included.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex gap-4 items-start py-5 border-b border-brown/10 last:border-0"
              >
                <span className="font-sans text-xs text-cherry shrink-0 mt-1 w-5 font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-sans text-base text-brown leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who it's for */}
        <motion.div {...fadeUp} className="mb-20 pb-20 border-b border-brown/15 max-w-4xl">
          <h2 className="font-sans font-semibold text-2xl text-ink mb-6">{t("cs.whoTitle", locale)}</h2>
          <p className="font-sans text-base text-brown leading-relaxed">{t("cs.whoText", locale)}</p>
        </motion.div>

        {/* How it works */}
        <motion.div {...fadeUp} className="mb-20 pb-20 border-b border-brown/15 max-w-4xl">
          <h2 className="font-sans font-semibold text-2xl text-ink mb-6">{t("cs.howTitle", locale)}</h2>
          <p className="font-sans text-base text-brown leading-relaxed">{t("cs.howText", locale)}</p>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fadeUp} className="mb-20 pb-20 border-b border-brown/15">
          <h2 className="font-sans font-semibold text-2xl text-ink mb-10">{t("cs.faqTitle", locale)}</h2>
          <div className="max-w-3xl">
            <Accordion items={faqItems} />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp} className="bg-ink rounded-sm p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-sans font-semibold text-2xl text-cream mb-3">{t("cs.ctaTitle", locale)}</p>
            <p className="font-sans text-sm text-cream/60">{t("cs.ctaSubtext", locale)}</p>
          </div>
          <Link href={lp("/contact")} className="shrink-0 px-7 py-3.5 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-cream hover:text-ink transition-colors duration-200">
            {t("common.getInTouch", locale)}
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
