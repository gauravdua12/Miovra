// Collections and pieces. PRODUCTS ARE SAMPLE DATA until the real catalogue arrives
// (names, prices, sizes and codes are placeholders; see CONTENT-TODO.md).
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
  image: "craft-block-printing",
  imageLabel: "Printer pressing a carved block onto cloth",
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
      image: "workshops",
      imageLabel: "Hands painting at a workshop table",
    },
  },
];

const cotton: L10n = { en: "100% cotton", sv: "100 % bomull" };
const washCare: L10n = { en: "Hand wash cold, dry in shade, iron on the reverse.", sv: "Handtvätt i kallt vatten, torka i skugga, stryk på avigsidan." };
const paintingCare: L10n = { en: "Keep out of direct sunlight; dust gently with a soft dry cloth.", sv: "Undvik direkt solljus; damma försiktigt med en mjuk, torr trasa." };
const blockStory: L10n = {
  en: "Each colour is printed with its own carved block, so the pattern builds up layer by layer across the cloth. Slight shifts in colour and alignment are part of its character, and no two pieces are exactly alike.",
  sv: "Varje färg trycks med sitt eget snidade block, så att mönstret byggs upp lager för lager över tyget. Små skiftningar i färg och passning är en del av dess karaktär, och inga två föremål är exakt lika.",
};
const paintingStory: L10n = {
  en: "Painted by hand with fine brushes, this piece follows motifs passed down through generations of folk artists. Every line is drawn freehand, so small irregularities are a sign of the hand behind it.",
  sv: "Målningen är gjord för hand med fina penslar och följer motiv som gått i arv genom generationer av folkkonstnärer. Varje linje är frihandsritad, så små ojämnheter är ett tecken på handen bakom den.",
};

export const products: Product[] = [
  {
    slug: "jaal-vine-table-runner", code: "MIO-HD-TR-001", collection: "home-decor", category: "table-runners",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Jaal Vine Table Runner", sv: "Bordslöpare Jaal Vine" },
    price: { EUR: 64, SEK: 745 }, sizes: ["35 × 180 cm", "35 × 230 cm"], material: cotton, care: washCare,
    short: {
      en: "Climbing vines and open blossoms in madder red, indigo and sage, printed by hand on soft natural cotton.",
      sv: "Klängande rankor och öppna blommor i krappröd, indigo och salvia, handtryckta på mjuk naturfärgad bomull.",
    },
    story: blockStory, images: ["collection-home-decor", "products/jaal-vine-table-runner-2"], added: "2026-10-01",
  },
  {
    slug: "teal-paisley-cushion-cover", code: "MIO-HD-CC-001", collection: "home-decor", category: "cushion-covers",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Teal Paisley Cushion Cover", sv: "Kuddfodral Teal Paisley" },
    price: { EUR: 42, SEK: 490 }, sizes: ["45 × 45 cm"], material: cotton, care: washCare,
    short: {
      en: "Paisleys and blossoms in rust and gold on a deep teal ground, with a hidden zip.",
      sv: "Paisleymönster och blommor i rost och guld på djupt blågrön botten, med dold dragkedja.",
    },
    story: blockStory, images: ["banner-home"], added: "2026-10-03",
  },
  {
    slug: "buti-cushion-cover-ecru", code: "MIO-HD-CC-002", collection: "home-decor", category: "cushion-covers",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Buti Cushion Cover, Ecru", sv: "Kuddfodral Buti, ecru" },
    price: { EUR: 38, SEK: 440 }, sizes: ["45 × 45 cm"], material: cotton, care: washCare,
    short: {
      en: "Small flowering-plant motifs in madder and leaf green, spaced evenly on natural ecru cotton.",
      sv: "Små blommande växtmotiv i krapp och lövgrönt, jämnt utspridda på naturfärgad ecru-bomull.",
    },
    story: blockStory, images: ["products/buti-cushion-cover-ecru"], added: "2026-09-20",
  },
  {
    slug: "garden-trellis-napkins", code: "MIO-HD-NP-001", collection: "home-decor", category: "napkins",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Garden Trellis Napkins, Set of 4", sv: "Servetter Garden Trellis, 4-pack" },
    price: { EUR: 36, SEK: 420 }, sizes: ["45 × 45 cm"], material: cotton, care: washCare,
    short: {
      en: "A small trellis of buds and leaves, edged with a fine printed border. Softens with every wash.",
      sv: "Ett litet spaljémönster av knoppar och blad med en fin tryckt bård. Blir mjukare för varje tvätt.",
    },
    story: blockStory, images: ["products/garden-trellis-napkins"], added: "2026-09-12",
  },
  {
    slug: "floral-border-placemats", code: "MIO-HD-PM-001", collection: "home-decor", category: "placemats",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Floral Border Placemats, Set of 4", sv: "Bordstabletter Floral Border, 4-pack" },
    price: { EUR: 48, SEK: 560 }, sizes: ["33 × 48 cm"], material: cotton, care: washCare,
    short: {
      en: "Quilted placemats with a wide floral border and a quiet centre, made to frame the plate.",
      sv: "Quiltade bordstabletter med en bred blommig bård och ett lugnt mittparti som ramar in tallriken.",
    },
    story: blockStory, images: ["products/floral-border-placemats"], added: "2026-09-05",
  },
  {
    slug: "mughal-floral-table-runner", code: "MIO-HD-TR-002", collection: "home-decor", category: "table-runners",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Mughal Floral Table Runner", sv: "Bordslöpare Mughal Floral" },
    price: { EUR: 58, SEK: 675 }, sizes: ["35 × 180 cm"], material: cotton, care: washCare,
    short: {
      en: "Single stems in the Mughal manner, printed in rows on undyed cotton with a narrow vine border.",
      sv: "Enskilda blomstänglar i mogulisk stil, tryckta i rader på ofärgad bomull med en smal rankbård.",
    },
    story: blockStory, images: ["products/mughal-floral-table-runner"], added: "2026-08-28",
  },
  {
    slug: "patchwork-wall-hanging", code: "MIO-HD-WH-001", collection: "home-decor", category: "wall-hangings",
    craft: "patchwork", region: "Gujarat",
    name: { en: "Patchwork Wall Hanging", sv: "Väggbonad i patchwork" },
    price: { EUR: 120, SEK: 1395 }, sizes: ["90 × 120 cm"], material: cotton,
    care: { en: "Dry clean or gently hand wash cold. Hang away from direct sun.", sv: "Kemtvätt eller varsam handtvätt i kallt vatten. Häng skyddat från direkt sol." },
    short: {
      en: "Pieced by hand from printed and embroidered cloth, finished with running-stitch quilting.",
      sv: "Sydd för hand av tryckta och broderade tyger, med kviltning i förstygn.",
    },
    story: {
      en: "Patchwork hangings are pieced together from carefully chosen fabrics, then quilted by hand with rows of small running stitches. Each one is assembled individually, so the arrangement of every hanging is unique.",
      sv: "Väggbonader i patchwork sys ihop av noga utvalda tyger och kviltas sedan för hand med rader av små förstygn. Var och en sätts samman individuellt, så varje bonad är unik.",
    },
    madeToOrder: true, images: ["products/patchwork-wall-hanging"], added: "2026-10-10",
  },
  {
    slug: "peacock-garden-painting", code: "MIO-FA-PT-001", collection: "folk-art-paintings", category: "paintings",
    craft: "folk-painting",
    name: { en: "Peacock Garden Painting", sv: "Målning Påfågelsträdgård" },
    price: { EUR: 145, SEK: 1690 }, sizes: ["30 × 40 cm, framed"],
    material: { en: "Natural pigments on handmade paper, wooden frame", sv: "Naturpigment på handgjort papper, träram" },
    care: paintingCare,
    short: {
      en: "A peacock in teal and gold among marigolds and climbing vines, framed in carved, weathered wood.",
      sv: "En påfågel i blågrönt och guld bland ringblommor och klängande rankor, i en snidad, patinerad träram.",
    },
    story: paintingStory, images: ["collection-folk-art"], added: "2026-10-12",
  },
  {
    slug: "lotus-pond-painting", code: "MIO-FA-PT-002", collection: "folk-art-paintings", category: "paintings",
    craft: "folk-painting",
    name: { en: "Lotus Pond Painting", sv: "Målning Lotusdamm" },
    price: { EUR: 120, SEK: 1395 }, sizes: ["25 × 35 cm, framed"],
    material: { en: "Natural pigments on handmade paper, wooden frame", sv: "Naturpigment på handgjort papper, träram" },
    care: paintingCare,
    short: {
      en: "Fish weave between open lotuses in a pond drawn with fine, rhythmic lines.",
      sv: "Fiskar slingrar sig mellan öppna lotusblommor i en damm tecknad med fina, rytmiska linjer.",
    },
    story: paintingStory, images: ["products/lotus-pond-painting"], added: "2026-09-18",
  },
  {
    slug: "tree-of-life-painting", code: "MIO-FA-PT-003", collection: "folk-art-paintings", category: "paintings",
    craft: "folk-painting",
    name: { en: "Tree of Life Painting", sv: "Målning Livets träd" },
    price: { EUR: 165, SEK: 1920 }, sizes: ["40 × 50 cm, framed"],
    material: { en: "Natural pigments on handmade paper, wooden frame", sv: "Naturpigment på handgjort papper, träram" },
    care: paintingCare,
    short: {
      en: "A tree of life full of birds and blossoms, painted to order by the artist.",
      sv: "Ett livets träd fullt av fåglar och blommor, målat på beställning av konstnären.",
    },
    story: paintingStory, madeToOrder: true, images: ["products/tree-of-life-painting"], added: "2026-08-30",
  },
  {
    slug: "jaal-block-print-tote", code: "MIO-BA-TB-001", collection: "bags-accessories", category: "tote-bags",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Jaal Block-Print Tote", sv: "Tygkasse Jaal" },
    price: { EUR: 48, SEK: 560 }, sizes: ["38 × 42 × 10 cm"],
    material: { en: "Cotton canvas, cotton webbing handles, leather tabs", sv: "Bomullscanvas, handtag i bomullsband, lädertabbar" },
    care: { en: "Spot clean or hand wash cold. Dry flat.", sv: "Fläcktvätta eller handtvätta i kallt vatten. Torka plant." },
    short: {
      en: "A sturdy everyday tote in a red and teal floral jaal, lined and roomy enough for a laptop.",
      sv: "En stadig vardagskasse i ett rött och blågrönt blomster-jaal, fodrad och rymlig nog för en laptop.",
    },
    story: blockStory, images: ["collection-bags"], added: "2026-10-05",
  },
  {
    slug: "floral-zip-pouch", code: "MIO-BA-PO-001", collection: "bags-accessories", category: "pouches",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Floral Zip Pouch", sv: "Necessär Floral" },
    price: { EUR: 18, SEK: 210 }, sizes: ["20 × 13 cm"],
    material: { en: "Cotton canvas, brass zip", sv: "Bomullscanvas, dragkedja i mässing" },
    care: { en: "Spot clean or hand wash cold. Dry flat.", sv: "Fläcktvätta eller handtvätta i kallt vatten. Torka plant." },
    short: {
      en: "A lined pouch for pens, make-up or small treasures, with a brass zip.",
      sv: "En fodrad necessär för pennor, smink eller små skatter, med dragkedja i mässing.",
    },
    story: blockStory, images: ["products/floral-zip-pouch"], added: "2026-09-22",
  },
  {
    slug: "tote-and-pouch-set", code: "MIO-BA-ST-001", collection: "bags-accessories", category: "sets",
    craft: "hand-block-print", region: "Rajasthan",
    name: { en: "Tote & Pouch Set", sv: "Set med tygkasse och necessär" },
    price: { EUR: 60, SEK: 699 },
    material: { en: "Cotton canvas, cotton webbing, leather tabs, brass zip", sv: "Bomullscanvas, bomullsband, lädertabbar, dragkedja i mässing" },
    care: { en: "Spot clean or hand wash cold. Dry flat.", sv: "Fläcktvätta eller handtvätta i kallt vatten. Torka plant." },
    short: {
      en: "The Jaal tote with its matching pouch, wrapped together. A ready-made gift.",
      sv: "Tygkassen Jaal med matchande necessär, inslagna tillsammans. En färdig present.",
    },
    story: blockStory, images: ["products/tote-and-pouch-set"], added: "2026-10-08",
  },
  {
    slug: "paint-your-own-tote-kit", code: "MIO-DIY-001", collection: "diy-kits", category: "kits",
    craft: "paint-kit",
    name: { en: "Paint-Your-Own Tote Kit", sv: "Måla din egen tygkasse" },
    price: { EUR: 39, SEK: 450 },
    material: {
      en: "Cotton tote with pre-drawn folk flower, five fabric paints, brush, illustrated guide",
      sv: "Bomullskasse med förtecknad folkkonstblomma, fem textilfärger, pensel, illustrerad guide",
    },
    care: { en: "Once painted, iron on the reverse to fix the colours. Hand wash cold.", sv: "Stryk på avigsidan efter målningen för att fixera färgerna. Handtvätt i kallt vatten." },
    short: {
      en: "A cotton tote with a folk-art flower drawn on, earthy fabric paints and a brush. Ready to paint.",
      sv: "En bomullskasse med förtecknad folkkonstblomma, jordnära textilfärger och en pensel. Redo att måla.",
    },
    story: {
      en: "The flower is drawn on by hand, based on motifs from Indian folk painting. The guide walks you through mixing, layering and outlining, so even a first-time painter finishes with something to be proud of.",
      sv: "Blomman är förtecknad för hand, med motiv från indisk folkkonstmålning. Guiden visar hur du blandar, lägger färg i lager och konturerar, så att även den som målar för första gången blir stolt över resultatet.",
    },
    images: ["collection-diy-kits"], added: "2026-10-14",
  },
  {
    slug: "folk-cushion-painting-kit", code: "MIO-DIY-002", collection: "diy-kits", category: "kits",
    craft: "paint-kit",
    name: { en: "Folk Cushion Painting Kit", sv: "Målarkit för kuddfodral" },
    price: { EUR: 44, SEK: 510 }, sizes: ["45 × 45 cm"],
    material: {
      en: "Cotton cushion cover with pre-drawn motif, five fabric paints, two brushes, illustrated guide",
      sv: "Kuddfodral i bomull med förtecknat motiv, fem textilfärger, två penslar, illustrerad guide",
    },
    care: { en: "Once painted, iron on the reverse to fix the colours. Hand wash cold.", sv: "Stryk på avigsidan efter målningen för att fixera färgerna. Handtvätt i kallt vatten." },
    short: {
      en: "Paint a cushion cover with a peacock-and-vine motif. Everything included except the cushion.",
      sv: "Måla ett kuddfodral med ett motiv av påfågel och rankor. Allt ingår utom kudden.",
    },
    story: {
      en: "A larger canvas for a slow afternoon. The motif is drawn on by hand and the guide suggests a palette, but the colours are yours to choose.",
      sv: "En större duk för en lugn eftermiddag. Motivet är förtecknat för hand och guiden föreslår en färgpalett, men färgerna väljer du själv.",
    },
    images: ["products/folk-cushion-painting-kit"], added: "2026-09-25",
  },
];

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
