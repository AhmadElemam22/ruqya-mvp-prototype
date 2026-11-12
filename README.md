# Ruqya

**Bilingual e-commerce store for premium Turkish hijabs — live at [ruqya-eg.com](https://ruqya-eg.com/en-eg).**

![Users](https://img.shields.io/badge/users-6.4K%2B-6B7F6E)
![Shopify](https://img.shields.io/badge/Shopify-Liquid-95BF47?logo=shopify&logoColor=white)
![Languages](https://img.shields.io/badge/languages-English%20%7C%20Arabic-C4A882)

Ruqya sells authentic Turkish brands (KARACA, Keten, Levidor, Aker and more) across Egypt. The store has reached **6.4K+ users** so far.

This repo holds the Shopify theme that runs the live store, plus the original React prototype it was designed from.

| Folder | What it is |
|---|---|
| [`shopify/`](shopify) | The custom Shopify theme powering the live store |
| [`src/`](src) | The MVP prototype (React + TanStack Start + Tailwind) |

## Features

**Storefront**
- Full English and Arabic experience (`/en-eg`, `/ar-eg`) with proper right-to-left layout
- Predictive search that works across localized URLs
- Shop by material, brand pages and a campaign collection page
- Quick view, color swatches with per-color image galleries, and an AJAX cart drawer

**Rewards & offers**
- A progress bar in the cart that shows customers what they unlock as they add pieces:
  1 piece → free shipping · 2 pieces → 10% off · 3+ pieces → 20% off
- Cart shows the total before and after the discount, so savings are always visible
- Animated announcement bar for running campaigns, toggled from the theme editor

**Checkout**
- Cash on delivery with an InstaPay payment option
- Short checkout form (phone number, name, governorate, city, address)
- Shipping zones covering all 29 Egyptian governorates

## Theme structure

```
shopify/
├── assets/      theme.css, theme.js, images
├── config/      theme settings
├── layout/      theme.liquid
├── locales/     en.default.json, ar.json
├── sections/    header, product, cart, collection, campaign banner, ...
├── snippets/    product card, cart rewards, cart totals, icons, ...
└── templates/   JSON templates
```

Discounts and shipping rates live in Shopify admin (automatic discounts and Markets), not in the theme code. The theme only displays them.

## Deploying the theme

Upload changed files through **Online Store → Themes → Edit code**. Editing the live theme in place keeps its translations and theme editor settings; uploading the folder as a new theme does not.

## Running the prototype

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.
