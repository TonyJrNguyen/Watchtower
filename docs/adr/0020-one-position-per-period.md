# One position per person per shift period

In each shift period a staff member holds **exactly one** position (FR-O29). They may hold different positions in different periods of the same day, for example Phụ trách from 07:00 to 15:00 and then Pha chế until 17:00. Each unbroken run of the same position is one assignment, and a change of position splits it, as before ([ADR 0007](0007-neighbouring-periods-join-into-one-assignment.md)). The client asked for this on 2026-10-17.

Until v1.9 an assignment could carry several positions, the first being primary. It counted toward each position's headcount and was marked **shared** (FR-O30). That model is gone.

## Consequences

- Coverage per position is a plain count of people. There is no shared marker, no "covering two positions" filter and no two-colour marker.
- No position is primary. Pay reads the one position the assignment carries ([ADR 0021](0021-rates-are-per-person-and-the-shift-lead-is-granted.md)).
- FR-O30 is retired. FR-O29 keeps the draft rule: an assignment may have no position until the week is published.
