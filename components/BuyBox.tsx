"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { fill, type Currency } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { Icon } from "./Icon";
import { Price } from "./Price";
import { usePrefs } from "./PrefsProvider";

interface Props {
  slug: string;
  code: string;
  name: string;
  price: Record<Currency, number>;
  sizes?: string[];
  madeToOrder: boolean;
  t: Dictionary["product"];
}

/** Size choice and the enquiry actions. Miovra sells by enquiry, so there is no cart. */
export function BuyBox({ slug, code, name, price, sizes, madeToOrder, t }: Props) {
  const { lang, saved, toggleSaved, toast } = usePrefs();
  const [size, setSize] = useState(sizes?.[0]);
  const isSaved = saved.includes(slug);

  const query = new URLSearchParams({ topic: "piece", product: slug });
  if (size && sizes && sizes.length > 1) query.set("size", size);
  const enquireHref = `/${lang}/connect?${query}`;
  const wa = whatsappLink(fill(t.whatsappText, { name: size && sizes && sizes.length > 1 ? `${name}, ${size}` : name, code }));

  return (
    <>
      <p>
        <Price price={price} className="buy__price" />
        <br />
        <span className="buy__note">{t.priceNote}</span>
      </p>
      {madeToOrder && <p className="eyebrow">{t.madeToOrder}</p>}
      {sizes && sizes.length > 1 && (
        <div className="stack" style={{ gap: 10 }}>
          <p className="eyebrow" id="size-label">{t.size}</p>
          <div className="chips" role="group" aria-labelledby="size-label">
            {sizes.map((s) => (
              <button key={s} type="button" aria-pressed={s === size} className="chip" onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="stack" style={{ gap: 12 }}>
        <Link href={enquireHref} className="btn btn--block">{t.enquire}</Link>
        {wa && (
          <a href={wa} target="_blank" rel="noopener" className="btn btn--outline btn--block">
            <Icon name="chat" /> {t.whatsapp}
          </a>
        )}
        <button
          type="button"
          className="link-caps"
          style={{ justifySelf: "start", marginTop: 4 }}
          aria-pressed={isSaved}
          onClick={() => toast(toggleSaved(slug) ? t.savedToast : t.removedToast)}
        >
          {isSaved ? t.saved : t.save}
        </button>
      </div>
      <div className="sticky-buy">
        <span>
          <span className="card__name" style={{ display: "block", fontSize: 18 }}>{name}</span>
          <Price price={price} />
        </span>
        <Link href={enquireHref} className="btn">{t.enquireShort}</Link>
      </div>
    </>
  );
}
