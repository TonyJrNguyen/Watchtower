# Watchtower — shift scheduling & people management

The single source of truth for requirements is:
**`docs/prd/shift-scheduling-solution-requirements.md`**

Read that file before coding any feature. If a behaviour is unclear in the
PRD, check `docs/decisions/pending-confirmation.md`. If the rule is listed
there, the client has not signed it off yet, so make it **configurable**
instead of hardcoding it.

## Phase 1 scope (in build)

Build only these four groups. Do not touch anything in Phase 2/3 unless
explicitly asked. See PRD §4.13 for the exact boundaries.

1. Account Management (FR-A1–FR-A10)
2. Availability Registration, whole-period, window Thursday 00:00 – Saturday 15:00 (FR-S1–FR-S19)
3. Shift Assignment: draft/publish, publish gate, early departure, swap (FR-O1–FR-O41, except FR-O34–FR-O37, which are Phase 2)
4. Manual lateness recording and every rule computed from it: 10-minute grace, late penalty from minute 11, double pay deduction from minute 16, anomaly when the deduction ≥ the shift (FR-O24–FR-O26, FR-S9, FR-S17, FR-S18, FR-T18, FR-B1, FR-B17)

**Not built in Phase 1:** notifications/push (§4.8, all of FR-N*), the control
centre (FR-O34–FR-O37), weekly payroll close + bonus engine + performance
dashboard (§3.9–3.13, FR-C*, FR-B1–FR-B16 except FR-B17, FR-P*). The automated
time clock (§4.4, all of FR-T* except FR-T18) is Phase 3, waiting on decision
G51.

**Built in Phase 1** (unlike the original narrowed scope): full two-way
responsive support for both the Owner and Staff (NFR-5). See
`prototypes/phase1-demo.html` for the mobile layout of each screen (the weekly
calendar shown one day at a time, the side panel as a bottom sheet, coverage
cards per shift and a card per staff member for "Who registered" (FR-O41),
cards for the staff list and the audit log).

Since v1.4, Availability and Scheduling are **one weekly calendar screen**
(FR-O10, FR-O42–FR-O44): see who registered → place people → assign positions,
all before publishing. Colour means **position**; staff are told apart by a
unique **Nickname** (Biệt danh, FR-A11). Nicknames appear only on the calendar
or wherever a compact representation is needed; wherever the full name fits,
show only the full name, without the nickname. When the client says "role"
they mean *position (vị trí)*. In code always use position; "role" is reserved
for access control.

## Rules that apply to every screen

- Bilingual VI/EN, chosen per user (NFR-7). No hardcoded strings
- Time zone **Asia/Ho_Chi_Minh (UTC+7)**, fixed for v1, while timestamps are
  stored with their time zone so it can change later without a data migration
  (NFR-11)
- Money is always VND, with no fractional units
- Read access must be enforced **server-side**, not just hidden in the UI
  (NFR-2). Staff must not see another person's schedule or pay, even by
  calling the API directly
- Every Create/Update/Delete must write an audit log entry: actor, timestamp,
  old/new values, reason if given (NFR-1). Because the system has no approval
  workflow, this log is the only evidence of why a change happened

## UI behaviour reference

`prototypes/phase1-demo.html` is the interactive demo approved with the client
for the Phase 1 screens (PRD §5.3 treats it as the reference, replacing
Wireframe v1 for these screens). When the demo and the PRD conflict, the PRD
wins. The demo only illustrates behaviour, and some of its rules are still
*proposed pending confirmation* (see the decisions file above).

## PRD update process

The PRD is discussed and agreed in a chat with Claude (claude.ai), not here.
After each agreed change, the patch is pasted here and applied by hand or with
Claude Code, then committed. See `docs/prd/CHANGELOG.md`.
