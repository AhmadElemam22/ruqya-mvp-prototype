import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Instagram, Facebook, Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/overlays";

export const Route = createFileRoute("/pages/contact")({
  head: () => ({ meta: [{ title: "Contact — RUQYA" }, { name: "description", content: "Get in touch with RUQYA. We reply in Arabic and English." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="container-r pt-8"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} /></section>
      <section className="container-r py-12 md:py-16">
        <h1 className="font-serif text-5xl md:text-6xl">Contact</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Whether you have a question about an order, a product, or wholesale — we'd love to hear from you.</p>
      </section>
      <section className="container-r pb-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-serif text-2xl">Get in touch</h2>
            {sent ? (
              <div className="mt-6 rounded-md border border-primary bg-surface p-6 text-sm">Thank you! We'll reply within 24 hours.</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
                <Field label="Full name"><input required className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" /></Field>
                <Field label="Email"><input type="email" required className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" /></Field>
                <Field label="Phone number"><input className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" /></Field>
                <Field label="Subject">
                  <select className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                    <option>General inquiry</option><option>Order question</option><option>Return request</option><option>Wholesale</option>
                  </select>
                </Field>
                <Field label="Message"><textarea rows={5} required className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" /></Field>
                <button className="w-full rounded-sm bg-primary py-3 text-sm text-primary-foreground hover:opacity-90">Send message</button>
              </form>
            )}
          </div>
          <div>
            <h2 className="font-serif text-2xl">We'd love to hear from you</h2>
            <a href="https://wa.me/201000000000" className="mt-6 flex items-center justify-center gap-2 rounded-sm bg-whatsapp px-5 py-3.5 text-sm text-white">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /> hello@ruqya-eg.com</div>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border"><Instagram className="h-4 w-4" /></a>
                <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-border"><Facebook className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="mt-8 rounded-md bg-surface p-5 text-sm">
              <div className="font-medium">Business hours</div>
              <div className="mt-1 text-muted-foreground">Sunday – Thursday, 10 AM – 6 PM (Cairo time)</div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We reply in Arabic and English 🇪🇬</p>
            <div className="mt-8 aspect-[16/9] overflow-hidden rounded-md bg-surface">
              <img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80" alt="Cairo" className="h-full w-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
