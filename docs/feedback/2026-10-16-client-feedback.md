# Client feedback — 2026-10-16 and 2026-10-17 (shift lead, pay, positions; PRD v1.9)

> Vietnamese version: [`2026-10-16-client-feedback.vi.md`](2026-10-16-client-feedback.vi.md).
> This English file is the main copy. When one changes, update the other to
> match. "Role" in the client's wording means *position* (PRD §3.3).

Status: **decided 2026-10-17 and applied** to PRD v1.10 and the Phase 1 wireframe, except the items in 0.6. Section 0 holds the decisions; section 1 summarises what the client asked for, kept for traceability. Where they differ, section 0 applies.

---

## 0. Decisions

### 0.1 Shift lead (Phụ trách)

| # | Topic | Decision | PRD |
|---|---|---|---|
| L1 | New position | **Phụ trách** (shift lead), an eighth position | §3.3 |
| L2 | Sub-position | **Required**, exactly one of Trong (Inside) or Ngoài (Outside). Both are paid alike | FR-O45 |
| L3 | Who can hold it | Only staff whose **shift-lead switch** the Owner has turned on in their account. This is a block, unlike every other position, which only flags | FR-A13, FR-O51 |
| L4 | Switch turned off | Phụ trách shifts already made stay, flagged "Shift lead turned off, needs another lead", for the Owner to reassign | FR-O51 |
| L5 | Headcount | One need for Phụ trách as a whole per period (2 in the sample), not per Trong or Ngoài | FR-O1 |

### 0.2 Pay

| # | Topic | Decision | PRD |
|---|---|---|---|
| P1 | Rates | Per person: a **base rate** on every account, plus a **lead rate** while the shift-lead switch is on | FR-C2 |
| P2 | Which rate | Hours as Phụ trách at the lead rate; every other position at the base rate | FR-C13 |
| P3 | Lead rate required | Yes, while the switch is on; the staff form refuses to save without it | FR-A13 |
| P4 | Rates per position | **Removed**, with the "Lương theo vị trí" tab. Tony first objected, then agreed | FR-O40 retired |
| P5 | Lateness deduction | Charged at the rate of the shift it falls on: the lead rate on a Phụ trách shift | FR-S17, §3.8.3 |
| P6 | Shift with no position | Needs no pay estimate, because the Owner must give it a position before publishing | FR-C13, FR-O33 |

### 0.3 Positions on a shift

| # | Topic | Decision | PRD |
|---|---|---|---|
| O1 | One position per period | Exactly one position per person in each period (CA 1–CA 5). Different periods of a day may carry different positions | FR-O29 |
| O2 | "Kiêm" (two positions on one shift) | **Removed** everywhere: the two-colour marker, the filter, "kiêm N" in Staffing, the legend | FR-O30 retired |
| O3 | Sub-positions | Still optional and may be combined, except on Phụ trách (exactly one) | FR-O45 |

### 0.4 Usual positions (decided with Tony, confirmed by the client on 2026-10-17)

| # | Topic | Decision | PRD |
|---|---|---|---|
| U1 | Name | "Vị trí thường đảm nhiệm" / *Usual positions* replaces qualified positions and the label "Kinh nghiệm", in the staff screen and the calendar panel | FR-A12 |
| U2 | Learned | At each publication: the **top two** positions by published hours over the last **12 weeks**, counting only positions above **50 hours**. So 0, 1 or 2 per person | FR-A12 |
| U3 | Hours counted | Published assignments only, by clock time: the whole of CA 5 counts 6 h, a shortened shift counts its shortened time, lateness isn't subtracted. Later edits update the totals | FR-A12 |
| U4 | Owner override | Set by hand = **pinned** until removed; at most two, a third is refused with the reason. Removed = counted again from zero, and comes back only after 50 more hours | FR-A12 |
| U5 | Ties | A position already held is kept; otherwise the most recently assigned position wins | FR-A12 |
| U6 | Phụ trách | Never learned: it shows whenever the shift-lead switch is on, beside the two | FR-A12, FR-A13 |
| U7 | Visibility | No marker for learned against hand-set, no notice to the Owner; the audit log records each change with the actor **System** and the reason. Staff don't see the list | FR-A12 |
| U8 | Warning and filter | Read **experienced positions**: more than 50 h over the whole history, or set by hand. A person who regularly works three positions is flagged in none. Flags clear once the threshold is passed | FR-O32, FR-O11 |
| U9 | Other | Positions only, not sub-positions. Deactivated staff aren't recomputed. New staff start with what the Owner ticks; nothing is imported from Zalo | FR-A12 |

### 0.5 Staff screen and My profile

| # | Topic | Decision |
|---|---|---|
| A1 | Staff drawer | ✕ top left, a round » button in the middle of the left edge (hidden on phones), Esc closes, above the wireframe toolbar |
| A2 | Position chips | Can be deselected; hint texts removed |
| A3 | My profile | Pay estimate split into lead hours and base hours |
| A4 | Positions worked (Vị trí đã làm) | The Owner sees each position's hours on the chips in the staff account; the staff member sees every position they have worked, with hours, on their own page, in a section directly below the pay estimate. Shifts that have ended, whole history, never reset (FR-A14) |
| A5 | Rename | "Ca của tôi" / My shifts becomes **"Hồ sơ của tôi" / My profile**, since it holds the staff member's personal data (FR-A14) |

### 0.6 Still open (wireframe only, no PRD effect)

- Approval of the Oct 16–17 wireframe as a whole.
- The side panel sits beside the calendar from 1280 px; narrower, it's a bottom sheet.
- Bếp recoloured brown so it doesn't clash with gold Phụ trách (the client saw it yellow before).
- Whether lead markers come first in each period cell (would change the Oct 10 order rule). Default: no.

---

## 1. What was asked for (summary)

Relayed by Tony in chat on 2026-10-16 and 2026-10-17; the original messages aren't in the repo.

**Client:** a Phụ trách position split into Trong and Ngoài, paid at its own rate; pay set per person instead of per position, without the per-position rate tab; only staff the Owner allows can be placed as Phụ trách; one job per person per period, no "kiêm".

**Tony's review of the wireframe:** the staff drawer's close controls, deselectable chips, the label "Vị trí thường đảm nhiệm" on the staff screen, one Phụ trách row in Staffing with no headcount per Trong or Ngoài, and the lead/base split of the pay estimate.

**Follow-up with Tony:** usual positions should fill themselves from how the Owner actually schedules people, at most two plus Phụ trách, with the Owner able to override. Later the same day: show hours worked per position to the Owner and to each staff member, and rename the staff page.
