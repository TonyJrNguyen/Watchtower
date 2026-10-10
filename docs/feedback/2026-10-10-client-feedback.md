# Client feedback — 2026-10-10 (Phase 1 wireframe review, PRD v1.8)

> Vietnamese version: [`2026-10-10-client-feedback.vi.md`](2026-10-10-client-feedback.vi.md).
> This English file is the main copy. When one changes, update the other to
> match. "Role" in the client's wording means *position* (PRD §3.3).

Status: **fully decided (2026-10-11) and applied** to PRD v1.9 and the Phase 1 wireframe. Section 0 holds the decisions; section 1 summarises what the client asked for, kept for traceability. Where they differ, section 0 applies.

---

## 0. Decisions

### 0.1 Layouts chosen

| Screen | Choice |
|---|---|
| Phone navigation | Bottom bar |
| Weekly calendar (Owner) | **B** — calendar at full width, staff list and filters behind one button — with the changes below, desktop and phone |
| Lateness, Staff, Activity log (Owner) | A |
| Availability, My shifts (Staff) · Sign in | A |
| Demo states | Add "placed, no position given yet" to the weekly calendar |

### 0.2 Weekly calendar (Owner)

| # | Topic | Decision | PRD |
|---|---|---|---|
| W1 | Undo / redo | While the week is a draft, for placing and positions. Session only (reload clears it), Ctrl+Z / Ctrl+Y, hidden after publishing | FR-O48 |
| W2 | Clearing a position | Looks exactly like "placed, no position". The dark look the client saw was the selection outline; it now uses the accent colour | FR-O42 |
| W3 | Registered every period | Star on the marker. "Every period" means all 35 of the week | FR-O23 |
| W4 | Registered nothing | Dashed and fainter. **Left out of the default selection**, still counted as free in every number and in Add; one Filters option brings them back | FR-O11, FR-O23 |
| W5 | Side panel sections | Shifts of the day, Position and Reason collapse like the Filters groups | FR-O43 |
| W6 | Save / Take off | Always clickable. With no period selected, either one removes the person from every shift that day, after a confirmation | FR-O43 |
| W7 | "Registered" in the panel | Green chip with a tick | FR-O43 |
| W8 | Week state | Draft yellow, Published green | FR-O42 |
| W9 | Navigation | `<<` oldest week with data · `<` · date picker (jumps to the range holding the date) · `>` · `>>` week being scheduled | FR-O47 |
| W10 | "Who registered" tab | **Removed**, on phone too | FR-O41 retired |
| W11 | "Coverage by position" tab | Renamed **Staffing** (Phân công). Needs entered per position × period × day, with *copy from last week*; shows assigned against needed | FR-O1, FR-O4 |
| W12 | Marker order | Per day column. CA 1: warnings first, then A–Z, then manually added in the order added. CA 2–5 inherit the order of the period above; new names A–Z after the inherited ones. *Placed outside availability* doesn't count as a warning here, so manually added people stay last. No grouping by position | FR-O49 |
| W13 | Staff list hours | Registered hours, not placed hours | FR-O11 |

### 0.3 Availability (Staff)

| # | Topic | Decision | PRD |
|---|---|---|---|
| S1 | Draft and Registered | Changes stay a draft until Save; the Owner sees only the last saved version; edits after a save are a new draft; *Discard draft* restores | FR-S20 |
| S2 | After the window | Read-only. An unsaved draft is saved automatically and the **staff member** is told they didn't press Save; the Owner isn't shown the difference | FR-S5 |
| S3 | Short day | Red glow on a day below 8 hours | FR-S3 |
| S4 | Note | Optional, per day; shown in the Owner's side panel and as an icon on the calendar marker; can be closed, which removes it | FR-S22 |
| S5 | Custom times | Per period, **within the period only**, because staff ask to arrive late or leave early | FR-S21 |
| S6 | Custom-times editor | Opened from the day's **Own times** button, which stays next to **Note**; one editor per day with a choice of period. Opens ready to edit; Save/Cancel only when something changed; × discards; Remove when saved. Save in the editor only updates the draft; *Discard draft* drops unsent custom times. One editor open at a time; unsaved changes block opening another and the page's Save ("Save or cancel own times first"). The Own times button is highlighted on a day with custom times, and the chip shows a clock with the times | FR-S21 |
| S7 | Owner's side | Same clock icon on the marker. An undecided request (registered, not placed) **is a warning** (orange dot). No approval state: the Owner places by the requested or the standard times | FR-O50 |

### 0.4 Hours and pay

| # | Topic | Decision | PRD |
|---|---|---|---|
| H1 | CA 5 and the 8-hour warning | A day with the whole of CA 5 raises no warning (CA 1 + 3 + 5, or CA 5 alone). Otherwise below 8 hours warns. An empty day is a day off | FR-S3 |
| H2 | CA 5 pay | Still shown 17:00–23:00, but the whole of CA 5 is paid until 24:00 (7 hours) | FR-C14 |
| H3 | Custom CA 5 | Paid by its own times, capped at 23:00 (e.g. 18:00–23:00 = 5 hours), and non-standard for the weekly bonus | FR-C14, FR-B1 |
| H4 | Weekly bonus | A day with the whole of CA 5 counts as a qualifying day although it is under 8 hours | FR-B1 |

---

## 1. What the client asked for (summary)

**Owner:** undo/redo while drafting; a cleared position should look like "placed, no position"; a star for staff who registered every shift; clearer dashed, faded look for staff who registered nothing, excluded by default; collapsible panel sections; Take off must not be disabled; a stronger "Registered" status; yellow Draft and green Published; replace "Week being scheduled" with a date picker and `<< < > >>` navigation; remove the "Who registered" tab; rename "Coverage by position" and use it to set headcount per position and see how many are assigned; the marker order rules in 0.2 W12.

**Staff:** Draft and Registered states; the Owner sees a registration only after Save; editable until the window closes, then read-only; an unsaved draft becomes saved at the cutoff, shown as "forgot to save"; red glow on short days; an optional daily note shown to the Owner; staff may change in and out times, shown to the Owner with an orange dot and a warning so they can decide.

**Hours and pay:** CA 5 alone is a full day for the warning and for the weekly bonus; CA 5 is paid until 24:00 (7 hours); someone starting at 18:00 is paid until 23:00 and is non-standard; the calendar must show and count such irregular times.

**Custom-shift spec (2026-10-11):** each shift has its own custom state with a visible indicator distinct from the warning dot; Save, Cancel, Close (×), Edit and Delete with defined states. Agreed simplifications: edit directly instead of a separate Edit mode, Save/Cancel only when something changed, one editor at a time, and the editor reached from the day's Own times button rather than a control under every shift.
