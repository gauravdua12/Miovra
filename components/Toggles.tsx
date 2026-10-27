"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { currencies, locales, LOCALE_COOKIE, switchLocalePath } from "@/lib/i18n";
import { usePrefs } from "./PrefsProvider";

export function LanguageToggle({ label }: { label: string }) {
  const { lang } = usePrefs();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="toggle" role="group" aria-label={label}>
      <span className="toggle__label" aria-hidden="true">{label}</span>
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={(e) => {
            document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            // Keep a search term or pre-filled enquiry when switching language. The query is read
            // on click, not during render, so pages can still be pre-rendered.
            if (window.location.search) {
              e.preventDefault();
              router.push(switchLocalePath(pathname, l) + window.location.search);
            }
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
