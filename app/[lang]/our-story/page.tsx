import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/Media";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { resolveImage } from "@/lib/images";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.story.title, description: t.home.story.excerpt };
}

export default async function OurStoryPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const [opening, ...rest] = t.story.paragraphs;
  const portrait = resolveImage("arti-portrait");

  return (
    <>
      <section className="section dark">
        <div className={`container story-teaser${portrait ? "" : " story-teaser--solo"}`}>
          {portrait && <Media src={portrait} alt="Arti, founder of Miovra" label="Portrait of Arti" sizes="(max-width: 900px) 90vw, 480px" priority />}
          <div className="story-teaser__text">
            <p className="eyebrow">{t.story.title}</p>
            <h1 className="quote">{opening}</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ display: "grid", justifyItems: "center" }}>
          <div className="prose">
            {rest.map((p, i) => (
              <p key={i} className={p.length < 40 ? "h3" : undefined} style={p.length < 40 ? { fontStyle: "italic", fontWeight: 500 } : undefined}>
                {p}
              </p>
            ))}
            <div style={{ marginTop: 16 }}>
              <p className="signature">{t.story.signoff}</p>
              <p className="eyebrow">{t.story.role}</p>
            </div>
            <span className="short-rule" aria-hidden="true" style={{ margin: "24px 0" }} />
            <Link href={`/${lang}/collections`} className="btn" style={{ justifySelf: "start" }}>{t.story.cta}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
