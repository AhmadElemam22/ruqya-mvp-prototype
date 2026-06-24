import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./data";

export type CartItem = { product: Product; color: string; qty: number };
export type Lang = "en" | "ar";

type Ctx = {
  cart: CartItem[];
  addToCart: (p: Product, color: string, qty?: number) => void;
  updateQty: (id: number, color: string, qty: number) => void;
  remove: (id: number, color: string) => void;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof T["en"]) => string;
};

const T = {
  en: {
    home: "Home", shopByMaterial: "Shop by Material", brands: "Brands",
    accessories: "Accessories", faq: "FAQ", contact: "Contact",
    shopNow: "Shop now", addToCart: "Add to cart", search: "Search", cart: "Cart",
    subscribe: "Subscribe", selectOptions: "Select options", viewAll: "View all",
    yourCart: "Your cart", checkout: "Proceed to checkout", continueShopping: "Continue shopping",
    emptyCart: "Your cart is empty", subtotal: "Subtotal",
    exploreMaterials: "Explore materials", featuredHijabs: "Featured hijabs",
    ourBrands: "Our brands", stayInTouch: "Stay in touch",
  },
  ar: {
    home: "الرئيسية", shopByMaterial: "تسوق حسب الخامة", brands: "الماركات",
    accessories: "الإكسسوارات", faq: "الأسئلة الشائعة", contact: "تواصل معنا",
    shopNow: "تسوق الآن", addToCart: "أضف إلى السلة", search: "بحث", cart: "السلة",
    subscribe: "اشترك", selectOptions: "اختر الخيارات", viewAll: "عرض الكل",
    yourCart: "سلتك", checkout: "إتمام الطلب", continueShopping: "متابعة التسوق",
    emptyCart: "سلتك فارغة", subtotal: "المجموع",
    exploreMaterials: "استكشف الخامات", featuredHijabs: "حجابات مختارة",
    ourBrands: "ماركاتنا", stayInTouch: "ابقَ على تواصل",
  },
} as const;

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const addToCart: Ctx["addToCart"] = (p, color, qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.product.id === p.id && x.color === color);
      if (i >= 0) {
        const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n;
      }
      return [...c, { product: p, color, qty }];
    });
    setCartOpen(true);
  };

  const updateQty: Ctx["updateQty"] = (id, color, qty) =>
    setCart((c) => c.map((x) => x.product.id === id && x.color === color ? { ...x, qty: Math.max(1, qty) } : x));

  const remove: Ctx["remove"] = (id, color) =>
    setCart((c) => c.filter((x) => !(x.product.id === id && x.color === color)));

  const t: Ctx["t"] = (k) => T[lang][k];

  return (
    <StoreCtx.Provider value={{
      cart, addToCart, updateQty, remove,
      cartOpen, setCartOpen, searchOpen, setSearchOpen,
      quickView, setQuickView, lang, setLang, t,
    }}>{children}</StoreCtx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
};
