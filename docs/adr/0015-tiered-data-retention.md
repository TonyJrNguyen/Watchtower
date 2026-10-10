# Data retention is tiered

Data is kept for different periods by tier:

| Tier | Examples | Kept for |
|---|---|---|
| Granular personal data | Raw clock events, device identifiers, minute-level arrival times, notification records | **35 days**, once the week is closed |
| Operational records | Registrations, assignments and their history | **90 days** |
| Financial and audit records | Bonus and payout records, the audit log, applied deductions | **10 years** |

Decree 13/2023 (Nghị định 13/2023) requires personal data not to be kept longer than its purpose, and Vietnamese accounting law requires payroll records to be kept for 10 years. The 35 days cover a full four-week streak plus one week, so the evidence behind a live streak survives.

## Consequences

- A week must be closed before its granular data is purged.
- Aggregates such as qualifying-day counts, streak positions and payout figures are computed and stored at close, not derived later from raw events.
- Where a financial record must remain, anonymising its personal detail is preferred over deleting it.
- Earlier weeks on the calendar and the Lateness screen are viewable only as far as their data is retained.
