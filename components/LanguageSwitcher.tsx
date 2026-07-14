"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const isPolish = pathname.startsWith("/pl");

  const enHref = isPolish
    ? pathname.replace(/^\/pl/, "") || "/"
    : pathname;

  const plHref = isPolish
    ? pathname
    : "/pl" + (pathname === "/" ? "" : pathname);

  return (
    <div className="flex items-center gap-1 font-sans text-xs tracking-[0.1em] uppercase">
      <Link
        href={enHref}
        className={`px-1 py-0.5 transition-colors duration-150 ${
          !isPolish ? "text-cherry font-semibold" : "text-brown/50 hover:text-brown"
        }`}
      >
        EN
      </Link>
      <span className="text-brown/25">/</span>
      <Link
        href={plHref}
        className={`px-1 py-0.5 transition-colors duration-150 ${
          isPolish ? "text-cherry font-semibold" : "text-brown/50 hover:text-brown"
        }`}
      >
        PL
      </Link>
    </div>
  );
}
