# Phase 1 wireframe

The wireframe reviewed with the client on 2026-10-10 and 2026-10-11. It's the reference for every change in PRD v1.9 (PRD §5.3). Everything else still follows `../phase1-demo.html`, and the PRD wins over both.

Since 2026-11-01 it also draws PRD v1.11: seven positions without QC in the client's order and colours, solid markers with sub-position marks, states shown by shape rather than hue (grey marker with a check, a "!" badge, a struck-through nickname, labelled Draft/Published badges), grouping by position in a cell, the Friday 13:00 close, the registration order with its time labels and toolbar switch, the schedule export (published weeks, under **Export** in the calendar toolbar), and the agreed late start with no grace. The client approved the wireframe up to PRD v1.10 on 2026-10-17; no review of the v1.11 drawings is recorded yet, so the PRD applies wherever they differ.

All data is fake, and nothing is saved: every action only changes data held in the page.

The one exception is the **Try-out** state (`tt` = `thu`, "Trải nghiệm từ đầu" in the state menu), added on 2026-11-04 so the client can walk the whole Phase 1 flow. It starts with only the staff records; registrations, shifts, staffing need, lateness and the activity log are empty. A band above the app shows a fake clock, the account in use and five steps: staff register → registration locks → owner places people and gives positions → publish → record lateness and check shifts. Sign in picks any account without a password. What the client does is kept in the browser's `localStorage` (with `window.name` as a fallback), so it survives switching screens and reloading, until **Start over** clears it. The band also offers shortcuts (sample registrations for everyone else, sample staffing need, sample placing) so the client doesn't have to enter 22 people by hand. Opening the link at `#lich.b.mau.cham.2.desktop.duoi.vi.thu` starts there. Try-out is a demo aid, not part of the product, and the static screens in `design/phase1/` leave it out.

## Open it

Serve this folder and open `wireframe.html`, for example:

```
python -m http.server 4173 -d prototypes/phase1-wireframe
```

then go to `http://localhost:4173/wireframe.html?man=lich&v=b&mau=mau`.

The toolbar at the top switches the screen, the option (the chosen ones are recommended), colour on/off, accent, logo, desktop or phone, VI/EN, and the demo state. The same settings can go in the URL:

| Parameter | Values |
|---|---|
| `man` (screen) | `lich` weekly calendar · `tre` lateness · `nv` staff · `nk` activity log · `ranh` availability · `ca` my shifts · `dn` sign in |
| `v` (option) | `a`–`e` where a screen has options; chosen: calendar `b`, every other screen `a` |
| `mau` | `mau` colour, `xam` greyscale |
| `kho` | `desktop`, `mobile` |
| `lang` | `vi`, `en` |
| `tt` (state) | depends on the screen, e.g. `du-lieu`, `chua-vi-tri`, `cong-bo`, `nhap`, `khoa-quen` |

## Files

- `wireframe.html` — page shell, colour tokens and the wireframe toolbar styles
- `wf-data.js` — mock staff, registrations, assignments and the configurable hour rules (`RULES`)
- `wf-thu.js` — the Try-out state: the stored data, fake clock, band, sign-in picker and shortcuts. It loads between the two other scripts
- `wf-app.js` — every screen, option, state and interaction

When you change a script, bump the `?v=` on its `<script>` tag in `wireframe.html` so browsers don't run a cached copy.
