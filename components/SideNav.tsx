"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/useLocale";
import { t } from "@/lib/t";

function NavLink({ href, label, small }: { href: string; label: string; small?: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`group relative font-sans font-medium transition-colors duration-200 ${
        small ? "text-xs text-brown/70 hover:text-cherry pl-3" : "text-sm text-ink hover:text-cherry"
      } ${isActive ? "text-cherry" : ""}`}
    >
      {small && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-px bg-brown/40 group-hover:bg-cherry transition-colors" />}
      {label}
      {!small && (
        <span className={`absolute -bottom-0.5 left-0 h-px bg-cherry transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
      )}
    </Link>
  );
}

export default function SideNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const isPolish = locale === "pl";

  // Locale-aware href prefix
  const lp = (href: string) =>
    isPolish ? (href === "/" ? "/pl" : `/pl${href}`) : href;

  const servicesActive =
    pathname?.startsWith("/services") || pathname?.startsWith("/pl/services");

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => { if (servicesActive) setServicesOpen(true); }, [servicesActive]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const mobileLinks = [
    { href: lp("/work"), label: t("nav.work", locale) },
    { href: lp("/services"), label: t("nav.services", locale) },
    { href: lp("/about"), label: t("nav.about", locale) },
    { href: lp("/contact"), label: t("nav.contact", locale) },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[200px] z-40 flex-col justify-between py-12 px-7 border-r border-brown/10 bg-cream/95 backdrop-blur-sm">
        <Link href={lp("/")} className="font-sans font-bold text-sm leading-snug text-ink hover:text-cherry transition-colors duration-200">
          The Marketing<br />Marta
        </Link>

        <nav className="flex flex-col gap-6">
          <NavLink href={lp("/work")} label={t("nav.work", locale)} />

          <div>
            <div className="flex items-center justify-between">
              <NavLink href={lp("/services")} label={t("nav.services", locale)} />
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="p-0.5 text-brown/50 hover:text-cherry transition-colors"
                aria-label="Toggle services"
              >
                <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} />
                </motion.div>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {servicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-3 mt-3">
                    <NavLink href={lp("/services/creative-strategy")} label={t("nav.creativeStrategy", locale)} small />
                    <NavLink href={lp("/services/ugc")} label="UGC" small />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink href={lp("/about")} label={t("nav.about", locale)} />
          <NavLink href={lp("/contact")} label={t("nav.contact", locale)} />
        </nav>

        <div className="flex flex-col gap-4">
          <LanguageSwitcher />
          <Link
            href={lp("/contact")}
            className="block w-full text-center px-4 py-2.5 bg-cherry text-cream font-sans text-xs font-semibold tracking-widest uppercase rounded transition-all duration-200 hover:bg-ink"
          >
            {t("nav.getInTouch", locale)}
          </Link>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-5 right-5 z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
        aria-label="Open menu"
      >
        <span className="block w-6 h-px bg-ink" />
        <span className="block w-6 h-px bg-ink" />
        <span className="block w-4 h-px bg-ink self-end" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-[60] bg-cream flex flex-col px-8 py-10"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href={lp("/")} onClick={() => setMobileOpen(false)} className="font-sans font-bold text-sm text-ink">
                The Marketing Marta
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-2xl text-ink leading-none" aria-label="Close menu">×</button>
            </div>

            <nav className="flex flex-col gap-7 flex-1">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans font-bold text-display-md text-ink hover:text-cherry transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="flex flex-col gap-5 items-start">
              <LanguageSwitcher />
              <Link
                href={lp("/contact")}
                onClick={() => setMobileOpen(false)}
                className="inline-block px-8 py-4 bg-cherry text-cream font-sans font-semibold text-sm rounded"
              >
                {t("nav.getInTouch", locale)} →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
