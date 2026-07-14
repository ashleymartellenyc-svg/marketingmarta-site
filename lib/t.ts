import en from "@/messages/en.json";
import pl from "@/messages/pl.json";

export type Locale = "en" | "pl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages: Record<Locale, any> = { en, pl };

export function t(key: string, locale: Locale = "en"): string {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let obj: any = messages[locale];
  for (const part of parts) {
    if (typeof obj !== "object" || obj === null) {
      obj = undefined;
      break;
    }
    obj = obj[part];
  }
  if (typeof obj === "string") return obj;
  // Fallback to EN
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fallback: any = messages.en;
  for (const part of parts) {
    if (typeof fallback !== "object" || fallback === null) return key;
    fallback = fallback[part];
  }
  return typeof fallback === "string" ? fallback : key;
}
