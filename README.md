# Ruqya

Online store for Ruqya — premium Turkish hijabs, live at [ruqya-eg.com](https://ruqya-eg.com).

The repo has two parts:

| Folder | What it is |
|---|---|
| `src/` | The original MVP prototype (React + TanStack Start + Tailwind) |
| `shopify/` | The Shopify theme that runs the live store |

## Shopify theme

Custom Liquid theme, English and Arabic (full RTL support).

Highlights:
- Bilingual storefront (`/en-eg` and `/ar-eg`) with translations through Translate & Adapt
- Predictive search that works with localized URLs
- Cart rewards bar — free shipping on the first piece, 10% off at 2 pieces, 20% off at 3+
- White Friday announcement bar and a campaign collection page
- Cash on delivery and InstaPay checkout flow

Structure:

```
shopify/
├── assets/      # theme.css, theme.js, images
├── config/      # theme settings
├── layout/      # theme.liquid
├── locales/     # en.default.json, ar.json
├── sections/    # page sections (header, product, cart, ...)
├── snippets/    # reusable pieces (product card, cart rewards, icons, ...)
└── templates/   # JSON templates
```

To deploy, upload the files through **Online Store → Themes → Edit code**, or zip the contents of `shopify/` and upload it as a new theme.

The discounts behind the rewards bar are automatic discounts set up in Shopify admin, not in the theme code.

## Prototype

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.
