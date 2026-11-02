// Collections and pieces.
// Images are base names in public/images; missing files render as placeholders.
import type { Currency, L10n, Locale } from "./i18n";

export type CraftSlug = "hand-block-print" | "patchwork" | "folk-painting" | "paint-kit";

export const crafts: Record<CraftSlug, L10n> = {
  "hand-block-print": { en: "Hand Block Print", sv: "Handtryck med block" },
  patchwork: { en: "Patchwork", sv: "Patchwork" },
  "folk-painting": { en: "Folk Painting", sv: "Folkkonstmålning" },
  "paint-kit": { en: "Paint-Your-Own Kit", sv: "Måla själv-kit" },
};

export interface Category {
  slug: string;
  name: L10n;
}

export interface CraftStory {
  title: L10n;
  body: L10n;
  image: string;
  imageLabel: string;
}

export interface Collection {
  slug: string;
  name: L10n;
  description: L10n;
  image: string;
  imageLabel: string;
  imageAlt: L10n;
  categories: Category[];
  craftStory: CraftStory;
}

export interface Product {
  slug: string;
  code: string;
  collection: string;
  category: string;
  craft: CraftSlug;
  region?: string;
  name: L10n;
  price: Record<Currency, number>;
  sizes?: string[];
  material: L10n;
  care: L10n;
  short: L10n;
  story: L10n;
  madeToOrder?: boolean;
  /** Image base names, first is the main photo. */
  images: string[];
  /** ISO date the piece was added, used for "Newest". */
  added: string;
}

const blockPrintStory: CraftStory = {
  title: { en: "Hand Block Printing", sv: "Blocktryck för hand" },
  body: {
    en: "Each pattern starts as a design carved into a wooden block. The printer dips the block in natural dye and presses it onto the cloth by hand, one impression at a time, lining up every repeat by eye. Small shifts in colour and line are the mark of the hand.",
    sv: "Varje mönster börjar som en design som snidas i ett träblock. Trycksaren doppar blocket i naturlig färg och pressar det mot tyget för hand, ett avtryck i taget, och passar in varje upprepning med blotta ögat. Små skiftningar i färg och linje är handens signatur.",
  },
  image: "workshops",
  imageLabel: "Block-printing table with carved blocks and dyes",
};

export const collections: Collection[] = [
  {
    slug: "home-decor",
    name: { en: "Home Decor", sv: "Heminredning" },
    description: {
      en: "Table runners, placemats, cushion covers and napkins in natural-dye block prints; patchwork and embroidered wall hangings, tapestries and more.",
      sv: "Bordslöpare, bordstabletter, kuddfodral och servetter i blocktryck med naturliga färger; väggbonader och gobelänger i patchwork och broderi, och mycket mer.",
    },
    image: "collection-home-decor",
    imageLabel: "Block-print table runner and napkins",
    imageAlt: {
      en: "A hand block-printed table runner and folded napkins on a wooden table beside a brass vase of jasmine.",
      sv: "En handtryckt bordslöpare och vikta servetter på ett träbord bredvid en mässingsvas med jasmin.",
    },
    categories: [
      { slug: "table-runners", name: { en: "Table Runners", sv: "Bordslöpare" } },
      { slug: "placemats", name: { en: "Placemats", sv: "Bordstabletter" } },
      { slug: "cushion-covers", name: { en: "Cushion Covers", sv: "Kuddfodral" } },
      { slug: "napkins", name: { en: "Napkins", sv: "Servetter" } },
      { slug: "wall-hangings", name: { en: "Wall Hangings & Tapestries", sv: "Väggbonader & gobelänger" } },
    ],
    craftStory: blockPrintStory,
  },
  {
    slug: "folk-art-paintings",
    name: { en: "Folk Art & Paintings", sv: "Folkkonst & målningar" },
    description: {
      en: "Paintings by independent artists who are keeping the folk art traditions alive. Own it with pride.",
      sv: "Målningar av självständiga konstnärer som håller folkkonstens traditioner vid liv. Äg den med stolthet.",
    },
    image: "collection-folk-art",
    imageLabel: "Framed peacock folk painting",
    imageAlt: {
      en: "A framed folk painting of a peacock among flowers, leaning on a wooden shelf beside a potted plant.",
      sv: "En inramad folkkonstmålning av en påfågel bland blommor, lutad mot en trähylla bredvid en krukväxt.",
    },
    categories: [{ slug: "paintings", name: { en: "Paintings", sv: "Målningar" } }],
    craftStory: {
      title: { en: "Folk Painting", sv: "Folkkonstmålning" },
      body: {
        en: "India's folk painting traditions grew on village walls, floors and festival cloths, with patterns passed down through families. Artists still work by hand with fine brushes, filling every space with flowers, birds and vines. No two paintings are ever the same.",
        sv: "Indiens folkkonsttraditioner växte fram på bymurar, golv och festtyger, där mönstren gick i arv inom familjer. Konstnärerna arbetar fortfarande för hand med fina penslar och fyller varje yta med blommor, fåglar och rankor. Inga två målningar är någonsin lika.",
      },
      image: "craft-folk-painting",
      imageLabel: "Artist painting fine folk motifs",
    },
  },
  {
    slug: "bags-accessories",
    name: { en: "Bags & Accessories", sv: "Väskor & accessoarer" },
    description: {
      en: "Block-printed beauty for everyday.",
      sv: "Blocktryckt skönhet för vardagen.",
    },
    image: "collection-bags",
    imageLabel: "Block-print tote and zip pouch",
    imageAlt: {
      en: "A floral block-printed tote bag and matching zip pouch on a wooden table.",
      sv: "En blommig blocktryckt tygkasse och en matchande necessär på ett träbord.",
    },
    categories: [
      { slug: "tote-bags", name: { en: "Tote Bags", sv: "Tygkassar" } },
      { slug: "pouches", name: { en: "Pouches", sv: "Necessärer" } },
      { slug: "sets", name: { en: "Sets", sv: "Set" } },
    ],
    craftStory: blockPrintStory,
  },
  {
    slug: "diy-kits",
    name: { en: "DIY Kits", sv: "Gör det själv-kit" },
    description: {
      en: "Everything you need to paint your own folk-art piece at home: a cotton tote with the design drawn on, earthy fabric paints, a brush and step-by-step guidance.",
      sv: "Allt du behöver för att måla ditt eget folkkonstverk hemma: en bomullskasse med förtecknat motiv, jordnära textilfärger, en pensel och steg-för-steg-instruktioner.",
    },
    image: "collection-diy-kits",
    imageLabel: "Painted tote with paint jars and brush",
    imageAlt: {
      en: "A cotton tote painted with a folk-art flower, next to small jars of earthy paint and a brush.",
      sv: "En bomullskasse målad med en folkkonstblomma, bredvid små burkar med jordnära färg och en pensel.",
    },
    categories: [{ slug: "kits", name: { en: "Kits", sv: "Kit" } }],
    craftStory: {
      title: { en: "Painting at Home", sv: "Att måla hemma" },
      body: {
        en: "Our kits bring the patience of folk painting to your own table. The design is drawn on for you, so you can focus on colour and brushwork. Work slowly, layer by layer, the way the artists do.",
        sv: "Våra kit tar med folkkonstens tålamod till ditt eget bord. Motivet är redan förtecknat, så att du kan fokusera på färg och penseldrag. Arbeta långsamt, lager för lager, så som konstnärerna gör.",
      },
      image: "craft-diy-painting",
      imageLabel: "Painting a kit at home",
    },
  },
];

// The pieces for sale. Empty until the real catalogue arrives: each collection page shows a
// "coming soon" note until it has a piece. A piece appears once its main photo is in
// public/images (see lib/listing.ts). Example:
//
// {
//   slug: "jaal-vine-table-runner", code: "MIO-HD-TR-001", collection: "home-decor", category: "table-runners",
//   craft: "hand-block-print", region: "Rajasthan",
//   name: { en: "Jaal Vine Table Runner", sv: "Bordslöpare Jaal Vine" },
//   price: { EUR: 64, SEK: 745 }, sizes: ["35 × 180 cm"],
//   material: { en: "100% cotton", sv: "100 % bomull" },
//   care: { en: "Hand wash cold, dry in shade.", sv: "Handtvätt i kallt vatten, torka i skugga." },
//   short: { en: "…", sv: "…" }, story: { en: "…", sv: "…" },
//   images: ["products/jaal-vine-table-runner"], added: "2026-11-02",
// },
export const products: Product[] = [];

/** Steps for "How It Was Made", by craft. */
export const madeSteps: Record<CraftSlug, { title: L10n; text: L10n }[]> = {
  "hand-block-print": [
    { title: { en: "Carving the blocks", sv: "Snida blocken" }, text: { en: "The pattern is hand-carved into wood, one block for each colour.", sv: "Mönstret snidas för hand i trä, ett block för varje färg." } },
    { title: { en: "Preparing the dyes", sv: "Förbereda färgerna" }, text: { en: "Colours are mixed from natural sources and tested on scrap cloth.", sv: "Färgerna blandas av naturliga råvaror och provas på tygrester." } },
    { title: { en: "Printing by hand", sv: "Trycka för hand" }, text: { en: "The cloth is printed one impression at a time, then washed and sun-dried.", sv: "Tyget trycks ett avtryck i taget och tvättas sedan och soltorkas." } },
  ],
  patchwork: [
    { title: { en: "Choosing the cloth", sv: "Välja tygerna" }, text: { en: "Printed and embroidered fabrics are sorted by colour and weight.", sv: "Tryckta och broderade tyger sorteras efter färg och vikt." } },
    { title: { en: "Piecing", sv: "Sy ihop" }, text: { en: "Pieces are cut and joined by hand into the overall design.", sv: "Bitarna klipps och sys ihop för hand till helheten." } },
    { title: { en: "Quilting", sv: "Kvilta" }, text: { en: "Rows of small running stitches hold the layers together.", sv: "Rader av små förstygn håller ihop lagren." } },
  ],
  "folk-painting": [
    { title: { en: "Preparing the paper", sv: "Förbereda papperet" }, text: { en: "Handmade paper is sized and smoothed so the pigment sits evenly.", sv: "Handgjort papper limmas och slätas så att pigmentet lägger sig jämnt." } },
    { title: { en: "Drawing the outline", sv: "Teckna konturen" }, text: { en: "The artist draws the composition freehand with a fine brush.", sv: "Konstnären tecknar kompositionen på fri hand med en fin pensel." } },
    { title: { en: "Filling with colour", sv: "Fylla med färg" }, text: { en: "Colours are built up in layers, then the details are added last.", sv: "Färgerna byggs upp i lager och detaljerna läggs till sist." } },
  ],
  "paint-kit": [
    { title: { en: "Drawing the motif", sv: "Teckna motivet" }, text: { en: "Each design is drawn on by hand from a folk-art original.", sv: "Varje motiv tecknas för hand efter ett folkkonstoriginal." } },
    { title: { en: "Choosing the paints", sv: "Välja färgerna" }, text: { en: "Earthy fabric paints are chosen to echo natural dyes.", sv: "Jordnära textilfärger väljs för att likna naturliga färgämnen." } },
    { title: { en: "Packing the kit", sv: "Packa kitet" }, text: { en: "Everything is packed by hand in Sweden with an illustrated guide.", sv: "Allt packas för hand i Sverige tillsammans med en illustrerad guide." } },
  ],
};

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsIn(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function craftLine(p: Product, lang: Locale): string {
  return [crafts[p.craft][lang], p.region].filter(Boolean).join(" • ");
}

export function searchProducts(q: string, lang: Locale): Product[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((p) => {
    const collection = getCollection(p.collection);
    const haystack = [
      p.name[lang], p.short[lang], crafts[p.craft][lang], p.region ?? "", collection?.name[lang] ?? "",
      collection?.categories.find((c) => c.slug === p.category)?.name[lang] ?? "",
    ].join(" ").toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
