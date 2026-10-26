# Content to supply or confirm before launch

The site runs today with placeholders for everything below. Each item names the file to change.

## Photos (drop into `public/images/`)

Any of `.jpg`, `.png`, `.webp` works; the site picks the file up by name with no code change.

| File name | Where it shows | Status |
|---|---|---|
| `banner-home` | Homepage banner; also the Teal Paisley cushion sample | Sent in chat, file needed |
| `collection-home-decor` | Home Decor tile, banner and menu; Jaal runner sample | Sent in chat, file needed |
| `collection-folk-art` | Folk Art & Paintings tile and banner; peacock painting sample | Sent in chat, file needed |
| `collection-bags` | Bags & Accessories tile and banner; tote sample | Sent in chat, file needed |
| `collection-diy-kits` | DIY Kits tile and banner; tote kit sample | Sent in chat, file needed |
| `gifts-custom` | Gifts & Custom Orders band | Sent in chat, file needed |
| `workshops` | Homepage workshops band, Workshops page, DIY craft story | To source |
| `arti-portrait` | Our Story teaser and page | Optional |
| `craft-block-printing`, `craft-folk-painting` | "The Craft" band on collection pages | To source |
| `products/<product-slug>[-2]` | Product photos (see `lib/catalog.ts`) | With real catalogue |

## Contact details (`lib/site.ts`)

- Instagram URL, Facebook URL, WhatsApp number. Until set, those links read "Coming soon" and the WhatsApp buttons stay hidden.
- Three Instagram reel URLs for "See How It Is Made".

## Catalogue (`lib/catalog.ts`)

All 15 products are **sample data**: names, codes, sizes, EUR and SEK prices, regions and descriptions. Replace with the real pieces.

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

- Email notifications: enquiries and sign-ups are saved to `data/*.jsonl` for now. At deployment they get sent to Miovra4u@gmail.com, which needs SMTP details.
