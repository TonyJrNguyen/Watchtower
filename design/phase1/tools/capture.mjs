#!/usr/bin/env node
// Builds the static Phase 1 screens in design/phase1/ from the Phase 1 wireframe.
//
// The wireframe (prototypes/phase1-wireframe/) is already written with the tokens, classes and
// components of the design, so each page here is the wireframe's own DOM for one screen + state,
// with the wireframe-only parts removed (toolbar, block numbers, click handlers) and links
// pointing at the other static pages. Re-run it after a wireframe change instead of editing pages.
//
//   node tools/capture.mjs --base http://localhost:4180/wireframe.html [--pw <dir with node_modules/playwright>]
//
// Serve prototypes/phase1-wireframe/ first (see its README). Uses the installed Chrome.

import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const arg = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const base = arg("--base", "http://localhost:4180/wireframe.html");
const pwDir = arg("--pw", root);
const { chromium } = createRequire(join(resolve(pwDir), "noop.js"))("playwright");

// Wireframe screen and state ids (Vietnamese) → folder and file names
const SCREENS = {
  lich: { dir: "calendar", v: "b", vi: "Lịch tuần", en: "Schedule" },
  tre: { dir: "lateness", v: "a", vi: "Đi trễ", en: "Lateness" },
  ranh: { dir: "availability", v: "a", vi: "Lịch rảnh", en: "Availability" },
  ca: { dir: "my-profile", v: "a", vi: "Hồ sơ của tôi", en: "My profile" },
  nv: { dir: "staff", v: "a", vi: "Nhân viên", en: "Staff" },
  nk: { dir: "activity-log", v: "a", vi: "Nhật ký", en: "Activity log" },
  dn: { dir: "sign-in", v: "a", vi: "Đăng nhập", en: "Sign in" },
};
const STATES = {
  "du-lieu": "data", "chua-vi-tri": "no-positions", "mo-dk": "registration-open", "cong-bo": "published",
  "dang-tai": "loading", rong: "empty", loi: "error", "tuan-truoc": "previous-week", nhap: "unsaved-draft",
  "chua-dk": "nothing-selected", khoa: "locked", "khoa-quen": "locked-not-saved", "chua-cong-bo": "not-published",
};
const STATE_LABELS = {
  "du-lieu": ["Có dữ liệu", "With data"], "chua-vi-tri": ["Đã xếp ca, chưa giao vị trí", "Placed, no positions yet"],
  "mo-dk": ["Đăng ký đang mở", "Registration open"], "cong-bo": ["Đã công bố", "Published"], "dang-tai": ["Đang tải", "Loading"],
  rong: ["Rỗng", "Empty"], loi: ["Lỗi", "Error"], "tuan-truoc": ["Tuần trước (chỉ xem)", "Previous week (view only)"],
  nhap: ["Có nháp chưa lưu", "Unsaved draft"], "chua-dk": ["Chưa chọn ca nào", "Nothing selected"], khoa: ["Đã khoá", "Locked"],
  "khoa-quen": ["Đã khoá, quên bấm Lưu", "Locked, not saved"], "chua-cong-bo": ["Chưa công bố", "Not published"],
};
const STATE_LIST = {
  lich: ["du-lieu", "chua-vi-tri", "mo-dk", "cong-bo", "dang-tai", "rong", "loi"],
  tre: ["du-lieu", "tuan-truoc", "dang-tai", "rong", "loi"],
  ranh: ["du-lieu", "nhap", "chua-dk", "khoa", "khoa-quen", "dang-tai", "loi"],
  ca: ["du-lieu", "chua-cong-bo", "dang-tai", "rong", "loi"],
  nv: ["du-lieu", "dang-tai", "rong", "loi"],
  nk: ["du-lieu", "dang-tai", "rong", "loi"],
  dn: ["du-lieu", "loi"],
};

// Desktop: opens the calendar side panel the way the wireframe does on a wide screen (it skips this in frame mode)
const openPanel = "openPanel('s1', 2, 2)";
const click = (selector) => `document.querySelector(${JSON.stringify(selector)}).click()`;
const visibleClick = (selector) => `[...document.querySelectorAll(${JSON.stringify(selector)})].find((n) => n.offsetParent).click()`;

// Overlays: one page each, on top of the "data" state. `only` limits the page to one width
const OVERLAYS = [
  { man: "lich", file: "data-staff-list", vi: "Danh sách nhân viên", en: "Staff list", only: "desktop", steps: [openPanel, visibleClick(`[onclick^="openPop(event,'stafflist'"]`)] },
  { man: "lich", file: "data-filters", vi: "Bộ lọc", en: "Filters", only: "desktop", steps: [openPanel, visibleClick(`[onclick^="openPop(event,'stafflist'"]`), "ui.popView = 'filters'; render()"] },
  { man: "lich", file: "data-add-staff", vi: "Thêm người vào ca", en: "Add someone to a period", only: "desktop", steps: [openPanel, visibleClick(`[onclick^="openPop(event,'add'"]`)] },
  { man: "lich", file: "data-date-picker", vi: "Chọn tuần theo ngày", en: "Date picker", only: "desktop", steps: [openPanel, visibleClick(`[onclick^="openPop(event,'datepick'"]`)] },
  { man: "lich", file: "data-publish-dialog", vi: "Hộp Công bố", en: "Publish dialog", steps: [openPanel, "openDialog('publish')"] },
  { man: "lich", file: "data-remove-day-dialog", vi: "Hộp Bỏ khỏi mọi ca trong ngày", en: "Take off every shift dialog", steps: [openPanel, "ui.panel.sel = new Set(); openDialog('removeDay')"] },
  { man: "lich", tt: "cong-bo", file: "published-edit-shift-dialog", vi: "Hộp Sửa ca (đã công bố)", en: "Edit shift dialog (published)", steps: [openPanel, "openDialog('shift')"] },
  { man: "lich", file: "data-panel-sheet", vi: "Panel người (điện thoại)", en: "Person panel (phone)", only: "mobile", steps: [openPanel] },
  { man: "lich", file: "data-staff-sheet", vi: "Danh sách nhân viên (điện thoại)", en: "Staff list (phone)", only: "mobile", steps: ["ui.sheet = 'staff'; render()"] },
  { man: "tre", file: "data-anomaly-dialog", vi: "Hộp Ca bất thường", en: "Anomaly dialog", steps: [visibleClick(`[onclick*="openDialog('anomaly'"]`)] },
  { man: "ranh", file: "data-custom-times", vi: "Sửa giờ riêng", en: "Custom times editor", steps: ["toggleCustom(WEEK.findIndex((_, d) => ui.custom[d]))"] },
  { man: "nv", file: "data-edit-drawer", vi: "Sửa nhân viên", en: "Edit staff member", steps: ["ui.staffEdit = 's1'; render()"] },
  { man: "nv", file: "data-edit-drawer-limit", vi: "Sửa nhân viên: chọn vị trí thứ ba", en: "Edit staff member: a third usual position", steps: ["ui.staffEdit = 's12'; render(); toggleStaffPos('pc')"] },
];

const pages = [];
for (const man of Object.keys(SCREENS)) {
  for (const tt of STATE_LIST[man]) pages.push({ man, tt, lang: "vi", file: STATES[tt], vi: STATE_LABELS[tt][0], en: STATE_LABELS[tt][1], steps: man === "lich" && ["du-lieu", "chua-vi-tri", "mo-dk", "cong-bo"].includes(tt) ? [openPanel] : [] });
  pages.push({ man, tt: "du-lieu", lang: "en", file: "data", vi: STATE_LABELS["du-lieu"][0], en: STATE_LABELS["du-lieu"][1], steps: man === "lich" ? [openPanel] : [] });
}
for (const o of OVERLAYS) pages.push({ tt: "du-lieu", lang: "vi", ...o, overlay: true });

const hrefFor = (hash, fromDir) => {
  const [man, , , , , , , lang, tt] = hash.slice(1).split(".");
  if (!SCREENS[man]) return "#";
  const name = STATES[tt] && STATE_LIST[man].includes(tt) ? STATES[tt] : "data";
  return `${fromDir ? "../" : ""}${SCREENS[man].dir}/${name}${lang === "en" ? ".en" : ""}.html`;
};

// Runs in the page: strips wireframe-only markup and returns the design's HTML
function extract({ mobileOnlyLayer }) {
  const clean = (rootNode) => {
    for (const n of rootNode.querySelectorAll("[data-wf-only]")) n.remove();
    for (const n of rootNode.querySelectorAll("*")) {
      for (const a of [...n.attributes]) {
        if (a.name.startsWith("on") || a.name.startsWith("data-wf") || a.name === "data-focus-id" || a.name === "data-lucide") n.removeAttribute(a.name);
        if (a.name === "data-tip") { const t = document.createElement("div"); t.innerHTML = a.value; n.setAttribute("title", t.textContent.trim()); n.removeAttribute("data-tip"); }
      }
      if (n.tagName === "INPUT" && (n.type === "checkbox" || n.type === "radio")) n.checked ? n.setAttribute("checked", "") : n.removeAttribute("checked");
    }
  };
  const main = document.getElementById("wf-design").cloneNode(true);
  const layer = document.getElementById("wt-layer").cloneNode(true);
  clean(main); clean(layer);
  // Phone-only sheets stay off the wide layout (the person panel sheet already hides itself from 1280px)
  if (mobileOnlyLayer) for (const n of layer.children) if (!n.classList.contains("xl:hidden")) n.classList.add("lg:hidden");
  const hrefs = [...main.querySelectorAll("a[href^='#']"), ...layer.querySelectorAll("a[href^='#']")];
  return { main: main.innerHTML.trim(), layer: layer.innerHTML.trim(), hrefs: hrefs.map((a) => a.getAttribute("href")) };
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const page = ({ lang, title, main, layer }) => `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/app.css" />
  </head>
  <body class="bg-background font-sans text-foreground antialiased">
    <div id="app">${main}</div>
    ${layer ? `<div id="layer">${layer}</div>` : ""}
    <script src="../assets/static.js"></script>
  </body>
</html>
`;

const browser = await chromium.launch({ channel: "chrome" });
const manifest = [];
for (const p of pages) {
  const sc = SCREENS[p.man];
  const width = p.only === "mobile" ? 375 : 1440;
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const tab = await ctx.newPage();
  const errors = [];
  tab.on("pageerror", (e) => errors.push(e.message));
  const url = `${base}?man=${p.man}&v=${sc.v}&mau=mau&nhan=cham&logo=2&kho=desktop&nav=duoi&lang=${p.lang}&tt=${p.tt}&frame=1`;
  await tab.goto(url, { waitUntil: "networkidle" });
  for (const step of p.steps) { await tab.evaluate(step); await tab.waitForTimeout(80); }
  await tab.waitForFunction(() => !document.querySelector("i[data-lucide]"));
  const out = await tab.evaluate(extract, { mobileOnlyLayer: p.only === "mobile" });
  let { main, layer } = out;
  for (const h of new Set(out.hrefs)) { const to = hrefFor(h, true); main = main.split(`href="${h}"`).join(`href="${to}"`); layer = layer.split(`href="${h}"`).join(`href="${to}"`); }
  const file = `${sc.dir}/${p.file}${p.lang === "en" ? ".en" : ""}.html`;
  const title = `Watchtower · ${p.lang === "en" ? sc.en : sc.vi} · ${p.lang === "en" ? p.en : p.vi}`;
  mkdirSync(join(root, sc.dir), { recursive: true });
  writeFileSync(join(root, file), page({ lang: p.lang, title, main, layer }));
  manifest.push({ screen: p.man, dir: sc.dir, file, lang: p.lang, state: p.tt, overlay: !!p.overlay, only: p.only || null, vi: p.vi, en: p.en, source: url });
  console.log(`${errors.length ? "!" : "✓"} ${file}${errors.length ? "  " + errors.join(" | ") : ""}`);
  await ctx.close();
}
await browser.close();
writeFileSync(join(root, "tools", "pages.json"), JSON.stringify({ screens: SCREENS, pages: manifest }, null, 2) + "\n");

// index.html: every page, grouped by screen
const ROLE = { lich: "Owner", tre: "Owner", nv: "Owner", nk: "Owner", ranh: "Staff", ca: "Staff", dn: "Everyone" };
const chev = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0 text-muted" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;
const tag = (t) => `<span class="inline-flex h-6 shrink-0 items-center rounded-full bg-neutral-bg px-2.5 text-xs font-medium text-neutral">${t}</span>`;
const row = (x) => `<li><a href="${x.file}" class="flex min-h-12 items-center gap-3 px-4 py-2.5 outline-hidden hover:bg-surface-hover focus-visible:bg-surface-hover">
  <span class="min-w-0 flex-1"><span class="block text-sm font-medium">${esc(x.vi)}</span><span class="block text-xs text-muted">${esc(x.en)}${x.lang === "en" ? " · English copy" : ""}</span></span>
  ${x.lang === "en" ? tag("EN") : ""}${x.only === "desktop" ? tag("1440 px") : x.only === "mobile" ? tag("375 px") : ""}${chev}</a></li>`;
const cards = Object.entries(SCREENS).map(([man, sc]) => {
  const list = manifest.filter((x) => x.screen === man);
  return `<section class="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-surface">
    <div class="flex items-center gap-3 border-b border-border px-4 py-3"><h2 class="min-w-0 flex-1 text-base font-semibold">${sc.vi} <span class="font-normal text-muted">· ${sc.en}</span></h2>${tag(ROLE[man])}</div>
    <ul class="divide-y divide-border">${list.filter((x) => !x.overlay).map(row).join("")}</ul>
    ${list.some((x) => x.overlay) ? `<p class="border-t border-border bg-background/60 px-4 pt-3 pb-1 text-xs font-medium text-muted">Overlays</p><ul class="divide-y divide-border">${list.filter((x) => x.overlay).map(row).join("")}</ul>` : ""}
  </section>`;
}).join("\n");
writeFileSync(join(root, "index.html"), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Watchtower · Phase 1 screens</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/app.css" />
  </head>
  <body class="bg-background font-sans text-foreground antialiased">
    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div class="flex items-center gap-2.5"><span class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><svg viewBox="0 0 24 24" fill="currentColor" class="size-5" aria-hidden="true"><rect x="4" y="4.5" width="11" height="4" rx="2"/><rect x="9" y="10" width="11" height="4" rx="2"/><rect x="4" y="15.5" width="7" height="4" rx="2"/></svg></span><span class="text-sm font-semibold">Watchtower</span></div>
      <h1 class="mt-6 text-2xl font-semibold text-balance">Phase 1 screens</h1>
      <p class="mt-2 max-w-2xl text-sm/6 text-pretty text-muted">Static pages built from the Phase 1 wireframe: weekly calendar option B, every other screen option A, bottom bar on phones. Each page works from 375 px up unless it is marked with one width. All data is fake.</p>
      <div class="mt-6 gap-4 md:columns-2">
${cards}
      </div>
    </main>
  </body>
</html>
`);
