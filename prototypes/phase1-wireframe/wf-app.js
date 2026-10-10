// ===================================================================
// Wireframe Watchtower Phase 1. Logic xử lý thật (API, lưu) KHÔNG có ở đây:
// mọi thao tác chỉ đổi dữ liệu mẫu trong bộ nhớ để xem trạng thái.
// ===================================================================

// ---------- Tham số wireframe ----------
const params = new URLSearchParams(location.search);
// Trạng thái wireframe nằm trong #hash dạng "lich.b.mau.cham.2.desktop.duoi.vi.du-lieu[.f]":
// trang Artifact chỉ nhận một #token chữ, số và . _ ~ -, không nhận ?query. ?query vẫn đọc cho bản chạy trên máy.
const TOKEN_KEYS = ["man", "v", "mau", "nhan", "logo", "kho", "nav", "lang", "tt"];
const HASH = location.hash.slice(1);
const FROM_HASH = /^[A-Za-z0-9._~-]+$/.test(HASH) ? HASH.split(".") : null;
const FRAME = params.has("frame") || FROM_HASH?.[TOKEN_KEYS.length] === "f";
const token = (st, frame) => TOKEN_KEYS.map((k) => st[k]).join(".") + (frame ? ".f" : "");
const SCREENS = {
  lich: { vi: "Lịch tuần", role: "owner", options: ["a", "b", "c", "d", "e"], rec: "b", states: ["du-lieu", "chua-vi-tri", "mo-dk", "cong-bo", "dang-tai", "rong", "loi"] },
  tre: { vi: "Đi trễ", role: "owner", options: ["a", "b"], rec: "a", states: ["du-lieu", "tuan-truoc", "dang-tai", "rong", "loi"] },
  ranh: { vi: "Lịch rảnh", role: "staff", options: ["a", "b"], rec: "a", states: ["du-lieu", "nhap", "chua-dk", "khoa", "khoa-quen", "dang-tai", "loi"] },
  ca: { vi: "Ca của tôi", role: "staff", options: ["a"], rec: "a", states: ["du-lieu", "chua-cong-bo", "dang-tai", "rong", "loi"] },
  nv: { vi: "Nhân viên", role: "owner", options: ["a"], rec: "a", states: ["du-lieu", "dang-tai", "rong", "loi"] },
  nk: { vi: "Nhật ký", role: "owner", options: ["a"], rec: "a", states: ["du-lieu", "dang-tai", "rong", "loi"] },
  dn: { vi: "Đăng nhập", role: "none", options: ["a"], rec: "a", states: ["du-lieu", "loi"] },
};
const STATE_LABEL = {
  "du-lieu": "Có dữ liệu", "mo-dk": "Đăng ký đang mở", "cong-bo": "Đã công bố", "dang-tai": "Đang tải", rong: "Rỗng", loi: "Lỗi",
  "tuan-truoc": "Tuần trước (chỉ xem)", "chua-dk": "Chưa chọn ca nào", khoa: "Đã khoá", "chua-cong-bo": "Chưa công bố",
  "chua-vi-tri": "Đã xếp ca, chưa giao vị trí", nhap: "Có nháp chưa lưu", "khoa-quen": "Đã khoá, quên bấm Lưu",
};
const S = { man: "lich", v: "", mau: "xam", nhan: "cham", logo: "2", kho: "desktop", nav: "duoi", lang: "vi", tt: "" };
for (const k of Object.keys(S)) if (params.get(k)) S[k] = params.get(k);
if (FROM_HASH) TOKEN_KEYS.forEach((k, i) => { if (FROM_HASH[i]) S[k] = FROM_HASH[i]; });
if (!SCREENS[S.man]) S.man = "lich";
const SC = SCREENS[S.man];
if (!SC.options.includes(S.v)) S.v = SC.rec;
if (!SC.states.includes(S.tt)) S.tt = SC.states[0];
Object.assign(document.documentElement.dataset, { mau: S.mau, nhan: S.nhan });
document.documentElement.lang = S.lang;
Object.assign(document.body.dataset, { kho: S.kho });
if (FRAME) document.body.dataset.frame = "1";

const L = (vi, en) => (S.lang === "en" ? en : vi);
const OPT = S.v;
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const cx = (...a) => a.filter(Boolean).join(" ");
const ic = (n, c = "size-4") => `<i data-lucide="${n}" class="${c} shrink-0" aria-hidden="true"></i>`;
const vnd = (n) => n.toLocaleString("vi-VN") + " đ";

// ---------- Mẫu component (chép công thức từ components/*.md) ----------
const BTN_BASE = "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl min-h-10 px-4 py-2 text-sm font-medium transition-colors max-w-full text-center leading-tight outline-hidden disabled:cursor-not-allowed disabled:opacity-50";
const BTN = {
  outline: "border border-border-strong bg-surface text-foreground hover:bg-button-hover",
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-secondary text-foreground hover:bg-secondary-hover",
  ghost: "bg-transparent text-muted hover:bg-foreground/5 hover:text-foreground",
  danger: "bg-danger-bg text-danger hover:bg-danger-bg-hover",
};
const btn = (v, label, { icon, attrs = "", extra = "" } = {}) =>
  `<button type="button" class="${cx(BTN_BASE, BTN[v], extra)}" ${attrs}>${icon ? ic(icon) : ""}${label}</button>`;
const iconBtn = (name, label, attrs = "", extra = "") =>
  `<button type="button" aria-label="${esc(label)}" title="${esc(label)}" class="${cx("inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors outline-hidden hover:bg-foreground/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent", extra)}" ${attrs}>${ic(name)}</button>`;
const INPUT = "h-11 w-full rounded-xl border border-border-strong bg-surface px-4 text-base text-foreground outline-hidden transition-colors placeholder:text-muted focus:border-focus focus:ring-2 focus:ring-focus md:h-10 md:text-sm";
const TONE = { ok: "bg-ok-bg text-ok", warn: "bg-warn-bg text-warn", err: "bg-err-bg text-err", neutral: "bg-neutral-bg text-neutral" };
const badge = (tone, text, icon) =>
  `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-black/5 ${TONE[tone]}">${icon ? ic(icon, "size-3.5") : '<span class="size-1.5 rounded-full bg-current"></span>'}${text}</span>`;
function cb({ checked = false, indet = false, disabled = false, attrs = "", small = true } = {}) {
  const size = small ? "size-4 rounded" : "size-5 rounded-md";
  return `<span class="relative inline-flex shrink-0"><input type="checkbox" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} ${indet ? 'data-indet="1"' : ""} ${attrs}
    class="peer ${size} cursor-pointer appearance-none border-[1.5px] border-border-strong bg-surface outline-hidden transition-colors not-checked:not-indeterminate:hover:border-foreground checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary disabled:cursor-not-allowed disabled:opacity-50" />
    <i data-lucide="check" class="pointer-events-none absolute inset-0 m-auto ${small ? "size-3" : "size-3.5"} stroke-[3] text-primary-foreground opacity-0 peer-checked:opacity-100"></i>
    <i data-lucide="minus" class="pointer-events-none absolute inset-0 m-auto ${small ? "size-3" : "size-3.5"} stroke-[3] text-primary-foreground opacity-0 peer-indeterminate:opacity-100"></i></span>`;
}
const segmented = (items, current, onclick, label) =>
  `<div role="tablist" aria-label="${esc(label)}" class="inline-flex w-fit max-w-full shrink-0 gap-1 rounded-xl bg-foreground/5 p-1 shadow-(--shadow-segment-track)">${items
    .map(([v, t]) => `<button type="button" role="tab" aria-selected="${v === current}" onclick="${onclick}('${v}')" class="${cx("h-8 cursor-pointer whitespace-nowrap rounded-lg px-3 text-sm font-medium outline-hidden transition-[color,background-color,box-shadow] duration-150", v === current ? "bg-surface text-foreground shadow-(--shadow-segment-thumb)" : "text-foreground/75 hover:text-foreground")}">${t}</button>`)
    .join("")}</div>`;
const boxedTabs = (items, current, onclick, label) =>
  `<div class="scrollbar-clean overflow-x-auto py-0.5"><div role="tablist" aria-label="${esc(label)}" class="flex w-max gap-1 px-1">${items
    .map(([v, t, extra]) => `<button type="button" role="tab" aria-selected="${v === current}" onclick="${onclick}(${JSON.stringify(v)})" class="${cx("inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-transparent px-3 text-sm font-medium whitespace-nowrap outline-hidden transition-colors", v === current ? "bg-secondary text-foreground" : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground")}">${t}${extra ? `<span class="text-xs font-normal tabular-nums text-foreground/70">${extra}</span>` : ""}</button>`)
    .join("")}</div></div>`;
const underlineTabs = (items, current, onclick, label) =>
  `<div role="tablist" aria-label="${esc(label)}" class="flex gap-2">${items
    .map(([v, t, n]) => `<button type="button" role="tab" aria-selected="${v === current}" onclick="${onclick}('${v}')" class="${cx("relative box-content inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl px-2 pb-px text-sm font-medium outline-hidden after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full", v === current ? "text-foreground after:bg-foreground" : "text-foreground/70 after:bg-transparent hover:text-foreground")}">${t}${n != null ? `<span class="text-xs font-normal tabular-nums text-foreground/70">${n}</span>` : ""}</button>`)
    .join("")}</div>`;
const selectBtn = (label, value, attrs = "", extra = "") =>
  `<button type="button" ${attrs} class="${cx("group inline-flex h-10 w-fit max-w-full cursor-pointer items-center gap-2 rounded-xl border border-border-strong bg-surface px-3.5 text-sm outline-hidden transition-colors aria-expanded:border-focus aria-expanded:ring-2 aria-expanded:ring-focus", extra)}">${label ? `<span class="text-muted">${label}</span>` : ""}<span class="truncate font-medium text-foreground">${value}</span>${ic("chevron-down", "size-4 text-muted transition-transform group-aria-expanded:rotate-180")}</button>`;
const skel = (w, h = "h-3") => `<div class="${h} ${w} animate-pulse rounded-full bg-foreground/5 motion-reduce:animate-none"></div>`;
const errorBlock = (title, why) => `<div role="alert" class="flex flex-col items-center gap-3 py-10 text-center"><div><p class="text-sm font-medium text-err-text">${title}</p><p class="mt-1 text-sm text-muted">${why}</p></div>${btn("outline", L("Thử lại", "Try again"), { icon: "rotate-cw" })}</div>`;
const emptyLine = (t) => `<p class="py-6 text-center text-sm text-muted">${t}</p>`;

// Màu vị trí
const pn = (pid) => POS[pid].n;
const posName = (pid) => L(POS[pid].vi, POS[pid].en);
const subName = (pid, sid) => { const x = POS[pid].subs.find((s) => s[0] === sid); return x ? L(x[1], x[2]) : ""; };
function posLabel(pos, sub = []) {
  if (!pos || !pos.length) return L("Chưa có vị trí", "No position yet");
  return pos.map((p, i) => { const subs = sub.filter((s) => POS[p].subs.some((x) => x[0] === s)).map((s) => subName(p, s)); return posName(p) + (subs.length ? " - " + subs.join(", ") : ""); }).join(" + ");
}
const posDot = (pid, c = "size-2") => `<span class="${c} shrink-0 rounded-full bg-p${pn(pid)}-dot" aria-hidden="true"></span>`;
const dayShort = (d) => L(WEEK[d].vi, WEEK[d].en);
const dayFull = (d) => `${dayShort(d)} ${WEEK[d].date}/10`;
const pTime = (p) => `${PERIODS[p].from.slice(0, 2)}–${PERIODS[p].to.slice(0, 2)}`;

// ---------- Logo ----------
const MARKS = {
  1: '<path d="M4 6.5 7.6 18 12 9.5 16.4 18 20 6.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  2: '<rect x="4" y="4.5" width="11" height="4" rx="2"/><rect x="9" y="10" width="11" height="4" rx="2"/><rect x="4" y="15.5" width="7" height="4" rx="2"/>',
  3: '<path d="M7 4h10a3 3 0 0 1 3 3v3.5A9.5 9.5 0 0 0 10.5 20H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"/><circle cx="17" cy="17" r="3"/>',
};
const mark = (c = "size-5") => `<svg viewBox="0 0 24 24" fill="currentColor" class="${c}" aria-hidden="true">${MARKS[S.logo] || MARKS[2]}</svg>`;
const brand = (withName = true) => `<span class="flex min-w-0 items-center gap-2.5"><span class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">${mark()}</span>${withName ? '<span class="truncate text-sm font-semibold text-foreground">Watchtower</span>' : ""}</span>`;

// ---------- Trạng thái giao diện ----------
const ui = {
  view: "week", start: 0, weekOff: 0, panel: null, sel: new Set(), q: "", pop: null, dialog: null,
  rosterDay: 2, mDay: 2, sheet: null, posPick: [], subPick: [], skipped: new Map(),
  lateDay: 2, lateEdit: null, lateVal: "", staffEdit: null, nvTab: "list", drawer: false, shiftTab: "time",
  // Lịch tuần: undo/redo chỉ trong phiên (hist/fut), người thêm thủ công theo thứ tự thêm (manual), mục panel đang thu (secClosed)
  hist: [], fut: [], manual: new Map(), seq: 0, secClosed: new Set(), saveAs: "reg", panelMsg: "", needCopied: false,
  // Lịch rảnh: bản nháp (ranh, custom, notes) và bản đã Lưu (…Saved). Chủ quán chỉ thấy bản đã Lưu.
  ranh: MY_REG.map((x) => (x ? x.slice() : null)), custom: structuredClone(MY_CUSTOM), notes: { ...MY_NOTES }, noteOpen: new Set(),
};
ui.ranhSaved = structuredClone(ui.ranh); ui.customSaved = structuredClone(ui.custom); ui.notesSaved = { ...ui.notes }; ui.savedAt = L("20:14 T5 8/10", "20:14 Thu 8 Oct");

// ---------- Dữ liệu tuần theo trạng thái ----------
const DATA = structuredClone(WEEK_DATA);
if (S.tt === "mo-dk" || S.tt === "rong") for (const s of STAFF) DATA.asg[s.id] = WEEK.map(() => ({}));
if (S.tt === "rong") for (const s of STAFF) { DATA.reg[s.id] = WEEK.map(() => null); }
if (S.tt === "chua-vi-tri") for (const s of STAFF) for (const day of DATA.asg[s.id]) for (const k in day) { day[k].pos = []; day[k].sub = []; }
if (S.tt === "cong-bo") {
  for (const s of STAFF) for (const day of DATA.asg[s.id]) for (const k in day) if (!day[k].pos.length) day[k].pos = [s.q[0] || "pv"];
  DATA.asg.s20[5] = { 4: { pos: ["pv"], sub: [] } };
  ui.skipped.set("s17", L("Đăng ký quá ít ca", "Registered too few shifts"));
}
// Số người cần theo ngày × ca × vị trí (FR-O1), sửa được ở mục Phân công; tổng hiện ở đầu ô lịch.
const needFrom = (n) => { const o = Object.fromEntries(POSITIONS.map((p) => [p.id, 0])); NEED_FILL.slice(0, n).forEach((id) => o[id]++); return o; };
ui.need = NEED.map((row) => row.map(needFrom));
const PREV_NEED = NEED.map((row) => row.map((n, p) => needFrom(n + (p === 4 ? 1 : 0))));
const needTotal = (d, p) => Object.values((ui.weekOff < 0 ? PREV_NEED : ui.need)[d][p]).reduce((a, b) => a + b, 0);
const W = () => (ui.weekOff < 0 ? PREV_WEEK : DATA);
const isEmptyWeek = S.tt === "rong";
const typeOf = (s) => (isEmptyWeek ? "some" : s.type);
// Mặc định lịch không hiện người không đăng ký gì, kể cả người đã có ca (góp ý 10/10); họ vẫn tính là rảnh (FR-S19),
// vẫn tính vào số đã xếp ở đầu ô, và bật lại được trong Bộ lọc ("Chưa đăng ký, tính là rảnh").
const DEFAULT_SEL = new Set(ACTIVE.filter((s) => typeOf(s) !== "none").map((s) => s.id));
ui.sel = new Set(DEFAULT_SEL);
const customAt = (s, d) => (isEmptyWeek ? null : W().custom?.[s.id]?.[d] || null);
const noteAt = (s, d) => (isEmptyWeek ? "" : W().note?.[s.id]?.[d] || "");
// Giờ tính lương (RULES trong wf-data.js): trọn Ca 5 tính tới 24:00; còn lại chặn ở 23:00.
const hm = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
// custom = giờ riêng: luôn chặn ở 23:00 và là ca không tiêu chuẩn.
function paidH(from, to, custom = false) {
  const f = hm(from), t = hm(to), full5 = !custom && f <= hm(PERIODS[4].from) && t >= hm(PERIODS[4].to);
  return Math.max(0, (full5 ? hm(RULES.ca5PaidUntil) : Math.min(t, hm(RULES.capAt))) - f) / 60;
}
const ph = (p) => (p === 4 ? paidH(PERIODS[4].from, PERIODS[4].to) : PERIODS[p].h);
// cu = giờ riêng của ngày theo từng ca: { [p]: { from, to } }
const dayHours = (list, cu) => (list || []).reduce((a, p) => a + (cu?.[p] ? paidH(cu[p].from, cu[p].to, true) : ph(p)), 0);
const dayExempt = (list, cu) => RULES.ca5Exempt && !!list && list.includes(4) && !cu?.[4];
const dayUnder = (list, cu) => { const h = dayHours(list, cu); return h > 0 && h < RULES.minDayH && !dayExempt(list, cu); };
const TIMES = Array.from({ length: 73 }, (_, i) => `${String(6 + Math.floor(i / 4)).padStart(2, "0")}:${String((i % 4) * 15).padStart(2, "0")}`); // 06:00–24:00
const fmtH = (h) => (Number.isInteger(h) ? String(h) : L(String(h).replace(".", ","), String(h)));
function regKind(s, d, p) {
  if (s.left) return "no";
  const t = typeOf(s);
  if (t === "none") return "free";
  if (t === "all") return "reg";
  const r = W().reg[s.id][d];
  return r && r.includes(p) ? "reg" : "no";
}
const asgAt = (s, d, p) => W().asg[s.id][d][p];
const canWork = (s, d, p) => regKind(s, d, p) !== "no";
const inRange = (s, days) => days.some((d) => PERIODS.some((p) => canWork(s, d, p.i) || asgAt(s, d, p.i)));
// Người không đăng ký: h = null (rảnh cả tuần, không có số giờ để so).
const regHours = (s) => { const t = typeOf(s); if (t === "none") return { days: 7, h: null }; if (t === "all") return { days: 7, h: 7 * dayHours([0, 1, 2, 3, 4]) }; let days = 0, h = 0; for (let d = 0; d < 7; d++) { const r = W().reg[s.id][d]; if (r) { days++; h += dayHours(r, customAt(s, d)); } } return { days, h }; };
const regDays8 = (s) => { if (typeOf(s) !== "some") return 7; let n = 0; for (let d = 0; d < 7; d++) { const r = W().reg[s.id][d]; if (r && !dayUnder(r, customAt(s, d))) n++; } return n; };
const isShort = (s) => typeOf(s) === "some" && regDays8(s) < RULES.minDays;
function runsOf(s, d) {
  const day = W().asg[s.id][d]; const runs = [];
  for (let p = 0; p < 5; p++) {
    const a = day[p]; if (!a) continue;
    const sig = a.pos.join() + "|" + a.sub.join() + "|" + (a.t ? a.t.from + a.t.to : "");
    const last = runs[runs.length - 1];
    if (last && last.to === p - 1 && last.sig === sig) last.to = p; else runs.push({ from: p, to: p, sig, a });
  }
  return runs;
}
// Giờ của một ca đã xếp: giờ riêng nếu xếp theo giờ đăng ký, không thì giờ ca gốc.
const runTime = (r) => r.a.t || { from: PERIODS[r.from].from, to: PERIODS[r.to].to };
const placedStats = (s) => { let shifts = 0, h = 0; for (let d = 0; d < 7; d++) { const r = runsOf(s, d); shifts += r.length; for (const x of r) { const t = runTime(x); h += paidH(t.from, t.to, !!x.a.t); } } return { shifts, h }; };
const runAt = (s, d, p) => runsOf(s, d).find((r) => p >= r.from && p <= r.to);
const placedCount = (d, p) => STAFF.filter((s) => asgAt(s, d, p)).length;
const freeCount = (d, p) => ACTIVE.filter((s) => canWork(s, d, p) && !asgAt(s, d, p)).length;
const readOnly = () => S.tt === "mo-dk" || ui.weekOff < 0;
const published = () => S.tt === "cong-bo" || ui.weekOff < 0;
const visibleDays = () => (ui.view === "week" ? [0, 1, 2, 3, 4, 5, 6] : ui.view === "3d" ? [ui.start, ui.start + 1, ui.start + 2].filter((d) => d < 7) : [ui.start]);

// ===================================================================
// Thanh công cụ wireframe + khung lý do
// ===================================================================
const link = (k, v) => `#${token({ ...S, [k]: v })}`;
const linkMan = (m) => `#${token({ ...S, man: m, v: SCREENS[m].rec, tt: SCREENS[m].states[0] })}`;
addEventListener("hashchange", () => location.reload());
function buildBar() {
  const opts = SC.options.map((o) => `<a data-value="${o}" href="${link("v", o)}" ${o === S.v ? 'aria-current="page"' : ""} ${o === SC.rec ? "data-recommended" : ""} title="${esc((REASONS[S.man]?.[o]?.name) || o.toUpperCase())}">${o.toUpperCase()}</a>`).join("");
  const set = (k, items) => `<span class="wf-set" data-wf-param="${k}">${items.map(([v, h, t]) => `<a data-value="${v}" href="${link(k, v)}" ${S[k] === v ? 'aria-current="page"' : ""} ${t ? `title="${t}" aria-label="${t}"` : ""}>${h}</a>`).join("")}</span>`;
  const mon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;
  const phone = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>`;
  const chev = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
  const logoItem = (n) => [String(n), `<span class="wf-logo"><svg viewBox="0 0 24 24" fill="currentColor">${MARKS[n]}</svg></span>`, `Logo ${n}`];
  document.getElementById("wf-bar").innerHTML = `
    <details class="wf-menu" data-menu="man"><summary><span>Màn:</span><b>${SC.vi}</b>${chev}</summary>
      <div class="wf-popover"><div class="wf-cap">Chủ quán</div>${["lich", "tre", "nv", "nk"].map((m) => `<a href="${linkMan(m)}" ${m === S.man ? 'aria-current="page"' : ""}>${SCREENS[m].vi}</a>`).join("")}
      <div class="wf-sep"></div><div class="wf-cap">Nhân viên</div>${["ranh", "ca"].map((m) => `<a href="${linkMan(m)}" ${m === S.man ? 'aria-current="page"' : ""}>${SCREENS[m].vi}</a>`).join("")}
      <div class="wf-sep"></div><a href="${linkMan("dn")}" ${S.man === "dn" ? 'aria-current="page"' : ""}>Đăng nhập</a></div></details>
    <div class="wf-group"><span>Phương án</span><span class="wf-set" data-wf-param="v">${opts}</span></div>
    <a class="wf-switch" role="switch" aria-checked="${S.mau === "mau"}" href="${link("mau", S.mau === "mau" ? "xam" : "mau")}">Màu <i></i></a>
    ${set("nhan", [["cham", "<i></i>", "Chàm"], ["duong", "<i></i>", "Xanh dương"], ["cam", "<i></i>", "Cam"]])}
    <div class="wf-group"><span>Logo</span>${set("logo", [logoItem(1), logoItem(2), logoItem(3)])}</div>
    ${set("kho", [["desktop", mon + "Desktop"], ["mobile", phone + "Mobile"]])}
    ${S.kho === "mobile" && SC.role !== "none" ? set("nav", [["duoi", "Thanh dưới"], ["menu", "☰ Menu"]]) : ""}
    ${set("lang", [["vi", "VI"], ["en", "EN"]])}
    <details class="wf-menu" data-menu="tt"><summary><span>Trạng thái:</span><b>${STATE_LABEL[S.tt]}</b>${chev}</summary>
      <div class="wf-popover">${SC.states.map((t) => `<a href="${link("tt", t)}" ${t === S.tt ? 'aria-current="page"' : ""}>${STATE_LABEL[t]}</a>`).join("")}</div></details>`;
  for (const menu of document.querySelectorAll(".wf-menu")) {
    menu.addEventListener("toggle", () => {
      const r = menu.querySelector("summary").getBoundingClientRect();
      Object.assign(menu.querySelector(".wf-popover").style, { top: `${r.bottom + 6}px`, left: `${Math.min(r.left, innerWidth - 200)}px` });
      if (menu.open) for (const m of document.querySelectorAll(".wf-menu")) if (m !== menu) m.open = false;
    });
  }
  document.addEventListener("click", (e) => { for (const m of document.querySelectorAll(".wf-menu")) if (!m.contains(e.target)) m.open = false; });
}

const REASONS = {
  lich: {
    a: { name: "A · Danh sách nhân viên + lịch tuần + panel", why: "Giống Google Calendar khách đã quen: chọn người bên trái, thấy ô thiếu người trên lịch, bấm tên mở panel xếp ngay cạnh lịch.",
      pros: ["Danh sách nhân viên và bộ lọc luôn thấy (FR-O11 là phần khách sửa nhiều nhất)", "Panel nằm cạnh lịch, không che ô đang xếp", "Ô thiếu người tô hổ phách, đọc ra ngay ca cần thêm"],
      cons: ["Ba cột cùng mở ở 1280px: mỗi ngày còn khoảng 80px, biệt danh dài xếp một tên một hàng", "Ô đông người làm lịch tuần cao, phải cuộn"],
      fit: "Chủ quán ngồi máy tính xếp cả tuần, hay lọc theo người hay theo vị trí.",
      tips: ["Thu danh sách nhân viên khi mở panel", "Bỏ số rảnh ở đầu ô", "Ô thiếu người nổi hơn nữa", "Thêm màu ở header"] },
    b: { name: "B · Lịch rộng, nhân viên trong nút lọc", rec: true, why: "Lịch chiếm hết bề ngang; danh sách nhân viên và bộ lọc gộp vào một nút lọc trên thanh công cụ.",
      pros: ["Mỗi ngày rộng gần gấp rưỡi A, hai ba biệt danh một hàng, lịch thấp hơn", "Màn gọn nhất khi chỉ xếp người"],
      cons: ["Muốn lọc phải mở nút; ngoài lịch chỉ có chấm trên nút báo đang lọc", "Bấm tên để chỉ hiện một người thành hai bước"],
      fit: "Chủ quán ít lọc, chủ yếu nhìn cả quán.",
      tips: ["Hiện số người đang lọc trên nút", "Đưa bộ lọc ra ngoài thành chip"] },
    c: { name: "C · Ngày là hàng, ca là cột", why: "Mỗi ngày một hàng ngang, năm ca thành năm cột rộng: đọc một ngày từ sáng tới tối như một dòng thời gian.",
      pros: ["Cột ca rộng hơn cột ngày của A, ít xuống hàng", "Đầu mỗi hàng có tổng của ngày, liếc dọc thấy ngày nào thiếu"],
      cons: ["Khác Google Calendar khách đã xem", "Cả tuần là bảy hàng cao, phải cuộn nhiều hơn A"],
      fit: "Chủ quán xếp theo từng ngày, ít so ngày này với ngày kia.",
      tips: ["Cho hàng ngày thu gọn được", "Bỏ tổng đầu hàng"] },
    d: { name: "D · A gọn chữ", why: "Như A, mỗi ô chỉ còn số đã xếp/cần và biệt danh; giờ và số rảnh dời vào panel và mục Ai đăng ký.",
      pros: ["Đầu ô chỉ một con số, mắt dừng ở ô thiếu", "Danh sách nhân viên chỉ còn tên"],
      cons: ["Muốn biết còn bao nhiêu người rảnh phải mở Ai đăng ký"], fit: "Khi A nhìn còn nhiều chữ.",
      tips: ["Trả lại số rảnh", "Giữ D cho mobile"] },
    e: { name: "E · A bỏ lặp", why: "Như A, mỗi thông tin một chỗ: giờ của từng người chỉ ở panel, số rảnh chỉ ở đầu ô lịch, Ai đăng ký không lặp hàng tổng.",
      pros: ["Không có con số nào xuất hiện hai lần trên màn", "Danh sách nhân viên và bảng Ai đăng ký nhẹ hơn"],
      cons: ["So giờ giữa các người phải mở panel từng người"], fit: "Khi muốn gọn mà vẫn giữ số rảnh trên lịch.",
      tips: ["Trả lại giờ trong danh sách nhân viên"] },
  },
  tre: {
    a: { name: "A · Danh sách ca trong ngày", rec: true, why: "Chủ quán ghi trễ ngay trong ca, nên mở ra là danh sách ca hôm nay theo giờ, ca bất thường lên đầu.",
      pros: ["Đúng giờ là mặc định, chỉ bấm khi có người trễ", "Gõ giờ đến là thấy ngay kết quả: phút trễ, mức, ảnh hưởng thưởng", "Tóm tắt tuần nằm cạnh, không phải chuyển màn"],
      cons: ["Xem cả tuần của một người phải đổi ngày"], fit: "Ghi trễ trong lúc làm, nhất là trên điện thoại.",
      tips: ["Bỏ cột tóm tắt tuần", "Ẩn ca chưa tới giờ", "Thêm màu ở mức trễ"] },
    b: { name: "B · Bảng người × ngày", why: "Mỗi người một hàng, bảy ngày bảy cột: thấy cả tuần đi trễ của từng người.",
      pros: ["Thấy ngay ai trễ nhiều ngày", "Tổng trễ và thưởng nằm cuối mỗi hàng"],
      cons: ["Ghi giờ phải mở hộp, chậm hơn A", "Trên điện thoại bảy cột thành danh sách theo người"], fit: "Rà lại cuối tuần hơn là ghi trong ca.",
      tips: ["Làm nổi cột hôm nay", "Thêm lọc chỉ người có trễ"] },
  },
  ranh: {
    a: { name: "A · Mỗi ngày một hàng", rec: true, why: "Nhân viên dùng điện thoại: mỗi ngày một hàng, năm nút ca to vừa ngón tay, tổng giờ ngay cạnh.",
      pros: ["Nút ca 44px; chọn xong bấm Lưu mới gửi cho chủ quán","Hạn khoá và tổng tuần luôn ở trên cùng và dưới cùng", "Cảnh báo dưới 8 tiếng nằm đúng ngày đó"],
      cons: ["Không thấy cả tuần dạng lưới"], fit: "Nhân viên đăng ký trên điện thoại.",
      tips: ["Chữ giờ trên nút to hơn", "Bỏ nút Rảnh cả tuần"] },
    b: { name: "B · Lưới tuần", why: "Bảy cột ngày, năm hàng ca, như một thời khoá biểu: thấy cả tuần trong một khung.",
      pros: ["Nhìn một lần thấy cả tuần", "Gần cách khách xem lịch quán"],
      cons: ["Trên điện thoại mỗi ô chỉ khoảng 42px, dễ chạm nhầm", "Giờ ca nằm ở cột trái, xa ô đang chạm"], fit: "Nhân viên đăng ký trên máy tính.",
      tips: ["Ô to hơn", "Thêm giờ vào từng ô"] },
  },
  ca: { a: { name: "A · Ca theo ngày", rec: true, why: "Một màn duy nhất bố cục mặc định: tuần này theo ngày, ca hôm nay đánh dấu, tổng giờ và lương ước tính trên cùng.", pros: ["Đọc trong năm giây"], cons: ["Không xem được tuần trước quá một tuần"], fit: "Nhân viên mở xem nhanh.", tips: ["Bỏ lương ước tính"] } },
  nv: { a: { name: "A · Bảng nhân viên + panel hồ sơ", rec: true, why: "Bố cục mặc định của bảng quản lý: tìm, bảng, bấm một dòng mở hồ sơ trượt từ phải.", pros: ["Mật khẩu là một ô trong hồ sơ (FR-A7)", "Lương theo vị trí ở tab riêng"], cons: ["Bảng rộng, dưới 1024px thành dòng"], fit: "Quản lý khoảng 40 tài khoản.", tips: ["Thêm cột biệt danh"] } },
  nk: { a: { name: "A · Bảng nhật ký", rec: true, why: "Bố cục mặc định: lọc theo người và loại việc, mỗi dòng ai, lúc nào, trước → sau, lý do.", pros: ["Trả lời được vì sao một ca đã đổi"], cons: ["Dòng dài, mobile thành thẻ"], fit: "Tra lại khi có thắc mắc.", tips: ["Nhóm theo ngày"] } },
  dn: { a: { name: "A · Đăng nhập một cột", rec: true, why: "Bố cục mặc định của màn xác thực: logo, tên đăng nhập, mật khẩu. Không có quên mật khẩu tự phục vụ (FR-A7).", pros: ["Đủ và ít chữ"], cons: [], fit: "Mọi người dùng.", tips: ["Thêm chọn ngôn ngữ ở giữa"] } },
};
function buildReason() {
  const r = REASONS[S.man][S.v];
  const svgCopy = `<svg data-icon="chep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><svg data-icon="da-chep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
  const el = document.getElementById("wf-reason");
  el.innerHTML = `<summary><span class="wf-reason-name">${r.name}</span>${r.rec ? '<span class="wf-reason-tag">Khuyên dùng</span>' : ""}<span class="wf-reason-why">${r.why}</span>
    <span class="wf-reason-toggle"><span>Ưu, nhược</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></summary>
    <div class="wf-reason-body"><div class="wf-reason-cols">
      <section><h3><i data-tone="uu"></i>Ưu</h3><ul>${r.pros.map((x) => `<li>${x}</li>`).join("")}</ul></section>
      <section><h3><i data-tone="nhuoc"></i>Nhược</h3><ul>${r.cons.map((x) => `<li>${x}</li>`).join("") || "<li>—</li>"}</ul></section>
      <section><h3><i></i>Hợp khi</h3><p>${r.fit}</p></section></div>
      <div class="wf-reason-tips"><h3>Gợi ý góp ý</h3>${r.tips.map((t) => `<button type="button" data-copy="${esc(t)}">${t}${svgCopy}</button>`).join("")}</div></div>`;
  for (const b of el.querySelectorAll("[data-copy]")) b.addEventListener("click", async () => { try { await navigator.clipboard.writeText(b.dataset.copy); } catch {} b.setAttribute("data-copied", ""); setTimeout(() => b.removeAttribute("data-copied"), 1500); });
}

// ===================================================================
// Khung app
// ===================================================================
const OWNER_NAV = () => [["lich", "calendar-days", L("Lịch tuần", "Schedule")], ["tre", "alarm-clock", L("Đi trễ", "Lateness")], ["nv", "users", L("Nhân viên", "Staff")], ["nk", "history", L("Nhật ký", "Activity log")]];
const STAFF_NAV = () => [["ranh", "calendar-check", L("Lịch rảnh", "Availability")], ["ca", "calendar-clock", L("Ca của tôi", "My shifts")]];
const ME = () => (SC.role === "owner" ? { name: "Trương Hữu Phúc", user: "phuc.owner", init: "P" } : { name: "Huỳnh Ngọc Trâm", user: "tram.huynh", init: "T" });
function appShell(content, title) {
  const nav = SC.role === "owner" ? OWNER_NAV() : STAFF_NAV();
  const me = ME();
  const desktopNav = nav.map(([m, i, t]) => `<a href="${linkMan(m)}" ${m === S.man ? 'aria-current="page"' : ""} class="${cx("inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium outline-hidden transition-colors", m === S.man ? "bg-secondary text-foreground" : "text-foreground/70 hover:bg-item-hover hover:text-foreground")}">${ic(i)}${t}</a>`).join("");
  const avatar = `<span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-p2-bg text-sm font-semibold text-p2-tx">${me.init}</span>`;
  const bottom = S.nav === "duoi";
  return `
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-30 hidden h-16 shrink-0 items-center gap-6 border-b border-border bg-surface px-6 lg:flex" data-wf-block="1">
      ${brand()}
      <nav class="flex items-center gap-1" aria-label="${L("Mục chính", "Main")}">${desktopNav}</nav>
      <button type="button" onclick="openPop(event,'account')" aria-haspopup="menu" class="ml-auto flex h-10 cursor-pointer items-center gap-2.5 rounded-xl px-1 pr-2 outline-hidden hover:bg-item-hover">${avatar}<span class="text-sm font-medium">${me.name}</span>${ic("chevrons-up-down", "size-4 text-muted")}</button>
    </header>
    <header class="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 lg:hidden" data-wf-block="1">
      ${bottom ? "" : `<button type="button" aria-label="Menu" onclick="ui.drawer=true;render()" class="-ml-1 inline-flex size-10 cursor-pointer items-center justify-center rounded-xl text-foreground outline-hidden hover:bg-foreground/5">${ic("menu", "size-5")}</button>`}
      ${bottom ? `<span class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">${mark()}</span>` : ""}
      <p class="min-w-0 truncate text-base font-semibold">${title}</p>
      <button type="button" onclick="openPop(event,'account')" aria-label="${L("Tài khoản", "Account")}" class="ml-auto cursor-pointer rounded-full outline-hidden">${avatar}</button>
    </header>
    <div class="${cx("flex-1", bottom && "pb-20 lg:pb-0")}">${content}</div>
    ${bottom ? `<nav class="fixed inset-x-0 bottom-0 z-30 grid h-16 border-t border-border bg-surface lg:hidden" style="grid-template-columns:repeat(${nav.length},minmax(0,1fr))" aria-label="${L("Mục chính", "Main")}">${nav.map(([m, i, t]) => `<a href="${linkMan(m)}" ${m === S.man ? 'aria-current="page"' : ""} class="${cx("flex flex-col items-center justify-center gap-1 text-xs", m === S.man ? "font-medium text-primary" : "text-muted")}">${ic(i, "size-5")}${t}</a>`).join("")}</nav>` : ""}
    ${!bottom && ui.drawer ? `<div class="fixed inset-0 z-40 bg-black/15 lg:hidden" onclick="ui.drawer=false;render()"></div><aside class="wt-fade fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-surface shadow-modal lg:hidden"><div class="flex h-14 items-center border-b border-border px-4">${brand()}</div><nav class="flex flex-col gap-1 p-3">${nav.map(([m, i, t]) => `<a href="${linkMan(m)}" class="${cx("flex h-10 items-center gap-2.5 rounded-xl px-3 text-sm", m === S.man ? "bg-secondary font-medium text-foreground" : "text-foreground/70 hover:bg-item-hover")}">${ic(i)}${t}</a>`).join("")}</nav></aside>` : ""}
  </div>`;
}

// ===================================================================
// MÀN 1 · LỊCH TUẦN
// ===================================================================
const F = {
  listHours: OPT === "a" || OPT === "b" || OPT === "c",
  cellFree: OPT !== "d",
  rosterSum: OPT !== "e",
  panelSummary: OPT !== "d",
};
// Giờ riêng: chấm cam khi chủ chưa quyết (chưa xếp) hoặc đã xếp theo giờ riêng; xếp theo giờ ca gốc thì hết chấm.
// Giờ riêng của một ca: đồng hồ trên chip khi còn đăng ký giờ riêng mà chưa xếp, hoặc đã xếp theo giờ riêng.
// Chưa xếp = chủ chưa quyết → là cảnh báo (chấm cam, lên đầu ô). Xếp theo giờ ca gốc thì hết cả hai.
const cuP = (s, d, p) => (regKind(s, d, p) === "reg" ? customAt(s, d)?.[p] || null : null);
const customPending = (s, d, p) => !!cuP(s, d, p) && !asgAt(s, d, p);
const customShown = (s, d, p) => { const a = asgAt(s, d, p); return a ? !!a.t : !!cuP(s, d, p); };
function tipFor(s, d, p) {
  const a = asgAt(s, d, p); const k = regKind(s, d, p); const cu = cuP(s, d, p), note = noteAt(s, d);
  const lines = [`<b class="font-semibold text-foreground">${esc(s.name)}</b>${typeOf(s) === "all" ? ` · ${L("đăng ký mọi ca", "every shift")}` : ""}`];
  if (a) {
    const t = runTime(runAt(s, d, p));
    lines.push(`<span class="tabular-nums">${t.from}–${t.to}</span> · ${esc(posLabel(a.pos, a.sub))}`);
    if (k === "no" && !s.left) lines.push(`<span class="text-warn">${L("Xếp ngoài lịch rảnh", "Placed outside availability")}</span>`);
    if (a.pos.some((x) => !s.q.includes(x))) lines.push(`<span class="text-warn">${L("Chưa có kinh nghiệm vị trí này", "No experience in this position")}</span>`);
    if (s.left) lines.push(`<span class="text-err">${L("Đã nghỉ, cần người thay", "Left, needs someone")}</span>`);
  } else lines.push(k === "reg" ? L("Đã đăng ký, chưa xếp", "Registered, not placed") : L("Chưa đăng ký, tính là rảnh", "Didn’t register, counted as free"));
  if (customPending(s, d, p)) lines.push(`<span class="text-warn tabular-nums">${L(`Đăng ký giờ riêng ${cu.from}–${cu.to}, chưa quyết`, `Asked for own times ${cu.from}–${cu.to}, not decided`)}</span>`);
  if (note) lines.push(`<span class="text-muted">${L("Ghi chú", "Note")}: ${esc(note)}</span>`);
  return lines.join("<br>");
}
function marker(s, d, p) {
  const a = asgAt(s, d, p); const k = regKind(s, d, p);
  let style = "", inline = "";
  if (a) {
    if (!a.pos.length) style = "border-foreground/40 bg-foreground/10 text-foreground";
    else if (a.pos.length === 1) style = `border-p${pn(a.pos[0])}-bd bg-p${pn(a.pos[0])}-bg text-p${pn(a.pos[0])}-tx`;
    else { const n1 = pn(a.pos[0]), n2 = pn(a.pos[1]); style = `border-p${n1}-bd text-p${n1}-tx`; inline = `background:linear-gradient(90deg,var(--p${n1}-bg) 50%,var(--p${n2}-bg) 50%)`; }
  } else if (k === "reg") style = "border-foreground/25 bg-surface text-foreground/80";
  // Không đăng ký gì: nét đứt và mờ hẳn, để tách khỏi người đã đăng ký (góp ý 10/10)
  else style = "border-dashed border-foreground/35 bg-surface text-muted opacity-55";
  const flag = s.left ? "err" : (a && (k === "no" || a.pos.some((x) => !s.q.includes(x)))) || customPending(s, d, p) ? "warn" : "";
  const selected = ui.panel && ui.panel.sid === s.id && ui.panel.d === d;
  // Ghi chú theo ngày: biểu tượng chỉ ở chip đầu tiên của người đó trong ngày, không lặp ở mọi ca
  const noteHere = noteAt(s, d) && PERIODS.find((pp) => shownIn(d, pp.i).includes(s))?.i === p;
  return `<button type="button" data-tip="${esc(tipFor(s, d, p))}" onclick="openPanel('${s.id}',${d},${p})" class="${cx("relative inline-flex h-6 max-w-full cursor-pointer items-center gap-1 rounded-full border px-2 text-xs font-medium whitespace-nowrap outline-hidden transition-[filter] hover:brightness-95", style, selected && "ring-2 ring-primary ring-offset-1 ring-offset-surface", s.left && "line-through")}" style="${inline}">${typeOf(s) === "all" ? `<svg viewBox="0 0 24 24" class="size-3 shrink-0 fill-(--star) text-(--star)" aria-label="${L("Đăng ký mọi ca", "Every shift")}"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>` : ""}<span class="truncate">${esc(s.nick)}</span>${customShown(s, d, p) ? ic("clock", "size-3 opacity-80") : ""}${noteHere ? ic("message-square-text", "size-3 opacity-70") : ""}${flag ? `<span class="absolute -top-0.5 -right-0.5 size-2 rounded-full ring-2 ring-surface bg-${flag}-dot"></span>` : ""}</button>`;
}
// --- Thứ tự chip trong một ngày (góp ý 10/10) ---
// CA1: có cảnh báo lên đầu → còn lại A–Z theo biệt danh → người thêm thủ công xuống cuối, theo thứ tự thêm.
// CA2–CA5 kế thừa thứ tự của ca ngay trên trong cùng ngày: tên còn lại giữ thứ tự, tên mới xếp A–Z sau nhóm kế thừa.
// "Xếp ngoài lịch rảnh" không tính là cảnh báo khi xếp thứ tự, nên người thêm thủ công vẫn ở cuối.
function shownIn(d, p) { return STAFF.filter((s) => (s.left ? !!asgAt(s, d, p) : ui.sel.has(s.id) && (canWork(s, d, p) || asgAt(s, d, p)))); }
const orderWarn = (s, d, p) => { const a = asgAt(s, d, p); return !!s.left || !!(a && a.pos.some((x) => !s.q.includes(x))) || customPending(s, d, p); };
const isManual = (s, d, p) => !!asgAt(s, d, p) && regKind(s, d, p) === "no";
function dayOrder(d) {
  const az = (a, b) => a.nick.localeCompare(b.nick, "vi");
  const seq = (s, p) => ui.manual.get(`${s.id}|${d}|${p}`) ?? -1;
  const out = []; let prev = [];
  const inherit = (list) => { const kept = prev.filter((s) => list.includes(s)); return [...kept, ...list.filter((s) => !kept.includes(s)).sort(az)]; };
  for (let p = 0; p < 5; p++) {
    const list = shownIn(d, p);
    const warn = list.filter((s) => orderWarn(s, d, p));
    const manual = list.filter((s) => !warn.includes(s) && isManual(s, d, p)).sort((a, b) => seq(a, p) - seq(b, p) || az(a, b));
    const rest = list.filter((s) => !warn.includes(s) && !manual.includes(s));
    prev = [...inherit(warn), ...inherit(rest), ...manual];
    out.push(prev);
  }
  return out;
}
const cellPeople = (d, p) => dayOrder(d)[p];
function cellHead(d, p, mobile) {
  const placed = placedCount(d, p), need = needTotal(d, p), free = freeCount(d, p);
  const short = placed < need;
  return `<span class="${cx("inline-flex items-center gap-1 font-medium tabular-nums", short ? "text-warn" : "text-foreground")}">${short ? ic("triangle-alert", "size-3.5") : ""}${placed}/${need}</span>${F.cellFree && free ? `<span class="tabular-nums text-muted">+${free} ${L("rảnh", "free")}</span>` : ""}`;
}
const addBtn = (d, p) => readOnly() ? "" : `<button type="button" aria-label="${L("Thêm người vào", "Add someone to")} ${PERIODS[p].code} ${dayShort(d)}" onclick="openPop(event,'add',${d},${p})" class="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted outline-hidden hover:bg-foreground/8 hover:text-foreground">${ic("user-plus", "size-3.5")}</button>`;
function calGrid() {
  const days = visibleDays();
  if (isEmptyWeek) return `<div class="rounded-2xl border border-border bg-surface" data-wf-block="4">${emptyLine(L("Không ai đăng ký trong những ngày này.", "No one registered for these dates."))}</div>`;
  if (OPT === "c") {
    const rows = days.map((d) => {
      const pl = PERIODS.reduce((a, p) => a + placedCount(d, p.i), 0), nd = PERIODS.reduce((a, p) => a + needTotal(d, p.i), 0);
      return `<div class="border-t border-border-strong px-3 py-3"><p class="text-sm font-semibold">${dayShort(d)} <span class="tabular-nums">${WEEK[d].date}/10</span></p><p class="${cx("mt-0.5 text-xs tabular-nums", pl < nd ? "text-warn" : "text-muted")}">${pl}/${nd}</p></div>` +
        PERIODS.map((p) => `<div class="min-w-0 border-t border-l border-border-strong p-2"><div class="mb-1.5 flex items-start gap-1 text-xs"><div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5">${cellHead(d, p.i)}</div>${addBtn(d, p.i)}</div><div class="flex flex-wrap gap-1">${cellPeople(d, p.i).map((s) => marker(s, d, p.i)).join("")}</div></div>`).join("");
    }).join("");
    return `<div class="overflow-hidden rounded-2xl border border-border bg-surface" data-wf-block="4"><div class="grid" style="grid-template-columns:76px repeat(5,minmax(0,1fr))"><div></div>${PERIODS.map((p) => `<div class="border-l border-border-strong px-2 py-2.5"><p class="text-sm font-semibold">${p.code}</p><p class="text-xs tabular-nums text-muted">${p.from}–${p.to}</p></div>`).join("")}${rows}</div></div>`;
  }
  const head = days.map((d) => `<div class="border-l border-border-strong px-2 py-2"><p class="text-xs text-muted">${dayShort(d)}</p><p class="text-base font-semibold tabular-nums">${WEEK[d].date}</p></div>`).join("");
  const rows = PERIODS.map((p) => `<div class="border-t border-border-strong px-2.5 py-2"><p class="text-xs font-semibold">${p.code}</p><p class="text-xs tabular-nums text-muted">${pTime(p.i)}</p></div>` +
    days.map((d) => `<div class="min-w-0 border-t border-l border-border-strong p-2"><div class="mb-1.5 flex items-start gap-1 text-xs"><div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5">${cellHead(d, p.i)}</div>${addBtn(d, p.i)}</div><div class="flex flex-wrap gap-1">${cellPeople(d, p.i).map((s) => marker(s, d, p.i)).join("")}</div></div>`).join("")).join("");
  return `<div class="overflow-hidden rounded-2xl border border-border bg-surface" data-wf-block="4"><div class="grid" style="grid-template-columns:56px repeat(${days.length},minmax(0,1fr))"><div></div>${head}${rows}</div></div>`;
}
function calMobile() {
  const d = ui.mDay;
  if (isEmptyWeek) return `<div class="rounded-2xl border border-border bg-surface">${emptyLine(L("Không ai đăng ký trong những ngày này.", "No one registered for these dates."))}</div>`;
  return `<div class="flex flex-col gap-3" data-wf-block="4">${PERIODS.map((p) => `
    <section class="rounded-2xl border border-border bg-surface p-4">
      <header class="mb-3 flex items-center gap-2"><h3 class="text-sm font-semibold">${p.code} <span class="font-normal tabular-nums text-muted">${p.from}–${p.to}</span></h3><span class="ml-auto flex items-center gap-1.5 text-xs">${cellHead(d, p.i, true)}</span>${addBtn(d, p.i)}</header>
      <div class="flex flex-wrap gap-1.5">${cellPeople(d, p.i).map((s) => marker(s, d, p.i)).join("")}</div>
    </section>`).join("")}</div>`;
}

// --- Danh sách nhân viên (FR-O11) ---
function staffList(compact, inPop) {
  const days = visibleDays();
  const q = ui.q.trim().toLowerCase();
  const match = (s) => !q || s.name.toLowerCase().includes(q);
  const inR = ACTIVE.filter((s) => inRange(s, days));
  const outR = ACTIVE.filter((s) => !inRange(s, days));
  const k = inR.filter((s) => ui.sel.has(s.id)).length;
  const all = inR.length && k === inR.length, none = k === 0;
  const row = (s, off) => {
    const rh = regHours(s).h;
    return `<li class="${cx("group flex h-9 items-center gap-2.5 rounded-lg px-2", off && "opacity-50")}">
      ${cb({ checked: !off && ui.sel.has(s.id), disabled: off, attrs: `aria-label="${esc(s.name)}" onchange="toggleStaff('${s.id}')"` })}
      <button type="button" ${off ? "disabled" : ""} onclick="onlyStaff('${s.id}')" class="${cx("min-w-0 flex-1 truncate text-left text-sm outline-hidden", off ? "cursor-default" : "cursor-pointer")}" title="${off ? "" : L("Chỉ hiện người này", "Show only this person")}">${esc(s.name)}</button>
      ${!off && isShort(s) ? `<span title="${L("Thiếu giờ: đăng ký dưới 5 ngày đủ 8 tiếng", "Short hours: under 5 days of 8h")}" class="text-warn">${ic("triangle-alert", "size-3.5")}</span>` : ""}
      ${!off && F.listHours && (!compact || inPop) ? `<span class="text-xs tabular-nums text-muted" title="${rh == null ? L("Chưa đăng ký, tính là rảnh cả tuần", "Didn’t register, free all week") : L("Giờ đã đăng ký tuần này", "Hours registered this week")}">${rh == null ? "—" : fmtH(rh) + "h"}</span>` : ""}
    </li>`;
  };
  return `
    <div class="flex gap-2">
      <label class="relative block min-w-0 flex-1"><span class="sr-only">${L("Tìm nhân viên", "Find staff")}</span>
        <i data-lucide="search" class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"></i>
        <input type="search" value="${esc(ui.q)}" oninput="ui.q=this.value;renderKeepFocus(this)" placeholder="${L("Tìm nhân viên", "Find staff")}" class="${INPUT} pl-10" data-focus-id="staff-q" /></label>
      <button type="button" onclick="${inPop ? "event.stopPropagation();ui.popView='filters';render()" : "openPop(event,'filters')"}" aria-label="${L("Bộ lọc", "Filters")}" title="${L("Bộ lọc", "Filters")}" class="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border-strong bg-surface text-muted outline-hidden hover:bg-button-hover hover:text-foreground md:size-10">${ic("list-filter")}</button>
    </div>
    <div class="mt-3">${masterRow("px-2")}</div>
    <ul class="mt-1 flex flex-col gap-0.5">${inR.filter(match).map((s) => row(s, false)).join("") || `<li class="px-2 py-3 text-sm text-muted">${L("Không có ai khớp", "No one matches")}</li>`}</ul>
    ${outR.length ? `<p class="mt-4 px-2 text-xs font-medium text-muted">${L("Không có trong những ngày này", "Not in these dates")} (${outR.length})</p><ul class="mt-1 flex flex-col gap-0.5">${outR.filter(match).map((s) => row(s, true)).join("")}</ul>` : ""}`;
}
// Chọn tất cả / Bỏ chọn tất cả / Đảo lựa chọn (FR-O11). Trạng thái tính trên người trong ngày đang xem;
// cả ba hành động áp lên mọi nhân viên đang làm, kể cả người ngoài ngày đang xem.
function masterRow(px) {
  const inR = ACTIVE.filter((s) => inRange(s, visibleDays()));
  const k = inR.filter((s) => ui.sel.has(s.id)).length;
  const all = inR.length && k === inR.length, none = k === 0;
  return `<div class="flex h-9 items-center gap-2.5 ${px}">
      ${cb({ checked: !!all, indet: !all && !none, attrs: `aria-label="${L("Chọn tất cả", "Select all")}" onchange="masterToggle()"` })}
      <button type="button" onclick="masterToggle()" class="cursor-pointer text-sm font-medium outline-hidden">${all ? L("Bỏ chọn tất cả", "Deselect all") : L("Chọn tất cả", "Select all")}</button>
      ${!all && !none ? `<button type="button" onclick="invertSel()" class="ml-auto cursor-pointer text-sm text-muted outline-hidden underline-offset-4 hover:text-foreground hover:underline">${L("Đảo lựa chọn", "Invert")}</button>` : ""}
    </div>`;
}
function filterGroups() {
  const days = visibleDays();
  const inR = ACTIVE.filter((s) => inRange(s, days));
  const any = (s, fn) => days.some((d) => PERIODS.some((p) => fn(asgAt(s, d, p.i), d, p.i)));
  const g = [
    { vi: "Đăng ký", en: "Registration", opts: [
      ["Đăng ký một số ca", "Registered some shifts", inR.filter((s) => typeOf(s) === "some")],
      ["Đăng ký mọi ca", "Registered every shift", inR.filter((s) => typeOf(s) === "all")],
      ["Chưa đăng ký, tính là rảnh", "Nothing, counted as free", inR.filter((s) => typeOf(s) === "none")]] },
  ];
  if (S.tt !== "mo-dk") {
    g.push({ vi: "Xếp lịch", en: "Placing", opts: [
      ["Chưa có ca", "No shift yet", inR.filter((s) => !any(s, (a) => a))],
      ["Đã xếp, chưa có vị trí", "Placed, no position", inR.filter((s) => any(s, (a) => a && !a.pos.length))],
      ["Đã xếp, có vị trí", "Placed with a position", inR.filter((s) => any(s, (a) => a && a.pos.length))],
      ["Kiêm hai vị trí", "Covers two positions", inR.filter((s) => any(s, (a) => a && a.pos.length > 1))]] });
    g.push({ vi: "Xếp vào vị trí", en: "Placed as", opts: [...POSITIONS.map((p) => [p.vi, p.en, inR.filter((s) => any(s, (a) => a && a.pos.includes(p.id))), p.id]), ["Chưa có vị trí", "No position yet", inR.filter((s) => any(s, (a) => a && !a.pos.length))]] });
  }
  g.push({ vi: "Có kinh nghiệm", en: "Qualified for", opts: [...POSITIONS.map((p) => [p.vi, p.en, inR.filter((s) => s.q.includes(p.id)), p.id]), ["Chưa có kinh nghiệm", "No experience listed", inR.filter((s) => !s.q.length)]] });
  const attn = [
    ["Thiếu giờ", "Short hours", inR.filter(isShort)],
    ["Đăng ký giờ riêng", "Asked for own times", inR.filter((s) => days.some((d) => customAt(s, d) && Object.keys(customAt(s, d)).length))],
    ...(S.tt !== "mo-dk" ? [["Xếp ngoài lịch rảnh", "Placed outside availability", inR.filter((s) => any(s, (a, d, p) => a && regKind(s, d, p) === "no"))],
      ["Xếp vị trí chưa có kinh nghiệm", "Placed without experience", inR.filter((s) => any(s, (a) => a && a.pos.some((x) => !s.q.includes(x))))]] : []),
  ];
  const flagged = new Set(attn.flatMap((o) => o[2].map((s) => s.id)));
  attn.push(["Không có gì cần chú ý", "Nothing to look at", inR.filter((s) => !flagged.has(s.id))]);
  g.push({ vi: "Cần chú ý", en: "Needs attention", opts: attn });
  return g;
}
window.FG = [];
function filtersPanel() {
  FG = filterGroups();
  const shown = ACTIVE.filter((s) => ui.sel.has(s.id) && inRange(s, visibleDays())).length;
  // Hàng chọn tất cả: cùng một hàng (và cùng hành vi) với hàng dưới ô tìm nhân viên.
  // Một hàng cho cả bảng, không đặt ở từng nhóm: nhóm nào cũng mô tả đủ mọi người trong ngày đang xem,
  // nên "chọn tất cả" của nhóm nào cũng là chọn tất cả nhân viên.
  return `<div class="border-b border-border px-1 py-1">${masterRow("px-3")}</div><div class="max-h-[min(520px,calc(100vh-11rem))] overflow-y-auto px-1 py-1">${FG.map((g, gi) => `
    <details open class="group/g"><summary class="flex h-10 cursor-pointer list-none items-center rounded-xl px-3 text-xs font-medium tracking-wide text-muted uppercase hover:bg-item-hover hover:text-foreground [&::-webkit-details-marker]:hidden">${L(g.vi, g.en)}${ic("chevron-down", "ml-auto size-4 transition-transform group-[:not([open])]/g:-rotate-90")}</summary>
    <ul class="pb-1">${g.opts.map(([vi, en, set, pid], oi) => {
      const n = set.length, k = set.filter((s) => ui.sel.has(s.id)).length;
      return `<li class="${cx("flex h-9 items-center gap-2.5 rounded-xl px-3", n ? "hover:bg-item-hover" : "opacity-50")}">
        ${cb({ checked: n > 0 && k === n, indet: k > 0 && k < n, disabled: !n, attrs: `aria-label="${esc(L(vi, en))}" onchange="optToggle(${gi},${oi})"` })}
        ${pid ? posDot(pid) : ""}<button type="button" ${n ? "" : "disabled"} onclick="optOnly(${gi},${oi})" class="min-w-0 flex-1 cursor-pointer truncate text-left text-sm outline-hidden disabled:cursor-default">${L(vi, en)}</button>
        <span class="text-xs tabular-nums text-muted">${k > 0 && k < n ? `${k}/${n}` : n}</span></li>`;
    }).join("")}</ul></details>`).join("")}</div>
    <div class="border-t border-border px-4 py-3 text-sm text-muted">${L(`${shown} nhân viên trên lịch`, `${shown} staff on the calendar`)}</div>`;
}

// --- Panel người × ngày (FR-O43) ---
function panelBody(mobile) {
  const { sid, d } = ui.panel; const s = ST[sid];
  const days = visibleDays();
  const st = placedStats(s), rg = regHours(s);
  const ro = readOnly(); const pub = published();
  const sel = ui.panel.sel;
  const cu = customAt(s, d), note = noteAt(s, d);
  const periodRow = (p) => {
    const a = asgAt(s, d, p.i), k = regKind(s, d, p.i);
    const right = a ? (a.pos.length ? `<span class="inline-flex max-w-full items-center gap-1.5 truncate rounded-full border px-2 py-0.5 text-xs font-medium border-p${pn(a.pos[0])}-bd bg-p${pn(a.pos[0])}-bg text-p${pn(a.pos[0])}-tx"><span class="truncate">${esc(posLabel(a.pos, a.sub))}</span></span>` : `<span class="rounded-full border border-foreground/40 bg-foreground/10 px-2 py-0.5 text-xs font-medium">${L("Chưa có vị trí", "No position")}</span>`) : "";
    // "Đăng ký" là chip xanh lá có dấu tích để nổi hẳn so với "Rảnh" và "Không đăng ký" (góp ý 10/10)
    const kTag = k === "reg" ? `<span class="inline-flex items-center gap-1 rounded-full bg-ok-bg px-2 py-0.5 text-xs font-medium text-ok ring-1 ring-black/5 ring-inset">${ic("check", "size-3.5")}${L("Đăng ký", "Registered")}</span>`
      : k === "free" ? `<span class="inline-flex items-center gap-1 text-xs text-foreground/80">${ic("circle-dashed", "size-3.5")}${L("Rảnh", "Free")}</span>`
      : `<span class="text-xs text-muted">${L("Không đăng ký", "Not registered")}</span>`;
    const c = k === "reg" ? cu?.[p.i] : null;
    const cuTag = c ? `<span class="${cx("inline-flex items-center gap-1 text-xs font-medium tabular-nums", a ? "text-muted" : "text-warn")}">${ic("clock", "size-3.5")}${L("Giờ riêng", "Own times")} ${c.from}–${c.to}${a ? "" : L(" · chưa quyết", " · not decided")}</span>` : "";
    const placedT = a?.t ? `<span class="text-xs tabular-nums text-muted">${L("xếp", "placed")} ${a.t.from}–${a.t.to}</span>` : "";
    return `<label class="${cx("flex min-h-12 items-center gap-3 rounded-xl px-2 py-1.5", !ro && "cursor-pointer hover:bg-item-hover")}">
      ${ro ? "" : cb({ checked: sel.has(p.i), attrs: `onchange="togglePeriod(${p.i})"` })}
      <span class="min-w-0 flex-1"><span class="block text-sm font-medium">${p.code} <span class="font-normal tabular-nums text-muted">${p.from}–${p.to}</span></span>
        <span class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">${kTag}${cuTag}</span></span>
      <span class="flex max-w-[50%] min-w-0 flex-col items-end gap-1">${right}${placedT}</span></label>`;
  };
  // Mục đóng/mở như nhóm trong Bộ lọc (góp ý 10/10); trạng thái thu giữ qua các lần vẽ lại
  const sec = (key, title, body, extra = "") => {
    const open = !ui.secClosed.has(key);
    return `<section><div class="flex items-center gap-2"><button type="button" aria-expanded="${open}" onclick="toggleSec('${key}')" class="-ml-2 flex h-9 min-w-0 flex-1 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-left text-sm font-semibold outline-hidden hover:bg-item-hover">${ic("chevron-down", cx("size-4 text-muted transition-transform", !open && "-rotate-90"))}${title}</button>${open ? extra : ""}</div>${open ? `<div class="mt-1">${body}</div>` : ""}</section>`;
  };
  const cuSel = [...sel].sort().filter((p) => regKind(s, d, p) === "reg" && cu?.[p]);
  const posChips = POSITIONS.map((p) => {
    const on = ui.posPick.includes(p.id), first = ui.posPick[0] === p.id;
    return `<button type="button" aria-pressed="${on}" onclick="pickPos('${p.id}')" title="${s.q.includes(p.id) ? "" : L("Chưa có kinh nghiệm", "No experience")}" class="${cx("relative inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-medium outline-hidden transition-colors", on ? "bg-foreground/10 text-foreground inset-ring-1 inset-ring-foreground" : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground")}">${posDot(p.id)}${L(p.vi, p.en)}${first && ui.posPick.length > 1 ? `<span class="text-xs font-normal text-muted">${L("chính", "primary")}</span>` : ""}${s.q.includes(p.id) ? "" : `<span class="size-1.5 rounded-full bg-warn-dot"></span>`}</button>`;
  }).join("");
  const subRows = ui.posPick.filter((pid) => POS[pid].subs.length).map((pid) => `<div class="flex flex-wrap items-center gap-1.5"><span class="mr-1 text-xs text-muted">${posName(pid)}:</span>${POS[pid].subs.map(([id, vi, en]) => { const on = ui.subPick.includes(id); return `<button type="button" aria-pressed="${on}" onclick="pickSub('${id}')" class="${cx("inline-flex h-7 cursor-pointer items-center rounded-full px-2.5 text-xs font-medium outline-hidden", on ? "bg-foreground/10 text-foreground inset-ring-1 inset-ring-foreground" : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10")}">${L(vi, en)}</button>`; }).join("")}</div>`).join("");
  const dayIdx = days.indexOf(d);
  const nothing = sel.size === 0;
  const quick = ro ? "" : `<span class="flex gap-3 text-xs">${[["reg", L("Ca đăng ký", "Registered")], ["all", L("Tất cả", "All")], ["none", L("Bỏ chọn", "None")]].map(([k, t]) => `<button type="button" onclick="quickSel('${k}')" class="cursor-pointer text-muted outline-hidden underline-offset-4 hover:text-foreground hover:underline">${t}</button>`).join("")}</span>`;
  const shiftsBody = `<div class="flex flex-col gap-0.5">${PERIODS.map(periodRow).join("")}</div>
    ${!ro && nothing ? `<p class="px-2 pt-1.5 text-xs text-muted">${L("Không chọn ca nào: Lưu hay Bỏ khỏi ca đều là bỏ khỏi mọi ca trong ngày.", "No shift selected: Save or Take off removes them from every shift this day.")}</p>` : ""}
    ${!ro && cuSel.length ? `<div class="mt-3 space-y-1.5 px-2"><p class="text-xs text-muted">${L("Xếp theo", "Place by")} · <span class="tabular-nums">${cuSel.map((p) => `${PERIODS[p].code} ${cu[p].from}–${cu[p].to}`).join(", ")}</span></p>${segmented([["reg", L("Giờ đăng ký", "Their times")], ["std", L("Giờ ca gốc", "Standard times")]], ui.saveAs, "setSaveAs", L("Xếp theo", "Place by"))}</div>` : ""}`;
  const posBody = `<div class="space-y-2.5"><div class="flex flex-wrap gap-1.5">${posChips}</div>${subRows}
        ${ui.posPick.length ? "" : pub ? `<p class="flex items-center gap-1.5 text-xs font-medium text-warn">${ic("triangle-alert", "size-3.5")}${L("Ca đã công bố phải có vị trí.", "A published shift needs a position.")}</p>` : `<p class="text-xs text-muted">${L("Không chọn vị trí: Lưu là xếp vào ca, chưa có vị trí.", "No position: Save places them without one.")}</p>`}</div>`;
  const reasonBody = `<label class="block"><span class="sr-only">${L("Lý do", "Reason")}</span><input class="${INPUT}" placeholder="${L("VD: đã thống nhất qua Zalo", "e.g. agreed on Zalo")}" /></label>`;
  return `
    <div class="${cx("flex items-start gap-2 border-b border-border px-5 pt-4 pb-3", mobile && "pt-3")}">
      <div class="min-w-0 flex-1">
        <h2 class="text-lg font-semibold text-balance">${esc(s.name)}</h2>
        <div class="mt-1 flex items-center gap-1">
          ${iconBtn("chevron-left", L("Ngày trước", "Previous day"), `${dayIdx <= 0 ? "disabled" : ""} onclick="panelDay(-1)"`)}
          <span class="w-20 text-center text-sm font-medium tabular-nums">${dayFull(d)}</span>
          ${iconBtn("chevron-right", L("Ngày sau", "Next day"), `${dayIdx >= days.length - 1 ? "disabled" : ""} onclick="panelDay(1)"`)}
        </div>
      </div>
      ${iconBtn("x", L("Đóng", "Close"), `onclick="closePanel()"`, "size-9")}
    </div>
    <div class="flex-1 space-y-5 overflow-y-auto px-5 py-4">
      ${F.panelSummary ? `<dl class="grid grid-cols-2 gap-3">
        <div class="rounded-xl bg-background px-3 py-2.5"><dt class="text-xs text-muted">${L("Đăng ký tuần", "Registered")}</dt><dd class="mt-0.5 text-sm font-semibold tabular-nums">${typeOf(s) === "none" ? L("Rảnh cả tuần", "Free all week") : typeOf(s) === "all" ? L("Mọi ca", "Every shift") : `${rg.days} ${L("ngày", "days")} · ${fmtH(rg.h)}h`}</dd></div>
        <div class="rounded-xl bg-background px-3 py-2.5"><dt class="text-xs text-muted">${L("Đã xếp", "Placed")}</dt><dd class="mt-0.5 text-sm font-semibold tabular-nums">${st.shifts} ${L("ca", "shifts")} · ${fmtH(st.h)}h</dd></div>
      </dl>` : `<p class="text-sm text-muted tabular-nums">${L("Đã xếp", "Placed")} ${st.shifts} ${L("ca", "shifts")} · ${fmtH(st.h)}h</p>`}
      <div class="flex flex-wrap items-center gap-1.5 text-sm"><span class="text-muted">${L("Kinh nghiệm", "Experience")}</span>${s.q.length ? s.q.map((q) => `<span class="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium">${posDot(q)}${posName(q)}</span>`).join("") : `<span class="text-muted">—</span>`}</div>
      ${note ? `<div class="rounded-xl border border-border bg-background px-3 py-2.5"><p class="flex items-center gap-1.5 text-xs text-muted">${ic("message-square-text", "size-3.5")}${L("Ghi chú của nhân viên ngày này", "Their note for this day")}</p><p class="mt-1 text-sm text-pretty">${esc(note)}</p></div>` : ""}
      ${sec("shifts", L("Ca trong ngày", "Shifts this day"), shiftsBody, `<span class="ml-auto">${quick}</span>`)}
      ${ro ? `<p class="rounded-xl bg-background px-3 py-2.5 text-sm text-muted">${S.tt === "mo-dk" ? L("Xếp được sau 15:00 T7 10/10, khi đăng ký khoá.", "Placing opens at 15:00 Sat 10 Oct, when registration locks.") : L("Tuần đã qua, chỉ xem.", "Past week, view only.")}</p>` : `
      ${sec("pos", L("Vị trí", "Position"), posBody)}
      ${sec("reason", `${L("Lý do", "Reason")} <span class="font-normal text-muted">${pub ? "" : L("(không bắt buộc)", "(optional)")}</span>`, reasonBody)}`}
    </div>
    ${ro ? "" : `<div class="border-t border-border px-5 py-3">
      ${ui.panelMsg ? `<p role="alert" class="mb-2 flex items-center gap-1.5 text-xs font-medium text-warn">${ic("triangle-alert", "size-3.5")}${ui.panelMsg}</p>` : ""}
      <div class="flex items-center gap-2">
      ${pub ? btn("outline", L("Sửa giờ ca", "Edit shift times"), { icon: "clock", attrs: `onclick="openDialog('shift')"`, extra: "px-3" }) : btn("danger", L("Bỏ khỏi ca", "Take off"), { attrs: `onclick="panelAct('remove')"`, extra: "px-4" })}
      <div class="ml-auto flex gap-2">
        ${btn("primary", L("Lưu", "Save"), { attrs: `onclick="panelAct('save')"`, extra: "px-5" })}
      </div></div></div>`}`;
}

// --- Phân công (FR-O1 + FR-O4): số người cần theo vị trí × ca × ngày, và số đã giao ---
// Thay hai tab "Ai đăng ký" (FR-O41, bỏ theo góp ý 10/10) và "Độ phủ theo vị trí".
function assignSection(mobile) {
  const d = mobile ? ui.mDay : ui.rosterDay;
  const ro = ui.weekOff < 0;
  const need = ro ? PREV_NEED : ui.need;
  const dayTabs = mobile ? "" : `<div class="px-4 pb-3">${boxedTabs(WEEK.map((w, i) => [i, `${dayShort(i)} ${w.date}`]), d, "setRosterDay", L("Ngày", "Day"))}</div>`;
  const tone = (placed, n) => (placed < n ? "font-medium text-warn" : placed > n ? "text-muted" : "");
  const numIn = (p, pid, n) => `<input type="number" min="0" max="20" inputmode="numeric" value="${n}" aria-label="${esc(`${posName(pid)} ${PERIODS[p].code} ${dayFull(d)}`)}" onchange="setNeed(${d},${p},'${pid}',this.value)" class="h-8 w-11 rounded-lg border border-border-strong bg-surface px-1.5 text-right text-sm tabular-nums outline-hidden [appearance:textfield] focus:border-focus focus:ring-2 focus:ring-focus [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />`;
  const rows = POSITIONS.map((pos) => `<tr class="border-t border-border"><th scope="row" class="sticky left-0 z-[1] bg-surface px-4 py-2 text-left text-sm font-normal whitespace-nowrap"><span class="inline-flex items-center gap-2">${posDot(pos.id)}${L(pos.vi, pos.en)}</span></th>${PERIODS.map((p) => {
    const list = STAFF.filter((s) => asgAt(s, d, p.i)?.pos.includes(pos.id));
    const n = need[d][p.i][pos.id], shared = list.filter((s) => asgAt(s, d, p.i).pos.length > 1).length;
    return `<td class="px-2 py-1.5 text-right whitespace-nowrap"><span class="inline-flex items-center justify-end gap-1.5 text-sm tabular-nums"><span class="${tone(list.length, n)}">${list.length}</span><span class="text-muted">/</span>${ro ? `<span class="w-6">${n}</span>` : numIn(p.i, pos.id, n)}</span>${shared ? `<span class="block text-xs text-muted">${L("kiêm", "shared")} ${shared}</span>` : ""}</td>`;
  }).join("")}</tr>`).join("");
  const total = `<tr class="border-t border-border bg-background/60"><th scope="row" class="sticky left-0 z-[1] bg-background px-4 py-2.5 text-left text-sm font-medium">${L("Tổng số người", "Total people")}</th>${PERIODS.map((p) => { const n = Object.values(need[d][p.i]).reduce((a, b) => a + b, 0), placed = placedCount(d, p.i); return `<td class="px-2 py-2.5 text-right text-sm font-medium tabular-nums whitespace-nowrap"><span class="${tone(placed, n)}">${placed}</span><span class="text-muted">/</span><span class="${ro ? "w-6" : "inline-block w-11 pr-2"}">${n}</span></td>`; }).join("")}</tr>`;
  const head = `<div class="flex flex-col items-start gap-x-4 gap-y-3 px-4 pt-4 pb-3 sm:flex-row"><div class="min-w-0 flex-1"><h2 class="text-base font-semibold">${L("Phân công", "Staffing")}</h2><p class="mt-0.5 text-sm text-pretty text-muted">${ro ? L("Số đã giao / số người cần theo vị trí.", "Assigned / needed per position.") : L("Số đã giao / số người cần theo vị trí. Sửa ô số để đặt số người cần.", "Assigned / needed per position. Edit a number to set the need.")}</p></div>
    ${ro ? "" : `<div class="flex flex-wrap items-center gap-3">${ui.needCopied ? `<span class="inline-flex items-center gap-1 text-xs text-muted">${ic("check", "size-3.5")}${L("Đã chép từ tuần 5–11/10", "Copied from 5–11 Oct")}</span>` : ""}${btn("outline", L("Chép từ tuần trước", "Copy last week"), { icon: "copy", attrs: `onclick="copyNeed()"`, extra: "whitespace-nowrap px-3" })}</div>`}</div>`;
  return `<section class="rounded-2xl border border-border bg-surface pb-1" data-wf-block="6">${head}${dayTabs}
    <div class="overflow-x-auto"><table class="w-full min-w-[600px]"><thead><tr class="border-t border-border"><th class="sticky left-0 z-[1] bg-surface px-4 py-2 text-left text-xs font-medium text-muted">${L("Vị trí", "Position")}${mobile ? ` · ${dayFull(d)}` : ""}</th>${PERIODS.map((p) => `<th class="px-2 py-2 text-right text-xs font-medium text-muted"><span class="block">${p.code}</span><span class="font-normal tabular-nums">${pTime(p.i)}</span></th>`).join("")}</tr></thead>
    <tbody>${total}${rows}</tbody></table></div></section>`;
}

function gateItems() {
  const noShift = ACTIVE.filter((s) => !ui.skipped.has(s.id) && !WEEK.some((_, d) => runsOf(s, d).length));
  const noPos = [];
  for (const s of STAFF) for (let d = 0; d < 7; d++) for (const r of runsOf(s, d)) if (!r.a.pos.length) noPos.push({ s, d, r });
  return { noShift, noPos };
}
// Nháp màu vàng, đã công bố màu xanh lá (góp ý 10/10)
function weekBadge() {
  if (ui.weekOff < 0) return badge("ok", L("Đã công bố", "Published"), "circle-check");
  if (S.tt === "mo-dk") return badge("neutral", L("Đang mở đăng ký", "Registration open"), "circle-dot");
  if (S.tt === "cong-bo") return badge("ok", L("Đã công bố", "Published"), "circle-check");
  return `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-p7-bg px-2.5 py-1 text-xs font-medium text-p7-tx ring-1 ring-p7-bd ring-inset">${ic("pencil-line", "size-3.5")}${L("Nháp", "Draft")}</span>`;
}
// Khoảng đang xem, cho nút chọn ngày
function rangeLabel() {
  const base = ui.weekOff < 0 ? 5 : 12, days = visibleDays(), a = base + days[0], b = base + days[days.length - 1];
  return days.length === 1 ? `${dayShort(days[0])} ${a}/10/2026` : `${a}–${b}/10/2026`;
}
// << tuần cũ nhất có dữ liệu · < lùi · [chọn ngày] · > tới · >> về tuần đang xếp (góp ý 10/10, FR-O47)
function calNav(mobile) {
  const atOldest = ui.weekOff < 0 && ui.start === 0;
  const atEnd = ui.weekOff === 0 && (ui.view === "week" || mobile || ui.start + visibleDays().length >= 7);
  const atCurrent = ui.weekOff === 0 && ui.start === 0;
  const sz = "size-10 rounded-xl";
  const picker = `<button type="button" onclick="openPop(event,'datepick')" aria-haspopup="dialog" aria-expanded="${ui.pop?.id === "datepick"}" aria-label="${L("Chọn ngày", "Pick a date")}" class="group inline-flex h-10 min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-border-strong bg-surface px-3 text-sm outline-hidden transition-colors hover:bg-button-hover aria-expanded:border-focus aria-expanded:ring-2 aria-expanded:ring-focus">${ic("calendar", "size-4 text-muted")}<span class="truncate font-medium tabular-nums">${mobile ? `${ui.weekOff < 0 ? "5–11" : "12–18"}/10` : rangeLabel()}</span>${ic("chevron-down", "size-4 text-muted transition-transform group-aria-expanded:rotate-180")}</button>`;
  return `<div class="flex min-w-0 items-center gap-1">${iconBtn("chevrons-left", L("Tuần cũ nhất", "Oldest week"), `${atOldest ? "disabled" : ""} onclick="calOldest()"`, sz)}${iconBtn("chevron-left", L("Khoảng trước", "Previous"), `${atOldest ? "disabled" : ""} onclick="calMove(-1)"`, sz)}${picker}${iconBtn("chevron-right", L("Khoảng sau", "Next"), `${atEnd ? "disabled" : ""} onclick="calMove(1)"`, sz)}${iconBtn("chevrons-right", L("Về tuần đang xếp", "Week being scheduled"), `${atCurrent ? "disabled" : ""} onclick="calToday()"`, sz)}</div>`;
}
// Hoàn tác / làm lại: chỉ khi đang nháp, ẩn sau khi công bố (góp ý 10/10)
const undoBtns = () => (published() || readOnly() ? "" : `<div class="flex items-center gap-1">${iconBtn("undo-2", L("Hoàn tác (Ctrl+Z)", "Undo (Ctrl+Z)"), `${ui.hist.length ? "" : "disabled"} onclick="undo()"`, "size-10 rounded-xl")}${iconBtn("redo-2", L("Làm lại (Ctrl+Y)", "Redo (Ctrl+Y)"), `${ui.fut.length ? "" : "disabled"} onclick="redo()"`, "size-10 rounded-xl")}</div>`);
function calToolbar(mobile) {
  const g = gateItems(); const n = g.noShift.length + g.noPos.length;
  const range = ui.weekOff < 0 ? "5–11/10" : "12–18/10";
  const right = S.tt === "mo-dk" ? `<span class="inline-flex items-center gap-1.5 text-sm text-muted">${ic("lock-open", "size-4")}${L("Khoá lúc 15:00 T7 10/10", "Locks 15:00 Sat 10 Oct")}</span>`
    : published() ? "" : `${n && OPT !== "d" ? `<button type="button" onclick="openDialog('publish')" class="cursor-pointer text-sm font-medium text-warn outline-hidden underline-offset-4 hover:underline">${L(`Còn ${n} việc`, `${n} to resolve`)}</button>` : ""}${btn("primary", L("Công bố tuần", "Publish week") + (OPT === "d" && n ? ` <span class="rounded-full bg-primary-foreground px-1.5 text-xs font-semibold tabular-nums text-primary">${n}</span>` : ""), { icon: "send", attrs: `onclick="openDialog('publish')"`, extra: "h-9 min-h-9 rounded-lg px-3" })}`;
  const legend = iconBtn("circle-help", L("Chú giải", "Legend"), `onclick="openPop(event,'legend')"`, "size-10 rounded-xl");
  const filtered = ui.sel.size !== DEFAULT_SEL.size || [...ui.sel].some((id) => !DEFAULT_SEL.has(id));
  if (mobile) {
    return `<div class="flex flex-col gap-3" data-wf-block="2">
      <div class="flex items-center gap-2"><h1 class="sr-only">${L("Tuần", "Week")} ${range}</h1>${weekBadge()}<span class="ml-auto flex items-center gap-1">${undoBtns()}${legend}</span></div>
      <div class="flex items-center justify-between gap-1">${calNav(true)}</div>
      ${boxedTabs(WEEK.map((w, i) => [i, `${dayShort(i)} ${w.date}`]), ui.mDay, "setMDay", L("Ngày", "Day"))}
      <div class="flex items-center gap-2">${btn("outline", `${L("Nhân viên", "Staff")} <span class="tabular-nums text-muted">${ui.sel.size}</span>`, { icon: "users", attrs: `onclick="ui.sheet='staff';render()"`, extra: "whitespace-nowrap px-3" })}<span class="ml-auto flex items-center gap-2">${S.tt === "mo-dk" ? right : published() ? "" : btn("primary", L("Công bố", "Publish") + (n ? ` <span class="rounded-full bg-primary-foreground px-1.5 text-xs font-semibold tabular-nums text-primary">${n}</span>` : ""), { icon: "send", attrs: `onclick="openDialog('publish')"`, extra: "whitespace-nowrap px-3" })}</span></div></div>`;
  }
  return `<div class="mb-4 space-y-3" data-wf-block="2">
    <div class="flex min-h-10 items-center gap-3"><h1 class="text-xl font-semibold tabular-nums">${L("Tuần", "Week")} ${range}</h1>${weekBadge()}<div class="ml-auto flex items-center gap-3">${right}</div></div>
    <div class="flex flex-wrap items-center gap-3">${calNav(false)}
    ${segmented([["day", L("Ngày", "Day")], ["3d", L("3 ngày", "3 days")], ["week", L("Tuần", "Week")]], ui.view, "setView", L("Chế độ xem", "View"))}
    ${OPT === "b" ? `<button type="button" onclick="openPop(event,'stafflist')" aria-haspopup="dialog" aria-expanded="${ui.pop?.id === "stafflist"}" aria-label="${L("Nhân viên và bộ lọc", "Staff and filters")}" title="${L("Nhân viên và bộ lọc", "Staff and filters")}" class="relative inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border-strong bg-surface text-muted outline-hidden hover:bg-button-hover hover:text-foreground aria-expanded:border-focus aria-expanded:ring-2 aria-expanded:ring-focus">${ic("list-filter")}${filtered ? `<span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-surface" aria-hidden="true"></span><span class="sr-only">${L(`đang lọc khác mặc định, hiện ${ui.sel.size}/${ACTIVE.length} nhân viên`, `filter changed, showing ${ui.sel.size}/${ACTIVE.length} staff`)}</span>` : ""}</button>` : ""}
    <span class="ml-auto flex items-center gap-2">${undoBtns()}${legend}</span></div></div>`;
}
function screenLich() {
  const loading = S.tt === "dang-tai", err = S.tt === "loi";
  const banner = S.tt === "mo-dk" ? `<div role="status" class="mb-4 flex gap-3 rounded-2xl border border-border bg-background p-4">${ic("info", "mt-0.5 size-5 text-muted")}<div class="min-w-0"><p class="text-sm font-medium">${L("Đăng ký đang mở, lịch chỉ để xem", "Registration is open, view only")}</p><p class="mt-0.5 text-sm text-pretty text-foreground/80">${L("Xếp người và gán vị trí mở lúc 15:00 T7 10/10.", "Placing and positions open at 15:00 Sat 10 Oct.")}</p></div></div>`
    : ui.weekOff < 0 ? `<div role="status" class="mb-4 flex gap-3 rounded-2xl border border-border bg-background p-4">${ic("info", "mt-0.5 size-5 text-muted")}<p class="text-sm font-medium">${L("Tuần 5–11/10 đã công bố, chỉ xem.", "Week 5–11 Oct is published, view only.")}</p></div>` : "";
  const loadGrid = `<div aria-busy="true" class="overflow-hidden rounded-2xl border border-border bg-surface p-4" data-wf-block="4"><div class="grid grid-cols-7 gap-3">${Array.from({ length: 35 }, (_, i) => `<div class="space-y-2 rounded-xl p-2">${skel("w-1/2")}${skel(["w-full", "w-3/4", "w-2/3"][i % 3], "h-5")}${skel(["w-2/3", "w-full", "w-1/2"][i % 3], "h-5")}</div>`).join("")}</div></div>`;
  const errGrid = `<div class="rounded-2xl border border-border bg-surface" data-wf-block="4">${errorBlock(L("Không tải được lịch tuần", "Couldn’t load the schedule"), L("Mất kết nối mạng", "Network connection lost"))}</div>`;
  const grid = loading ? loadGrid : err ? errGrid : calGrid();
  const panelOpen = ui.panel && !loading && !err;
  const desktop = `
    <div class="hidden p-6 lg:block">
      ${calToolbar(false)}${banner}
      <div class="flex items-start gap-5">
        ${OPT === "b" ? "" : `<aside class="w-60 shrink-0" data-wf-block="3">${loading ? `<div class="space-y-3">${skel("w-full", "h-10")}${Array.from({ length: 10 }, (_, i) => skel(["w-3/4", "w-2/3", "w-4/5"][i % 3], "h-4")).join("")}</div>` : staffList(OPT === "d" || OPT === "e")}</aside>`}
        <div class="min-w-0 flex-1 space-y-5">${grid}${loading || err ? "" : assignSection(false)}</div>
        ${panelOpen ? `<aside class="sticky top-20 flex max-h-[calc(100vh-6rem)] w-[22rem] shrink-0 flex-col rounded-2xl border border-border bg-surface" data-wf-block="5">${panelBody(false)}</aside>` : ""}
      </div>
    </div>`;
  const mobile = `
    <div class="space-y-4 p-4 lg:hidden">
      ${calToolbar(true)}${banner}
      ${loading ? `<div class="space-y-3">${Array.from({ length: 4 }, () => `<div class="rounded-2xl border border-border bg-surface p-4 space-y-3">${skel("w-1/3")}${skel("w-full", "h-6")}</div>`).join("")}</div>` : err ? errGrid : calMobile()}
      ${loading || err ? "" : assignSection(true)}
    </div>`;
  return appShell(desktop + mobile, L("Lịch tuần", "Schedule"));
}

// ===================================================================
// MÀN 2 · ĐI TRỄ (FR-O24–O26, S9, S17, S18, T18, B17)
// ===================================================================
const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
function lateTier(sh, arrive) {
  if (!arrive) return null;
  const late = toMin(arrive) - toMin(sh.from); const len = toMin(sh.to) - toMin(sh.from);
  if (late <= 10) return { late, tone: "neutral", icon: "clock", t: L("Trong ân hạn", "Within grace"), bonus: "ok" };
  if (late <= 15) return { late, tone: "warn", icon: "clock-alert", t: L("Đi trễ", "Late"), bonus: "lost" };
  const ded = late * 2;
  if (ded >= len) return { late, tone: "err", icon: "triangle-alert", t: L("Bất thường · chờ xem", "Anomaly · review"), bonus: "pending", anomaly: true };
  return { late, tone: "warn", icon: "circle-minus", t: L(`Trừ ${ded} phút`, `Deduct ${ded} min`), bonus: "lost" };
}
const bonusBadge = (b) => b === "ok" ? badge("ok", L("Còn thưởng", "On track"), "circle-check") : b === "lost" ? badge("warn", L("Mất thưởng", "Bonus lost"), "circle-x") : badge("neutral", L("Tạm giữ", "Held"), "circle-pause");
function screenTre() {
  const ro = S.tt === "tuan-truoc";
  const loading = S.tt === "dang-tai", err = S.tt === "loi", empty = S.tt === "rong";
  const range = ro ? "28/9–4/10" : "5–11/10";
  const dayTabs = boxedTabs(LATE_WEEK.map((w, i) => [i, `${L(w.vi, w.en)} ${w.date}${i === 2 && !ro ? " · " + L("Hôm nay", "Today") : ""}`, LATE_COUNT[i] || ""]), ui.lateDay, "setLateDay", L("Ngày", "Day"));
  const rules = iconBtn("circle-help", L("Quy tắc đi trễ", "Lateness rules"), `onclick="openPop(event,'rules')"`, "size-10 rounded-xl");
  const head = `<div class="flex flex-wrap items-center gap-x-4 gap-y-3" data-wf-block="2">
    <h1 class="text-xl font-semibold tabular-nums">${L("Đi trễ", "Lateness")} · ${range}</h1>
    <div class="flex items-center gap-1">${iconBtn("chevron-left", L("Tuần trước", "Previous week"), "", "size-10 rounded-xl")}${btn("outline", L("Tuần này", "This week"), { extra: "whitespace-nowrap" })}${iconBtn("chevron-right", L("Tuần sau", "Next week"), "disabled", "size-10 rounded-xl")}</div>
    <span class="ml-auto">${rules}</span></div>`;
  const shifts = ui.lateDay === 2 && !empty ? TODAY_SHIFTS : ui.lateDay === 0 && !empty ? LATE_EARLIER.map((x) => ({ ...x, sub: null })) : [];
  const editRow = (sh, i) => {
    const tier = lateTier(sh, /^\d{1,2}:\d{2}$/.test(ui.lateVal) ? ui.lateVal.padStart(5, "0") : null);
    return `<div class="mt-3 flex flex-wrap items-end gap-3 rounded-xl bg-background p-3">
      <label class="block w-32 space-y-1.5"><span class="text-sm font-medium">${L("Giờ đến", "Arrived at")}</span><input data-focus-id="late-in" value="${esc(ui.lateVal)}" oninput="ui.lateVal=this.value;renderKeepFocus(this)" placeholder="${sh.from}" inputmode="numeric" class="${INPUT} tabular-nums" /></label>
      <div class="min-w-0 flex-1 pb-2 text-sm">${tier ? `<span class="font-medium tabular-nums">${L(`Trễ ${tier.late} phút`, `${tier.late} min late`)}</span> · ${badge(tier.tone, tier.t, tier.icon)} <span class="ml-1 text-muted">${tier.bonus === "lost" ? L("Thưởng tuần: mất", "Weekly bonus: lost") : tier.bonus === "pending" ? L("Thưởng tuần: tạm giữ", "Weekly bonus: held") : L("Không ảnh hưởng", "No effect")}</span>` : `<span class="text-muted">${L("Gõ giờ đến để xem kết quả", "Type the arrival time to see the result")}</span>`}</div>
      <div class="flex gap-2">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.lateEdit=null;render()"` })}${btn("primary", L("Lưu", "Save"), { attrs: `${tier ? "" : "disabled"} onclick="saveLate(${i})"` })}</div></div>`;
  };
  const row = (sh, i) => {
    const s = ST[sh.sid]; const tier = lateTier(sh, sh.arrive);
    const status = tier ? `<span class="flex flex-col items-end gap-1"><span class="text-xs tabular-nums text-muted">${L("Đến", "Arrived")} ${sh.arrive} · ${L(`trễ ${tier.late}′`, `${tier.late}′ late`)}</span>${badge(tier.tone, tier.t, tier.icon)}</span>` : sh.future ? `<span class="text-sm text-muted">${L("Chưa tới giờ", "Not started")}</span>` : `<span class="text-sm text-muted">${L("Đúng giờ", "On time")}</span>`;
    const action = ro ? "" : tier?.anomaly ? btn("outline", L("Xem xét", "Review"), { attrs: `onclick="openDialog('anomaly',${i})"`, extra: "h-9 min-h-9 rounded-lg px-3" }) : tier ? iconBtn("pencil", L("Sửa", "Change"), `onclick="editLate(${i})"`) : btn("ghost", L("Ghi giờ đến", "Record arrival"), { attrs: `onclick="editLate(${i})"`, extra: "h-9 min-h-9 rounded-lg px-3 text-foreground/70" });
    return `<li class="px-4 py-3 sm:px-5"><div class="flex items-center gap-3 sm:gap-4">
      <span class="w-12 shrink-0 text-sm tabular-nums text-foreground/80 sm:w-24"><span class="block sm:inline">${sh.from}</span><span class="hidden sm:inline">–</span><span class="block text-xs text-muted sm:inline sm:text-sm sm:text-foreground/80">${sh.to}</span></span>
      <span class="min-w-0 flex-1"><span class="block truncate text-sm font-medium">${esc(s.name)}</span><span class="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted">${posDot(sh.pos, "size-1.5")}${esc(posLabel([sh.pos], sh.sub ? [sh.sub] : []))}</span></span>
      <span class="hidden shrink-0 sm:block">${status}</span>
      <span class="flex shrink-0 justify-end sm:w-28">${action}</span></div>
      <div class="mt-2 flex justify-end sm:hidden">${status}</div>
      ${ui.lateEdit === i ? editRow(sh, i) : ""}</li>`;
  };
  const anomalies = shifts.map((sh, i) => [sh, i]).filter(([sh]) => lateTier(sh, sh.arrive)?.anomaly);
  let listBody;
  if (loading) listBody = `<ul aria-busy="true" class="divide-y divide-border">${Array.from({ length: 8 }, (_, i) => `<li class="flex items-center gap-4 px-5 py-3.5">${skel("w-20")}<div class="flex-1 space-y-2">${skel(["w-2/5", "w-1/3", "w-1/2"][i % 3])}${skel("w-1/4")}</div>${skel("w-16")}</li>`).join("")}</ul>`;
  else if (err) listBody = errorBlock(L("Không tải được ca trong ngày", "Couldn’t load today’s shifts"), L("Mất kết nối mạng", "Network connection lost"));
  else if (!shifts.length) listBody = emptyLine(L("Không có ca nào trong ngày này.", "No shifts on this day."));
  else listBody = `<ul class="divide-y divide-border">${shifts.map(row).join("")}</ul>`;

  const summary = [
    { s: ST.s8, n: 1, b: "pending", d8: 3 }, { s: ST.s7, n: 1, b: "lost", d8: 2 }, { s: ST.s4, n: 1, b: "lost", d8: 3 }, { s: ST.s11, n: 1, b: "lost", d8: 0 }, { s: ST.s3, n: 0, b: "ok", d8: 4 },
  ];
  const sumCard = `<section class="rounded-2xl border border-border bg-surface" data-wf-block="5"><header class="flex items-baseline justify-between gap-3 px-5 pt-4 pb-2"><h2 class="text-base font-semibold">${ro ? L("Tuần đó", "That week") : L("Tuần này đến nay", "This week so far")}</h2><span class="text-xs text-muted">${L("Tạm tính", "Provisional")}</span></header>
    ${loading ? `<div class="space-y-3 px-5 pb-5">${Array.from({ length: 4 }, () => skel("w-full", "h-8")).join("")}</div>` : err || empty ? emptyLine(L("Tuần này chưa ghi nhận đi trễ.", "No lateness recorded yet this week.")) : `<ul class="divide-y divide-border border-t border-border">${summary.map((x) => `<li class="flex items-center gap-3 px-5 py-3"><span class="min-w-0 flex-1"><span class="block truncate text-sm font-medium">${esc(x.s.name)}</span><span class="mt-0.5 block text-xs tabular-nums text-muted">${x.n ? L(`${x.n} lần trễ`, `${x.n} late`) : L("Trong ân hạn", "Within grace")} · ${L("ngày đủ 8 tiếng", "8h days")} ${x.d8}/5</span></span>${bonusBadge(x.b)}</li>`).join("")}</ul>`}</section>`;

  let main;
  if (OPT === "b") {
    const ids = Object.keys(LATE_MATRIX);
    const late = { s7: [2, 22], s4: [2, 13], s8: [2, 65], s3: [2, 8], s11: [0, 12] };
    main = `<section class="rounded-2xl border border-border bg-surface" data-wf-block="3">${loading ? listBody : err ? listBody : `<div class="overflow-x-auto"><table class="w-full min-w-[860px]"><thead><tr><th class="px-5 py-3 text-left text-xs font-medium text-muted">${L("Nhân viên", "Staff")}</th>${LATE_WEEK.map((w, i) => `<th class="${cx("px-2 py-3 text-left text-xs font-medium", i === 2 ? "text-foreground" : "text-muted")}">${L(w.vi, w.en)} ${w.date}</th>`).join("")}<th class="px-5 py-3 text-right text-xs font-medium text-muted">${L("Thưởng tuần", "Weekly bonus")}</th></tr></thead><tbody>
      ${ids.map((id) => `<tr class="border-t border-border hover:bg-surface-hover"><td class="px-5 py-2.5 text-sm font-medium whitespace-nowrap">${esc(ST[id].name)}</td>${LATE_MATRIX[id].map((v, d) => {
        const l = late[id] && late[id][0] === d ? late[id][1] : null;
        const t = l != null ? lateTier({ from: "07:00", to: id === "s8" ? "08:00" : "11:00" }, `07:${String(l).padStart(2, "0")}`) : null;
        return `<td class="${cx("px-2 py-2.5 align-top", d === 2 && "bg-background/70")}">${v ? `<button type="button" onclick="openDialog('record','${id}')" class="w-full cursor-pointer rounded-lg px-1.5 py-1 text-left outline-hidden hover:bg-foreground/5"><span class="block text-xs tabular-nums text-foreground/80">${v}</span>${t ? `<span class="mt-1 block">${badge(t.tone, `${t.late}′`, t.icon)}</span>` : ""}</button>` : `<span class="px-1.5 text-xs text-muted">—</span>`}</td>`;
      }).join("")}<td class="px-5 py-2.5 text-right">${bonusBadge(id === "s8" ? "pending" : late[id] && late[id][1] > 10 ? "lost" : "ok")}</td></tr>`).join("")}</tbody></table></div>`}</section>`;
    return appShell(`<div class="space-y-4 p-4 sm:p-6">${head}${main}</div>`, L("Đi trễ", "Lateness"));
  }
  main = `<div class="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
    <section class="rounded-2xl border border-border bg-surface" data-wf-block="4">
      <header class="flex items-center gap-3 px-5 pt-4 pb-3"><h2 class="text-base font-semibold">${L(LATE_WEEK[ui.lateDay].vi, LATE_WEEK[ui.lateDay].en)} ${LATE_WEEK[ui.lateDay].date}/10</h2><span class="text-sm text-muted tabular-nums">${shifts.length} ${L("ca", "shifts")}</span><span class="ml-auto hidden text-xs text-muted sm:inline">${L("Không ghi gì là đúng giờ", "No entry means on time")}</span></header>
      ${anomalies.length && !loading && !err ? `<div class="mx-4 mb-3 flex items-center gap-3 rounded-xl border border-err-bg bg-err-bg px-3 py-2.5">${ic("triangle-alert", "size-4 text-err")}<p class="min-w-0 flex-1 text-sm"><span class="font-medium text-err">${L(`${anomalies.length} ca bất thường chờ bạn xem`, `${anomalies.length} anomaly to review`)}</span> <span class="text-foreground/80">${L("· chưa trừ, chưa tính trễ", "· nothing deducted yet")}</span></p>${btn("outline", L("Xem xét", "Review"), { attrs: `onclick="openDialog('anomaly',${anomalies[0][1]})"`, extra: "h-9 min-h-9 rounded-lg px-3" })}</div>` : ""}
      <div class="border-t border-border">${listBody}</div></section>
    ${sumCard}</div>`;
  return appShell(`<div class="space-y-4 p-4 sm:p-6">${head}${ro ? `<div role="status" class="flex gap-3 rounded-2xl border border-border bg-background p-4">${ic("info", "mt-0.5 size-5 text-muted")}<p class="text-sm font-medium">${L("Tuần đã qua, chỉ xem.", "Past week, view only.")}</p></div>` : ""}<div data-wf-block="3">${dayTabs}</div>${main}</div>`, L("Đi trễ", "Lateness"));
}

// ===================================================================
// MÀN 3 · LỊCH RẢNH CỦA TÔI (FR-S1–S5, S12, S14, S19)
// ===================================================================
function screenRanh() {
  const locked = S.tt === "khoa" || S.tt === "khoa-quen", forgot = S.tt === "khoa-quen", loading = S.tt === "dang-tai", err = S.tt === "loi";
  if (!ui._ranhInit) {
    ui._ranhInit = true;
    if (S.tt === "chua-dk") { ui.ranh = WEEK.map(() => null); ui.custom = {}; ui.notes = {}; ui.ranhSaved = structuredClone(ui.ranh); ui.customSaved = {}; ui.notesSaved = {}; ui.savedAt = null; }
    // Có nháp: CN thêm cả ngày mà chưa bấm Lưu
    if (S.tt === "nhap") ui.ranh[6] = [0, 1, 2, 3, 4];
  }
  const reg = ui.ranh;
  const dirty = JSON.stringify([ui.ranh, ui.custom, ui.notes]) !== JSON.stringify([ui.ranhSaved, ui.customSaved, ui.notesSaved]);
  const dayH = (d) => dayHours(reg[d], ui.custom[d]);
  const under = (d) => dayUnder(reg[d], ui.custom[d]);
  const days = reg.filter((r) => r && r.length).length;
  const total = reg.reduce((a, r, d) => a + dayH(d), 0);
  const d8 = reg.filter((r, d) => r && r.length && !under(d)).length;
  const nothing = days === 0;
  // Nháp (vàng) / Đã đăng ký (xanh lá), cùng nghĩa màu với Nháp / Đã công bố của chủ quán
  const status = locked ? badge("neutral", L("Đã khoá", "Locked"), "lock")
    : dirty ? `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-p7-bg px-2.5 py-1 text-xs font-medium text-p7-tx ring-1 ring-p7-bd ring-inset">${ic("pencil-line", "size-3.5")}${L("Nháp, chưa lưu", "Draft, not saved")}</span>`
    : ui.savedAt ? badge("ok", L("Đã đăng ký", "Registered"), "circle-check") : badge("neutral", L("Chưa đăng ký", "Not registered"), "circle");
  const head = `<div class="space-y-3" data-wf-block="2">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2"><h1 class="text-xl font-semibold tabular-nums">${L("Lịch rảnh", "Availability")} · 12–18/10</h1>${status}</div>
    <p class="${cx("inline-flex items-center gap-1.5 text-sm", locked ? "text-muted" : "text-foreground")}">${ic(locked ? "lock" : "clock", "size-4 text-muted")}${locked ? L("Đã khoá lúc 15:00 T7 10/10, chỉ xem", "Locked at 15:00 Sat 10 Oct, view only") : `${L("Khoá lúc 15:00 T7 10/10", "Locks 15:00 Sat 10 Oct")} · <span class="font-medium">${L("còn 19 giờ", "19 hours left")}</span>`}</p>
    ${forgot ? `<div role="status" class="flex gap-3 rounded-2xl border border-warn-bg bg-warn-bg p-4">${ic("alarm-clock", "mt-0.5 size-5 text-warn")}<div class="min-w-0"><p class="text-sm font-medium text-warn">${L("Bạn chưa bấm Lưu trước giờ khoá", "You didn’t save before the deadline")}</p><p class="mt-0.5 text-sm text-pretty text-foreground/80">${L("Hệ thống đã tự lưu bản nháp lúc 15:00 T7 10/10. Chủ quán xếp lịch theo bản này.", "Your draft was saved automatically at 15:00 Sat 10 Oct. The owner schedules from it.")}</p></div></div>` : ""}
    ${!locked && dirty ? `<p class="text-sm text-pretty text-muted">${L("Chủ quán chỉ thấy bản bạn đã Lưu. Sửa xong nhớ bấm Lưu.", "The owner only sees what you saved. Save when you’re done.")}</p>` : ""}
    ${nothing ? `<div role="status" class="flex gap-3 rounded-2xl border border-border bg-surface p-4">${ic("info", "mt-0.5 size-5 text-muted")}<p class="text-sm text-pretty"><span class="font-medium">${L("Chưa chọn ca nào: bạn được tính là rảnh cả tuần.", "Nothing chosen: you count as free all week.")}</span></p></div>` : `<p class="text-sm text-muted">${L("Ngày để trống là ngày bạn không làm được.", "Empty days are days you can’t work.")}</p>`}
  </div>`;
  const chip = (d, p, big) => {
    const on = reg[d] && reg[d].includes(p.i), c = on && ui.custom[d]?.[p.i];
    const t = c ? `${c.from.replace(":00", "")}–${c.to.replace(":00", "")}` : pTime(p.i);
    return `<button type="button" aria-pressed="${on}" ${locked ? "disabled" : ""} onclick="toggleReg(${d},${p.i})" class="${cx("flex min-w-0 cursor-pointer flex-col items-center justify-center rounded-xl border text-center outline-hidden transition-colors disabled:cursor-not-allowed", big ? "h-12" : "h-11", on ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-surface text-foreground hover:bg-button-hover", locked && !on && "opacity-60")}"><span class="text-sm font-semibold leading-none">${p.code}</span><span class="${cx("mt-1 inline-flex max-w-full items-center gap-0.5 text-xs leading-none tabular-nums", on ? "text-primary-foreground/80" : "text-muted", c && "font-medium text-primary-foreground")}">${c ? ic("clock", "size-3") : ""}<span class="truncate">${t}</span></span></button>`;
  };
  const hoursLine = (d) => {
    const h = dayH(d);
    if (!h) return `<p class="mt-0.5 text-xs text-muted">${L("Không làm", "Can’t work")}</p>`;
    if (under(d)) return `<p class="mt-0.5 text-xs font-medium tabular-nums text-err">${L(`${fmtH(h)} giờ · dưới 8 tiếng`, `${fmtH(h)}h · under 8h`)}</p>`;
    return `<p class="mt-0.5 text-xs tabular-nums text-muted">${fmtH(h)} ${L("giờ", "h")}${h < RULES.minDayH ? L(" · có trọn Ca 5, tính đủ", " · full CA5 counts as enough") : ""}</p>`;
  };
  // Giờ riêng theo từng ca (spec 11/10), mở từ nút "Giờ riêng" ở hàng dưới thẻ ngày như cũ; trong ô chọn ca rồi đổi giờ.
  // Mở ra là sửa được ngay; Lưu/Huỷ chỉ hiện khi có thay đổi. Lưu ở đây chỉ chốt vào bản nháp; chủ quán thấy sau Lưu của trang.
  // Mỗi lúc chỉ mở một ô. Giờ riêng chỉ nằm trong khung ca gốc (chốt 11/10: thường là vào trễ hoặc về sớm), nên không bao giờ chồng ca khác.
  const customBox = (d) => {
    const ed = ui.cOpen; if (!ed || ed.d !== d) return "";
    const P = PERIODS[ed.p], saved = ui.custom[d]?.[ed.p], base = saved || { from: P.from, to: P.to };
    const dirty = ed.from !== base.from || ed.to !== base.to;
    const errTxt = customErr(d, ed.p, ed.from, ed.to);
    const opts = (k) => TIMES.filter((t) => (k === "from" ? hm(t) >= hm(P.from) && hm(t) < hm(P.to) : hm(t) > hm(P.from) && hm(t) <= hm(P.to)));
    const tIn = (k, label) => `<label class="block space-y-1"><span class="block text-xs text-muted">${label}</span><select onchange="setCEdit('${k}',this.value)" class="${cx(INPUT, "w-28 cursor-pointer tabular-nums", errTxt && "border-err-text")}">${opts(k).map((t) => `<option ${t === ed[k] ? "selected" : ""}>${t}</option>`).join("")}</select></label>`;
    const pills = (reg[d] || []).map((q) => { const on = q === ed.p, has = !!ui.custom[d]?.[q]; return `<button type="button" aria-pressed="${on}" onclick="pickCustomP(${d},${q})" class="${cx("inline-flex h-8 cursor-pointer items-center gap-1 rounded-full px-3 text-xs font-medium outline-hidden transition-colors", on ? "bg-foreground/10 text-foreground inset-ring-1 inset-ring-foreground" : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10")}">${has ? ic("clock", "size-3.5") : ""}${PERIODS[q].code}</button>`; }).join("");
    const actions = dirty
      ? `${btn("ghost", L("Huỷ", "Cancel"), { attrs: `onclick="cancelCustom()"`, extra: "min-h-9 h-9 px-3" })}${btn("primary", L("Lưu", "Save"), { attrs: `onclick="saveCustom()"`, extra: "min-h-9 h-9 px-4" })}`
      : saved ? `<button type="button" onclick="deleteCustom()" class="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-danger outline-hidden hover:bg-danger-bg">${ic("trash-2", "size-4")}${L("Xoá giờ riêng", "Remove own times")}</button>` : "";
    return `<div class="mt-3 rounded-xl border border-border-strong bg-background p-3">
      <div class="flex items-center gap-2"><p class="min-w-0 flex-1 text-sm font-semibold">${L("Giờ riêng", "Own times")}</p>${iconBtn("x", L("Đóng", "Close"), `onclick="closeCustom()"`)}</div>
      <div class="mt-1 flex flex-wrap items-center gap-1.5"><span class="mr-1 text-xs text-muted">${L("Ca", "Shift")}</span>${pills}</div>
      <p class="mt-3 text-xs tabular-nums text-muted">${P.code} · ${L("giờ gốc", "standard")} ${P.from}–${P.to}${saved && !dirty ? ` · <span class="inline-flex items-center gap-1 font-medium text-primary">${ic("clock", "size-3")}${L("đã lưu vào nháp", "in your draft")}</span>` : ""}</p>
      <div class="mt-2 flex flex-wrap items-end gap-3">${tIn("from", L("Giờ vào", "In"))}${tIn("to", L("Giờ ra", "Out"))}</div>
      ${errTxt ? `<p role="alert" class="mt-2 text-xs font-medium text-err-text">${errTxt}</p>` : `<p class="mt-2 text-xs text-pretty text-muted">${L(`Vào trễ hoặc về sớm, trong khung ${P.code} (${P.from}–${P.to}).`, `Start late or leave early, within ${P.code} (${P.from}–${P.to}).`)} ${L("Giờ riêng là ca không tiêu chuẩn; sau 23:00 không tính lương.", "Own times are non-standard; time after 23:00 is unpaid.")}</p>`}
      ${ui.cMsg ? `<p role="alert" class="mt-2 flex items-center gap-1.5 text-xs font-medium text-warn">${ic("triangle-alert", "size-3.5")}${ui.cMsg}</p>` : ""}
      ${actions ? `<div class="mt-3 flex justify-end gap-2">${actions}</div>` : ""}</div>`;
  };
  const noteBox = (d) => {
    const v = ui.notes[d] || "";
    if (locked) return v ? `<p class="mt-3 flex gap-1.5 text-sm text-foreground/80">${ic("message-square-text", "mt-0.5 size-4 text-muted")}${esc(v)}</p>` : "";
    if (!v && !ui.noteOpen.has(d)) return "";
    // Mở được thì đóng được: nút × bỏ ghi chú và thu ô lại (Bỏ nháp vẫn lấy lại ghi chú đã Lưu)
    return `<div class="relative mt-3"><label class="block"><span class="sr-only">${L("Ghi chú", "Note")}</span><input data-focus-id="note-${d}" maxlength="120" value="${esc(v)}" oninput="setNote(${d},this)" placeholder="${L("Ghi chú cho chủ quán (không bắt buộc)", "Note for the owner (optional)")}" class="${INPUT} pr-11" /></label><span class="absolute top-1/2 right-1.5 -translate-y-1/2">${iconBtn("x", L("Bỏ ghi chú", "Remove note"), `onclick="closeNote(${d})"`)}</span></div>`;
  };
  let body;
  if (loading) body = `<div aria-busy="true" class="space-y-3">${Array.from({ length: 7 }, () => `<div class="rounded-2xl border border-border bg-surface p-4 space-y-3">${skel("w-1/4")}<div class="grid grid-cols-5 gap-2">${Array.from({ length: 5 }, () => skel("w-full", "h-11")).join("")}</div></div>`).join("")}</div>`;
  else if (err) body = `<div class="rounded-2xl border border-border bg-surface">${errorBlock(L("Không tải được lịch rảnh", "Couldn’t load your availability"), L("Mất kết nối mạng", "Network connection lost"))}</div>`;
  else if (OPT === "b") {
    body = `<div class="overflow-hidden rounded-2xl border border-border bg-surface" data-wf-block="3"><div class="grid gap-1.5 p-3 sm:gap-2 sm:p-4" style="grid-template-columns:44px repeat(7,minmax(0,1fr))"><div></div>${WEEK.map((w, d) => `<div class="${cx("rounded-lg pb-1 text-center", under(d) && "wt-glow border")}"><p class="text-xs text-muted">${dayShort(d)}</p><p class="text-sm font-semibold tabular-nums">${w.date}</p><p class="${cx("text-xs tabular-nums", under(d) ? "font-medium text-err" : "text-muted")}">${dayH(d) ? fmtH(dayH(d)) + "h" : "—"}</p></div>`).join("")}
      ${PERIODS.map((p) => `<div class="flex flex-col justify-center"><p class="text-xs font-semibold">${p.code}</p><p class="text-xs tabular-nums text-muted">${pTime(p.i)}</p></div>${WEEK.map((_, d) => { const on = reg[d] && reg[d].includes(p.i); return `<button type="button" aria-pressed="${on}" aria-label="${p.code} ${dayFull(d)}" ${locked ? "disabled" : ""} onclick="toggleReg(${d},${p.i})" class="${cx("h-11 cursor-pointer rounded-lg border outline-hidden transition-colors disabled:cursor-not-allowed", on ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-surface hover:bg-button-hover")}">${on ? ic("check", "mx-auto size-4") : ""}</button>`; }).join("")}`).join("")}</div></div>`;
  } else {
    const tool = (icon, t, fn) => `<button type="button" onclick="${fn}" class="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted outline-hidden hover:bg-foreground/5 hover:text-foreground">${ic(icon, "size-3.5")}${t}</button>`;
    body = `<ul class="space-y-3" data-wf-block="3">${WEEK.map((w, d) => {
      const all = reg[d] && reg[d].length === 5;
      const cuCodes = Object.keys(ui.custom[d] || {}).map((q) => PERIODS[q].code), cuOpen = ui.cOpen?.d === d;
      const cuBtn = locked || !reg[d] || !reg[d].length ? "" : `<button type="button" aria-expanded="${cuOpen}" onclick="toggleCustom(${d})" class="${cx("inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-medium outline-hidden transition-colors", cuCodes.length || cuOpen ? "bg-primary-light text-primary hover:bg-primary/15" : "text-muted hover:bg-foreground/5 hover:text-foreground")}">${ic("clock", "size-3.5")}${L("Giờ riêng", "Own times")}${cuCodes.length ? ` · ${cuCodes.join(", ")}` : ""}</button>`;
      const tools = locked ? "" : cuBtn + (ui.notes[d] || ui.noteOpen.has(d) ? "" : tool("message-square-plus", L("Ghi chú", "Note"), `openNote(${d})`));
      const msg = ui.dayMsg && ui.dayMsg.d === d ? `<p role="status" class="mt-2 flex items-center gap-1.5 text-xs font-medium text-warn">${ic("info", "size-3.5")}${ui.dayMsg.t}</p>` : "";
      return `<li class="${cx("rounded-2xl border bg-surface p-4", under(d) ? "wt-glow" : "border-border")}">
        <div class="mb-3 flex items-center gap-3"><div class="min-w-0"><p class="text-sm font-semibold whitespace-nowrap">${L(w.viL, w.enL)} <span class="font-normal tabular-nums text-muted">${w.date}/10</span></p>${hoursLine(d)}</div>
          ${locked ? "" : `<button type="button" aria-pressed="${!!all}" onclick="toggleAllDay(${d})" class="${cx("ml-auto inline-flex h-8 shrink-0 cursor-pointer items-center rounded-full px-3 text-xs font-medium whitespace-nowrap outline-hidden transition-colors", all ? "bg-foreground/10 text-foreground inset-ring-1 inset-ring-foreground" : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10")}">${L("Chọn tất cả ca", "Select all shifts")}</button>`}</div>
        <div class="grid grid-cols-5 gap-2">${PERIODS.map((p) => chip(d, p)).join("")}</div>
        ${customBox(d)}${msg}
        ${noteBox(d)}
        ${tools ? `<div class="mt-2 -mb-1 flex gap-1">${tools}</div>` : ""}</li>`;
    }).join("")}</ul>`;
  }
  const saveArea = locked ? (forgot ? `<p class="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-warn">${ic("alarm-clock", "size-3.5")}${L("Tự lưu khi khoá", "Auto-saved at lock")}</p>` : `<p class="inline-flex shrink-0 items-center gap-1 text-xs text-muted">${ic("check", "size-3.5")}${L("Đã lưu", "Saved")}</p>`)
    : dirty ? `<div class="flex shrink-0 gap-2">${btn("ghost", L("Bỏ nháp", "Discard"), { attrs: `onclick="discardRanh()"`, extra: "px-3" })}${btn("primary", L("Lưu", "Save"), { icon: "check", attrs: `onclick="saveRanh()"`, extra: "px-4" })}</div>`
    : `<p class="inline-flex shrink-0 items-center gap-1 text-xs text-muted">${ic("check", "size-3.5")}${ui.savedAt ? L(`Đã lưu ${ui.savedAt}`, `Saved ${ui.savedAt}`) : L("Chưa có gì để lưu", "Nothing to save")}</p>`;
  const foot = loading || err ? "" : `<div class="sticky bottom-20 z-20 mt-4 lg:bottom-4" data-wf-block="4"><div class="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-popover">
      <div class="min-w-0 flex-1"><p class="text-sm font-semibold tabular-nums">${nothing ? L("Rảnh cả tuần", "Free all week") : `${days} ${L("ngày", "days")} · ${fmtH(total)} ${L("giờ", "h")}`}</p>
      ${!nothing && d8 < RULES.minDays ? `<p class="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-warn">${ic("triangle-alert", "size-3.5")}${L(`${d8}/5 ngày đủ 8 tiếng`, `${d8}/5 days of 8h`)}</p>` : ""}</div>
      ${saveArea}</div>${ui.footMsg ? `<p role="alert" class="mt-2 flex items-center gap-1.5 rounded-xl bg-warn-bg px-3 py-2 text-xs font-medium text-warn">${ic("triangle-alert", "size-3.5")}${ui.footMsg}</p>` : ""}</div>`;
  const actions = locked || loading || err ? "" : `<div class="flex gap-2">${btn("outline", L("Rảnh cả tuần", "Free all week"), { icon: "calendar-check", attrs: `onclick="setWeek(true)"` })}${btn("ghost", L("Xoá cả tuần", "Clear the week"), { attrs: `onclick="setWeek(false)"` })}</div>`;
  return appShell(`<div class="mx-auto w-full max-w-2xl space-y-4 p-4 sm:p-6">${head}${actions}${body}${foot}</div>`, L("Lịch rảnh", "Availability"));
}

// ===================================================================
// MÀN 4 · CA CỦA TÔI (FR-S11)
// ===================================================================
function screenCa() {
  const loading = S.tt === "dang-tai", err = S.tt === "loi", empty = S.tt === "rong", notPub = S.tt === "chua-cong-bo";
  const tabs = segmented([["now", L("Tuần này", "This week")], ["next", L("Tuần sau", "Next week")]], notPub ? "next" : "now", "noop", L("Tuần", "Week"));
  const hours = MY_SHIFTS.reduce((a, s) => a + paidH(s.from, s.to), 0);
  let body;
  if (loading) body = `<div aria-busy="true" class="space-y-3">${Array.from({ length: 5 }, () => `<div class="rounded-2xl border border-border bg-surface p-4 space-y-2">${skel("w-1/4")}${skel("w-1/2", "h-5")}</div>`).join("")}</div>`;
  else if (err) body = `<div class="rounded-2xl border border-border bg-surface">${errorBlock(L("Không tải được ca làm", "Couldn’t load your shifts"), L("Mất kết nối mạng", "Network connection lost"))}</div>`;
  else if (notPub) body = `<div class="rounded-2xl border border-border bg-surface px-5 py-8 text-center"><p class="text-sm font-medium">${L("Lịch tuần 12–18/10 chưa công bố", "Week 12–18 Oct isn’t published yet")}</p><p class="mt-1 text-sm text-muted">${L("Chủ quán công bố xong là ca hiện ở đây.", "Your shifts appear here once the owner publishes.")}</p></div>`;
  else if (empty) body = `<div class="rounded-2xl border border-border bg-surface">${emptyLine(L("Tuần này bạn không có ca nào.", "You have no shifts this week."))}</div>`;
  else body = `<ul class="overflow-hidden rounded-2xl border border-border bg-surface divide-y divide-border" data-wf-block="4">${LATE_WEEK.map((w, d) => {
    const list = MY_SHIFTS.filter((x) => x.d === d); const today = d === 2;
    return `<li class="flex gap-4 px-5 py-4"><div class="w-14 shrink-0"><p class="${cx("text-xs", today ? "font-semibold text-primary" : "text-muted")}">${today ? L("Hôm nay", "Today") : L(w.vi, w.en)}</p><p class="text-lg font-semibold tabular-nums">${w.date}</p></div>
      <div class="min-w-0 flex-1 space-y-2 pt-0.5">${list.length ? list.map((x) => { const t = lateTier(x, x.arrive); const paid = paidH(x.from, x.to), clock = (toMin(x.to) - toMin(x.from)) / 60; return `<div><p class="text-sm font-semibold tabular-nums">${x.from} – ${x.to}${paid !== clock ? ` <span class="text-xs font-normal text-muted">· ${L(`tính ${fmtH(paid)} giờ`, `paid ${fmtH(paid)}h`)}</span>` : ""}</p><p class="mt-0.5 flex items-center gap-1.5 text-sm text-foreground/80">${posDot(x.pos)}${esc(posLabel([x.pos], [x.sub]))}</p>${t ? `<p class="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted"><span class="tabular-nums">${L(`Đến ${x.arrive} · trễ ${t.late} phút`, `Arrived ${x.arrive} · ${t.late} min late`)}</span>${badge(t.tone, t.t, t.icon)}</p>` : ""}</div>`; }).join("") : `<p class="pt-1 text-sm text-muted">${L("Nghỉ", "Off")}</p>`}</div></li>`;
  }).join("")}</ul>`;
  const sum = loading || err || notPub || empty ? "" : `<div class="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-surface" data-wf-block="3">
    ${[[L("Ca", "Shifts"), MY_SHIFTS.length], [L("Giờ", "Hours"), fmtH(hours)], [L("Lương ước tính", "Est. pay"), vnd(hours * 26000)]].map(([k, v]) => `<div class="px-4 py-3"><p class="text-xs text-muted">${k}</p><p class="mt-0.5 text-base font-semibold tabular-nums">${v}</p></div>`).join("")}</div>
    <p class="-mt-2 px-1 text-xs text-muted">${L("Ước tính theo giờ được xếp, chưa trừ đi trễ, chưa có thưởng. Trọn Ca 5 tính tới 24:00.", "Based on assigned hours, before lateness and bonus. A full CA5 is paid to 24:00.")}</p>`;
  return appShell(`<div class="mx-auto w-full max-w-2xl space-y-4 p-4 sm:p-6"><div class="flex flex-wrap items-center gap-3" data-wf-block="2"><h1 class="text-xl font-semibold max-lg:sr-only">${L("Ca của tôi", "My shifts")}</h1><span class="ml-auto">${tabs}</span></div>${sum}${body}</div>`, L("Ca của tôi", "My shifts"));
}

// ===================================================================
// MÀN 5 · NHÂN VIÊN (FR-A1–A11, FR-O40)
// ===================================================================
function screenNv() {
  const loading = S.tt === "dang-tai", err = S.tt === "loi", empty = S.tt === "rong";
  const list = empty ? [] : STAFF.filter((s) => !s.left || ui.showLeft);
  const tabs = underlineTabs([["list", L("Nhân viên", "Staff"), ACTIVE.length], ["rates", L("Lương theo vị trí", "Rates by position")]], ui.nvTab, "setNvTab", L("Mục", "Section"));
  const tools = `<div class="flex flex-wrap items-center gap-3" data-wf-block="3">
    <label class="relative block w-full sm:w-72"><span class="sr-only">${L("Tìm nhân viên", "Find staff")}</span><i data-lucide="search" class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"></i><input type="search" placeholder="${L("Tìm theo tên, số điện thoại", "Search name or phone")}" class="${INPUT} pl-10" /></label>
    <label class="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">${cb({ small: false, checked: !!ui.showLeft, attrs: `onchange="ui.showLeft=!ui.showLeft;render()"` })}${L("Hiện cả người đã nghỉ", "Include former staff")}</label>
    <span class="ml-auto">${btn("primary", L("Thêm nhân viên", "Add staff"), { icon: "plus", attrs: `onclick="ui.staffEdit='new';render()"` })}</span></div>`;
  let table;
  if (ui.nvTab === "rates") {
    table = `<section class="max-w-xl rounded-2xl border border-border bg-surface p-5" data-wf-block="4"><h2 class="text-base font-semibold">${L("Lương giờ mặc định theo vị trí", "Default hourly rate by position")}</h2><p class="mt-1 text-sm text-muted">${L("Dùng khi nhân viên không có lương riêng. Tính theo vị trí chính của ca.", "Used when a person has no own rate. Taken from the shift’s primary position.")}</p>
      <ul class="mt-4 divide-y divide-border border-y border-border">${POSITIONS.map((p) => `<li class="flex items-center gap-3 py-2.5">${posDot(p.id)}<span class="min-w-0 flex-1 text-sm">${L(p.vi, p.en)}</span><label class="relative w-40"><span class="sr-only">${L(p.vi, p.en)}</span><input value="${RATE_DEFAULT[p.id].toLocaleString("vi-VN")}" class="${INPUT} pr-16 text-right tabular-nums" /><span class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted">đ/${L("giờ", "h")}</span></label></li>`).join("")}</ul>
      <div class="mt-4 flex justify-end">${btn("primary", L("Lưu", "Save"), { extra: "min-h-11 md:min-h-10" })}</div></section>`;
  } else if (loading) table = `<div class="rounded-2xl border border-border bg-surface"><ul aria-busy="true" class="divide-y divide-border">${Array.from({ length: 8 }, (_, i) => `<li class="flex items-center gap-4 px-5 py-3.5"><div class="flex-1 space-y-2">${skel(["w-1/4", "w-1/3", "w-1/5"][i % 3])}</div>${skel("w-24")}${skel("w-20")}</li>`).join("")}</ul></div>`;
  else if (err) table = `<div class="rounded-2xl border border-border bg-surface">${errorBlock(L("Không tải được danh sách nhân viên", "Couldn’t load staff"), L("Mất kết nối mạng", "Network connection lost"))}</div>`;
  else if (!list.length) table = `<div class="rounded-2xl border border-border bg-surface">${emptyLine(L("Chưa có nhân viên nào. Bấm Thêm nhân viên để tạo tài khoản đầu tiên.", "No staff yet. Use Add staff to create the first account."))}</div>`;
  else table = `<section class="overflow-hidden rounded-2xl border border-border bg-surface" data-wf-block="4">
    <table class="hidden w-full md:table"><thead><tr class="border-b border-border"><th class="px-5 py-3 text-left text-xs font-medium text-muted">${L("Họ tên", "Name")}</th><th class="px-4 py-3 text-left text-xs font-medium text-muted">${L("Kinh nghiệm", "Experience")}</th><th class="px-4 py-3 text-left text-xs font-medium text-muted">${L("Đăng nhập", "Sign-in")}</th><th class="px-5 py-3 text-right text-xs font-medium text-muted">${L("Lương giờ", "Hourly rate")}</th></tr></thead>
    <tbody class="divide-y divide-border">${list.map((s) => `<tr onclick="ui.staffEdit='${s.id}';render()" class="${cx("cursor-pointer hover:bg-surface-hover", ui.staffEdit === s.id && "bg-surface-hover")}"><td class="px-5 py-3"><span class="flex items-center gap-2"><span class="truncate text-sm font-medium">${esc(s.name)}</span>${s.left ? badge("neutral", L("Đã nghỉ", "Left")) : ""}</span><span class="mt-0.5 block text-xs tabular-nums text-muted">${s.phone}</span></td>
      <td class="px-4 py-3"><span class="flex flex-wrap gap-1.5">${s.q.length ? s.q.map((q) => `<span class="inline-flex items-center gap-1.5 text-xs">${posDot(q)}${posName(q)}</span>`).join('<span class="text-muted">·</span>') : '<span class="text-sm text-muted">—</span>'}</span></td>
      <td class="px-4 py-3 text-sm">${s.user ? `<span class="font-mono text-xs">${s.user}</span>` : `<span class="text-xs font-medium text-warn">${L("Chưa có mật khẩu", "No password yet")}</span>`}</td>
      <td class="px-5 py-3 text-right text-sm tabular-nums whitespace-nowrap">${s.rate ? vnd(s.rate) : `<span class="text-muted">${L("Theo vị trí", "Position default")}</span>`}</td></tr>`).join("")}</tbody></table>
    <ul class="divide-y divide-border md:hidden">${list.map((s) => `<li onclick="ui.staffEdit='${s.id}';render()" class="cursor-pointer px-4 py-3 hover:bg-surface-hover"><p class="flex items-center gap-2 text-sm font-medium"><span class="truncate">${esc(s.name)}</span>${s.left ? badge("neutral", L("Đã nghỉ", "Left")) : ""}</p><p class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">${s.q.map((q) => `<span class="inline-flex items-center gap-1">${posDot(q, "size-1.5")}${posName(q)}</span>`).join("") || "—"}<span class="ml-auto tabular-nums">${s.rate ? vnd(s.rate) : L("Theo vị trí", "Position default")}</span></p></li>`).join("")}</ul>
    <div class="border-t border-border px-5 py-3 text-sm text-muted tabular-nums">${list.length} ${L("nhân viên", "staff")}</div></section>`;
  return appShell(`<div class="space-y-4 p-4 sm:p-6"><div data-wf-block="2"><h1 class="sr-only">${L("Nhân viên", "Staff")}</h1>${tabs}<div class="border-b border-border-strong"></div></div>${ui.nvTab === "list" ? tools : ""}${table}</div>`, L("Nhân viên", "Staff"));
}
function staffForm() {
  const isNew = ui.staffEdit === "new"; const s = isNew ? { name: "", nick: "", phone: "", q: [], user: "", rate: null, pw: null } : ST[ui.staffEdit];
  const field = (label, input, hint) => `<div class="space-y-1.5"><label class="block w-fit text-sm font-medium">${label}</label>${input}${hint ? `<p class="text-xs text-muted">${hint}</p>` : ""}</div>`;
  return `<div class="flex items-start gap-2 border-b border-border px-6 pt-5 pb-4"><h2 class="min-w-0 flex-1 text-lg font-semibold">${isNew ? L("Thêm nhân viên", "Add staff") : esc(s.name)}</h2>${iconBtn("x", L("Đóng", "Close"), `onclick="ui.staffEdit=null;render()"`, "size-9")}</div>
    <div class="flex-1 space-y-5 overflow-y-auto px-6 py-6">
      ${field(`${L("Họ tên", "Full name")} <span class="text-red-500">*</span>`, `<input class="${INPUT}" value="${esc(s.name)}" />`)}
      ${field(L("Biệt danh", "Nickname"), `<input class="${INPUT}" value="${esc(s.nick)}" placeholder="${L("Tự đề xuất: tên + chữ đầu của họ", "Suggested: given name + family initial")}" />`, L("Chỉ hiện trên lịch tuần. Không trùng với người đang làm.", "Shown only on the schedule. Must be unique among active staff."))}
      ${field(L("Điện thoại", "Phone"), `<input class="${INPUT} tabular-nums" value="${esc(s.phone)}" inputmode="tel" />`)}
      <fieldset class="space-y-2"><legend class="mb-2 text-sm font-medium">${L("Kinh nghiệm", "Experience")}</legend><div class="flex flex-wrap gap-1.5">${POSITIONS.map((p) => { const on = s.q.includes(p.id); return `<button type="button" aria-pressed="${on}" class="${cx("inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-medium outline-hidden", on ? "bg-foreground/10 text-foreground inset-ring-1 inset-ring-foreground" : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10")}">${posDot(p.id)}${L(p.vi, p.en)}</button>`; }).join("")}</div><p class="text-xs text-muted">${L("Chỉ để gợi ý khi xếp, không chặn.", "A hint for scheduling, never a block.")}</p></fieldset>
      <fieldset class="space-y-2.5"><legend class="mb-2 text-sm font-medium">${L("Lương giờ", "Hourly rate")}</legend>
        <label class="flex cursor-pointer items-center gap-3 text-sm"><input type="radio" name="rate" ${s.rate ? "" : "checked"} class="size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-surface outline-hidden checked:border-[6px] checked:border-primary" />${L("Theo vị trí chính của ca", "From the shift’s primary position")}</label>
        <label class="flex cursor-pointer items-center gap-3 text-sm"><input type="radio" name="rate" ${s.rate ? "checked" : ""} class="size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-surface outline-hidden checked:border-[6px] checked:border-primary" />${L("Lương riêng", "Own rate")}</label>
        ${s.rate ? `<label class="relative ml-8 block w-44"><input value="${s.rate.toLocaleString("vi-VN")}" class="${INPUT} pr-16 text-right tabular-nums" /><span class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted">đ/${L("giờ", "h")}</span></label>` : ""}</fieldset>
      <div class="space-y-4 border-t border-border pt-5"><h3 class="text-sm font-semibold">${L("Đăng nhập", "Sign-in")}</h3>
        ${field(L("Tên đăng nhập", "Username"), `<input class="${INPUT} font-mono" value="${esc(s.user)}" />`)}
        ${field(L("Mật khẩu", "Password"), `<div class="flex gap-2"><input class="${INPUT} font-mono" placeholder="${L("Gõ hoặc tạo mật khẩu mới", "Type or generate a new password")}" />${btn("outline", L("Tạo", "Generate"), { icon: "wand-sparkles", extra: "min-h-11 md:min-h-10 shrink-0" })}</div>`, s.pw ? L(`Đặt lần cuối ${s.pw}. Mật khẩu chỉ hiện tới khi đóng hồ sơ.`, `Last set ${s.pw}. Shown only until you close this record.`) : L("Chưa có mật khẩu. Đặt xong thì gửi cho nhân viên qua Zalo.", "No password yet. Send it to them on Zalo once set."))}
      </div>
      ${isNew || s.left ? "" : `<div class="border-t border-border pt-5"><div class="flex items-center justify-between gap-4"><div><p class="text-sm font-medium">${L("Vô hiệu hoá tài khoản", "Deactivate account")}</p><p class="mt-1 text-sm text-muted">${L("Mất quyền đăng nhập, giữ lịch sử. Ca tương lai được giữ lại và báo cần người thay.", "Revokes sign-in, keeps history. Future shifts stay and are flagged for cover.")}</p></div>${btn("danger", L("Vô hiệu hoá", "Deactivate"), { extra: "shrink-0" })}</div></div>`}
    </div>
    <div class="flex justify-end gap-2 border-t border-border px-6 py-4">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.staffEdit=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("primary", isNew ? L("Tạo tài khoản", "Create account") : L("Lưu", "Save"), { extra: "min-h-11 md:min-h-10" })}</div>`;
}

// ===================================================================
// MÀN 6 · NHẬT KÝ (NFR-1)
// ===================================================================
function screenNk() {
  const loading = S.tt === "dang-tai", err = S.tt === "loi", empty = S.tt === "rong";
  const tx = (v) => (Array.isArray(v) ? L(v[0], v[1]) : v || "—");
  const who = (r) => (r.who === "system" ? `<span class="text-muted">${L("Hệ thống", "System")}</span>` : L("Chủ quán", "Owner"));
  const tools = `<div class="flex flex-wrap items-center gap-2" data-wf-block="2"><h1 class="mr-2 text-xl font-semibold">${L("Nhật ký thay đổi", "Activity log")}</h1>
    <label class="relative block w-full sm:ml-auto sm:w-64"><span class="sr-only">${L("Tìm", "Search")}</span><i data-lucide="search" class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"></i><input type="search" placeholder="${L("Tìm theo tên nhân viên", "Search by staff name")}" class="${INPUT} pl-10" /></label>
    ${selectBtn(L("Loại:", "Type:"), L("Tất cả", "All"))}${selectBtn(L("Khoảng:", "Range:"), L("7 ngày qua", "Last 7 days"))}</div>`;
  let body;
  if (loading) body = `<ul aria-busy="true" class="divide-y divide-border">${Array.from({ length: 8 }, (_, i) => `<li class="flex gap-4 px-5 py-3.5">${skel("w-20")}<div class="flex-1 space-y-2">${skel(["w-1/2", "w-2/5", "w-1/3"][i % 3])}${skel("w-1/4")}</div></li>`).join("")}</ul>`;
  else if (err) body = errorBlock(L("Không tải được nhật ký", "Couldn’t load the log"), L("Mất kết nối mạng", "Network connection lost"));
  else if (empty) body = emptyLine(L("Chưa có thay đổi nào trong 7 ngày qua.", "No changes in the last 7 days."));
  else body = `<table class="hidden w-full lg:table"><thead><tr class="border-b border-border">${[L("Lúc", "When"), L("Việc", "What"), L("Trước", "Before"), L("Sau", "After"), L("Lý do", "Reason")].map((h, i) => `<th class="${cx("py-3 text-left text-xs font-medium text-muted", i ? "px-4" : "px-5")}">${h}</th>`).join("")}</tr></thead><tbody class="divide-y divide-border">${AUDIT.map((r) => `<tr class="align-top"><td class="px-5 py-3 text-sm whitespace-nowrap tabular-nums text-muted">${r.at}</td><td class="px-4 py-3 text-sm"><p class="font-medium">${tx(r.what)}${r.sid ? ` · ${esc(ST[r.sid].name)}` : ""}</p><p class="mt-0.5 text-xs text-muted">${who(r)}${r.day ? ` · ${tx(r.day)}` : ""}</p></td><td class="px-4 py-3 text-sm text-muted">${tx(r.before)}</td><td class="px-4 py-3 text-sm">${tx(r.after)}</td><td class="px-4 py-3 text-sm text-foreground/80">${tx(r.reason)}</td></tr>`).join("")}</tbody></table>
    <ul class="divide-y divide-border lg:hidden">${AUDIT.map((r) => `<li class="px-4 py-3"><p class="flex items-baseline gap-2 text-sm"><span class="min-w-0 flex-1 font-medium">${tx(r.what)}${r.sid ? ` · ${esc(ST[r.sid].name)}` : ""}</span><span class="shrink-0 text-xs tabular-nums text-muted">${r.at}</span></p><p class="mt-1 text-sm"><span class="text-muted">${tx(r.before)}</span> → ${tx(r.after)}</p>${tx(r.reason) !== "—" ? `<p class="mt-1 text-xs text-muted">${L("Lý do", "Reason")}: ${tx(r.reason)}</p>` : ""}</li>`).join("")}</ul>`;
  return appShell(`<div class="space-y-4 p-4 sm:p-6">${tools}<section class="overflow-hidden rounded-2xl border border-border bg-surface" data-wf-block="3">${body}</section></div>`, L("Nhật ký", "Activity log"));
}

// ===================================================================
// MÀN 7 · ĐĂNG NHẬP (FR-A6, FR-A7)
// ===================================================================
function screenDn() {
  const err = S.tt === "loi";
  return `<div class="relative flex min-h-screen flex-col items-center justify-center p-4">
    <div class="absolute top-4 right-4">${segmented([["vi", "VI"], ["en", "EN"]], S.lang, "setLang", L("Ngôn ngữ", "Language"))}</div>
    <div class="w-full max-w-sm" data-wf-block="1">
      <div class="mb-8 flex flex-col items-center gap-4"><span class="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">${mark("size-7")}</span><h1 class="text-xl font-semibold">${L("Đăng nhập Watchtower", "Sign in to Watchtower")}</h1></div>
      <form class="space-y-4" onsubmit="return false">
        ${err ? `<div role="alert" class="flex gap-3 rounded-2xl border border-err-bg bg-err-bg p-4">${ic("circle-alert", "mt-0.5 size-5 text-err-text")}<p class="text-sm font-medium text-err">${L("Sai tên đăng nhập hoặc mật khẩu", "Wrong username or password")}</p></div>` : ""}
        <div class="space-y-1.5"><label for="u" class="block w-fit text-sm font-medium">${L("Tên đăng nhập", "Username")}</label><input id="u" class="${INPUT} h-12 md:h-12" value="${err ? "tram.huynh" : ""}" autocomplete="username" /></div>
        <div class="space-y-1.5"><label for="pw" class="block w-fit text-sm font-medium">${L("Mật khẩu", "Password")}</label><div class="relative"><input id="pw" type="password" value="${err ? "12345678" : ""}" class="${INPUT} h-12 pr-11 md:h-12 ${err ? "border-red-500" : ""}" autocomplete="current-password" /><button type="button" aria-label="${L("Hiện mật khẩu", "Show password")}" class="absolute top-1/2 right-1.5 inline-flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-foreground/5 hover:text-foreground">${ic("eye")}</button></div></div>
        ${btn("primary", L("Đăng nhập", "Sign in"), { extra: "h-12 w-full" })}
      </form>
      <p class="mt-6 text-center text-sm text-muted">${L("Quên mật khẩu? Nhờ chủ quán đặt lại.", "Forgot your password? Ask the owner to reset it.")}</p>
    </div></div>`;
}

// ===================================================================
// Lớp nổi: popover, dialog, sheet
// ===================================================================
function popContent() {
  const p = ui.pop; if (!p) return "";
  if (p.id === "account") {
    const me = ME();
    return `<div class="px-3 py-2"><p class="truncate text-sm font-medium">${me.name}</p><p class="truncate text-xs text-muted">${me.user}</p></div><hr class="my-1 border-border" />
      <div class="px-1"><p class="px-3 pt-1 pb-1 text-xs text-muted">${L("Ngôn ngữ", "Language")}</p>${[["vi", "Tiếng Việt"], ["en", "English"]].map(([v, t]) => `<a href="${link("lang", v)}" role="menuitemradio" aria-checked="${S.lang === v}" class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm outline-hidden hover:bg-item-hover">${t}${S.lang === v ? ic("check", "ml-auto size-4") : ""}</a>`).join("")}</div>
      <hr class="my-1 border-border" /><div class="px-1"><a href="${linkMan("dn")}" class="group flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm outline-hidden hover:bg-rose-500/10 hover:text-rose-700">${ic("log-out", "size-4 text-muted group-hover:text-rose-700")}${L("Đăng xuất", "Sign out")}</a></div>`;
  }
  if (p.id === "filters") return filtersPanel();
  if (p.id === "stafflist") {
    // Một nút cho cả nhân viên lẫn bộ lọc: bộ lọc mở tại chỗ trong cùng khung, có nút lùi (overlay.md, menu con ở màn hẹp).
    if (ui.popView === "filters") return `<div class="flex items-center gap-1 border-b border-border px-2 py-1.5"><button type="button" onclick="event.stopPropagation();ui.popView=null;render()" class="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-2 text-sm font-medium outline-hidden hover:bg-item-hover">${ic("chevron-left")}${L("Bộ lọc", "Filters")}</button></div>${filtersPanel()}`;
    return `<div class="max-h-[min(560px,calc(100vh-8rem))] overflow-y-auto p-3">${staffList(true, true)}</div>`;
  }
  if (p.id === "datepick") {
    // Lịch tháng 10/2026 (1/10 là thứ Năm). Chỉ ngày có dữ liệu bấm được: 5–11/10 đã công bố, 12–18/10 đang xếp.
    const base = ui.weekOff < 0 ? 5 : 12, inView = new Set(visibleDays().map((d) => base + d));
    const cells = [...Array(3).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
    const wd = L(["T2", "T3", "T4", "T5", "T6", "T7", "CN"], ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
    return `<div class="p-3"><div class="mb-2 flex items-center gap-1">${iconBtn("chevron-left", L("Tháng trước", "Previous month"), "disabled")}<p class="flex-1 text-center text-sm font-semibold">${L("Tháng 10, 2026", "October 2026")}</p>${iconBtn("chevron-right", L("Tháng sau", "Next month"), "disabled")}</div>
      <div class="grid grid-cols-7 gap-0.5 text-center">${wd.map((x) => `<span class="py-1 text-xs text-muted">${x}</span>`).join("")}${cells.map((n) => {
        if (!n) return "<span></span>";
        const ok = n >= 5 && n <= 18, on = inView.has(n);
        return `<button type="button" ${ok ? `onclick="jumpTo(${n})"` : "disabled"} aria-pressed="${on}" class="${cx("h-9 cursor-pointer rounded-lg text-sm tabular-nums outline-hidden disabled:cursor-default disabled:text-foreground/30", on ? "bg-primary font-medium text-primary-foreground" : "hover:bg-item-hover", n === 10 && !on && "font-semibold underline underline-offset-4")}">${n}</button>`;
      }).join("")}</div>
      <p class="mt-2 border-t border-border pt-2 text-xs text-pretty text-muted">${L("Chọn một ngày để tới khoảng chứa ngày đó. Có dữ liệu từ 5/10; tuần đang xếp là 12–18/10.", "Pick a day to jump to the range holding it. Data starts 5 Oct; the week being scheduled is 12–18 Oct.")}</p></div>`;
  }
  if (p.id === "legend") {
    const m = (cls, t, style = "") => `<li class="flex items-center gap-3"><span class="inline-flex h-6 w-14 items-center justify-center rounded-full border text-xs font-medium ${cls}" style="${style}">Mai</span><span class="text-sm">${t}</span></li>`;
    return `<div class="space-y-3 p-4"><ul class="space-y-2">
      ${m("border-foreground/25 bg-surface text-foreground/80", L("Đã đăng ký, chưa xếp", "Registered, not placed"))}
      ${m("border-dashed border-foreground/35 bg-surface text-muted opacity-55", L("Chưa đăng ký gì, tính là rảnh (ẩn mặc định)", "Didn’t register, counted as free (hidden by default)"))}
      ${m("border-foreground/40 bg-foreground/10 text-foreground", L("Đã xếp, chưa có vị trí", "Placed, no position"))}
      ${m("border-p4-bd bg-p4-bg text-p4-tx", L("Đã xếp, màu là vị trí", "Placed, colour is the position"))}
      ${m("border-p7-bd text-p7-tx", L("Kiêm hai vị trí", "Two positions"), "background:linear-gradient(90deg,var(--p7-bg) 50%,var(--p5-bg) 50%)")}
      <li class="flex items-center gap-3"><span class="inline-flex h-6 w-14 items-center justify-center gap-1 rounded-full border border-foreground/25 bg-surface text-xs font-medium text-foreground/80"><svg viewBox="0 0 24 24" class="size-3 shrink-0 fill-(--star)" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>Mai</span><span class="text-sm">${L("Đăng ký đủ mọi ca trong tuần", "Registered every shift this week")}</span></li>
      <li class="flex items-center gap-3"><span class="relative inline-flex h-6 w-14 items-center justify-center rounded-full border border-p4-bd bg-p4-bg text-xs font-medium text-p4-tx">Mai<span class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-warn-dot ring-2 ring-surface"></span></span><span class="text-sm">${L("Ngoài lịch rảnh, chưa có kinh nghiệm, hoặc giờ riêng chưa quyết", "Outside availability, no experience, or own times not decided")}</span></li>
      <li class="flex items-center gap-3"><span class="inline-flex h-6 w-14 items-center justify-center gap-1 rounded-full border border-foreground/25 bg-surface text-xs font-medium text-foreground/80">Mai${ic("clock", "size-3 opacity-80")}</span><span class="text-sm">${L("Giờ riêng (đăng ký hoặc đã xếp theo giờ riêng)", "Own times (asked for, or placed by them)")}</span></li>
      <li class="flex items-center gap-3"><span class="inline-flex h-6 w-14 items-center justify-center gap-1 rounded-full border border-foreground/25 bg-surface text-xs font-medium text-foreground/80">Mai${ic("message-square-text", "size-3 opacity-70")}</span><span class="text-sm">${L("Có ghi chú cho ngày này", "Has a note for this day")}</span></li></ul>
      <p class="text-xs text-pretty text-muted">${L("Thứ tự trong ô: có cảnh báo trước, rồi A–Z, người thêm thủ công cuối. Ca dưới giữ thứ tự của ca trên.", "Order in a cell: warnings first, then A–Z, manually added last. Each shift keeps the order of the one above.")}</p>
      <div class="border-t border-border pt-3"><p class="mb-2 text-xs font-medium text-muted">${L("Màu vị trí", "Position colours")}</p><ul class="grid grid-cols-2 gap-x-4 gap-y-1.5">${POSITIONS.map((x) => `<li class="flex items-center gap-2 text-sm">${posDot(x.id, "size-2.5")}${L(x.vi, x.en)}</li>`).join("")}</ul></div></div>`;
  }
  if (p.id === "rules") return `<div class="p-4"><p class="mb-3 text-sm font-semibold">${L("Quy tắc đi trễ", "Lateness rules")}</p><ul class="space-y-2.5 text-sm">
      ${[["0–10′", L("Đúng giờ (ân hạn)", "On time (grace)"), "neutral"], ["11–15′", L("Tính đi trễ, mất thưởng tuần", "Late, weekly bonus lost"), "warn"], ["16′+", L("Trừ gấp đôi số phút, mất thưởng", "Deduct 2× the minutes, bonus lost"), "warn"], [L("Trừ ≥ ca", "Deduction ≥ shift"), L("Bất thường, giữ lại chờ bạn xem", "Anomaly, held for your review"), "err"]].map(([a, b, t]) => `<li class="flex gap-3"><span class="w-20 shrink-0 text-xs font-medium tabular-nums ${t === "neutral" ? "text-muted" : "text-" + t}">${a}</span><span>${b}</span></li>`).join("")}</ul></div>`;
  if (p.id === "add") {
    const { d, per } = p;
    const q = (ui.addQ || "").toLowerCase();
    let list = ACTIVE.filter((s) => regKind(s, d, per) === "no" && !asgAt(s, d, per));
    if (q) list = ACTIVE.filter((s) => s.name.toLowerCase().includes(q));
    const tag = (s) => asgAt(s, d, per) ? L("Đã có ca này", "Already in this shift") : regKind(s, d, per) === "reg" ? L("Đã đăng ký", "Registered") : regKind(s, d, per) === "free" ? L("Rảnh, chưa đăng ký", "Free, not registered") : "";
    return `<div class="border-b border-border p-2"><label class="relative block"><i data-lucide="search" class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"></i><input data-focus-id="add-q" value="${esc(ui.addQ || "")}" oninput="ui.addQ=this.value;renderKeepFocus(this)" placeholder="${L("Tìm nhân viên", "Find staff")}" class="h-10 w-full rounded-xl bg-transparent pr-3 pl-9 text-sm outline-hidden placeholder:text-muted" /></label></div>
      <p class="px-4 pt-2 pb-1 text-xs text-muted">${PERIODS[per].code} · ${dayFull(d)} · ${q ? L("Kết quả tìm", "Search results") : L("Người không đăng ký ca này", "Didn’t register this shift")}</p>
      <ul class="max-h-[min(19rem,calc(100vh-11rem))] overflow-y-auto p-1">${list.map((s) => { const runs = runsOf(s, d); return `<li><button type="button" onclick="addPick('${s.id}',${d},${per})" class="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left outline-hidden hover:bg-item-hover"><span class="min-w-0 flex-1"><span class="block truncate text-sm font-medium">${esc(s.name)}</span><span class="mt-0.5 flex items-center gap-1.5 text-xs text-muted">${s.q.map((x) => posDot(x, "size-1.5")).join("")}${runs.length ? L("Hôm nay ", "Today ") + runs.map((r) => `${PERIODS[r.from].from.slice(0, 2)}–${PERIODS[r.to].to.slice(0, 2)}`).join(", ") : L("Chưa có ca hôm nay", "No shift today")}</span></span>${q && tag(s) ? `<span class="shrink-0 text-xs text-muted">${tag(s)}</span>` : ""}</button></li>`; }).join("") || `<li class="px-3 py-4 text-center text-sm text-muted">${L("Không tìm thấy nhân viên nào", "No staff found")}</li>`}</ul>`;
  }
  return "";
}
function dialogContent() {
  const dl = ui.dialog; if (!dl) return "";
  if (dl.id === "publish") {
    const g = gateItems(); const ok = !g.noShift.length && !g.noPos.length;
    return `<div class="flex items-start gap-2 px-6 pt-5 pb-2"><div class="min-w-0 flex-1"><h2 class="text-lg font-semibold">${L("Công bố lịch tuần 12–18/10?", "Publish week 12–18 Oct?")}</h2><p class="mt-2 text-sm/6 text-pretty text-muted">${ok ? L("Nhân viên sẽ thấy ca của mình ngay. Sau đó mỗi thay đổi có hiệu lực ngay, không công bố lại.", "Staff see their shifts right away. Later changes apply immediately; no re-publishing.") : L("Xong các mục dưới đây thì công bố được.", "Resolve the items below to publish.")}</p></div>${iconBtn("x", L("Đóng", "Close"), `onclick="ui.dialog=null;render()"`, "size-9")}</div>
      <div class="max-h-[55vh] space-y-5 overflow-y-auto px-6 py-4">
        ${g.noShift.length ? `<section><h3 class="mb-2 text-sm font-semibold">${L("Chưa có ca nào", "No shift at all")} <span class="font-normal text-muted">${g.noShift.length}</span></h3><ul class="divide-y divide-border rounded-xl border border-border">${g.noShift.map((s) => `<li class="flex items-center gap-3 px-3 py-2"><span class="min-w-0 flex-1 truncate text-sm">${esc(s.name)}</span>${btn("outline", L("Xếp", "Place"), { attrs: `onclick="gatePlace('${s.id}')"`, extra: "h-8 min-h-8 rounded-lg px-3" })}<button type="button" onclick="openPop(event,'skip','${s.id}')" class="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-muted outline-hidden hover:bg-foreground/5 hover:text-foreground">${L("Bỏ qua tuần này", "Skip this week")}${ic("chevron-down", "size-3.5")}</button></li>`).join("")}</ul></section>` : ""}
        ${g.noPos.length ? `<section><h3 class="mb-2 text-sm font-semibold">${L("Ca chưa có vị trí", "Shifts with no position")} <span class="font-normal text-muted">${g.noPos.length}</span></h3><ul class="divide-y divide-border rounded-xl border border-border">${g.noPos.map(({ s, d, r }) => `<li class="flex items-center gap-3 px-3 py-2"><span class="min-w-0 flex-1 truncate text-sm">${esc(s.name)} <span class="text-muted tabular-nums">· ${dayFull(d)} · ${PERIODS[r.from].from}–${PERIODS[r.to].to}</span></span>${btn("outline", L("Gán vị trí", "Give position"), { attrs: `onclick="ui.dialog=null;openPanel('${s.id}',${d},${r.from})"`, extra: "h-8 min-h-8 rounded-lg px-3" })}</li>`).join("")}</ul></section>` : ""}
        ${[...ui.skipped].length ? `<p class="text-sm text-muted">${L("Đã bỏ qua", "Skipped")}: ${[...ui.skipped].map(([id, r]) => `${esc(ST[id].name)} (${r})`).join(", ")}</p>` : ""}
      </div>
      <div class="flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.dialog=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("primary", L("Công bố", "Publish"), { attrs: `${ok ? "" : "disabled"} onclick="location.href='${link("tt", "cong-bo")}'"`, extra: "min-h-11 md:min-h-10" })}</div>`;
  }
  if (dl.id === "removeDay") {
    const s = ST[ui.panel.sid], d = ui.panel.d, runs = runsOf(s, d);
    return `<div class="flex items-start gap-4 px-6 pt-6"><div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-danger-bg">${ic("calendar-x-2", "size-5 text-danger")}</div><div class="min-w-0 flex-1"><h2 class="text-lg font-semibold text-balance">${L(`Bỏ ${s.name} khỏi mọi ca ngày ${dayFull(d)}?`, `Take ${s.name} off every shift on ${dayFull(d)}?`)}</h2>
      <p class="mt-2 text-sm/6 text-muted">${L("Chưa chọn ca nào nên Lưu được hiểu là bỏ khỏi ca. Các ca sẽ bỏ:", "No shift is selected, so this removes them. Shifts to remove:")}</p>
      <ul class="mt-2 space-y-1 text-sm">${runs.map((r) => { const t = runTime(r); return `<li class="tabular-nums">${t.from}–${t.to} · ${esc(posLabel(r.a.pos, r.a.sub))}</li>`; }).join("")}</ul>${published() ? "" : `<p class="mt-2 text-xs text-muted">${L("Bấm Hoàn tác (Ctrl+Z) nếu bỏ nhầm.", "Use Undo (Ctrl+Z) if this was a mistake.")}</p>`}</div></div>
      <div class="mt-6 flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.dialog=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("danger", L("Bỏ khỏi mọi ca", "Take off every shift"), { attrs: `onclick="removeDay()"`, extra: "min-h-11 md:min-h-10" })}</div>`;
  }
  if (dl.id === "anomaly") {
    const sh = TODAY_SHIFTS[dl.arg]; const s = ST[sh.sid]; const t = lateTier(sh, sh.arrive);
    const opts = [[L("Xác nhận đến đúng giờ", "Confirm on time"), L("Bỏ cả trừ giờ lẫn tính trễ", "Clears deduction and late flag")], [L(`Trừ đủ ${t.late * 2} phút`, `Deduct full ${t.late * 2} min`), ""], [L("Trừ ít hơn", "Deduct less"), ""], [L("Sửa giờ đến", "Correct arrival time"), ""], [L("Không đi làm", "Didn’t work"), L("Ca này 0 giờ, không tính lương", "Shift counts 0 hours, unpaid")]];
    return `<div class="flex items-start gap-4 px-6 pt-6"><div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-err-bg">${ic("triangle-alert", "size-5 text-err")}</div><div class="min-w-0 flex-1"><h2 class="text-lg font-semibold">${L("Ca bất thường", "Anomaly")}</h2><p class="mt-2 text-sm/6 text-muted"><span class="font-medium text-foreground">${esc(s.name)}</span> · ${sh.from}–${sh.to} · ${L(`đến ${sh.arrive}, trễ ${t.late} phút. Khoản trừ ${t.late * 2} phút dài hơn cả ca, nên chưa trừ gì.`, `arrived ${sh.arrive}, ${t.late} min late. The ${t.late * 2}-minute deduction exceeds the shift, so nothing was applied.`)}</p></div></div>
      <fieldset class="space-y-1 px-6 pt-5"><legend class="sr-only">${L("Cách xử lý", "Resolution")}</legend>${opts.map(([a, b], i) => `<label class="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-item-hover"><input type="radio" name="an" ${i === 0 ? "checked" : ""} class="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-surface outline-hidden checked:border-[6px] checked:border-primary" /><span><span class="block text-sm font-medium">${a}</span>${b ? `<span class="block text-xs text-muted">${b}</span>` : ""}</span></label>`).join("")}</fieldset>
      <div class="space-y-1.5 px-6 pt-3"><label class="block w-fit text-sm font-medium">${L("Lý do", "Reason")} <span class="text-red-500">*</span></label><input class="${INPUT}" placeholder="${L("VD: máy chấm công hỏng lúc giao ca", "e.g. device was down at changeover")}" /></div>
      <div class="mt-6 flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.dialog=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("primary", L("Lưu cách xử lý", "Save resolution"), { extra: "min-h-11 md:min-h-10" })}</div>`;
  }
  if (dl.id === "record") {
    const s = ST[dl.arg];
    return `<div class="flex items-start gap-2 px-6 pt-5"><h2 class="min-w-0 flex-1 text-lg font-semibold">${L("Ghi giờ đến", "Record arrival")}</h2>${iconBtn("x", L("Đóng", "Close"), `onclick="ui.dialog=null;render()"`, "size-9")}</div><p class="px-6 pt-1 text-sm text-muted"><span class="font-medium text-foreground">${esc(s.name)}</span> · T4 7/10 · 07:00–11:00</p>
      <div class="space-y-1.5 px-6 pt-5"><label class="block w-fit text-sm font-medium">${L("Giờ đến", "Arrived at")}</label><input class="${INPUT} w-32 tabular-nums" placeholder="07:00" /></div>
      <div class="mt-6 flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.dialog=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("primary", L("Lưu", "Save"), { extra: "min-h-11 md:min-h-10" })}</div>`;
  }
  if (dl.id === "shift") {
    const s = ST[ui.panel.sid]; const d = ui.panel.d; const r = runsOf(s, d)[0];
    const from = r ? PERIODS[r.from].from : "07:00", to = r ? PERIODS[r.to].to : "11:00";
    return `<div class="flex items-start gap-2 px-6 pt-5"><div class="min-w-0 flex-1"><h2 class="text-lg font-semibold">${L("Sửa ca", "Edit shift")}</h2><p class="mt-1 text-sm text-muted"><span class="font-medium text-foreground">${esc(s.name)}</span> · ${dayFull(d)} · ${from}–${to}</p></div>${iconBtn("x", L("Đóng", "Close"), `onclick="ui.dialog=null;render()"`, "size-9")}</div>
      <div class="px-6 pt-4">${segmented([["time", L("Đổi giờ, về sớm", "Change times")], ["swap", L("Đổi ca", "Swap")]], ui.shiftTab, "setShiftTab", L("Loại", "Kind"))}</div>
      ${ui.shiftTab === "time" ? `<div class="grid grid-cols-2 gap-3 px-6 pt-4"><div class="space-y-1.5"><label class="block text-sm font-medium">${L("Từ", "From")}</label><input class="${INPUT} tabular-nums" value="${from}" /></div><div class="space-y-1.5"><label class="block text-sm font-medium">${L("Đến", "To")}</label><input class="${INPUT} tabular-nums border-focus ring-2 ring-focus" value="09:30" /></div></div>
        <div class="mx-6 mt-4 flex gap-3 rounded-xl border border-warn-bg bg-warn-bg p-3">${ic("triangle-alert", "mt-0.5 size-4 text-warn")}<p class="text-sm"><span class="font-medium text-warn">${L("Về sớm 90 phút, cần người làm thay", "Leaving 90 min early needs cover")}</span></p></div>
        <div class="space-y-1.5 px-6 pt-4"><label class="block text-sm font-medium">${L("Người làm thay 09:30–" + to, "Cover 09:30–" + to)} <span class="text-red-500">*</span></label>${selectBtn("", `<span class="font-normal text-muted">${L("Chọn người rảnh giờ này", "Choose someone free then")}</span>`, "", "w-full justify-between")}</div>`
      : `<div class="space-y-1.5 px-6 pt-4"><label class="block text-sm font-medium">${L("Đổi với", "Swap with")}</label>${selectBtn("", "Lê Minh Anh · T5 15/10 · 07:00–13:00", "", "w-full justify-between")}<p class="text-xs text-muted">${L("Hai ca đổi người cho nhau trong một lần lưu.", "Both shifts change hands in one save.")}</p></div>`}
      <div class="space-y-1.5 px-6 pt-4"><label class="block text-sm font-medium">${L("Lý do", "Reason")} <span class="text-red-500">*</span></label><input class="${INPUT}" placeholder="${L("VD: việc gia đình, đã báo qua Zalo", "e.g. family matter, agreed on Zalo")}" /></div>
      <div class="mt-6 flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.dialog=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("primary", L("Lưu", "Save"), { extra: "min-h-11 md:min-h-10" })}</div>`;
  }
  return "";
}
function renderLayer() {
  const layer = document.getElementById("wt-layer");
  let html = "";
  if (ui.pop) {
    const w = { account: 256, filters: 320, stafflist: 320, legend: 340, rules: 340, add: 300, skip: 240, datepick: 300 }[ui.pop.id] || 280;
    const r = ui.pop.rect; let left = ui.pop.alignRight ? r.right - w : r.left; left = Math.max(8, Math.min(left, innerWidth - w - 8));
    const inner = ui.pop.id === "skip" ? `<div class="p-1">${[L("Nghỉ phép", "On vacation"), L("Đăng ký quá ít ca", "Registered too few shifts"), L("Đã đủ người", "Enough staff already")].map((t) => `<button type="button" onclick="skipStaff('${ui.pop.sid}','${esc(t)}')" class="flex h-10 w-full cursor-pointer items-center rounded-xl px-3 text-left text-sm outline-hidden hover:bg-item-hover">${t}</button>`).join("")}</div>` : popContent();
    html += `<div class="fixed inset-0 z-[55]" onclick="closePop()"></div><div data-pop class="wt-fade fixed z-[60] max-h-[calc(100vh-1rem)] overflow-y-auto rounded-2xl border border-border bg-surface-overlay py-1 shadow-popover" style="top:${Math.min(r.bottom + 8, innerHeight - 120)}px;left:${left}px;width:${w}px">${inner}</div>`;
  }
  if (ui.dialog) html += `<div class="fixed inset-0 z-[45] flex items-start justify-center bg-black/30 p-4 pt-16 sm:pt-[8vh]" onclick="if(event.target===this){ui.dialog=null;render()}"><div role="dialog" aria-modal="true" class="wt-fade w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-modal">${dialogContent()}</div></div>`;
  const narrow = innerWidth < 1024;
  if (S.man === "lich" && narrow && ui.panel && S.tt !== "dang-tai" && S.tt !== "loi") html += `<div class="fixed inset-0 z-40 bg-black/15" onclick="closePanel()"></div><div role="dialog" class="wt-sheet fixed inset-x-0 bottom-0 z-40 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-surface shadow-modal" data-wf-block="5"><div class="mx-auto mt-2 h-1 w-10 rounded-full bg-foreground/15"></div>${panelBody(true)}</div>`;
  if (S.man === "lich" && ui.sheet === "staff") html += `<div class="fixed inset-0 z-40 bg-black/15" onclick="ui.sheet=null;render()"></div><div class="wt-sheet fixed inset-x-0 bottom-0 z-40 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-surface shadow-modal"><div class="mx-auto mt-2 h-1 w-10 rounded-full bg-foreground/15"></div><div class="flex items-center px-5 pt-3 pb-2"><h2 class="text-lg font-semibold">${L("Nhân viên", "Staff")}</h2><span class="ml-auto">${iconBtn("x", L("Đóng", "Close"), `onclick="ui.sheet=null;render()"`, "size-9")}</span></div><div class="overflow-y-auto px-4 pb-6">${staffList(true)}</div></div>`;
  if (S.man === "nv" && ui.staffEdit) html += `<div class="fixed inset-0 z-40 bg-black/15" onclick="ui.staffEdit=null;render()"></div><aside class="wt-fade fixed inset-y-0 right-0 z-40 flex w-full flex-col border-l border-border bg-surface shadow-modal sm:w-[28rem]" data-wf-block="5">${staffForm()}</aside>`;
  layer.innerHTML = html;
}

// ===================================================================
// Hành động (chỉ đổi dữ liệu mẫu trong bộ nhớ)
// ===================================================================
function openPop(e, id, a, b) {
  e.stopPropagation();
  const r = e.currentTarget.getBoundingClientRect();
  ui.pop = { id, rect: r, alignRight: ["account", "legend", "rules", "filters", "skip"].includes(id) && r.left > innerWidth / 2, d: a, per: b, sid: a };
  ui.popView = null;
  if (id === "add") ui.addQ = "";
  if (id === "filters" && r.left < innerWidth / 2) ui.pop.alignRight = false;
  render();
}
function closePop() { ui.pop = null; render(); }
function openDialog(id, arg) { ui.dialog = { id, arg }; ui.pop = null; render(); }
function openPanel(sid, d, p) {
  ui.panel = { sid, d, sel: new Set(p != null ? [p] : []) };
  const a = p != null ? asgAt(ST[sid], d, p) : null;
  ui.posPick = a ? a.pos.slice() : []; ui.subPick = a ? a.sub.slice() : [];
  ui.saveAs = a && !a.t ? "std" : "reg"; ui.panelMsg = "";
  ui.pop = null; render();
}
function closePanel() { ui.panel = null; render(); }
function panelDay(dir) { const days = visibleDays(); const i = days.indexOf(ui.panel.d) + dir; if (days[i] != null) { ui.panel.d = days[i]; ui.panel.sel = new Set(); ui.panelMsg = ""; render(); } }
function togglePeriod(p) { const s = ui.panel.sel; s.has(p) ? s.delete(p) : s.add(p); ui.panelMsg = ""; render(); }
function quickSel(k) { const s = ST[ui.panel.sid], d = ui.panel.d; ui.panel.sel = new Set(k === "all" ? [0, 1, 2, 3, 4] : k === "none" ? [] : PERIODS.filter((p) => regKind(s, d, p.i) !== "no").map((p) => p.i)); ui.panelMsg = ""; render(); }
function pickPos(id) { const i = ui.posPick.indexOf(id); i >= 0 ? ui.posPick.splice(i, 1) : ui.posPick.push(id); ui.subPick = ui.subPick.filter((s) => ui.posPick.some((p) => POS[p].subs.some((x) => x[0] === s))); ui.panelMsg = ""; render(); }
function pickSub(id) { const i = ui.subPick.indexOf(id); i >= 0 ? ui.subPick.splice(i, 1) : ui.subPick.push(id); render(); }
function toggleSec(k) { ui.secClosed.has(k) ? ui.secClosed.delete(k) : ui.secClosed.add(k); render(); }
function setSaveAs(v) { ui.saveAs = v; render(); }
// Lưu và Bỏ khỏi ca luôn bấm được (góp ý 10/10). Không chọn ca nào = bỏ khỏi mọi ca trong ngày, có hộp xác nhận.
function panelAct(kind) {
  const { sid, d, sel } = ui.panel; const s = ST[sid]; const day = W().asg[sid][d];
  ui.panelMsg = "";
  if (!sel.size) {
    if (!Object.keys(day).length) { ui.panelMsg = L("Người này chưa có ca nào trong ngày. Chọn ca để xếp.", "They have no shift this day. Choose a shift to place them."); return render(); }
    return openDialog("removeDay");
  }
  if (kind === "save" && published() && !ui.posPick.length) { ui.panelMsg = L("Ca đã công bố phải có vị trí. Chọn vị trí rồi Lưu.", "A published shift needs a position. Choose one, then Save."); return render(); }
  snapshot();
  const cu = customAt(s, d);
  for (const p of sel) {
    const key = `${sid}|${d}|${p}`;
    if (kind === "remove") { delete day[p]; ui.manual.delete(key); }
    // Lưu áp đúng những gì đang chọn: không chọn vị trí nào = xếp vào ca, chưa có vị trí
    // (cũng là cách gỡ vị trí đã gán nhầm); có vị trí = xếp và gán luôn.
    if (kind === "save") {
      const was = day[p];
      day[p] = { pos: ui.posPick.slice(), sub: ui.subPick.slice() };
      if (cu?.[p] && regKind(s, d, p) === "reg" && ui.saveAs === "reg") day[p].t = { ...cu[p] };
      if (!was && regKind(s, d, p) === "no") ui.manual.set(key, ++ui.seq);
    }
  }
  render();
}
function removeDay() {
  const { sid, d } = ui.panel; snapshot();
  for (const p in W().asg[sid][d]) ui.manual.delete(`${sid}|${d}|${p}`);
  W().asg[sid][d] = {}; ui.dialog = null; ui.panel.sel = new Set(); render();
}
// Hoàn tác / làm lại việc xếp ca và giao vị trí: chỉ trong phiên đang mở, chỉ khi còn nháp
const snapOf = () => structuredClone({ asg: DATA.asg, manual: [...ui.manual] });
function snapshot() { if (published() || readOnly()) return; ui.hist.push(snapOf()); if (ui.hist.length > 100) ui.hist.shift(); ui.fut = []; }
function restoreSnap(x) { DATA.asg = x.asg; ui.manual = new Map(x.manual); ui.panelMsg = ""; }
function undo() { if (!ui.hist.length || published() || readOnly()) return; ui.fut.push(snapOf()); restoreSnap(ui.hist.pop()); render(); }
function redo() { if (!ui.fut.length || published() || readOnly()) return; ui.hist.push(snapOf()); restoreSnap(ui.fut.pop()); render(); }
// Phân công: số người cần
function setNeed(d, p, pid, v) { ui.need[d][p][pid] = Math.max(0, Math.min(20, parseInt(v, 10) || 0)); ui.needCopied = false; render(); }
function copyNeed() { ui.need = structuredClone(PREV_NEED); ui.needCopied = true; render(); }
function addPick(sid, d, p) { ui.sel.add(sid); openPanel(sid, d, p); }
function gatePlace(sid) { const s = ST[sid]; const d = WEEK.findIndex((_, i) => PERIODS.some((p) => canWork(s, i, p.i))); ui.dialog = null; openPanel(sid, Math.max(0, d), null); }
function skipStaff(sid, reason) { ui.skipped.set(sid, reason); ui.pop = null; render(); }
function toggleStaff(id) { ui.sel.has(id) ? ui.sel.delete(id) : ui.sel.add(id); render(); }
function onlyStaff(id) { ui.sel = new Set([id]); render(); }
function masterToggle() { const inR = ACTIVE.filter((s) => inRange(s, visibleDays())); const all = inR.every((s) => ui.sel.has(s.id)); ui.sel = all ? new Set() : new Set(ACTIVE.map((s) => s.id)); render(); }
function invertSel() { ui.sel = new Set(ACTIVE.filter((s) => !ui.sel.has(s.id)).map((s) => s.id)); render(); }
function optToggle(gi, oi) { const set = FG[gi].opts[oi][2]; const all = set.every((s) => ui.sel.has(s.id)); for (const s of set) all ? ui.sel.delete(s.id) : ui.sel.add(s.id); render(); }
function optOnly(gi, oi) { ui.sel = new Set(FG[gi].opts[oi][2].map((s) => s.id)); render(); }
function setView(v) { ui.view = v; if (v === "week") ui.start = 0; if (v === "3d") ui.start = Math.min(ui.start, 4); if (ui.panel && !visibleDays().includes(ui.panel.d)) ui.panel = null; render(); }
function calMove(dir) {
  const n = visibleDays().length;
  if (ui.view === "week" || (dir < 0 && ui.start === 0)) { if (dir < 0) { ui.weekOff = -1; ui.panel = null; } else ui.weekOff = 0; ui.start = 0; }
  else ui.start = Math.max(0, Math.min(7 - n, ui.start + dir * n));
  if (ui.panel && !visibleDays().includes(ui.panel.d)) ui.panel = null;
  render();
}
function calToday() { ui.weekOff = 0; ui.start = 0; render(); }
function calOldest() { ui.weekOff = -1; ui.start = 0; ui.panel = null; render(); }
function jumpTo(n) {
  const off = n < 12 ? -1 : 0, di = n - (off < 0 ? 5 : 12);
  if (off !== ui.weekOff) ui.panel = null;
  ui.weekOff = off; ui.start = ui.view === "week" ? 0 : ui.view === "3d" ? Math.min(di, 4) : di;
  ui.mDay = di; ui.pop = null;
  if (ui.panel && !visibleDays().includes(ui.panel.d)) ui.panel = null;
  render();
}
function setRosterDay(v) { ui.rosterDay = v; render(); }
function setMDay(v) { ui.mDay = v; if (ui.panel) ui.panel = null; render(); }
function setLateDay(v) { ui.lateDay = v; ui.lateEdit = null; render(); }
function editLate(i) { ui.lateEdit = i; ui.lateVal = TODAY_SHIFTS[i]?.arrive || ""; render(); setTimeout(() => document.querySelector('[data-focus-id="late-in"]')?.focus(), 30); }
function saveLate(i) { TODAY_SHIFTS[i].arrive = ui.lateVal.padStart(5, "0"); ui.lateEdit = null; render(); }
// Bỏ chọn ca có giờ riêng thì xoá luôn giờ riêng của ca đó, có báo nhỏ.
function dropCustom(d, p) { if (!ui.custom[d]?.[p]) return false; ui.custom[d] = { ...ui.custom[d] }; delete ui.custom[d][p]; if (!Object.keys(ui.custom[d]).length) delete ui.custom[d]; return true; }
function toggleReg(d, p) {
  const r = (ui.ranh[d] || []).slice(); const i = r.indexOf(p); ui.dayMsg = null; ui.footMsg = "";
  if (i >= 0) {
    if (ui.cOpen && ui.cOpen.d === d && ui.cOpen.p === p) { ui.cOpen = null; ui.cMsg = ""; }
    r.splice(i, 1);
    if (dropCustom(d, p)) ui.dayMsg = { d, t: L(`Đã bỏ giờ riêng ${PERIODS[p].code}.`, `Removed own times for ${PERIODS[p].code}.`) };
  } else { r.push(p); r.sort(); }
  ui.ranh[d] = r.length ? r : null; render();
}
function toggleAllDay(d) {
  ui.dayMsg = null;
  if (ui.ranh[d] && ui.ranh[d].length === 5) { const had = Object.keys(ui.custom[d] || {}).length; delete ui.custom[d]; ui.ranh[d] = null; if (ui.cOpen?.d === d) ui.cOpen = null; if (had) ui.dayMsg = { d, t: L("Đã bỏ cả giờ riêng của ngày này.", "Own times for this day were removed too.") }; return render(); }
  ui.ranh[d] = [0, 1, 2, 3, 4]; render();
}
function setWeek(all) { ui.ranh = WEEK.map(() => (all ? [0, 1, 2, 3, 4] : null)); ui.custom = {}; ui.cOpen = null; ui.dayMsg = null; render(); }
function customErr(d, p, from, to) {
  if (hm(to) <= hm(from)) return L("Giờ ra phải sau giờ vào.", "Out must be after in.");
  if ((hm(from) < hm(PERIODS[p].from) || hm(to) > hm(PERIODS[p].to))) return L(`Giờ riêng phải nằm trong khung ${PERIODS[p].code} (${PERIODS[p].from}–${PERIODS[p].to}).`, `Own times must stay within ${PERIODS[p].code} (${PERIODS[p].from}–${PERIODS[p].to}).`);
  return "";
}
const cBase = () => ui.custom[ui.cOpen.d]?.[ui.cOpen.p] || { from: PERIODS[ui.cOpen.p].from, to: PERIODS[ui.cOpen.p].to };
const cDirty = () => !!ui.cOpen && (ui.cOpen.from !== cBase().from || ui.cOpen.to !== cBase().to);
function toggleCustom(d) {
  if (ui.cOpen && ui.cOpen.d === d) { if (cDirty()) { ui.cMsg = L("Lưu hoặc Huỷ giờ riêng trước.", "Save or cancel these own times first."); return render(); } return closeCustom(); }
  const r = ui.ranh[d] || []; const first = r.find((q) => ui.custom[d]?.[q]) ?? r[r.length - 1];
  if (first != null) openCustom(d, first);
}
function pickCustomP(d, p) { if (ui.cOpen && ui.cOpen.p === p) return; openCustom(d, p); }
function openCustom(d, p) {
  if (ui.cOpen && ui.cOpen.d === d && ui.cOpen.p === p) { if (!cDirty()) closeCustom(); return; }
  if (cDirty()) { ui.cMsg = L("Lưu hoặc Huỷ giờ riêng trước.", "Save or cancel these own times first."); if (ui.cOpen.d !== d) ui.dayMsg = { d, t: L(`Còn giờ riêng chưa lưu ở ${dayShort(ui.cOpen.d)} ${PERIODS[ui.cOpen.p].code}. Lưu hoặc Huỷ trước.`, `Unsaved own times on ${dayShort(ui.cOpen.d)} ${PERIODS[ui.cOpen.p].code}. Save or cancel first.`) }; return render(); }
  const b = ui.custom[d]?.[p] || { from: PERIODS[p].from, to: PERIODS[p].to };
  ui.cOpen = { d, p, from: b.from, to: b.to }; ui.cMsg = ""; ui.dayMsg = null; render();
}
function setCEdit(k, v) { ui.cOpen[k] = v; ui.cMsg = ""; ui.footMsg = ""; render(); }
// Huỷ: có giờ riêng đã lưu thì trả về giá trị đó (ô vẫn mở); chưa có thì đóng, ca giữ giờ gốc.
function cancelCustom() { if (ui.custom[ui.cOpen.d]?.[ui.cOpen.p]) { Object.assign(ui.cOpen, cBase()); ui.cMsg = ""; ui.dayMsg = null; render(); } else closeCustom(); }
// Đóng (×): bỏ thay đổi chưa lưu, không hỏi lại; giờ riêng đã lưu giữ nguyên.
function closeCustom() { ui.cOpen = null; ui.cMsg = ""; ui.footMsg = ""; ui.dayMsg = null; render(); }
function saveCustom() {
  const { d, p, from, to } = ui.cOpen; const e = customErr(d, p, from, to);
  if (e) { ui.cMsg = e; return render(); }
  const P = PERIODS[p];
  if (from === P.from && to === P.to) dropCustom(d, p); // về đúng giờ gốc = không còn là giờ riêng
  else ui.custom[d] = { ...(ui.custom[d] || {}), [p]: { from, to } };
  ui.cMsg = ""; ui.footMsg = ""; ui.dayMsg = null; render();
}
function deleteCustom() { const { d, p } = ui.cOpen; dropCustom(d, p); Object.assign(ui.cOpen, { from: PERIODS[p].from, to: PERIODS[p].to }); ui.cMsg = ""; render(); }
function openNote(d) { ui.noteOpen.add(d); render(); setTimeout(() => document.querySelector(`[data-focus-id="note-${d}"]`)?.focus(), 30); }
function closeNote(d) { delete ui.notes[d]; ui.noteOpen.delete(d); render(); }
function setNote(d, el) { if (el.value) ui.notes[d] = el.value; else delete ui.notes[d]; renderKeepFocus(el); }
function saveRanh() {
  if (cDirty()) { const { d, p } = ui.cOpen; ui.footMsg = L(`Còn giờ riêng chưa lưu ở ${dayShort(d)} ${PERIODS[p].code}. Lưu hoặc Huỷ trước.`, `Unsaved own times on ${dayShort(d)} ${PERIODS[p].code}. Save or cancel first.`); ui.cMsg = L("Lưu hoặc Huỷ giờ riêng trước.", "Save or cancel these own times first."); return render(); }
  ui.footMsg = ""; ui.ranhSaved = structuredClone(ui.ranh); ui.customSaved = structuredClone(ui.custom); ui.notesSaved = { ...ui.notes }; ui.savedAt = L("vừa xong", "just now"); render(); }
function discardRanh() { ui.cOpen = null; ui.cMsg = ""; ui.footMsg = ""; ui.dayMsg = null; ui.ranh = structuredClone(ui.ranhSaved); ui.custom = structuredClone(ui.customSaved); ui.notes = { ...ui.notesSaved }; ui.noteOpen.clear(); render(); }
function setNvTab(v) { ui.nvTab = v; render(); }
function setShiftTab(v) { ui.shiftTab = v; render(); }
function setLang(v) { location.href = link("lang", v); }
function noop() {}
function renderKeepFocus(el) { const id = el.dataset.focusId; const pos = el.selectionStart; render(); const n = document.querySelector(`[data-focus-id="${id}"]`); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch {} } }

// ===================================================================
// Render
// ===================================================================
const SCREEN_FN = { lich: screenLich, tre: screenTre, ranh: screenRanh, ca: screenCa, nv: screenNv, nk: screenNk, dn: screenDn };
function render() {
  const main = document.getElementById("wf-design");
  if (S.kho === "mobile" && !FRAME) {
    // Thêm tham số đổi mỗi lần để khung mobile không lấy wireframe.html và script cũ trong cache của trình duyệt
    const src = `${location.pathname}${location.search}${location.search ? "&" : "?"}nocache=${Date.now()}#${token({ ...S, kho: "desktop" }, true)}`;
    main.innerHTML = `<div style="display:grid;place-items:center;padding:24px"><iframe src="${src}" title="Mobile" style="width:375px;height:812px;border:1px solid #ddd;border-radius:24px;background:#fff"></iframe></div>`;
    return;
  }
  const y = scrollY;
  main.innerHTML = SCREEN_FN[S.man]();
  renderLayer();
  for (const el of document.querySelectorAll("[data-indet]")) el.indeterminate = true;
  const pop = document.querySelector("[data-pop]");
  if (pop) {
    // Đủ chỗ dưới nút thì giữ khung dưới nút, cuộn bên trong; chật quá mới lật lên trên (overlay.md, "Gần mép thì lật").
    const top = pop.getBoundingClientRect().top, room = innerHeight - top - 8;
    if (pop.offsetHeight > room) { if (room >= 260) pop.style.maxHeight = `${room}px`; else pop.style.top = `${Math.max(8, innerHeight - pop.offsetHeight - 8)}px`; }
  }
  scrollTo(0, y);
  requestAnimationFrame(() => requestAnimationFrame(placeBlockNumbers));
}

// Tooltip cho máy có chuột
const tip = document.getElementById("wt-tip");
document.addEventListener("mouseover", (e) => {
  const t = e.target.closest?.("[data-tip]");
  if (!t || !matchMedia("(hover: hover)").matches) { tip.classList.add("hidden"); return; }
  tip.innerHTML = t.dataset.tip; tip.classList.remove("hidden");
  const r = t.getBoundingClientRect(); const w = tip.offsetWidth;
  tip.style.left = `${Math.max(8, Math.min(r.left, innerWidth - w - 8))}px`;
  tip.style.top = `${r.bottom + 6 + tip.offsetHeight > innerHeight ? r.top - tip.offsetHeight - 6 : r.bottom + 6}px`;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { ui.pop = null; ui.dialog = null; ui.drawer = false; ui.sheet = null; render(); return; }
  // Ctrl+Z / Ctrl+Y (và Ctrl+Shift+Z) trên Lịch tuần; không chặn khi đang gõ trong ô nhập
  if (S.man !== "lich" || !(e.ctrlKey || e.metaKey) || e.target.closest?.("input, textarea")) return;
  const k = e.key.toLowerCase();
  if (k === "z" && !e.shiftKey) { e.preventDefault(); undo(); } else if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
});
addEventListener("scroll", () => tip.classList.add("hidden"), { passive: true });
// Tên icon không có trong bản lucide đang dùng thì đổi sang "circle": thẻ <i> không được thay sẽ làm observer gọi lại mãi, treo trang.
new MutationObserver(() => {
  const pending = document.querySelectorAll("i[data-lucide]"); if (!pending.length) return;
  for (const i of pending) { const k = i.dataset.lucide.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(""); if (!lucide.icons[k]) { console.warn("Thiếu icon", i.dataset.lucide); i.dataset.lucide = "circle"; } }
  lucide.createIcons();
}).observe(document.body, { childList: true, subtree: true });

function placeBlockNumbers() {
  const isOverlap = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  for (const block of document.querySelectorAll("[data-wf-block]")) {
    const br = block.getBoundingClientRect();
    const nr = { left: br.left + 4, top: br.top + 4, right: br.left + 22, bottom: br.top + 22 };
    const rects = [...block.querySelectorAll("svg, img, input, button")].map((n) => n.getBoundingClientRect());
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) { if (!n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n); rects.push(...rg.getClientRects()); }
    block.toggleAttribute("data-wf-block-out", rects.some((r) => r.width > 0 && isOverlap(r, nr)));
  }
}
addEventListener("resize", () => { placeBlockNumbers(); });

// Mặc định: mở sẵn panel của một người để thấy khuôn panel (chỉ ở desktop)
if (S.man === "lich" && !FRAME && ["du-lieu", "chua-vi-tri", "cong-bo", "mo-dk"].includes(S.tt) && innerWidth >= 1024) openPanel("s1", 2, 2);
buildBar();
buildReason();
render();
