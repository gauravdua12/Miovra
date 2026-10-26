"use client";

import { formatPrice, type Currency } from "@/lib/i18n";
import { usePrefs } from "./PrefsProvider";

export function Price({ price, className }: { price: Record<Currency, number>; className?: string }) {
  const { currency, lang } = usePrefs();
  return <span className={`tabular ${className ?? ""}`}>{formatPrice(price[currency], currency, lang)}</span>;
}
