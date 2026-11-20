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

// Catalog: current perfume assortment.
(() => {
  "use strict";
  const catalog = document.querySelector("#catalog-grid");
  if (!catalog) return;
  // Реальний асортимент із наданого списку. Ціни, ноти та фото ще не надані.
  const products = [
    {
      id: "ar-01",
      name: "Afnan — Delicious Bouquet",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "цитрус · карамель · ваніль",
      image: "img/AfnanDeliciousBouquet.jpg",
      prices: {},
      description:
        "Теплий гурманський аромат із соковитим цитрусовим початком, ніжними квітами й солодкою карамельно-ванільною базою.",
    },
    {
      id: "ar-02",
      name: "Afnan — Theorème Pour Homme",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "цитрус · прянощі · деревина",
      image: "img/AfnanTheorèmePourHomme.webp",
      prices: {},
      description:
        "Свіжа цитрусова композиція з пряними відтінками та чистим деревним шлейфом.",
    },
    {
      id: "ar-03",
      name: "Amouage — Guidance",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "груша · ладан · сандал",
      image: "img/AmouageGuidance.webp",
      prices: {},
      description:
        "М’яка, обволікальна композиція, де фруктова ніжність переходить у квітково-деревне тепло.",
    },
    {
      id: "ar-04",
      name: "Antonio Banderas — Blue Seduction",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "диня · морські акорди · мускус",
      image: "img/AntonioBanderasBlueSeduction.webp",
      prices: {},
      description:
        "Легкий, свіжий аромат із фруктово-водяним характером для невимушених щоденних образів.",
    },
    {
      id: "ar-05",
      name: "Armaf — Club de Nuit",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "цитрус · деревина · мускус",
      image: "img/ArmafClubdeNuit.webp",
      prices: {},
      description:
        "Виразний аромат із яскравим свіжим стартом і насиченою деревною основою; конкретну версію Club de Nuit варто уточнити.",
    },
    {
      id: "ar-06",
      name: "Burberry — Burberry Her Eau de Parfum",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "червоні ягоди · жасмин · амбра",
      image: "img/BurberryBurberryHerEaudeParfum.webp",
      prices: {},
      description:
        "Соковита ягідна солодкість зустрічається з ніжними квітами та м’якою амбровою базою.",
    },
    {
      id: "ar-07",
      name: "Clinique — Happy",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "цитрус · квіти · мускус",
      image: "img/CliniqueHappy.webp",
      prices: {},
      description:
        "Сонячний, життєрадісний аромат із іскристими цитрусами та легким квітковим звучанням.",
    },
    {
      id: "ar-08",
      name: "Dolce & Gabbana — Devotion",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "зацукрований лимон · флердоранж · ваніль",
      image: "img/Dolce&GabbanaDevotion.webp",
      prices: {},
      description:
        "Десертна цитрусова солодкість поєднується з білими квітами та затишною ваніллю.",
    },
    {
      id: "ar-09",
      name: "Dolce & Gabbana — The Only One",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "кава · фіалка · ваніль",
      image: "img/Dolce&GabbanaTheOnlyOne.webp",
      prices: {},
      description:
        "Елегантний квітково-гурманський аромат із кавовим акцентом і теплим солодким шлейфом.",
    },
    {
      id: "ar-10",
      name: "Escada — Sorbetto Rosso",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "кавун · морська свіжість · фрукти",
      image: "img/EscadaSorbettoRosso.webp",
      prices: {},
      description:
        "Безтурботний літній аромат, натхненний соковитими фруктами й морським бризом.",
    },
    {
      id: "ar-11",
      name: "Escentric Molecules — Escentric 01",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "Iso E Super · рожевий перець · лайм",
      image: "img/EscentricMoleculesEscentric01.webp",
      prices: {},
      description:
        "Прозора деревна композиція з м’якою пряністю та повітряною сучасною базою.",
    },
    {
      id: "ar-12",
      name: "Escentric Molecules — Escentric 02",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "амброксан · цитрус · мускус",
      image: "img/EscentricMoleculesEscentric02.webp",
      prices: {},
      description:
        "Мінеральна свіжість і теплий амбровий акорд створюють лаконічний, чистий характер.",
    },
    {
      id: "ar-13",
      name: "Escentric Molecules — Molecule 01 + Mandarin",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "мандарин · Iso E Super · деревина",
      image: "img/EscentricMoleculesMolecule01Mandarin.webp",
      prices: {},
      description:
        "Іскристий мандарин звучить на тлі оксамитової молекулярної деревини.",
    },
    {
      id: "ar-14",
      name: "Essential Parfums — Ambre Latte",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "амбра · молочна ніжність · ваніль",
      image: "img/EssentialParfumsAmbreLatte.webp",
      prices: {},
      description:
        "М’який, кремовий гурманський настрій з амбровим теплом; назву та точні ноти варто звірити з флаконом.",
    },
    {
      id: "ar-15",
      name: "Essential Parfums — Bois Impérial",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "базилік · ветивер · деревина",
      image: "img/EssentialParfumsBoisImpérial.webp",
      prices: {},
      description:
        "Зелений, пряно-деревний аромат із характерною сухою свіжістю та виразним шлейфом.",
    },
    {
      id: "ar-16",
      name: "Franck Olivier — Pure Addiction",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "шафран · жасмин · амбра",
      image: "img/FranckOlivierPureAddiction.webp",
      prices: {},
      description:
        "Насичена східна композиція з теплою амброю та м’якими квітковими відтінками.",
    },
    {
      id: "ar-17",
      name: "Giorgio Armani — My Way",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "апельсиновий цвіт · тубероза · ваніль",
      image: "img/GiorgioArmaniMyWay.webp",
      prices: {},
      description:
        "Світлий квітковий букет із ніжною вершковою базою та відчуттям витонченої жіночності.",
    },
    {
      id: "ar-18",
      name: "Gritti — Pomelo Sorrento",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "помело · зелень · деревина",
      image: "img/GrittiPomeloSorrento.webp",
      prices: {},
      description:
        "Іскристий цитрусовий аромат із соковитим помело й чистою зеленою свіжістю.",
    },
    {
      id: "ar-19",
      name: "Guerlain — La Petite Robe Noire",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "вишня · троянда · мигдаль",
      image: "img/GuerlainLaPetiteRobeNoire.webp",
      prices: {},
      description:
        "Грайлива фруктово-квіткова композиція з солодкуватим, елегантним характером.",
    },
    {
      id: "ar-20",
      name: "Hormone Paris — This Is Not Gaba",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "маракуя · мандарин · жасмин",
      image: "img/HormoneParisThisIsNotGaba.webp",
      prices: {},
      description:
        "Тропічно-цитрусовий початок переходить у ніжні квіти та спокійну амброво-мохову базу.",
    },
    {
      id: "ar-21",
      name: "Initio Parfums Privés — Power Self",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "квіти · мускус · деревина",
      image: "img/InitioParfumsPrivésPowerSelf.webp",
      prices: {},
      description:
        "Сучасна композиція з м’яким квітковим настроєм і чистим обволікальним шлейфом.",
    },
    {
      id: "ar-22",
      name: "Jean Paul Gaultier — Le Beau Paradise Garden",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "зелень · кокос · деревина",
      image: "img/JeanPaulGaultierLeBeauParadiseGarden.webp",
      prices: {},
      description:
        "Соковита тропічна свіжість із зеленими відтінками та м’якою деревною глибиною.",
    },
    {
      id: "ar-23",
      name: "Jean Paul Gaultier — Le Male Elixir",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "лаванда · ваніль · бензоїн",
      image: "img/JeanPaulGaultierLeMaleElixir.webp",
      prices: {},
      description:
        "Інтенсивний, теплий аромат із пряною солодкістю та впізнаваним лавандовим акцентом.",
    },
    {
      id: "ar-24",
      name: "Jean Paul Gaultier — Scandal",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "мед · гарденія · пачулі",
      image: "img/JeanPaulGaultierScandal.webp",
      prices: {},
      description:
        "Смілива квіткова солодкість із медовим сяйвом та глибоким теплим шлейфом.",
    },
    {
      id: "ar-25",
      name: "Jimmy Choo — Blossom",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "червоні ягоди · троянда · мускус",
      image: "img/JimmyChooBlossom.webp",
      prices: {},
      description:
        "Легкий і грайливий фруктово-квітковий аромат для яскравого настрою.",
    },
    {
      id: "ar-26",
      name: "Juliette Has a Gun — Mmmm...",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "малина · ваніль · сандал",
      image: "img/JulietteHasaGunMmmm....webp",
      prices: {},
      description:
        "Апетитна ягідна солодкість переплітається з кремовими квітами й теплою деревиною.",
    },
    {
      id: "ar-27",
      name: "Kajal — Almaz",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "фрукти · квіти · мускус",
      image: "img/KajalAlmaz.webp",
      prices: {},
      description:
        "Сяйлива фруктово-квіткова композиція з м’якою солодкістю та витонченим шлейфом.",
    },
    {
      id: "ar-28",
      name: "Kajal — Topaz",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "теплі прянощі · амбра · деревина",
      image: "img/KajalTopaz.webp",
      prices: {},
      description:
        "Насичений пряно-амбровий характер із затишним, багатошаровим звучанням.",
    },
    {
      id: "ar-29",
      name: "Karl Lagerfeld — Fleur de Pêcher",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "персик · квіти · мускус",
      image: "img/KarlLagerfeldFleurdePêcher.webp",
      prices: {},
      description:
        "Делікатний квітково-фруктовий аромат із соковитим персиковим настроєм.",
    },
    {
      id: "ar-30",
      name: "Lancôme — Idôle",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "троянда · жасмин · білий мускус",
      image: "img/LancômeIdôle.webp",
      prices: {},
      description:
        "Чистий, світлий квітковий аромат із ніжною трояндою та прозорим мускусним шлейфом.",
    },
    {
      id: "ar-31",
      name: "Lattafa — Atheeri",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "білі квіти · ваніль · деревина",
      image: "img/LattafaAtheeri.webp",
      prices: {},
      description:
        "Повітряна квіткова композиція з ніжним солодкуватим завершенням.",
    },
    {
      id: "ar-32",
      name: "Lattafa — Angham",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "імбир · ваніль · лаванда",
      image: "img/LattafaAngham.webp",
      prices: {},
      description:
        "Затишний пряно-ванільний аромат із сучасним, м’яким квітковим відтінком.",
    },
    {
      id: "ar-33",
      name: "Lattafa — Khamrah",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "кориця · фініки · праліне",
      image: "img/LattafaKhamrah.webp",
      prices: {},
      description:
        "Густий східний гурманський аромат із пряною солодкістю та теплою деревною базою.",
    },
    {
      id: "ar-34",
      name: "Lattafa — Teriaq",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "карамель · спеції · шкіра",
      image: "img/LattafaTeriaq.webp",
      prices: {},
      description:
        "Сміливий, солодко-пряний аромат із виразною теплою глибиною.",
    },
    {
      id: "ar-35",
      name: "Lattafa — Teriaq Intense",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "слива · кориця · амбра",
      image: "img/LattafaTeriaqIntense.webp",
      prices: {},
      description:
        "Інтенсивна фруктово-пряна композиція з насиченим, оксамитовим шлейфом.",
    },
    {
      id: "ar-36",
      name: "Marc-Antoine Barrois — Aldebaran",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "тубероза · білі квіти · мускус",
      image: "img/MarcAntoineBarroisAldebaran.webp",
      prices: {},
      description:
        "Світла, об’ємна квіткова композиція з кремовим характером і делікатною глибиною.",
    },
    {
      id: "ar-37",
      name: "Marc-Antoine Barrois — Ganymede",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "мандарин · замша · мінеральні акорди",
      image: "img/MarcAntoineBarroisGanymede.webp",
      prices: {},
      description:
        "Незвичайний деревно-мінеральний аромат із витонченими шкіряними відтінками.",
    },
    {
      id: "ar-38",
      name: "Marc-Antoine Barrois — Tilia",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "липовий цвіт · жасмин · мускус",
      image: "img/MarcAntoineBarroisTilia.webp",
      prices: {},
      description:
        "Сонячний квітковий аромат із медовою ніжністю та відчуттям теплого літа.",
    },
    {
      id: "ar-39",
      name: "Montale — Crystal Flowers",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "троянда · мандарин · мускус",
      image: "img/MontaleCrystalFlowers.webp",
      prices: {},
      description:
        "Прозора квіткова композиція з чистим, свіжим і делікатно солодким настроєм.",
    },
    {
      id: "ar-40",
      name: "Montblanc — Legend Spirit",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "грейпфрут · лаванда · білий мускус",
      image: "img/MontblancLegendSpirit.webp",
      prices: {},
      description:
        "Спортивна цитрусова свіжість із чистими ароматичними та деревними акордами.",
    },
    {
      id: "ar-41",
      name: "Montblanc — Signature",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "клементин · ваніль · мускус",
      image: "img/MontblancSignature.webp",
      prices: {},
      description:
        "Ніжний кремово-цитрусовий аромат із м’якою ванільною основою.",
    },
    {
      id: "ar-42",
      name: "Moschino — Gold Fresh Couture",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "груша · манго · жасмин",
      image: "img/MoschinoGoldFreshCouture.webp",
      prices: {},
      description:
        "Яскравий фруктово-квітковий аромат із соковитим і святковим характером.",
    },
    {
      id: "ar-43",
      name: "Moschino — Pink Bouquet",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "грейпфрут · квіти · деревина",
      image: "img/MoschinoPinkBouquet.webp",
      prices: {},
      description: "Грайлива квітково-фруктова композиція з легкою солодкістю.",
    },
    {
      id: "ar-44",
      name: "Moschino — Toy 2",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "яблуко · півонія · мускус",
      image: "img/MoschinoToy2.webp",
      prices: {},
      description:
        "Чистий, ніжний квітково-фруктовий аромат із прозорим мускусним шлейфом.",
    },
    {
      id: "ar-45",
      name: "Narciso Rodriguez — For Her",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "мускус · троянда · пачулі",
      image: "img/NarcisoRodriguezForHer.webp",
      prices: {},
      description:
        "Витончена мускусна композиція з квітковою м’якістю та теплою глибиною.",
    },
    {
      id: "ar-46",
      name: "Paco Rabanne — Fame",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "манго · жасмин · сандал",
      image: "img/PacoRabanneFame.webp",
      prices: {},
      description:
        "Сяйлива фруктово-квіткова композиція з ніжною деревною основою.",
    },
    {
      id: "ar-47",
      name: "Paco Rabanne — Olympea",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "солона ваніль · жасмин · амбра",
      image: "img/PacoRabanneOlympea.webp",
      prices: {},
      description:
        "Теплий, сонячний аромат із квітковими акцентами та солонувато-ванільним шлейфом.",
    },
    {
      id: "ar-48",
      name: "Paco Rabanne — One Million Black",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "прянощі · деревина · амбра",
      image: "img/PacoRabanneOneMillionBlack.webp",
      prices: {},
      description:
        "Насичений чоловічий характер із теплою пряністю; точну версію One Million Black потрібно уточнити.",
    },
    {
      id: "ar-49",
      name: "Parfums de Marly — Delina",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "турецька троянда · лічі · ваніль",
      image: "img/ParfumsdeMarlyDelina.webp",
      prices: {},
      description:
        "Розкішний трояндовий аромат із соковитою фруктовою ніжністю.",
    },
    {
      id: "ar-50",
      name: "Parfums de Marly — Delina La Rosée",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "троянда · лічі · півонія",
      image: "img/ParfumsdeMarlyDelinaLaRosée.webp",
      prices: {},
      description:
        "Свіжа, прозора версія трояндової елегантності з легким фруктовим звучанням.",
    },
    {
      id: "ar-51",
      name: "Pepe Jeans — For Her",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "зефірна солодкість · квіти · мускус",
      image: "img/PepeJeansForHer.webp",
      prices: {},
      description: "Ніжний жіночний аромат із грайливим солодким характером.",
    },
    {
      id: "ar-52",
      name: "Rochas — Audace",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "малина · троянда · сандал",
      image: "img/RochasAudace.webp",
      prices: {},
      description:
        "Смілива квітково-фруктова композиція з теплою мускусною базою.",
    },
    {
      id: "ar-53",
      name: "The Gate Paris — First Sight",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "цитрус · м’ята · груша",
      image: "img/TheGateParisFirstSight.webp",
      prices: {},
      description:
        "Свіжий зелено-цитрусовий аромат із ніжним квітковим серцем і кедрово-мускусною базою.",
    },
    {
      id: "ar-54",
      name: "Thomas Kosmala — Elixir de Parfum",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "амброві акорди · спеції · деревина",
      image: "img/ThomasKosmalaElixirdeParfum.webp",
      prices: {},
      description:
        "Глибокий теплий аромат із пряною виразністю та елегантним шлейфом.",
    },
    {
      id: "ar-55",
      name: "Tiziana Terenzi — Cassiopea",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "маракуя · персик · мускус",
      image: "img/TizianaTerenziCassiopea.webp",
      prices: {},
      description:
        "Яскравий фруктовий аромат із м’якими квітковими та деревними відтінками.",
    },
    {
      id: "ar-56",
      name: "Trussardi — My Land",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "цитрус · лаванда · деревина",
      image: "img/TrussardiMyLand.webp",
      prices: {},
      description: "Свіжий чоловічий аромат із чистими пряно-деревними нотами.",
    },
    {
      id: "ar-57",
      name: "Trussardi — New Feminine",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "мандарин · неролі · фіалка",
      image: "img/TrussardiNewFeminine.webp",
      prices: {},
      description:
        "Сучасна квіткова композиція з цитрусовою свіжістю, жасмином і м’яким шлейфом.",
    },
    {
      id: "ar-58",
      name: "Trussardi — Pure Jasmine",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "жасмин · білі квіти · пачулі",
      image: "img/TrussardiPureJasmine.webp",
      prices: {},
      description:
        "Елегантний квітковий аромат із насиченою, але м’якою базою.",
    },
    {
      id: "ar-59",
      name: "Valentino — Donna Born in Roma",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "чорна смородина · жасмин · ваніль",
      image: "img/ValentinoDonnaBorninRoma.webp",
      prices: {},
      description:
        "Яскрава фруктово-квіткова композиція з теплим солодкуватим завершенням.",
    },
    {
      id: "ar-60",
      name: "Van Cleef & Arpels — Neroli Amara",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "неролі · цитрус · мускус",
      image: "img/VanCleef&ArpelsNeroliAmara.webp",
      prices: {},
      description:
        "Витончений цитрусово-квітковий аромат із сонячним середземноморським настроєм.",
    },
    {
      id: "ar-61",
      name: "Versace — Bright Crystal Eau de Toilette",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "юзу · півонія · мускус",
      image: "img/VersaceBrightCrystalEaudeToilette.webp",
      prices: {},
      description:
        "Легка, кришталево-свіжа композиція з ніжними квітами й чистим шлейфом.",
    },
    {
      id: "ar-62",
      name: "Versace — Bright Crystal Parfum",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "фрукти · півонія · деревина",
      image: "img/VersaceBrightCrystalParfum.webp",
      prices: {},
      description:
        "Насиченіша квітково-фруктова інтерпретація з м’якою елегантною глибиною.",
    },
    {
      id: "ar-63",
      name: "Versace — Eau Fraîche",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "лимон · карамбола · кедр",
      image: "img/VersaceEauFraîche.webp",
      prices: {},
      description:
        "Свіжий водяно-цитрусовий аромат із прохолодними деревними відтінками.",
    },
    {
      id: "ar-64",
      name: "Versace — Versense",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "бергамот · інжир · кедр",
      image: "img/VersaceVersense.webp",
      prices: {},
      description:
        "Зелена середземноморська свіжість із делікатною деревною основою.",
    },
    {
      id: "ar-65",
      name: "Zadig & Voltaire — This Is Her!",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "каштан · ваніль · сандал",
      image: "img/Zadig&VoltaireThisIsHer!.webp",
      prices: {},
      description:
        "Затишний кремово-деревний аромат із ніжною гурманською теплотою.",
    },
    {
      id: "ar-66",
      name: "Zadig & Voltaire — Zadig",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "квіти · мускус · деревина",
      image: "img/Zadig&VoltaireZadig.webp",
      prices: {},
      description:
        "Сучасний аромат із чистим, виразним і мінімалістичним звучанням.",
    },
    {
      id: "ar-67",
      name: "Zarkoperfume — Pink Molecule",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "рожевий шампанський · бузина · деревина",
      image: "img/ZarkoperfumePinkMolecule.webp",
      prices: {},
      description:
        "Іскристий фруктово-квітковий аромат із прозорим молекулярним характером.",
    },
    {
      id: "ar-68",
      name: "Zarkoperfume — The Muse",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "білий мускус · чисті акорди · деревина",
      image: "img/ZarkoperfumeTheMuse.webp",
      prices: {},
      description:
        "Делікатна композиція, що нагадує свіжу тканину та чистоту після душу.",
    },
    {
      id: "ar-69",
      name: "Zarkoperfume — Youth",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "фрукти · квіти · мускус",
      image: "img/ZarkoperfumeYouth.webp",
      prices: {},
      description:
        "Легкий молодіжний аромат із соковитою солодкістю та чистим шлейфом.",
    },
    {
      id: "ar-70",
      name: "Zimaya — Mazaaj",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "карамель · перець · амбра",
      image: "img/ZimayaMazaaj.webp",
      prices: {},
      description:
        "Тепла пряно-амброва композиція з карамеллю, корицею та деревними акцентами.",
    },
    {
      id: "ar-71",
      name: "Zimaya — Tiramisu Caramel",
      type: "ПАРФУМЕРІЯ НА РОЗПИВ",
      notes: "карамель · мед · ваніль",
      image: "img/ZimayaTiramisuCaramel.webp",
      prices: {},
      description:
        "Гурманський аромат із насиченою карамеллю, медовим серцем і теплою ванільно-мускусною базою.",
    },
  ];
  let searchTerm = "";
  const state = new Map();
  const cart = new Map();
  const money = (n) =>
    Number.isFinite(n)
      ? new Intl.NumberFormat("uk-UA").format(n) + " грн"
      : "Ціну уточнюйте";
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
    const filtered = products.filter((p) =>
      (p.name + " " + p.notes + " " + p.description)
        .toLocaleLowerCase("uk-UA")
        .includes(searchTerm),
    );
    catalog.innerHTML = filtered
      .slice(0, visibleCount)
      .map((p, i) => {
        const volume = state.get(p.id) || 10;
        const image = p.image
          ? `<img class="perfume__photo" src="${esc(p.image)}" alt="Флакон ${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.hidden=true;this.nextElementSibling.hidden=false"><div class="perfume__placeholder" hidden><span class="perfume__placeholder-mark">LE.</span><span class="perfume__placeholder-label">THE ART OF FRAGRANCE</span></div>`
          : `<div class="perfume__placeholder"><span class="perfume__placeholder-mark">LE.</span><span class="perfume__placeholder-label">THE ART OF FRAGRANCE</span></div>`;
        return `<article class="perfume" data-id="${p.id}"><div class="perfume__media">${image}<span class="perfume__branding" aria-hidden="true"><img src="img/logo.png" alt=""></span><span class="perfume__number">${String(i + 1).padStart(2, "0")} / LE</span><span class="perfume__tag">EAU DE PARFUM</span></div><div class="perfume__details"><p class="perfume__type">${esc(p.type)}</p><h3 class="perfume__name">${esc(p.name)}</h3>${p.notes ? `<p class="perfume__notes">${esc(p.notes)}</p>` : ""}<p class="perfume__description">${esc(p.description)}</p><div class="perfume__options" role="group" aria-label="Об'єм ${esc(p.name)}">${[3, 5, 10, 20, 30].map((v) => `<button class="perfume__volume ${v === volume ? "is-active" : ""}" data-volume="${v}" type="button" aria-pressed="${v === volume}">${v} мл</button>`).join("")}</div><div class="perfume__bottom"><span class="perfume__price" aria-label="${money(p.prices[volume])}">${Number.isFinite(p.prices[volume]) ? `<span class="perfume__price-number">${new Intl.NumberFormat("uk-UA").format(p.prices[volume])}</span><span class="perfume__price-currency">грн</span>` : `<span class="perfume__price-pending">Ціну уточнюйте</span>`}</span><button class="perfume__add" type="button" aria-label="Додати до кошика" title="Додати до кошика" data-add="${p.id}"><svg class="perfume__cart-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1.25 12H5.25L4 8Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/></svg></button></div></div></article>`;
      })
      .join("");

    if (!filtered.length)
      catalog.innerHTML =
        '<p class="catalog__no-results">За вашим запитом ароматів не знайдено. Спробуйте іншу назву або ноту.</p>';
    moreButton.hidden = visibleCount >= filtered.length;
    moreButton.querySelector("span").textContent =
      "Показати ще " + Math.min(pageSize(), filtered.length - visibleCount);
  }
  drawCatalog();
  document
    .querySelector("#scent-search-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#scent-search-input");
      searchTerm = input.value.trim().toLocaleLowerCase("uk-UA");
      visibleCount = pageSize();
      drawCatalog();
      document.querySelector("#scent-search-hint").textContent = searchTerm
        ? `Результати пошуку: «${input.value.trim()}»`
        : "Всі аромати";
      document.querySelector("#catalog").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  document
    .querySelector("#scent-search-input")
    ?.addEventListener("search", (e) => {
      if (e.target.value) return;
      searchTerm = "";
      visibleCount = pageSize();
      drawCatalog();
    });
  moreButton.addEventListener("click", () => {
    visibleCount = Math.min(
      visibleCount + pageSize(),
      products.filter((p) =>
        (p.name + " " + p.notes + " " + p.description)
          .toLocaleLowerCase("uk-UA")
          .includes(searchTerm),
      ).length,
    );
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
      return {
        key,
        p,
        volume: Number(v),
        qty,
        subtotal: Number.isFinite(p.prices[v]) ? p.prices[v] * qty : null,
      };
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
    total.textContent = rows.some((r) => r.subtotal === null)
      ? "Ціну уточнюйте"
      : money(rows.reduce((s, r) => s + (r.subtotal ?? 0), 0));
    copy.disabled = !rows.length;
    const badge = document.querySelector("#header-bag-count");
    if (badge) {
      const count = rows.reduce((sum, row) => sum + row.qty, 0);
      badge.textContent = count > 99 ? "99+" : String(count);
      badge.hidden = count === 0;
      badge.setAttribute("aria-label", `${count} товарів у кошику`);
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
  const ORDER_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwvfWG4MOAfP1ZiSh-govALtosBl_f0imCuUd51cHtNLJzqraCPMxiisr_mpAopLTKD5A/exec";
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
    document.querySelector("#bag-heading").innerHTML = isCart
      ? "Мій <em>кошик</em>"
      : view === "form"
        ? "Оформлення <em>замовлення</em>"
        : "Ваше <em>замовлення</em>";
    document.querySelector(".bag__panel").scrollTop = 0;
  }
  copy.addEventListener("click", () => {
    if (!cartRows().length) return;
    checkoutView("form");
    document.querySelector("#checkout-name").focus();
  });
  document
    .querySelector("#checkout-back")
    .addEventListener("click", () => checkoutView("cart"));
  document.querySelector("#checkout-finish").addEventListener("click", () => {
    checkoutView("cart");
    closeBag();
  });
  // Apps Script responses cannot be read with normal cross-origin fetch.
  // Poll an anonymous delivery receipt using JSONP; never send personal data in GET URLs.
  function checkOrderReceipt(requestId) {
    return new Promise((resolve) => {
      const callback = "leOrderCallback_" + requestId.replace(/-/g, "_");
      const script = document.createElement("script");
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
      script.src =
        ORDER_ENDPOINT +
        "?id=" +
        encodeURIComponent(requestId) +
        "&callback=" +
        callback +
        "&t=" +
        Date.now();
      document.head.appendChild(script);
    });
  }
  async function waitForReceipt(requestId) {
    for (let attempt = 0; attempt < 5; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (await checkOrderReceipt(requestId)) return true;
    }
    return false;
  }
  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    checkoutError.hidden = true;
    const rows = cartRows();
    if (!rows.length) {
      checkoutView("cart");
      return;
    }
    if (!ORDER_ENDPOINT) {
      checkoutError.textContent =
        "Форма готова, але приймання замовлень ще не підключено. Будь ласка, зв’яжіться з магазином за телефоном 066 722 56 42.";
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
      items: rows.map((r) => ({
        name: r.p.name,
        volume: r.volume,
        quantity: r.qty,
        subtotal: r.subtotal,
      })),
      total: total.textContent,
    };
    const submit = checkoutForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Надсилаємо…";
    try {
      // no-cors avoids a CORS preflight; an opaque response does NOT mean delivery succeeded.
      await fetch(ORDER_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload),
      });
      if (!(await waitForReceipt(payload.requestId)))
        throw new Error("Немає підтвердження від Telegram");
      cart.clear();
      drawBag();
      checkoutForm.reset();
      checkoutView("thanks");
    } catch {
      checkoutError.textContent =
        "Не вдалося підтвердити доставку замовлення в Telegram. Не надсилайте його повторно одразу: перевірте з менеджером за номером 066 722 56 42, чи воно надійшло.";
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
  const section = document.querySelector(".about-rose");
  if (
    !section ||
    !("IntersectionObserver" in window) ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const elements = section.querySelectorAll("[data-about-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px 30px 0px" },
  );
  elements.forEach((el) => observer.observe(el));
  section.classList.add("is-observed");
})();

// Reviews carousel: five overlapping phones on desktop, one centered with peeking neighbors on mobile.
(() => {
  "use strict";
  const stage = document.querySelector("#reviews-phones");
  if (!stage) return;
  const counter = document.querySelector("#reviews-counter");
  const reviews = [
    {
      name: "Марія",
      date: "12 жовтня",
      text: "Довго шукала аромат, який буде саме моїм. Взяла маленький об’єм для знайомства — і тепер не уявляю без нього свого ранку.",
      scent: "Chanel Chance Tendre",
    },
    {
      name: "Анастасія",
      date: "18 жовтня",
      text: "Так подобається можливість спробувати парфуми перед тим, як обрати більший об’єм. Мій новий фаворит — ніжний, жіночний і дуже особливий.",
      scent: "Dior J’adore",
    },
    {
      name: "Софія",
      date: "22 жовтня",
      text: "Для мене аромат — це настрій. Тут хочеться відкривати нові ноти й експериментувати. Уже маю декілька улюблених композицій.",
      scent: "YSL Libre",
    },
    {
      name: "Олена",
      date: "27 жовтня",
      text: "Маленький флакон ідеально поміщається в сумочку. Тепер улюблений аромат завжди зі мною, навіть у найнасиченіші дні.",
      scent: "Gucci Bloom",
    },
    {
      name: "Катерина",
      date: "2 листопада",
      text: "Люблю ці миті, коли один аромат нагадує про щось дуже тепле. Саме такою стала моя нова парфумерна знахідка.",
      scent: "Lancôme La Vie Est Belle",
    },
    {
      name: "Вікторія",
      date: "6 листопада",
      text: "Дуже красивий спосіб знайомитися з різними ароматами. Почала з 5 мл, а потім зрозуміла, який хочу носити щодня.",
      scent: "Versace Bright Crystal",
    },
    {
      name: "Дарина",
      date: "10 листопада",
      text: "Обожнюю змінювати аромати під настрій. Один — для затишного вечора, інший — для особливих зустрічей. Це справжнє задоволення.",
      scent: "Armani Sì",
    },
  ];
  const escape = (s) =>
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
  let current = 0;
  const phone = (r, i) =>
    `<article class="reviews__phone" data-review="${i}" aria-label="Приклад відгуку ${i + 1} з ${reviews.length}"><div class="reviews__device"><div class="reviews__island" aria-hidden="true"></div><div class="reviews__screen"><div class="reviews__appbar"><span class="reviews__appback">‹</span><span>LE.PERFUMES.UA</span><span class="reviews__appdots">···</span></div><div class="reviews__chat"><span class="reviews__date">${escape(r.date)}</span><div class="reviews__bubble"><div class="reviews__stars" aria-label="5 з 5 зірок">★★★★★</div><p>${escape(r.text)}</p><span class="reviews__bubble-time">12:45 <span>✓✓</span></span></div><div class="reviews__reply">Дякуємо за теплі слова! ♡<span>12:47 <span>✓✓</span></span></div></div><div class="reviews__input" aria-hidden="true"><span>Повідомлення</span><span>♡</span></div></div><div class="reviews__homebar" aria-hidden="true"></div></div></article>`;
  stage.innerHTML = reviews.map(phone).join("");
  const cards = [...stage.children];
  function render() {
    cards.forEach((card, i) => {
      let offset = (i - current + reviews.length) % reviews.length;
      if (offset > Math.floor(reviews.length / 2)) offset -= reviews.length;
      const visible = Math.abs(offset) <= 2;
      card.dataset.offset = String(offset);
      card.classList.toggle("is-hidden", !visible);
      card.setAttribute("aria-hidden", String(!visible || offset !== 0));
      card.style.zIndex = String(10 - Math.abs(offset));
      card.inert = offset !== 0;
    });
    counter.textContent =
      String(current + 1).padStart(2, "0") +
      " / " +
      String(reviews.length).padStart(2, "0");
  }
  const move = (delta) => {
    current = (current + delta + reviews.length) % reviews.length;
    render();
  };
  document
    .querySelector("#reviews-prev")
    .addEventListener("click", () => move(-1));
  document
    .querySelector("#reviews-next")
    .addEventListener("click", () => move(1));
  let startX = null;
  stage.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0]?.clientX ?? null;
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (e) => {
      if (startX === null) return;
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 45) move(diff < 0 ? 1 : -1);
      startX = null;
    },
    { passive: true },
  );
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  });
  render();
})();

// Copyright year in footer.
const footerYear = document.querySelector("#footer-year");
if (footerYear) footerYear.textContent = String(new Date().getFullYear());
