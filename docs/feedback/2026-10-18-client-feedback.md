# Client feedback — 2026-10-18 (registration cutoff, position colours and order, sub-position marks)

> Vietnamese version: [`2026-10-18-client-feedback.vi.md`](2026-10-18-client-feedback.vi.md).
> This English file is the main copy. When one changes, update the other to
> match. "Role" in the client's wording means *position* (PRD §3.3).

Status: **partly decided.** The client's written items (C1–C5) and the
position catalogue were confirmed and applied to PRD v1.11 on 2026-10-25
(section 0), as was the lateness rule for an agreed late start (T2, D9).
The answers to section 4 followed on 2026-11-01 (section 0.2). Two items
are still open, listed at the end of section 0.2. Sections 1–4 below are the
original analysis and questions, kept for traceability. Where section 0 and sections 1–4 differ, section 0 applies.

---

## 0. Decisions (applied to PRD v1.11)

| # | Topic | Decision | PRD |
|---|---|---|---|
| D1 | Registration close | **Friday 13:00** instead of Saturday 15:00; still opens Thursday 00:00. The Phase 2 reminder defaults move before it: FR-N5 Thursday 20:00, FR-N13 Friday 09:00 (confirmed by Tony on 2026-11-01) | §3.4, FR-S1, FR-O28, FR-N5, FR-N13 |
| D2 | QC | **Not a position.** "QC" was a note for Phụ trách with its two branches, Phụ trách Trong and Phụ trách Ngoài. The name QC is dropped. Confirmed by the client | §3.3 |
| D3 | Kiểm tra đơn | A position of its own; the client's "Kiểm đơn" is Kiểm tra đơn | §3.3 |
| D4 | English label | Phụ trách = **Shift Lead** | §3.3 |
| D5 | Catalogue | Seven positions, in this order: Phụ trách, Thu Ngân – Offline, Thu Ngân – Online, Kiểm tra đơn, Pha chế, Phục vụ, Bếp. Used wherever positions are listed | §3.3, FR-O28, §4.10 |
| D6 | Colours | Phụ trách black, TN Offline `#ff6d01`, TN Online `#46bdc6`, Kiểm tra đơn `#ff00a0`, Pha chế `#34a853`, Phục vụ `#fbbc04`, Bếp `#cc0100`. A state or warning must not be told apart from a position by hue alone | §3.3 |
| D7 | Sub-position marks | A calendar marker shows a short mark for each sub-position or attribute that has one, starting with Pha chế's four and Bưng bàn. The marks themselves were agreed on 2026-11-01, see D11 | §3.3, FR-O42, §4.10 |
| D8 | Grouping inside a cell | Decided on 2026-11-01, see D12 | FR-O49 |
| D9 | Agreed late start (FT-3) | **No grace.** On an assignment placed by custom times that start later than the period (case a), or whose start the Owner moved later as an agreed late arrival on the day (case c), the late penalty and the 2× deduction apply from **minute 1**. Anomaly rule unchanged. Custom times that only end earlier keep the 10-minute grace. Confirmed by the client | §3.8.3, FR-S9, FR-S17, FR-O24, FR-O50, §4.10, ADR 0023 |

### 0.2 Decisions of 2026-11-01 (answers to section 4, applied to PRD v1.11)

Tony answered section 4 on the review page in two rounds; the client
confirmed every answer to section 4.2. "Tony" marks Tony's own decisions
(section 4.1). D8 above is now decided (D12).

| # | Topic | Decision | Source | PRD |
|---|---|---|---|---|
| D10 | Window opens | Thursday 00:00 (question 10) | Client | §3.4 |
| D11 | Marks | Trà sữa TS, Matcha M, Trà T, Bồn B, Bưng bàn BB, Phụ trách Trong Tr and Ngoài Ng; two sub-positions show both ("M·T"); the nickname shortens before a mark (13–15, R7) | Client | §3.3, FR-O42 |
| D12 | Order inside a cell | Markers with a position grouped in the catalogue order, A–Z within a group, a warning doesn't move a marker; markers with no position follow in the old FR-O49 order; a cell with no positions is ordered as before (3, 4, 12, R3, R4) | Client | FR-O49 |
| D13 | Colours and states | Solid fill, as in the spreadsheet (option A). No state by hue: grey marker with a check for registered and not placed, "!" badge for a warning, struck-through nickname for a deactivated holder, labelled Draft/Published badges (1, 2, R2) | Tony | §3.3, FR-O42, FR-O50, FR-O51 |
| D14 | Registration order | Times of first save and last change are recorded; staff ranked by **first** save; an automatic save at the cutoff takes the last edit time; the Owner sees times only: a "T5 08:03" label on the top edge of markers registered and not yet placed (a toolbar switch, on by default), a line in the side panel ("Registered 5th of 38 · first saved … · last changed …"), and the Add list sorted by registration order (5, 6, R5, R6, R13–R16) | Tony | FR-S23, FR-O42, FR-O43, FR-O46 |
| D15 | Audit log | The Phase 1 event list in section 2 (FT-4); a saved registration shows its time only, the full versions stay on the server; draft changes are logged with a "hide draft changes" filter (7, 8) | Tony | NFR-1, §4.9.1 |
| D16 | Schedule export | Phase 1. Published weeks only; week or day; image or PDF; nicknames on position colours with marks and a legend; times only where they differ from the standard period (9, 18–20, R8) | Tony (phase), client (content) | FR-O52, §4.13 |
| D17 | Shift Lead | Phase 2. Whoever holds a published Phụ trách assignment leads its time range; sees everyone whose assignment overlaps it (name, position, times, phone), the same for Trong and Ngoài; records arrivals and early departures of 30 minutes or less; longer departures stay with the Owner; no pay, otherwise an ordinary staff member (9, 21–24, R9, R10) | Client | §3.1, FR-L1–FR-L4, NFR-2, ADR 0024 |
| D18 | Performance evaluation | Phase 2. One place for punctuality, attendance, committed hours and attitude; only the Owner evaluates; the system shows and never suggests; no Shift Lead notes in the system; staff don't see the evaluation but keep their own hours, lateness and bonus; **monthly, still to be confirmed** (25–30, R11, R12) | Client | §3.12, §3.13, FR-P1, FR-P5, FR-P7, FR-S10 |

Still open: a paid tolerance for an agreed late arrival (question 17, PRD
§5.1 O5) and the evaluation period (PRD §5.1 O6).

Sources, kept separate so each item can be traced:

| Code | Source |
|---|---|
| **C1–C5** | The client's written feedback, 2026-10-18 (verbatim in section 5) |
| **T1–T8** | Tony's own notes taken during the feedback session (phone notes) |
| **T9** | Added by Tony in chat on 2026-10-25 |
| **D2–D3** | Clarified by Tony and confirmed by the client, 2026-10-25 |

---

## 1. UI feedback

### UI-1 Position colours (C2)

The client gave one colour per position:

| Position | Client colour | Today (wireframe, approved 2026-10-17) |
|---|---|---|
| Phụ trách | Black | Gold (p8) |
| Thu Ngân – Offline | `#ff6d01` orange | Violet (p2) |
| Thu Ngân – Online | `#46bdc6` teal | Pink (p3) |
| Kiểm tra đơn (the client wrote "Kiểm đơn") | `#ff00a0` magenta | Lime (p6) |
| Pha chế | `#34a853` green | Teal (p4) |
| Phục vụ | `#fbbc04` yellow | Orange (p5) |
| Bếp | `#cc0100` red | Brown (p7) |
| QC | **not in the list**: it was a note for Phụ trách and is removed (D2) | Sky blue (p1) |

These look like Google Sheets' standard colours, so the client most likely
wants the calendar to look like the sheet the team uses today.

Points to settle (section 4): several colours collide with the
status colours the wireframe deliberately kept apart (green = registered /
Published, yellow = Draft, orange dot = warning, red dot = deactivated staff);
and white text is readable only on black and on `#cc0100`.

### UI-2 Position order, and grouping by position (C3, T1)

The client wants positions shown in the order of the colour list: Phụ trách,
TN Offline, TN Online, Kiểm tra đơn, Pha chế, Phục vụ, Bếp. Tony's note "group
the roles together" reads as the same request: markers in a calendar cell
grouped by position.

- **Lists of positions** (legend, Staffing table, Filters, position chips in
  the side panel and staff form): today they follow the PRD table order
  (Phụ trách, QC, TN Offline, TN Online, Pha chế, Phục vụ, Kiểm tra đơn, Bếp).
  Switching to the client's order is a straight change (applied, D5).
- **Markers inside a cell**: this **reverses the 2026-10-10 decision** (FR-O49:
  warnings first, then A–Z, then manually added, inherited down the day,
  "not grouped apart, since colour already shows the position").

### UI-3 Sub-position marks on the calendar marker (C4, C5, T5)

The client wants a mark on the shared calendar for Pha chế's four
sub-positions (Trà sữa, Matcha, Trà, Bồn) and for Phục vụ's Bưng bàn. Today the
marker shows only the nickname, in the position's colour; the
"Position - sub-position" label appears only on hover or tap (FR-O42).

The PRD calls Bưng bàn an *attribute* (extra work alongside Phục vụ), not a
sub-position. The client calls it a sub-role. This changes nothing in the
rules; it only needs a mark like the others.

---

## 2. Feature and rule feedback

### FT-1 Registration closes Friday 13:00 (C1)

Today the window runs **Thursday 00:00 – Saturday 15:00** (§3.4, FR-S1). The
client wants it to close at **Friday 13:00**. At that moment the registration
locks, unsaved drafts are saved automatically (FR-S5), and the Owner can start
placing people, which gives the Owner about a day more to build the week. The
window shrinks from 63 to 37 hours if it still opens on Thursday 00:00.

The window is fixed in configuration for v1 (FR-S1, FR-O28), so this is a
configuration and copy change, not new logic.

### FT-2 Registration timestamp (T9)

Show **when** each staff member registered. After an edit, show the time of
the **latest change** only, not what changed into what.

Today the Owner sees only the last saved registration, with no time on it,
and the audit log design shows no registration entries at all.

### FT-3 Lateness on a shift where the staff member asked to come late (T2)

Lateness is measured from the **assignment's start** (FR-O24, FR-O25).
**Decided (D9):** the staff member already asked to come late and the Owner
agreed, so being later than the agreed start has **no grace**. Three cases:

| Case | Decided | Example |
|---|---|---|
| a. Registered custom times (later start) and placed **by their times** (FR-O50) | Lateness counts from the requested start, **no grace**: late penalty and 2× deduction from minute 1 | Placed 08:00; arrives 08:01 → late penalty, 2′ deduction; 08:20 → 40′ deduction; 09:30 on a 3-hour shift → anomaly |
| b. Registered custom times but placed **by the standard times** | Normal rules from the standard start, 10-minute grace. The placement is the answer, and the staff member sees the real start on My profile | Placed 07:00; arrives 08:00 → 60 minutes late |
| c. Asks on the day, on Zalo, and the Owner agrees | The Owner moves the assignment's start to the agreed time and marks it as an agreed late arrival (same path as early departure, §3.8). Then as case a: **no grace** from the new start. The missed time is unpaid because pay follows assigned hours; the day may drop below 8 h | Moved from 07:00 to 08:00; arrives 08:05 → late penalty, 10′ deduction |

Custom times that only end earlier don't move the start, so the normal grace
applies. Still open: whether an agreed late arrival may have a small paid
tolerance like an early departure of 30 minutes or less (question 17).

### FT-4 Define what the audit log (Nhật ký) records (T3)

NFR-1 says every create, update and delete is logged, but the PRD has no list
of events, and the wireframe shows only samples. Proposed Phase 1 catalogue:

| Group | Events | Actor |
|---|---|---|
| Accounts | Create account; edit profile, nickname, base or lead rate; turn the shift-lead switch on or off; add or remove a usual position by hand; set password; deactivate or reactivate | Owner |
| Usual positions | Add or remove a usual position, with the hours as the reason | System |
| Registration | Staff member saved their registration (time only, see FT-2); auto-saved at the cutoff; window locked | Staff / System |
| Staffing needs | Change a headcount; copy from last week | Owner |
| Scheduling (draft) | Place; give or change a position or sub-position; change times; take off a shift; place outside availability; undo or redo | Owner |
| Publishing | Publish the week; skip a staff member with a reason | Owner |
| After publishing | Change times, reassign, cancel; early departure with cover; swap | Owner |
| Lateness | Record, change or clear an arrival time; resolve an anomaly, with the reason | Owner |

Not logged: sign-ins and page views.

### FT-5 "Đi trễ" screen: nothing recorded means on time? (T4)

**Checked: yes, already.** PRD §3.7.1 item 1 and FR-O24 treat a shift with no
entry as on time. The wireframe's Đi trễ screen says "Không ghi gì là đúng
giờ", shows past shifts with no entry as *Đúng giờ* and future ones as *Chưa
tới giờ*. No change proposed. (Known, accepted limitation: an unrecorded
no-show also counts as on time, §3.7.1.)

### FT-6 Export the whole schedule for the shift leads (T6)

New feature: the Owner exports the week's schedule to send to the shift leads
(on Zalo, presumably). Nothing like it exists in the PRD. Format, content and
phase are open (section 4).

### FT-7 Shift leads manage their own shift (T7)

New feature: a shift lead can manage the schedule and the people of the
shifts they lead. Today a staff member, lead or not, sees **only their own
schedule**, enforced on the server (NFR-2, FR-S4), and only the Owner changes
anything. This needs a new access level, so it is the largest item here.

### FT-8 Performance evaluation (T8)

Tony wants to ask the client more about it. In the PRD it is the performance
dashboard (§3.12, §3.13, FR-P1–FR-P6), which is **Phase 2**. Questions are in
section 4.2.

---

## 3. What changes

Assuming the recommendations in section 4 are accepted. Rows marked **done**
were applied in PRD v1.11; the wireframe and static pages are not updated yet.

| Item | PRD | Other docs | Wireframe and static pages | Phase / size |
|---|---|---|---|---|
| FT-1 Cutoff | §3.4 step 2, FR-S1, FR-O28, FR-N5, FR-N13 · **done** | CLAUDE.md, CONTEXT.md, README, backlog, roadmap · **done** | Availability screens, calendar "registration open" state | Phase 1 · small |
| UI-1 Colours | §3.3 colour column · **done** | — | Position tokens p1–p8 in `design/phase1/src/app.css`, legend, status colours if changed; regenerate the static pages | Phase 1 · small–medium |
| QC removed (D2) | §3.3, §4.10, §5 · **done in v1.11** | CONTEXT.md, ADR 0009, backlog · **done** | Sample data and every QC marker still to change | Phase 1 · small |
| UI-2 Order / grouping | §3.3 table order, FR-O49 rewritten, FR-O42 | CONTEXT.md (ordering), Oct 10 decision noted as superseded | Cell sorting, Staffing, Filters, chips | Phase 1 · medium |
| UI-3 Marks | §3.3, FR-O42, FR-O28, §4.10 · **done**; the marks' wording waits on O4 | CONTEXT.md ("Mark") · **done** | Marker render, legend, hover label | Phase 1 · medium |
| FT-2 Timestamp | FR-O43 (panel), FR-S20 (staff screen), NFR-1 note | — | Side panel, availability screen, audit log | Phase 1 · small |
| FT-3 Agreed late start (D9) | §3.8.3, FR-S9, FR-S17, FR-O24, FR-O50, §4.10 · **done** | CONTEXT.md, ADR 0023 · **done** | Lateness screen (no-grace label), the "agreed late arrival" mark when moving a start, rules popover | Phase 1 · small |
| FT-4 Audit log | NFR-1 expanded into an event list | — | Audit log "Loại" filter | Phase 1 · small |
| FT-6 Export | New FR-O52 | Backlog story, roadmap, CLAUDE.md scope | New export action on the calendar | **Scope change** · medium |
| FT-7 Lead access | §3.1 roles, NFR-2, FR-S4, new FRs, new ADR | CLAUDE.md scope, backlog, roadmap, cost | New lead view | **Phase 2 proposed** · large |
| FT-8 Performance | Nothing until the client answers | — | — | Phase 2 |

Every PRD change goes with a CHANGELOG entry. Decisions that reverse earlier
ones go into §5.0 Superseded Decisions: QC and the Saturday close are there
already; FR-O49's order joins them if the client wants grouping (O5).

---

## 4. Open questions

Each question has a recommendation; **Rec** is what I would do if you agree.

### 4.1 For Tony to decide

1. **Status colours vs the client's colours (UI-1).** Keep the client's
   colours exactly and change the status signals so they stop relying on
   hue? **Rec:** yes. Registered-but-not-placed markers turn neutral grey
   with a check (not green); the warning dot becomes a small "!" badge; the
   deactivated mark becomes a struck-through name; Draft and Published keep
   their text labels.
2. **How the colours are drawn (UI-1).** A: solid fill like the sheet, with
   white text on black and red and dark text on the rest. B: today's style,
   a pale tint fill with the client's colour as the border and dot.
   **Rec:** A, because it matches what the team already reads; show both to
   the client if unsure.
3. **What "group the roles" means (T1).** **Rec:** the same as C3, markers
   grouped by position inside a cell. Confirm, or tell me what you meant.
4. **Order inside a cell once grouped (UI-2).** **Rec:** groups in the
   client's order, then *placed, no position yet*, then *registered, not
   placed*. Inside a group: warnings first, then A–Z by nickname. Before any
   position is given (step 2 of building the week) everyone is in one group,
   so today's FR-O49 order still applies there. The "keep your place down the
   day" rule is dropped, since a person changing position mid-day must move
   group.
5. **Registration timestamp: where and which time (FT-2).** **Rec:** in the
   side panel, one line: "Đăng ký lúc 14:32 T5 16/10", or "Sửa lần cuối lúc
   …" once saved more than once; and "Đã lưu lúc …" on the staff member's own
   screen. Nothing on the marker (no room).
6. **Timestamp of an auto-saved draft (FT-2).** The Owner is not told that a
   draft was saved by the system (FR-S5); a time of exactly 13:00 would give
   it away. **Rec:** show the time of the staff member's last edit to that
   draft, which is "the latest change" anyway.
7. **Registration entries in the audit log (FT-2, FT-4).** NFR-1 wants old
   and new values. **Rec:** keep the full saved version on the server (it
   settles disputes) but show only "Saved registration · time" in Nhật ký,
   as you asked.
8. **Draft scheduling in the audit log (FT-4).** Logging every placement
   while the week is a draft makes the log long. **Rec:** log it (FR-O48
   already requires undo/redo to be logged) and add a "Hide draft changes"
   filter.
9. **Phase of export and lead access (FT-6, FT-7).** **Rec:** export in
   Phase 1 as a scope addition, since it also covers the leads' immediate need
   to see the schedule; lead access in Phase 2. Both need your call on scope
   and cost.

### 4.2 To ask the client

**Registration (FT-1)**

10. Does the window still open on **Thursday 00:00**? (Assumed yes in PRD
    v1.11, since the client changed only the close; confirm.)

**Colours, order and marks (UI-1 to UI-3)**

11. ~~Which position is missing from the colour list?~~ **Answered (D2, D3):**
    QC was a note for Phụ trách and is removed; "Kiểm đơn" is Kiểm tra đơn.
12. Do you want the people in each shift **grouped by position** in that
    order on the calendar, or only the order used in lists and the legend?
13. Does the team **already use marks** for the sub-positions in the current
    sheet? If not, proposed: Trà sữa **TS**, Matcha **M**, Trà **T**, Bồn
    **B**, Bưng bàn **BB**.
14. Also mark **Phụ trách Trong / Ngoài**? (Rec: yes, since every Phụ trách
    shift has one.)
15. When a barista covers two stations ("Pha chế - Matcha, Trà"), show both
    marks ("M·T")? (Rec: yes; on a narrow week view the nickname shortens
    first, the marks never.)

**Agreed late arrival (FT-3)**

16. ~~Is the missed time unpaid?~~ **Answered (D9):** the Owner moves the
    shift's start, so pay and the 8-hour day follow the new hours, and there is
    no grace from the new start.
17. Is there a small tolerance like early departure's "30 minutes or less, at
    your discretion, paid in full"? Or is every agreed late start a shift
    change?

**Export (FT-6)**

18. **Format:** an image or PDF to send on Zalo, an Excel/Google Sheet file,
    or a printout? (Rec: image/PDF first.)
19. **Content:** the whole week or one day? Full names or nicknames?
    Positions, sub-position marks and times? In colour?
20. Only once the week is **published**, or also while it is a draft (marked
    "Nháp")? (Rec: published only.)

**Shift leads (FT-7)**

21. **Who counts as a lead:** anyone with the shift-lead switch on, or only
    while they are on a Phụ trách shift that day?
22. **Which shifts:** only the periods they lead, the whole day, or the whole
    week?
23. **What can they do:** see the roster (names, positions, times, phone)?
    Record arrival times? Record an early departure and its cover? Swap or
    move people between positions? Add or remove people? Edit the schedule
    before it is published?
24. They must not see pay, other weeks' registrations or anything outside
    their shifts. Correct?

**Performance evaluation (FT-8)**

25. **What do you judge staff on:** punctuality, attendance, hours,
    skill per position, attitude, feedback from shift leads, customer
    feedback, sales?
26. **Who evaluates:** only you, or should shift leads rate the people on
    their shifts?
27. **How often:** weekly, monthly, quarterly?
28. **What follows from it:** a raise in base rate, the shift-lead switch, a
    bonus, warnings?
29. Should staff see **their own** evaluation?
30. Anything you want recorded **from now on** (for example a lead's note
    on a shift), so the data exists when this is built?

---

## 5. What was asked for (verbatim)

**Client, 2026-10-18:**

> 1. Thời gian đóng lịch đăng ký ca: 13:00 Thứ 6
> 2. Code màu các vị trí:
>    - Phụ trách: Màu đen
>    - TN offline: #ff6d01
>    - TN online: #46bdc6
>    - Kiểm đơn: #ff00a0
>    - Pha chế: #34a853
>    - Phục vụ: #fbbc04
>    - Bếp: #cc0100
> 3. Thứ tự vị trí hiển thị trong lịch: tương tự như thứ tự trên mã màu
> 4. Pha chế có 4 sub role: Trà sữa, Matcha, Trà, Bồn cần được bổ sung ký hiệu trên lịch chung
> 5. Phục vụ cũng có sub role là Bưng bàn cần được bổ sung ký hiệu trên lịch chung

**Tony's notes:**

> - T1 Group các role lại với nhau
> - T2 Rule tính đi trễ của các ca xin đi trễ
> - T3 Define những gì được ghi trong Nhật Ký
> - T4 Check lại xem rule trong screen Đi trễ - không ghi gì có mặc định đi đúng giờ không
> - T5 Tìm cách làm sao để hiển thị các role con ngay trên chip trên calendar
> - T6 Thêm tính năng export lịch làm tổng để chủ có thể gửi cho các bạn phụ trách
> - T7 Thêm tính năng cho Lead shift có thể manage lịch làm, nhân sự của ca làm mà Lead shift phụ trách
> - T8 Hỏi thêm về các tính năng liên quan tới performance evaluation

**Tony, in chat (2026-10-25):**

> - T9 Thêm 1 cái timestamp đứa nào đăng ký vào lúc nào → Edit thì hiện time of the latest changes, không show đã thay đổi cái gì thành cái gì
