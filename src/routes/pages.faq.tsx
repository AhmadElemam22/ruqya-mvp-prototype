import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/overlays";

export const Route = createFileRoute("/pages/faq")({
  head: () => ({ meta: [{ title: "FAQ — RUQYA" }, { name: "description", content: "Answers about RUQYA orders, shipping, materials, and returns." }] }),
  component: FAQ,
});

const FAQS: { cat: string; items: { q: string; a: string }[] }[] = [
  { cat: "Orders & Shipping", items: [
    { q: "How long does delivery take in Egypt?", a: "2–5 business days nationwide. Cairo and Giza often receive same-week delivery." },
    { q: "Do you offer free shipping?", a: "Yes, free shipping on all orders over 1,500 EGP." },
    { q: "Do you ship outside Egypt?", a: "Currently we ship within Egypt. International shipping coming soon." },
    { q: "How can I track my order?", a: "You'll receive a tracking link via SMS and email once your order ships." },
  ]},
  { cat: "Products & Materials", items: [
    { q: "Are RUQYA designs printed or woven?", a: "All designs are woven directly into the fabric — never printed or replicated." },
    { q: "What sizes do hijabs come in?", a: "Most hijabs are 70×180 cm, 75×190 cm, or 75×200 cm. Exact dimensions are listed on each product page." },
    { q: "What materials are available?", a: "Silk, Cotton, Cotton Silk, Chiffon, Satin, Viscose, Microfiber, Lyocell, Fiber, and Voile Crystal." },
    { q: "Are the fabrics natural/organic?", a: "Many of our hijabs use natural and organic fibers. Material composition is listed on each product page." },
  ]},
  { cat: "Returns & Exchanges", items: [
    { q: "What is your return policy?", a: "Returns accepted within 14 days if unworn with tags attached." },
    { q: "How do I initiate a return?", a: "Contact us via WhatsApp or the contact form with your order number." },
  ]},
  { cat: "Payments", items: [
    { q: "What payment methods do you accept?", a: "Visa, Mastercard, and Fawry (Egypt)." },
    { q: "Is checkout secure?", a: "Yes, all payments are processed through secure encrypted checkout." },
  ]},
];

function FAQ() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const filtered = FAQS.map((c) => ({
    ...c,
    items: c.items.filter((i) => (i.q + i.a).toLowerCase().includes(q.toLowerCase())),
  })).filter((c) => c.items.length);
  return (
    <>
      <section className="container-r pt-8"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} /></section>
      <section className="container-r py-12 md:py-16">
        <h1 className="font-serif text-5xl md:text-6xl">Frequently asked questions</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Everything you need to know about RUQYA hijabs, orders, and shipping.</p>
        <div className="mt-8 flex max-w-md items-center gap-2 border-b border-border pb-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions..." className="flex-1 bg-transparent text-sm outline-none" />
        </div>
      </section>
      <section className="container-r pb-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {filtered.map((cat) => (
            <div key={cat.cat}>
              <h2 className="font-serif text-2xl">{cat.cat}</h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                {cat.items.map((item) => {
                  const id = cat.cat + item.q;
                  const isOpen = open === id;
                  return (
                    <div key={id}>
                      <button onClick={() => setOpen(isOpen ? null : id)} className="flex w-full items-center justify-between gap-4 py-5 text-start text-sm">
                        <span className="font-medium">{item.q}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && <div className="pb-5 text-sm text-muted-foreground">{item.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-xl rounded-lg bg-surface p-8 text-center">
          <h3 className="font-serif text-2xl">Still have questions?</h3>
          <a href="https://wa.me/201000000000" className="mt-4 inline-flex items-center gap-2 rounded-sm bg-whatsapp px-5 py-3 text-sm text-white">
            <MessageCircle className="h-4 w-4" /> Chat with us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
