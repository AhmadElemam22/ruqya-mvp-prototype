import { Link } from "@tanstack/react-router";
import { X, Search, Trash2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { PRODUCTS, formatPrice } from "@/lib/data";
import { ProductCard } from "./product-card";

export function MiniCart() {
  const { cart, cartOpen, setCartOpen, updateQty, remove } = useStore();
  const subtotal = cart.reduce((a, b) => a + b.product.price * b.qty, 0);
  if (!cartOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setCartOpen(false)} />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="font-serif text-xl">Your cart ({cart.length})</h3>
          <button onClick={() => setCartOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
            <button onClick={() => setCartOpen(false)} className="text-sm underline underline-offset-4">Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.map((item) => (
                <div key={item.product.id + item.color} className="flex gap-4 border-b border-border py-4">
                  <img src={item.product.image} alt="" className="h-24 w-20 rounded-sm object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="text-sm">{item.product.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.color}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button className="px-2 py-1 text-sm" onClick={() => updateQty(item.product.id, item.color, item.qty - 1)}>−</button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button className="px-2 py-1 text-sm" onClick={() => updateQty(item.product.id, item.color, item.qty + 1)}>+</button>
                      </div>
                      <div className="text-sm">{formatPrice(item.product.price * item.qty)}</div>
                    </div>
                  </div>
                  <button onClick={() => remove(item.product.id, item.color)} aria-label="Remove" className="text-muted-foreground hover:text-foreground">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span><span className="text-base font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {subtotal >= 1500 ? "Free shipping unlocked ✓" : `Add ${formatPrice(1500 - subtotal)} more for free shipping`}
              </p>
              <Link to="/cart" onClick={() => setCartOpen(false)}
                className="mt-4 block w-full rounded-sm bg-primary py-3 text-center text-sm text-primary-foreground hover:opacity-90">
                View cart
              </Link>
              <button className="mt-2 w-full rounded-sm border border-border py-3 text-sm hover:bg-surface">Checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    if (searchOpen) window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [searchOpen, setSearchOpen]);
  if (!searchOpen) return null;
  const filtered = q ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.vendor.toLowerCase().includes(q.toLowerCase())).slice(0, 4) : PRODUCTS.slice(0, 4);
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container-r pt-8">
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl tracking-[0.25em]">RUQYA</span>
          <button onClick={() => setSearchOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-12 flex items-center gap-3 border-b-2 border-foreground pb-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search hijabs, brands, materials..."
            className="flex-1 bg-transparent text-xl outline-none placeholder:text-muted-foreground" />
        </div>
        {!q && (
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Suggested:</span>
            {["Silk", "KARACA", "Chiffon", "Levidor"].map((s) => (
              <button key={s} onClick={() => setQ(s)} className="rounded-full border border-border px-3 py-1 text-xs hover:bg-surface">{s}</button>
            ))}
          </div>
        )}
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {filtered.map((p) => <div key={p.id} onClick={() => setSearchOpen(false)}><ProductCard product={p} /></div>)}
        </div>
      </div>
    </div>
  );
}

export function QuickView() {
  const { quickView, setQuickView, addToCart } = useStore();
  const [color, setColor] = useState("");
  useEffect(() => { setColor(quickView?.colors[0].name ?? ""); }, [quickView]);
  if (!quickView) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-foreground/50" onClick={() => setQuickView(null)} />
      <div className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-lg bg-background md:grid-cols-2">
        <img src={quickView.image} alt={quickView.title} className="aspect-[4/5] h-full w-full object-cover" />
        <div className="flex flex-col p-8">
          <button onClick={() => setQuickView(null)} aria-label="Close" className="self-end"><X className="h-5 w-5" /></button>
          <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{quickView.vendor}</div>
          <h3 className="mt-2 font-serif text-2xl">{quickView.title}</h3>
          <div className="mt-3 text-lg">{formatPrice(quickView.price)}</div>
          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Color: <span className="text-foreground">{color}</span></div>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickView.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)} title={c.name}
                  className={`h-8 w-8 rounded-full border-2 ${color === c.name ? "border-foreground" : "border-border"}`}
                  style={{ background: c.hex }} />
              ))}
            </div>
          </div>
          <button onClick={() => { addToCart(quickView, color); setQuickView(null); }}
            className="mt-6 rounded-sm bg-primary py-3 text-sm text-primary-foreground hover:opacity-90">Add to cart</button>
          <Link to="/products/$handle" params={{ handle: quickView.handle }} onClick={() => setQuickView(null)}
            className="mt-3 text-center text-sm underline underline-offset-4">View full details</Link>
        </div>
      </div>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-6 end-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg pulse-ring hover:scale-105 transition-transform">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function TrustBar() {
  const items = [
    "Free shipping over 1,500 EGP",
    "Authentic Turkish brands",
    "Secure checkout",
    "WhatsApp support",
  ];
  return (
    <div className="border-y border-border bg-surface">
      <div className="container-r grid grid-cols-2 gap-4 py-4 text-center text-xs text-muted-foreground md:grid-cols-4 md:text-sm">
        {items.map((i) => <div key={i}>✓ {i}</div>)}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="text-xs text-muted-foreground">
      {items.map((it, i) => (
        <span key={i}>
          {it.to ? <Link to={it.to as any} className="hover:text-foreground">{it.label}</Link> : <span className="text-foreground">{it.label}</span>}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
