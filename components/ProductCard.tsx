"use client";

import Link from "next/link";
import type { CardData } from "@/lib/cards";
import { fill } from "@/lib/i18n";
import { Icon } from "./Icon";
import { Media } from "./Media";
import { Price } from "./Price";
import { usePrefs } from "./PrefsProvider";

export interface CardText {
  save: string;
  unsave: string;
  madeToOrder: string;
  savedToast: string;
  removedToast: string;
}

export function ProductCard({ card, t, priority }: { card: CardData; t: CardText; priority?: boolean }) {
  const { saved, toggleSaved, toast } = usePrefs();
  const isSaved = saved.includes(card.slug);
  const sizes = "(max-width: 900px) 50vw, 300px";

  return (
    <article className="card">
      <div style={{ position: "relative" }}>
        <Media src={card.image} alt={card.name} label={card.imageLabel} sizes={sizes} priority={priority} />
        {card.madeToOrder && <span className="card__badge">{t.madeToOrder}</span>}
        <button
          type="button"
          className="icon-btn card__heart"
          aria-pressed={isSaved}
          aria-label={fill(isSaved ? t.unsave : t.save, { name: card.name })}
          onClick={() => toast(toggleSaved(card.slug) ? t.savedToast : t.removedToast)}
        >
          <Icon name="heart" />
        </button>
      </div>
      <p className="eyebrow card__eyebrow">{card.eyebrow}</p>
      <h3 className="card__name">
        <Link href={card.href}>{card.name}</Link>
      </h3>
      <Price price={card.price} className="card__price" />
    </article>
  );
}
