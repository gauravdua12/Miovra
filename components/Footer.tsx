import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { fill, type Locale } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const base = `/${lang}`;
  const wa = whatsappLink(t.home.gifts.whatsappText);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cols">
          <div className="footer__brand">
            <i className="logo-full" role="img" aria-label="Miovra, Crafted Elegance" />
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <h2>{t.footer.miovra}</h2>
            <ul>
              <li><Link href={`${base}/collections`}>{t.nav.collections}</Link></li>
              <li><Link href={`${base}/workshops`}>{t.nav.workshops}</Link></li>
              <li><Link href={`${base}/our-story`}>{t.nav.story}</Link></li>
              <li><Link href={`${base}/connect`}>{t.nav.connect}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{t.footer.help}</h2>
            <ul>
              <li><Link href={`${base}/connect?topic=gift`}>{t.nav.gifts}</Link></li>
              <li><Link href={`${base}/shipping-returns`}>{t.footer.shipping}</Link></li>
              <li><Link href={`${base}/privacy`}>{t.footer.privacy}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{t.footer.follow}</h2>
            <ul>
              {site.instagram && <li><a href={site.instagram} target="_blank" rel="noopener">Instagram</a></li>}
              {site.facebook && <li><a href={site.facebook} target="_blank" rel="noopener">Facebook</a></li>}
              {wa && <li><a href={wa} target="_blank" rel="noopener">WhatsApp</a></li>}
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bar">
          <span>{fill(t.footer.rights, { year: new Date().getFullYear() })}</span>
          <span>{t.footer.origin}</span>
        </div>
      </div>
    </footer>
  );
}
