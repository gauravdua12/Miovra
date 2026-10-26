# Miovra

Source for [www.miovra.eu](https://www.miovra.eu): curated block-printed textiles and Indian folk art. *Crafted elegance, with heart.*

## Status

**Phase 1: blueprint awaiting approval.** No front-end or back-end code has been written yet.

- `docs/blueprint/index.html` is the wireframe and copy blueprint for the Homepage, Collection page and Product page, with four 2-tone palette options. Open it in a browser; the palette buttons at the top re-colour the whole document.
- `docs/blueprint/assets/` holds the logo, extracted from the brand PDF with a transparent background.
- `brand/` holds the original logo PDF and the website profile.
- `public/images/` is where the site photography goes (see its README).

## Planned stack (pending approval)

Next.js front end · Medusa commerce and admin · PostgreSQL · Stripe payments · Docker Compose on Oracle Cloud (OCI) with Caddy for HTTPS.

## Phases

1. Blueprint approval
2. Design system and pages, running locally
3. Shop, admin and payments (test mode)
4. Content load
5. QA: mobile, accessibility, speed, GDPR
6. Deploy to OCI after final approval
