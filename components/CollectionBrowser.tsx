"use client";

import { useMemo, useState } from "react";
import type { CardData } from "@/lib/cards";
import type { Dictionary } from "@/lib/dictionaries";
import { fill, formatPrice } from "@/lib/i18n";
import { Icon } from "./Icon";
import { ProductCard, type CardText } from "./ProductCard";
import { usePrefs } from "./PrefsProvider";

const PAGE = 12;
type Sort = "featured" | "newest" | "priceAsc" | "priceDesc";
type Option = { value: string; label: string; count: number };

interface Props {
  cards: CardData[];
  categories: { slug: string; name: string }[];
  initialCategory?: string;
  t: Dictionary["collections"];
  cardText: CardText;
}

function toggle(set: string[], value: string) {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

export function CollectionBrowser({ cards, categories, initialCategory, t, cardText }: Props) {
  const { currency, lang } = usePrefs();
  const valid = categories.some((c) => c.slug === initialCategory);
  const [cats, setCats] = useState<string[]>(valid && initialCategory ? [initialCategory] : []);
  const [crafts, setCrafts] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [avail, setAvail] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [shown, setShown] = useState(PAGE);
  const [sidebar, setSidebar] = useState(true);
  const [sheet, setSheet] = useState(false);

  const priceCeiling = Math.max(...cards.map((c) => c.price[currency]));
  const priceFloor = Math.min(...cards.map((c) => c.price[currency]));
  const limit = maxPrice === null ? priceCeiling : Math.min(maxPrice, priceCeiling);

  const options = useMemo(() => {
    const count = (key: (c: CardData) => string | null) => {
      const m = new Map<string, number>();
      cards.forEach((c) => {
        const k = key(c);
        if (k) m.set(k, (m.get(k) ?? 0) + 1);
      });
      return m;
    };
    const catCount = count((c) => c.category);
    const craftCount = count((c) => c.craft);
    const regionCount = count((c) => c.region);
    const craftNames = new Map(cards.map((c) => [c.craft, c.craftName]));
    return {
      cats: categories.map((c) => ({ value: c.slug, label: c.name, count: catCount.get(c.slug) ?? 0 })).filter((o) => o.count),
      crafts: [...craftCount].map(([value, n]) => ({ value, label: craftNames.get(value) ?? value, count: n })),
      regions: [...regionCount].map(([value, n]) => ({ value, label: value, count: n })),
      avail: [
        { value: "ready", label: t.inStock, count: cards.filter((c) => !c.madeToOrder).length },
        { value: "order", label: t.madeToOrder, count: cards.filter((c) => c.madeToOrder).length },
      ].filter((o) => o.count),
    };
  }, [cards, categories, t.inStock, t.madeToOrder]);

  const results = useMemo(() => {
    const list = cards.filter(
      (c) =>
        (!cats.length || cats.includes(c.category)) &&
        (!crafts.length || crafts.includes(c.craft)) &&
        (!regions.length || (c.region && regions.includes(c.region))) &&
        (!avail.length || avail.includes(c.madeToOrder ? "order" : "ready")) &&
        c.price[currency] <= limit,
    );
    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => b.added.localeCompare(a.added));
    if (sort === "priceAsc") sorted.sort((a, b) => a.price[currency] - b.price[currency]);
    if (sort === "priceDesc") sorted.sort((a, b) => b.price[currency] - a.price[currency]);
    return sorted;
  }, [cards, cats, crafts, regions, avail, limit, sort, currency]);

  const update = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setShown(PAGE);
  };
  const clearAll = () => {
    setCats([]);
    setCrafts([]);
    setRegions([]);
    setAvail([]);
    setMaxPrice(null);
    setShown(PAGE);
  };
  const openFilters = () => {
    if (window.matchMedia("(max-width: 900px)").matches) setSheet(true);
    else setSidebar((s) => !s);
  };

  // Filters and sort only appear when there is something to choose between.
  const hasFilters =
    [options.cats, options.crafts, options.regions, options.avail].some((o) => o.length > 1) || priceFloor < priceCeiling;
  const canSort = cards.length > 1;
  const showSidebar = hasFilters && sidebar;
  const count = results.length === 1 ? t.piece : fill(t.pieces, { n: results.length });
  const visible = results.slice(0, shown);

  const group = (title: string, opts: Option[], selected: string[], set: (v: string[]) => void) =>
    opts.length > 1 && (
      <details className="filter-group" open>
        <summary>{title}</summary>
        <div className="opts">
          {opts.map((o) => (
            <label className="check" key={o.value}>
              <input type="checkbox" checked={selected.includes(o.value)} onChange={() => update(set)(toggle(selected, o.value))} />
              {o.label}
              <span className="n tabular">{o.count}</span>
            </label>
          ))}
        </div>
      </details>
    );

  return (
    <>
      {options.cats.length > 1 && (
        <div className="chips" role="group" aria-label={t.category}>
          <button type="button" className="chip" aria-pressed={cats.length === 0} onClick={() => update(setCats)([])}>
            {t.all}
          </button>
          {options.cats.map((c) => (
            <button
              type="button"
              key={c.value}
              className="chip"
              aria-pressed={cats.length === 1 && cats[0] === c.value}
              onClick={() => update(setCats)([c.value])}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="toolbar">
        {hasFilters ? (
          <button type="button" onClick={openFilters} aria-expanded={sidebar}>
            <Icon name="filter" />
            <span className="only-desktop">{sidebar ? t.hideFilters : t.showFilters}</span>
            <span className="only-mobile">{t.filterSort}</span>
          </button>
        ) : (
          <span />
        )}
        <span className="tabular" aria-live="polite">{count}</span>
        {canSort ? (
        <label>
          <span className="sr-only">{t.sort}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">{t.sort}: {t.sortFeatured}</option>
            <option value="newest">{t.sortNewest}</option>
            <option value="priceAsc">{t.sortPriceAsc}</option>
            <option value="priceDesc">{t.sortPriceDesc}</option>
          </select>
        </label>
        ) : (
          <span />
        )}
      </div>

      <div className={`plp${showSidebar ? "" : " no-filters"}${sheet ? " sheet-open" : ""}`}>
        {sheet && <div className="drawer-backdrop" onClick={() => setSheet(false)} />}
        {hasFilters && (
        <aside className="filters" aria-label={t.filterSort}>
          <div className="filters__close">
            <span className="eyebrow">{t.filterSort}</span>
            <button type="button" className="icon-btn" aria-label="Close" onClick={() => setSheet(false)}>
              <Icon name="close" />
            </button>
          </div>
          {group(t.category, options.cats, cats, setCats)}
          {group(t.craft, options.crafts, crafts, setCrafts)}
          {group(t.region, options.regions, regions, setRegions)}
          {priceFloor < priceCeiling && (
          <details className="filter-group" open>
            <summary>{t.price}</summary>
            <div className="price-range">
              <label htmlFor="price-max" className="tabular">{fill(t.upTo, { price: formatPrice(limit, currency, lang) })}</label>
              <input
                id="price-max"
                type="range"
                min={priceFloor}
                max={priceCeiling}
                step={currency === "SEK" ? 10 : 1}
                value={limit}
                onChange={(e) => update(setMaxPrice)(Number(e.target.value))}
              />
            </div>
          </details>
          )}
          {group(t.availability, options.avail, avail, setAvail)}
          <button type="button" className="link-caps filters__clear" onClick={clearAll}>{t.clear}</button>
          <button type="button" className="btn btn--block filters__apply" onClick={() => setSheet(false)}>
            {fill(t.showResults, { n: results.length })}
          </button>
        </aside>
        )}

        <div>
          {visible.length ? (
            <div className="grid-products">
              {visible.map((c, i) => (
                <ProductCard key={c.slug} card={c} t={cardText} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>{t.empty}</p>
              <button type="button" className="btn btn--outline" onClick={clearAll}>{t.clear}</button>
            </div>
          )}
          {results.length > PAGE && (
            <div className="more">
              <span className="tabular">{fill(t.showing, { shown: visible.length, total: results.length })}</span>
              <span className="more__bar"><span style={{ width: `${(visible.length / results.length) * 100}%` }} /></span>
              {shown < results.length && (
                <button type="button" className="btn btn--outline" onClick={() => setShown((s) => s + PAGE)}>{t.loadMore}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
