import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { cardText, toCard } from "@/lib/cards";
import { searchProducts } from "@/lib/catalog";
import { onlyListed } from "@/lib/listing";
import { getDictionary } from "@/lib/dictionaries";
import { fill, isLocale } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).search.title, robots: { index: false } };
}

export default async function SearchPage({ params, searchParams }: { params: Params; searchParams: Promise<{ q?: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const q = ((await searchParams).q ?? "").trim().slice(0, 80);
  const t = getDictionary(lang);
  const results = q ? onlyListed(searchProducts(q, lang)) : [];

  return (
    <section className="section">
      <div className="container">
        <form className="section-head" action={`/${lang}/search`} role="search">
          <h1 className="display">{t.search.title}</h1>
          <label htmlFor="q" className="sr-only">{t.search.label}</label>
          <div className="field-row" style={{ width: "min(560px, 100%)" }}>
            <input id="q" name="q" type="search" defaultValue={q} placeholder={t.search.placeholder} autoFocus={!q} />
            <button className="btn" type="submit">{t.search.submit}</button>
          </div>
          {q && (
            <p aria-live="polite">
              {results.length ? fill(results.length === 1 ? t.search.result : t.search.results, { n: results.length, q }) : fill(t.search.none, { q })}
            </p>
          )}
        </form>
        {results.length > 0 && (
          <div className="plp no-filters" style={{ marginTop: 0 }}>
            <div className="grid-products">
              {results.map((p) => <ProductCard key={p.slug} card={toCard(p, lang)} t={cardText(t)} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
