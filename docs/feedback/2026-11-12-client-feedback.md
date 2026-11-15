# Client feedback — 2026-11-12 (sheet tab 12.11 and the real staff list)

> Vietnamese version: [`2026-11-12-client-feedback.vi.md`](2026-11-12-client-feedback.vi.md).
> This English file is the main copy. When one changes, update the other to
> match. "Role" in the client's wording means *position* (PRD §3.3).

Status: **decided.** Items 1–2 come from the client and
items 3–7 from Tony. Tony answered the open points on a Q&A page on
2026-11-16 (section 0), and the answers are applied to PRD v1.14, with F1 answered in a second round
the same day. Sections 1–2 are the original
items and the analysis, kept for traceability. Where section 0 and sections
1–2 differ, section 0 applies.

Source: the shared sheet *FEEDBACK-WATCHTOWER*, tabs *12.11* and *Data mẫu
nhân viên cho Try-out*. Items 1–2 were written by the client's contact
(huyhoang.tran0703); items 3–7 by Tony.

---

## 0. Decisions (applied to PRD v1.14)

| # | Topic | Decision | Source | PRD |
|---|---|---|---|---|
| E1 | Selection tint | Selecting a marker tints that staff member's cells on the days in view, by the state of the marker selected: a **placed** marker tints every cell where they are placed in a **warm** colour; an **unplaced** one tints every cell they registered, or can work as counted free, in a **cool** colour. Background only, no outline (item 1) | Client (ask), Tony (reading, no outline) | FR-O42 |
| E2 | Real staff | The 32 staff in the client's list replace the sample staff in the wireframe and its Try-out, with their full names, nicknames and positions; the five in bold (Thanh Danh, Hữu Thạnh, Dương, Diệu Hiền, Nhựt Trường) can be Phụ trách. "Uyễn Nhi" is corrected to **Uyển Nhi**. Two sample cases that would mislabel a real person are dropped: a deactivated staff member still holding a shift, and a Phụ trách shift held after the shift-lead switch was turned off (item 2) | Client, Tony (spelling) | none (sample data) |
| E3 | Shop schedule | Staff get a **shop schedule** (Lịch quán): the **published** week of the whole shop, read-only, laid out as the export (nickname on the position colour, marks, times only where they differ) with **each day's schedule note** under its day, their own markers outlined. On by default; the Owner can turn it off. Third exception to NFR-2 (item 3) | Tony (proposal), Client (confirmed) | FR-S24, NFR-2, ADR 0032 |
| E4 | Schedule note readers | Besides the staff working that day (My profile), the note is read on the shop schedule and **printed in the export** under its day | Tony | FR-O52, FR-O54 |
| E5 | Note after publication | An edit or deletion after publication **applies at once**; the separate "Publish note" step is removed | Tony | FR-O54, ADR 0030 (amended) |
| E6 | Warning | A **small warm dot on the marker's bottom-right corner**, opposite the marks badge and half its size, replaces the wavy underline (item 4) | Tony | FR-O42, FR-O49 |
| E7 | Folded markers | Staff registered for a period but placed elsewhere that day fold into **"+N"** (closes O7). Hover lists the names; selecting it opens a list titled **"Registered · CA 1 · Mon 12/10"**, with a close button, no search and no explanatory line. Choosing someone brings their marker back and opens their side panel; it folds back when the panel closes or moves on unless Save placed them there (item 5) | Tony | FR-O42, FR-O49 |
| E8 | Closing the panel | Selecting an **empty spot of the calendar** closes the side panel, asking first if it holds unsaved changes. Applies to every panel, not only one opened from "+N" (item 5) | Tony | FR-O43 |
| E9 | Owner's note | Opens from its icon as a **full-width area above the calendar and the panel**, which move down and return when it closes. Basic formatting edited in place: bold, italic, underline, bulleted and numbered lists (item 6) | Tony | FR-O53 |
| E10 | Views | The **3 Days view is removed**; Day and Week remain (item 7) | Tony | FR-O47 |
| E11 | Registration lock | No rule is needed for locking a registration once it is assigned, since registration locks for the whole week before placing opens (Q7 of the 2026-11-12 panel review) | Tony | ADR 0031 (no change) |
| E12 | Short-day warning | A registered day under 8 hours (FR-S3) is warned only on markers **not yet placed** in that period; once placed, the marker carries no such warning (F1) | Tony | FR-O42 |
| E13 | Panel sections | The side panel's sections (shifts of the day, position, reason) are **collapsed when the panel first opens**, and stay as the Owner leaves them | Tony | FR-O43 |

F1 asked whether the warning for a registered day under 8 hours (FR-S3)
should show on every marker of that day, read the assigned hours once the
staff member is placed, or show only on unplaced markers. Tony chose the last
in the second round (E12): the rule is about registration, so once a marker
is placed there is nothing left for the Owner to act on.

---

## 1. Items as written

| # | By | Item (translated) |
|---|---|---|
| 1 | Client | Highlight a staff member across the week. Before shifts are assigned, clicking their marker highlights the shifts they registered, in a cool colour. Once assigned, clicking it highlights the shifts they were assigned, in a warm colour. |
| 2 | Client | Replace every staff profile with the real ones in the sheet "Data mẫu nhân viên cho Try-out" (staff in bold can be Phụ trách). The other positions are abbreviated: PV Phục vụ, PC Pha chế, ONL Thu ngân Online, OFF Thu ngân Offline, KTD Kiểm tra đơn, B Bếp. |
| 3 | Tony | Staff see the whole week's schedule (a suggestion, not a decision; analyse the risks and gaps). In practice staff can always see the whole shop's week, so that they can swap shifts with each other when needed, which happens often. It matches the need for the schedule export, pasted for the whole shop to see. |
| 4 | Tony | A subtler warning: on the marker's bottom-right corner, below and opposite the sub-position badge, in a warm tone, half the badge's size. |
| 5 | Tony | Settle the option that folds staff not assigned to the remaining periods into "+N". Hovering shows the hidden staff; clicking opens a popup like Add for staff who didn't register, with a close button and no search box. Clicking a staff member's marker in the popup brings it back. If they are assigned to that period, the marker stays on the calendar; if not, closing the right panel, clicking another marker or clicking outside puts it back into "+N". |
| 6 | Tony | The owner's note expands when its icon is clicked: a field across the whole weekly calendar, pushing the calendar and the panel down; closing restores them. Basic rich text, WYSIWYG: bold, italic, underline, bullets, numbering. |
| 7 | Tony | Remove the 3-day view. |

---

## 2. Analysis

**Item 1 (E1).** The client's wording reads two ways: by the state of each
cell, or by the state of the marker selected. Tony chose the second on
2026-11-16, so one colour shows at a time. A first drawing with an outline on
the cells was too heavy and was replaced by a background tint.

**Item 3 (E3–E5).** NFR-2 and the project's read-access rule forbade staff
from seeing anyone else's schedule. The risk is lower than it looks: the
Owner already posts the exported schedule for the whole shop, and the shop
schedule shows the same content, kept current. It is limited to published
weeks and never shows pay, availability, custom times asked for, day notes,
lateness or the owner's note. Swaps are still agreed on Zalo and recorded by
the Owner; if staff swap without telling the Owner, the shop schedule shows
the old arrangement until the change is recorded. The client confirmed the
screen, Tony kept a switch for the Owner, and the schedule note follows the
shop schedule to every staff member and into the export.

**Item 5 (E7, E8).** On a phone, tapping outside already closes the bottom
sheet. On a computer the panel sits beside the calendar, so "clicking
outside" became "selecting an empty spot of the calendar", applied to every
panel.

**Item 2 (E2).** Positions in the sheet are what each person can do, so they
become their usual positions, all above the 50-hour threshold in the sample.
With five people able to lead, the sample staffing needs (two Phụ trách per
period) show many shortages; in the Try-out the client enters needs
themselves.
