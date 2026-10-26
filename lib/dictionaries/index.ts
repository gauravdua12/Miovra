import type { Locale } from "../i18n";
import { en, type Dictionary } from "./en";
import { sv } from "./sv";

const dictionaries: Record<Locale, Dictionary> = { en, sv };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
