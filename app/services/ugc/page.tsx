"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RotatingAsterisk from "@/components/decorative/RotatingAsterisk";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import type { Testimonial } from "@/components/TestimonialCarousel";
import Accordion from "@/components/Accordion";
import ClientLogo from "@/components/ClientLogo";
import SponsoredContentSection from "@/components/SponsoredContentSection";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const testimonials: Testimonial[] = [
  {
    name: "Dalpat R.",
    company: "LiveXP",
    stars: 5,
    quote: "The video you created for us truly exceeded our expectations — it's fantastic! It performed really well, best out of 15 videos we tested. Every frame was not only engaging but also beautifully crafted, clearly showing the high level of creativity and effort that went into its production. We achieved CTR of over 2%, and with a cost per click of just $0.20, the effectiveness of your work is undeniable.",
  },
  {
    name: "Jake R.",
    company: "Immerse VR",
    stars: 5,
    quote: "At Immerse, we partnered with Marta to create organic content and compelling ads to target language learners in the US, Mexico, and South America. Marta's ability to speak multiple languages, create and deliver content on time, and work strategically with our in-house team to iterate on the fly was a key driver for our success. During our partnership, we saw our Member count grow more than 2x and there's no doubt Marta's content played a role!",
  },
  {
    name: "Albert San",
    company: "Femly",
    stars: 5,
    quote: "Honestly the ROI on videos made by her is so much better than we have seen from other creators. Basically you get what you pay for... She even makes a boring script sound engaging with clever editing and speaking style. We made 4 different videos with her and plan to make many more. Stats of her videos VS our other ones on average: ROAS other: 3.2 vs Marta: 4.4 / Scroll stop other: 32% vs Marta: 37% / CTR other: 1.2% vs Marta: 1.6%.",
  },
  {
    name: "Samantha S.",
    company: "Kilos Gear",
    stars: 5,
    quote: "Marta is such an excellent UGC creator to work with! She is professional, thoughtful, and creative and communicated with me and my team every step of the way. I would absolutely recommend her for UGC projects!",
  },
];

interface Brand {
  name: string;
  logo: string | null;
  video: string;
  hazeColor: string;
}

const brands: Brand[] = [
  { name: "Call of Duty: Warzone Mobile", logo: "/logos/call-of-duty.png", video: "/videos/call-of-duty-warzone-mobile.mp4", hazeColor: "#1A1A1A" },
  { name: "Diablo IV", logo: "/logos/diablo-iv.png", video: "/videos/diablo-iv.mp4", hazeColor: "#0A0A0A" },
  { name: "Monopoly GO!", logo: "/logos/monopoly-go.png", video: "/videos/monopoly-go.mp4", hazeColor: "#C8102E" },
  { name: "Immerse VR", logo: "/logos/immerse.png", video: "/videos/immerse.mp4", hazeColor: "#FAF6F0" },
];

function VideoModal({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => { setVideoError(false); }, [brand.name]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[900] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(26,22,18,0.55)" }} />
      <motion.div
        className="relative z-10 w-full max-w-[340px] bg-cream rounded-sm overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-ink" style={{ aspectRatio: "9 / 16" }}>
          {!videoError ? (
            <video key={brand.name} src={brand.video} controls autoPlay playsInline className="w-full h-full object-contain" onError={() => setVideoError(true)} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-8 w-full h-full">
              {brand.logo && <Image src={brand.logo} alt={brand.name} width={120} height={60} className="object-contain max-h-14 opacity-40" />}
              <p className="font-sans text-sm text-cream/50 text-center">Video not available</p>
            </div>
          )}
        </div>
        <div className="px-5 py-3.5 flex items-center justify-between">
          <p className="font-sans font-semibold text-sm text-ink">{brand.name}</p>
          <button onClick={onClose} className="font-sans text-xs text-brown hover:text-cherry transition-colors duration-200">Close ×</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BrandsGrid() {
  const locale = useLocale();
  const [activeModal, setActiveModal] = useState<Brand | null>(null);
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6">
        {brands.map((brand) => (
          <div key={brand.name} className="flex flex-col gap-2 items-center">
            <button className="group relative flex items-center justify-center hover:opacity-80 transition-opacity duration-200" onClick={() => setActiveModal(brand)} aria-label={`Watch ${brand.name} sample`}>
              {brand.logo && !logoErrors[brand.name] ? (
                <ClientLogo src={brand.logo} alt={brand.name} hazeColor={brand.hazeColor} width={220} height={110} maxHeight="90px" imgClassName="transition-transform duration-200 group-hover:scale-105" onError={() => setLogoErrors((p) => ({ ...p, [brand.name]: true }))} />
              ) : (
                <span className="font-sans font-semibold text-sm text-brown/60 text-center leading-tight px-4 py-5">{brand.name}</span>
              )}
            </button>
            <button onClick={() => setActiveModal(brand)} className="font-sans text-xs font-medium text-cherry text-center hover:opacity-70 transition-opacity duration-200">
              {t("ugc.watchSample", locale)}
            </button>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {activeModal && <VideoModal brand={activeModal} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default function UGCPage() {
  const locale = useLocale();
  const lp = (href: string) => locale === "pl" ? `/pl${href}` : href;
  const faqItems = [
    { question: t("ugc.faq1q", locale), answer: t("ugc.faq1a", locale) },
    { question: t("ugc.faq2q", locale), answer: t("ugc.faq2a", locale) },
    { question: t("ugc.faq3q", locale), answer: t("ugc.faq3a", locale) },
    { question: t("ugc.faq4q", locale), answer: t("ugc.faq4a", locale) },
  ];

  return (
    <main>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-20 md:pt-28">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-10">
          <Link href={lp("/services")} className="font-sans text-xs tracking-[0.15em] uppercase text-brown hover:text-cherry transition-colors duration-200">
            {t("ugc.backLabel", locale)}
          </Link>
        </motion.div>

        {/* Intro + Video */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16 pb-16 border-b border-brown/15">

          {/* Left: text */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="mb-14">
              <p className="font-sans text-xs tracking-[0.22em] uppercase text-cherry mb-5 flex items-center gap-2">
                <RotatingAsterisk size="text-xs" />
                {t("ugc.tag", locale)}
              </p>
              <h1 className="font-sans font-bold text-display-lg text-ink mb-8">{t("ugc.title", locale)}</h1>
              <p className="font-sans text-lg text-brown leading-relaxed mb-5">{t("ugc.intro1", locale)}</p>
              <p className="font-sans text-lg text-brown leading-relaxed">{t("ugc.intro2", locale)}</p>
            </motion.div>

            {/* What I do — desktop only (sits in left column beside video) */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="hidden lg:block">
              <h2 className="font-sans font-semibold text-2xl text-ink mb-6">{t("ugc.whatTitle", locale)}</h2>
              <p className="font-sans text-base text-brown leading-relaxed mb-5">{t("ugc.what1", locale)}</p>
              <p className="font-sans text-base text-brown leading-relaxed">{t("ugc.what2", locale)}</p>
            </motion.div>
          </div>

          {/* Right: UGC reel video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-auto shrink-0 lg:self-start"
          >
            <video
              src="/videos/ugc-carousel.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: 220, maxWidth: "100%", borderRadius: 12, display: "block", margin: "0 auto" }}
            />
          </motion.div>

          {/* What I do — mobile only (appears after video) */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:hidden w-full">
            <h2 className="font-sans font-semibold text-2xl text-ink mb-6">{t("ugc.whatTitle", locale)}</h2>
            <p className="font-sans text-base text-brown leading-relaxed mb-5">{t("ugc.what1", locale)}</p>
            <p className="font-sans text-base text-brown leading-relaxed">{t("ugc.what2", locale)}</p>
          </motion.div>

        </div>

        {/* Brands */}
        <div className="mb-16 pb-16 border-b border-brown/15">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }} className="font-sans font-semibold text-2xl text-ink mb-10 text-center">
            {t("ugc.brandsTitle", locale)}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}>
            <BrandsGrid />
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mb-16 pb-16 border-b border-brown/15">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }} className="font-sans font-semibold text-2xl text-ink mb-10">
            {t("ugc.testimonialsTitle", locale)}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}>
            <TestimonialCarousel testimonials={testimonials} />
          </motion.div>
        </div>

      </div>

      <SponsoredContentSection />

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-20 md:pb-28 pt-16">

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mb-16 pb-16 border-b border-brown/15">
          <h2 className="font-sans font-semibold text-2xl text-ink mb-10">{t("ugc.faqTitle", locale)}</h2>
          <div className="max-w-2xl">
            <Accordion items={faqItems} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="bg-ink rounded-sm p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-sans font-semibold text-2xl text-cream mb-3">{t("ugc.ctaTitle", locale)}</p>
            <p className="font-sans text-sm text-cream/60">{t("ugc.ctaSubtext", locale)}</p>
          </div>
          <Link href={lp("/contact")} className="shrink-0 px-7 py-3.5 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-cream hover:text-ink transition-colors duration-200">
            {t("common.getInTouch", locale)}
          </Link>
        </motion.div>
      </div>

    </main>
  );
}
