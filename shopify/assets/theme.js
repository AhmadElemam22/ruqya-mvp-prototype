// Ruqya theme JS — vanilla, no framework.
(function () {
  "use strict";

  const COLOR_MAP = {
    "Rose Dust": "#C8A0A0", "Sage": "#8FA68E", "Ivory": "#F2EAD3", "Navy": "#2A3A55",
    "Blush": "#E8C8C0", "Gold": "#C4A882", "Charcoal": "#3A3A3A", "Terracotta": "#C4704B",
    "Mist": "#BFC8C8", "Plum": "#5A3A4A"
  };
  window.RUQYA_COLOR_MAP = COLOR_MAP;

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function openDrawer(id) { const el = document.getElementById(id); if (el) el.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function closeDrawer(id) { const el = document.getElementById(id); if (el) el.classList.remove("is-open"); document.body.style.overflow = ""; }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-drawer]");
    if (openBtn) { openDrawer(openBtn.getAttribute("data-open-drawer")); }
    const closeBtn = e.target.closest("[data-close-drawer]");
    if (closeBtn) { closeDrawer(closeBtn.getAttribute("data-close-drawer")); }
    const bg = e.target.closest(".drawer-overlay__bg");
    if (bg) { bg.closest(".drawer-overlay").classList.remove("is-open"); document.body.style.overflow = ""; }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { qsa(".drawer-overlay.is-open, .search-overlay.is-open, .quickview-overlay.is-open").forEach((el) => el.classList.remove("is-open")); document.body.style.overflow = ""; }
  });

  // header scroll state
  const header = qs(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // accordion (product page)
  document.addEventListener("click", (e) => {
    const head = e.target.closest(".accordion-item__head");
    if (!head) return;
    const item = head.closest(".accordion-item");
    const wasOpen = item.classList.contains("is-open");
    item.parentElement.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("is-open"));
    if (!wasOpen) item.classList.add("is-open");
  });

  // PDP gallery thumbnail swap
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-gallery-thumb]");
    if (!thumb) return;
    const wrap = thumb.closest("[data-gallery]");
    const main = qs("[data-gallery-main]", wrap);
    main.src = thumb.getAttribute("data-gallery-thumb");
    qsa("[data-gallery-thumb]", wrap).forEach((b) => b.classList.remove("is-active"));
    thumb.classList.add("is-active");
  });

  // qty steppers (works for PDP + cart, uses data attributes)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-qty-step]");
    if (!btn) return;
    const wrap = btn.closest("[data-qty-wrap]");
    const input = qs("input[name='quantity'], [data-qty-value]", wrap);
    const dir = btn.getAttribute("data-qty-step") === "inc" ? 1 : -1;
    let val = parseInt(input.value || input.textContent || "1", 10) + dir;
    if (val < 1) val = 1;
    if (input.tagName === "INPUT") input.value = val; else input.textContent = val;
    if (wrap.hasAttribute("data-cart-line-key")) {
      updateCartLine(wrap.getAttribute("data-cart-line-key"), val);
    }
  });

  // Keep every image visible. Picking a color jumps to that color's first image and scrolls the strip to it.
  function showVariantGallery(sw) {
    const variantImage = sw.getAttribute("data-variant-image");
    const gallery = qs("[data-gallery]");
    if (!variantImage || !gallery) return;
    const group = sw.getAttribute("data-variant-group");
    const thumbs = qsa("[data-gallery-thumb]", gallery);
    thumbs.forEach((b) => {
      b.hidden = false;
      b.classList.toggle("is-active", b.getAttribute("data-gallery-thumb") === variantImage);
    });
    const main = qs("[data-gallery-main]", gallery);
    if (main) main.src = variantImage;
    const target = thumbs.find((b) => b.classList.contains("is-active"))
      || thumbs.find((b) => b.getAttribute("data-image-group") === group);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const active = qs("[data-pdp-form] [data-variant-swatch].is-active");
    if (active) showVariantGallery(active);
  });

  // color swatch selection on PDP
  document.addEventListener("click", (e) => {
    const sw = e.target.closest("[data-variant-swatch]");
    if (!sw) return;
    const wrap = sw.closest("[data-swatch-group]");
    qsa("[data-variant-swatch]", wrap).forEach((s) => s.classList.remove("is-active"));
    sw.classList.add("is-active");
    const nameEl = qs("[data-selected-color]", wrap.closest("[data-pdp-form]") || document);
    if (nameEl) nameEl.textContent = sw.getAttribute("data-color-name");
    if (!sw.closest("#quickview-modal")) showVariantGallery(sw);
    const variantPrice = sw.getAttribute("data-variant-price");
    const priceEl = qs("[data-pdp-price]");
    if (variantPrice && priceEl) priceEl.textContent = variantPrice;
    const variantId = sw.getAttribute("data-variant-id");
    const form = sw.closest("form");
    if (form && variantId) {
      const idInput = qs("input[name='id']", form);
      if (idInput) idInput.value = variantId;
    }
  });

  // Cart AJAX: add to cart via forms marked data-ajax-cart
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-ajax-cart-form]");
    if (!form) return;
    // "Buy item" button submits normally so the shopper lands on checkout
    if (e.submitter && e.submitter.hasAttribute("data-buy-now")) return;
    e.preventDefault();
    const fd = new FormData(form);
    fetch("/cart/add.js", { method: "POST", body: fd, headers: { "Accept": "application/json" } })
      .then((r) => r.json())
      .then(() => refreshCartDrawer(true))
      .catch((err) => console.error("Add to cart failed", err));
  });

  function updateCartLine(key, quantity) {
    fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: key, quantity })
    }).then((r) => r.json()).then(() => refreshCartDrawer(false));
  }

  document.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-cart-remove]");
    if (!rm) return;
    updateCartLine(rm.getAttribute("data-cart-remove"), 0);
  });

  function refreshCartDrawer(open) {
    // Current path keeps the locale (/ar-eg); "/" always rendered the English drawer.
    fetch(`${window.location.pathname}?section_id=cart-drawer`)
      .then((r) => r.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const fresh = doc.getElementById("cart-drawer");
        const current = document.getElementById("cart-drawer");
        if (fresh && current) {
          current.innerHTML = fresh.innerHTML;
          if (open) current.classList.add("is-open");
          // Keep the rewards bars on the product / cart page in step with the drawer.
          const freshRewards = fresh.querySelector(".rewards");
          if (freshRewards) qsa(".rewards").forEach((el) => { if (!current.contains(el)) el.outerHTML = freshRewards.outerHTML; });
        }
        document.body.style.overflow = open ? "hidden" : document.body.style.overflow;
      });
  }

  // Quick view: populate modal from data attributes on trigger button
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-quickview-trigger]");
    if (!trigger) return;
    const modal = qs("#quickview-modal");
    if (!modal) return;
    modal.querySelector("[data-qv-image]").src = trigger.getAttribute("data-qv-image");
    modal.querySelector("[data-qv-vendor]").textContent = trigger.getAttribute("data-qv-vendor");
    modal.querySelector("[data-qv-title]").textContent = trigger.getAttribute("data-qv-title");
    modal.querySelector("[data-qv-price]").textContent = trigger.getAttribute("data-qv-price");
    modal.querySelector("[data-qv-link]").href = trigger.getAttribute("data-qv-url");
    const form = modal.querySelector("[data-ajax-cart-form]");
    if (form) form.action = "/cart/add";
    const swatchWrap = modal.querySelector("[data-qv-swatches]");
    const colors = JSON.parse(trigger.getAttribute("data-qv-colors") || "[]");
    swatchWrap.innerHTML = colors.map((c, i) =>
      `<button type="button" class="color-swatch${i === 0 ? " is-active" : ""}" data-variant-swatch data-variant-id="${c.id}" data-color-name="${c.name}" style="background:${c.hex || COLOR_MAP[c.name] || '#ccc'}" title="${c.name}"></button>`
    ).join("");
    const idInput = form ? form.querySelector("input[name='id']") : null;
    if (idInput && colors[0]) idInput.value = colors[0].id;
    modal.querySelector("[data-selected-color]").textContent = colors[0] ? colors[0].name : "";
    qs("#quickview-overlay").classList.add("is-open");
  });

  // Search overlay: simple client-side filter over pre-rendered product list
  const searchInput = qs("#search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim();
      if (q.length < 2) { qs("#search-results").innerHTML = ""; qs("#search-suggested").classList.remove("u-hidden"); return; }
      qs("#search-suggested").classList.add("u-hidden");
      const params = new URLSearchParams({ q, "resources[type]": "product", "resources[limit]": "8" });
      const searchUrl = (window.routes && window.routes.search_url) || "/search";
      fetch(`${searchUrl}/suggest.json?${params.toString()}`)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`search ${r.status}`))))
        .then((data) => {
          const products = data?.resources?.results?.products || [];
          const grid = qs("#search-results");
          grid.innerHTML = products.map((p) => `
            <a href="${p.url}" class="product-card">
              <div class="product-card__media"><img src="${p.image}" alt="${p.title}" class="img-main"></div>
              <div class="product-card__body">
                <div class="product-card__vendor">${p.vendor}</div>
                <div class="product-card__title">${p.title}</div>
                <div class="product-card__price">${p.price}</div>
              </div>
            </a>`).join("") || `<p class="text-muted">No results</p>`;
        })
        .catch(() => { qs("#search-results").innerHTML = `<p class="text-muted">No results</p>`; });
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const value = btn.getAttribute("data-copy") || "";
    const copied = btn.getAttribute("data-copied-label") || "Copied";
    const original = btn.textContent;
    const done = () => {
      btn.textContent = copied;
      setTimeout(() => { btn.textContent = original; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(() => {
        window.prompt("", value);
      });
    } else {
      window.prompt("", value);
    }
  });
})();
