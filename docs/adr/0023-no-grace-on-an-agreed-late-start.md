# No grace on an agreed late start

The 10-minute grace exists for the ordinary delays of getting to work. When a staff member has already asked to come in late and the Administrator agreed, the agreed start is that allowance, so the grace isn't added on top. An assignment has an **agreed late start** when it was placed by custom times that start later than the period (FR-S21, FR-O50), or when the Administrator moved its start later on the day and marked the change as an agreed late arrival (FR-O24). Lateness on it is measured from the agreed start with no grace: the late penalty and the deduction of twice the minutes late both apply from minute 1. Confirmed by the client in the 2026-10-18 feedback round (PRD v1.11).

## Consequences

- The assignment carries an agreed-late-start flag, set by the system on a custom-time placement and by the Administrator on a same-day change, and recorded in the audit log.
- Custom times that only end earlier don't move the start, so the normal grace still applies to them.
- The anomaly rule is unchanged: a deduction that reaches the assignment's length is held for review ([ADR 0010](0010-large-lateness-is-an-anomaly.md)). Because the agreed shift is shorter, it reaches that point sooner.
- Both grace values (10 minutes, and 0 on an agreed late start) stay in configuration, like every other lateness threshold. In Phase 1 the result is shown in minutes and status only ([ADR 0012](0012-phase-1-lateness-produces-no-money.md)).
