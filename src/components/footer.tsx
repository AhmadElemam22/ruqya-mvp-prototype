import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { MATERIALS, BRANDS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-r py-16">
        {/* Newsletter */}
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-serif text-3xl">Stay in touch</h3>
          <p className="mt-2 text-sm text-muted-foreground">Be the first to know about new arrivals and exclusive offers.</p>
          <form className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="your@email.com"
              className="flex-1 rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
            <button className="rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90">Subscribe</button>
          </form>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest">Shop by Material</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {MATERIALS.map((m) => (
                <li key={m.handle}>
                  <Link to="/collections/$material" params={{ material: m.handle }} className="hover:text-foreground">{m.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest">Brands</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {BRANDS.map((b) => <li key={b.handle}><Link to="/brands" className="hover:text-foreground">{b.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest">Help</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pages/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/pages/contact" className="hover:text-foreground">Contact</Link></li>
              <li>Shipping & Delivery</li>
              <li>Returns & Exchanges</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest">Connect</h4>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-background"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-background"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-background"><MessageCircle className="h-4 w-4" /></a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We reply in Arabic and English 🇪🇬</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© RUQYA — all rights reserved</div>
          <div className="flex items-center gap-3">
            <span className="rounded border border-border bg-background px-2 py-1">VISA</span>
            <span className="rounded border border-border bg-background px-2 py-1">Mastercard</span>
            <span className="rounded border border-border bg-background px-2 py-1">Fawry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
