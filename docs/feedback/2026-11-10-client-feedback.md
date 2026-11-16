# Client feedback — 2026-11-10 (Try-out review of the v1.11 drawings)

> Vietnamese version: [`2026-11-10-client-feedback.vi.md`](2026-11-10-client-feedback.vi.md).
> This English file is the main copy. When one changes, update the other to
> match. "Role" in the client's wording means *position* (PRD §3.3).

Status: **decided, one item waiting on the client.** This is the client's
review of the v1.11 drawings, made in the wireframe's Try-out state (PRD
§5.3). Tony answered every item on the review page in two rounds on
2026-11-12 (section 0), and the answers are applied to PRD v1.13. The client
still has to choose one of the three chip arrangements in item 12 (D22,
PRD §5.1 O7). Sections 1–2 below are the original items and the analysis,
kept for traceability. Where section 0 and sections 1–2 differ, section 0
applies.

Source: the shared sheet *FEEDBACK-WATCHTOWER*, tab *10.11*. Items 1–10 were
written by the client's contact (huyhoang.tran0703); items 11–14 and the note
on item 6 were added by Tony.

---

## 0. Decisions (applied to PRD v1.13)

"Client" marks what the client asked for in the sheet, "Tony" marks Tony's
answers on the review page.

| # | Topic | Decision | Source | PRD |
|---|---|---|---|---|
| D1 | Colours | Phụ trách `#666666`, Thu Ngân – Offline `#ff9749`, Thu Ngân – Online `#55c0c9`, Kiểm tra đơn `#f57bc8`, Pha chế `#56be72`, Phục vụ `#fbbc04` (unchanged), Bếp `#df564a`. White text on Phụ trách and Bếp, dark text on the others (item 1) | Client | §3.3 |
| D2 | Pha chế | Sub-positions renamed and marked by number: **1** Trà sữa, **2 Latte** (was Matcha), **3** Trà, **4 Topping** (was Bồn). A rename changes the label only, so earlier assignments show the new name (item 2) | Client, Tony (rename) | §3.3, §4.10 |
| D3 | Phụ trách marks | **T** (Trong) and **N** (Ngoài) instead of Tr and Ng (item 3) | Client | §3.3 |
| D4 | Bưng bàn mark | **B** instead of BB. B is free since Bồn became 4 | Tony | §3.3 |
| D5 | Registered marker | Since Phụ trách is now grey, a marker registered and not yet placed is **unfilled with a dashed outline** and keeps its check, instead of being filled grey | Tony | FR-O42 |
| D6 | Warning | A **wavy underline under the nickname** replaces the "!" badge. It is drawn in the text colour, so it shows on every position colour and on the dashed registered marker, and it reads differently from the strike-through of a deactivated holder (item 4) | Client (ask), Tony (form) | FR-O42, FR-O49 |
| D7 | Marks | The marks move to the marker's **top-right corner**, where the "!" badge was, as a small solid badge. Two sub-positions share one badge ("1·3") (items 4, 5) | Client (place), Tony (form) | §3.3, FR-O42 |
| D8 | Registration time | The first-save time stays on the top-left edge of markers registered and not yet placed, as in the Try-out. It never meets a mark, because marks appear only on placed markers | Tony | FR-O42 (no change) |
| D9 | Add | While the week is a draft, choosing someone in Add **places them at once** in that period, without a position, and opens the side panel with that period selected. The placement stays even if the panel is closed without Save; it is an ordinary draft placement, can be undone (FR-O48) and must get a position before publication (FR-O33). Only the panel's **Cancel** takes it back, while nothing has been saved in that panel; Reset keeps it (Tony, 2026-11-12, see item 6). After publication Add works as before, because a new shift must carry a position (item 6) | Client, Tony | FR-O46, §3.5 |
| D10 | Add list | An entry no longer says "no shift today" when the staff member holds nothing else that day; it shows nothing instead (item 6) | Tony | FR-O46 |
| D11 | Usual positions | **No limit.** Every position with more than 50 published hours in the last 12 weeks is a usual position, as is every position the Owner ticks. The out-of-experience flag and the experience filter read the same list, so experienced positions are no longer a separate list. Pinning and the restart from zero on removal stay (item 8) | Client, Tony | FR-A12, FR-O32, §3.3, ADR 0029 |
| D12 | Date header | Clicking a date in the calendar's header opens the **Day** view of that date (item 9) | Client | FR-O47 |
| D13 | Switching view | Switching to Day or 3 Days starts from the day of the marker whose side panel is open. With no panel open the current rule stays: the first day in view, which is Monday from the Week view (item 9) | Client, Tony | FR-O47 |
| D14 | 3 Days from a marker | The day before and the day after, kept inside that week: from Monday it shows Monday–Wednesday, from Sunday Friday–Sunday. Previous and next still move across weeks (item 9) | Tony | FR-O47 |
| D15 | Notes | Two new notes, both in **Phase 1** (item 10): an **owner's note** per week, seen and edited only by the Owner; and a **schedule note** per day, written by the Owner and published with the week | Client, Tony (phase) | FR-O53, FR-O54, §4.13 |
| D16 | Who reads a schedule note | Every staff member with a published shift that day. This is a deliberate exception to NFR-2, because a note such as "A trains B" names other staff | Tony | FR-O54, FR-S11, NFR-2, ADR 0030 |
| D17 | Editing a published note | An edit after publication is a draft that staff don't see until the Owner publishes it; staff keep seeing the published text meanwhile | Tony | FR-O54 |
| D18 | Marker opens and closes the panel | Clicking the marker of the open panel closes it; clicking another marker switches the panel to it; the close button stays (item 11) | Tony | FR-O43 |
| D19 | Panel selection | The ticked periods are the day the staff member will have after Save. The panel opens with **every** period they hold that day ticked, whichever marker was clicked, CA 5 included; opened from a period they don't hold, it also ticks that period as a suggestion. Unticking takes them off; Save writes only the difference, so untouched periods keep their position and times; the position applies to the clicked (context) period and newly ticked ones; Take off is removed; Reset, Cancel and a Save / Discard / Stay question on leaving. Settled on a separate review page on 2026-11-12, see item 13 (item 13) | Tony | FR-O43, FR-O46, ADR 0031 |
| D20 | Short day on the calendar | A marker carries the warning when the staff member's registered day is below 8 hours under FR-S3's rule, whatever the week's total. A day with the whole of CA 5 isn't warned. For ordering (FR-O49) it doesn't count as a warning (item 14) | Tony | FR-O42, FR-O49 |
| D21 | Try-out fixes | Creating a staff member, then trying the app as them, works like for every other staff member (item 7). Not a product change | Client | — |
| D22 | Chip arrangement | When someone registered several periods of a day and is placed in only some, the marker left in a period they weren't placed in takes a slot and confuses the Owner. Three options are drawn in the Try-out for the client to choose from (item 12). **Waiting on the client** | Tony | §5.1 O7 |
| D23 | Review status | This sheet is the client's review of the v1.11 drawings. That unblocks the backlog re-estimate and the pricing of the schedule export (FR-O52) | Tony | §5.3 |

Nothing goes on the *pending confirmation* list: each item was asked for by
the client or decided by Tony after the client's review.

---

## 1. Items as written

Items 1–10 are the client's; 11–14 and the note on 6 are Tony's.
The full Vietnamese text is in the `.vi.md` copy.

| # | Topic | What was asked |
|---|---|---|
| 1 | Colour per position | Phụ trách `#666666`, OFF `#ff9749`, ONL `#55c0c9`, KTĐ `#f57bc8`, PC `#56be72`, PV `#fbbc04`, Bếp `#df564a` |
| 2 | Pha chế marks | 1 Trà sữa; 2 Latte (formerly Pha chế Matcha); 3 Trà; 4 Topping (formerly Pha chế Bồn) |
| 3 | Phụ trách marks | T for Trong, N for Ngoài |
| 4 | Warning icon | Change it to a more compact sign |
| 5 | Where the marks go | Show the marks above the staff member's name |
| 6 | Add to a shift | Tell apart "registered but not placed" from "didn't register" instead of the shared "no shift today". Tony's note: today, placing someone in a period they didn't register means opening the panel, selecting the period and saving; expected, the period shows them at once and the panel opens with that period selected. Drop the "no shift today" tag, since using Add already means they didn't register that period |
| 7 | Create and edit staff | The Try-out can't create a new staff member and then try the app as them |
| 8 | Usual positions | Remove the limit of two; keep learning from hours and the Owner's override |
| 9 | Picking a day | Clicking a date in the header opens that day; Day and 3 Days start from the day being viewed, otherwise from Monday as now (3 Days: Monday, Tuesday, Wednesday); navigation and the date picker unchanged |
| 10 | Notes while scheduling | (1) The Owner's own note for the week, only the Owner sees it; (2) a scheduling note per day (for example "A trains B", "C tries Pha chế"), published with the week; the Owner has full control, staff read only |
| 11 | Open and close by marker | With no panel open, a marker opens its panel; with one open, the same marker closes it and another marker switches to its panel; X still closes |
| 12 | Chip arrangement | A staff member registered for several periods but placed in only some keeps a marker in the others, which takes a slot and confuses the Owner. Options: (1) move that marker to the end of the cell, after those not yet placed; (2) the same, folded into "+N", hover lists them and a click shows them as in (1); (3) split the cell into an upper half for those placed and a lower half for those registered and not placed |
| 13 | Panel of a placed marker | The panel should show selected every period the staff member was placed in. Exception asked: opened from CA 5, show only CA 5; raise it if it conflicts |
| 14 | Short-hours warning | Today a staff member with 40 hours or more in the week shows no warning on a short day. Expected: a day below the daily minimum shows the warning on the marker |

---

## 2. Analysis

**Item 1 and the registered marker (D5).** Phụ trách in grey would have
matched the grey fill of a marker registered and not yet placed, so the
Owner couldn't have told the two apart. The registered marker loses its fill
instead.

**Items 4 and 5 (D6–D8).** The client wanted the corner the "!" badge sat in
for the marks, so the warning needed a new form that takes no room on a
24 px marker. Four were drawn: a folded corner, a wavy underline, diagonal
stripes and a small triangle. The folded corner needs square markers and is
about 10 px, the stripes hurt the reading of yellow and pink markers, and the
triangle costs about 16 px of nickname. The wavy underline reads as "something
is wrong", the way a spelling mistake does, and works on the dashed marker
too. The registration time and the marks never meet, since one appears only
before placement and the other only after it.

**Item 6 (D9, D10).** Placing at once is what the Owner expects from Add.
It is an exception to the side panel's single Save, so it applies only to the
placement Add makes. A placement without a position is not allowed after
publication, so there Add keeps opening the panel. On 2026-11-12 Tony found
that a chip left behind after Cancel looked like a bug, so Cancel in the panel
that Add opened takes the placement back. Closing the panel any other way, or
Reset, keeps it, so Add still places at once.

**Item 8 (D11).** With no limit there is nothing left to rank: every position
above the threshold is usual. Keeping a second, wider list for the flag no
longer adds anything, so the flag reads the usual positions. A position worked
heavily long ago and not in the last 12 weeks is now flagged again, which the
Owner can clear by ticking it.

**Item 10 (D15–D17).** The existing **day note** is the staff member's own
note on their registration (FR-S22); the two new notes are named the
**owner's note** and the **schedule note** so the three are never confused.
A schedule note names other staff, so letting staff read it is an exception
to NFR-2; it is limited to staff working that day.

**Item 13 (D19).** The CA 5 exception was dropped: a panel that left the
earlier periods unselected would show the day differently depending on which
marker was clicked. Tony then asked for clicking an unplaced marker to tick
the held periods as well, which exposed that Save wrote the panel's position
into every ticked period. A second review page on 2026-11-12 compared the
panel with a state-driven one in a working mock-up, and Tony chose the
state-driven panel: ticks are the day after Save, Save writes the
difference, the position goes to the context period and the newly ticked
ones (a new period gets none unless chosen), Take off is gone, Reset and
Cancel are separate, leaving with unsaved changes asks, and another marker of
the same person and day changes the context period, which amends D18. Locking
a registration once it is assigned needs no rule in Phase 1, because
registration locks for the whole week before placing opens (ADR 0031).

**Item 14 (D20).** The Try-out showed the short-hours flag (FR-O22, under
five days of 8 hours) in the staff list only, never on a marker. The PRD had
no warning on the marker for a short day, so this is a new rule rather than a
fix.
