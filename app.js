(() => {
  "use strict";
  const hero = document.querySelector(".hero"),
    nav = document.querySelector(".nav"),
    menu = document.querySelector(".menu-toggle"),
    toast = document.querySelector(".toast"),
    reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navHome = nav.parentElement,
    navNext = nav.nextSibling,
    smallScreen = matchMedia("(max-width: 900px)");
  function positionNav() {
    if (smallScreen.matches) {
      if (nav.parentElement !== document.body) document.body.appendChild(nav);
    } else {
      if (nav.parentElement !== navHome) navHome.insertBefore(nav, navNext);
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menu.setAttribute("aria-expanded", "false");
    }
  }
  positionNav();
  smallScreen.addEventListener("change", positionNav);

  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });
  let toastTimer;
  document.querySelectorAll("[data-demo]").forEach((b) =>
    b.addEventListener("click", () => {
      toast.textContent = b.dataset.demo;
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
    }),
  );
  // Animated drifting fragrance veil, visible on mobile and desktop.
  const canvas = document.querySelector(".hero__mist"),
    ctx = canvas?.getContext("2d");
  if (!ctx || reduced) return;
  let w = 0,
    h = 0,
    dpr = 1,
    clouds = [],
    pointer = { x: 0, y: 0 };
  function resize() {
    w = hero.clientWidth;
    h = hero.clientHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clouds = Array.from({ length: w < 650 ? 24 : 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * (w < 650 ? h * 0.55 : h),
      r: 20 + Math.random() * (w < 650 ? 45 : 65),
      speed: 0.2 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 0.3,
      alpha: 0.035 + Math.random() * 0.07,
    }));
  }
  resize();
  addEventListener("resize", resize, { passive: true });
  hero.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / innerWidth - 0.5) * 10;
      pointer.y = (e.clientY / innerHeight - 0.5) * 10;
    },
    { passive: true },
  );
  function draw() {
    if (!document.hidden) {
      ctx.clearRect(0, 0, w, h);
      for (const p of clouds) {
        p.y -= p.speed;
        p.x += p.drift + pointer.x * 0.003;
        if (p.y < -p.r) {
          p.y = w < 650 ? h * 0.55 : h;
          p.x = Math.random() * w;
        }
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// Catalog: demo data, deliberately separated from the site's original scripts.
(() => {
  "use strict";
  const catalog = document.querySelector("#catalog-grid");
  if (!catalog) return;
  // Replace these sample products, prices and optional image paths with real inventory.
  // Реальні моделі та посилання на їхні предметні фото. Ціни демонстраційні.
  const products = [
    {
      id: "ar-01",
      name: "Chanel Chance Tendre",
      type: "АРОМАТ · ДЕМО",
      notes: "Грейпфрут · жасмин · мускус",
      image: "img/1.png",
      prices: { 5: 260, 10: 470, 30: 1150 },
    },
    {
      id: "ar-02",
      name: "Dior J’adore",
      type: "АРОМАТ · ДЕМО",
      notes: "Іланг-іланг · троянда · жасмин",
      image: "img/2.png",
      prices: { 5: 275, 10: 495, 30: 1195 },
    },
    {
      id: "ar-03",
      name: "YSL Libre",
      type: "АРОМАТ · ДЕМО",
      notes: "Лаванда · апельсиновий цвіт · ваніль",
      image: "img/3.png",
      prices: { 5: 290, 10: 520, 30: 1240 },
    },
    {
      id: "ar-04",
      name: "Gucci Bloom",
      type: "АРОМАТ · ДЕМО",
      notes: "Тубероза · жасмин · квіти",
      image: "img/4.png",
      prices: { 5: 305, 10: 545, 30: 1285 },
    },
    {
      id: "ar-05",
      name: "Lancôme La Vie Est Belle",
      type: "АРОМАТ · ДЕМО",
      notes: "Ірис · жасмин · ваніль",
      image: "img/5.png",
      prices: { 5: 320, 10: 570, 30: 1330 },
    },
    {
      id: "ar-06",
      name: "Versace Bright Crystal",
      type: "АРОМАТ · ДЕМО",
      notes: "Юзу · півонія · мускус",
      image: "img/6.png",
      prices: { 5: 335, 10: 595, 30: 1375 },
    },
    {
      id: "ar-07",
      name: "Armani Sì",
      type: "АРОМАТ · ДЕМО",
      notes: "Чорна смородина · троянда · ваніль",
      image: "img/1.png",
      prices: { 5: 350, 10: 620, 30: 1420 },
    },
    {
      id: "ar-08",
      name: "CH Good Girl",
      type: "АРОМАТ · ДЕМО",
      notes: "Жасмин · какао · тонка",
      image: "img/2.png",
      prices: { 5: 260, 10: 470, 30: 1150 },
    },
    {
      id: "ar-09",
      name: "Tom Ford Black Orchid",
      type: "АРОМАТ · ДЕМО",
      notes: "Чорна орхідея · трюфель · пачулі",
      image: "img/3.png",
      prices: { 5: 275, 10: 495, 30: 1195 },
    },
    {
      id: "ar-10",
      name: "Miss Dior Blooming",
      type: "АРОМАТ · ДЕМО",
      notes: "Півонія · троянда · білий мускус",
      image: "img/4.png",
      prices: { 5: 290, 10: 520, 30: 1240 },
    },
    {
      id: "ar-11",
      name: "Chanel Coco Mademoiselle",
      type: "АРОМАТ · ДЕМО",
      notes: "Апельсин · троянда · пачулі",
      image: "img/5.png",
      prices: { 5: 305, 10: 545, 30: 1285 },
    },
    {
      id: "ar-12",
      name: "YSL Black Opium",
      type: "АРОМАТ · ДЕМО",
      notes: "Кава · ваніль · білі квіти",
      image: "img/6.png",
      prices: { 5: 320, 10: 570, 30: 1330 },
    },
    {
      id: "ar-13",
      name: "Marc Jacobs Daisy",
      type: "АРОМАТ · ДЕМО",
      notes: "Полуниця · фіалка · жасмин",
      image: "img/1.png",
      prices: { 5: 335, 10: 595, 30: 1375 },
    },
    {
      id: "ar-14",
      name: "Gucci Flora Gardenia",
      type: "АРОМАТ · ДЕМО",
      notes: "Гарденія · жасмин · груша",
      image: "img/2.png",
      prices: { 5: 350, 10: 620, 30: 1420 },
    },
    {
      id: "ar-15",
      name: "Prada Paradoxe",
      type: "АРОМАТ · ДЕМО",
      notes: "Неролі · амбра · мускус",
      image: "img/3.png",
      prices: { 5: 260, 10: 470, 30: 1150 },
    },
    {
      id: "ar-16",
      name: "Valentino Born in Roma",
      type: "АРОМАТ · ДЕМО",
      notes: "Жасмин · ваніль · деревина",
      image: "img/4.png",
      prices: { 5: 275, 10: 495, 30: 1195 },
    },
    {
      id: "ar-17",
      name: "Burberry Her",
      type: "АРОМАТ · ДЕМО",
      notes: "Ягоди · жасмин · амбра",
      image: "img/17.png",
      prices: { 5: 290, 10: 520, 30: 1240 },
    },
    {
      id: "ar-18",
      name: "Narciso For Her",
      type: "АРОМАТ · ДЕМО",
      notes: "Мускус · троянда · амбра",
      image: "img/5.png",
      prices: { 5: 305, 10: 545, 30: 1285 },
    },
    {
      id: "ar-19",
      name: "D&G Light Blue",
      type: "АРОМАТ · ДЕМО",
      notes: "Лимон · яблуко · кедр",
      image: "img/6.png",
      prices: { 5: 320, 10: 570, 30: 1330 },
    },
    {
      id: "ar-20",
      name: "Mugler Alien",
      type: "АРОМАТ · ДЕМО",
      notes: "Жасмин · кашмеран · амбра",
      image: "img/2.png",
      prices: { 5: 335, 10: 595, 30: 1375 },
    },
  ];
  let searchTerm = "";
  const state = new Map();
  const cart = new Map();
  const money = (n) => Number.isFinite(n) ? new Intl.NumberFormat("uk-UA").format(n) + " грн" : "Ціну уточнюйте";
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const toast = document.querySelector(".toast");
  let toastTimer;
  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }
  const moreButton = document.querySelector("#catalog-more");
  const pageSize = () =>
    window.matchMedia("(max-width: 650px)").matches ? 10 : 8;
  let visibleCount = pageSize();
  let lastPageSize = pageSize();
  window.addEventListener("resize", () => {
    const next = pageSize();
    if (next !== lastPageSize) {
      if (visibleCount === lastPageSize) visibleCount = next;
      lastPageSize = next;
      drawCatalog();
    }
  });
  function drawCatalog() {
    const filtered = products.filter(p => (p.name + ' ' + p.notes).toLocaleLowerCase('uk-UA').includes(searchTerm));
    catalog.innerHTML = filtered
      .slice(0, visibleCount)
      .map((p, i) => {
        const volume = state.get(p.id) || 10;
        const image = `<img class="perfume__photo" src="${esc(p.image)}" alt="Флакон ${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.hidden=true;this.nextElementSibling.hidden=false"><div class="perfume__placeholder" hidden><span class="perfume__placeholder-mark">LE.</span><span class="perfume__placeholder-label">THE ART OF FRAGRANCE</span></div>`;
        return `<article class="perfume" data-id="${p.id}"><div class="perfume__media">${image}<span class="perfume__branding" aria-hidden="true"><img src="img/logo.png" alt=""></span><span class="perfume__number">${String(i + 1).padStart(2, "0")} / LE</span><span class="perfume__tag">EAU DE PARFUM</span></div><div class="perfume__details"><p class="perfume__type">${esc(p.type)}</p><h3 class="perfume__name">${esc(p.name)}</h3><p class="perfume__notes">${esc(p.notes)}</p><div class="perfume__options" role="group" aria-label="Об'єм ${esc(p.name)}">${[3, 5, 10, 20, 30].map((v) => `<button class="perfume__volume ${v === volume ? "is-active" : ""}" data-volume="${v}" type="button" aria-pressed="${v === volume}">${v} мл</button>`).join("")}</div><div class="perfume__bottom"><span class="perfume__price" aria-label="${money(p.prices[volume])}">${Number.isFinite(p.prices[volume]) ? `<span class="perfume__price-number">${new Intl.NumberFormat("uk-UA").format(p.prices[volume])}</span><span class="perfume__price-currency">грн</span>` : `<span class="perfume__price-pending">Ціну уточнюйте</span>`}</span><button class="perfume__add" type="button" aria-label="Додати до кошика" title="Додати до кошика" data-add="${p.id}"><svg class="perfume__cart-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1.25 12H5.25L4 8Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/></svg></button></div></div></article>`;
      })
      .join("");

    if (!filtered.length) catalog.innerHTML = '<p class="catalog__no-results">За вашим запитом ароматів не знайдено. Спробуйте іншу назву або ноту.</p>';
    moreButton.hidden = visibleCount >= filtered.length;
    moreButton.querySelector("span").textContent =
      "Показати ще " + Math.min(pageSize(), filtered.length - visibleCount);
  }
  drawCatalog();
  document.querySelector('#scent-search-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('#scent-search-input');
    searchTerm = input.value.trim().toLocaleLowerCase('uk-UA');
    visibleCount = pageSize();
    drawCatalog();
    document.querySelector('#scent-search-hint').textContent = searchTerm ? `Результати пошуку: «${input.value.trim()}»` : 'Всі аромати';
    document.querySelector('#catalog').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  document.querySelector('#scent-search-input')?.addEventListener('search', e => {
    if (e.target.value) return;
    searchTerm = ''; visibleCount = pageSize(); drawCatalog();
  });
  moreButton.addEventListener("click", () => {
    visibleCount = Math.min(visibleCount + pageSize(), products.filter(p => (p.name + " " + p.notes).toLocaleLowerCase("uk-UA").includes(searchTerm)).length);
    drawCatalog();
  });
  catalog.addEventListener("click", (e) => {
    const vol = e.target.closest("[data-volume]");
    if (vol) {
      const id = vol.closest("[data-id]").dataset.id;
      state.set(id, Number(vol.dataset.volume));
      drawCatalog();
      return;
    }
    const add = e.target.closest("[data-add]");
    if (!add) return;
    const id = add.dataset.add,
      volume = state.get(id) || 10,
      key = id + "-" + volume;
    cart.set(key, (cart.get(key) || 0) + 1);
    drawBag();
    notify("Аромат додано до кошика");
  });
  const bag = document.querySelector("#bag"),
    items = document.querySelector("#bag-items"),
    total = document.querySelector("#bag-total"),
    copy = document.querySelector("#bag-copy"),
    openButton = document.querySelector("[data-open-bag]");
  function openBag() {
    bag.classList.add("is-open");
    bag.setAttribute("aria-hidden", "false");
    document.body.classList.add("bag-open");
    bag.querySelector(".bag__close").focus();
  }
  function closeBag() {
    bag.classList.remove("is-open");
    bag.setAttribute("aria-hidden", "true");
    document.body.classList.remove("bag-open");
    openButton?.focus();
  }
  openButton?.addEventListener("click", openBag);
  bag
    .querySelectorAll("[data-close-bag]")
    .forEach((b) => b.addEventListener("click", closeBag));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && bag.classList.contains("is-open")) closeBag();
  });
  function cartRows() {
    return [...cart.entries()].map(([key, qty]) => {
      const [id, v] = key.split(/-(?=\d+$)/);
      const p = products.find((p) => p.id === id);
      return { key, p, volume: Number(v), qty, subtotal: Number.isFinite(p.prices[v]) ? p.prices[v] * qty : null };
    });
  }
  function drawBag() {
    const rows = cartRows();
    items.innerHTML = rows.length
      ? rows
          .map(
            ({ key, p, volume, qty, subtotal }) =>
              `<div class="bag__item" data-key="${key}"><div><div class="bag__item-name">${esc(p.name)}</div><div class="bag__item-meta">${volume} мл · ${Number.isFinite(p.prices[volume]) ? money(p.prices[volume]) : "Ціну уточнюйте"}</div><div class="bag__qty"><button type="button" data-qty="-1" aria-label="Зменшити кількість">−</button><span>${qty}</span><button type="button" data-qty="1" aria-label="Збільшити кількість">+</button></div></div><div><strong>${subtotal === null ? "За запитом" : money(subtotal)}</strong><p><button type="button" class="bag__remove" data-remove aria-label="Видалити аромат із кошика" title="Видалити"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></p></div></div>`,
          )
          .join("")
      : '<p class="bag__empty">Ваш кошик поки порожній.</p>';
    total.textContent = money(rows.reduce((s, r) => s + (r.subtotal ?? 0), 0));
    copy.disabled = !rows.length;
    const badge = document.querySelector('#header-bag-count');
    if (badge) {
      const count = rows.reduce((sum, row) => sum + row.qty, 0);
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.hidden = count === 0;
      badge.setAttribute('aria-label', `${count} товарів у кошику`);
    }
  }
  items.addEventListener("click", (e) => {
    const row = e.target.closest("[data-key]");
    if (!row) return;
    const key = row.dataset.key;
    if (e.target.closest("[data-remove]")) cart.delete(key);
    else {
      const q = e.target.closest("[data-qty]");
      if (!q) return;
      const next = (cart.get(key) || 0) + Number(q.dataset.qty);
      if (next <= 0) cart.delete(key);
      else cart.set(key, next);
    }
    drawBag();
  });
  // Set this to a secure server endpoint (for example, Cloudflare Worker).
  // Never place a Telegram bot token in browser JavaScript.
  const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbwvfWG4MOAfP1ZiSh-govALtosBl_f0imCuUd51cHtNLJzqraCPMxiisr_mpAopLTKD5A/exec";
  const checkout = document.querySelector("#checkout");
  const checkoutForm = document.querySelector("#checkout-form");
  const thanks = document.querySelector("#checkout-thanks");
  const checkoutError = document.querySelector("#checkout-error");
  const bagItems = document.querySelector("#bag-items");
  const bagBottom = document.querySelector(".bag__bottom");
  function checkoutView(view) {
    const isCart = view === "cart";
    bagItems.hidden = !isCart;
    bagBottom.hidden = !isCart;
    checkout.hidden = view !== "form";
    thanks.hidden = view !== "thanks";
    document.querySelector("#bag-heading").innerHTML = isCart ? "Мій <em>кошик</em>" : view === "form" ? "Оформлення <em>замовлення</em>" : "Ваше <em>замовлення</em>";
    document.querySelector(".bag__panel").scrollTop = 0;
  }
  copy.addEventListener("click", () => {
    if (!cartRows().length) return;
    checkoutView("form");
    document.querySelector("#checkout-name").focus();
  });
  document.querySelector("#checkout-back").addEventListener("click", () => checkoutView("cart"));
  document.querySelector("#checkout-finish").addEventListener("click", () => {
    checkoutView("cart");
    closeBag();
  });
  // Apps Script responses cannot be read with normal cross-origin fetch.
  // Poll an anonymous delivery receipt using JSONP; never send personal data in GET URLs.
  function checkOrderReceipt(requestId) {
    return new Promise((resolve) => {
      const callback = 'leOrderCallback_' + requestId.replace(/-/g, '_');
      const script = document.createElement('script');
      const timer = setTimeout(() => finish(false), 12000);
      let settled = false;
      function finish(ok) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        delete window[callback];
        script.remove();
        resolve(ok);
      }
      window[callback] = (result) => finish(result?.ok === true);
      script.onerror = () => finish(false);
      script.src = ORDER_ENDPOINT + '?id=' + encodeURIComponent(requestId) + '&callback=' + callback + '&t=' + Date.now();
      document.head.appendChild(script);
    });
  }
  async function waitForReceipt(requestId) {
    for (let attempt = 0; attempt < 5; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (await checkOrderReceipt(requestId)) return true;
    }
    return false;
  }
  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    checkoutError.hidden = true;
    const rows = cartRows();
    if (!rows.length) { checkoutView("cart"); return; }
    if (!ORDER_ENDPOINT) {
      checkoutError.textContent = "Форма готова, але приймання замовлень ще не підключено. Будь ласка, зв’яжіться з магазином за телефоном 066 722 56 42.";
      checkoutError.hidden = false;
      return;
    }
    const data = new FormData(checkoutForm);
    const payload = {
      requestId: crypto.randomUUID(),
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      city: String(data.get("city") || "").trim(),
      delivery: String(data.get("delivery") || "").trim(),
      comment: String(data.get("comment") || "").trim(),
      items: rows.map(r => ({name:r.p.name,volume:r.volume,quantity:r.qty,subtotal:r.subtotal})),
      total: total.textContent,
    };
    const submit = checkoutForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Надсилаємо…";
    try {
      // no-cors avoids a CORS preflight; an opaque response does NOT mean delivery succeeded.
      await fetch(ORDER_ENDPOINT, { method: "POST", mode: "no-cors", headers: {"Content-Type":"text/plain;charset=UTF-8"}, body: JSON.stringify(payload) });
      if (!await waitForReceipt(payload.requestId)) throw new Error("Немає підтвердження від Telegram");
      cart.clear();
      drawBag();
      checkoutForm.reset();
      checkoutView("thanks");
    } catch {
      checkoutError.textContent = "Не вдалося підтвердити доставку замовлення в Telegram. Не надсилайте його повторно одразу: перевірте з менеджером за номером 066 722 56 42, чи воно надійшло.";
      checkoutError.hidden = false;
    } finally {
      submit.disabled = false;
      submit.textContent = "Підтвердити замовлення";
    }
  });
  drawBag();
})();


// About: reveal elements only when entering viewport, respect reduced motion.
(() => {
  const section = document.querySelector('.about-rose');
  if (!section || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elements = section.querySelectorAll('[data-about-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px 30px 0px' });
  elements.forEach(el => observer.observe(el));
  section.classList.add('is-observed');
})();


// Reviews carousel: five overlapping phones on desktop, one centered with peeking neighbors on mobile.
(() => {
  'use strict';
  const stage = document.querySelector('#reviews-phones');
  if (!stage) return;
  const counter = document.querySelector('#reviews-counter');
  const reviews = [
    {name:'Марія',date:'12 жовтня',text:'Довго шукала аромат, який буде саме моїм. Взяла маленький об’єм для знайомства — і тепер не уявляю без нього свого ранку.',scent:'Chanel Chance Tendre'},
    {name:'Анастасія',date:'18 жовтня',text:'Так подобається можливість спробувати парфуми перед тим, як обрати більший об’єм. Мій новий фаворит — ніжний, жіночний і дуже особливий.',scent:'Dior J’adore'},
    {name:'Софія',date:'22 жовтня',text:'Для мене аромат — це настрій. Тут хочеться відкривати нові ноти й експериментувати. Уже маю декілька улюблених композицій.',scent:'YSL Libre'},
    {name:'Олена',date:'27 жовтня',text:'Маленький флакон ідеально поміщається в сумочку. Тепер улюблений аромат завжди зі мною, навіть у найнасиченіші дні.',scent:'Gucci Bloom'},
    {name:'Катерина',date:'2 листопада',text:'Люблю ці миті, коли один аромат нагадує про щось дуже тепле. Саме такою стала моя нова парфумерна знахідка.',scent:'Lancôme La Vie Est Belle'},
    {name:'Вікторія',date:'6 листопада',text:'Дуже красивий спосіб знайомитися з різними ароматами. Почала з 5 мл, а потім зрозуміла, який хочу носити щодня.',scent:'Versace Bright Crystal'},
    {name:'Дарина',date:'10 листопада',text:'Обожнюю змінювати аромати під настрій. Один — для затишного вечора, інший — для особливих зустрічей. Це справжнє задоволення.',scent:'Armani Sì'}
  ];
  const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let current = 0;
  const phone = (r,i) => `<article class="reviews__phone" data-review="${i}" aria-label="Приклад відгуку ${i+1} з ${reviews.length}"><div class="reviews__device"><div class="reviews__island" aria-hidden="true"></div><div class="reviews__screen"><div class="reviews__appbar"><span class="reviews__appback">‹</span><span>LE.PERFUMES.UA</span><span class="reviews__appdots">···</span></div><div class="reviews__chat"><span class="reviews__date">${escape(r.date)}</span><div class="reviews__bubble"><div class="reviews__stars" aria-label="5 з 5 зірок">★★★★★</div><p>${escape(r.text)}</p><span class="reviews__bubble-time">12:45 <span>✓✓</span></span></div><div class="reviews__reply">Дякуємо за теплі слова! ♡<span>12:47 <span>✓✓</span></span></div></div><div class="reviews__input" aria-hidden="true"><span>Повідомлення</span><span>♡</span></div></div><div class="reviews__homebar" aria-hidden="true"></div></div></article>`;
  stage.innerHTML = reviews.map(phone).join('');
  const cards = [...stage.children];
  function render() {
    cards.forEach((card,i) => {
      let offset = (i-current+reviews.length)%reviews.length;
      if(offset>Math.floor(reviews.length/2)) offset-=reviews.length;
      const visible = Math.abs(offset)<=2;
      card.dataset.offset=String(offset);
      card.classList.toggle('is-hidden',!visible);
      card.setAttribute('aria-hidden', String(!visible || offset!==0));
      card.style.zIndex=String(10-Math.abs(offset));
      card.inert = offset!==0;
    });
    counter.textContent=String(current+1).padStart(2,'0')+' / '+String(reviews.length).padStart(2,'0');
  }
  const move=delta=>{current=(current+delta+reviews.length)%reviews.length;render();};
  document.querySelector('#reviews-prev').addEventListener('click',()=>move(-1));
  document.querySelector('#reviews-next').addEventListener('click',()=>move(1));
  let startX=null;
  stage.addEventListener('touchstart',e=>{startX=e.touches[0]?.clientX??null;},{passive:true});
  stage.addEventListener('touchend',e=>{if(startX===null)return;const diff=e.changedTouches[0].clientX-startX;if(Math.abs(diff)>45)move(diff<0?1:-1);startX=null;},{passive:true});
  stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);});
  render();
})();

// Copyright year in footer.
const footerYear = document.querySelector("#footer-year");
if (footerYear) footerYear.textContent = String(new Date().getFullYear());
