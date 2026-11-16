# Staff working a day read its schedule note

The client asked on 2026-11-10 for a note the Owner writes per day while scheduling, such as "A trains B" or "C tries Pha chế", published with the week and readable by staff (FR-O54). Such a note names other staff, and NFR-2 says staff must not see anyone else's schedule. Tony decided that **every staff member holding a published assignment that day** reads that day's note. This is the second deliberate exception to NFR-2, after the Phase 2 Shift Lead roster ([ADR 0024](0024-shift-lead-access-comes-from-the-assignment.md)).

## Considered options

- **Only the staff named in the note.** Keeps NFR-2 intact, but the Owner would have to tag people on every note, and a note about the day as a whole ("short of hands after 17:00") would reach no one.
- **Every staff member.** Simplest, but shows the note to people who aren't working that day and have no reason to read it.

## Consequences

- The read check is the same server-side rule as every other: the requester must hold a published assignment on the note's date. It stops when they no longer hold one that day.
- Publishing the week publishes its notes. An edit after publication is held as a draft until the Owner publishes that note, and staff keep seeing the published text meanwhile. That differs from assignments, whose later changes apply at once (3.5), so the Owner can tidy a note without staff seeing every intermediate version.
- The Owner writes these notes knowing who will read them. The owner's note for the week (FR-O53) is the place for anything staff shouldn't see.
- Writing, editing, deleting and publishing a note are audit-logged (NFR-1).

## Amended on 2026-11-16

[ADR 0032](0032-staff-see-the-published-shop-schedule.md) lets every staff member read the published shop schedule, schedule notes included, while the Owner has it on, and the export prints the notes too. An edit to a note after publication now applies at once, so the separate publish step above is gone. Staff working a day still see its note on My profile.
