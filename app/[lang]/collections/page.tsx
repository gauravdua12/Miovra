import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionTile } from "@/components/CollectionTile";
import { Media } from "@/components/Media";
import { collections } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { resolveImage } from "@/lib/images";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.collections.indexTitle, description: t.collections.indexIntro };
}

export default async function CollectionsIndex({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const g = t.home.gifts;

  return (
    <>
      <section className="container page-banner page-banner--plain">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <i className="lotus" aria-hidden="true" />
          <h1 className="display">{t.collections.indexTitle}</h1>
          <p className="lede">{t.collections.indexIntro}</p>
        </div>
      </section>
      <section className="section--tight">
        <div className="container tiles">
          {collections.map((c) => (
            <CollectionTile key={c.slug} collection={c} lang={lang} />
          ))}
        </div>
      </section>
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="band">
            <Media src={resolveImage("gifts-custom")} alt={g.alt} label="Gift box with Miovra ribbon" sizes="(max-width: 900px) 100vw, 640px" />
            <div className="band__text">
              <p className="eyebrow">{g.eyebrow}</p>
              <h2 className="h2">{g.heading}</h2>
              <p>{g.body}</p>
              <Link href={`/${lang}/connect?topic=gift`} className="btn">{g.message}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
