# Flag, don't block

Exceptions to the normal schedule are arranged on Zalo all the time, so the system warns instead of refusing in the following cases:

- registering fewer than 8 hours in a day or fewer than 5 days in a week
- assigning someone outside their registered availability
- assigning someone to a position they have no experience in (FR-O32)

Blocking would only push staff into registering nothing, and the Administrator into working around the tool.

The only hard blocks are where the data would be impossible or the week incomplete:

- a staff member's own registrations overlapping each other
- the publish gate
- two assignments for one person at the same time (FR-O39, proposed)
- a departure of more than 30 minutes saved without a cover (FR-O20, proposed)
- giving Phụ trách to someone whose shift-lead switch is off (FR-O51), because it's a responsibility the Owner grants and it carries the lead rate ([ADR 0021](0021-rates-are-per-person-and-the-shift-lead-is-granted.md))

## Consequences

Before adding a new validation, decide which list it belongs in. The default is a flag.

Since v1.10 the experience flag can clear itself: once a staff member passes the experience threshold in a position, its old flags disappear ([ADR 0022](0022-usual-positions-are-learned-from-the-schedule.md)). That is intended, since the Owner placing someone there repeatedly is the evidence.
