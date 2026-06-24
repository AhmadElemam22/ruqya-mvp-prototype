import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Award, Layers, Wind } from "lucide-react";
import { TrustBar } from "@/components/overlays";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, MATERIALS, BRANDS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RUQYA — Premium Turkish Hijabs in Egypt" },
      { name: "description", content: "Authentic Turkish hijabs with woven designs, natural fibers, and quiet exclusivity. First touch tells the difference." },
      { property: "og:title", content: "RUQYA — Premium Turkish Hijabs" },
      { property: "og:description", content: "Designs woven into the fabric — never printed or replicated." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="container-r grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="fade-up">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Turkish luxury hijabs</div>
            <h1 className="mt-4 font-serif text-6xl leading-[0.95] tracking-[0.15em] md:text-8xl">RUQYA</h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              Gentle on the skin with lasting comfort. Designs woven into the fabric — never printed or replicated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collections/$material" params={{ material: "silk" }}
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground transition hover:opacity-90">
                Shop now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#materials" className="inline-flex items-center gap-2 rounded-sm border border-foreground px-6 py-3 text-sm transition hover:bg-foreground hover:text-background">
                Explore materials
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface md:aspect-[5/6]">
            <img src={PRODUCTS[0].image}
              alt="Hijab drape" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] hover:scale-105" />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* MATERIALS */}
      <section id="materials" className="container-r py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Our hijab categories</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Shop by material</h2>
          <p className="mt-3 text-muted-foreground">Discover premium fabrics woven with quiet exclusivity.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {MATERIALS.map((m) => (
            <Link key={m.handle} to="/collections/$material" params={{ material: m.handle }}
              className="group relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
              <img src={m.img} alt={m.label} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="font-serif text-xl text-background">{m.label}</span>
                <ArrowRight className="h-4 w-4 text-background transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-r py-20 md:py-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl">Featured hijabs</h2>
            <p className="mt-3 text-muted-foreground">Curated pieces from our latest collection.</p>
          </div>
          <Link to="/collections/$material" params={{ material: "silk" }} className="hidden text-sm underline underline-offset-4 sm:block">View all</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {PRODUCTS.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-r grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <img src={PRODUCTS[9].image2}
              alt="Fabric weave" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Why RUQYA</div>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">First touch tells the difference</h2>
            <p className="mt-4 text-muted-foreground">RUQYA is created for women who choose real value and quiet exclusivity.</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                [Sparkles, "Advanced Soft-Touch Fiber", "Gentle on the skin with lasting comfort"],
                [Award, "Original Turkish Brand", "Authentic quality you can trust"],
                [Layers, "Woven, never printed", "Designs woven into the fabric"],
                [Wind, "Natural breathability", "Lasting stability and softness"],
              ].map(([Icon, t, d]: any) => (
                <div key={t} className="flex gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="text-sm font-medium">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div dir="rtl" lang="ar" className="mt-10 rounded-md border-s-2 border-primary bg-background p-6 text-right" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>
              <p className="text-base">✳️ الفارق يُلمَس من أول لمسة</p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>✅ خامات طبيعية عضوية حقيقية</li>
                <li>✅ براند تركي أصلي</li>
                <li>✅ تصميم منسوج داخل القماش — غير مطبوع ولا مُقلَّد</li>
                <li>✅ نعومة لطيفة على البشرة، تهوية طبيعية، وثبات يدوم</li>
              </ul>
              <p className="mt-3 text-base">✳️ RUQYA خُلقت للمرأة التي تختار القيمة الحقيقية والتميّز الهادئ</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="container-r py-20 md:py-28">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Our brands</h2>
          <p className="mt-3 text-muted-foreground">Authentic Turkish craftsmanship</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map((b) => (
            <Link key={b.handle} to="/brands"
              className="group rounded-md border border-border bg-background p-6 text-center transition hover:border-primary hover:bg-surface">
              <div className="font-serif text-lg">{b.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{b.count} products</div>
              <div className="mt-3 text-xs text-primary opacity-0 transition group-hover:opacity-100">Shop →</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
