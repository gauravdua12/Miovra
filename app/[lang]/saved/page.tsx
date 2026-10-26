import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SavedView } from "@/components/SavedView";
import { cardText, toCard } from "@/lib/cards";
import { products } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).wishlist.title, robots: { index: false } };
}

export default async function SavedPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <i className="lotus" aria-hidden="true" />
          <h1 className="display">{t.wishlist.title}</h1>
          <p>{t.wishlist.intro}</p>
        </div>
        <SavedView cards={products.map((p) => toCard(p, lang))} t={t.wishlist} cardText={cardText(t)} />
      </div>
    </section>
  );
}
