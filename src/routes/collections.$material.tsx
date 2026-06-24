import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, Grid2x2, List, X } from "lucide-react";
import { Breadcrumbs } from "@/components/overlays";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, MATERIALS, productsByMaterial } from "@/lib/data";

export const Route = createFileRoute("/collections/$material")({
  loader: ({ params }) => {
    const m = MATERIALS.find((x) => x.handle === params.material);
    if (!m) throw notFound();
    return { material: m };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.material.label ?? "Collection"} Hijabs — RUQYA` },
      { name: "description", content: `Shop premium ${loaderData?.material.label} hijabs from authentic Turkish brands.` },
    ],
  }),
  component: CollectionPage,
});

const DESCRIPTIONS: Record<string, string> = {
  silk: "Luxurious Indian and Turkish silk hijabs with woven artistic patterns. Soft, breathable, and elegantly draped.",
  cotton: "Premium Turkish cotton hijabs with natural breathability and gentle comfort.",
  chiffon: "Ultra-light Turkish chiffon hijabs that drape effortlessly with refined elegance.",
  satin: "Authentic satin hijabs with a smooth, refined finish and lasting drape.",
  viscose: "Soft viscose hijabs with jacquard and crystal stone weaves.",
  "cotton-silk": "A blend of natural cotton and silk for warmth, softness, and quiet shine.",
  lyocell: "High-end lyocell hijabs — sustainable luxury with a silky hand.",
  fiber: "Natural fiber hijabs for lightweight, breathable comfort.",
  voile: "Voile crystal hijabs with silky soft finish and artful weave patterns.",
  microfiber: "Microfiber hijabs with breathable softness and effortless styling.",
};

function CollectionPage() {
  const { material } = Route.useLoaderData();
  // base products in this material; if fewer than ~6, supplement with related from full catalog so grids feel populated
  const base = productsByMaterial(material.handle);
  const allInMat = base.length >= 6 ? base : [...base, ...PRODUCTS.filter((p) => !base.includes(p))].slice(0, 12);

  const [brand, setBrand] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(2000);
  const [colors, setColors] = useState<string[]>([]);
  const [dims, setDims] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  const brandsInList = Array.from(new Set(allInMat.map((p) => p.vendor)));
  const dimList = Array.from(new Set(allInMat.map((p) => p.dimensions)));
  const colorList = Array.from(new Set(allInMat.flatMap((p) => p.colors.map((c) => c.name)))).slice(0, 10);

  const filtered = useMemo(() => {
    let list = allInMat.filter((p) => p.price <= priceMax);
    if (brand.length) list = list.filter((p) => brand.includes(p.vendor));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (dims.length) list = list.filter((p) => dims.includes(p.dimensions));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [allInMat, brand, priceMax, colors, dims, sort]);

  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => { setBrand([]); setPriceMax(2000); setColors([]); setDims([]); };

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h4 className="text-xs uppercase tracking-wider">Brand</h4>
        <div className="mt-3 space-y-2">
          {brandsInList.map((b) => (
            <label key={b} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <input type="checkbox" checked={brand.includes(b)} onChange={() => toggle(brand, b, setBrand)} />
                {b}
              </span>
              <span className="text-xs text-muted-foreground">({allInMat.filter((p) => p.vendor === b).length})</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider">Price (up to {priceMax} EGP)</h4>
        <input type="range" min={500} max={2000} step={50} value={priceMax}
          onChange={(e) => setPriceMax(+e.target.value)} className="mt-3 w-full accent-primary" />
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider">Color</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {colorList.map((c) => {
            const hex = PRODUCTS.flatMap((p) => p.colors).find((x) => x.name === c)?.hex ?? "#ccc";
            const active = colors.includes(c);
            return (
              <button key={c} title={c} onClick={() => toggle(colors, c, setColors)}
                className={`h-8 w-8 rounded-full border-2 transition ${active ? "border-foreground" : "border-border hover:border-muted-foreground"}`}
                style={{ background: hex }} />
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider">Dimensions</h4>
        <div className="mt-3 space-y-2">
          {dimList.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={dims.includes(d)} onChange={() => toggle(dims, d, setDims)} />
              {d}
            </label>
          ))}
        </div>
      </div>
      <button onClick={clearAll} className="text-xs underline underline-offset-4">Clear all</button>
    </div>
  );

  const activeChips = [
    ...brand.map((b) => ({ label: b, clear: () => setBrand(brand.filter((x) => x !== b)) })),
    ...colors.map((c) => ({ label: c, clear: () => setColors(colors.filter((x) => x !== c)) })),
    ...dims.map((d) => ({ label: d, clear: () => setDims(dims.filter((x) => x !== d)) })),
    ...(priceMax < 2000 ? [{ label: `≤ ${priceMax} EGP`, clear: () => setPriceMax(2000) }] : []),
  ];

  return (
    <>
      <section className="bg-surface">
        <div className="container-r py-12 md:py-16">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop by Material" }, { label: material.label }]} />
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">{material.label}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{DESCRIPTIONS[material.handle] ?? `Premium ${material.label} hijabs.`}</p>
        </div>
      </section>

      <section className="container-r py-10">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div className="text-sm text-muted-foreground">{filtered.length} products</div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm lg:hidden" onClick={() => setFilterOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Filter
            </button>
            <div className="hidden items-center gap-1 lg:flex">
              <button onClick={() => setView("grid")} aria-label="Grid"
                className={`p-1 ${view === "grid" ? "text-foreground" : "text-muted-foreground"}`}><Grid2x2 className="h-4 w-4" /></button>
              <button onClick={() => setView("list")} aria-label="List"
                className={`p-1 ${view === "list" ? "text-foreground" : "text-muted-foreground"}`}><List className="h-4 w-4" /></button>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="rounded-sm border border-border bg-background px-3 py-1.5 text-sm">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeChips.map((c) => (
              <button key={c.label} onClick={c.clear} className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs hover:bg-background">
                {c.label} <X className="h-3 w-3" />
              </button>
            ))}
            <button onClick={clearAll} className="text-xs underline underline-offset-4">Clear all</button>
          </div>
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">{FilterPanel}</aside>
          <div>
            {filtered.length === 0 ? (
              <div className="grid place-items-center py-24 text-center">
                <p className="font-serif text-2xl">No products match your filters</p>
                <button onClick={clearAll} className="mt-4 rounded-sm border border-border px-4 py-2 text-sm">Clear filters</button>
              </div>
            ) : (
              <div className={view === "grid" ? "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6" : "space-y-6"}>
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
            <div className="mt-12 text-center">
              <button className="rounded-sm border border-foreground px-8 py-3 text-sm hover:bg-foreground hover:text-background">Load more</button>
            </div>
          </div>
        </div>
      </section>

      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setFilterOpen(false)} />
          <div className="absolute inset-y-0 end-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">Filters</h3>
              <button onClick={() => setFilterOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6">{FilterPanel}</div>
            <button onClick={() => setFilterOpen(false)} className="mt-6 w-full rounded-sm bg-primary py-3 text-sm text-primary-foreground">Apply filters</button>
          </div>
        </div>
      )}
    </>
  );
}
