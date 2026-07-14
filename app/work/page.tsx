"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ClientLogo from "@/components/ClientLogo";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const caseStudies = [
  {
    slug: "simplywise",
    title: "SimplyWise",
    logo: "/logos/simplywise.png",
    hazeColor: "#FAF6F0",
    subtitleKey: "work.sw_subtitle" as const,
    summaryKey: "work.sw_summary" as const,
  },
  {
    slug: "awesome-maps",
    title: "Awesome Maps",
    logo: "/logos/awesome-maps.png",
    hazeColor: "#FAF6F0",
    subtitleKey: "work.am_subtitle" as const,
    summaryKey: "work.am_summary" as const,
  },
  {
    slug: "abroadly",
    title: "Abroadly",
    logo: "/logos/abroadly.png",
    hazeColor: "#0F1B3D",
    subtitleKey: "work.ab_subtitle" as const,
    summaryKey: "work.ab_summary" as const,
  },
];

export default function WorkPage() {
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
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-cherry mb-5">{t("work.caseStudies", locale)}</p>
          <h1 className="font-sans font-bold text-display-lg text-ink">{t("work.title", locale)}</h1>
        </motion.div>

        <div className="divide-y divide-brown/15">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={lp(`/work/${cs.slug}`)} className="group block py-12">
                <div className="grid md:grid-cols-[500px_1fr] gap-10 items-center">
                  <div className="flex items-center justify-center">
                    <ClientLogo
                      src={cs.logo}
                      alt={cs.title}
                      hazeColor={cs.hazeColor}
                      width={620}
                      height={240}
                      maxHeight="220px"
                    />
                  </div>
                  <div>
                    <h2 className="font-sans font-semibold text-display-md text-ink group-hover:text-cherry transition-colors duration-200 mb-2">
                      {cs.title}
                    </h2>
                    <p className="font-sans text-base italic text-brown mb-5">{t(cs.subtitleKey, locale)}</p>
                    <p className="font-sans text-sm text-brown/80 leading-relaxed max-w-lg mb-6">
                      {t(cs.summaryKey, locale)}
                    </p>
                    <span className="font-sans text-xs font-medium text-cherry tracking-wide border-b border-cherry/30 pb-px group-hover:border-cherry transition-colors duration-200">
                      {t("common.readCaseStudy", locale)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
