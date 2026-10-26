import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Media } from "@/components/Media";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { resolveImage } from "@/lib/images";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.workshops.title, description: t.workshops.intro };
}

export default async function WorkshopsPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const w = t.workshops;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="band band--plain">
            <Media src={resolveImage("workshops")} alt="" label="Hands painting at a workshop table" sizes="(max-width: 900px) 100vw, 640px" priority />
            <div className="band__text">
              <p className="eyebrow">{t.home.workshops.eyebrow}</p>
              <h1 className="display">{w.title}</h1>
              <p className="lede">{w.intro}</p>
              <a href="#interest" className="btn">{t.home.workshops.cta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section rule-top">
        <div className="container split">
          <h2 className="h2">{w.expectHeading}</h2>
          <ul className="steps" style={{ counterReset: "step" }}>
            {w.expect.map((e) => <li key={e}><p>{e}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="section rule-top" id="dates">
        <div className="container split">
          <h2 className="h2">{w.datesHeading}</h2>
          <div className="stack" style={{ gap: 32 }}>
            <p className="lede">{w.datesBody}</p>
            <div className="stack">
              <h3 className="h3">{w.privateHeading}</h3>
              <p>{w.privateBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark" id="interest">
        <div className="container split">
          <div className="stack">
            <i className="lotus" aria-hidden="true" />
            <h2 className="h2">{w.formHeading}</h2>
          </div>
          <div className="on-dark">
            <EnquiryForm lang={lang} t={t.connect} topic="workshop" idPrefix="ws" />
          </div>
        </div>
      </section>
    </>
  );
}
