"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "./t";

export function useLocale(): Locale {
  const pathname = usePathname();
  return pathname?.startsWith("/pl") ? "pl" : "en";
}
