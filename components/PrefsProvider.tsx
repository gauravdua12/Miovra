"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CURRENCY_COOKIE, type Currency, type Locale } from "@/lib/i18n";

const WISHLIST_KEY = "miovra-saved";

interface Prefs {
  lang: Locale;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  saved: string[];
  toggleSaved: (slug: string) => boolean;
  toast: (message: string) => void;
}

const PrefsContext = createContext<Prefs | null>(null);

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}

export function PrefsProvider({
  lang,
  initialCurrency,
  children,
}: {
  lang: Locale;
  initialCurrency: Currency;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);
  const [saved, setSaved] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      // Storage can be blocked (private mode); saving just won't persist.
    }
  }, []);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 2600);
    return () => clearTimeout(id);
  }, [message]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    document.cookie = `${CURRENCY_COOKIE}=${c}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const toggleSaved = useCallback(
    (slug: string) => {
      const nowSaved = !saved.includes(slug);
      const next = nowSaved ? [...saved, slug] : saved.filter((s) => s !== slug);
      setSaved(next);
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      } catch {}
      return nowSaved;
    },
    [saved],
  );

  const value = useMemo(
    () => ({ lang, currency, setCurrency, saved, toggleSaved, toast: setMessage }),
    [lang, currency, setCurrency, saved, toggleSaved],
  );

  return (
    <PrefsContext.Provider value={value}>
      {children}
      <div aria-live="polite" className={message ? "toast" : "sr-only"}>
        {message}
      </div>
    </PrefsContext.Provider>
  );
}
