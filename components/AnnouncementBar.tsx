import type { Dictionary } from "@/lib/dictionaries";
import { CurrencyToggle, LanguageToggle } from "./Toggles";

export function AnnouncementBar({ t }: { t: Pick<Dictionary, "announcement" | "prefs"> }) {
  return (
    <div className="announce">
      <div className="container announce__inner">
        <p className="announce__msg">{t.announcement}</p>
        <div className="announce__prefs">
          <LanguageToggle label={t.prefs.language} />
          <CurrencyToggle label={t.prefs.currency} />
        </div>
      </div>
    </div>
  );
}
