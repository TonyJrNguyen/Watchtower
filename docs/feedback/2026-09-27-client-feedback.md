# Client feedback — 2026-09-27 (after the day roster demo, PRD v1.3)

> Vietnamese version: [`2026-09-27-client-feedback.vi.md`](2026-09-27-client-feedback.vi.md).
> This English file is the main copy. When one changes, update the other to
> match. Position names are given in English, with the Vietnamese UI
> name in parentheses on first use (see PRD §3.3).

Status: **fully decided (2026-09-28) and applied** to PRD v1.4 and the Phase 1 demo, see section 0. Sections 1–2 below are the original analysis of 2026-09-27,
kept for traceability. Where sections 1–2 differ from section 0, section 0 applies.

---

## 0. Decisions of 2026-09-28

### 0.1 Decided

| # | Question (section 2) | Decision |
|---|---|---|
| A1 | Assignments without a position | **There is no conflict.** "Overall scheduling" means placing *people* so each shift has enough of them first, and only then assigning positions. Both steps happen **before publishing**. So while in draft, an assignment may have no position; at publishing, every assignment must have one. During the place-people step, coverage counts the **total number of people per shift**. |
| A2 | Is "assign positions later" a lock? | **It is an order of work before publishing, not a lock.** Every shift created *after publishing* (a replacement under FR-O20, a swap under FR-O15, a new shift) is published immediately (FR-O31), so it must have a position from the moment it is created. |
| A3 | Joining neighbouring shifts | **Agreed.** Neighbouring shifts of the same person on the same day join into one assignment. The anomaly threshold is computed on the whole joined assignment. Example: 60 minutes late on an 11:00–15:00 shift, so **deducting pay is correct**. |
| A4 | Different positions across neighbouring shifts | **Agreed.** The system automatically splits into several assignments when the positions differ. |
| B1 | Level for headcount, rate and qualification | **Parent level only.** Sub-positions and attributes are descriptive only and do not affect headcount, rate, qualification or the FR-O32 flag. |
| B2 | QC | QC is **checking drink quality after preparation**, which is different from Order Check (Kiểm tra đơn). |
| B3 | "Bưng bàn" (Table running) | It is an **attribute** of Server (Phục vụ), not a sub-position. |
| B4 | "Bồn" | The barista who keeps the washing station. **The client will rename it to something more suitable.** |
| C5 | Tag display | Format **"Parent position - Sub-position/attribute"**. Examples: `Barista - Matcha` (`Pha chế - Matcha`), `Server` (serving only), `Server - Table running`. **Colour by parent position.** |
| D1 | Duplicate names | Add a **Nickname** (Biệt danh) field to the staff profile. Must be unique among active staff. Defaults to the given name + the first letter of the family name, e.g. "Mai N". |
| E1 | Icon density | **Always show who registered for which shift for the whole week**, never collapsed into a number. All 40 people rarely register for the same shift, so the cell grows with the number of people. |
| E2 | Hover on phones | **Do it like Google Calendar.** Desktop: hover to expand the name. Phone: tapping the icon opens the details (full name, position, actions). |
| F1 | Day roster (FR-O41) | **Keep it** as a separate section below the calendar. |
| F2 | Scheduling while registration is still open | **Agreed.** Scheduling is only allowed after the lock. While registration is open, the merged screen is view only. |
| G1 | Terminology | **Agreed.** The PRD and code use *position (vị trí)*. "Role" is used only for access control. |

| R1 | Cashier Online/In-store | **They are 2 entirely different parent positions**, each with its own headcount and default rate. The earlier decision in PRD §3.3 stands; nothing is reversed. |
| R2 | Sub-positions | **Optional, multiple allowed.** Examples: `Barista` (no area chosen), `Barista - Matcha, Tea`. |
| R3 | Unregistered people shown in every cell | **Still shown** (dashed icon). **No show/hide button**, because the staff filter already exists. |
| A5 | "Select several shifts" in the side panel | **Within one day.** The side panel does not create shifts across several days. |
| B4 | The name "Bồn" | **Keep "Bồn" for now.** A later rename only changes the label and does not affect data. |

**Position catalogue after the decision**: 7 parent positions, matching 7 colours. The coverage table has 7 columns:

| Parent position (holds headcount, rate, qualification) | Sub-positions | Attributes |
|---|---|---|
| QC *(new)* | Inside (Trong), Outside (Ngoài) | — |
| Cashier – Online (Thu Ngân – Online) | — | — |
| Cashier – In-store (Thu Ngân – Offline) | — | — |
| Barista (Pha chế) | Milk tea (Trà sữa), Matcha, Tea (Trà), Bồn | — |
| Server (Phục vụ) | — | Table running (Bưng bàn) |
| Order Check (Kiểm tra đơn) | — | — |
| Kitchen (Bếp) | — | — |

Sub-positions and attributes are optional and multiple are allowed. The display label has the form
`Parent - Sub-position/attribute`, e.g. `Barista - Matcha, Tea`.

### 0.2 Proposals not yet put to the client (built as proposed, not blocking the build)

- **Staff see sub-positions in "My Schedule":** yes, using the same label format.
  Staff only see their own shifts (NFR-2).
- **Existing data:** Cashier is unchanged. The old "Pha Chế" maps to `Barista`, with no sub-position.
  There is no real data yet, so this only affects the demo's sample data.

---

## 1. Original feedback, summarised

### 1.1 New position catalogue (with sub-positions)

| Parent position | Sub-positions | Compared with PRD v1.3 (§3.3, 6 positions) |
|---|---|---|
| QC | Inside (Trong), Outside (Ngoài) | **Entirely new** |
| Cashier | In-store, Online | Already exists, but as 2 peer positions with no parent |
| Barista | Milk tea, Matcha, Tea, Bồn | "Pha Chế" already exists, now split into 4 areas |
| Server | adds a "table running" option | "Phục Vụ" already exists; unclear whether "table running" is a sub-position or an extra flag |
| Order Check | — | Unchanged |
| Kitchen | — | Unchanged |

Counting sub-positions, there are about 12–13 assignable positions, instead of the current 6.

### 1.2 Merging the Availability and Scheduling screens

The client wants to work in 3 steps:

1. **See the overall schedule**: see which shifts and days each staff member registered for (totals still shown).
2. **Overall scheduling**: choose *people* for each shift, **without assigning positions yet**, weighing skills,
   availability, suitability and how evenly shifts are spread across staff.
3. **Assign positions**: on the same calendar interface, after step 2.

UI requirements:

- Each staff member is a small round icon in the shift cell, like the demo shows when filtering
  "Available all week". On hover, the icon stretches into a bar showing the full name (animated).
- **Colour shows the position**, not a tag. Tags must be shown on the calendar some other way.
- Positions are assigned in a **left/right side panel** (based on the current "Add shift" popup) so the
  calendar stays visible while assigning.
- Flow: click a staff icon in a shift → the side panel opens → select **several shifts** and a position.
  One staff member can hold several positions across several shifts. Once assigned, the icon takes the position's colour.

### 1.3 Duplicate names

When two staff members share a name, their small icons are identical. A way to tell them apart is needed.

---

## 2. Conflicts and logic errors

Severity: 🔴 blocking, must be decided before building · 🟠 affects rules or data · 🟡 UI/UX, solvable during design.

### A. Assignments "without a position" (step 2) versus the data model

**A1 🔴 The PRD requires each assignment to have at least 1 position, one of them primary.**
FR-O29 and the Data model §4.10 say so. Step 2 creates a kind of assignment
without a position, so a new state is needed. These rules depend on the position and would be affected:

- **Pay (FR-C13):** staff without their own rate take the default rate of the primary position.
  An assignment without a position *cannot be priced*.
- **Coverage (FR-O4, FR-O30, FR-O38):** currently counted per position. An assignment without a position
  counts nowhere, so in step 2 the coverage table would report a shortage in every cell.
- **Outside-qualification flag (FR-O32):** cannot be evaluated without a position.

→ Proposal: allow an assignment without a position while it is a **draft**, and add a condition
to the publish gate (FR-O33): **publishing is blocked while any assignment has no position**.
In step 2, coverage counts the *total number of people per shift*. The demo already has `totalNeed`.

**A2 🔴 Is "MUST assign positions after seeing the overall picture" a procedure or a system lock?**
If the system locks (no assigning positions until step 2 is done), a new week state is needed,
e.g. "people placed", and when that counts as done must be defined. A hard lock
would also break the flows that need an assignment with a position immediately:

- A replacement for someone leaving early (FR-O20) must have a position and times at once.
- A shift created after publishing is published immediately (FR-O31), so its position cannot be empty.
- Shift swaps (FR-O15).

→ Proposal: this is an **order in the UI**, not a lock. Only lock at the publish gate (A1).

**A3 🟠 One assignment per shift, or neighbouring shifts joined into one assignment?**
The new flow is clicking an icon in a **shift cell** (CA 1…CA 5), but the PRD defines an assignment as
a *free-form time range* (§3.3, §3.5). If each shift period is a separate assignment, there are two
consequences for the rules:

- **The anomaly threshold (FR-S18)** is computed on the length of the *assignment*. Example: a staff member works
  CA 2 + CA 3 (11:00–15:00) and arrives at 12:00, i.e. 60 minutes late, so the deduction is 120 minutes.
  - Stored as *one* 4-hour assignment: 120 < 240 minutes, so **120 minutes of pay are deducted and a late penalty is recorded**.
  - Stored as CA 2 (2 hours) and CA 3 separately: 120 ≥ 120 minutes, so it becomes an **anomaly**, with no
    pay deduction and the bonus left *pending*.

  **The same working session gives different pay and bonus results depending on how it is stored.**
- **Lateness recording (FR-O24)** is per assignment. If split, the Owner has to
  know to record it against the first shift.

→ Proposal: **neighbouring shifts of the same person on the same day join into one assignment**.
Free-form times (e.g. 16:00–23:00) can still be edited in the side panel.

**A4 🟠 "Several positions across several shifts" can produce an assignment that changes position partway through.**
Example: someone works CA 1 as Barista and CA 2 as Cashier. If joined under A3, the
07:00–13:00 assignment would have to split at 11:00. FR-O29 only allows several positions *at the same time*
within a shift, not positions that change by the hour.
→ Proposal: choosing different positions for neighbouring shifts makes the system automatically split them into
several assignments. With the same position, they are joined.

**A5 🟡 "Select several shifts": within one day or across the week?**
If several days can be selected, the side panel becomes a bulk-creation tool. Each assignment
created must still pass the overlap check (FR-O39) and the outside-availability flag (FR-O12),
and must write its own audit log entry (NFR-1).

### B. The new position catalogue

**B1 🔴 Are headcount, rate and qualification held at parent or sub-position level?**
Three places need a level chosen:

- **Staffing need (FR-O1):** "need 2 Baristas" or "need 1 Milk tea + 1 Matcha"?
- **Default rate (FR-O40):** does Matcha pay differently from Milk tea?
- **Qualification (FR-A1):** record "can do Barista" or "can do Matcha"?

At sub-position level, the coverage table goes from 6 to about 13 columns, and the staffing-need table
grows to match: 7 days × 5 shifts × 13 = 455 cells.
→ Proposal: qualification and rate at **parent level**, with sub-positions inheriting the parent's
rate. Headcount allowed at both levels.

**B2 🟠 How does QC differ from Order Check?** The feedback lists them as two separate items, but the names
are easy to confuse. The client needs to describe the work of each position.

**B3 🟠 "Server: add a table running option".** Unclear whether this is a sub-position, i.e. Server
has a "Table running" child and may have others, or an attribute of the shift, like "Server with
table running". If it is a sub-position, must Server always have one chosen?

**B4 🟠 What is "Bồn"?** Is it the glass-washing/sink area? If so, it is a side task
of the Barista, not a drink station, and it may affect pay.

**B5 🟡 The position table is currently "fixed in code" (FR-O28), and the PRD records the 6 positions as settled (§5 Resolved).**
That does not prevent the change; it only needs a deploy. But the old decision must move to
§5.0 *Superseded*, and §3.3, FR-C2 and the Data model must be amended (`Position` gains a `parent` field).
The existing "Pha Chế" data must be mapped to the new positions.

### C. Colour = position

**C1 🔴 Colour currently distinguishes *staff members*, not positions.**
In the demo each staff member has their own colour (`hsl(i×137.5°)`), and FR-O11 requires "each
staff member's availability visually distinguishable". Moving colour to positions
**leaves only the initials to tell people apart**. That is exactly the duplicate-name problem in section 1.3,
so C1 and D1 must be solved together. FR-O11 must also be rewritten.

**C2 🟠 What colour is an icon before a position is assigned?** In steps 1 and 2 there is no position yet,
so a set of states that does not use position colours is needed, for example:

| State | Suggested display |
|---|---|
| Registered for the shift, not yet placed | Outline, white fill |
| Not registered, counted as available (FR-S19, FR-O23) | Dashed outline (used in the demo) |
| Placed, no position yet | Solid grey fill |
| Placed, with a position | Position colour fill |
| Placed but outside availability (FR-O12) | With a warning mark |

**C3 🟠 About 13 sub-positions cannot be told apart by colour.** The human eye reliably separates
only about 6–8 categorical colours, and fewer for colour-blind people.
→ Proposal: **colour by parent position** (6–7 colours), with sub-positions shown as a symbol or
small text on the icon. Colour must never be the only signal.

**C4 🟠 What colour for one person holding several positions in a shift (FR-O29, FR-O30)?**
Either the primary position's colour with a "dual role" (kiêm) mark, or a split-colour icon.

**C5 🟠 Which "tags"?** The demo has the tags *Available all week*, *Short of hours*, *Not registered*,
*dual role* (kiêm), and the outside-availability/outside-qualification flags. The client needs to say which tags must
appear on the calendar and how (outline, corner dot, or icon).

### D. Duplicate names

**D1 🔴 The initials already collide even without duplicate names.** The demo takes the first 2
letters of the given name (`given.slice(0,2)`). With 40 sample names, even though no given names repeat,
3 people already come out as "Th" and 2 each as "Tr", "Nh", "Kh". Vietnamese names cluster around
a few common given names (Anh, Linh, Trang, Huy…), so real collisions will be even more frequent.
→ Proposal: add a **short display name** field to the staff profile (FR-A1). The Owner sets it,
the system **requires it to be unique** among active staff, and suggests by default the given name +
the first letter of the family name (e.g. "Mai N", "Mai T"). The icon must widen into a pill
to fit 3–4 characters. Hover or tap still shows the full name.

### E. Density and mobile

**E1 🔴 About 40 icons per cell is unreadable.** The demo only shows icons when ≤ 9 people are selected
(≤ 16 on mobile). The client saw icons when filtering "Available all week" because that filter left only 2 people.
If everyone is shown, one shift cell could hold more than 25 icons, because the 6 unregistered people
are counted as available in *every* cell (FR-S19).
→ To decide: are unregistered people shown in each cell, or grouped into one line
"+6 not registered"? What happens when it gets crowded: collapse into "+N", let the cell grow, or
show only people not yet placed?

**E2 🔴 Phones have no hover, and NFR-5 requires every function to work on phone.**
On phone, does tapping an icon *show the name* or *open the side panel*? One tap cannot
do both.
→ Proposal: the first tap expands the name, the second tap (or a button on the name bar) opens the
panel. Also, the stretched name bar will cover the neighbouring icons in a crowded cell.

**E3 🟠 An "assign while viewing" side panel does not work on a 390px-wide phone.** On phone,
the panel becomes a bottom sheet covering most of the calendar. Either accept this, or design a
half-screen bottom sheet.

### F. Merging the two screens, and "we only just built that yesterday"

**F1 🟠 The day roster (FR-O41) was only added in v1.3 (2026-09-27) at the Owner's request.**
This feedback replaces it with an icon-based weekly calendar. It must be decided whether FR-O41 is **dropped**, **kept as
a per-day view**, or **kept as the mobile layout**. The roster already has what step 2
needs: groups of registered / not registered / unavailable people, a column of placed shifts, and sorting
by hours, which is useful for "balancing shifts".

**F2 🟠 Availability is open while the registration window is open, but scheduling only starts after the lock (§3.5.1).**
Merging the two screens means deciding: while registration is open, is this screen view only, or can
early draft scheduling happen? If early scheduling is allowed, a staff member could withdraw a registration after being placed. That
assignment would silently become "outside availability". Proposal: **only allow scheduling after the lock**, as the PRD says.

**F3 🟡 "Balancing shifts" needs figures.** To balance while scheduling, each person needs to show
the number of shifts and hours already placed in the week. The demo currently only shows the number *registered*. This is
display information, not a new rule.

**F4 🟡 Is choosing staff to compare (FR-O11) still kept?** If the calendar always shows
everyone, the checkbox filter is only used for narrowing. FR-O11 needs rewriting.

### G. Terminology

**G1 🟡 The client says "role", the PRD says "position".** PRD §3.3 deliberately separates *position* (the job
on a shift) from *role* (Superadmin / Administrator / Staff, i.e. access rights). The PRD
and code should keep the word **position (vị trí)**, and the Vietnamese UI can say "vị trí".
That avoids mixing it up with access control.

---

## 3. Open questions

None. Every question of 2026-09-27 was answered in section 0.1.

## 4. PRD sections to amend once decided (v1.4)

- **§3.3:** the position table becomes 7 parent positions (adding QC) + sub-positions + attributes.
  Keep the sentence that Cashier Online/In-store are two separate positions. Add Nickname.
- **§3.5:** the 3-step flow — see the overall schedule, place people, then assign positions — all before publishing.
  The Availability and Scheduling screens merge into one, with scheduling only after the lock.
- **FR-A1:** add the unique Nickname field. Qualification held at parent level.
- **FR-O1, FR-O4, FR-O30, FR-O38:** headcount by parent position. During the place-people step, coverage counts the total number of people per shift.
- **FR-O10, FR-O11:** the weekly calendar always shows each person's icon. Colour by parent position, label
  "Parent - Sub-position/attribute". Google Calendar-style interaction. Assignment through the side panel.
- **FR-O29:** draft assignments may have no position. Assignments created after publishing
  must have a position. Each assignment may have sub-positions/attributes. Neighbouring shifts with the same
  position join; with different positions they split (A3, A4).
- **FR-O31, FR-O33:** the publish gate blocks while any assignment has no position.
- **FR-O40, FR-C2, FR-C13:** default rate by parent position.
- **FR-O41:** the roster is kept, as a section below the calendar.
- **§4.10:** `Position` gains sub-positions and attributes. Add `Staff.nickname`. `Assignment.positions` may be empty while in draft.
- **FR-O30:** an assignment with several sub-positions of the same parent position does **not** count as
  "dual role" (kiêm), because headcount is held at parent level only.
- **§5:** the old 6-position catalogue moves to §5.0 *Superseded*, replaced by the 7-parent-position catalogue.
- **§5.3:** record the demo.

Every decision in section 0.1 was confirmed by the client (2026-09-28), so **none** goes on the
*pending confirmation* list. Only the two proposals in section 0.2 will be marked *proposed pending client confirmation*.
