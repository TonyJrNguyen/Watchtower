# Rules proposed pending client confirmation

> English version of [`pending-confirmation.md`](pending-confirmation.md). The
> Vietnamese original is the copy in force. When one changes, update the other
> to match.

The eight rules below were decided while building the Phase 1 demo and are
**not** in the original PRD the client approved. Each rule has been written
into the PRD (marked *proposed pending client confirmation* in the relevant
requirement table) and is listed again here as the sign-off list (§5.1,
item O3).

When implementing, treat these items as **configurable / changeable**, not
hardcoded, because the client may adjust them at sign-off.

| ID | Rule | Why it is uncertain | Impact if changed |
|---|---|---|---|
| FR-O38 | An assignment counts as "filling" a shift period only if it covers the whole period; partial coverage is counted separately | The PRD only says an assignment is a free-form time range, not how coverage is counted | Changes how coverage figures are computed (FR-O4) |
| FR-O39 | Hard block: a staff member cannot have two overlapping assignments on the same day | The PRD only forbids overlap at *registration* (FR-S2), and says nothing about *assignment* | If dropped, it must become a warning instead of a block |
| FR-O20 (addition) | Leaving more than 30 minutes early can only be saved once a replacement is set | §3.8 describes this as a procedure, without saying whether the system enforces it | If dropped, the Owner can save a shortened shift without a replacement in place |
| FR-T18 (addition) | Classifying as "did not work" means 0 hours for pay and for the 8-hours-per-day count, with no late penalty | The PRD lists "no-show" as an anomaly resolution option but does not say what it changes | Directly affects pay; needs explicit client confirmation |
| FR-B17 | The lateness screen previews the effect on the weekly bonus (view only, not confirmed) | Not in the original PRD; added to make the system easier to understand | No effect on calculations, UI only. One of the two lowest-risk items |
| FR-A7 (addition) | Setting/changing a password is a field in the staff profile, not a separate generate-password button | From the demo feedback on 2026-09-18 | No effect on business logic, UI only |
| FR-O40 | The default rate per position is editable in the app, not fixed in code | The original FR-O28 fixed both the position table and the default rates in code | If dropped, every change to a position rate needs a redeploy |
| FR-O45 (addition) | Staff see sub-positions/attributes in "My Schedule", in the same format, e.g. "Pha chế - Matcha" | The client only confirmed how they are shown to the Owner (2026-09-28), not whether staff see them | Affects the staff-side UI only. Staff only see their own shifts (NFR-2), so there is no data-exposure risk |

**Closing an item:** when the client confirms an item, remove the *proposed
pending client confirmation* marker from the PRD, remove the matching row from
the table above, and record the decision in the Resolved part of PRD §5 (the
same way the earlier G-series items were resolved).
