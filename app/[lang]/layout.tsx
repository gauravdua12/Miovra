import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PrefsProvider } from "@/components/PrefsProvider";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { collections } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { defaultCurrency, isLocale, locales } from "@/lib/i18n";
import { resolveImage } from "@/lib/images";
import { site } from "@/lib/site";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-jost", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#f7f3ec", viewportFit: "cover" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s · Miovra" },
    description: t.meta.description,
    icons: { icon: "/brand/lotus.png" },
    alternates: { languages: { en: "/en", sv: "/sv" } },
    openGraph: { siteName: "Miovra", locale: lang === "sv" ? "sv_SE" : "en_GB", type: "website" },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  // Pages are pre-rendered with the language's default currency; PrefsProvider then applies
  // the visitor's saved choice in the browser, so the server never renders per visitor.
  const currency = defaultCurrency(lang);
  const home = collections[0];

  return (
    <html lang={lang} className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <PrefsProvider lang={lang} initialCurrency={currency}>
          <a href="#main" className="skip">{t.a11y.skip}</a>
          <AnnouncementBar t={t} />
          <Header
            lang={lang}
            t={t}
            collections={[
              ...collections.map((c) => ({ href: `/${lang}/collections/${c.slug}`, name: c.name[lang] })),
              { href: `/${lang}/connect?topic=gift`, name: t.nav.gifts },
            ]}
            feature={{
              src: resolveImage(home.image),
              alt: home.imageAlt[lang],
              label: home.imageLabel,
              href: `/${lang}/collections/${home.slug}`,
            }}
          />
          <main id="main">{children}</main>
          <Footer lang={lang} t={t} />
          <WhatsAppFloat label={t.a11y.whatsapp} text={t.home.gifts.whatsappText} />
        </PrefsProvider>
      </body>
    </html>
  );
}
