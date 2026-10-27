# Miovra

Source for [www.miovra.eu](https://www.miovra.eu): curated block-printed textiles and Indian folk art. *Crafted elegance, with heart.*

## Status

**Phase 2: site built and running locally.** Blueprint v1 approved with palette B (Pearl & Bronze).

Decisions: catalogue with enquiry (no checkout yet), English and Swedish, prices in EUR and SEK, shipping to Sweden and the EU.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/en` or `/sv` based on the browser language.

## Where things live

| Path | What |
|---|---|
| `app/[lang]/` | Pages: home, collections, products, our-story, workshops, connect, saved, search, shipping-returns, privacy |
| `app/api/` | Enquiry and newsletter endpoints: emailed when SMTP is configured, always saved to `data/*.jsonl` |
| `app/globals.css` | Design system: the two brand tones, type scale, components |
| `components/` | Header, footer, product cards, filters, gallery, forms |
| `lib/dictionaries/` | All site copy, English and Swedish |
| `lib/catalog.ts` | Collections and pieces (sample data for now) |
| `lib/site.ts` | Email, social links, WhatsApp number, Instagram reels |
| `public/images/` | Photos; missing ones show as labelled placeholders |
| `docs/blueprint/` | The approved wireframe and copy blueprint |
| `CONTENT-TODO.md` | Everything still to supply or confirm |
| `docs/DEPLOY-OCI.md` | Step-by-step guide to putting the site live on Oracle Cloud (1 GB RAM server) |
| `.github/workflows/build.yml` | Builds the site on every push to `main` and publishes it as the `latest` release |
| `deploy/` | Server setup script, update script, Caddy config, services and settings template |

## Phases

1. Blueprint approval (done)
2. Design system and pages, running locally (done)
3. Content: photos, catalogue, handles, Swedish review
4. QA: mobile, accessibility, speed, GDPR
5. Deploy to OCI: follow `docs/DEPLOY-OCI.md`; afterwards `miovra-update` on the server publishes each new build
