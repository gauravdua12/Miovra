export const locales = ["en", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const currencies = ["EUR", "SEK"] as const;
export type Currency = (typeof currencies)[number];

/** A string in every site language. */
export type L10n = Record<Locale, string>;

export const LOCALE_COOKIE = "NEXT_LOCALE";
export const CURRENCY_COOKIE = "miovra_currency";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function isCurrency(value: string | undefined): value is Currency {
  return !!value && (currencies as readonly string[]).includes(value);
}

/** Swedish visitors see kronor by default, everyone else euros. */
export function defaultCurrency(lang: Locale): Currency {
  return lang === "sv" ? "SEK" : "EUR";
}

/** Replaces {name} placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

export function formatPrice(amount: number, currency: Currency, lang: Locale): string {
  return new Intl.NumberFormat(lang === "sv" ? "sv-SE" : "en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Swaps the locale segment of a path, e.g. /en/our-story -> /sv/our-story. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
