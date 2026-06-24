import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/overlays";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — RUQYA" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, remove } = useStore();
  const [promoOpen, setPromoOpen] = useState(false);
  const subtotal = cart.reduce((a, b) => a + b.product.price * b.qty, 0);
  const remaining = 1500 - subtotal;

  if (cart.length === 0) {
    return (
      <section className="container-r py-24 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-16 w-16 rounded-full border-2 border-border" />
          <h1 className="mt-8 font-serif text-4xl">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Discover premium Turkish hijabs woven with quiet exclusivity.</p>
          <Link to="/" className="mt-8 inline-block rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground">Discover our collection</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container-r pt-8"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} /></section>
      <section className="container-r py-12">
        <h1 className="font-serif text-5xl">Your cart</h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="divide-y divide-border border-y border-border">
            {cart.map((it) => (
              <div key={it.product.id + it.color} className="grid grid-cols-[80px_1fr_auto] items-start gap-4 py-6 md:grid-cols-[100px_1fr_auto_auto_auto] md:gap-6">
                <img src={it.product.image} alt="" className="aspect-[4/5] w-full rounded-sm object-cover" />
                <div className="min-w-0">
                  <Link to="/products/$handle" params={{ handle: it.product.handle }} className="text-sm hover:underline">{it.product.title}</Link>
                  <div className="mt-1 text-xs text-muted-foreground">{it.product.vendor} · {it.color}</div>
                  <div className="mt-2 text-sm md:hidden">{formatPrice(it.product.price)}</div>
                </div>
                <div className="hidden text-sm md:block">{formatPrice(it.product.price)}</div>
                <div className="col-span-3 flex items-center justify-between md:col-span-1 md:justify-start">
                  <div className="flex items-center border border-border">
                    <button className="px-3 py-1.5" onClick={() => updateQty(it.product.id, it.color, it.qty - 1)}>−</button>
                    <span className="w-8 text-center text-sm">{it.qty}</span>
                    <button className="px-3 py-1.5" onClick={() => updateQty(it.product.id, it.color, it.qty + 1)}>+</button>
                  </div>
                  <div className="ms-4 text-sm md:hidden">{formatPrice(it.product.price * it.qty)}</div>
                </div>
                <div className="hidden text-sm md:block">{formatPrice(it.product.price * it.qty)}</div>
                <button onClick={() => remove(it.product.id, it.color)} aria-label="Remove" className="text-muted-foreground hover:text-foreground">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-lg bg-surface p-6 lg:sticky lg:top-28">
            <h3 className="font-serif text-xl">Order summary</h3>
            <div className="mt-4 flex justify-between text-sm">
              <span>Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className={`mt-2 text-xs ${remaining <= 0 ? "text-primary" : "text-muted-foreground"}`}>
              {remaining <= 0 ? "Free shipping — you're over 1,500 EGP ✓" : `Add ${formatPrice(remaining)} more for free shipping`}
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <button onClick={() => setPromoOpen(!promoOpen)} className="flex w-full items-center justify-between text-sm">
                Have a promo code? <ChevronDown className={`h-4 w-4 transition-transform ${promoOpen ? "rotate-180" : ""}`} />
              </button>
              {promoOpen && (
                <div className="mt-3 flex gap-2">
                  <input placeholder="Code" className="flex-1 rounded-sm border border-border bg-background px-3 py-2 text-sm" />
                  <button className="rounded-sm border border-foreground px-4 text-sm">Apply</button>
                </div>
              )}
            </div>
            <button className="mt-6 w-full rounded-sm bg-primary py-3.5 text-sm text-primary-foreground hover:opacity-90">Proceed to checkout</button>
            <Link to="/" className="mt-3 block text-center text-sm underline underline-offset-4">Continue shopping</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
