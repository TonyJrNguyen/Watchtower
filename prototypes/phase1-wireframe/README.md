# Phase 1 wireframe

The wireframe reviewed with the client on 2026-10-10 and 2026-10-11. It's the reference for every change in PRD v1.9 (PRD §5.3). Everything else still follows `../phase1-demo.html`, and the PRD wins over both.

All data is fake, and nothing is saved: every action only changes data held in the page.

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
- `wf-app.js` — every screen, option, state and interaction

When you change a script, bump the `?v=` on its `<script>` tag in `wireframe.html` so browsers don't run a cached copy.
