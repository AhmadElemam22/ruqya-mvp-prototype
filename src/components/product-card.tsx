import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const { setQuickView, t } = useStore();
  return (
    <div className="group" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
        <Link to="/products/$handle" params={{ handle: product.handle }} className="block h-full w-full">
          <img src={product.image} alt={product.title} loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hover ? "opacity-0" : "opacity-100"}`} />
          <img src={product.image2} alt="" aria-hidden loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`} />
        </Link>
        <button
          aria-label="Quick view"
          onClick={() => setQuickView(product)}
          className="absolute end-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 hover:bg-background"
        >
          <Eye className="h-4 w-4" />
        </button>
        {product.colors.length > 1 && (
          <div className="absolute bottom-3 start-3 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {t("selectOptions")}
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <Link to="/collections/$material" params={{ material: product.material }}
          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
          {product.vendor}
        </Link>
        <Link to="/products/$handle" params={{ handle: product.handle }}
          className="block text-sm leading-snug text-foreground line-clamp-2 hover:underline underline-offset-4">
          {product.title}
        </Link>
        <div className="pt-1 text-sm font-medium">{formatPrice(product.price)}</div>
        <div className="flex gap-1 pt-1">
          {product.colors.slice(0, 5).map((c) => (
            <span key={c.name} className="h-3 w-3 rounded-full border border-border" style={{ background: c.hex }} title={c.name} />
          ))}
          {product.colors.length > 5 && <span className="text-[10px] text-muted-foreground">+{product.colors.length - 5}</span>}
        </div>
      </div>
    </div>
  );
}
