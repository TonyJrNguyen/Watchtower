// Dữ liệu mẫu cho wireframe. Toàn bộ là giả; có cố ý ca biên: tên dài, hai người tên Mai,
// người rảnh cả tuần (không đăng ký), người đăng ký đủ mọi ca, người thiếu giờ, người chưa có
// kinh nghiệm nào, người đã nghỉ còn ca, ca xếp ngoài lịch rảnh, ca kiêm hai vị trí, ca chưa có vị trí.

const POSITIONS = [
  { id: "qc", n: 1, vi: "QC", en: "QC", subs: [["trong", "Trong", "Inside"], ["ngoai", "Ngoài", "Outside"]] },
  { id: "tnoff", n: 2, vi: "Thu Ngân – Offline", en: "Cashier – In-store", subs: [] },
  { id: "tnon", n: 3, vi: "Thu Ngân – Online", en: "Cashier – Online", subs: [] },
  { id: "pc", n: 4, vi: "Pha chế", en: "Barista", subs: [["trasua", "Trà sữa", "Milk tea"], ["matcha", "Matcha", "Matcha"], ["tra", "Trà", "Tea"], ["bon", "Bồn", "Washing"]] },
  { id: "pv", n: 5, vi: "Phục vụ", en: "Server", subs: [["bungban", "Bưng bàn", "Table running"]], attr: true },
  { id: "ktd", n: 6, vi: "Kiểm tra đơn", en: "Order check", subs: [] },
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
const RULES = { minDayH: 8, minDays: 5, ca5PaidUntil: "24:00", capAt: "23:00", ca5Exempt: true };

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
const NEED_FILL = ["pc", "pv", "tnoff", "qc", "bep", "tnon", "ktd", "pc", "pv"];

const STAFF = [
  { id: "s1", name: "Nguyễn Thị Mai", nick: "Mai N", q: ["qc", "tnoff"], type: "some", phone: "0903 112 448", user: "mai.nguyen", rate: null, pw: "02/10/2026" },
  { id: "s2", name: "Trần Thị Mai", nick: "Mai T", q: ["pc"], type: "some", phone: "0938 554 210", user: "mai.tran", rate: 27000, pw: "02/10/2026" },
  { id: "s3", name: "Lê Minh Anh", nick: "Minh Anh", q: ["pc", "qc"], type: "some", phone: "0912 668 031", user: "minhanh", rate: null, pw: "28/09/2026" },
  { id: "s4", name: "Phạm Quốc Bảo", nick: "Bảo", q: ["pv", "bep"], type: "some", phone: "0977 201 556", user: "bao.pham", rate: null, pw: "28/09/2026" },
  { id: "s5", name: "Võ Thanh Hằng", nick: "Hằng", q: ["tnon"], type: "some", phone: "0909 430 118", user: "hang.vo", rate: null, pw: "28/09/2026" },
  { id: "s6", name: "Đặng Văn Hùng", nick: "Hùng", q: ["bep"], type: "some", phone: "0961 887 302", user: "hung.dang", rate: 30000, pw: "28/09/2026" },
  { id: "s7", name: "Huỳnh Ngọc Trâm", nick: "Trâm", q: ["pc"], type: "some", phone: "0938 220 761", user: "tram.huynh", rate: null, pw: "28/09/2026" },
  { id: "s8", name: "Bùi Đức Long", nick: "Long", q: ["pv"], type: "all", phone: "0905 667 129", user: "long.bui", rate: null, pw: "28/09/2026" },
  { id: "s9", name: "Đỗ Khánh Linh", nick: "Linh", q: ["ktd", "tnon"], type: "some", phone: "0983 450 873", user: "linh.do", rate: null, pw: "28/09/2026" },
  { id: "s10", name: "Hồ Gia Huy", nick: "Huy", q: ["pv"], type: "none", phone: "0901 776 345", user: "huy.ho", rate: null, pw: "28/09/2026" },
  { id: "s11", name: "Ngô Phương Thảo", nick: "Thảo N", q: ["qc"], type: "some", short: true, phone: "0937 019 552", user: "thao.ngo", rate: null, pw: "28/09/2026" },
  { id: "s12", name: "Dương Tuấn Kiệt", nick: "Kiệt", q: ["bep", "pv"], type: "all", phone: "0918 334 670", user: "kiet.duong", rate: null, pw: "28/09/2026" },
  { id: "s13", name: "Lý Thu Trang", nick: "Trang", q: ["tnoff"], type: "some", phone: "0976 125 904", user: "trang.ly", rate: null, pw: "28/09/2026" },
  { id: "s14", name: "Trịnh Hoàng Nam", nick: "Nam", q: ["pc"], type: "some", phone: "0908 662 017", user: "nam.trinh", rate: null, pw: "28/09/2026" },
  { id: "s15", name: "Mai Anh Thư", nick: "Thư", q: ["ktd"], type: "some", phone: "0939 841 266", user: "thu.mai", rate: null, pw: "28/09/2026" },
  { id: "s16", name: "Châu Bảo Ngọc", nick: "Ngọc", q: ["pv"], type: "none", phone: "0965 300 482", user: "ngoc.chau", rate: null, pw: "30/09/2026" },
  { id: "s17", name: "Tôn Nữ Thị Phương Thảo", nick: "Thảo T", q: [], type: "some", short: true, phone: "0912 905 337", user: "", rate: null, pw: null },
  { id: "s18", name: "Lâm Chí Thanh", nick: "Thanh", q: ["pc"], type: "some", phone: "0903 228 914", user: "thanh.lam", rate: null, pw: "28/09/2026" },
  { id: "s19", name: "Phan Nhật Vy", nick: "Vy", q: ["tnoff", "qc"], type: "some", phone: "0986 512 740", user: "vy.phan", rate: null, pw: "28/09/2026" },
  { id: "s20", name: "Kiều Minh Tâm", nick: "Tâm", q: ["pv"], type: "none", phone: "0907 449 063", user: "tam.kieu", rate: null, pw: "28/09/2026" },
  { id: "s21", name: "Quách Gia Bảo", nick: "Gia Bảo", q: ["bep"], type: "some", phone: "0932 006 781", user: "giabao.quach", rate: null, pw: "28/09/2026" },
  { id: "s22", name: "Vương Hải Yến", nick: "Yến", q: ["pc"], type: "some", phone: "0911 873 520", user: "yen.vuong", rate: null, pw: "28/09/2026" },
  { id: "s23", name: "Lưu Văn Đức", nick: "Đức", q: ["bep"], type: "some", left: true, phone: "0968 140 225", user: "duc.luu", rate: null, pw: "28/09/2026" },
];
const ST = Object.fromEntries(STAFF.map((s) => [s.id, s]));
const ACTIVE = STAFF.filter((s) => !s.left);
const RATE_DEFAULT = { qc: 26000, tnoff: 25000, tnon: 25000, pc: 26000, pv: 23000, ktd: 24000, bep: 28000 };

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
      if (pos[0] === "qc" && r() < 0.5) sub = [r() < 0.5 ? "trong" : "ngoai"];
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
  // Kiêm hai vị trí: Hùng T4 CA5
  asg.s6[2] = { 4: { pos: ["bep", "pv"], sub: [] } };
  // Xếp ngoài lịch rảnh: Minh Anh T5 CA5 (đảm bảo không đăng ký ca đó)
  reg.s3[3] = [0, 1];
  asg.s3[3] = { 0: { pos: ["pc"], sub: ["matcha"] }, 1: { pos: ["pc"], sub: ["matcha"] }, 4: { pos: ["pc"], sub: [] } };
  // Xếp vị trí chưa có kinh nghiệm: Hằng (Thu Ngân Online) xếp QC T2 CA2
  reg.s5[0] = [1, 2];
  asg.s5[0] = { 1: { pos: ["qc"], sub: [] }, 2: { pos: ["tnon"], sub: [] } };
  // Người đã nghỉ còn ca: Đức T4 CA5
  asg.s23 = WEEK.map(() => ({}));
  reg.s23 = WEEK.map(() => null);
  asg.s23[2] = { 4: { pos: ["bep"], sub: [] } };
  // Nguyễn Thị Mai: T4 đăng ký CA1–CA3, đã xếp CA1–CA2 QC Trong, CA3 chưa vị trí
  reg.s1[2] = [0, 1, 2];
  asg.s1[2] = { 0: { pos: ["qc"], sub: ["trong"] }, 1: { pos: ["qc"], sub: ["trong"] }, 2: { pos: [], sub: [] } };
})(WEEK_DATA);

function balance({ reg, asg }, seed, skip = []) {
  const r = rng(seed);
  // Cân lại: đa số ca đủ người, vài ca thiếu, vài ca dư (để màu hổ phách còn ý nghĩa).
  for (let d = 0; d < 7; d++) for (let p = 0; p < 5; p++) {
    const x = r();
    const target = NEED[d][p] + (x < 0.2 ? -1 - Math.floor(r() * 2) : x > 0.9 ? 1 : 0);
    const placed = STAFF.filter((s) => asg[s.id][d][p]).sort(() => r() - 0.5);
    const keep = ["s1", "s3", "s5", "s6", "s23"];
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
// Giờ riêng theo từng ca (spec custom shift 11/10) và ghi chú theo ngày. custom[sid][d][p] = { from, to }.
WEEK_DATA.custom = { s2: { 4: { 4: { from: "18:00", to: "23:00" } } }, s9: { 0: { 3: { from: "15:30", to: "17:00" }, 4: { from: "17:00", to: "21:00" } } } };
WEEK_DATA.note = { s2: { 4: "Học tới 17:30, 18:00 mới tới quán được" }, s9: { 0: "Sáng đi khám, chiều tới được" }, s14: { 1: "Quán vắng thì cho mình về sớm 30 phút" } };
(function seedCustom({ reg, asg }) {
  // Mai T: T6 xin vào 18:00, chưa xếp (chủ chưa quyết)
  reg.s2[4] = [4]; delete asg.s2[4][4];
  // Linh: T2 xin CA4 15:30–17:00 và CA5 17:00–21:00, đã xếp theo giờ đăng ký
  reg.s9[0] = [3, 4]; asg.s9[0] = { 3: { pos: ["ktd"], sub: [], t: { from: "15:30", to: "17:00" } }, 4: { pos: ["ktd"], sub: [], t: { from: "17:00", to: "21:00" } } };
})(WEEK_DATA);
const PREV_WEEK = buildWeek(20261005);
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
  { sid: "s1", from: "07:00", to: "13:00", pos: "qc", sub: "trong", arrive: null },
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
const LATE_COUNT = [1, 0, 4, 0, 0, 0, 0];
// Ghi nhận các ngày trước trong tuần
const LATE_EARLIER = [{ d: 0, sid: "s11", from: "13:00", to: "17:00", pos: "qc", arrive: "13:12" }];

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

// Lịch rảnh của tôi (Huỳnh Ngọc Trâm), tuần 12–18/10. Mảng ca đã chọn theo ngày.
const MY_REG = [[0, 1, 2], [0, 1], null, [0, 1, 2, 3, 4], [4], null, [0, 1, 2]];
// Giờ riêng (theo từng ca) và ghi chú của Trâm: T6 CA5 xin vào 18:00
const MY_CUSTOM = { 4: { 4: { from: "18:00", to: "23:00" } } };
const MY_NOTES = { 4: "Học tới 17:30" };

// Ca của tôi (Trâm) tuần 5–11/10
const MY_SHIFTS = [
  { d: 0, from: "07:00", to: "11:00", pos: "pc", sub: "trasua" },
  { d: 1, from: "07:00", to: "11:00", pos: "pc", sub: "trasua" },
  { d: 2, from: "07:00", to: "11:00", pos: "pc", sub: "trasua", arrive: "07:22" },
  { d: 3, from: "17:00", to: "23:00", pos: "pc", sub: "bon" },
  { d: 4, from: "07:00", to: "11:00", pos: "pc", sub: "matcha" },
  { d: 5, from: "07:00", to: "15:00", pos: "pc", sub: "matcha" },
];

// Nhật ký
const AUDIT = [
  { at: "10/10 16:42", who: "owner", what: ["Xếp ca", "Placed"], sid: "s1", day: "T4 14/10", before: "—", after: ["07:00–13:00 · QC - Trong", "07:00–13:00 · QC - Inside"], reason: "" },
  { at: "10/10 16:40", who: "owner", what: ["Gán vị trí", "Gave position"], sid: "s6", day: "T4 14/10", before: ["17:00–23:00 · chưa có vị trí", "17:00–23:00 · no position"], after: ["17:00–23:00 · Bếp, Phục vụ", "17:00–23:00 · Kitchen, Server"], reason: ["Thiếu phục vụ ca tối", "Short of servers in the evening"] },
  { at: "10/10 16:31", who: "owner", what: ["Xếp ngoài lịch rảnh", "Placed outside availability"], sid: "s3", day: "T5 15/10", before: "—", after: ["17:00–23:00 · Pha chế", "17:00–23:00 · Barista"], reason: ["Đã thống nhất qua Zalo", "Agreed on Zalo"] },
  { at: "10/10 15:00", who: "system", what: ["Khoá đăng ký", "Registration locked"], sid: null, day: ["Tuần 12–18/10", "Week 12–18 Oct"], before: ["Đang mở", "Open"], after: ["Đã khoá", "Locked"], reason: "" },
  { at: "07/10 12:10", who: "owner", what: ["Ghi giờ đến", "Recorded arrival"], sid: "s8", day: "T4 7/10", before: ["Đúng giờ", "On time"], after: ["Đến 12:05 · bất thường", "Arrived 12:05 · anomaly"], reason: "" },
  { at: "07/10 07:30", who: "owner", what: ["Ghi giờ đến", "Recorded arrival"], sid: "s7", day: "T4 7/10", before: ["Đúng giờ", "On time"], after: ["Đến 07:22 · trễ 22 phút", "Arrived 07:22 · 22 min late"], reason: "" },
  { at: "06/10 18:05", who: "owner", what: ["Rút ngắn ca, có người thay", "Shortened, with cover"], sid: "s4", day: "T3 6/10", before: "07:00–13:00", after: ["07:00–11:30 · Kiệt làm thay 11:30–13:00", "07:00–11:30 · Kiệt covers 11:30–13:00"], reason: ["Về sớm, việc gia đình", "Left early, family matter"] },
  { at: "02/10 09:14", who: "owner", what: ["Đặt mật khẩu", "Set password"], sid: "s1", day: "", before: "—", after: ["Đã đặt", "Set"], reason: "" },
  { at: "30/09 20:02", who: "owner", what: ["Vô hiệu hoá tài khoản", "Deactivated account"], sid: "s23", day: "", before: ["Đang làm", "Active"], after: ["Đã nghỉ", "Left"], reason: ["Nghỉ việc từ 01/10", "Left from 1 Oct"] },
];
