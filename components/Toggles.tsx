"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { currencies, locales, LOCALE_COOKIE, switchLocalePath } from "@/lib/i18n";
import { usePrefs } from "./PrefsProvider";

export function LanguageToggle({ label }: { label: string }) {
  const { lang } = usePrefs();
  const pathname = usePathname();
  const query = useSearchParams().toString();
  return (
    <div className="toggle" role="group" aria-label={label}>
      <span className="toggle__label" aria-hidden="true">{label}</span>
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l) + (query ? `?${query}` : "")}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
          }}
        >
          {l === "en" ? "EN" : "SV"}
        </Link>
      ))}
    </div>
  );
}

export function CurrencyToggle({ label }: { label: string }) {
  const { currency, setCurrency } = usePrefs();
  return (
    <div className="toggle" role="group" aria-label={label}>
      <span className="toggle__label" aria-hidden="true">{label}</span>
      {currencies.map((c) => (
        <button key={c} type="button" aria-pressed={c === currency} onClick={() => setCurrency(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
