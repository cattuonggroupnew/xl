/* =========================================================
   Xây lắp Cát Tường – script giao diện công khai
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const S = window.CTStore;
  const C = S.company();
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  /* Cấu hình gửi biểu mẫu. Khi có backend, đặt endpoint = "https://.../api/submissions" */
  const CONFIG = { endpoint: "" };

  /* ---------- Icons ---------- */
  const P = {
    arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="1"/><path d="m22 6-10 7L2 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    brief: '<rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
    crane: '<path d="M6 21V3l14 4H6M6 7l-3 0M10 21h-8M16 7v6M14 13h4v3h-4z"/>',
    frame: '<path d="M3 21h18M5 21V5h14v16M5 10h14M5 15h14M10 5v16M14 5v16"/>',
    brush: '<path d="M14 4h6v6M20 4 9 15M5 15a3 3 0 0 0-3 3c0 1.5-1 3-1 3h5a3 3 0 0 0 3-3 3 3 0 0 0-4-3z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    road: '<path d="M4 21 8 3M20 21 16 3M12 5v2M12 11v2M12 17v2"/>',
    clipboard: '<rect x="5" y="4" width="14" height="18" rx="1"/><path d="M9 2h6v4H9zM9 12l2 2 4-4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.2 7 22l5-3 5 3-1.2-8.8"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M1 21a8 8 0 0 1 16 0M17 4a4 4 0 0 1 0 8M23 21a8 8 0 0 0-5-7.4"/>',
    truck: '<path d="M1 4h14v12H1zM15 9h4l3 3v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 0 0 3-3M14 14l2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 0 1-3-3l2.8-2.8a5 5 0 0 1 6 .8L21 7M3 7l4.5-4.5M3 13l6 6"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'
  };
  const icon = (n, cls) => `<svg ${cls ? `class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  window.CTIcon = icon;

  const fmtDate = iso => { if (!iso) return ""; const d = new Date(iso); return isNaN(d) ? iso : d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }); };
  const statusClass = s => s === "Đang thi công" ? "tag--live" : s === "Đã hoàn thành" ? "tag--done" : "tag--plan";

  /* ---------- Header ---------- */
  const NAV = [
    { label: "Giới thiệu", href: "gioi-thieu.html", key: "about" },
    { label: "Lĩnh vực", href: "linh-vuc.html", key: "services" },
    { label: "Năng lực thi công", href: "nang-luc.html", key: "capability" },
    { label: "Dự án", href: "du-an.html", key: "projects" },
    { label: "Hợp tác", href: "hop-tac.html", key: "partners" },
    { label: "Tin tức", href: "tin-tuc.html", key: "news" },
    { label: "Tuyển dụng", href: "tuyen-dung.html", key: "careers" }
  ];
  const active = document.body.dataset.nav || page;

  function renderHeader() {
    const items = NAV.map(n => {
      if (n.children) {
        const isActive = n.children.some(c => c.key === active);
        return `<li class="has-dropdown">
          <button class="nav-link" type="button" aria-expanded="false" ${isActive ? 'aria-current="page"' : ""}>${n.label}${icon("chev", "chev")}</button>
          <ul class="dropdown">${n.children.map(c => `<li><a href="${c.href}" ${c.key === active ? 'aria-current="page"' : ""}>${c.label}</a></li>`).join("")}</ul></li>`;
      }
      return `<li><a class="nav-link" href="${n.href}" ${n.key === active ? 'aria-current="page"' : ""}>${n.label}</a></li>`;
    }).join("");
    const h = document.createElement("header");
    h.className = "site-header";
    h.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html" aria-label="${esc(C.shortName)} – Trang chủ">
        <img class="brand-dark" src="assets/img/logo.png" alt="" width="55" height="52">
        <img class="brand-light" src="assets/img/logo-light.png" alt="" width="55" height="52">
        <span class="brand-text"><strong>Cát Tường</strong><span>Xây lắp – Construction</span></span>
      </a>
      <nav class="nav" id="site-nav" aria-label="Điều hướng chính">
        <ul>${items}</ul>
        <a class="btn btn--gold nav-cta" href="lien-he.html">Liên hệ ${icon("arrow")}</a>
      </nav>
      <button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Mở menu">${icon("menu")}</button>
    </div>`;
    document.body.prepend(h);
    const skip = document.createElement("a");
    skip.className = "skip-link"; skip.href = "#main"; skip.textContent = "Bỏ qua tới nội dung";
    document.body.prepend(skip);

    const toggle = $(".nav-toggle", h), nav = $("#site-nav", h);
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      toggle.innerHTML = icon(open ? "close" : "menu");
    });
    $$(".has-dropdown > button", h).forEach(b => b.addEventListener("click", () => {
      const li = b.parentElement; const open = !li.classList.contains("is-open");
      li.classList.toggle("is-open", open); b.setAttribute("aria-expanded", open);
    }));
    const onScroll = () => h.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML = `<div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="assets/img/logo-light.png" alt="Logo Cát Tường" width="68" height="64">
          <div class="slogan">“${esc(C.slogan)}”</div>
          <p>${esc(C.name)} – đơn vị thi công xây lắp nhà cao tầng, nhà ở xã hội và hạ tầng đô thị tại Bắc Ninh.</p>
        </div>
        <div>
          <h4>Công ty</h4>
          <ul>
            <li><a href="gioi-thieu.html">Giới thiệu</a></li>
            <li><a href="linh-vuc.html">Lĩnh vực & dịch vụ</a></li>
            <li><a href="nang-luc.html">Năng lực thi công</a></li>
            <li><a href="hop-tac.html">Hợp tác NCC & nhà thầu phụ</a></li>
          </ul>
        </div>
        <div>
          <h4>Khám phá</h4>
          <ul>
            <li><a href="du-an.html">Dự án</a></li>
            <li><a href="tin-tuc.html">Tin tức & hoạt động</a></li>
            <li><a href="tuyen-dung.html">Tuyển dụng</a></li>
            <li><a href="lien-he.html">Liên hệ & báo giá</a></li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <ul class="footer-contact">
            <li>${icon("pin")}<span>${esc(C.address)}</span></li>
            <li>${icon("phone")}<a href="tel:${esc(C.hotline.replace(/\D/g, ""))}">${esc(C.hotline)}</a></li>
            <li>${icon("mail")}<a href="mailto:${esc(C.email)}">${esc(C.email)}</a></li>
            <li>${icon("globe")}<a href="https://${esc(C.website)}" rel="noopener">${esc(C.website)}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${esc(C.name)}. Bảo lưu mọi quyền.</span>
        <span class="footer-values">${C.values.map(v => `<span>${esc(v)}</span>`).join("<span aria-hidden='true'>·</span>")}</span>
      </div>
    </div>`;
    document.body.appendChild(f);

    const top = document.createElement("button");
    top.className = "to-top"; top.type = "button"; top.setAttribute("aria-label", "Lên đầu trang"); top.innerHTML = icon("up");
    top.addEventListener("click", () => window.scrollTo({ top: 0 }));
    document.body.appendChild(top);
    window.addEventListener("scroll", () => top.classList.toggle("is-visible", window.scrollY > 800), { passive: true });
  }

  /* ---------- Reveal ---------- */
  function initReveal(root) {
    // Tự thêm hiệu ứng cho tiêu đề mục, ảnh, khối nội dung chưa được đánh dấu
    $$(".section-head, .split > *, .mosaic, .stats, .values, .history, .steps, .gallery, .toolbar, .chip-row, .form-card, .cta-band .wrap > *, .job-aside", root)
      .forEach(e => e.classList.add("reveal"));
    // Các thẻ cạnh nhau hiện lần lượt
    $$(".grid", root).forEach(g => $$(":scope > .reveal", g).forEach((c, n) => c.style.setProperty("--d", (n % 4) * 120 + "ms")));
    const els = $$(".reveal:not(.is-in)", root);
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Fill placeholders ---------- */
  function fillCompany() {
    $$("[data-c]").forEach(el => {
      const k = el.dataset.c; const v = C[k]; if (v == null) return;
      if (el.tagName === "A" && k === "hotline") el.href = "tel:" + v.replace(/\D/g, "");
      if (el.tagName === "A" && k === "email") el.href = "mailto:" + v;
      el.textContent = v;
    });
  }

  /* ---------- Hero slider ---------- */
  function initHero() {
    const hero = $(".hero"); if (!hero) return;
    const slides = $$(".hero-slide", hero); const dots = $$(".hero-dot", hero); const cap = $(".hero-caption", hero);
    if (slides.length < 2) return;
    let i = 0, t, paused = false;
    const go = n => {
      slides[i].classList.remove("is-active"); dots[i] && dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      if (dots[i]) { void dots[i].offsetWidth; dots[i].classList.add("is-active"); }
      if (cap) cap.textContent = slides[i].dataset.caption || "";
      clearTimeout(t); if (!paused) t = setTimeout(() => go(i + 1), 2000);
    };
    dots.forEach((d, n) => d.addEventListener("click", () => go(n)));
    // Tạm dừng khi người dùng đưa chuột hoặc focus vào nút chuyển ảnh
    const meta = $(".hero-meta", hero);
    if (meta) {
      meta.addEventListener("mouseenter", () => { paused = true; clearTimeout(t); });
      meta.addEventListener("mouseleave", () => { paused = false; go(i + 1); });
    }
    go(0);
  }

  /* ---------- Cards ---------- */
  const projectCard = p => `
    <a class="card reveal" href="du-an-chi-tiet.html?id=${encodeURIComponent(p.id)}">
      <div class="media"><span class="tag ${statusClass(p.status)}">${esc(p.status)}</span><img src="${esc(p.cover)}" alt="${esc(p.name)}" loading="lazy"></div>
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <div class="card-meta"><span>${icon("pin")}${esc(p.location)}</span><span>${icon("brief")}${esc(p.category)}</span>${p.year ? `<span>${icon("cal")}Khởi công ${p.year}</span>` : ""}</div>
        <p>${esc(p.summary)}</p>
      </div>
    </a>`;

  const newsCard = n => `
    <a class="news-card reveal" href="tin-tuc-chi-tiet.html?id=${encodeURIComponent(n.id)}">
      <div class="media"><img src="${esc(n.image)}" alt="" loading="lazy"></div>
      <div class="meta"><span class="cat">${esc(n.category)}</span><time datetime="${esc(n.date)}">${fmtDate(n.date)}</time></div>
      <h3>${esc(n.title)}</h3>
      <p>${esc(n.excerpt)}</p>
    </a>`;

  const jobRow = j => `
    <a class="job-row reveal" href="tuyen-dung-chi-tiet.html?id=${encodeURIComponent(j.id)}">
      <div>
        <h3>${esc(j.title)}</h3>
        <div class="card-meta"><span>${icon("brief")}${esc(j.department)}</span><span>${icon("pin")}${esc(j.location)}</span><span>${icon("users")}Số lượng: ${esc(j.quantity)}</span><span>${icon("cal")}Hạn nộp: ${fmtDate(j.deadline)}</span></div>
      </div>
      <span class="arrow">${icon("arrow")}</span>
    </a>`;

  const sortNews = arr => arr.slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  /* ---------- Pagination ---------- */
  function pager(el, pageNo, pages, onGo) {
    if (pages <= 1) { el.innerHTML = ""; return; }
    let h = `<button type="button" data-p="${pageNo - 1}" ${pageNo === 1 ? "disabled" : ""} aria-label="Trang trước">‹</button>`;
    for (let p = 1; p <= pages; p++) h += `<button type="button" data-p="${p}" ${p === pageNo ? 'aria-current="page"' : ""}>${p}</button>`;
    h += `<button type="button" data-p="${pageNo + 1}" ${pageNo === pages ? "disabled" : ""} aria-label="Trang sau">›</button>`;
    el.innerHTML = h;
    $$("button", el).forEach(b => b.addEventListener("click", () => onGo(+b.dataset.p)));
  }
  const setQuery = obj => {
    const u = new URL(location.href);
    Object.entries(obj).forEach(([k, v]) => (v === "" || v == null || v === 1 && k === "page") ? u.searchParams.delete(k) : u.searchParams.set(k, v));
    history.replaceState(null, "", u);
  };
  const opts = (arr, sel) => arr.map(v => `<option value="${esc(v)}" ${String(v) === String(sel) ? "selected" : ""}>${esc(v)}</option>`).join("");

  /* ---------- Pages ---------- */
  const pages = {
    home() {
      const feat = S.list("projects").filter(p => p.featured).slice(0, 3);
      const fe = $("#featured");
      if (fe) fe.innerHTML = feat.map(p => `
        <a class="feature reveal" href="du-an-chi-tiet.html?id=${encodeURIComponent(p.id)}">
          <div class="feature-media media"><img src="${esc(p.cover)}" alt="${esc(p.name)}" loading="lazy"></div>
          <div class="feature-body">
            <div class="tags"><span class="tag ${statusClass(p.status)}">${esc(p.status)}</span><span class="tag">${esc(p.category)}</span></div>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.summary)}</p>
            <dl class="facts">${Object.entries(p.facts || {}).slice(0, 4).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
            <span class="arrow-link">Xem dự án ${icon("arrow")}</span>
          </div>
        </a>`).join("");
      const sv = $("#service-tiles");
      if (sv) sv.innerHTML = S.list("services").slice(0, 4).map((s, i) => `
        <a class="tile reveal" href="linh-vuc.html#${esc(s.id)}">
          <img src="${esc(s.image)}" alt="" loading="lazy">
          <div class="tile-body"><span class="num">0${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p></div>
        </a>`).join("");
      const nw = $("#home-news");
      if (nw) nw.innerHTML = sortNews(S.list("news")).slice(0, 3).map(newsCard).join("");
    },

    services() {
      const el = $("#service-list"); if (!el) return;
      el.innerHTML = S.list("services").map((s, i) => `
        <article class="svc-row reveal" id="${esc(s.id)}">
          <div class="num">0${i + 1}</div>
          <div>
            <h3>${esc(s.title)}</h3>
            <p class="lead">${esc(s.summary)}</p>
            <p>${esc(s.body)}</p>
          </div>
          <div class="media"><img src="${esc(s.image)}" alt="${esc(s.title)}" loading="lazy"></div>
        </article>`).join("");
    },

    projects() {
      const all = S.list("projects");
      const years = [...new Set(all.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);
      const st = { q: params.get("q") || "", cat: params.get("cat") || "", status: params.get("status") || "", year: params.get("year") || "", view: params.get("view") || "grid", page: +params.get("page") || 1 };
      const PER = 6;
      $("#f-cat").innerHTML = `<option value="">Tất cả lĩnh vực</option>` + opts(S.db.projectCategories, st.cat);
      $("#f-status").innerHTML = `<option value="">Tất cả trạng thái</option>` + opts(S.db.projectStatuses, st.status);
      $("#f-year").innerHTML = `<option value="">Tất cả các năm</option>` + opts(years, st.year);
      $("#f-q").value = st.q;
      const out = $("#project-results"), count = $("#result-count"), pg = $("#pager");

      function draw() {
        const q = st.q.trim().toLowerCase();
        const res = all.filter(p =>
          (!q || p.name.toLowerCase().includes(q) || (p.location || "").toLowerCase().includes(q)) &&
          (!st.cat || p.category === st.cat) && (!st.status || p.status === st.status) && (!st.year || String(p.year) === st.year));
        const pagesN = Math.max(1, Math.ceil(res.length / PER));
        st.page = Math.min(st.page, pagesN);
        out.className = st.view === "list" ? "project-list grid" : "grid grid-3";
        out.innerHTML = res.length ? res.slice((st.page - 1) * PER, st.page * PER).map(projectCard).join("")
          : `<div class="empty" style="grid-column:1/-1">Không tìm thấy dự án phù hợp. Hãy thử từ khóa hoặc bộ lọc khác.</div>`;
        count.textContent = `Hiển thị ${res.length} dự án`;
        $$(".view-toggle button").forEach(b => b.setAttribute("aria-pressed", b.dataset.view === st.view));
        pager(pg, st.page, pagesN, p => { st.page = p; draw(); $("#project-results").scrollIntoView({ block: "start" }); });
        setQuery(st);
        initReveal(out);
      }
      let tm;
      $("#f-q").addEventListener("input", e => { clearTimeout(tm); tm = setTimeout(() => { st.q = e.target.value; st.page = 1; draw(); }, 200); });
      [["#f-cat", "cat"], ["#f-status", "status"], ["#f-year", "year"]].forEach(([s, k]) => $(s).addEventListener("change", e => { st[k] = e.target.value; st.page = 1; draw(); }));
      $$(".view-toggle button").forEach(b => b.addEventListener("click", () => { st.view = b.dataset.view; draw(); }));
      $("#filter-form").addEventListener("submit", e => e.preventDefault());
      draw();
    },

    project() {
      const p = S.find("projects", params.get("id"));
      const root = $("#project-detail");
      if (!p) { root.innerHTML = notFound("Không tìm thấy dự án", "du-an.html", "Xem danh sách dự án"); return; }
      document.title = `${p.name} – Dự án | Xây lắp Cát Tường`;
      const stateLbl = { done: "Hoàn thành", current: "Đang thực hiện", next: "Sắp tới" };
      const others = S.list("projects").filter(x => x.id !== p.id).slice(0, 3);
      root.innerHTML = `
        <section class="detail-hero">
          <img src="${esc(p.cover)}" alt="">
          <div class="wrap">
            <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Trang chủ</a><span aria-hidden="true">/</span><a href="du-an.html">Dự án</a><span aria-hidden="true">/</span><span>${esc(p.name)}</span></nav>
            <div class="tags"><span class="tag ${statusClass(p.status)}">${esc(p.status)}</span><span class="tag">${esc(p.category)}</span></div>
            <h1>${esc(p.name)}</h1>
          </div>
        </section>
        <div class="wrap">
          <dl class="detail-facts">
            <div><dt>Địa điểm</dt><dd>${esc(p.location)}</dd></div>
            <div><dt>Năm khởi công</dt><dd>${p.year ? esc(p.year) : "Đang cập nhật"}</dd></div>
            <div><dt>Lĩnh vực</dt><dd>${esc(p.category)}</dd></div>
            <div><dt>Trạng thái</dt><dd>${esc(p.status)}</dd></div>
          </dl>
        </div>
        <section class="section">
          <div class="wrap split">
            <div class="s-7 reveal">
              <span class="eyebrow">Tổng quan dự án</span>
              <p class="lead">${esc(p.summary)}</p>
              <p>${esc(p.description)}</p>
              <dl class="facts">${Object.entries(p.facts || {}).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
            </div>
            <aside class="s-5 reveal" aria-labelledby="pg-title">
              <span class="eyebrow" id="pg-title">Tiến độ thi công</span>
              <ol class="timeline">${(p.progress || []).map(m => `<li class="${esc(m.state)}">${m.date && m.date !== "—" ? `<div class="t-date">${esc(m.date)}</div>` : ""}<div class="t-title">${esc(m.title)}<span class="t-state">· ${stateLbl[m.state] || ""}</span></div></li>`).join("")}</ol>
            </aside>
          </div>
        </section>
        ${(p.gallery || []).length ? `<section class="section section--alt"><div class="wrap">
          <div class="section-head"><div><span class="eyebrow">Thư viện ảnh</span><h2>Hình ảnh dự án</h2></div><span class="muted">${p.gallery.length} ảnh</span></div>
          <div class="gallery" data-lightbox>${p.gallery.map((g, i) => `<button type="button" data-i="${i}" aria-label="Xem ảnh ${i + 1}"><img src="${esc(g)}" alt="${esc(p.name)} – ảnh ${i + 1}" loading="lazy"></button>`).join("")}</div>
        </div></section>` : ""}
        <section class="section"><div class="wrap">
          <div class="section-head"><div><span class="eyebrow">Khám phá thêm</span><h2>Dự án khác</h2></div><a class="arrow-link" href="du-an.html">Tất cả dự án ${icon("arrow")}</a></div>
          <div class="grid grid-3">${others.map(projectCard).join("")}</div>
        </div></section>`;
      initLightbox(p.gallery || []);
    },

    news() {
      const all = sortNews(S.list("news"));
      const st = { cat: params.get("cat") || "", page: +params.get("page") || 1 };
      const PER = 6;
      const chips = $("#news-cats"), out = $("#news-results"), pg = $("#pager");
      chips.innerHTML = ["", ...S.db.newsCategories].map(c => `<button type="button" class="chip" data-c="${esc(c)}">${c ? esc(c) : "Tất cả"}</button>`).join("");
      function draw() {
        const res = all.filter(n => !st.cat || n.category === st.cat);
        const n = Math.max(1, Math.ceil(res.length / PER)); st.page = Math.min(st.page, n);
        out.innerHTML = res.length ? res.slice((st.page - 1) * PER, st.page * PER).map(newsCard).join("") : `<div class="empty" style="grid-column:1/-1">Chưa có bài viết trong danh mục này.</div>`;
        $$(".chip", chips).forEach(b => b.setAttribute("aria-pressed", b.dataset.c === st.cat));
        pager(pg, st.page, n, p => { st.page = p; draw(); out.scrollIntoView({ block: "start" }); });
        setQuery(st); initReveal(out);
      }
      $$(".chip", chips).forEach(b => b.addEventListener("click", () => { st.cat = b.dataset.c; st.page = 1; draw(); }));
      draw();
    },

    article() {
      const n = S.find("news", params.get("id"));
      const root = $("#article");
      if (!n) { root.innerHTML = notFound("Không tìm thấy bài viết", "tin-tuc.html", "Về trang tin tức"); return; }
      document.title = `${n.title} | Xây lắp Cát Tường`;
      const more = sortNews(S.list("news")).filter(x => x.id !== n.id).slice(0, 3);
      root.innerHTML = `
        <section class="page-hero">
          <img class="bg" src="${esc(n.image)}" alt="">
          <div class="wrap">
            <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Trang chủ</a><span aria-hidden="true">/</span><a href="tin-tuc.html">Tin tức</a><span aria-hidden="true">/</span><span>${esc(n.category)}</span></nav>
            <h1 style="font-size:clamp(34px,4.6vw,64px);max-width:22ch">${esc(n.title)}</h1>
            <div class="article"><div class="meta" style="margin-left:0"><span>${icon("cal", "")} ${fmtDate(n.date)}</span><span>${esc(n.category)}</span></div></div>
          </div>
        </section>
        <section class="section"><div class="wrap">
          <article class="article">
            <p class="lead" style="font-weight:500">${esc(n.excerpt)}</p>
            ${(n.body || []).map(p => `<p>${esc(p)}</p>`).join("")}
            ${(n.gallery || []).length ? `<div class="gallery mt-l" data-lightbox>${n.gallery.map((g, i) => `<button type="button" data-i="${i}" aria-label="Xem ảnh ${i + 1}"><img src="${esc(g)}" alt="Ảnh ${i + 1}" loading="lazy"></button>`).join("")}</div>` : ""}
            <p class="mt-l"><a class="arrow-link" href="tin-tuc.html">Tất cả tin tức ${icon("arrow")}</a></p>
          </article>
        </div></section>
        <section class="section section--alt"><div class="wrap">
          <div class="section-head"><div><span class="eyebrow">Đọc thêm</span><h2>Tin liên quan</h2></div></div>
          <div class="grid grid-3">${more.map(newsCard).join("")}</div>
        </div></section>`;
      $$(".page-hero svg").forEach(s => { s.style.width = "16px"; s.style.height = "16px"; s.style.verticalAlign = "-2px"; });
      initLightbox(n.gallery || []);
    },

    careers() {
      const all = S.list("jobs");
      const st = { q: params.get("q") || "", dept: params.get("dept") || "", loc: params.get("loc") || "" };
      $("#j-dept").innerHTML = `<option value="">Tất cả bộ phận</option>` + opts(S.db.jobDepartments, st.dept);
      $("#j-loc").innerHTML = `<option value="">Tất cả địa điểm</option>` + opts(S.db.jobLocations, st.loc);
      $("#j-q").value = st.q;
      const out = $("#job-results");
      function draw() {
        const q = st.q.trim().toLowerCase();
        const res = all.filter(j => (!q || j.title.toLowerCase().includes(q)) && (!st.dept || j.department === st.dept) && (!st.loc || j.location === st.loc));
        out.innerHTML = res.length ? res.map(jobRow).join("") : `<div class="empty">Hiện chưa có vị trí phù hợp. Bạn có thể gửi hồ sơ tự do qua trang <a href="lien-he.html">Liên hệ</a>.</div>`;
        $("#job-count").textContent = `${res.length} vị trí đang tuyển`;
        setQuery(st); initReveal(out);
      }
      $("#j-q").addEventListener("input", e => { st.q = e.target.value; draw(); });
      $("#j-dept").addEventListener("change", e => { st.dept = e.target.value; draw(); });
      $("#j-loc").addEventListener("change", e => { st.loc = e.target.value; draw(); });
      $("#job-filter").addEventListener("submit", e => e.preventDefault());
      draw();
    },

    job() {
      const j = S.find("jobs", params.get("id"));
      const root = $("#job-detail");
      if (!j) {
        $(".page-hero").remove(); $("#apply").remove();
        root.innerHTML = notFound("Vị trí không tồn tại hoặc đã đóng", "tuyen-dung.html", "Xem vị trí khác"); return;
      }
      document.title = `${j.title} – Tuyển dụng | Xây lắp Cát Tường`;
      $("#job-title").textContent = j.title;
      $("#job-crumb").textContent = j.title;
      $("#job-sub").textContent = `${j.department} · ${j.location}`;
      const list = a => `<ul>${(a || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
      root.innerHTML = `
        <div class="split" style="align-items:start">
          <div class="s-8 prose">
            <h3>Mô tả công việc</h3>${list(j.description)}
            <h3>Yêu cầu</h3>${list(j.requirements)}
            <h3>Quyền lợi</h3>${list(j.benefits)}
          </div>
          <aside class="s-4"><div class="job-aside">
            <dl>
              <dt>Bộ phận</dt><dd>${esc(j.department)}</dd>
              <dt>Địa điểm</dt><dd>${esc(j.location)}</dd>
              <dt>Hình thức</dt><dd>${esc(j.type)}</dd>
              <dt>Số lượng</dt><dd>${esc(j.quantity)}</dd>
              <dt>Mức lương</dt><dd>${esc(j.salary)}</dd>
              <dt>Hạn nộp hồ sơ</dt><dd>${fmtDate(j.deadline)}</dd>
            </dl>
            <a class="btn btn--brand" href="#apply" style="width:100%;justify-content:center">Ứng tuyển ngay ${icon("arrow")}</a>
          </div></aside>
        </div>`;
      const f = $("form[data-form=application]"); if (f) { f.elements.position.value = j.title; }
    }
  };

  function notFound(title, href, label) {
    return `<section class="section" style="padding-top:calc(var(--header-h) + 80px)"><div class="wrap center"><h1 style="font-size:48px">${esc(title)}</h1><p class="muted">Đường dẫn có thể đã thay đổi hoặc nội dung đã được ẩn.</p><a class="btn btn--brand" href="${href}">${esc(label)} ${icon("arrow")}</a></div></section>`;
  }

  /* ---------- Lightbox ---------- */
  function initLightbox(images) {
    if (!images.length) return;
    let lb = $(".lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Xem ảnh");
      lb.innerHTML = `<img alt=""><button class="lb-close" type="button" aria-label="Đóng">${icon("close")}</button><button class="lb-prev" type="button" aria-label="Ảnh trước">${icon("left")}</button><button class="lb-next" type="button" aria-label="Ảnh sau">${icon("right")}</button><div class="lb-count"></div>`;
      document.body.appendChild(lb);
    }
    let i = 0, last;
    const img = $("img", lb), cnt = $(".lb-count", lb);
    const show = n => { i = (n + images.length) % images.length; img.src = images[i]; cnt.textContent = `${i + 1} / ${images.length}`; };
    const open = n => { last = document.activeElement; show(n); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); };
    const close = () => { lb.classList.remove("is-open"); document.body.style.overflow = ""; last && last.focus(); };
    $(".lb-close", lb).onclick = close; $(".lb-prev", lb).onclick = () => show(i - 1); $(".lb-next", lb).onclick = () => show(i + 1);
    lb.onclick = e => { if (e.target === lb) close(); };
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1);
    });
    $$("[data-lightbox] button").forEach(b => b.addEventListener("click", () => open(+b.dataset.i)));
  }
  window.CTLightbox = initLightbox;

  /* ---------- Forms ---------- */
  const PHONE_RE = /^(0|\+?84)(3|5|7|8|9|2)\d{8}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const MAX_FILE = 5 * 1024 * 1024;
  const FILE_EXT = /\.(pdf|doc|docx)$/i;

  function validateField(el) {
    const field = el.closest(".field") || el.parentElement;
    const v = el.type === "checkbox" ? el.checked : el.type === "file" ? el.files.length : el.value.trim();
    let msg = "";
    if (el.required && !v) msg = el.dataset.msg || "Vui lòng điền thông tin này.";
    else if (v && el.type === "email" && !EMAIL_RE.test(el.value.trim())) msg = "Email không hợp lệ.";
    else if (v && el.dataset.validate === "phone" && !PHONE_RE.test(el.value.replace(/[\s.\-()]/g, ""))) msg = "Số điện thoại không hợp lệ (VD: 0912 345 678).";
    else if (v && el.dataset.min && el.value.trim().length < +el.dataset.min) msg = `Vui lòng nhập tối thiểu ${el.dataset.min} ký tự.`;
    else if (el.type === "file" && el.files.length) {
      const f = el.files[0];
      if (!FILE_EXT.test(f.name)) msg = "Chỉ nhận file PDF, DOC hoặc DOCX.";
      else if (f.size > MAX_FILE) msg = "File vượt quá 5 MB.";
    }
    if (field) {
      field.classList.toggle("has-error", !!msg);
      let er = $(".error", field);
      if (!er) { er = document.createElement("div"); er.className = "error"; er.id = (el.id || el.name) + "-err"; field.appendChild(er); }
      er.textContent = msg;
      el.setAttribute("aria-invalid", !!msg);
      if (msg) el.setAttribute("aria-describedby", er.id);
    }
    return !msg;
  }

  function initForms() {
    $$("form[data-form]").forEach(form => {
      const started = Date.now();
      const status = $(".form-status", form);
      const btn = $("button[type=submit]", form);
      const fields = $$("input, select, textarea", form).filter(el => !el.closest(".hp"));
      fields.forEach(el => {
        el.addEventListener("blur", () => { if (el.value || el.type === "file") validateField(el); });
        el.addEventListener("input", () => { if ((el.closest(".field") || {}).classList?.contains("has-error")) validateField(el); });
        el.addEventListener("change", () => validateField(el));
      });

      const drop = $(".file-drop", form);
      if (drop) {
        const inp = $("input[type=file]", drop), name = $(".file-name", drop);
        inp.addEventListener("change", () => { name.textContent = inp.files[0] ? `${inp.files[0].name} (${(inp.files[0].size / 1024 / 1024).toFixed(2)} MB)` : ""; });
        ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("is-drag"); }));
        ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("is-drag"); }));
        drop.addEventListener("drop", e => { if (e.dataTransfer.files.length) { inp.files = e.dataTransfer.files; inp.dispatchEvent(new Event("change")); } });
      }

      form.addEventListener("submit", async e => {
        e.preventDefault();
        status.className = "form-status"; status.textContent = "";
        const ok = fields.map(validateField).every(Boolean);
        if (!ok) {
          status.className = "form-status is-err"; status.textContent = "Vui lòng kiểm tra lại các trường được đánh dấu.";
          const first = $(".has-error input, .has-error select, .has-error textarea", form); first && first.focus();
          return;
        }
        // Chống gửi tự động: honeypot + thời gian điền tối thiểu + giới hạn tần suất
        const hp = $(".hp input", form);
        let last = 0; try { last = +localStorage.getItem("ct_last_submit") || 0; } catch (err) {}
        if ((hp && hp.value) || Date.now() - started < 3000) {
          status.className = "form-status is-err"; status.textContent = "Không thể gửi biểu mẫu. Vui lòng thử lại sau ít giây."; return;
        }
        if (Date.now() - last < 30000) {
          status.className = "form-status is-err"; status.textContent = "Bạn vừa gửi một yêu cầu. Vui lòng đợi 30 giây trước khi gửi tiếp."; return;
        }

        const data = {};
        fields.forEach(el => {
          if (el.type === "file") { if (el.files[0]) data[el.name] = { name: el.files[0].name, size: el.files[0].size }; }
          else if (el.type === "checkbox") data[el.name] = el.checked;
          else data[el.name] = el.value.trim();
        });

        btn.disabled = true; const old = btn.innerHTML; btn.textContent = "Đang gửi…";
        try {
          if (CONFIG.endpoint) {
            const fd = new FormData(form); fd.append("type", form.dataset.form);
            const r = await fetch(CONFIG.endpoint, { method: "POST", body: fd });
            if (!r.ok) throw new Error(r.status);
          } else {
            await new Promise(r => setTimeout(r, 600));
            if (!S.addSubmission(form.dataset.form, data)) throw new Error("store");
          }
          try { localStorage.setItem("ct_last_submit", Date.now()); } catch (err) {}
          status.className = "form-status is-ok";
          status.textContent = form.dataset.success || "Gửi thành công! Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.";
          form.reset(); const fn = $(".file-name", form); if (fn) fn.textContent = "";
          if (form.elements.position && pages.job && page === "job") { const j = S.find("jobs", params.get("id")); if (j) form.elements.position.value = j.title; }
        } catch (err) {
          status.className = "form-status is-err";
          status.textContent = `Gửi không thành công do lỗi kết nối. Vui lòng thử lại hoặc gọi hotline ${C.hotline}.`;
        } finally {
          btn.disabled = false; btn.innerHTML = old;
          status.scrollIntoView({ block: "nearest" });
        }
      });

      // Điền sẵn loại nhu cầu từ URL (?need=...)
      const need = params.get("need"); if (need && form.elements.need) form.elements.need.value = need;
    });
  }

  /* ---------- Boot ---------- */
  renderHeader();
  renderFooter();
  fillCompany();
  if (pages[page]) pages[page]();
  initHero();
  initForms();
  initReveal(document);
  $$("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon); });
})();
