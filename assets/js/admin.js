/* =========================================================
   Trang quản trị (demo) – Xây lắp Cát Tường
   Dữ liệu lưu trong localStorage qua CTStore. Khi có backend,
   thay CTStore và phần tài khoản bằng API máy chủ.
   ========================================================= */
(function () {
  "use strict";
  const S = window.CTStore;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDT = iso => iso ? new Date(iso).toLocaleString("vi-VN") : "";
  const slug = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "muc-" + Date.now().toString(36);

  /* ---------- Tài khoản ---------- */
  const USERS_KEY = "ct_users_v1", SESSION_KEY = "ct_session_v1";
  const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

  async function hash(pw) {
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ct-salt:" + pw));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    return "plain:" + pw;
  }
  async function users() {
    let u = ls.get(USERS_KEY);
    if (!u || !u.length) { u = [{ username: "admin", name: "Quản trị viên", role: "admin", pass: await hash("CatTuong@2026") }]; ls.set(USERS_KEY, u); }
    return u;
  }
  let me = null;
  try { me = JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) {}

  /* ---------- Cấu hình bộ sưu tập ---------- */
  const COLS = {
    projects: {
      title: "Dự án", noun: "dự án", page: "du-an-chi-tiet.html",
      columns: [["cover", "Ảnh", "img"], ["name", "Tên dự án"], ["category", "Lĩnh vực"], ["status", "Trạng thái"], ["year", "Năm"]],
      filters: [["category", () => S.db.projectCategories], ["status", () => S.db.projectStatuses]],
      fields: [
        ["name", "Tên dự án", "text", { required: true }],
        ["id", "Đường dẫn (slug)", "text", { help: "Để trống để tự tạo từ tên." }],
        ["category", "Lĩnh vực", "select", { options: () => S.db.projectCategories }],
        ["status", "Trạng thái", "select", { options: () => S.db.projectStatuses }],
        ["year", "Năm khởi công", "number"],
        ["location", "Địa điểm", "text"],
        ["cover", "Ảnh đại diện", "image"],
        ["summary", "Tóm tắt", "textarea"],
        ["description", "Mô tả chi tiết", "textarea"],
        ["facts", "Thông số (mỗi dòng: Tên: Giá trị)", "kv"],
        ["gallery", "Thư viện ảnh (mỗi dòng một đường dẫn ảnh)", "lines"],
        ["progress", "Tiến độ (mỗi dòng: thời gian | nội dung | done/current/next)", "progress"],
        ["featured", "Hiển thị nổi bật ở trang chủ", "checkbox"],
        ["hidden", "Ẩn khỏi website", "checkbox"]
      ]
    },
    news: {
      title: "Tin tức", noun: "bài viết", page: "tin-tuc-chi-tiet.html",
      columns: [["image", "Ảnh", "img"], ["title", "Tiêu đề"], ["category", "Danh mục"], ["date", "Ngày đăng", "date"]],
      filters: [["category", () => S.db.newsCategories]],
      fields: [
        ["title", "Tiêu đề", "text", { required: true }],
        ["id", "Đường dẫn (slug)", "text", { help: "Để trống để tự tạo từ tiêu đề." }],
        ["category", "Danh mục", "select", { options: () => S.db.newsCategories }],
        ["date", "Ngày đăng", "date", { required: true }],
        ["image", "Ảnh đại diện", "image"],
        ["excerpt", "Mô tả ngắn", "textarea"],
        ["body", "Nội dung (mỗi dòng một đoạn)", "lines"],
        ["gallery", "Ảnh trong bài (mỗi dòng một đường dẫn)", "lines"],
        ["hidden", "Ẩn bài viết", "checkbox"]
      ]
    },
    jobs: {
      title: "Tuyển dụng", noun: "tin tuyển dụng", page: "tuyen-dung-chi-tiet.html",
      columns: [["title", "Vị trí"], ["department", "Bộ phận"], ["location", "Địa điểm"], ["deadline", "Hạn nộp", "date"]],
      filters: [["department", () => S.db.jobDepartments], ["location", () => S.db.jobLocations]],
      fields: [
        ["title", "Vị trí", "text", { required: true }],
        ["id", "Đường dẫn (slug)", "text", { help: "Để trống để tự tạo." }],
        ["department", "Bộ phận", "select", { options: () => S.db.jobDepartments }],
        ["location", "Địa điểm", "select", { options: () => S.db.jobLocations }],
        ["quantity", "Số lượng", "number"],
        ["salary", "Mức lương", "text"],
        ["type", "Hình thức", "text"],
        ["deadline", "Hạn nộp hồ sơ", "date"],
        ["description", "Mô tả công việc (mỗi dòng một ý)", "lines"],
        ["requirements", "Yêu cầu (mỗi dòng một ý)", "lines"],
        ["benefits", "Quyền lợi (mỗi dòng một ý)", "lines"],
        ["hidden", "Ẩn tin tuyển dụng", "checkbox"]
      ]
    },
    services: {
      title: "Lĩnh vực hoạt động", noun: "lĩnh vực", page: "linh-vuc.html",
      columns: [["image", "Ảnh", "img"], ["title", "Tên lĩnh vực"], ["summary", "Tóm tắt"]],
      filters: [],
      fields: [
        ["title", "Tên lĩnh vực", "text", { required: true }],
        ["id", "Mã (slug)", "text", { help: "Để trống để tự tạo." }],
        ["summary", "Tóm tắt", "textarea"],
        ["body", "Mô tả", "textarea"],
        ["image", "Ảnh", "image"],
        ["hidden", "Ẩn lĩnh vực", "checkbox"]
      ]
    }
  };

  const SUBS = {
    contact: { title: "Yêu cầu liên hệ & báo giá", noun: "yêu cầu", fields: [["name", "Họ tên"], ["company", "Doanh nghiệp"], ["phone", "Điện thoại"], ["email", "Email"], ["need", "Loại nhu cầu"], ["message", "Nội dung"]] },
    partner: { title: "Đăng ký đối tác", noun: "hồ sơ đối tác", fields: [["company", "Doanh nghiệp"], ["taxCode", "Mã số thuế"], ["name", "Người liên hệ"], ["phone", "Điện thoại"], ["email", "Email"], ["need", "Hình thức"], ["field", "Lĩnh vực"], ["message", "Năng lực"]] },
    application: { title: "Hồ sơ ứng tuyển", noun: "hồ sơ", fields: [["position", "Vị trí"], ["name", "Họ tên"], ["phone", "Điện thoại"], ["email", "Email"], ["experience", "Kinh nghiệm"], ["cv", "CV"], ["message", "Giới thiệu"]] }
  };
  const SUB_STATUSES = ["Mới", "Đang xử lý", "Đã xử lý"];
  const pillCls = s => s === "Mới" ? "pill--new" : s === "Đang xử lý" ? "pill--doing" : "pill--done";

  /* ---------- Shell ---------- */
  let view = "dashboard";
  function nav() {
    const cnt = t => S.submissions(t).filter(s => s.status === "Mới").length;
    const item = (k, label, badge) => `<button type="button" data-v="${k}" ${view === k ? 'aria-current="true"' : ""}><span>${label}</span>${badge ? `<span class="badge">${badge}</span>` : ""}</button>`;
    $("#side-nav").innerHTML =
      `<h4>Chung</h4>${item("dashboard", "Tổng quan")}` +
      `<h4>Nội dung</h4>${item("projects", "Dự án")}${item("news", "Tin tức")}${item("jobs", "Tuyển dụng")}${item("services", "Lĩnh vực")}${item("company", "Thông tin công ty")}` +
      `<h4>Khách hàng</h4>${item("contact", "Liên hệ & báo giá", cnt("contact"))}${item("partner", "Đăng ký đối tác", cnt("partner"))}${item("application", "Hồ sơ ứng tuyển", cnt("application"))}` +
      (me.role === "admin" ? `<h4>Hệ thống</h4>${item("users", "Tài khoản")}` : "");
    $$("#side-nav button").forEach(b => b.onclick = () => { go(b.dataset.v); $("#side").classList.remove("is-open"); });
  }
  function go(v) {
    view = v; nav();
    const r = { dashboard, company, users: usersView };
    if (COLS[v]) collection(v); else if (SUBS[v]) submissions(v); else (r[v] || dashboard)();
    window.scrollTo(0, 0);
  }
  const toast = msg => { const t = $("#toast"); t.textContent = msg; t.classList.add("is-on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("is-on"), 2400); };

  /* ---------- Tổng quan ---------- */
  function dashboard() {
    $("#view-title").textContent = "Tổng quan";
    const n = t => S.submissions(t).filter(s => s.status === "Mới").length;
    const latest = S.submissions().slice(0, 8);
    $("#view").innerHTML = `
      <div class="cards">
        <div class="kpi"><div class="v">${S.list("projects", true).length}</div><div class="l">Dự án</div></div>
        <div class="kpi"><div class="v">${S.list("news", true).length}</div><div class="l">Bài viết</div></div>
        <div class="kpi"><div class="v">${S.list("jobs", true).length}</div><div class="l">Tin tuyển dụng</div></div>
        <div class="kpi warn"><div class="v">${n("contact") + n("partner") + n("application")}</div><div class="l">Yêu cầu mới chưa xử lý</div></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3 style="font-size:16px">Yêu cầu gần đây</h3></div>
        ${latest.length ? `<div class="table-wrap"><table><thead><tr><th>Thời gian</th><th>Loại</th><th>Người gửi</th><th>Liên hệ</th><th>Trạng thái</th></tr></thead><tbody>
          ${latest.map(s => `<tr><td>${fmtDT(s.createdAt)}</td><td>${esc(SUBS[s.type] ? SUBS[s.type].title : s.type)}</td><td>${esc(s.name)}</td><td>${esc(s.phone)}<br><small>${esc(s.email)}</small></td><td><span class="pill ${pillCls(s.status)}">${esc(s.status)}</span></td></tr>`).join("")}
        </tbody></table></div>` : `<div class="empty">Chưa có yêu cầu nào. Các biểu mẫu Liên hệ, Hợp tác và Ứng tuyển trên website sẽ hiển thị tại đây.</div>`}
      </div>`;
  }

  /* ---------- Bộ sưu tập nội dung ---------- */
  function collection(col) {
    const cfg = COLS[col];
    $("#view-title").textContent = cfg.title;
    const st = { q: "", f: {}, vis: "" };
    $("#view").innerHTML = `
      <div class="panel">
        <div class="panel-head">
          <input class="input" type="search" placeholder="Tìm kiếm…" id="c-q" aria-label="Tìm kiếm">
          ${cfg.filters.map(([k]) => `<select class="select" data-f="${k}" aria-label="Lọc ${k}"><option value="">Tất cả</option>${cfg.filters.find(f => f[0] === k)[1]().map(o => `<option>${esc(o)}</option>`).join("")}</select>`).join("")}
          <select class="select" id="c-vis" aria-label="Hiển thị"><option value="">Tất cả</option><option value="shown">Đang hiển thị</option><option value="hidden">Đang ẩn</option></select>
          <span class="spacer"></span>
          <button class="btn" type="button" id="c-export">Xuất CSV</button>
          <button class="btn btn--primary" type="button" id="c-add">+ Thêm ${cfg.noun}</button>
        </div>
        <div class="table-wrap" id="c-table"></div>
      </div>`;
    function rows() {
      const q = st.q.toLowerCase();
      return S.list(col, true).filter(it =>
        (!q || JSON.stringify(it).toLowerCase().includes(q)) &&
        Object.entries(st.f).every(([k, v]) => !v || it[k] === v) &&
        (!st.vis || (st.vis === "hidden") === !!it.hidden));
    }
    function draw() {
      const list = rows();
      $("#c-table").innerHTML = list.length ? `<table><thead><tr>${cfg.columns.map(c => `<th>${c[1]}</th>`).join("")}<th>Hiển thị</th><th>Thao tác</th></tr></thead><tbody>
        ${list.map(it => `<tr class="${it.hidden ? "is-hidden" : ""}">
          ${cfg.columns.map(([k, , t]) => `<td>${t === "img" ? `<img class="thumb" src="${esc(it[k])}" alt="">` : t === "date" ? esc(it[k] ? new Date(it[k]).toLocaleDateString("vi-VN") : "") : esc(it[k])}</td>`).join("")}
          <td>${it.hidden ? `<span class="pill pill--hidden">Đang ẩn</span>` : `<span class="pill pill--done">Hiển thị</span>`}</td>
          <td><div class="actions">
            <button class="btn btn--sm" data-a="edit" data-id="${esc(it.id)}">Sửa</button>
            <button class="btn btn--sm" data-a="toggle" data-id="${esc(it.id)}">${it.hidden ? "Hiện" : "Ẩn"}</button>
            <a class="btn btn--sm" href="${cfg.page}${col === "services" ? "#" : "?id="}${encodeURIComponent(it.id)}" target="_blank" rel="noopener">Xem</a>
            <button class="btn btn--sm btn--danger" data-a="del" data-id="${esc(it.id)}">Xóa</button>
          </div></td></tr>`).join("")}
      </tbody></table>` : `<div class="empty">Không có ${cfg.noun} phù hợp.</div>`;
      $$("#c-table [data-a]").forEach(b => b.onclick = () => {
        const items = S.list(col, true); const i = items.findIndex(x => x.id === b.dataset.id);
        if (b.dataset.a === "edit") editItem(col, items[i]);
        if (b.dataset.a === "toggle") { items[i].hidden = !items[i].hidden; S.save(col, items); toast(items[i].hidden ? "Đã ẩn" : "Đã hiển thị"); draw(); }
        if (b.dataset.a === "del" && confirm(`Xóa vĩnh viễn ${cfg.noun} “${items[i].name || items[i].title}”?`)) { items.splice(i, 1); S.save(col, items); toast("Đã xóa"); draw(); }
      });
    }
    $("#c-q").oninput = e => { st.q = e.target.value; draw(); };
    $$("[data-f]").forEach(s => s.onchange = () => { st.f[s.dataset.f] = s.value; draw(); });
    $("#c-vis").onchange = e => { st.vis = e.target.value; draw(); };
    $("#c-add").onclick = () => editItem(col, null);
    $("#c-export").onclick = () => exportCSV(`${col}.csv`, rows(), [["id", "ID"], ...cfg.fields.filter(f => f[0] !== "id").map(f => [f[0], f[1]])]);
    draw();
  }

  /* ---------- Form chỉnh sửa ---------- */
  const toText = (type, v) => {
    if (v == null) return "";
    if (type === "lines") return (v || []).join("\n");
    if (type === "kv") return Object.entries(v || {}).map(([k, x]) => `${k}: ${x}`).join("\n");
    if (type === "progress") return (v || []).map(p => `${p.date} | ${p.title} | ${p.state}`).join("\n");
    return v;
  };
  const fromText = (type, v) => {
    const lines = String(v || "").split("\n").map(s => s.trim()).filter(Boolean);
    if (type === "lines") return lines;
    if (type === "kv") return Object.fromEntries(lines.map(l => { const i = l.indexOf(":"); return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, ""]; }));
    if (type === "progress") return lines.map(l => { const [date, title, state] = l.split("|").map(s => (s || "").trim()); return { date, title, state: ["done", "current", "next"].includes(state) ? state : "done" }; });
    if (type === "number") return v === "" ? null : +v;
    return v;
  };

  function openDrawer(title, body, foot) {
    $("#drawer-title").textContent = title; $("#drawer-body").innerHTML = body; $("#drawer-foot").innerHTML = foot || "";
    $("#drawer").classList.add("is-open"); $("#drawer-bg").classList.add("is-open");
    const f = $("#drawer-body input, #drawer-body select, #drawer-body textarea"); f && f.focus();
  }
  function closeDrawer() { $("#drawer").classList.remove("is-open"); $("#drawer-bg").classList.remove("is-open"); }
  $$("[data-close]").forEach(b => b.onclick = closeDrawer);
  $("#drawer-bg").onclick = closeDrawer;
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  function editItem(col, item) {
    const cfg = COLS[col]; const isNew = !item; item = item || {};
    const html = `<form id="edit-form" novalidate>${cfg.fields.map(([k, label, type, o = {}]) => {
      const id = "f-" + k, v = toText(type, item[k]);
      let input;
      if (type === "textarea" || type === "lines" || type === "kv" || type === "progress") input = `<textarea class="textarea" id="${id}" name="${k}" rows="${type === "textarea" ? 4 : 5}">${esc(v)}</textarea>`;
      else if (type === "select") input = `<select class="select" id="${id}" name="${k}">${o.options().map(x => `<option ${x === v ? "selected" : ""}>${esc(x)}</option>`).join("")}</select>`;
      else if (type === "checkbox") return `<div class="row"><label><input type="checkbox" name="${k}" ${item[k] ? "checked" : ""}> ${label}</label></div>`;
      else if (type === "image") input = `<input class="input" id="${id}" name="${k}" value="${esc(v)}" placeholder="assets/img/…jpg"><input type="file" accept="image/*" data-img-for="${id}" style="margin-top:6px"><div class="help">Nhập đường dẫn ảnh hoặc tải ảnh lên (ảnh sẽ được thu nhỏ còn tối đa 1200px).</div>${v ? `<img class="img-prev" src="${esc(v)}" alt="">` : ""}`;
      else input = `<input class="input" id="${id}" name="${k}" type="${type === "number" ? "number" : type === "date" ? "date" : "text"}" value="${esc(v)}">`;
      return `<div class="row"><label class="lbl" for="${id}">${label}${o.required ? " *" : ""}</label>${input}${o.help ? `<div class="help">${o.help}</div>` : ""}</div>`;
    }).join("")}<div class="err" id="edit-err" role="alert"></div></form>`;
    openDrawer(isNew ? `Thêm ${cfg.noun}` : `Sửa ${cfg.noun}`, html, `<button class="btn" type="button" data-close2>Hủy</button><button class="btn btn--primary" type="button" id="edit-save">Lưu</button>`);
    $("[data-close2]").onclick = closeDrawer;
    $$("[data-img-for]").forEach(inp => inp.onchange = () => {
      const file = inp.files[0]; if (!file) return;
      const rd = new FileReader();
      rd.onload = () => {
        const im = new Image();
        im.onload = () => {
          const w = Math.min(1200, im.width), h = Math.round(im.height * w / im.width);
          const cv = document.createElement("canvas"); cv.width = w; cv.height = h; cv.getContext("2d").drawImage(im, 0, 0, w, h);
          const url = cv.toDataURL("image/jpeg", 0.8);
          const target = $("#" + inp.dataset.imgFor); target.value = url;
          let prev = target.parentElement.querySelector(".img-prev");
          if (!prev) { prev = document.createElement("img"); prev.className = "img-prev"; target.parentElement.appendChild(prev); }
          prev.src = url;
        };
        im.src = rd.result;
      };
      rd.readAsDataURL(file);
    });
    $("#edit-save").onclick = () => {
      const f = $("#edit-form"); const out = Object.assign({}, item);
      for (const [k, label, type, o = {}] of cfg.fields) {
        const el = f.elements[k];
        out[k] = type === "checkbox" ? el.checked : fromText(type, el.value.trim());
        if (o.required && !out[k]) { $("#edit-err").textContent = `Vui lòng nhập “${label}”.`; el.focus(); return; }
      }
      const items = S.list(col, true);
      out.id = slug(out.id || out.name || out.title);
      if (items.some(x => x.id === out.id && x.id !== item.id)) { $("#edit-err").textContent = "Đường dẫn (slug) đã tồn tại, vui lòng chọn tên khác."; return; }
      if (isNew) items.unshift(out); else items[items.findIndex(x => x.id === item.id)] = out;
      if (S.save(col, items)) { closeDrawer(); toast("Đã lưu"); collection(col); }
    };
  }

  /* ---------- Yêu cầu từ khách hàng ---------- */
  function submissions(type) {
    const cfg = SUBS[type];
    $("#view-title").textContent = cfg.title;
    const st = { q: "", status: "" };
    $("#view").innerHTML = `
      <div class="panel">
        <div class="panel-head">
          <input class="input" type="search" placeholder="Tìm tên, SĐT, email…" id="s-q" aria-label="Tìm kiếm">
          <select class="select" id="s-st" aria-label="Lọc trạng thái"><option value="">Mọi trạng thái</option>${SUB_STATUSES.map(s => `<option>${s}</option>`).join("")}</select>
          <span class="spacer"></span>
          <button class="btn" type="button" id="s-export">Xuất CSV</button>
        </div>
        <div class="table-wrap" id="s-table"></div>
      </div>`;
    const rows = () => S.submissions(type).filter(s => (!st.status || s.status === st.status) && (!st.q || JSON.stringify(s).toLowerCase().includes(st.q.toLowerCase())));
    const show = v => v && typeof v === "object" ? `${v.name} (${(v.size / 1024 / 1024).toFixed(2)} MB)` : v;
    function draw() {
      const list = rows();
      $("#s-table").innerHTML = list.length ? `<table><thead><tr><th>Thời gian</th>${cfg.fields.slice(0, 4).map(f => `<th>${f[1]}</th>`).join("")}<th>Trạng thái</th><th></th></tr></thead><tbody>
        ${list.map(s => `<tr><td>${fmtDT(s.createdAt)}</td>${cfg.fields.slice(0, 4).map(f => `<td>${esc(show(s[f[0]]))}</td>`).join("")}<td><span class="pill ${pillCls(s.status)}">${esc(s.status)}</span></td><td><button class="btn btn--sm" data-id="${esc(s.id)}">Chi tiết</button></td></tr>`).join("")}
      </tbody></table>` : `<div class="empty">Chưa có ${cfg.noun} nào.</div>`;
      $$("#s-table [data-id]").forEach(b => b.onclick = () => detail(S.submissions(type).find(x => x.id === b.dataset.id)));
    }
    function detail(s) {
      openDrawer(`Chi tiết ${cfg.noun}`, `<div class="detail"><dl>
          <dt>Thời gian gửi</dt><dd>${fmtDT(s.createdAt)}</dd>
          ${cfg.fields.map(f => `<dt>${f[1]}</dt><dd>${esc(show(s[f[0]])) || "—"}</dd>`).join("")}
          <dt>Trạng thái</dt><dd><select class="select" id="d-st">${SUB_STATUSES.map(x => `<option ${x === s.status ? "selected" : ""}>${x}</option>`).join("")}</select></dd>
          <dt>Ghi chú xử lý</dt><dd><textarea class="textarea" id="d-note">${esc(s.note || "")}</textarea></dd>
        </dl>${type === "application" ? `<p class="help" style="margin-top:14px">Bản demo chỉ lưu tên file CV. Khi có backend, file CV sẽ được lưu trên máy chủ và tải về tại đây.</p>` : ""}</div>`,
        `<button class="btn btn--danger" type="button" id="d-del">Xóa</button><span style="flex:1"></span><button class="btn" type="button" data-close3>Đóng</button><button class="btn btn--primary" type="button" id="d-save">Lưu</button>`);
      $("[data-close3]").onclick = closeDrawer;
      $("#d-save").onclick = () => { S.updateSubmission(s.id, { status: $("#d-st").value, note: $("#d-note").value }); closeDrawer(); toast("Đã cập nhật"); nav(); draw(); };
      $("#d-del").onclick = () => { if (confirm("Xóa vĩnh viễn mục này?")) { S.deleteSubmission(s.id); closeDrawer(); toast("Đã xóa"); nav(); draw(); } };
    }
    $("#s-q").oninput = e => { st.q = e.target.value; draw(); };
    $("#s-st").onchange = e => { st.status = e.target.value; draw(); };
    $("#s-export").onclick = () => exportCSV(`${type}.csv`, rows().map(r => Object.assign({}, r, { cv: show(r.cv), createdAt: fmtDT(r.createdAt) })), [["createdAt", "Thời gian"], ...cfg.fields, ["status", "Trạng thái"], ["note", "Ghi chú"]]);
    draw();
  }

  /* ---------- Thông tin công ty ---------- */
  function company() {
    $("#view-title").textContent = "Thông tin công ty";
    const c = S.company();
    const F = [["name", "Tên công ty"], ["shortName", "Tên ngắn"], ["slogan", "Slogan"], ["hotline", "Hotline"], ["email", "Email"], ["address", "Địa chỉ"], ["website", "Website"], ["workingHours", "Giờ làm việc"]];
    $("#view").innerHTML = `<div class="panel" style="padding:20px;max-width:720px"><form id="co-form">
      ${F.map(([k, l]) => `<div class="row"><label class="lbl" for="co-${k}">${l}</label><input class="input" id="co-${k}" name="${k}" value="${esc(c[k])}"></div>`).join("")}
      <button class="btn btn--primary" type="submit">Lưu thông tin</button>
      ${me.role === "admin" ? `<button class="btn btn--danger" type="button" id="co-reset" style="margin-left:8px">Khôi phục toàn bộ nội dung mặc định</button>` : ""}
    </form></div>`;
    $("#co-form").onsubmit = e => { e.preventDefault(); const n = Object.assign({}, c); F.forEach(([k]) => n[k] = e.target.elements[k].value.trim()); if (S.saveCompany(n)) toast("Đã lưu thông tin công ty"); };
    const r = $("#co-reset"); if (r) r.onclick = () => { if (confirm("Khôi phục toàn bộ dự án, tin tức, tuyển dụng, lĩnh vực và thông tin công ty về dữ liệu gốc? Các yêu cầu khách hàng vẫn được giữ.")) { S.resetAll(); toast("Đã khôi phục"); company(); } };
  }

  /* ---------- Tài khoản ---------- */
  async function usersView() {
    if (me.role !== "admin") return dashboard();
    $("#view-title").textContent = "Tài khoản & phân quyền";
    const list = await users();
    $("#view").innerHTML = `
      <div class="panel">
        <div class="panel-head"><span class="help">Quản trị viên: toàn quyền. Biên tập viên: quản lý nội dung và yêu cầu, không quản lý tài khoản.</span><span class="spacer"></span><button class="btn btn--primary" id="u-add" type="button">+ Thêm tài khoản</button></div>
        <div class="table-wrap"><table><thead><tr><th>Tên đăng nhập</th><th>Họ tên</th><th>Quyền</th><th></th></tr></thead><tbody>
          ${list.map(u => `<tr><td>${esc(u.username)}</td><td>${esc(u.name)}</td><td>${u.role === "admin" ? "Quản trị viên" : "Biên tập viên"}</td><td><div class="actions">
            <button class="btn btn--sm" data-pw="${esc(u.username)}">Đổi mật khẩu</button>
            ${u.username !== me.username ? `<button class="btn btn--sm btn--danger" data-del="${esc(u.username)}">Xóa</button>` : ""}</div></td></tr>`).join("")}
        </tbody></table></div>
      </div>`;
    $("#u-add").onclick = () => userForm();
    $$("[data-pw]").forEach(b => b.onclick = () => userForm(list.find(u => u.username === b.dataset.pw)));
    $$("[data-del]").forEach(b => b.onclick = async () => {
      if (!confirm(`Xóa tài khoản ${b.dataset.del}?`)) return;
      ls.set(USERS_KEY, (await users()).filter(u => u.username !== b.dataset.del)); toast("Đã xóa tài khoản"); usersView();
    });
  }
  function userForm(u) {
    openDrawer(u ? `Đổi mật khẩu – ${u.username}` : "Thêm tài khoản", `<form id="u-form" novalidate>
      ${u ? "" : `<div class="row"><label class="lbl" for="u-name">Tên đăng nhập *</label><input class="input" id="u-name" name="username" autocomplete="off"></div>
      <div class="row"><label class="lbl" for="u-full">Họ tên</label><input class="input" id="u-full" name="name"></div>
      <div class="row"><label class="lbl" for="u-role">Quyền</label><select class="select" id="u-role" name="role"><option value="editor">Biên tập viên</option><option value="admin">Quản trị viên</option></select></div>`}
      <div class="row"><label class="lbl" for="u-pass">Mật khẩu * (tối thiểu 8 ký tự)</label><input class="input" id="u-pass" name="pass" type="password" autocomplete="new-password"></div>
      <div class="err" id="u-err" role="alert"></div></form>`,
      `<button class="btn" type="button" data-close4>Hủy</button><button class="btn btn--primary" type="button" id="u-save">Lưu</button>`);
    $("[data-close4]").onclick = closeDrawer;
    $("#u-save").onclick = async () => {
      const f = $("#u-form").elements, list = await users(), err = $("#u-err");
      if (f.pass.value.length < 8) { err.textContent = "Mật khẩu tối thiểu 8 ký tự."; return; }
      if (u) { list.find(x => x.username === u.username).pass = await hash(f.pass.value); }
      else {
        const name = f.username.value.trim().toLowerCase();
        if (!/^[a-z0-9._-]{3,}$/.test(name)) { err.textContent = "Tên đăng nhập tối thiểu 3 ký tự, chỉ gồm chữ thường, số, . _ -"; return; }
        if (list.some(x => x.username === name)) { err.textContent = "Tên đăng nhập đã tồn tại."; return; }
        list.push({ username: name, name: f.name.value.trim(), role: f.role.value, pass: await hash(f.pass.value) });
      }
      ls.set(USERS_KEY, list); closeDrawer(); toast("Đã lưu tài khoản"); usersView();
    };
  }

  /* ---------- Xuất CSV ---------- */
  function exportCSV(name, rows, cols) {
    const cell = v => { if (v == null) v = ""; if (typeof v === "object") v = Array.isArray(v) ? v.map(x => typeof x === "object" ? Object.values(x).join(" | ") : x).join("; ") : Object.entries(v).map(([k, x]) => `${k}: ${x}`).join("; "); return `"${String(v).replace(/"/g, '""')}"`; };
    const csv = "﻿" + [cols.map(c => cell(c[1])).join(","), ...rows.map(r => cols.map(c => cell(r[c[0]])).join(","))].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- Đăng nhập ---------- */
  function showApp() {
    $("#login").hidden = true; $("#app").hidden = false;
    $("#who").textContent = `${me.name || me.username} · ${me.role === "admin" ? "Quản trị viên" : "Biên tập viên"}`;
    go("dashboard");
  }
  $("#login-form").onsubmit = async e => {
    e.preventDefault();
    const u = $("#l-user").value.trim().toLowerCase(), p = $("#l-pass").value;
    const list = await users(); const h = await hash(p);
    const found = list.find(x => x.username === u && x.pass === h);
    if (!found) { $("#l-err").textContent = "Tên đăng nhập hoặc mật khẩu không đúng."; return; }
    me = { username: found.username, name: found.name, role: found.role };
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(me)); } catch (err) {}
    showApp();
  };
  $("#logout").onclick = () => { try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {} location.reload(); };
  $("#menu-btn").onclick = () => $("#side").classList.toggle("is-open");

  /* Xuất toàn bộ nội dung hiện tại thành file data.js để thay file trên GitHub/hosting */
  $("#export-data").onclick = () => {
    const js = "/* =========================================================\n" +
      "   DỮ LIỆU NỘI DUNG WEBSITE – CÔNG TY XÂY LẮP CÁT TƯỜNG\n" +
      "   Xuất từ trang quản trị lúc " + new Date().toLocaleString("vi-VN") + "\n" +
      "   Thay file assets/js/data.js bằng file này để mọi người cùng thấy.\n" +
      "   ========================================================= */\n\n" +
      "window.CT_DEFAULTS = " + JSON.stringify(S.db, null, 2) + ";\n";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([js], { type: "text/javascript;charset=utf-8" }));
    a.download = "data.js";
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    alert("Đã tải file data.js.\n\nĐể mọi người cùng thấy nội dung mới: vào repo GitHub → thư mục assets/js → mở data.js → bấm biểu tượng ⋯ / Upload files → tải file vừa xuất lên thay thế → Commit changes.\n\nGitHub Pages sẽ cập nhật sau khoảng 1–2 phút.");
  };

  if (me) showApp(); else $("#login").hidden = false;
})();
