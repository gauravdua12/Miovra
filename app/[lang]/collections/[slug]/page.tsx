import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import { Media } from "@/components/Media";
import { cardText, toCard } from "@/lib/cards";
import { collections, getCollection, productsIn } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { focus } from "@/lib/focal";
import { resolveImage } from "@/lib/images";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) => collections.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = getCollection(slug);
  if (!c || !isLocale(lang)) return {};
  return { title: c.name[lang], description: c.description[lang] };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang, slug } = await params;
  const { category } = await searchParams;
  const collection = getCollection(slug);
  if (!isLocale(lang) || !collection) notFound();
  const t = getDictionary(lang);
  const ct = t.collections;
  const story = collection.craftStory;

  return (
    <>
      {/* C1 · Banner */}
      <section className="page-banner">
        <Media src={resolveImage(collection.image)} alt={collection.imageAlt[lang]} label={collection.imageLabel} sizes="100vw" priority focus={focus(collection.image, "wide")} />
        <div className="page-banner__scrim" />
        <div className="container page-banner__text">
          <p className="eyebrow">{ct.eyebrow}</p>
          <h1 className="display">{collection.name[lang]}</h1>
        </div>
      </section>

      {/* C2 + C3 · Intro, chips, filters, grid */}
      <section className="container" style={{ paddingTop: 32 }}>
        <ol className="crumbs">
          <li><Link href={`/${lang}`}>{t.nav.home}</Link></li>
          <li><Link href={`/${lang}/collections`}>{t.nav.collections}</Link></li>
          <li aria-current="page">{collection.name[lang]}</li>
        </ol>
        <p className="lede" style={{ margin: "24px 0 28px" }}>{collection.description[lang]}</p>
        <CollectionBrowser
          cards={productsIn(collection.slug).map((p) => toCard(p, lang))}
          categories={collection.categories.map((c) => ({ slug: c.slug, name: c.name[lang] }))}
          initialCategory={category}
          t={ct}
          cardText={cardText(t)}
        />
      </section>

      {/* C4 · Custom order prompt */}
      <section className="section">
        <div className="container">
          <div className="prompt">
            <p className="eyebrow">{ct.custom.eyebrow}</p>
            <h2 className="h2">{ct.custom.heading}</h2>
            <p>{ct.custom.body}</p>
            <Link href={`/${lang}/connect?topic=gift`} className="btn">{ct.custom.cta}</Link>
          </div>
        </div>
      </section>

      {/* C5 · The craft */}
      <section className="section rule-top">
        <div className="container">
          <div className="band band--plain">
            <Media src={resolveImage(story.image)} alt="" label={story.imageLabel} sizes="(max-width: 900px) 100vw, 640px" />
            <div className="band__text">
              <p className="eyebrow">{ct.craftEyebrow}</p>
              <h2 className="h2">{story.title[lang]}</h2>
              <p>{story.body[lang]}</p>
              <Link href={`/${lang}#made`} className="link-caps">{ct.craftLink}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
