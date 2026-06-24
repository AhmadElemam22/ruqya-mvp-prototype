import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/overlays";
import { BRANDS, productsByBrand } from "@/lib/data";

export const Route = createFileRoute("/brands")({
  head: () => ({ meta: [{ title: "Our Brands — RUQYA" }, { name: "description", content: "Authentic Turkish hijab brands curated by RUQYA." }] }),
  component: BrandsPage,
});

const brandImage = (handle: string) => productsByBrand(handle)[0]?.image ?? "";

function BrandsPage() {
  return (
    <>
      <section className="container-r pt-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Brands" }]} />
      </section>
      <section className="container-r py-12 md:py-16">
        <h1 className="font-serif text-5xl md:text-6xl">Our brands</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          RUQYA partners with authentic Turkish brands known for woven craftsmanship and premium natural fibers.
        </p>
      </section>
      <section className="container-r pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b) => (
            <Link key={b.handle} to="/brands"
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
              <img src={brandImage(b.handle)} alt={b.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                <div className="font-serif text-3xl">{b.name}</div>
                <p className="mt-2 text-sm text-background/85">{b.desc}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-background/70">{b.count} products</span>
                  <span className="flex items-center gap-1">Shop {b.name} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
