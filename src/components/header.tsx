import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, ChevronDown, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { MATERIALS } from "@/lib/data";

export function Header() {
  const { cart, setCartOpen, setSearchOpen, t } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const count = cart.reduce((a, b) => a + b.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-background"}`}>
      <div className="container-r flex h-16 items-center justify-between gap-4 md:h-20">
        <button className="md:hidden" aria-label="Menu" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="font-serif text-2xl font-medium tracking-[0.25em]">RUQYA</Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm hover:text-primary">{t("home")}</Link>
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className="flex items-center gap-1 text-sm hover:text-primary">
              {t("shopByMaterial")} <ChevronDown className="h-3 w-3" />
            </button>
            {megaOpen && (
              <div className="absolute start-1/2 top-full z-50 -translate-x-1/2 pt-4 rtl:translate-x-1/2">
                <div className="grid w-[640px] grid-cols-[1fr_240px] gap-8 rounded-lg border border-border bg-background p-8 shadow-lg">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {MATERIALS.map((m) => (
                      <Link key={m.handle} to="/collections/$material" params={{ material: m.handle }}
                        className="text-sm text-muted-foreground hover:text-foreground">{m.label}</Link>
                    ))}
                  </div>
                  <div className="relative overflow-hidden rounded-md">
                    <img src={MATERIALS[0].img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/30" />
                    <div className="relative flex h-full flex-col justify-end p-4">
                      <div className="text-xs text-background/80">Shop</div>
                      <div className="font-serif text-xl text-background">All materials</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/brands" className="text-sm hover:text-primary">{t("brands")}</Link>
          <span className="flex cursor-default items-center gap-1.5 text-sm text-muted-foreground">
            {t("accessories")}
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
              <Heart className="h-3 w-3 fill-primary" /> Coming soon
            </span>
          </span>
          <Link to="/pages/faq" className="text-sm hover:text-primary">{t("faq")}</Link>
          <Link to="/pages/contact" className="text-sm hover:text-primary">{t("contact")}</Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen(true)} className="cursor-pointer"><Search className="h-5 w-5" /></button>
          <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative cursor-pointer">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -end-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6">
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.25em]">RUQYA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <nav className="mt-8 space-y-1" onClick={() => setMobileOpen(false)}>
              <Link to="/" className="block py-3 text-base border-b border-border">{t("home")}</Link>
              <div className="py-3 border-b border-border">
                <div className="mb-2 text-base">{t("shopByMaterial")}</div>
                <div className="grid grid-cols-2 gap-2 ps-2">
                  {MATERIALS.map((m) => (
                    <Link key={m.handle} to="/collections/$material" params={{ material: m.handle }}
                      className="text-sm text-muted-foreground">{m.label}</Link>
                  ))}
                </div>
              </div>
              <Link to="/brands" className="block py-3 text-base border-b border-border">{t("brands")}</Link>
              <div className="flex items-center justify-between py-3 text-base border-b border-border text-muted-foreground">
                {t("accessories")}
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                  <Heart className="h-3 w-3 fill-primary" /> Coming soon
                </span>
              </div>
              <Link to="/pages/faq" className="block py-3 text-base border-b border-border">{t("faq")}</Link>
              <Link to="/pages/contact" className="block py-3 text-base border-b border-border">{t("contact")}</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
