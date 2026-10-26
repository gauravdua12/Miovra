import { craftLine, crafts, type Product } from "./catalog";
import type { Dictionary } from "./dictionaries";
import type { Currency, Locale } from "./i18n";
import { resolveImage } from "./images";

/** Everything a product card needs, serialisable for client components. */
export interface CardData {
  slug: string;
  code: string;
  href: string;
  name: string;
  eyebrow: string;
  price: Record<Currency, number>;
  image: string | null;
  hoverImage: string | null;
  imageLabel: string;
  category: string;
  craft: string;
  craftName: string;
  region: string | null;
  madeToOrder: boolean;
  added: string;
}

export function toCard(p: Product, lang: Locale): CardData {
  return {
    slug: p.slug,
    code: p.code,
    href: `/${lang}/products/${p.slug}`,
    name: p.name[lang],
    eyebrow: craftLine(p, lang),
    price: p.price,
    image: resolveImage(p.images[0]),
    hoverImage: resolveImage(p.images[1]),
    imageLabel: p.name.en,
    category: p.category,
    craft: p.craft,
    craftName: crafts[p.craft][lang],
    region: p.region ?? null,
    madeToOrder: !!p.madeToOrder,
    added: p.added,
  };
}

/** The strings a product card uses, picked from the dictionary. */
export function cardText(t: Dictionary) {
  return {
    save: t.a11y.save,
    unsave: t.a11y.unsave,
    madeToOrder: t.product.madeToOrder,
    savedToast: t.product.savedToast,
    removedToast: t.product.removedToast,
  };
}
