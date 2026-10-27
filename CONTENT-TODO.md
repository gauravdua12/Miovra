# Content to supply or confirm before launch

Nothing on the site shows a placeholder: anything below that's missing is simply hidden until it's added. Each item names the file to change.

## Photos (drop into `public/images/`)

Any of `.jpg`, `.png`, `.webp` works; the site picks the file up by name with no code change.

| File name | Where it shows | Status |
|---|---|---|
| `banner-home` | Homepage banner; also the Teal Paisley cushion sample | Done |
| `collection-home-decor` | Home Decor tile, banner and menu; Jaal runner sample | Done |
| `collection-folk-art` | Folk Art & Paintings tile and banner; peacock painting sample | Done |
| `collection-bags` | Bags & Accessories tile and banner; tote sample | Done |
| `collection-diy-kits` | DIY Kits tile and banner; tote kit sample | Done |
| `gifts-custom` | Gifts & Custom Orders band | Done |
| `workshops` | Workshops band and page; block-printing craft story; "How It Was Made" on block-print pieces | Done |
| `arti-portrait` | Our Story teaser and page (layout adapts without it) | Optional |
| `craft-folk-painting`, `craft-diy-painting` | Photo beside "The Craft" text on Folk Art and DIY pages (text-only until added) | Optional |
| `products/<product-slug>[-2]` | Product photos. **A piece only appears on the site once its main photo exists.** | With real catalogue |

## Contact details (`lib/site.ts`)

- Instagram URL, Facebook URL, WhatsApp number. Each link and WhatsApp button appears once its value is set.
- Up to three Instagram reel URLs. The "See How It Is Made" section appears on the homepage once at least one is set.

## Catalogue (`lib/catalog.ts`)

All 15 products are **sample data**: names, codes, sizes, EUR and SEK prices, regions and descriptions. Only the 5 that have photos are shown (Jaal runner, Teal Paisley cushion, peacock painting, Jaal tote, tote paint kit). Replace with the real pieces.

## Policies to confirm (`lib/dictionaries/en.ts` and `sv.ts`, `legal` section)

- Return shipping paid by the customer unless faulty.
- Damaged items reported within 7 days.
- "We reply within two working days" on the Connect page.
- Packing description (recyclable paper, boards for paintings).
- Whether custom sizes and colourways are really offered ("Made to Order" prompt).
- Workshop format, place, length and price, to add to the Workshops page.

## Swedish copy (`lib/dictionaries/sv.ts`, product text in `lib/catalog.ts`)

Translated by Claude. Needs a native read-through before launch, especially Our Story.

## Before going live

- Email notifications: create a Gmail app password and put it in `/etc/miovra/miovra.env` on the server (see `docs/DEPLOY-OCI.md`, Part F).
