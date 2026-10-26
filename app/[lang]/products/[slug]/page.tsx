import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { Icon, type IconName } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Media } from "@/components/Media";
import { Reel } from "@/components/ReelGrid";
import { cardText, toCard } from "@/lib/cards";
import { craftLine, crafts, getCollection, madeSteps } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { focus } from "@/lib/focal";
import { resolveImage } from "@/lib/images";
import { getListedProduct, listedProducts } from "@/lib/listing";
import { site } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;
const assureIcons: IconName[] = ["hand", "truck", "return"];

export function generateStaticParams() {
  return locales.flatMap((lang) => listedProducts().map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getListedProduct(slug);
  if (!p || !isLocale(lang)) return {};
  return { title: p.name[lang], description: p.short[lang] };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const product = getListedProduct(slug);
  if (!isLocale(lang) || !product) notFound();
  const collection = getCollection(product.collection)!;
  const category = collection.categories.find((c) => c.slug === product.category);
  const t = getDictionary(lang);
  const pt = t.product;
  const name = product.name[lang];
  const related = listedProducts(collection.slug).filter((p) => p.slug !== slug).slice(0, 4);
  const images = product.images
    .map((base) => ({ src: resolveImage(base), label: product.name.en, focus: focus(base, "portrait") }))
    .filter((img) => img.src);
  // "How It Was Made" shows a reel when one is set, otherwise the collection's craft photo, otherwise just the steps.
  const reel = site.reels[0];
  const craftPhoto = resolveImage(collection.craftStory.image);
  const base = `/${lang}`;

  return (
    <>
      {/* P1 · Gallery and buy box */}
      <section className="container" style={{ paddingTop: 28 }}>
        <ol className="crumbs">
          <li><Link href={base}>{t.nav.home}</Link></li>
          <li><Link href={`${base}/collections/${collection.slug}`}>{collection.name[lang]}</Link></li>
          {category && collection.categories.length > 1 && (
            <li><Link href={`${base}/collections/${collection.slug}?category=${category.slug}`}>{category.name[lang]}</Link></li>
          )}
          <li aria-current="page">{name}</li>
        </ol>
        <div className="pdp">
          <ProductGallery images={images} name={name} t={pt} />
          <div className="buy">
            <p className="eyebrow">{craftLine(product, lang)} | {pt.handmade}</p>
            <h1 className="buy__title">{name}</h1>
            <p className="buy__note tabular">{pt.code}: {product.code}</p>
            <p className="lede" style={{ fontSize: 17 }}>{product.short[lang]}</p>
            <BuyBox
              slug={product.slug}
              code={product.code}
              name={name}
              price={product.price}
              sizes={product.sizes}
              madeToOrder={!!product.madeToOrder}
              t={pt}
            />
            <ul className="assure">
              {pt.assure.map((a, i) => (
                <li key={a}><Icon name={assureIcons[i]} />{a}</li>
              ))}
            </ul>
            <div>
              <details className="acc" open>
                <summary>{pt.details}</summary>
                <div className="acc__body">
                  <dl className="specs">
                    <dt>{pt.material}</dt><dd>{product.material[lang]}</dd>
                    <dt>{pt.craft}</dt><dd>{crafts[product.craft][lang]}</dd>
                    {product.region && <><dt>{pt.region}</dt><dd>{product.region}, India</dd></>}
                    {product.sizes && <><dt>{pt.dimensions}</dt><dd>{product.sizes.join(" · ")}</dd></>}
                    <dt>{pt.care}</dt><dd>{product.care[lang]}</dd>
                  </dl>
                </div>
              </details>
              <details className="acc">
                <summary>{pt.story}</summary>
                <div className="acc__body"><p>{product.story[lang]}</p></div>
              </details>
              <details className="acc">
                <summary>{pt.shipping}</summary>
                <div className="acc__body">
                  <p>{pt.shippingText}</p>
                  <Link href={`${base}/shipping-returns`} className="link-caps" style={{ justifySelf: "start" }}>{pt.shippingLink}</Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* P2 · How it was made */}
      <section className="section rule-top" style={{ marginTop: 96 }}>
        <div className={`container made${reel || craftPhoto ? "" : " made--solo"}`}>
          {reel ? (
            <Reel url={reel} index={0} t={t.home.reels} />
          ) : (
            craftPhoto && <Media src={craftPhoto} alt="" label="" sizes="(max-width: 900px) 100vw, 420px" className="made__media" />
          )}
          <div className="stack" style={{ gap: 24 }}>
            <p className="eyebrow">{pt.made.eyebrow}</p>
            <h2 className="h2">{pt.made.heading}</h2>
            <ol className="steps">
              {madeSteps[product.craft].map((s) => (
                <li key={s.title.en}>
                  <p><strong>{s.title[lang]}.</strong> {s.text[lang]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* P3 · You may also like */}
      {related.length > 0 && (
        <section className="section rule-top">
          <div className="container">
            <div className="section-head"><h2 className="h2">{pt.also}</h2></div>
            <div className="grid-products grid-related">
              {related.map((p) => (
                <ProductCard key={p.slug} card={toCard(p, lang)} t={cardText(t)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
