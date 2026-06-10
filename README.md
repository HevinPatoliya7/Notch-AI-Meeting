# Notch

A landing page for **Notch** — a fictional AI meeting-notes product for engineering teams. Built as a portfolio piece to demonstrate SaaS landing-page design and front-end craft.

Linear-style dark aesthetic, sharp typography, monospace accents, custom product mockup in the hero.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (scroll-driven reveals)
- Lucide React (icons)
- Manrope + JetBrains Mono (Google Fonts)

**No backend, no API keys, no env vars.** Pure static site.

## Sections

1. Fixed navbar (transparent → blurred on scroll)
2. Hero with custom product mockup (transcript ↔ AI-extracted notes, two-pane window)
3. Logo strip (marquee of fictional companies)
4. Features (6-card grid, one featured)
5. How it works (3 numbered steps with mono code annotations)
6. Pricing (3 tiers, "Team" featured)
7. Testimonials (3 fake quotes)
8. Final CTA (big closing pitch)
9. Footer (4 link columns + status pill + credits)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Deploy to Vercel

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new), click Deploy. That's it — no env vars to configure.

Or via CLI:

```bash
npm i -g vercel       # or use `npx vercel`
vercel --prod
```

## Customisation pointers

| Want to change | File |
|---|---|
| Product name, nav links | `src/sections/Nav.tsx` |
| Hero headline + mockup content | `src/sections/Hero.tsx` |
| Fictional company names | `src/sections/LogoStrip.tsx` |
| Feature list | `src/sections/Features.tsx` (`FEATURES` array) |
| Pricing tiers | `src/sections/Pricing.tsx` (`TIERS` array) |
| Testimonials | `src/sections/Testimonials.tsx` (`QUOTES` array) |
| Footer links / credits | `src/sections/Footer.tsx` |
| Brand colors, fonts | `tailwind.config.js` + `src/index.css` |
| Page metadata (title, OG tags) | `index.html` |

## Credits

Designed & built by **Harsh Goyal** as a portfolio piece. Notch is not a real product.
