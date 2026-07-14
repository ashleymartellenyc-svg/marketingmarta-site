"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RotatingAsterisk from "@/components/decorative/RotatingAsterisk";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

export default function ServicesPage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;

  const services = [
    {
      href: lp("/services/creative-strategy"),
      tag: t("services.cs_tag", locale),
      label: t("services.cs_label", locale),
      description: t("services.cs_description", locale),
    },
    {
      href: lp("/services/ugc"),
      tag: t("services.ugc_tag", locale),
      label: t("services.ugc_label", locale),
      description: t("services.ugc_description", locale),
    },
  ];

  return (
    <main>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-cherry mb-5 flex items-center gap-2">
            <RotatingAsterisk size="text-xs" />
            {t("services.title", locale)}
          </p>
          <h1 className="font-sans font-bold text-display-lg text-ink mb-4">{t("services.title", locale)}</h1>
          <p className="font-sans text-lg text-brown leading-relaxed max-w-xl">
            {t("services.subtitle", locale)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="border border-brown/15 rounded-sm p-8 md:p-10 flex flex-col"
            >
              <span className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-cherry mb-3">{s.tag}</span>
              <h2 className="font-sans font-semibold text-2xl text-ink mb-5">{s.label}</h2>
              <p className="font-sans text-base text-brown leading-relaxed mb-8 flex-1">{s.description}</p>
              <Link
                href={s.href}
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-cherry border-b border-cherry/30 pb-px hover:border-cherry transition-colors duration-200"
              >
                {t("common.learnMore", locale)}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-16 bg-ink rounded-sm p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div>
            <p className="font-sans font-semibold text-2xl text-cream mb-3">{t("services.notSure", locale)}</p>
            <p className="font-sans text-sm text-cream/60">{t("services.notSureSubtext", locale)}</p>
          </div>
          <Link href={lp("/contact")} className="shrink-0 px-7 py-3.5 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-cream hover:text-ink transition-colors duration-200">
            {t("common.getInTouch", locale)}
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
