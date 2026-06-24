export type Product = {
  id: number;
  handle: string;
  title: string;
  price: number;
  vendor: string;
  material: string;
  materialLabel: string;
  dimensions: string;
  colors: { name: string; hex: string }[];
  image: string;
  image2: string;
};

const COLORS = [
  { name: "Rose Dust", hex: "#C8A0A0" },
  { name: "Sage", hex: "#8FA68E" },
  { name: "Ivory", hex: "#F2EAD3" },
  { name: "Navy", hex: "#2A3A55" },
  { name: "Blush", hex: "#E8C8C0" },
  { name: "Gold", hex: "#C4A882" },
  { name: "Charcoal", hex: "#3A3A3A" },
  { name: "Terracotta", hex: "#C4704B" },
  { name: "Mist", hex: "#BFC8C8" },
  { name: "Plum", hex: "#5A3A4A" },
];

// [handle, title, price, vendor, material, dimensions, colorCount, image, image2]
// Real product data scraped from https://ruqya-eg.com/
const PRODUCTS_DATA: Array<[string, string, number, string, string, string, number, string, string]> = [
  ["levidor-artistic-bloom-indian-silk-70180-cm", "Levidor Artistic Bloom Indian Silk 70×180 cm", 1350, "Levidor", "silk", "70×180 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2024/04/SAVE_20251218_145914.jpg", "https://ruqya-eg.com/wp-content/uploads/2024/04/Levidor_.png"],
  ["levidor-dusty-floral-indian-silk-70180-cm", "Levidor Dusty Floral Indian Silk 70×180 cm", 1350, "Levidor", "silk", "70×180 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-5.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-4.png"],
  ["warm-ornamental-indian-silk-hijab", "Warm Ornamental Indian Silk Hijab", 1300, "Levidor", "silk", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765034758558-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765034443105-1000x1000.jpg"],
  ["keten-heritage-bloom-satin-silk", "Keten Heritage Bloom Satin Silk 75×190 cm", 1250, "Keten", "silk", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765056719738-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765052653610-1000x1000.jpg"],
  ["karaca-silk-viscose-hijab", "KARACA Silk Viscose Serene 75×200 cm", 975, "KARACA", "silk", "75×200 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765334182523-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765333667531-1000x1000.jpg"],
  ["keten-ethereal-garden-silk-cotton-hijab", "Keten Ethereal Garden Silk Cotton 75×190 cm", 1350, "Keten", "silk", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-3-5.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-7.png"],
  ["keten-contemporary-geo-silk-cotton-hijab", "Keten Contemporary Geo Silk Cotton 75×190 cm", 1350, "Keten", "silk", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-6.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-3-4.png"],
  ["levidor-paisley-indian-silk-hijab", "Levidor Paisley modern geometric Indian Silk 70×180 cm", 1350, "Levidor", "silk", "70×180 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2024/04/Levidor_-2.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-2-4.png"],
  ["keten-modern-brushstroke-voile-hijab", "Keten Modern Brushstroke Linen Silk Jacquard 75×190 cm", 1250, "Keten", "silk", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-15.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Picture41.png"],
  ["keten-dynamic-artistry-polyester-hijab", "Keten Modern Canvas Linen Silk Jacquard 75×190 cm", 1250, "Keten", "silk", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-8.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Picture44.png"],
  ["keten-majestic-botanic-polyester-hijab", "Keten Modern Canvas Linen Silk Jacquard 75×190 cm", 1250, "Keten", "silk", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-9.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-3-8.png"],
  ["pink-chiffon-flared-dress", "Levidor Majestic Flora Indian Silk 70×180 cm", 1350, "Levidor", "silk", "70×180 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-1.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-2-1.png"],
  ["round-neck-tank-top", "Keten Artistic Loop Silk Cotton 75×190 cm", 1350, "Keten", "silk", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-2.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-2.png"],
  ["keten-modern-canvas-polyester-hijab", "Keten Modern serenity Linen Silk Jacquard 75×190 cm", 1250, "Keten", "silk", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2024/03/Artboard-1-10.png", "https://ruqya-eg.com/wp-content/uploads/2024/03/Artboard-2-12.png"],
  ["turkish-premium-chiffon-hijab-3", "KARACA Ultra-light Turkish Chiffon 75×190 Cm", 700, "KARACA", "chiffon", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336165115-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336288555-1000x1000.jpg"],
  ["turkish-premium-chiffon-hijab-2", "KARACA Ultra-light Turkish chiffon 75×190 Cm", 700, "KARACA", "chiffon", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765335235394-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765335803576-1000x1000.jpg"],
  ["turkish-premium-chiffon-hijab", "KARACA Ultra-light Turkish chiffon 75×190 cm", 700, "KARACA", "chiffon", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765335003971-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336473370-1000x1000.png"],
  ["keten-abstract-breeze-voile-hijab", "Keten Abstract Breeze Linen French Chiffon 75×190 cm", 890, "Keten", "chiffon", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-11.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Picture22.png"],
  ["keten-fluid-harmony-voile-hijab", "Keten Fluid Harmony Linen French Chiffon 75×190 cm", 890, "Keten", "chiffon", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-13.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Picture26.png"],
  ["linen-shawl-french-chiffon-3", "Keten Artistic Canvas Linen French chiffon 75×190 cm", 890, "Keten", "chiffon", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-12.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Picture28.png"],
  ["keten-grand-botanical-voile-hijab", "Keten Grand Botanical Linen French Chiffon 75×190 cm", 890, "Keten", "chiffon", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-1-14.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Picture35.png"],
  ["keten-aura-jacquard-cotton-hijab", "Keten Aura Jacquard Cotton Hijab 75×190 cm", 700, "Keten", "cotton", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/Gemini_Generated_Image_eudnzceudnzceudn-1000x1000.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765384363781-1000x1000.jpg"],
  ["karaca-fine-pure-cotton", "KARACA Fine pure Turkish Cotton 75×200 cm", 850, "KARACA", "cotton", "75×200 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337911364-1-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337078847-1-1000x1000.jpg"],
  ["karaca-satin-cotton-artful-pattern-weave-hijab-3", "KARACA Silk Cotton Artful Pattern Weave 75×200 Cm", 975, "KARACA", "cotton", "75×200 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765167486600-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765167261064-1000x1000.jpg"],
  ["karaca-satin-cotton-artful-pattern-weave-hijab-2", "KARACA Satin Cotton Timeless Beauty 75×200 Cm", 975, "KARACA", "cotton", "75×200 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/Gemini_Generated_Image_i4oq5li4oq5li4oq-1000x1000.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/1764817112761-1000x1000.jpg"],
  ["karaca-satin-cotton-artful-pattern-weave-hijab", "KARACA Satin Cotton Timeless Beauty 75×200 Cm", 975, "KARACA", "cotton", "75×200 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/1764816879723-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1764817191690-1000x1000.jpg"],
  ["karaca-premium-natural-cotton-fiber-hijab", "KARACA premium Natural Turkish cotton Fiber 75×200 Cm", 1100, "KARACA", "cotton", "75×200 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-3-18.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-27.png"],
  ["pierre-cardin-hijab", "Pierre Cardin Hijab", 1800, "Pierre Cardin", "cotton", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-26.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-5-5.png"],
  ["keten-geometric-bloom-cotton-hijab", "Keten Geometric Bloom Turkish high quality Cotton 75×190 cm", 1250, "Keten", "cotton", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-4-3.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-3-7.png"],
  ["keten-fluid-canvas-organic-hijab", "Keten Fluid Canvas Natural Organic Cotton 75×190 cm", 1350, "Keten", "cotton", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-5-1.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-6.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-9", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-23.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-5-2.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-8", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-22.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-22.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-7", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-21.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-4-4.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-6", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-20.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-18.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-5", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-19.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-17.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-4", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-18.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-16.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab-3", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-17.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-15.png"],
  ["valentino-orlandi-alia-jacquard-lyocell-hijab", "Valentino Orlandi Alia Jacquard Lyocell Hijab", 1950, "Valentino Orlandi", "lyocell", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-16.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-14.png"],
  ["aker-crystal-stone-plain-color-hijab", "Aker Crystal Stone Satin woven Plain. 75×190 Cm", 1300, "Aker", "viscose", "75×190 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-25.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-9.png"],
  ["aker-monogram-jacquard-hijab-2", "Aker Monogram Jacquard Viscose Fabric 75×190 Cm", 1400, "Aker", "viscose", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/Gemini_Generated_Image_r53yhcr53yhcr53y-1000x1000.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Picture8-1000x1000.jpg"],
  ["aker-monogram-jacquard-hijab", "Aker Monogram Jacquard Viscose Fabric 75×190 cm", 1400, "Aker", "viscose", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-4-6.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Picture7-1-1000x1000.jpg"],
  ["levidor-timeless-floral-mosaic-hijab-2", "Levidor Timeless Floral Mosaic Nature Fiber 70×180 cm", 975, "Levidor", "fiber", "70×180 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337145713-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337599192-1000x1000.jpg"],
  ["levidor-timeless-floral-mosaic-natural-micro-fiber-70180-cm", "Levidor Timeless Floral Mosaic Natural micro fiber 70×180 cm", 875, "Levidor", "fiber", "70×180 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2024/04/Levidor_-3.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-2-13.png"],
  ["keten-serene-poise-organic-hijab", "Keten Serene Poise Natural Organic Fiber 75×190 cm", 1350, "Keten", "fiber", "75×190 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765334047804-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765333988752-1000x1000.jpg"],
  ["levidor-timeless-floral-mosaic-hijab-3", "Levidor Timeless Floral Mosaic nature fiber 70×180 cm", 975, "Levidor", "fiber", "70×180 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336634790-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336504224-1000x1000.jpg"],
  ["karaca-patterned-mio-hijab-2", "KARACA Patterned Mio 75×200 Cm", 1100, "KARACA", "fiber", "75×200 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-1.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-2-1.png"],
  ["karaca-natural-fiber-shawl", "KARACA Natural Fiber 75×200 Cm", 995, "KARACA", "fiber", "75×200 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-28.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-3-17.png"],
  ["karaca-patterned-mio-hijab", "KARACA Patterned Mio 75×200 Cm", 1100, "KARACA", "fiber", "75×200 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-27.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-5-6.png"],
  ["single-breasted-blazer", "Keten Botanical Dream Organic Natural Fiber 75×190 cm", 1350, "Keten", "fiber", "75×190 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-2-5.png", "https://ruqya-eg.com/wp-content/uploads/2024/04/Artboard-3-3.png"],
  ["karaca-voile-crystal-artful-pattern-weave-made-to-last-3", "KARACA Voile Crystal – Artful Pattern Weave, 75×200 cm", 1150, "KARACA", "voile", "75×200 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/1764819084414-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1764818905242-1000x1000.jpg"],
  ["a-superior-grade-voile-designed-for-pure-elegance", "KARACA superior-grade voile Silky Soft Finish 75×200 Cm", 675, "KARACA", "voile", "75×200 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765183403046-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765182506287-1000x1000.jpg"],
  ["karaca-voile-crystal-artful-pattern-weave-made-to-last-2", "KARACA Voile Crystal, uniquely Fine , 75×200 Cm.", 1250, "KARACA", "voile", "75×200 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/1764818820058-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1764819140743-1000x1000.jpg"],
  ["karaca-voile-crystal-artful-pattern-weave-made-to-last", "KARACA Voile Crystal – Artful Pattern Weave, 75×200 Cm", 1150, "KARACA", "voile", "75×200 cm", 3, "https://ruqya-eg.com/wp-content/uploads/2025/12/1764818732846-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1764817735537-1000x1000.jpg"],
  ["keten-satin-dual-harmony-hijab", "Keten Satin Dual Harmony Hijab 75×190 cm", 950, "Keten", "satin", "75×190 cm", 4, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337034105-1-1000x1000.png", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336860960-1-1000x1000.jpg"],
  ["turkish-premium-satin-scarf-2", "KARACA Turkish Premium authentic Satin 75×200 cm", 1250, "KARACA", "satin", "75×200 cm", 5, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765032645272-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765032913988-1000x1000.jpg"],
  ["turkish-premium-satin-scarf", "KARACA Turkish Premium Satin 75×200 Cm", 1250, "KARACA", "satin", "75×200 cm", 6, "https://ruqya-eg.com/wp-content/uploads/2025/12/1765032330044-1000x1000.jpg", "https://ruqya-eg.com/wp-content/uploads/2025/12/1765032085124-1000x1000.jpg"],
];

const MAT_LABEL: Record<string, string> = {
  silk: "Silk", cotton: "Cotton", "cotton-silk": "Cotton Silk", chiffon: "Chiffon",
  satin: "Satin", viscose: "Viscose", microfiber: "Microfiber", lyocell: "Lyocell",
  fiber: "Fiber", voile: "Voile Crystal",
};

export const PRODUCTS: Product[] = PRODUCTS_DATA.map((p, i) => ({
  id: i + 1,
  handle: p[0],
  title: p[1],
  price: p[2],
  vendor: p[3],
  material: p[4],
  materialLabel: MAT_LABEL[p[4]] ?? p[4],
  dimensions: p[5],
  colors: COLORS.slice(0, p[6]),
  image: p[7],
  image2: p[8],
}));

export const MATERIALS = [
  { handle: "silk", label: "Silk", img: "https://ruqya-eg.com/wp-content/uploads/2024/04/SAVE_20251218_145914.jpg" },
  { handle: "cotton", label: "Cotton", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/Gemini_Generated_Image_eudnzceudnzceudn-1000x1000.png" },
  { handle: "chiffon", label: "Chiffon", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/1765336165115-1000x1000.jpg" },
  { handle: "satin", label: "Satin", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337034105-1-1000x1000.png" },
  { handle: "viscose", label: "Viscose", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-25.png" },
  { handle: "lyocell", label: "Lyocell", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/Artboard-1-23.png" },
  { handle: "fiber", label: "Fiber", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/1765337145713-1000x1000.jpg" },
  { handle: "voile", label: "Voile Crystal", img: "https://ruqya-eg.com/wp-content/uploads/2025/12/1764819084414-1000x1000.jpg" },
];

export const BRANDS = [
  { handle: "levidor", name: "Levidor", desc: "Artistic Indian silk patterns with modern geometric and floral designs", count: 8 },
  { handle: "karaca", name: "KARACA", desc: "Premium Turkish chiffon, cotton, voile, and satin hijabs", count: 18 },
  { handle: "keten", name: "Keten", desc: "Linen-blend hijabs with contemporary artistic weaves", count: 18 },
  { handle: "aker", name: "Aker", desc: "Luxury viscose and satin jacquard fabrics", count: 3 },
  { handle: "valentino-orlandi", name: "Valentino Orlandi", desc: "High-end lyocell jacquard hijabs", count: 8 },
  { handle: "pierre-cardin", name: "Pierre Cardin", desc: "Premium cotton hijabs with classic elegance", count: 1 },
];

export const formatPrice = (n: number) => {
  const s = n.toFixed(2).replace(".", ",");
  const [int, dec] = s.split(",");
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec} EGP`;
};

export const getProduct = (handle: string) => PRODUCTS.find((p) => p.handle === handle);
export const productsByMaterial = (m: string) => PRODUCTS.filter((p) => p.material === m);
export const productsByBrand = (b: string) =>
  PRODUCTS.filter((p) => p.vendor.toLowerCase().replace(/\s+/g, "-") === b);
