import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionTile } from "@/components/CollectionTile";
import { Icon, type IconName } from "@/components/Icon";
import { Media } from "@/components/Media";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ReelGrid } from "@/components/ReelGrid";
import { ContactList } from "@/components/ContactList";
import { collections } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { resolveImage } from "@/lib/images";
import { site, whatsappLink } from "@/lib/site";

const featureIcons: IconName[] = ["block", "brush", "needle"];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const h = t.home;
  const base = `/${lang}`;
  const giftsWa = whatsappLink(h.gifts.whatsappText);

  return (
    <>
      {/* H2 · Banner and "Crafted Elegance" */}
      <section className="hero">
        <Media
          src={resolveImage("banner-home")}
          alt={h.heroAlt}
          label="Banner: block-print cushions on a wooden bench"
          sizes="100vw"
          priority
          className="hero__media"
        />
        <div className="container hero__copy">
          <i className="lotus" aria-hidden="true" />
          <h1 className="display">{h.heading}</h1>
          <span className="short-rule" aria-hidden="true" />
          <p className="lede">{h.line}</p>
          <Link href={`${base}/collections`} className="btn">{h.cta}</Link>
        </div>
      </section>

      {/* H3 · Our Promise */}
      <section className="section rule-top">
        <div className="container">
          <div className="split">
            <div className="stack">
              <p className="eyebrow">{h.promise.eyebrow}</p>
              <h2 className="h2">{h.promise.heading}</h2>
            </div>
            <p className="lede">{h.promise.body}</p>
          </div>
          <div className="features">
            {h.promise.features.map((f, i) => (
              <div className="feature reveal" key={f.title}>
                <Icon name={featureIcons[i]} />
                <h3 className="h3">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H4 · See How It Is Made */}
      <section className="section rule-top" id="made">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{h.reels.eyebrow}</p>
            <h2 className="h2">{h.reels.heading}</h2>
            <p>{h.reels.line}</p>
          </div>
          <ReelGrid urls={site.reels} t={h.reels} />
          {site.instagram && (
            <p className="center stack" style={{ marginTop: 40 }}>
              <a href={site.instagram} className="link-caps" target="_blank" rel="noopener">{h.reels.follow}</a>
            </p>
          )}
        </div>
      </section>

      {/* H5 · Collections */}
      <section className="section rule-top" id="collections">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{h.collections.eyebrow}</p>
            <h2 className="h2">{h.collections.heading}</h2>
          </div>
          <div className="tiles">
            {collections.map((c) => (
              <CollectionTile key={c.slug} collection={c} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* H6 · Gifts & Custom Orders */}
      <section className="section--tight">
        <div className="container">
          <div className="band">
            <Media src={resolveImage("gifts-custom")} alt={h.gifts.alt} label="Gift box with Miovra ribbon" sizes="(max-width: 900px) 100vw, 640px" />
            <div className="band__text">
              <p className="eyebrow">{h.gifts.eyebrow}</p>
              <h2 className="h2">{h.gifts.heading}</h2>
              <p>{h.gifts.body}</p>
              <div className="btn-row">
                <Link href={`${base}/connect?topic=gift`} className="btn">{h.gifts.message}</Link>
                {giftsWa && (
                  <a href={giftsWa} className="btn btn--outline" target="_blank" rel="noopener">
                    <Icon name="chat" /> {h.gifts.whatsapp}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H7 · Workshops */}
      <section className="section">
        <div className="container">
          <div className="band band--plain band--flip">
            <Media src={resolveImage("workshops")} alt="" label="Hands painting at a workshop table" sizes="(max-width: 900px) 100vw, 640px" />
            <div className="band__text">
              <p className="eyebrow">{h.workshops.eyebrow}</p>
              <h2 className="h2">{h.workshops.heading}</h2>
              <p>{h.workshops.body}</p>
              <div className="btn-row">
                <Link href={`${base}/workshops#interest`} className="btn">{h.workshops.cta}</Link>
                <Link href={`${base}/workshops#dates`} className="link-caps">{h.workshops.dates}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H8 · Our Story teaser */}
      <section className="section dark">
        <div className="container story-teaser">
          <Media src={resolveImage("arti-portrait")} alt="Arti, founder of Miovra" label="Portrait of Arti" sizes="(max-width: 900px) 90vw, 480px" />
          <div className="story-teaser__text">
            <p className="eyebrow">{h.story.eyebrow}</p>
            <p className="quote">{h.story.quote}</p>
            <p className="lede">{h.story.excerpt}</p>
            <p className="signature">{h.story.signoff}</p>
            <Link href={`${base}/our-story`} className="btn btn--light-outline">{h.story.cta}</Link>
          </div>
        </div>
      </section>

      {/* H9 · Connect With Us */}
      <section className="section">
        <div className="container connect">
          <div className="stack" style={{ alignContent: "start" }}>
            <p className="eyebrow">{h.connect.eyebrow}</p>
            <h2 className="h2">{h.connect.heading}</h2>
            <p className="lede">{h.connect.body}</p>
          </div>
          <div className="stack" style={{ gap: 40 }}>
            <ContactList t={h.connect} />
            <NewsletterForm lang={lang} t={h.connect} />
          </div>
        </div>
      </section>
    </>
  );
}
