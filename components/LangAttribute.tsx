"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LangAttribute() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = pathname?.startsWith("/pl") ? "pl" : "en";
  }, [pathname]);
  return null;
}
