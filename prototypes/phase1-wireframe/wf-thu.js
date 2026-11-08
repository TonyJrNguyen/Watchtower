// ===================================================================
// Trạng thái "Trải nghiệm" (tt = thu)
// ===================================================================
// Chỉ có dữ liệu nhân viên: đăng ký, ca, vị trí, số người cần, đi trễ và nhật ký đều bắt đầu trống, để khách tự đi hết
// một vòng: nhân viên đăng ký → khoá đăng ký → chủ quán xếp ca, giao vị trí → công bố → ghi đi trễ, nhân viên xem ca.
// Dữ liệu nằm trong localStorage của trình duyệt (dự phòng window.name), nên đổi màn hay tải lại trang vẫn còn;
// "Làm lại từ đầu" xoá hết. Đồng hồ là đồng hồ giả: mỗi lần lưu tiến vài phút, dải Trải nghiệm có nút tua tới mốc kế tiếp.
// File nạp sau wf-data.js, trước wf-app.js: thay dữ liệu mẫu bằng dữ liệu đã lưu trước khi wf-app.js dựng màn.
// Các hàm gọi lúc chạy (sau khi trang nạp xong) dùng được mọi thứ của wf-app.js.

const SB_KEY = "watchtower-wf-thu-v1";
// tt nằm ở vị trí thứ 9 của #hash (TOKEN_KEYS trong wf-app.js); không có hash thì đọc ?tt=
const SANDBOX = (() => { const h = location.hash.slice(1); return ((/^[A-Za-z0-9._~-]+$/.test(h) && h.split(".")[8]) || new URLSearchParams(location.search).get("tt")) === "thu"; })();

// phase: open (đăng ký đang mở) → locked (đã khoá, chủ đang xếp) → published (đã công bố).
// clock: phút kể từ T5 8/10 00:00. day: ngày đang là "hôm nay" trong tuần 12–18/10 sau khi công bố (-1 = tuần chưa bắt đầu).
const sbFresh = () => ({ phase: "open", clock: 8 * 60, day: -1, me: "s7", saved: {}, draft: {}, auto: {}, regSave: {}, asg: null, manual: [], need: null, skipped: [], arrive: {}, resolved: {}, staff: {}, audit: [] });
function sbLoad() {
  let raw = null;
  try { raw = localStorage.getItem(SB_KEY); } catch {}
  if (!raw && window.name.startsWith(SB_KEY)) raw = window.name.slice(SB_KEY.length);
  try { return raw ? { ...sbFresh(), ...JSON.parse(raw) } : sbFresh(); } catch { return sbFresh(); }
}
const SB = SANDBOX ? sbLoad() : null;
function sbSave() { const raw = JSON.stringify(SB); try { localStorage.setItem(SB_KEY, raw); } catch {} try { window.name = SB_KEY + raw; } catch {} }

// Bản mẫu giữ lại cho các lối tắt "Đăng ký mẫu" (chỉ dùng khi khách bấm)
const SB_SAMPLE = structuredClone({ reg: WEEK_DATA.reg, custom: WEEK_DATA.custom, note: WEEK_DATA.note });
const SB_TYPE = Object.fromEntries(STAFF.map((s) => [s.id, s.type]));
const SB_EMPTY = () => ({ reg: WEEK.map(() => null), custom: {}, notes: {} });
const sbMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

if (SANDBOX) {
  if (!ST[SB.me] || ST[SB.me].left) SB.me = "s7";
  for (const [id, o] of Object.entries(SB.staff)) if (ST[id]) Object.assign(ST[id], o);
  for (const k in REG_SAVE) delete REG_SAVE[k];
  Object.assign(REG_SAVE, SB.regSave);
  AUDIT.splice(0, AUDIT.length, ...SB.audit);
  TODAY_SHIFTS.length = 0;
  // Chủ quán chỉ thấy bản đã Lưu. Không chọn ca nào (hoặc chưa lưu) = rảnh cả tuần.
  for (const s of STAFF) {
    const v = SB.saved[s.id], n = v ? v.reg.reduce((a, r) => a + (r ? r.length : 0), 0) : 0;
    WEEK_DATA.reg[s.id] = WEEK.map((_, d) => (v?.reg[d]?.length ? v.reg[d].slice() : null));
    s.type = n === 35 ? "all" : n ? "some" : "none";
  }
  WEEK_DATA.custom = Object.fromEntries(Object.entries(SB.saved).map(([id, v]) => [id, structuredClone(v.custom)]));
  WEEK_DATA.note = Object.fromEntries(Object.entries(SB.saved).map(([id, v]) => [id, { ...v.notes }]));
  WEEK_DATA.asg = SB.asg || Object.fromEntries(STAFF.map((s) => [s.id, WEEK.map(() => ({}))]));
  sbHours();
}
// Giờ đã làm theo vị trí (FR-A14): ca đã công bố của những ngày đã qua, theo giờ đồng hồ
function sbHours() {
  for (const k in HOURS) delete HOURS[k];
  if (SB.phase !== "published") return;
  for (const s of STAFF) for (let d = 0; d < SB.day; d++) for (const [p, a] of Object.entries(WEEK_DATA.asg[s.id][d])) {
    const P = PERIODS[p], t = a.t || P, pid = a.pos[0];
    if (!pid) continue;
    const h = Math.max(0, Math.min(sbMin(t.to), sbMin(P.to)) - Math.max(sbMin(t.from), sbMin(P.from))) / 60;
    (HOURS[s.id] ||= {})[pid] = (HOURS[s.id][pid] || 0) + h;
  }
  for (const o of Object.values(HOURS)) for (const k in o) o[k] = Math.round(o[k] * 10) / 10;
}

// ---------- Đồng hồ giả và nhật ký ----------
const SB_WD = { 8: ["T5", "Thu"], 9: ["T6", "Fri"], 10: ["T7", "Sat"], 11: ["CN", "Sun"], 12: ["T2", "Mon"], 13: ["T3", "Tue"], 14: ["T4", "Wed"], 15: ["T5", "Thu"], 16: ["T6", "Fri"], 17: ["T7", "Sat"], 18: ["CN", "Sun"] };
const SB_WEEK = ["Tuần 12–18/10", "Week 12–18 Oct"];
const SB_LOCK = 2220; // T6 9/10 13:00
const p2 = (n) => String(n).padStart(2, "0");
const sbHM = (m) => `${p2(Math.floor((m % 1440) / 60))}:${p2(m % 60)}`;
const sbDate = (m) => 8 + Math.floor(m / 1440);
const sbAt = (m) => `${p2(sbDate(m))}/10 ${sbHM(m)}`;
const sbNow = () => { const dd = sbDate(SB.clock); return L(`${SB_WD[dd][0]} ${dd}/10 ${sbHM(SB.clock)}`, `${SB_WD[dd][1]} ${dd} Oct ${sbHM(SB.clock)}`); };
const sbDayStart = (d) => (4 + d) * 1440 + 7 * 60; // 07:00 của ngày d trong tuần 12–18/10
const sbLeft = () => { const m = SB_LOCK - SB.clock, h = Math.floor(m / 60), r = m % 60; return L(`còn ${h ? `${h} giờ ` : ""}${r} phút`, `${h ? `${h}h ` : ""}${r} min left`); };
function sbTick(a, b = a) { SB.clock += a + Math.floor(Math.random() * (b - a + 1)); if (SB.phase === "open") SB.clock = Math.min(SB_LOCK - 1, SB.clock); }
// Chuỗi hai thứ tiếng cho nhật ký: chạy hàm một lần bằng VI, một lần bằng EN
const both = (fn) => { const k = S.lang; S.lang = "vi"; const a = fn(); S.lang = "en"; const b = fn(); S.lang = k; return [a, b]; };
function sbLog(e, m = SB.clock) {
  SB.audit.push({ m, at: sbAt(m), who: "owner", sid: null, day: "", before: "—", after: "—", reason: "", ...e });
  SB.audit.sort((a, b) => b.m - a.m);
  AUDIT.splice(0, AUDIT.length, ...SB.audit);
}
const sbSavedAt = (m) => both(() => L(`Lưu lúc ${regT(m)}`, `Saved ${regT(m)}`));
const sbRunsTxt = (s, d, day) => { const r = runsOf(s, d, day); return r.length ? both(() => r.map((x) => { const t = runTime(x); return `${t.from}–${t.to} · ${posLabel(x.a.pos, x.a.sub)}`; }).join("; ")) : "—"; };
// Một lần Lưu ở panel = một dòng nhật ký cho người × ngày đó
function sbLogDay(s, d, before, after, reason = "") {
  const b = runsOf(s, d, before), a = runsOf(s, d, after);
  const sig = (day) => JSON.stringify(Object.entries(day).map(([p, x]) => [p, x.pos, x.sub, x.t || null]));
  if (sig(before) === sig(after)) return;
  const periods = (day) => JSON.stringify(Object.entries(day).map(([p, x]) => [p, x.t || null]));
  const outside = Object.keys(after).some((p) => !before[p] && regKind(s, d, +p) === "no");
  const what = !b.length ? (outside ? ["Xếp ngoài lịch rảnh", "Placed outside availability"] : ["Xếp ca", "Placed"])
    : !a.length ? ["Bỏ khỏi ca", "Taken off"] : periods(before) === periods(after) ? ["Gán vị trí", "Gave position"] : ["Sửa ca", "Changed shift"];
  sbTick(1, 3);
  sbLog({ what, sid: s.id, day: both(() => dayFull(d)), before: sbRunsTxt(s, d, before), after: sbRunsTxt(s, d, after), reason, draft: SB.phase !== "published" });
}

// ---------- Giữ dữ liệu qua các màn ----------
function sbInitUi() {
  const sv = SB.saved[SB.me] || SB_EMPTY(), dr = SB.draft[SB.me] || sv;
  ui.ranhSaved = structuredClone(sv.reg); ui.customSaved = structuredClone(sv.custom); ui.notesSaved = { ...sv.notes };
  ui.ranh = structuredClone(dr.reg); ui.custom = structuredClone(dr.custom); ui.notes = { ...dr.notes };
  ui.savedAt = SB.regSave[SB.me] ? regT(SB.regSave[SB.me].last) : null;
  ui._ranhInit = true;
  ui.need = SB.need || WEEK.map(() => PERIODS.map(() => needFrom(0)));
  ui.manual = new Map(SB.manual); ui.skipped = new Map(SB.skipped);
  ui.lateDay = Math.max(0, SB.day); ui.rosterDay = 0; ui.mDay = 0;
}
// Gọi mỗi lần vẽ lại: chép thay đổi trong trang vào kho rồi lưu
function sbPersist() {
  if (S.man === "lich") { SB.asg = DATA.asg; SB.manual = [...ui.manual]; SB.need = ui.need; SB.skipped = [...ui.skipped]; }
  if (S.man === "ranh" && SB.phase === "open") {
    const v = JSON.stringify({ reg: ui.ranh, custom: ui.custom, notes: ui.notes }), sv = SB.saved[SB.me] || SB_EMPTY(), dr = SB.draft[SB.me];
    if (v === JSON.stringify({ reg: sv.reg, custom: sv.custom, notes: sv.notes })) delete SB.draft[SB.me];
    else if (!dr || v !== JSON.stringify({ reg: dr.reg, custom: dr.custom, notes: dr.notes })) SB.draft[SB.me] = { ...JSON.parse(v), at: SB.clock };
  }
  sbSave();
}
// Hành động trên dải Trải nghiệm đổi dữ liệu gốc, nên lưu rồi nạp lại trang
function sbGo(href) { sbSave(); if (href && href !== location.hash) location.href = href; else location.reload(); }
const sbLink = (m) => `#${token({ ...S, man: m, v: SCREENS[m].rec, tt: "thu" })}`;

// ---------- Đăng ký ----------
function sbStoreReg(id, v, a = 3, b = 25) {
  const prev = SB.regSave[id]; sbTick(a, b);
  SB.regSave[id] = { first: prev ? prev.first : SB.clock, last: SB.clock };
  SB.saved[id] = structuredClone({ reg: v.reg, custom: v.custom, notes: v.notes }); delete SB.draft[id];
  REG_SAVE[id] = SB.regSave[id];
  sbLog({ who: "staff", what: ["Lưu đăng ký", "Saved registration"], sid: id, day: SB_WEEK, before: prev ? sbSavedAt(prev.last) : "—", after: sbSavedAt(SB.clock) });
}
// Lối tắt: người chưa lưu gì (trừ người đang có nháp) lưu theo dữ liệu mẫu; ai mẫu là "không đăng ký" thì vẫn để trống như thật
const sbRegTodo = () => ACTIVE.filter((s) => s.user && !SB.saved[s.id] && !SB.draft[s.id]);
function sbFillReg() {
  for (const s of sbRegTodo().sort(() => Math.random() - 0.5)) {
    const t = SB_TYPE[s.id];
    if (t === "none") continue;
    const reg = t === "all" ? WEEK.map(() => [0, 1, 2, 3, 4]) : SB_SAMPLE.reg[s.id].map((r) => (r ? r.slice() : null));
    sbStoreReg(s.id, { reg, custom: SB_SAMPLE.custom[s.id] || {}, notes: SB_SAMPLE.note[s.id] || {} }, 20, 110);
  }
  sbGo();
}
// Khoá lúc 13:00 T6: bản nháp chưa lưu được tự lưu, lấy giờ sửa cuối của nháp làm giờ lưu (FR-S23)
function sbLock() {
  for (const [id, dr] of Object.entries(SB.draft)) {
    const prev = SB.regSave[id];
    SB.saved[id] = { reg: dr.reg, custom: dr.custom, notes: dr.notes }; SB.auto[id] = true;
    SB.regSave[id] = { first: prev ? prev.first : dr.at, last: dr.at };
    sbLog({ who: "system", what: ["Tự lưu bản nháp khi khoá", "Draft saved at lock"], sid: id, day: SB_WEEK, before: prev ? sbSavedAt(prev.last) : "—", after: sbSavedAt(dr.at) }, SB_LOCK);
  }
  SB.draft = {}; SB.phase = "locked"; SB.clock = SB_LOCK;
  sbLog({ who: "system", what: ["Khoá đăng ký", "Registration locked"], day: SB_WEEK, before: ["Đang mở", "Open"], after: ["Đã khoá", "Locked"] });
  sbGo(S.man === "ranh" || S.man === "dn" ? sbLink("lich") : null);
}

// ---------- Xếp ca (lối tắt) ----------
const sbNeedEmpty = () => ui.need.every((row) => row.every((o) => Object.values(o).every((n) => !n)));
function sbFillNeed() { ui.need = NEED.map((row) => row.map(needFrom)); SB.need = ui.need; sbGo(); }
// Xếp theo số người cần: người đã đăng ký ca đó và có kinh nghiệm vị trí đó, ưu tiên người đang làm ca ngay trước, rồi theo thứ tự đăng ký.
// Phụ trách chia đều Trong/Ngoài. Người đã đăng ký mà vẫn chưa có ca nào được xếp vào ca đăng ký đầu tiên. Người không đăng ký để lại cho cổng công bố.
function sbAutoPlace() {
  if (sbNeedEmpty()) ui.need = NEED.map((row) => row.map(needFrom));
  const A = DATA.asg, before = structuredClone(A);
  const free = (s, d, p) => regKind(s, d, p) === "reg" && !A[s.id][d][p];
  for (let d = 0; d < 7; d++) for (let p = 0; p < 5; p++) for (const pos of POSITIONS) {
    let n = ui.need[d][p][pos.id] - STAFF.filter((s) => A[s.id][d][p]?.pos[0] === pos.id).length;
    const prevPos = (s) => A[s.id][d][p - 1]?.pos[0] === pos.id;
    const cand = ACTIVE.filter((s) => free(s, d, p) && (pos.lead ? canLeadShift(s) : expOf(s).includes(pos.id))).sort((a, b) => prevPos(b) - prevPos(a) || regRank(a) - regRank(b));
    while (n-- > 0 && cand.length) {
      const s = cand.shift(); let sub = [];
      if (pos.lead) {
        const prev = A[s.id][d][p - 1];
        const k = (x) => STAFF.filter((o) => A[o.id][d][p]?.sub.includes(x)).length;
        sub = [prev?.pos[0] === "pt" ? prev.sub[0] : k("pttrong") <= k("ptngoai") ? "pttrong" : "ptngoai"];
      }
      A[s.id][d][p] = { pos: [pos.id], sub };
    }
  }
  for (const s of ACTIVE) {
    if (WEEK.some((_, d) => Object.keys(A[s.id][d]).length)) continue;
    const d = WEEK.findIndex((_, i) => PERIODS.some((p) => free(s, i, p.i))); if (d < 0) continue;
    const p = PERIODS.find((x) => free(s, d, x.i)).i;
    A[s.id][d][p] = { pos: [expOf(s)[0] || "pv"], sub: [] };
  }
  for (const s of STAFF) for (let d = 0; d < 7; d++) sbLogDay(s, d, before[s.id][d], A[s.id][d]);
  SB.asg = A; SB.need = ui.need;
  sbGo();
}
function sbPublish() {
  sbTick(1, 3); SB.phase = "published"; SB.day = -1; SB.asg = DATA.asg; SB.skipped = [...ui.skipped];
  sbLog({ what: ["Công bố lịch tuần", "Published the week"], day: SB_WEEK, before: ["Nháp", "Draft"], after: ["Đã công bố", "Published"] });
  sbGo();
}
function sbNextDay() { SB.day = Math.min(6, SB.day + 1); SB.clock = Math.max(SB.clock, sbDayStart(SB.day)); sbGo(); }
function sbExport() {
  const e = ui.exp; sbTick(1, 2);
  sbLog({ what: ["Xuất lịch", "Exported the schedule"], day: SB_WEEK, after: both(() => `${e.scope === "week" ? L("Cả tuần", "Whole week") : dayFull(e.day)} · ${e.fmt === "pdf" ? "PDF" : L("Ảnh PNG", "PNG image")}`) });
  ui.dialog = null; render();
}
function sbStaffSaved(s, q0, lead0) {
  SB.staff[s.id] = { q: s.q.slice(), lead: s.lead };
  const txt = (q, lead) => both(() => `${q.filter((x) => !isLead(x)).map(posName).join(", ") || "—"}${q.some(isLead) ? ` · ${L("Phụ trách", "Shift Lead")} ${vnd(lead || 0)}` : ""}`);
  if (JSON.stringify([q0, lead0]) === JSON.stringify([s.q, s.lead])) return;
  sbTick(1, 2);
  sbLog({ what: ["Sửa hồ sơ nhân viên", "Edited staff record"], sid: s.id, before: txt(q0, lead0), after: txt(s.q, s.lead) });
}

// ---------- Ca đã công bố: đi trễ, ca của tôi ----------
// Các đoạn liền nhau trong ngày gộp thành một ca (đổi vị trí giữa chừng vẫn là một ca, như ví dụ 07–15 phụ trách, 15–17 pha chế)
function sbBlocks(s, d) {
  const out = [];
  for (const r of runsOf(s, d)) { const t = runTime(r), last = out[out.length - 1]; if (last && last.to === t.from) { last.to = t.to; last.runs.push(r); } else out.push({ from: t.from, to: t.to, runs: [r] }); }
  return out;
}
function sbShifts(d) {
  if (SB.phase !== "published") return [];
  const out = [];
  for (const s of STAFF) for (const b of sbBlocks(s, d)) {
    const r0 = b.runs[0]; if (!r0.a.pos.length) continue;
    const key = `${s.id}|${d}|${b.from}`;
    out.push({ sid: s.id, d, key, from: b.from, to: b.to, pos: r0.a.pos[0], sub: r0.a.sub[0] || null, agreed: agreedStart(r0),
      parts: b.runs.length > 1 ? b.runs.map((r) => ({ ...runTime(r), pos: r.a.pos[0] || "pv", sub: r.a.sub[0] || null })) : null,
      arrive: SB.arrive[key] || null, resolved: SB.resolved[key] || null, future: d > SB.day });
  }
  return out.sort((a, b) => sbMin(a.from) - sbMin(b.from) || CAT[a.pos] - CAT[b.pos] || ST[a.sid].name.localeCompare(ST[b.sid].name, "vi"));
}
const sbShiftLabel = (sh) => (sh.parts ? sh.parts.map((x) => posLabel([x.pos], x.sub ? [x.sub] : [])).join(" → ") : posLabel([sh.pos], sh.sub ? [sh.sub] : []));
// Ghi giờ đến: giờ ghi trong nhật ký là giờ đến + 2 phút nếu là hôm nay, còn ngày trước thì là giờ hiện tại
function sbArrive(sh, val) {
  const old = SB.arrive[sh.key]; SB.arrive[sh.key] = val; delete SB.resolved[sh.key];
  const m = sh.d < SB.day ? SB.clock : sbDayStart(sh.d) - 7 * 60 + sbMin(val) + 2;
  SB.clock = Math.max(SB.clock, m);
  sbLog({ what: ["Ghi giờ đến", "Recorded arrival"], sid: sh.sid, day: both(() => dayFull(sh.d)), before: old ? both(() => L(`Đến ${old}`, `Arrived ${old}`)) : ["Đúng giờ", "On time"], after: both(() => `${L("Đến", "Arrived")} ${val} · ${lateTier(sh, val).t}`) }, m);
}
function sbResolve(i) {
  const sh = TODAY_SHIFTS[i], k = +(document.querySelector('input[name="an"]:checked')?.value || 0), el = document.getElementById("an-reason"), why = el?.value.trim();
  if (k === 3) { ui.dialog = null; return editLate(i); }
  if (!why) { el.classList.add("border-err-text"); el.focus(); return; }
  const t = lateTier(sh, sh.arrive);
  const label = [["Xác nhận đúng giờ", "Confirmed on time"], both(() => L(`Trừ đủ ${t.late * 2} phút`, `Deducted full ${t.late * 2} min`)), ["Trừ ít hơn", "Deducted less"], null, ["Không đi làm", "Didn’t work"]][k];
  if (k === 0) delete SB.arrive[sh.key]; else SB.resolved[sh.key] = label;
  sbTick(1, 3);
  sbLog({ what: ["Xử lý ca bất thường", "Resolved an anomaly"], sid: sh.sid, day: both(() => dayFull(sh.d)), before: both(() => `${L("Đến", "Arrived")} ${sh.arrive} · ${t.t}`), after: label, reason: why });
  ui.dialog = null; render();
}
// Ngày đủ 8 tiếng tới hôm nay (trọn Ca 5 tính là đủ)
const sbDays8 = (s) => WEEK.filter((_, d) => d <= SB.day && (() => { const r = runsOf(s, d); const h = r.reduce((a, x) => { const t = runTime(x); return a + paidH(t.from, t.to, !!x.a.t); }, 0); return r.length && (h >= RULES.minDayH || (RULES.ca5Exempt && r.some((x) => x.from <= 4 && x.to === 4 && !x.a.t))); })()).length;
function sbSummary() {
  const out = [];
  for (const s of STAFF) {
    const xs = WEEK.flatMap((_, d) => sbShifts(d).filter((x) => x.sid === s.id && x.arrive)); if (!xs.length) continue;
    const ts = xs.map((x) => ({ x, t: lateTier(x, x.arrive) }));
    const pending = ts.some(({ x, t }) => t.anomaly && !x.resolved), n = ts.filter(({ t }) => t.bonus !== "ok").length;
    out.push({ s, n, b: pending ? "pending" : n ? "lost" : "ok", d8: sbDays8(s) });
  }
  return out.sort((a, b) => (b.b === "pending") - (a.b === "pending") || b.n - a.n);
}
function sbRecordDialog(arg) {
  const [sid, d] = String(arg).split("|"), s = ST[sid], sh = sbShifts(+d).find((x) => x.sid === sid);
  return `<div class="flex items-start gap-2 px-6 pt-5"><h2 class="min-w-0 flex-1 text-lg font-semibold">${L("Ghi giờ đến", "Record arrival")}</h2>${iconBtn("x", L("Đóng", "Close"), `onclick="ui.dialog=null;render()"`, "size-9")}</div><p class="px-6 pt-1 text-sm text-muted"><span class="font-medium text-foreground">${esc(s.name)}</span> · ${dayFull(+d)} · <span class="tabular-nums">${sh.from}–${sh.to}</span>${sh.agreed ? ` · ${L("vào trễ đã thống nhất", "agreed late start")}` : ""}</p>
    <div class="space-y-1.5 px-6 pt-5"><label for="rec-in" class="block w-fit text-sm font-medium">${L("Giờ đến", "Arrived at")}</label><input id="rec-in" class="${INPUT} w-32 tabular-nums" value="${esc(sh.arrive || "")}" placeholder="${sh.from}" inputmode="numeric" /></div>
    <div class="mt-6 flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: `onclick="ui.dialog=null;render()"`, extra: "min-h-11 md:min-h-10" })}${btn("primary", L("Lưu", "Save"), { attrs: `onclick="sbSaveRecord('${sid}',${d})"`, extra: "min-h-11 md:min-h-10" })}</div>`;
}
function sbSaveRecord(sid, d) {
  const el = document.getElementById("rec-in"), v = el.value.trim();
  if (!/^\d{1,2}:\d{2}$/.test(v)) { el.classList.add("border-err-text"); el.focus(); return; }
  sbArrive(sbShifts(d).find((x) => x.sid === sid), v.padStart(5, "0")); ui.dialog = null; render();
}

// ---------- Sửa giờ ca, đổi ca (sau khi công bố) ----------
function sbShiftDialog() {
  const s = ST[ui.panel.sid], d = ui.panel.d, b = sbBlocks(s, d)[0];
  const close = `onclick="ui.dialog=null;ui.shd=null;render()"`;
  if (!b) return `<div class="flex items-center gap-2 px-6 py-5"><p class="min-w-0 flex-1 text-sm">${L("Người này chưa có ca trong ngày.", "They have no shift this day.")}</p>${iconBtn("x", L("Đóng", "Close"), close, "size-9")}</div>`;
  const key = `${s.id}|${d}|${b.from}|${b.to}`;
  if (!ui.shd || ui.shd.key !== key) ui.shd = { key, from: b.from, to: b.to, cover: "", agreed: false, swap: "", why: "", msg: "" };
  const e = ui.shd, stdFrom = PERIODS[b.runs[0].from].from, stdTo = PERIODS[b.runs[b.runs.length - 1].to].to;
  const early = hm(e.to) < hm(b.to), late = hm(e.from) > hm(b.from);
  const tSel = (k, label) => `<label class="block space-y-1.5"><span class="block text-sm font-medium">${label}</span><select onchange="ui.shd.${k}=this.value;ui.shd.msg='';render()" class="${cx(INPUT, "cursor-pointer tabular-nums")}">${TIMES.filter((t) => (k === "from" ? hm(t) >= hm(stdFrom) && hm(t) < hm(e.to) : hm(t) > hm(e.from) && hm(t) <= hm(stdTo))).map((t) => `<option ${t === e[k] ? "selected" : ""}>${t}</option>`).join("")}</select></label>`;
  const busy = (o) => PERIODS.some((p) => asgAt(o, d, p.i) && hm(p.to) > hm(e.to) && hm(p.from) < hm(b.to));
  const covers = ACTIVE.filter((o) => o.id !== s.id && !busy(o)).sort((x, y) => (regKind(y, d, b.runs[b.runs.length - 1].to) === "reg") - (regKind(x, d, b.runs[b.runs.length - 1].to) === "reg") || x.name.localeCompare(y.name, "vi"));
  const swaps = ACTIVE.filter((o) => o.id !== s.id && sbBlocks(o, d).length);
  const opt = (v, t, on) => `<option value="${v}" ${on ? "selected" : ""}>${esc(t)}</option>`;
  const nSel = (k, list, ph, label) => `<label class="block space-y-1.5"><span class="block text-sm font-medium">${label}</span><select onchange="ui.shd.${k}=this.value;ui.shd.msg='';render()" class="${cx(INPUT, "cursor-pointer")}">${opt("", ph, !e[k])}${list}</select></label>`;
  const why = `<div class="space-y-1.5 px-6 pt-4"><label for="sh-reason" class="block text-sm font-medium">${L("Lý do", "Reason")} <span class="text-err-text">*</span></label><input id="sh-reason" class="${INPUT}" value="${esc(e.why)}" oninput="ui.shd.why=this.value" placeholder="${L("VD: việc gia đình, đã báo qua Zalo", "e.g. family matter, agreed on Zalo")}" /></div>`;
  return `<div class="flex items-start gap-2 px-6 pt-5"><div class="min-w-0 flex-1"><h2 class="text-lg font-semibold">${L("Sửa ca", "Edit shift")}</h2><p class="mt-1 text-sm text-muted"><span class="font-medium text-foreground">${esc(s.name)}</span> · ${dayFull(d)} · <span class="tabular-nums">${b.from}–${b.to}</span></p></div>${iconBtn("x", L("Đóng", "Close"), close, "size-9")}</div>
    <div class="px-6 pt-4">${segmented([["time", L("Đổi giờ, về sớm", "Change times")], ["swap", L("Đổi ca", "Swap")]], ui.shiftTab, "setShiftTab", L("Loại", "Kind"))}</div>
    ${ui.shiftTab === "time" ? `<div class="grid grid-cols-2 gap-3 px-6 pt-4">${tSel("from", L("Từ", "From"))}${tSel("to", L("Đến", "To"))}</div>
      ${early ? `<div class="mx-6 mt-4 flex gap-3 rounded-xl border border-warn-bg bg-warn-bg p-3">${ic("triangle-alert", "mt-0.5 size-4 text-warn")}<p class="text-sm font-medium text-warn">${L(`Về sớm ${hm(b.to) - hm(e.to)} phút, cần người làm thay`, `Leaving ${hm(b.to) - hm(e.to)} min early needs cover`)}</p></div>
        <div class="px-6 pt-4">${nSel("cover", covers.map((o) => opt(o.id, `${o.name}${regKind(o, d, b.runs[b.runs.length - 1].to) === "reg" ? ` · ${L("đã đăng ký", "registered")}` : ""}`, e.cover === o.id)).join(""), L("Chọn người rảnh giờ này", "Choose someone free then"), `${L("Người làm thay", "Cover")} <span class="tabular-nums">${e.to}–${b.to}</span> <span class="text-err-text">*</span>`)}</div>` : ""}
      ${late ? `<label class="mx-6 mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border-strong p-3">${cb({ small: false, checked: e.agreed, attrs: `onchange="ui.shd.agreed=this.checked;ui.shd.msg=''"` })}<span class="min-w-0"><span class="block text-sm font-medium">${L("Vào trễ đã thống nhất", "Agreed late arrival")}</span><span class="mt-0.5 block text-xs text-pretty text-muted">${L("Đánh dấu khi dời giờ vào trễ hơn vì đã đồng ý trong ngày (FR-O24). Ca này không có 10 phút ân hạn: trễ từ phút 1 là tính trễ và trừ gấp đôi. Giờ làm tính từ giờ vào mới.", "Tick when the start moves later because you agreed it on the day (FR-O24). No 10-minute grace: late and 2× deduction from minute 1. Hours count from the new start.")}</span></span></label>` : ""}`
    : `<div class="px-6 pt-4">${nSel("swap", swaps.map((o) => opt(o.id, `${o.name} · ${sbBlocks(o, d).map((x) => `${x.from}–${x.to}`).join(", ")}`, e.swap === o.id)).join(""), L("Chọn người có ca hôm đó", "Choose someone working that day"), L("Đổi với", "Swap with"))}<p class="mt-1.5 text-xs text-muted">${L("Hai người đổi toàn bộ ca của ngày này cho nhau trong một lần lưu.", "Both people trade all their shifts for this day in one save.")}</p></div>`}
    ${why}
    ${e.msg ? `<p role="alert" class="mx-6 mt-3 flex items-center gap-1.5 text-xs font-medium text-warn">${ic("triangle-alert", "size-3.5")}${e.msg}</p>` : ""}
    <div class="mt-6 flex flex-col-reverse gap-2 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">${btn("secondary", L("Huỷ", "Cancel"), { attrs: close, extra: "min-h-11 md:min-h-10" })}${btn("primary", L("Lưu", "Save"), { attrs: `onclick="sbEditShift()"`, extra: "min-h-11 md:min-h-10" })}</div>`;
}
// Giờ của một đoạn sau khi cắt: trùng giờ ca gốc của các ca còn lại thì bỏ giờ riêng
function sbSetT(day, ps, from, to) {
  if (!ps.length) return;
  const std = PERIODS[ps[0]].from === from && PERIODS[ps[ps.length - 1]].to === to;
  for (const p of ps) { if (std) delete day[p].t; else day[p].t = { from, to }; }
}
function sbEditShift() {
  const s = ST[ui.panel.sid], d = ui.panel.d, b = sbBlocks(s, d)[0], e = ui.shd;
  const fail = (vi, en) => { e.msg = L(vi, en); render(); };
  if (!e.why.trim()) return fail("Nhập lý do.", "Enter a reason.");
  const day = DATA.asg[s.id][d], before = structuredClone(day);
  if (ui.shiftTab === "swap") {
    if (!e.swap) return fail("Chọn người để đổi ca.", "Choose who to swap with.");
    const o = ST[e.swap], oBefore = structuredClone(DATA.asg[o.id][d]);
    DATA.asg[o.id][d] = structuredClone(day); DATA.asg[s.id][d] = oBefore;
    sbTick(1, 3);
    sbLog({ what: ["Đổi ca", "Swapped shifts"], sid: s.id, day: both(() => dayFull(d)), before: sbRunsTxt(s, d, before), after: both(() => L(`Đổi với ${o.name}: ${sbRunsTxt(s, d, oBefore)[0]}`, `Swapped with ${o.name}: ${sbRunsTxt(s, d, oBefore)[1]}`)), reason: e.why.trim() });
  } else {
    const early = hm(e.to) < hm(b.to), late = hm(e.from) > hm(b.from);
    if (e.from === b.from && e.to === b.to) return fail("Giờ chưa đổi.", "The times haven’t changed.");
    if (early && !e.cover) return fail("Chọn người làm thay phần về sớm.", "Choose someone to cover the early leave.");
    if (late && !e.agreed) return fail("Dời giờ vào trễ hơn thì đánh dấu Vào trễ đã thống nhất.", "A later start needs Agreed late arrival ticked.");
    const cover = early ? DATA.asg[e.cover][d] : null;
    for (const r of b.runs) {
      const rt = runTime(r), kF = Math.max(hm(rt.from), hm(e.from)), kT = Math.min(hm(rt.to), hm(e.to)), cF = Math.max(hm(rt.from), hm(e.to)), cT = hm(rt.to);
      const keep = [], give = [];
      for (let p = r.from; p <= r.to; p++) {
        const P = PERIODS[p];
        if (kT > kF && hm(P.to) > kF && hm(P.from) < kT) keep.push(p); else delete day[p];
        if (cover && cT > cF && hm(P.to) > cF && hm(P.from) < cT) { cover[p] = { pos: r.a.pos.slice(), sub: r.a.sub.slice() }; give.push(p); }
      }
      sbSetT(day, keep, sbHM(kF), sbHM(kT));
      if (cover) sbSetT(cover, give, sbHM(cF), sbHM(cT));
    }
    const what = early ? ["Rút ngắn ca, có người thay", "Shortened, with cover"] : late ? ["Dời giờ vào · vào trễ đã thống nhất", "Start moved later · agreed late arrival"] : ["Sửa giờ ca", "Changed shift times"];
    sbTick(1, 3);
    sbLog({ what, sid: s.id, day: both(() => dayFull(d)), before: `${b.from}–${b.to}`, after: early ? both(() => L(`${e.from}–${e.to} · ${ST[e.cover].nick} làm thay ${e.to}–${b.to}`, `${e.from}–${e.to} · ${ST[e.cover].nick} covers ${e.to}–${b.to}`)) : `${e.from}–${e.to}`, reason: e.why.trim() });
  }
  ui.dialog = null; ui.shd = null; render();
}

// ---------- Đăng nhập: chọn tài khoản ----------
function sbLogin(id) {
  if (id === "owner") return sbGo(sbLink("lich"));
  SB.me = id; sbGo(sbLink(SB.phase === "published" ? "ca" : "ranh"));
}
function sbSignIn() {
  const tag = (s) => !s.user ? L("Chưa có mật khẩu, chưa đăng nhập được", "No password yet, can’t sign in")
    : SB.saved[s.id] ? L(`Đã lưu đăng ký ${regT(SB.regSave[s.id].first)}`, `Registered ${regT(SB.regSave[s.id].first)}`) : SB.draft[s.id] ? L("Có nháp chưa lưu", "Unsaved draft") : L("Chưa đăng ký", "Not registered");
  const row = (id, init, name, sub, ok) => `<li><button type="button" ${ok ? `onclick="sbLogin('${id}')"` : "disabled"} class="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-hidden hover:bg-item-hover disabled:cursor-not-allowed disabled:opacity-50"><span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">${esc(init)}</span><span class="min-w-0 flex-1"><span class="block truncate text-sm font-medium">${esc(name)}</span><span class="block truncate text-xs text-muted">${sub}</span></span>${ok ? ic("chevron-right", "size-4 text-muted") : ""}</button></li>`;
  const staff = ACTIVE.slice().sort((a, b) => a.name.localeCompare(b.name, "vi"));
  return `<div class="flex flex-col items-center px-4 py-10">
    <div class="w-full max-w-md" data-wf-block="1">
      <div class="mb-6 flex flex-col items-center gap-4 text-center"><span class="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">${mark("size-7")}</span><h1 class="text-xl font-semibold">${L("Đăng nhập Watchtower", "Sign in to Watchtower")}</h1><p class="text-sm text-pretty text-muted">${L("Trải nghiệm: chọn một tài khoản để đăng nhập, không cần mật khẩu.", "Try-out: pick an account to sign in with, no password needed.")}</p></div>
      <div class="rounded-2xl border border-border bg-surface p-1">
        <p class="px-3 pt-2 pb-1 text-xs font-medium text-muted">${L("Chủ quán", "Owner")}</p><ul>${row("owner", "P", "Trương Hữu Phúc", "phuc.owner", true)}</ul>
        <p class="border-t border-border px-3 pt-3 pb-1 text-xs font-medium text-muted">${L("Nhân viên", "Staff")} <span class="tabular-nums">${staff.length}</span></p>
        <ul class="max-h-[min(28rem,55vh)] overflow-y-auto">${staff.map((s) => row(s.id, s.nick[0], s.name, `${s.user ? `<span class="font-mono">${esc(s.user)}</span> · ` : ""}${tag(s)}`, !!s.user)).join("")}</ul>
      </div></div></div>`;
}

// ---------- Dải Trải nghiệm ----------
// Phần của wireframe, không phải của sản phẩm: chỉ đường đi qua năm bước, giờ giả, tài khoản đang dùng và các lối tắt.
function sbBar() {
  if (FRAME) return "";
  const g = gateItems(), left = g.noShift.length + g.noPos.length;
  const cur = SB.phase === "open" ? 0 : SB.phase === "locked" ? (left ? 2 : 3) : 4;
  const steps = [L("Nhân viên đăng ký", "Staff register"), L("Khoá đăng ký", "Registration locks"), L("Xếp ca, giao vị trí", "Place, give positions"), L("Công bố", "Publish"), L("Ghi đi trễ, xem ca", "Lateness, shifts")];
  const stepEl = steps.map((t, i) => `<li class="${cx("inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap", i === cur ? "bg-primary text-primary-foreground" : i < cur ? "bg-surface text-foreground/80 ring-1 ring-border ring-inset" : "text-muted")}" ${i === cur ? 'aria-current="step"' : ""}>${i < cur ? ic("check", "size-3.5") : `<span class="tabular-nums">${i + 1}</span>`}${t}</li>`).join("");
  const B = (label, attrs, primary) => `<button type="button" ${attrs} class="${cx(BTN_BASE, primary ? BTN.primary : BTN.outline, "h-8 min-h-8 rounded-lg px-3 text-xs whitespace-nowrap")}">${label}</button>`;
  const A = (label, m) => (S.man === m ? "" : `<a href="${sbLink(m)}" class="${cx(BTN_BASE, BTN.outline, "h-8 min-h-8 rounded-lg px-3 text-xs whitespace-nowrap")}">${label}</a>`);
  const signIn = (label) => A(label, "dn");
  const who = SC.role === "owner" ? `${L("Chủ quán", "Owner")} · Trương Hữu Phúc` : SC.role === "staff" ? `${L("Nhân viên", "Staff")} · ${esc(ST[SB.me].name)}` : L("Chưa đăng nhập", "Not signed in");
  const saved = Object.keys(SB.saved).length, todo = sbRegTodo().filter((s) => SB_TYPE[s.id] !== "none").length;
  let hint, acts;
  if (cur === 0) {
    hint = L(`Đăng nhập bằng một tài khoản nhân viên, chọn ca rảnh rồi bấm Lưu. Đã lưu ${saved}/${ACTIVE.length} người. Chủ quán xem được Lịch tuần nhưng chưa xếp được.`, `Sign in as a staff member, pick free shifts and Save. ${saved}/${ACTIVE.length} have saved. The owner can view the schedule but can’t place yet.`);
    acts = [SC.role === "staff" ? signIn(L("Đổi nhân viên", "Switch staff")) : signIn(L("Đăng nhập nhân viên", "Sign in as staff")), todo ? B(L(`Đăng ký mẫu cho ${todo} người chưa lưu`, `Sample registrations for ${todo} more`), `onclick="sbFillReg()"`) : "", SC.role === "owner" ? "" : A(L("Xem Lịch tuần", "View the schedule"), "lich"), B(L("Khoá đăng ký · tua tới 13:00 T6 9/10", "Lock · skip to 13:00 Fri 9 Oct"), `onclick="sbLock()"`, true)];
  } else if (cur < 4) {
    hint = cur === 2 ? L(`Chủ quán: đặt số người cần ở bảng Phân công, bấm một chip trên Lịch tuần để xếp người và giao vị trí. Còn ${left} việc trước khi công bố.`, `Owner: set the need in the Staffing table, click a marker on the schedule to place people and give positions. ${left} to resolve before publishing.`)
      : L("Hết việc còn lại: bấm Công bố tuần trên Lịch tuần.", "Nothing left to resolve: use Publish week on the schedule.");
    acts = [SC.role === "owner" ? "" : A(L("Đăng nhập chủ quán", "Sign in as owner"), "lich"), S.man === "lich" && sbNeedEmpty() ? B(L("Điền số người cần mẫu", "Sample staffing need"), `onclick="sbFillNeed()"`) : "", cur === 2 ? B(L("Xếp mẫu theo đăng ký", "Sample placing"), `onclick="sbAutoPlace()"`) : ""];
  } else {
    const today = SB.day < 0 ? L("tuần 12–18/10 chưa bắt đầu", "week 12–18 Oct hasn’t started") : L(`hôm nay ${dayFull(SB.day)}`, `today is ${dayFull(SB.day)}`);
    hint = L(`Tuần đã công bố, ${today}. Ghi giờ đến ở Đi trễ; đăng nhập nhân viên để xem ca ở Hồ sơ của tôi. Sửa giờ ca, đổi ca ở panel trên Lịch tuần.`, `The week is published; ${today}. Record arrivals under Lateness; sign in as staff to see shifts under My profile. Edit or swap shifts from the schedule panel.`);
    acts = [SC.role === "owner" ? A(L("Mở Đi trễ", "Open Lateness"), "tre") : A(L("Đăng nhập chủ quán", "Sign in as owner"), "tre"), signIn(L("Xem ca của nhân viên", "See a staff member’s shifts")), SB.day < 6 ? B(SB.day < 0 ? L("Sang T2 12/10 · tuần bắt đầu", "Go to Mon 12 Oct · week starts") : L(`Sang ${dayFull(SB.day + 1)}`, `Go to ${dayFull(SB.day + 1)}`), `onclick="sbNextDay()"`, true) : ""];
  }
  const reset = ui.sbReset ? `<span class="inline-flex items-center gap-2"><span class="text-xs font-medium text-danger">${L("Xoá hết dữ liệu đã thử?", "Erase everything you tried?")}</span>${B(L("Thôi", "No"), `onclick="ui.sbReset=false;render()"`)}<button type="button" onclick="sbReset()" class="${cx(BTN_BASE, BTN.danger, "h-8 min-h-8 rounded-lg px-3 text-xs whitespace-nowrap")}">${L("Xoá và làm lại", "Erase and restart")}</button></span>`
    : `<button type="button" onclick="ui.sbReset=true;render()" class="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted outline-hidden hover:bg-foreground/5 hover:text-foreground">${ic("rotate-ccw", "size-3.5")}${L("Làm lại từ đầu", "Start over")}</button>`;
  return `<section id="sb-bar" aria-label="${L("Trải nghiệm", "Try-out")}" class="border-b border-dashed border-primary/40 bg-primary-light px-4 py-3 lg:px-6">
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span class="inline-flex items-center gap-1.5 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">${ic("flask-conical", "size-3.5")}${L("Trải nghiệm", "Try-out")}</span>
      <span class="inline-flex items-center gap-1.5 text-sm">${ic("clock", "size-4 text-muted")}<span class="text-muted">${L("Bây giờ", "Now")}</span><span class="font-medium tabular-nums">${sbNow()}</span></span>
      <span class="inline-flex min-w-0 items-center gap-1.5 text-sm">${ic("user-round", "size-4 text-muted")}<span class="truncate">${who}</span></span>
      <span class="ml-auto">${reset}</span>
    </div>
    <ol class="scrollbar-clean mt-2.5 flex gap-1 overflow-x-auto" aria-label="${L("Các bước", "Steps")}">${stepEl}</ol>
    <div class="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2"><p class="min-w-0 basis-full text-sm text-pretty text-foreground/85 xl:basis-auto xl:flex-1">${hint}</p><div class="flex flex-wrap gap-2">${acts.join("")}</div></div>
  </section>`;
}
function sbReset() { try { localStorage.removeItem(SB_KEY); } catch {} try { window.name = ""; } catch {} location.href = sbLink("dn"); if (S.man === "dn") location.reload(); }
// Khung mobile: ứng dụng chạy trong iframe, dải nằm ở trang ngoài; iframe lưu thì trang ngoài vẽ lại dải
addEventListener("storage", (e) => {
  if (!SANDBOX || e.key !== SB_KEY || !e.newValue || FRAME || S.kho !== "mobile") return;
  Object.assign(SB, JSON.parse(e.newValue));
  if (SB.asg) DATA.asg = SB.asg;
  ui.skipped = new Map(SB.skipped);
  const el = document.getElementById("sb-bar"); if (el) el.outerHTML = sbBar();
});
