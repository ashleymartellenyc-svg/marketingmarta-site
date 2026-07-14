"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import RotatingAsterisk from "@/components/decorative/RotatingAsterisk";
import AboutPortrait from "@/components/AboutPortrait";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const WorldMap2D = dynamic(() => import("@/components/WorldMap2D"), { ssr: false });

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export default function AboutPage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;

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
            {t("about.role", locale)}
          </p>
          <h1 className="font-sans font-bold text-display-lg text-ink">{t("about.title", locale)}</h1>
        </motion.div>

        {/* Bio + headshot placeholder */}
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 mb-12 pb-12 border-b border-brown/15 items-start">
          <div className="space-y-6">
            <motion.p {...fadeUp} className="font-sans text-lg text-brown leading-relaxed">
              {t("about.bio1", locale)}
            </motion.p>
            <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
              {t("about.bio2", locale)}
            </motion.p>
            <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
              {t("about.bio3", locale)}
            </motion.p>
            <motion.p {...fadeUp} className="font-sans text-base text-brown leading-relaxed">
              {t("about.bio4", locale)}
            </motion.p>
          </div>

          <div className="flex justify-center md:justify-start">
            <AboutPortrait />
          </div>
        </div>

        {/* Globe */}
        <div className="mb-24 pb-24 border-b border-brown/15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <WorldMap2D />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          className="bg-ink rounded-sm p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div>
            <p className="font-sans font-semibold text-2xl text-cream mb-3">{t("about.ctaTitle", locale)}</p>
            <p className="font-sans text-sm text-cream/60">{t("about.ctaSubtext", locale)}</p>
          </div>
          <Link
            href={lp("/contact")}
            className="shrink-0 px-7 py-3.5 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-cream hover:text-ink transition-colors duration-200"
          >
            {t("common.getInTouch", locale)}
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
