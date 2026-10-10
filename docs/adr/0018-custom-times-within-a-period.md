# Staff may set custom times inside a registered period

Staff still register whole shift periods, but on any registered period they may set custom times — a later start, an earlier end, or both — that stay inside that period (FR-S21). The client's cases are arriving late and leaving early, so nothing needs to reach past a period's own boundaries. This amends [ADR 0003](0003-whole-period-registration-arbitrary-assignment.md), which allowed no adjustment at all.

A custom-times period is a request. The Administrator answers it by placing the staff member by the requested times or by the standard period; there is no approval state, in line with [ADR 0001](0001-record-decisions-not-negotiate-them.md) (FR-O50).

## Consequences

- Custom times can never overlap a neighbouring period, so FR-S2 needs no new check.
- An undecided request is a warning on the calendar, ordered first in its cell (FR-O49).
- A period on custom times is non-standard: it's paid by its own times and doesn't make a day qualify through CA 5 (FR-C14, FR-B1).
- Availability now stores an optional start and end per period, not only the periods selected.
