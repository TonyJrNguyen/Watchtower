# Phase 1 screens (static HTML + Tailwind v4)

The Phase 1 screens as static pages, one page per screen and state, for building the app and for the Figma file. They are the layouts the client chose at gate 2 (2026-10-10): **weekly calendar option B, every other screen option A, bottom bar on phones**, in the Chàm accent with the stacked-bars logo. They follow PRD v1.10 and the wireframe approved on 2026-10-17: the Phụ trách (shift lead) position in gold, Bếp in brown, one position per period, per-person rates, usual positions with hours worked per position, and the staff page "Hồ sơ của tôi" (My profile). All data is fake.

Open `index.html` for the list of pages. Every page works from 375 px up, except overlay pages marked `1440 px` (popovers placed for a wide screen) or `375 px` (phone sheets).

## Where they come from

The pages are generated from the Phase 1 wireframe, `prototypes/phase1-wireframe/`. The wireframe is already written with the design's tokens, Tailwind classes and components, so `tools/capture.mjs` opens it in Chrome for each screen and state and saves the rendered DOM. Before saving it strips what belongs to the wireframe only: the toolbar, block numbers and click handlers. It also points the links at the other pages.

So **don't edit the pages by hand**: change the wireframe, then rebuild. The PRD still wins over both (PRD §5.3).

The pages have no behaviour: each one is a single state, and tooltips are plain `title` attributes. On the calendar, the person panel sits beside the calendar from 1280 px and is a bottom sheet below that (`calendar/data-panel-sheet.html`).

## Files

| Path | What |
|---|---|
| `index.html` | Every page, grouped by screen |
| `<screen>/<state>.html` | One screen in one state, Vietnamese copy. `data.en.html` is the same screen in English |
| `<screen>/data-<overlay>.html` | A dialog, popover, drawer or sheet open over the data state |
| `src/app.css` | Tokens and Tailwind theme. **The brand block at the top holds the accent (`--primary`) and the font (`--app-font`)** |
| `assets/app.css` | Compiled CSS (committed, so the pages open without a build) |
| `assets/static.js` | Marks indeterminate checkboxes, the only thing HTML can't express |
| `tools/capture.mjs` | Builds the pages and `index.html` from the wireframe |
| `tools/pages.json` | List of pages with the wireframe URL each one came from |

Screens: `calendar` (Lịch tuần), `lateness` (Đi trễ), `availability` (Lịch rảnh), `my-profile` (Hồ sơ của tôi), `staff` (Nhân viên), `activity-log` (Nhật ký), `sign-in` (Đăng nhập).

## Rebuild

```
npm install
python -m http.server 4180 -d ../../prototypes/phase1-wireframe   # in another terminal
npm run build                                                       # capture → format → CSS
```

`npm run build:css` alone recompiles the CSS after a change to `src/app.css`. Capture uses the installed Google Chrome.

No dark mode, by decision (light theme only).
