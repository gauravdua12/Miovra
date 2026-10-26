"use client";

import Link from "next/link";
import type { CardData } from "@/lib/cards";
import type { Dictionary } from "@/lib/dictionaries";
import { ProductCard, type CardText } from "./ProductCard";
import { usePrefs } from "./PrefsProvider";

export function SavedView({ cards, t, cardText }: { cards: CardData[]; t: Dictionary["wishlist"]; cardText: CardText }) {
  const { saved, lang } = usePrefs();
  const list = saved.map((s) => cards.find((c) => c.slug === s)).filter((c): c is CardData => !!c);

  if (!list.length) {
    return (
      <div className="empty">
        <p>{t.empty}</p>
        <Link href={`/${lang}/collections`} className="btn">{t.browse}</Link>
      </div>
    );
  }
  return (
    <div className="stack" style={{ gap: 40 }}>
      <div className="plp no-filters" style={{ marginTop: 0 }}>
        <div className="grid-products">
          {list.map((c) => <ProductCard key={c.slug} card={c} t={cardText} />)}
        </div>
      </div>
      <Link href={`/${lang}/connect?topic=piece&items=${list.map((c) => c.slug).join(",")}`} className="btn" style={{ justifySelf: "center" }}>
        {t.enquireAll}
      </Link>
    </div>
  );
}
