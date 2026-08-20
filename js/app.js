const CONFIG = {
  telegramUrl: "https://t.me/ng_999a",
  tiktokUrl: "https://www.tiktok.com/@cozypops01",
  announcement: "🎀 Instocks come in every 2 weeks!",
};
const P = window.COZY_PRODUCTS || [];
const money = (n) => `$${Number(n).toFixed(2)}`;
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];
function stockState(p) {
  if (p.preorder && p.qty === 0) return { txt: "🎀 Preorder", cls: "preorder" };
  if (p.qty === 0) return { txt: "Sold Out", cls: "sold" };
  if (p.qty <= 3) return { txt: `⚠️ Only ${p.qty} left!`, cls: "low" };
  return { txt: `💗 ${p.qty} available`, cls: "ok" };
}
function badges(p) {
  let b = [];
  if (p.viral) b.push('<span class="badge viral">🔥 Viral</span>');
  if (p.new) b.push('<span class="badge">✨ New</span>');
  if (p.preorder) b.push('<span class="badge preorder">🎀 Preorder</span>');
  if (p.qty === 0 && !p.preorder)
    b.push('<span class="badge sold">Sold Out</span>');
  return b.join("");
}
function productCard(p) {
  const s = stockState(p);
  return `<article class="product-card reveal"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-media"><img src="${p.images[0]}" alt="${p.name}"><div class="badges">${badges(p)}</div></div><div class="card-body"><div class="product-name">${p.name}</div><div class="price-row"><span class="price">${money(p.price)}</span><span class="stock ${s.cls}">${s.txt}</span></div><button class="btn-soft">View Squishy ♡</button></div></a></article>`;
}
function header() {
  const page = (location.pathname.split("/").pop() || "index.html").replace(
    ".html",
    "",
  );
  const active = (n) => (page === n ? "active" : "");
  return `<div class="announcement"><span class="spark">✨</span>${CONFIG.announcement}</div><header><div class="wrap nav"><a class="brand" href="index.html"><img src="assets/cozypops-logo.png" alt="CozyPops logo"><span>CozyPops</span></a><nav class="navlinks" id="navlinks"><a class="${active("index")}" href="index.html">Home</a><a class="${active("shop")}" href="shop.html">Shop</a><a class="${active("about")}" href="about.html">About</a><a class="${active("delivery")}" href="delivery.html">Delivery</a><a class="${active("care")}" href="care.html">Squishy Care</a><a class="${active("contact")}" href="contact.html">Contact</a></nav><a class="telegram-btn" href="${CONFIG.telegramUrl}" target="_blank">✈️ 💌 Order on Telegram</a><button class="menu-btn" id="menuBtn" aria-label="Open menu">☰</button></div></header>`;
}
function footer() {
  return `<footer><div class="wrap footer"><div class="foot-brand"><a class="brand" href="index.html"><img src="assets/cozypops-logo.png" alt="CozyPops logo"><span>CozyPops</span></a><p>Cute squishies. Cozy vibes. ♡<br>Student-run little squishy shop from the West side.</p></div><div><strong>Explore</strong><div class="foot-links"><a href="shop.html">Shop</a><a href="delivery.html">Delivery</a><a href="care.html">Squishy Care</a></div></div><div><strong>Follow</strong><div class="foot-links"><a href="${CONFIG.telegramUrl}" target="_blank">Telegram</a><a href="${CONFIG.tiktokUrl}" target="_blank">TikTok @cozypops01</a></div></div></div><div class="copy">Made with ♡ by CozyPops</div></footer><div class="toast" id="toast"></div>`;
}
function initShell() {
  const h = qs("#site-header"),
    f = qs("#site-footer");
  if (h) h.innerHTML = header();
  if (f) f.innerHTML = footer();
  const m = qs("#menuBtn");
  if (m) m.onclick = () => qs("#navlinks").classList.toggle("open");
  qsa(".js-telegram").forEach((a) => {
    a.href = CONFIG.telegramUrl;
    a.target = "_blank";
  });
  qsa(".js-tiktok").forEach((a) => {
    a.href = CONFIG.tiktokUrl;
    a.target = "_blank";
  });
}
function observe() {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
    { threshold: 0.08 },
  );
  qsa(".reveal").forEach((x) => io.observe(x));
}
function renderFeatured() {
  const box = qs("#featuredProducts");
  if (!box) return;
  box.innerHTML = P.filter((x) => x.featured)
    .slice(0, 8)
    .map(productCard)
    .join("");
  observe();
}
function renderHomeReviews() {
  const box = qs("#homeReviews");
  if (!box) return;
  const rs = [
    ["Mia", "“The squishy was sooo soft and the seller was really nice 💗”"],
    [
      "Jolene",
      "“Cute packaging and really affordable compared with other shops!”",
    ],
    [
      "Alyssa",
      "“My preorder arrived nicely and I love the texture sooo much 😭✨”",
    ],
  ];
  box.innerHTML = rs
    .map(
      (r, i) =>
        `<div class="review-card reveal"><div class="review-head"><span class="avatar">${["🎀", "🌸", "🧸"][i]}</span><span class="stars">★★★★★</span></div><strong>${r[0]}</strong><p>${r[1]}</p></div>`,
    )
    .join("");
  observe();
}
function shop() {
  const grid = qs("#shopGrid");
  if (!grid) return;
  let filter = "all";
  const search = qs("#search"),
    category = qs("#category"),
    sort = qs("#sort"),
    count = qs("#resultCount");
  function draw() {
    let a = P.filter((p) =>
      p.name.toLowerCase().includes(search.value.toLowerCase()),
    );
    if (category.value !== "all") a = a.filter((p) => p.cat === category.value);
    if (filter === "new") a = a.filter((p) => p.new);
    if (filter === "viral") a = a.filter((p) => p.viral);
    if (filter === "instock") a = a.filter((p) => p.qty > 0);
    if (filter === "low") a = a.filter((p) => p.qty > 0 && p.qty <= 3);
    if (filter === "preorder") a = a.filter((p) => p.preorder);
    if (filter === "sold") a = a.filter((p) => p.qty === 0 && !p.preorder);
    if (sort.value === "price-low") a.sort((x, y) => x.price - y.price);
    if (sort.value === "price-high") a.sort((x, y) => y.price - x.price);
    if (sort.value === "newest") a = [...a].reverse();
    grid.innerHTML = a.length
      ? a.map(productCard).join("")
      : '<div class="empty">No squishies match this filter yet 💗</div>';
    count.textContent = `Showing ${a.length} squish${a.length === 1 ? "y" : "ies"}`;
    observe();
  }
  const initialCat = new URLSearchParams(location.search).get("category");
  if (initialCat && [...category.options].some((o) => o.value === initialCat))
    category.value = initialCat;
  qsa(".chip").forEach(
    (c) =>
      (c.onclick = () => {
        qsa(".chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        filter = c.dataset.filter;
        draw();
      }),
  );
  [search, category, sort].forEach((x) => x.addEventListener("input", draw));
  draw();
}
function getSavedReviews(id) {
  try {
    return JSON.parse(localStorage.getItem("cozypops-reviews-" + id) || "[]");
  } catch {
    return [];
  }
}
function detail() {
  const el = qs("#productDetail");
  if (!el) return;
  const id = new URLSearchParams(location.search).get("id") || P[0].id;
  const p = P.find((x) => x.id === id) || P[0];
  document.title = `${p.name} | CozyPops`;
  const s = stockState(p);
  el.innerHTML = `<div><a class="back" href="shop.html">← Back to shop</a><div class="gallery-main"><img id="mainImg" src="${p.images[0]}" alt="${p.name}"></div><div class="thumbs">${p.images.map((im, i) => `<button class="thumb ${i === 0 ? "active" : ""}" data-img="${im}"><img src="${im}" alt="${p.name} view ${i + 1}"></button>`).join("")}</div></div><div class="detail-meta"><div class="badges" style="position:static">${badges(p)}</div><h1>${p.name}</h1><div><span class="big-price">${money(p.price)}</span><span class="pill-stock">${s.txt}</span></div><p class="muted">Category: <strong>${p.cat}</strong></p><p class="detail-desc">${p.desc}<br></p><div class="order-box"><h3>✈️ Interested? Order on Telegram</h3><p>Send me a screenshot or the name of the squishy you want ♡</p><a class="telegram-btn" target="_blank" href="${CONFIG.telegramUrl}">✈️ 💌 Order on Telegram</a></div></div>`;
  qsa(".thumb").forEach(
    (t) =>
      (t.onclick = () => {
        qs("#mainImg").src = t.dataset.img;
        qsa(".thumb").forEach((x) => x.classList.remove("active"));
        t.classList.add("active");
      }),
  );
  renderProductReviews(p);
  renderRelated(p);
}
function renderProductReviews(p) {
  const base = [
    {
      name: "Anonymous",
      rating: 5,
      text: "Looks just like the photo and the texture is so nice ✨",
    },
  ];
  const extra = getSavedReviews(p.id);
  const box = qs("#reviewList");
  if (!box) return;
  function draw() {
    const arr = [...extra, ...base];
    box.innerHTML = arr
      .map(
        (r) =>
          `<div class="review-item"><strong>${r.name}</strong><span class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span><div>${r.text}</div></div>`,
      )
      .join("");
    qs("#reviewCount").textContent = `${p.reviews + extra.length} reviews`;
  }
  let rating = 5;
  qsa(".star-input button").forEach(
    (b, i) =>
      (b.onclick = () => {
        rating = i + 1;
        qsa(".star-input button").forEach((x, j) =>
          x.classList.toggle("on", j < rating),
        );
      }),
  );
  const form = qs("#reviewForm");
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = qs("#reviewName").value.trim() || "Anonymous";
    const text = qs("#reviewText").value.trim();
    if (!text) return;
    extra.unshift({ name, rating, text });
    localStorage.setItem("cozypops-reviews-" + p.id, JSON.stringify(extra));
    form.reset();
    rating = 5;
    qsa(".star-input button").forEach((x) => x.classList.add("on"));
    draw();
    showToast("Review added on this device 💗");
  };
  draw();
}
function renderRelated(p) {
  const box = qs("#relatedProducts");
  if (!box) return;
  box.innerHTML = P.filter((x) => x.id !== p.id && (x.cat === p.cat || x.viral))
    .slice(0, 4)
    .map(productCard)
    .join("");
  observe();
}
function showToast(t) {
  const el = qs("#toast");
  if (!el) return;
  el.textContent = t;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2400);
}
document.addEventListener("DOMContentLoaded", () => {
  initShell();
  renderFeatured();
  renderHomeReviews();
  shop();
  detail();
  observe();
});
