# Staff see the published shop schedule

In practice every staff member sees the whole shop's weekly schedule, because the Owner posts it on Zalo and staff arrange swaps among themselves from it. NFR-2 said staff must not see anyone else's schedule. On 2026-11-12 Tony proposed a **shop schedule** screen for staff (FR-S24), the client confirmed it, and on 2026-11-16 Tony chose its form: the **published** week of the whole shop, laid out as the export (FR-O52) with each day's schedule note, read-only, **on by default** and switchable by the Owner. It is the third exception to NFR-2, after the schedule note ([ADR 0030](0030-staff-working-a-day-read-its-schedule-note.md)) and the Phase 2 Shift Lead roster ([ADR 0024](0024-shift-lead-access-comes-from-the-assignment.md)).

## Considered options

- **Keep NFR-2 and rely on the export.** No new exception, but staff only see what the Owner last posted, and every later change needs a new post.
- **Show it without a switch.** Simplest, but leaves the Owner no way back if the shop's practice changes.
- **Names and times only.** Less information, but staff need the positions to agree a swap that keeps the shop covered.

## Consequences

- The server lets any active staff member read published assignments and published schedule notes for the shop schedule's weeks while the setting is on, and refuses those reads while it is off. Pay, availability, custom times asked for, day notes, lateness, the owner's note and draft assignments stay private (NFR-2).
- The schedule note is now read by every staff member, not only those working that day, so the export prints it too and an edit after publication applies at once ([ADR 0030](0030-staff-working-a-day-read-its-schedule-note.md), amended).
- Swaps are still agreed on Zalo and recorded by the Owner (3.6). If staff swap without telling the Owner, the shop schedule shows the old arrangement until the Owner records the change.
- Turning the setting on or off is audit-logged (NFR-1).
