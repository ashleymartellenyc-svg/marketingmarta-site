"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RotatingAsterisk from "@/components/decorative/RotatingAsterisk";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

const PLATFORM_OPTIONS = [
  "Meta (Facebook/Instagram)",
  "TikTok",
  "YouTube",
  "Google",
  "Other",
  "Not running paid social ads",
];

const DELIVERABLE_OPTIONS = [
  "Video posted to my Instagram",
  "Video posted to my TikTok",
  "Stories posted to my Instagram",
  "Stories posted to my TikTok",
  "Mix",
];

type Service = "Creative Strategy" | "User Generated Content creation" | "Sponsored content" | "Mix" | "I don't know yet" | "";

function FieldReveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pt-7">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
  exclusiveOption,
  disabled,
  getLabel,
}: {
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
  exclusiveOption?: string;
  disabled?: boolean;
  getLabel: (opt: string) => string;
}) {
  return (
    <div className={`flex flex-col gap-2.5 mt-1 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {options.map((opt) => {
        const isExclusive = opt === exclusiveOption;
        const checked = selected.includes(opt);
        return (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors duration-150 ${
                checked ? "bg-cherry border-cherry" : "border-brown/30 group-hover:border-cherry/60"
              }`}
              onClick={() => onToggle(opt)}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`font-sans text-sm transition-colors duration-150 ${
                checked ? "text-ink" : isExclusive ? "text-brown/70 italic" : "text-brown"
              }`}
              onClick={() => onToggle(opt)}
            >
              {getLabel(opt)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
    </svg>
  );
}

const FORMSPREE_ID = "mjgzbqpo";

export default function ContactPage() {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [service, setService] = useState<Service>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [platformError, setPlatformError] = useState(false);
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);
  const [monthlySpend, setMonthlySpend] = useState("");

  const isCS = service === "Creative Strategy" || service === "Mix";
  const isUGC = service === "User Generated Content creation";
  const isSponsored = service === "Sponsored content";
  const isIDK = service === "I don't know yet";
  const hasService = service !== "";

  const showPlatforms = isCS || isUGC;
  const showCapacity = isCS;
  const showAdSpend = isCS;
  const showProjectScope = isUGC;
  const showUgcTimeline = isUGC;
  const showDeliverables = isSponsored;
  const showCampaignType = isSponsored;
  const showGeneralTimeline = isCS;

  // Platform label translation (values remain EN for Formspree)
  const getPlatformLabel = (opt: string) => {
    if (locale === "pl") {
      if (opt === "Other") return t("contact.platformOther", locale);
      if (opt === "Not running paid social ads") return t("contact.platformNone", locale);
    }
    return opt;
  };

  // Deliverable label translation
  const getDeliverableLabel = (opt: string) => {
    if (locale === "pl") {
      const map: Record<string, string> = {
        "Video posted to my Instagram": t("contact.deliverableIG", "pl"),
        "Video posted to my TikTok": t("contact.deliverableTK", "pl"),
        "Stories posted to my Instagram": t("contact.deliverableIGStory", "pl"),
        "Stories posted to my TikTok": t("contact.deliverableTKStory", "pl"),
        "Mix": t("contact.deliverableMix", "pl"),
      };
      return map[opt] ?? opt;
    }
    const map: Record<string, string> = {
      "Video posted to my Instagram": "Video posted to my Instagram",
      "Video posted to my TikTok": "Video posted to my TikTok",
      "Stories posted to my Instagram": "Stories posted to my Instagram",
      "Stories posted to my TikTok": "Stories posted to my TikTok",
      "Mix": "Mix",
    };
    return map[opt] ?? opt;
  };

  function togglePlatform(opt: string) {
    setPlatformError(false);
    if (opt === "Not running paid social ads") {
      setSelectedPlatforms((prev) => (prev.includes(opt) ? [] : [opt]));
    } else {
      setSelectedPlatforms((prev) => {
        const without = prev.filter((p) => p !== "Not running paid social ads");
        return without.includes(opt) ? without.filter((p) => p !== opt) : [...without, opt];
      });
    }
  }

  function toggleDeliverable(opt: string) {
    setSelectedDeliverables((prev) => {
      if (opt === "Mix") {
        return prev.includes("Mix") ? [] : ["Mix"];
      } else {
        const withoutMix = prev.filter((p) => p !== "Mix");
        return withoutMix.includes(opt) ? withoutMix.filter((p) => p !== opt) : [...withoutMix, opt];
      }
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showPlatforms && selectedPlatforms.length === 0) {
      setPlatformError(true);
      return;
    }
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    if (showPlatforms) data.set("platforms", selectedPlatforms.join(", "));
    if (showDeliverables) data.set("deliverable_types", selectedDeliverables.join(", "));
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // fail silently
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full bg-transparent border border-brown/25 rounded-sm px-4 py-3 font-sans text-sm text-ink placeholder:text-brown/40 focus:outline-none focus:border-cherry transition-colors duration-200";
  const selectClass = "w-full bg-cream border border-brown/25 rounded-sm px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-cherry transition-colors duration-200";
  const labelClass = "block font-sans text-xs tracking-[0.12em] uppercase text-brown mb-2";

  const messageLabel = isUGC
    ? t("contact.messageLabelUGC", locale)
    : isSponsored
    ? t("contact.messageLabelSponsored", locale)
    : isIDK
    ? t("contact.messageLabelIDK", locale)
    : t("contact.messageLabelDefault", locale);

  const messagePlaceholder = isSponsored
    ? t("contact.messagePlaceholderSponsored", locale)
    : isIDK
    ? t("contact.messagePlaceholderIDK", locale)
    : t("contact.messagePlaceholderDefault", locale);

  return (
    <main>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 md:py-28">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-16">
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-cherry mb-5 flex items-center gap-2">
            <RotatingAsterisk size="text-xs" />
            {t("contact.tag", locale)}
          </p>
          <h1 className="font-sans font-bold text-display-lg text-ink mb-6">{t("contact.title", locale)}</h1>
          <p className="font-sans text-base text-brown max-w-lg leading-relaxed">{t("contact.subtitle", locale)}</p>
        </motion.div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-16 items-start mb-24">

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
            {submitted ? (
              <div className="bg-brown/5 rounded-sm p-10 md:p-14">
                <p className="font-sans font-semibold text-2xl text-ink mb-4">{t("contact.successTitle", locale)}</p>
                <p className="font-sans text-base text-brown leading-relaxed">{t("contact.successText", locale)}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-6 mb-7">
                  <div>
                    <label className={labelClass}>{t("contact.nameLabel", locale)} <span className="text-cherry">*</span></label>
                    <input type="text" name="name" required placeholder="Marta" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t("contact.companyLabel", locale)} <span className="text-cherry">*</span></label>
                    <input type="text" name="company" required placeholder="Acme Inc." className={inputClass} />
                  </div>
                </div>

                {/* Website + Role */}
                <div className="grid sm:grid-cols-2 gap-6 mb-7">
                  <div>
                    <label className={labelClass}>{t("contact.websiteLabel", locale)}</label>
                    <input type="url" name="website" placeholder="https://yoursite.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t("contact.roleLabel", locale)} <span className="text-cherry">*</span></label>
                    <input type="text" name="role" required placeholder="Founder, Head of Growth…" className={inputClass} />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-7">
                  <label className={labelClass}>{t("contact.emailLabel", locale)} <span className="text-cherry">*</span></label>
                  <input type="email" name="email" required placeholder="you@yourbrand.com" className={inputClass} />
                </div>

                {/* Service selector */}
                <div className="mb-0">
                  <label className={labelClass}>{t("contact.serviceLabel", locale)} <span className="text-cherry">*</span></label>
                  <select
                    name="service_interest"
                    required
                    className={selectClass}
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value as Service);
                      setPlatformError(false);
                      setSelectedPlatforms([]);
                      setSelectedDeliverables([]);
                    }}
                  >
                    <option value="">{t("contact.serviceSelect", locale)}</option>
                    <option value="Creative Strategy">{t("contact.serviceCS", locale)}</option>
                    <option value="User Generated Content creation">{t("contact.serviceUGC", locale)}</option>
                    <option value="Sponsored content">{t("contact.serviceSponsored", locale)}</option>
                    <option value="Mix">{t("contact.serviceMix", locale)}</option>
                    <option value="I don't know yet">{t("contact.serviceIDK", locale)}</option>
                  </select>
                </div>

                {/* Platforms (CS + UGC) */}
                <FieldReveal show={showPlatforms}>
                  <div className={platformError ? "ring-1 ring-cherry/50 rounded-sm p-3 -mx-3" : ""}>
                    <label className={labelClass}>
                      {t("contact.platformsLabel", locale)} <span className="text-cherry">*</span>
                    </label>
                    <CheckboxGroup
                      options={PLATFORM_OPTIONS}
                      selected={selectedPlatforms}
                      onToggle={togglePlatform}
                      exclusiveOption="Not running paid social ads"
                      disabled={monthlySpend === "Not running paid social ads"}
                      getLabel={getPlatformLabel}
                    />
                    {platformError && (
                      <p className="font-sans text-xs text-cherry mt-2">{t("contact.platformError", locale)}</p>
                    )}
                  </div>
                </FieldReveal>

                {/* Capacity (CS only) */}
                <FieldReveal show={showCapacity}>
                  <div>
                    <label className={labelClass}>{t("contact.capacityLabel", locale)} <span className="text-cherry">*</span></label>
                    <div className="flex flex-col gap-3 mt-1">
                      <label className="flex items-start gap-3 opacity-40 cursor-not-allowed select-none">
                        <input type="radio" name="capacity" value="full-time" disabled className="mt-0.5" />
                        <div>
                          <span className="font-sans text-sm text-ink">{t("contact.capacityFull", locale)}</span>
                          <p className="font-sans text-xs text-brown mt-0.5">{t("contact.capacityFullNote", locale)}</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="capacity" value="part-time" className="accent-cherry" />
                        <span className="font-sans text-sm text-ink">{t("contact.capacityPart", locale)}</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="capacity" value="project-based" className="accent-cherry" />
                        <span className="font-sans text-sm text-ink">{t("contact.capacityProject", locale)}</span>
                      </label>
                    </div>
                  </div>
                </FieldReveal>

                {/* Monthly ad spend (CS only) */}
                <FieldReveal show={showAdSpend}>
                  <div>
                    <label className={labelClass}>{t("contact.spendLabel", locale)} <span className="text-cherry">*</span></label>
                    <select
                      name="monthly_spend"
                      required={showAdSpend}
                      className={selectClass}
                      value={monthlySpend}
                      onChange={(e) => {
                        const v = e.target.value;
                        setMonthlySpend(v);
                        if (v === "Not running paid social ads") {
                          setSelectedPlatforms(["Not running paid social ads"]);
                          setPlatformError(false);
                        } else if (monthlySpend === "Not running paid social ads") {
                          setSelectedPlatforms([]);
                        }
                      }}
                    >
                      <option value="">{t("contact.serviceSelect", locale)}</option>
                      <option value="Less than $300K">{t("contact.spendLess", locale)}</option>
                      <option value="$300K — $800K">{t("contact.spendMid", locale)}</option>
                      <option value="Over $800K">{t("contact.spendOver", locale)}</option>
                      <option value="Not running paid social ads">{t("contact.spendNone", locale)}</option>
                    </select>
                  </div>
                </FieldReveal>

                {/* Project scope (UGC only) */}
                <FieldReveal show={showProjectScope}>
                  <div>
                    <label className={labelClass}>{t("contact.projectScopeLabel", locale)} <span className="text-cherry">*</span></label>
                    <div className="flex flex-col gap-3 mt-1">
                      {[
                        { value: "One-off project", label: t("contact.scopeOneOff", locale) },
                        { value: "Ongoing multi-month", label: t("contact.scopeMulti", locale) },
                        { value: "Retainer", label: t("contact.scopeRetainer", locale) },
                        { value: "Not sure yet", label: t("contact.scopeNotSure", locale) },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="project_scope" value={opt.value} className="accent-cherry" />
                          <span className="font-sans text-sm text-ink">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </FieldReveal>

                {/* UGC timeline (UGC only) */}
                <FieldReveal show={showUgcTimeline}>
                  <div>
                    <label className={labelClass}>{t("contact.ugcTimelineLabel", locale)}</label>
                    <input type="text" name="ugc_timeline" placeholder={t("contact.ugcTimelinePlaceholder", locale)} className={inputClass} />
                  </div>
                </FieldReveal>

                {/* Deliverables (Sponsored only) */}
                <FieldReveal show={showDeliverables}>
                  <div>
                    <label className={labelClass}>{t("contact.deliverablesLabel", locale)}</label>
                    <CheckboxGroup
                      options={DELIVERABLE_OPTIONS}
                      selected={selectedDeliverables}
                      onToggle={toggleDeliverable}
                      getLabel={getDeliverableLabel}
                    />
                  </div>
                </FieldReveal>

                {/* Campaign type (Sponsored only) */}
                <FieldReveal show={showCampaignType}>
                  <div>
                    <label className={labelClass}>{t("contact.campaignTypeLabel", locale)}</label>
                    <div className="flex flex-col gap-3 mt-1">
                      {[
                        { value: "Single post", label: t("contact.campaignSingle", locale) },
                        { value: "Series", label: t("contact.campaignSeries", locale) },
                        { value: "Ongoing partnership", label: t("contact.campaignOngoing", locale) },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="campaign_type" value={opt.value} className="accent-cherry" />
                          <span className="font-sans text-sm text-ink">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </FieldReveal>

                {/* Message */}
                <FieldReveal show={hasService}>
                  <div>
                    <label className={labelClass}>
                      {messageLabel} <span className="text-cherry">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={messagePlaceholder}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </FieldReveal>

                {/* Timeline (CS/Mix only) */}
                <FieldReveal show={showGeneralTimeline}>
                  <div>
                    <label className={labelClass}>{t("contact.timelineLabel", locale)}</label>
                    <select name="timeline" className={selectClass}>
                      <option value="">{t("contact.serviceSelect", locale)}</option>
                      <option value="ASAP">{t("contact.timelineASAP", locale)}</option>
                      <option value="1–3 months">{t("contact.timeline1to3", locale)}</option>
                      <option value="3–6 months">{t("contact.timeline3to6", locale)}</option>
                      <option value="Just exploring">{t("contact.timelineExploring", locale)}</option>
                    </select>
                  </div>
                </FieldReveal>

                {/* Submit */}
                <FieldReveal show={hasService}>
                  <div>
                    <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-4 bg-cherry text-cream font-sans font-medium text-sm tracking-wide rounded hover:bg-ink transition-colors duration-200 disabled:opacity-60">
                      {submitting ? t("contact.submitting", locale) : t("contact.submit", locale)}
                    </button>
                  </div>
                </FieldReveal>
              </form>
            )}
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-brown mb-3">{t("contact.emailSectionLabel", locale)}</p>
              <a href="mailto:hi@themarketingmarta.com" className="font-sans text-sm text-ink hover:text-cherry transition-colors duration-200 break-all">
                hi@themarketingmarta.com
              </a>
            </div>
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-brown mb-4">{t("contact.socialLabel", locale)}</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/nomadicmarta/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brown/60 hover:text-cherry transition-colors duration-200">
                  <InstagramIcon />
                </a>
                <a href="https://www.linkedin.com/in/themarketingmarta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-brown/60 hover:text-cherry transition-colors duration-200">
                  <LinkedInIcon />
                </a>
                <a href="https://tiktok.com/@nomadicmarta" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-brown/60 hover:text-cherry transition-colors duration-200">
                  <TikTokIcon />
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </main>
  );
}
