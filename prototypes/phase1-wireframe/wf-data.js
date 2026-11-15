// Dữ liệu mẫu cho wireframe. Nhân viên là danh sách thật khách gửi cho Try-out (sheet "Data mẫu nhân viên cho Try-out",
// góp ý 12/11 mục 2): tên, biệt danh, vị trí làm được; người in đậm làm được Phụ trách. Đăng ký, ca, lương, số điện thoại
// vẫn là giả. Ca biên cố ý: người rảnh cả tuần (không đăng ký), người đăng ký đủ mọi ca, người thiếu giờ, người chưa có
// tài khoản đăng nhập, ca xếp ngoài lịch rảnh, ca chưa có vị trí, xếp vị trí chưa có kinh nghiệm. Bỏ hai ca biên "người đã
// nghỉ còn ca" và "người bị tắt Phụ trách còn ca phụ trách", vì trên tên thật sẽ làm khách hiểu nhầm.
// Góp ý 17/10: trong một ca (CA1–CA5) mỗi người làm đúng một vị trí; nhiều ca trong ngày thì mỗi ca một vị trí được.
// asg[...].pos vẫn là mảng nhưng luôn có tối đa một phần tử.

// Phụ trách (góp ý 16–17/10): một vị trí cha, bắt buộc chọn đúng một vị trí con Trong hoặc Ngoài (subRequired).
// Chỉ người được chủ bật "Phụ trách" trong hồ sơ (q có "pt", kèm lương phụ trách bắt buộc) mới xếp được vào vị trí này.
// Giờ làm ở vị trí Phụ trách tính theo lương phụ trách của từng người (lead: true), Trong hay Ngoài như nhau;
// mọi vị trí khác tính theo lương cơ bản.
// PRD v1.11 (khách chốt 18/10 và 1/11): không có QC (QC chỉ là ghi chú cho Phụ trách Trong/Ngoài). Bảy vị trí theo đúng
// thứ tự khách đặt, dùng thứ tự này ở mọi nơi liệt kê vị trí. n = số token màu --pN-* trong wireframe.html.
// subs: [id, VI, EN, ký hiệu trên chip lịch]. Ký hiệu đổi 10/11: Pha chế 1–4 (Matcha → Latte, Bồn → Topping), Phụ trách T/N, Bưng bàn B.
const POSITIONS = [
  { id: "pt", n: 1, vi: "Phụ trách", en: "Shift Lead", subs: [["pttrong", "Trong", "Inside", "T"], ["ptngoai", "Ngoài", "Outside", "N"]], lead: true, subRequired: true },
  { id: "tnoff", n: 2, vi: "Thu Ngân – Offline", en: "Cashier – In-store", subs: [] },
  { id: "tnon", n: 3, vi: "Thu Ngân – Online", en: "Cashier – Online", subs: [] },
  { id: "ktd", n: 4, vi: "Kiểm tra đơn", en: "Order Check", subs: [] },
  { id: "pc", n: 5, vi: "Pha chế", en: "Barista", subs: [["trasua", "Trà sữa", "Milk tea", "1"], ["matcha", "Latte", "Latte", "2"], ["tra", "Trà", "Tea", "3"], ["bon", "Topping", "Topping", "4"]] },
  { id: "pv", n: 6, vi: "Phục vụ", en: "Server", subs: [["bungban", "Bưng bàn", "Table running", "B"]], attr: true },
  { id: "bep", n: 7, vi: "Bếp", en: "Kitchen", subs: [] },
];
const POS = Object.fromEntries(POSITIONS.map((p) => [p.id, p]));

const PERIODS = [
  { i: 0, code: "CA1", from: "07:00", to: "11:00", h: 4 },
  { i: 1, code: "CA2", from: "11:00", to: "13:00", h: 2 },
  { i: 2, code: "CA3", from: "13:00", to: "15:00", h: 2 },
  { i: 3, code: "CA4", from: "15:00", to: "17:00", h: 2 },
  { i: 4, code: "CA5", from: "17:00", to: "23:00", h: 6 },
];

// Quy tắc giờ (góp ý 10/10, chờ khách ký nên để cấu hình, không viết cứng):
// - Ca 5 vẫn hiện 17:00–23:00 nhưng làm trọn ca thì tính lương tới 24:00 (7 giờ).
// - Giờ riêng (không trọn Ca 5) chỉ tính tới 23:00 và là ca không tiêu chuẩn.
// - Ngày có trọn Ca 5 không bị cảnh báo thiếu giờ.
// Đi trễ (FR-S9, FR-S17, cấu hình được): ân hạn 10 phút, không trừ lương tới phút 15. Ca có giờ vào trễ đã thống nhất
// (xếp theo giờ riêng bắt đầu trễ hơn ca, hoặc chủ dời giờ vào và đánh dấu, §3.8.3) không ân hạn: trễ và trừ 2× từ phút 1.
const RULES = { minDayH: 8, minDays: 5, ca5PaidUntil: "24:00", capAt: "23:00", ca5Exempt: true, grace: 10, noDeductUntil: 15, graceAgreed: 0 };

// Tuần đang xếp: 12–18/10/2026
const WEEK = [
  { vi: "T2", en: "Mon", viL: "Thứ Hai", enL: "Monday", date: 12 },
  { vi: "T3", en: "Tue", viL: "Thứ Ba", enL: "Tuesday", date: 13 },
  { vi: "T4", en: "Wed", viL: "Thứ Tư", enL: "Wednesday", date: 14 },
  { vi: "T5", en: "Thu", viL: "Thứ Năm", enL: "Thursday", date: 15 },
  { vi: "T6", en: "Fri", viL: "Thứ Sáu", enL: "Friday", date: 16 },
  { vi: "T7", en: "Sat", viL: "Thứ Bảy", enL: "Saturday", date: 17 },
  { vi: "CN", en: "Sun", viL: "Chủ Nhật", enL: "Sunday", date: 18 },
];
// Số người cần mỗi ca (FR-O1, tổng các vị trí). Cuối tuần đông hơn.
const NEED = [
  [4, 5, 3, 4, 6], [4, 5, 3, 4, 6], [4, 5, 3, 4, 6], [4, 5, 3, 4, 6], [5, 5, 4, 4, 7], [5, 6, 4, 5, 7], [5, 6, 4, 5, 7],
];
// Rải số người cần của một ca ra từng vị trí (FR-O1): ca ít người thì lấy vị trí đầu danh sách trước,
// nên tổng theo vị trí luôn bằng NEED của ca đó.
const NEED_FILL = ["pt", "pt", "pc", "pv", "tnoff", "bep", "tnon", "ktd", "pc", "pv", "tnoff"];

const STAFF = [
  { id: "s1", name: "Thanh Danh", nick: "Danh", q: ["tnoff", "tnon", "ktd", "pc", "pv", "bep", "pt"], type: "some", phone: "0903 112 448", user: "thanh.danh", base: 27000, lead: 32000, pw: "02/10/2026" },
  { id: "s2", name: "Thanh Lộc", nick: "Lộc", q: ["pc", "pv"], type: "some", phone: "0938 554 210", user: "thanh.loc", base: 25000, lead: null, pw: "02/10/2026" },
  { id: "s3", name: "Hữu Thạnh", nick: "Thạnh", q: ["tnoff", "tnon", "ktd", "pc", "pv", "bep", "pt"], type: "some", phone: "0912 668 031", user: "huu.thanh", base: 27000, lead: 31000, pw: "28/09/2026" },
  { id: "s4", name: "Phúc Thịnh", nick: "PT", q: ["ktd", "pc", "pv", "bep"], type: "some", phone: "0977 201 556", user: "phuc.thinh", base: 24000, lead: null, pw: "28/09/2026" },
  { id: "s5", name: "Thùy Dương", nick: "TD", q: ["tnon", "ktd", "pc", "pv"], type: "some", phone: "0909 430 118", user: "thuy.duong", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s6", name: "Việt Trung", nick: "VT", q: ["pv", "bep"], type: "some", phone: "0961 887 302", user: "viet.trung", base: 26000, lead: null, pw: "28/09/2026" },
  { id: "s7", name: "Dương", nick: "Dương", q: ["tnoff", "tnon", "ktd", "pc", "pv", "pt"], type: "some", phone: "0938 220 761", user: "duong", base: 26000, lead: 30000, pw: "28/09/2026" },
  { id: "s8", name: "Tấn Ngàn", nick: "Ngàn", q: ["ktd", "pc", "pv"], type: "all", phone: "0905 667 129", user: "tan.ngan", base: 24000, lead: null, pw: "28/09/2026" },
  { id: "s9", name: "Hữu Hậu", nick: "Hậu", q: ["tnon", "ktd", "pc", "pv"], type: "some", phone: "0983 450 873", user: "huu.hau", base: 24000, lead: null, pw: "28/09/2026" },
  { id: "s10", name: "Hào", nick: "Hào", q: ["pc", "pv"], type: "none", phone: "0901 776 345", user: "hao", base: 23000, lead: null, pw: "28/09/2026" },
  { id: "s11", name: "Ngọc Hương", nick: "NH", q: ["tnoff", "pc", "pv"], type: "some", short: true, phone: "0937 019 552", user: "ngoc.huong", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s12", name: "Diệu Hiền", nick: "DH", q: ["tnoff", "tnon", "ktd", "pc", "pv", "bep", "pt"], type: "all", phone: "0918 334 670", user: "dieu.hien", base: 27000, lead: 32000, pw: "28/09/2026" },
  { id: "s13", name: "Thủy Tiên", nick: "Tiên", q: ["tnoff", "ktd", "pc", "pv"], type: "some", phone: "0976 125 904", user: "thuy.tien", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s14", name: "Nhựt Trường", nick: "Cô", q: ["tnoff", "ktd", "pc", "pv", "bep", "pt"], type: "some", phone: "0908 662 017", user: "nhut.truong", base: 26000, lead: 29000, pw: "28/09/2026" },
  { id: "s15", name: "Phúc Nguyên", nick: "PN", q: ["tnoff", "tnon", "ktd", "pc", "pv"], type: "some", phone: "0939 841 266", user: "phuc.nguyen", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s16", name: "Quốc Thống", nick: "QT", q: ["pc", "pv"], type: "none", phone: "0965 300 482", user: "quoc.thong", base: 23000, lead: null, pw: "30/09/2026" },
  { id: "s17", name: "Tâm Nguyên", nick: "TN", q: ["pc", "pv"], type: "some", short: true, phone: "0912 905 337", user: "", base: 23000, lead: null, pw: null },
  { id: "s18", name: "Bích Trâm", nick: "BT", q: ["pc", "pv"], type: "some", phone: "0903 228 914", user: "bich.tram", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s19", name: "An Khang", nick: "Khang", q: ["tnoff", "tnon", "ktd", "pc", "pv", "bep"], type: "some", phone: "0986 512 740", user: "an.khang", base: 26000, lead: null, pw: "28/09/2026" },
  { id: "s20", name: "Tài", nick: "Tài", q: ["pc", "pv"], type: "none", phone: "0907 449 063", user: "tai", base: 23000, lead: null, pw: "28/09/2026" },
  { id: "s21", name: "Uyên", nick: "Uyên", q: ["ktd", "pc", "pv", "bep"], type: "some", phone: "0932 006 781", user: "uyen", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s22", name: "Tuấn Khang", nick: "TK", q: ["pc", "pv"], type: "some", phone: "0911 873 520", user: "tuan.khang", base: 24000, lead: null, pw: "28/09/2026" },
  { id: "s23", name: "Thanh Toàn", nick: "Toàn", q: ["pc", "pv"], type: "some", phone: "0968 140 225", user: "thanh.toan", base: 23000, lead: null, pw: "28/09/2026" },
  { id: "s24", name: "Uyển Nhi", nick: "Nhi", q: ["pc", "pv", "bep"], type: "some", phone: "0934 518 207", user: "uyen.nhi", base: 24000, lead: null, pw: "28/09/2026" },
  { id: "s25", name: "Nhật Duy", nick: "ND", q: ["pc", "pv", "bep"], type: "some", phone: "0972 640 315", user: "nhat.duy", base: 24000, lead: null, pw: "28/09/2026" },
  { id: "s26", name: "Thanh Tâm", nick: "Tâm", q: ["ktd", "pc", "pv", "bep"], type: "some", phone: "0916 207 884", user: "thanh.tam", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s27", name: "Thu Hiền", nick: "TH", q: ["tnoff", "pc", "pv", "bep"], type: "some", phone: "0985 331 692", user: "thu.hien", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s28", name: "Gia Hào", nick: "GH", q: ["tnoff", "tnon", "pc", "pv"], type: "some", phone: "0906 874 120", user: "gia.hao", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s29", name: "Phi Long", nick: "Long", q: ["tnon", "ktd", "pc", "pv"], type: "some", phone: "0939 205 776", user: "phi.long", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s30", name: "Hoàng Nam", nick: "Nam", q: ["tnoff", "ktd", "pc", "pv", "bep"], type: "some", phone: "0963 418 559", user: "hoang.nam", base: 26000, lead: null, pw: "28/09/2026" },
  { id: "s31", name: "Trí", nick: "Trí", q: ["tnoff", "tnon", "ktd", "pc", "pv"], type: "some", phone: "0917 552 043", user: "tri", base: 25000, lead: null, pw: "28/09/2026" },
  { id: "s32", name: "Trúc Đào", nick: "Đào", q: ["tnoff", "ktd", "pc", "pv"], type: "some", phone: "0978 096 431", user: "truc.dao", base: 25000, lead: null, pw: "28/09/2026" },
];
const ST = Object.fromEntries(STAFF.map((s) => [s.id, s]));
// Giờ đã làm theo vị trí (FR-A14): ca đã công bố và đã kết thúc, toàn bộ lịch sử, theo giờ đồng hồ (trọn Ca 5 = 6 giờ).
// Chủ xem trên chip ở hồ sơ nhân viên, nhân viên xem ở Hồ sơ của tôi. Vị trí làm được trong sheet của khách là vị trí thường
// đảm nhiệm, nên luôn trên 50 giờ; Phụ trách chỉ có ở người in đậm. Dương có thêm Bếp 18 giờ (chưa đủ, nên xếp Bếp sẽ có cảnh báo).
const HOURS = (() => {
  let seed = 20261116; const r = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const o = {};
  for (const s of STAFF) { o[s.id] = {}; for (const q of s.q) o[s.id][q] = q === "pt" ? 60 + Math.floor(r() * 120) : 52 + Math.floor(r() * 260); }
  o.s7.bep = 18;
  return o;
})();
const ACTIVE = STAFF.filter((s) => !s.left);

function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PATTERNS = [[0, 1, 2], [3, 4], [2, 3, 4], [1, 2, 3, 4], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2], [3, 4], [0, 1], [4]];
const SHORT_PATTERNS = [[1, 2], [3], [2, 3], [1]];

function buildWeek(seed) {
  const r = rng(seed);
  // reg[sid][d] = mảng ca đã đăng ký (null = không làm ngày đó). type none/all xử lý ở avail().
  const reg = {};
  for (const s of STAFF) {
    reg[s.id] = WEEK.map(() => null);
    if (s.type !== "some") continue;
    const days = s.short ? 3 : r() < 0.5 ? 7 : 6;
    const order = [0, 1, 2, 3, 4, 5, 6].sort(() => r() - 0.5).slice(0, days);
    for (const d of order) {
      const list = s.short ? SHORT_PATTERNS : PATTERNS;
      reg[s.id][d] = list[Math.floor(r() * list.length)].slice();
    }
  }
  // asg[sid][d] = { [periodIndex]: { pos: [ids], sub: [ids] } }
  const asg = {};
  for (const s of STAFF) asg[s.id] = WEEK.map(() => ({}));
  for (let d = 0; d < 7; d++) {
    for (const s of STAFF) {
      let run = null;
      if (s.type === "some") run = reg[s.id][d];
      else run = PATTERNS[Math.floor(r() * 6)];
      if (!run) continue;
      const p = s.type === "none" ? 0.35 : 0.55;
      if (r() > p) continue;
      const take = r() < 0.25 && run.length > 1 ? run.slice(0, run.length - 1) : run;
      let pos = [];
      if (r() > 0.07) pos = [s.q.length ? s.q[Math.floor(r() * s.q.length)] : "pv"];
      let sub = [];
      if (pos[0] === "pc" && r() < 0.6) sub = [["trasua", "matcha", "tra", "bon"][Math.floor(r() * 4)]];
      if (pos[0] === "pt") sub = [r() < 0.5 ? "pttrong" : "ptngoai"];
      if (pos[0] === "pv" && r() < 0.3) sub = ["bungban"];
      for (const pi of take) asg[s.id][d][pi] = { pos: pos.slice(), sub: sub.slice() };
    }
  }
  return { reg, asg };
}

const WEEK_DATA = buildWeek(20261012);
// Ca biên cố định
(function seedEdgeCases({ reg, asg }) {
  // Hai người chưa có ca nào trong tuần (cổng công bố)
  for (const id of ["s17", "s20"]) asg[id] = WEEK.map(() => ({}));
  // VT T4 CA5 Bếp (ca biên cũ "kiêm hai vị trí" đã bỏ: một ca chỉ một vị trí)
  asg.s6[2] = { 4: { pos: ["bep"], sub: [] } };
  // Xếp ngoài lịch rảnh: Thạnh T5 CA5 (đảm bảo không đăng ký ca đó)
  reg.s3[3] = [0, 1];
  // CA1–CA2 kiêm hai trạm Latte và Trà: chip hiện cả hai ký hiệu "2·3" trong một huy hiệu
  asg.s3[3] = { 0: { pos: ["pc"], sub: ["matcha", "tra"] }, 1: { pos: ["pc"], sub: ["matcha", "tra"] }, 4: { pos: ["pc"], sub: [] } };
  // Xếp vị trí chưa có kinh nghiệm: TD (không làm Thu Ngân Offline) xếp Thu Ngân Offline T2 CA2
  reg.s5[0] = [1, 2];
  asg.s5[0] = { 1: { pos: ["tnoff"], sub: [] }, 2: { pos: ["tnon"], sub: [] } };
  // Danh: T4 đăng ký CA1–CA3, đã xếp CA1–CA2 Phụ trách - Trong, CA3 chưa vị trí
  reg.s1[2] = [0, 1, 2];
  asg.s1[2] = { 0: { pos: ["pt"], sub: ["pttrong"] }, 1: { pos: ["pt"], sub: ["pttrong"] }, 2: { pos: [], sub: [] } };
  // Ví dụ của khách (16/10): Thạnh CN 07:00–17:00, 07–15 Phụ trách - Trong (lương phụ trách), 15–17 Pha chế (lương cơ bản)
  reg.s3[6] = [0, 1, 2, 3];
  asg.s3[6] = { 0: { pos: ["pt"], sub: ["pttrong"] }, 1: { pos: ["pt"], sub: ["pttrong"] }, 2: { pos: ["pt"], sub: ["pttrong"] }, 3: { pos: ["pc"], sub: ["trasua"] } };
  // Cô T7 CA5 Phụ trách - Ngoài
  reg.s14[5] = [4];
  asg.s14[5] = { 4: { pos: ["pt"], sub: ["ptngoai"] } };
})(WEEK_DATA);

function balance({ reg, asg }, seed, skip = []) {
  const r = rng(seed);
  // Cân lại: đa số ca đủ người, vài ca thiếu, vài ca dư (để màu hổ phách còn ý nghĩa).
  for (let d = 0; d < 7; d++) for (let p = 0; p < 5; p++) {
    const x = r();
    const target = NEED[d][p] + (x < 0.2 ? -1 - Math.floor(r() * 2) : x > 0.9 ? 1 : 0);
    const placed = STAFF.filter((s) => asg[s.id][d][p]).sort(() => r() - 0.5);
    const keep = ["s1", "s3", "s5", "s6", "s14"];
    for (let i = placed.length - 1; i >= 0 && placed.length > target; i--) if (!keep.includes(placed[i].id)) delete asg[placed.splice(i, 1)[0].id][d][p];
    const cand = STAFF.filter((s) => !skip.includes(s.id) && !s.left && (s.type !== "some" ? !asg[s.id][d][p] : !asg[s.id][d][p] && reg[s.id][d] && reg[s.id][d].includes(p))).sort(() => r() - 0.5);
    while (placed.length < target && cand.length) {
      const s = cand.pop(); placed.push(s);
      const nb = asg[s.id][d][p - 1] || asg[s.id][d][p + 1];
      asg[s.id][d][p] = nb ? { pos: nb.pos.slice(), sub: nb.sub.slice() } : { pos: [s.q[0] || "pv"], sub: [] };
    }
  }
}
balance(WEEK_DATA, 7, ["s17", "s20"]);
// Mỗi ca cần hai Phụ trách, một Trong một Ngoài: giao cho người có kinh nghiệm đang có mặt trong ca.
// Chừa ca không có ai đủ kinh nghiệm (bảng Phân công báo thiếu) và các ca biên ở trên.
(function seedLeads({ asg }) {
  const fixed = { s1: [2], s3: [3, 6], s5: [0], s6: [2], s14: [5] };
  for (let d = 0; d < 7; d++) for (let p = 0; p < 5; p++) for (const side of ["pttrong", "ptngoai"]) {
    if (STAFF.some((x) => asg[x.id][d][p]?.sub.includes(side))) continue;
    const s = STAFF.find((x) => x.q.includes("pt") && !(fixed[x.id] || []).includes(d) && asg[x.id][d][p] && !asg[x.id][d][p].pos.includes("pt"));
    if (s) asg[s.id][d][p] = { pos: ["pt"], sub: [side] };
  }
})(WEEK_DATA);
// Giờ riêng theo từng ca (spec custom shift 11/10) và ghi chú theo ngày. custom[sid][d][p] = { from, to }.
WEEK_DATA.custom = { s2: { 4: { 4: { from: "18:00", to: "23:00" } } }, s9: { 0: { 3: { from: "15:30", to: "17:00" }, 4: { from: "17:00", to: "21:00" } } } };
// Ghi chú xếp lịch theo ngày (FR-O54) và ghi chú riêng của chủ cho tuần (FR-O53), góp ý 10/11. text = bản chủ đang sửa,
// pub = bản nhân viên đang thấy (null khi tuần chưa công bố).
WEEK_DATA.dnote = { 1: { text: "Thạnh kèm NH ở Thu Ngân – Offline ca sáng", pub: null }, 3: { text: "Nhi thử Kiểm tra đơn CA 3, Danh kèm", pub: null } };
WEEK_DATA.onote = "VT xin nghỉ T7, chưa chốt. Hỏi lại Hậu có làm thêm CA 5 T6 được không.";
WEEK_DATA.note = { s2: { 4: "Học tới 17:30, 18:00 mới tới quán được" }, s9: { 0: "Sáng đi khám, chiều tới được" }, s14: { 1: "Quán vắng thì cho mình về sớm 30 phút" } };
(function seedCustom({ reg, asg }) {
  // Lộc: T6 xin vào 18:00, chưa xếp (chủ chưa quyết)
  reg.s2[4] = [4]; delete asg.s2[4][4];
  // Hậu: T2 xin CA4 15:30–17:00 và CA5 17:00–21:00, đã xếp theo giờ đăng ký
  reg.s9[0] = [3, 4]; asg.s9[0] = { 3: { pos: ["ktd"], sub: [], t: { from: "15:30", to: "17:00" } }, 4: { pos: ["ktd"], sub: [], t: { from: "17:00", to: "21:00" } } };
})(WEEK_DATA);
// Thứ tự đăng ký (FR-S23): giờ lưu lần đầu và giờ sửa lần cuối đăng ký tuần 12–18/10, tính bằng phút kể từ T5 8/10 00:00
// (cửa sổ T5 00:00 – T6 13:00, tức phút 0–2220). Xếp hạng theo giờ lưu lần đầu. Người không đăng ký gì không có giờ, không có hạng.
// Bản nháp tự lưu lúc khoá lấy giờ sửa cuối của nháp cho cả hai, nên chủ không phân biệt được với bản tự bấm Lưu.
const REG_SAVE = (function () {
  const r = rng(20261018), o = {};
  for (const s of STAFF) {
    if (s.type === "none" || s.left) continue;
    const first = 20 + Math.floor(r() * 2150);
    o[s.id] = { first, last: r() < 0.4 ? Math.min(2219, first + Math.floor(r() * 900)) : first };
  }
  // Danh: lưu lần đầu T5 08:03, sửa lần cuối T6 09:10 (khớp Nhật ký)
  o.s1 = { first: 483, last: 1990 };
  return o;
})();
const PREV_WEEK = buildWeek(20261005);
// Ghi chú xếp lịch đã công bố của tuần 5–11/10 (Lịch quán và Hồ sơ của tôi của nhân viên)
PREV_WEEK.dnote = { 2: { text: "Ca sáng TN học pha trà sữa, Dương kèm.", pub: "Ca sáng TN học pha trà sữa, Dương kèm." } };
balance(PREV_WEEK, 8);
for (const s of STAFF) for (const day of PREV_WEEK.asg[s.id]) for (const k in day) if (!day[k].pos.length) day[k].pos = [s.q[0] || "pv"];

// ===== Đi trễ: tuần 5–11/10 đã công bố, bây giờ T4 7/10 11:40 =====
const LATE_WEEK = [
  { vi: "T2", en: "Mon", date: 5 }, { vi: "T3", en: "Tue", date: 6 }, { vi: "T4", en: "Wed", date: 7 },
  { vi: "T5", en: "Thu", date: 8 }, { vi: "T6", en: "Fri", date: 9 }, { vi: "T7", en: "Sat", date: 10 }, { vi: "CN", en: "Sun", date: 11 },
];
// Ca của hôm nay (T4 7/10). arrive = giờ đến đã ghi (null = đúng giờ, mặc định).
const TODAY_SHIFTS = [
  { sid: "s3", from: "07:00", to: "11:00", pos: "pc", sub: "matcha", arrive: "07:08" },
  { sid: "s1", from: "07:00", to: "13:00", pos: "pt", sub: "pttrong", arrive: null },
  // Vào trễ đã thống nhất (§3.8.3): sáng nay chủ dời giờ vào 07:00 → 08:00 và đánh dấu, nên không ân hạn: đến 08:04 là trễ, trừ 8 phút
  { sid: "s18", from: "08:00", to: "11:00", pos: "pc", sub: "tra", arrive: "08:04", agreed: true },
  { sid: "s4", from: "07:00", to: "13:00", pos: "pv", sub: null, arrive: "07:13" },
  { sid: "s7", from: "07:00", to: "11:00", pos: "pc", sub: "trasua", arrive: "07:22" },
  { sid: "s13", from: "07:00", to: "11:00", pos: "tnoff", sub: null, arrive: null },
  { sid: "s6", from: "07:00", to: "11:00", pos: "bep", sub: null, arrive: null },
  { sid: "s8", from: "11:00", to: "13:00", pos: "pv", sub: "bungban", arrive: "12:05", anomaly: true },
  { sid: "s9", from: "11:00", to: "15:00", pos: "ktd", sub: null, arrive: null },
  { sid: "s5", from: "11:00", to: "17:00", pos: "tnon", sub: null, arrive: null },
  { sid: "s14", from: "11:00", to: "15:00", pos: "pc", sub: "tra", arrive: null },
  { sid: "s12", from: "13:00", to: "23:00", pos: "bep", sub: null, arrive: null, future: true },
  { sid: "s19", from: "15:00", to: "23:00", pos: "tnoff", sub: null, arrive: null, future: true },
  { sid: "s22", from: "17:00", to: "23:00", pos: "pc", sub: "bon", arrive: null, future: true },
  { sid: "s10", from: "17:00", to: "23:00", pos: "pv", sub: null, arrive: null, future: true },
  { sid: "s15", from: "17:00", to: "23:00", pos: "ktd", sub: null, arrive: null, future: true },
];
// Số lần đã ghi theo ngày (cho tab ngày)
const LATE_COUNT = [1, 0, 5, 0, 0, 0, 0];
// Ghi nhận các ngày trước trong tuần
const LATE_EARLIER = [{ d: 0, sid: "s11", from: "13:00", to: "17:00", pos: "tnoff", arrive: "13:12" }];

// Lịch tuần cho màn đi trễ dạng ma trận (phương án B): sid -> [ca theo ngày]
const LATE_MATRIX = {
  s3: ["07–11", null, "07–11", "07–13", null, "15–23", "07–11"],
  s1: ["07–13", "07–13", "07–13", null, "11–17", null, "07–11"],
  s4: [null, "07–13", "07–13", "17–23", "17–23", null, "11–17"],
  s7: ["07–11", "07–11", "07–11", null, "07–11", "07–15", null],
  s8: ["17–23", null, "11–13", "11–17", "17–23", "17–23", null],
  s11: ["13–17", null, null, "13–15", null, null, null],
  s13: ["07–11", "07–11", "07–11", "07–11", null, null, "15–23"],
  s6: [null, "17–23", "07–11", "07–11", "17–23", "17–23", null],
  s9: ["11–15", "11–15", "11–15", null, "11–17", null, null],
  s5: ["11–17", null, "11–17", "11–17", null, "11–17", "11–17"],
};

// Lịch rảnh của tôi (Dương), tuần 12–18/10. Mảng ca đã chọn theo ngày.
const MY_REG = [[0, 1, 2], [0, 1], null, [0, 1, 2, 3, 4], [4], null, [0, 1, 2]];
// Giờ riêng (theo từng ca) và ghi chú của Dương: T6 CA5 xin vào 18:00
const MY_CUSTOM = { 4: { 4: { from: "18:00", to: "23:00" } } };
const MY_NOTES = { 4: "Học tới 17:30" };

// Hồ sơ của tôi (Dương): ca tuần 5–11/10
// Ghi chú xếp lịch đã công bố mà nhân viên đang xem thấy ở Hồ sơ của tôi (ngày có ca)
const MY_SCHED_NOTES = { 2: "Ca sáng TN học pha trà sữa, Dương kèm." };
const MY_SHIFTS = [
  { d: 0, from: "07:00", to: "11:00", pos: "pc", sub: "trasua" },
  { d: 1, from: "07:00", to: "11:00", pos: "pc", sub: "trasua" },
  { d: 2, from: "07:00", to: "11:00", pos: "pc", sub: "trasua", arrive: "07:22" },
  { d: 3, from: "17:00", to: "23:00", pos: "pc", sub: "bon" },
  { d: 4, from: "07:00", to: "11:00", pos: "pc", sub: "matcha" },
  { d: 5, from: "07:00", to: "15:00", pos: "pc", sub: "matcha" },
  // Ví dụ của khách: một ca 07:00–17:00, 07–15 phụ trách, 15–17 pha chế
  { d: 6, from: "07:00", to: "17:00", parts: [{ from: "07:00", to: "15:00", pos: "pt", sub: "pttrong" }, { from: "15:00", to: "17:00", pos: "pc", sub: "trasua" }] },
];

// Nhật ký: sự kiện Phase 1 theo PRD §4.9.1. draft = thay đổi khi tuần còn nháp (ẩn được bằng "Ẩn thay đổi khi còn nháp").
// Đăng ký đã lưu chỉ hiện giờ lưu, không hiện nội dung (NFR-1); bản đầy đủ nằm trên máy chủ.
const AUDIT = [
  { at: "10/10 16:42", who: "owner", what: ["Xếp ca", "Placed"], sid: "s1", day: "T4 14/10", before: "—", after: ["07:00–13:00 · Phụ trách - Trong", "07:00–13:00 · Shift Lead - Inside"], reason: "", draft: true },
  { at: "10/10 16:40", who: "owner", what: ["Gán vị trí", "Gave position"], sid: "s6", day: "T4 14/10", before: ["17:00–23:00 · chưa có vị trí", "17:00–23:00 · no position"], after: ["17:00–23:00 · Bếp", "17:00–23:00 · Kitchen"], reason: "", draft: true },
  { at: "10/10 16:31", who: "owner", what: ["Xếp ngoài lịch rảnh", "Placed outside availability"], sid: "s3", day: "T5 15/10", before: "—", after: ["17:00–23:00 · Pha chế", "17:00–23:00 · Barista"], reason: ["Đã thống nhất qua Zalo", "Agreed on Zalo"], draft: true },
  { at: "09/10 13:00", who: "system", what: ["Khoá đăng ký", "Registration locked"], sid: null, day: ["Tuần 12–18/10", "Week 12–18 Oct"], before: ["Đang mở", "Open"], after: ["Đã khoá", "Locked"], reason: "" },
  { at: "09/10 09:10", who: "staff", what: ["Lưu đăng ký", "Saved registration"], sid: "s1", day: ["Tuần 12–18/10", "Week 12–18 Oct"], before: ["Lưu lúc T5 08:03", "Saved Thu 08:03"], after: ["Lưu lúc T6 09:10", "Saved Fri 09:10"], reason: "" },
  { at: "08/10 08:03", who: "staff", what: ["Lưu đăng ký", "Saved registration"], sid: "s1", day: ["Tuần 12–18/10", "Week 12–18 Oct"], before: "—", after: ["Lưu lúc T5 08:03", "Saved Thu 08:03"], reason: "" },
  { at: "07/10 12:10", who: "owner", what: ["Ghi giờ đến", "Recorded arrival"], sid: "s8", day: "T4 7/10", before: ["Đúng giờ", "On time"], after: ["Đến 12:05 · bất thường", "Arrived 12:05 · anomaly"], reason: "" },
  { at: "07/10 08:05", who: "owner", what: ["Ghi giờ đến", "Recorded arrival"], sid: "s18", day: "T4 7/10", before: ["Đúng giờ", "On time"], after: ["Đến 08:04 · trễ 4 phút, không ân hạn", "Arrived 08:04 · 4 min late, no grace"], reason: "" },
  { at: "07/10 07:30", who: "owner", what: ["Ghi giờ đến", "Recorded arrival"], sid: "s7", day: "T4 7/10", before: ["Đúng giờ", "On time"], after: ["Đến 07:22 · trễ 22 phút", "Arrived 07:22 · 22 min late"], reason: "" },
  { at: "07/10 06:50", who: "owner", what: ["Dời giờ vào · vào trễ đã thống nhất", "Start moved later · agreed late arrival"], sid: "s18", day: "T4 7/10", before: "07:00–11:00", after: "08:00–11:00", reason: ["Xin vào trễ qua Zalo, đi khám", "Asked on Zalo, doctor visit"] },
  { at: "06/10 18:05", who: "owner", what: ["Rút ngắn ca, có người thay", "Shortened, with cover"], sid: "s4", day: "T3 6/10", before: "07:00–13:00", after: ["07:00–11:30 · DH làm thay 11:30–13:00", "07:00–11:30 · DH covers 11:30–13:00"], reason: ["Về sớm, việc gia đình", "Left early, family matter"] },
  { at: "04/10 21:30", who: "owner", what: ["Xuất lịch", "Exported the schedule"], sid: null, day: ["Tuần 5–11/10", "Week 5–11 Oct"], before: "—", after: ["Cả tuần · PDF", "Whole week · PDF"], reason: "" },
  { at: "04/10 21:15", who: "system", what: ["Thêm vị trí thường đảm nhiệm", "Added a usual position"], sid: "s12", day: "", before: ["Bếp", "Kitchen"], after: ["Bếp, Phục vụ", "Kitchen, Server"], reason: ["Phục vụ 64 giờ trong 12 tuần qua", "Server: 64 h in the last 12 weeks"] },
  { at: "02/10 09:14", who: "owner", what: ["Đặt mật khẩu", "Set password"], sid: "s1", day: "", before: "—", after: ["Đã đặt", "Set"], reason: "" },
];

// Thêm một nhân viên lúc chạy (Thêm nhân viên, góp ý 10/11 mục 7): tạo đủ chỗ trong mọi tuần để lịch, đăng ký và dùng thử chạy được.
function addStaffRecord(n) {
  if (ST[n.id]) return ST[n.id];
  STAFF.push(n); ST[n.id] = n; if (!n.left) ACTIVE.push(n);
  const weeks = [WEEK_DATA, PREV_WEEK]; if (typeof DATA !== "undefined") weeks.push(DATA);
  for (const w of weeks) { w.reg[n.id] ||= WEEK.map(() => null); w.asg[n.id] ||= WEEK.map(() => ({})); }
  return n;
}
