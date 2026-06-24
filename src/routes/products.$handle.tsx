import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageCircle, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/overlays";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, getProduct, formatPrice } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/products/$handle")({
  loader: ({ params }) => {
    const p = getProduct(params.handle);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title ?? "Product"} — RUQYA` },
      { name: "description", content: `${loaderData?.product.vendor}. Premium Turkish hijab woven into the fabric.` },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/lib/data").Product };
  const { addToCart } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "ship" | "brand">("desc");
  const [mainImg, setMainImg] = useState(0);
  const [toast, setToast] = useState(false);

  const gallery = [product.image, product.image2, product.image, product.image2, product.image];

  const handleAdd = () => {
    addToCart(product, color, qty);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      {toast && (
        <div className="fixed end-6 top-24 z-50 flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground shadow-lg fade-up">
          <Check className="h-4 w-4" /> Added to cart
        </div>
      )}

      <section className="container-r pt-8">
        <Breadcrumbs items={[
          { label: "Home", to: "/" },
          { label: product.materialLabel },
          { label: product.title },
        ]} />
      </section>

      <section className="container-r grid gap-10 py-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-md bg-surface">
            <img src={gallery[mainImg]} alt={product.title} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                className={`aspect-square overflow-hidden rounded-sm border-2 ${mainImg === i ? "border-foreground" : "border-transparent"}`}>
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-28 md:self-start">
          <Link to="/brands" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">{product.vendor}</Link>
          <h1 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{product.title}</h1>
          <div className="mt-4 text-2xl">{formatPrice(product.price)}</div>
          <p className="mt-4 text-sm text-muted-foreground">
            Premium {product.materialLabel.toLowerCase()} hijab featuring an artistic woven pattern. Dimensions: {product.dimensions}.
          </p>
          <span className="mt-3 inline-block rounded-full bg-surface px-3 py-1 text-xs uppercase tracking-wider">{product.materialLabel}</span>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Color: <span className="text-foreground">{color}</span></div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)} title={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-foreground scale-110" : "border-border hover:border-muted-foreground"}`}
                  style={{ background: c.hex }} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <button onClick={handleAdd} className="mt-4 w-full rounded-sm bg-primary py-3.5 text-sm text-primary-foreground transition hover:opacity-90">
            Add to cart
          </button>
          <a href="https://wa.me/201000000000" className="mt-2 flex w-full items-center justify-center gap-2 rounded-sm border border-foreground py-3.5 text-sm hover:bg-foreground hover:text-background">
            <MessageCircle className="h-4 w-4" /> Buy via WhatsApp
          </a>

          <div className="mt-6 grid grid-cols-1 gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:grid-cols-3">
            <div>✓ Authentic Turkish brand</div>
            <div>✓ Free shipping over 1,500 EGP</div>
            <div>✓ Easy returns</div>
          </div>

          {/* Accordion */}
          <div className="mt-8 border-t border-border">
            {[
              { id: "desc", label: "Description", body: (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Premium {product.materialLabel} hijab featuring an artistic pattern woven directly into the fabric — never printed or replicated.</p>
                  <p>Material: 100% {product.materialLabel}</p>
                  <p>Dimensions: {product.dimensions}</p>
                  <p>Care: Hand wash cold, air dry, iron low.</p>
                </div>
              )},
              { id: "ship", label: "Shipping & Returns", body: (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Egypt delivery: 2–5 business days</li>
                  <li>• Cairo & Giza: same-week delivery available</li>
                  <li>• Free shipping on orders over 1,500 EGP</li>
                  <li>• Returns within 14 days (unworn, tags attached)</li>
                </ul>
              )},
              { id: "brand", label: `Brand — ${product.vendor}`, body: (
                <div className="text-sm text-muted-foreground">
                  <p>{product.vendor} is recognized for premium Turkish craftsmanship and woven design heritage.</p>
                  <Link to="/brands" className="mt-2 inline-block underline underline-offset-4 text-foreground">Shop all {product.vendor} →</Link>
                </div>
              )},
            ].map((t) => (
              <div key={t.id} className="border-b border-border">
                <button onClick={() => setTab(tab === t.id ? ("" as any) : (t.id as any))}
                  className="flex w-full items-center justify-between py-4 text-sm">
                  {t.label} <ChevronDown className={`h-4 w-4 transition-transform ${tab === t.id ? "rotate-180" : ""}`} />
                </button>
                {tab === t.id && <div className="pb-4">{t.body}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-r py-20">
        <h3 className="font-serif text-3xl">You may also like</h3>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
