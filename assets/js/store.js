/* Lớp dữ liệu: đọc nội dung mặc định từ data.js, cộng thêm thay đổi
   do quản trị viên lưu trong trình duyệt (localStorage).
   Khi triển khai backend, chỉ cần thay các hàm trong file này bằng
   lời gọi API – các trang không phải sửa. */
(function () {
  const KEY = "ct_db_v1";
  const SUB_KEY = "ct_submissions_v1";

  function safeGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function safeSet(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { alert("Không lưu được dữ liệu (bộ nhớ trình duyệt đầy hoặc bị chặn)."); return false; }
  }

  const COLLECTIONS = ["services", "projects", "news", "jobs"];

  function load() {
    const base = JSON.parse(JSON.stringify(window.CT_DEFAULTS));
    const saved = safeGet(KEY);
    if (saved) {
      COLLECTIONS.forEach(c => { if (Array.isArray(saved[c])) base[c] = saved[c]; });
      if (saved.company) base.company = Object.assign(base.company, saved.company);
    }
    return base;
  }

  let db = load();

  const Store = {
    get db() { return db; },
    company() { return db.company; },
    /* includeHidden = true chỉ dùng trong trang quản trị */
    list(col, includeHidden) { return (db[col] || []).filter(x => includeHidden || !x.hidden); },
    find(col, id) { return (db[col] || []).find(x => x.id === id && !x.hidden); },
    save(col, items) {
      db[col] = items;
      const saved = safeGet(KEY) || {};
      saved[col] = items;
      return safeSet(KEY, saved);
    },
    saveCompany(c) {
      db.company = c;
      const saved = safeGet(KEY) || {};
      saved.company = c;
      return safeSet(KEY, saved);
    },
    resetAll() { try { localStorage.removeItem(KEY); } catch (e) {} db = load(); },

    /* Biểu mẫu khách hàng gửi: contact | partner | application */
    submissions(type) {
      const all = safeGet(SUB_KEY) || [];
      return type ? all.filter(s => s.type === type) : all;
    },
    addSubmission(type, data) {
      const all = safeGet(SUB_KEY) || [];
      const rec = Object.assign({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), type, createdAt: new Date().toISOString(), status: "Mới" }, data);
      all.unshift(rec);
      return safeSet(SUB_KEY, all) ? rec : null;
    },
    updateSubmission(id, patch) {
      const all = safeGet(SUB_KEY) || [];
      const i = all.findIndex(s => s.id === id);
      if (i >= 0) { Object.assign(all[i], patch); safeSet(SUB_KEY, all); }
    },
    deleteSubmission(id) {
      safeSet(SUB_KEY, (safeGet(SUB_KEY) || []).filter(s => s.id !== id));
    }
  };

  window.CTStore = Store;
})();
