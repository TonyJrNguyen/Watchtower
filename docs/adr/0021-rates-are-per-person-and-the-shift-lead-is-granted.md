# Rates are per person, and the shift lead is granted, not assigned freely

Every staff member has a **base rate**. The Owner can turn on a **shift-lead switch** in a staff member's account, and while it is on, that account must also have a **lead rate** (FR-A13, FR-C2). Hours worked as Phụ trách are paid at the lead rate, and hours in every other position at the base rate (FR-C13). Positions carry no rate. The client asked for this on 2026-10-16 and 2026-10-17. It replaces "the staff member's own rate, otherwise the primary position's default rate" and the Administrator-editable default rates of FR-O40, which is retired.

Only staff whose switch is on can be given Phụ trách (FR-O51). This is a **block**, the one exception among positions to [ADR 0005](0005-flag-dont-block.md), because Phụ trách is a responsibility the Owner grants and it changes what the person is paid.

## Consequences

- Turning the switch off doesn't remove Phụ trách assignments already made. They stay, flagged for reassignment, and are paid at the base rate until reassigned, since the account no longer has a lead rate.
- A lateness deduction is charged at the rate of the assignment it falls on (FR-S17). Phase 1 shows deductions in minutes only ([ADR 0012](0012-phase-1-lateness-produces-no-money.md)), so this matters from Phase 2.
- The staff list shows both rates, and the staff member's pay estimate splits lead hours from base hours.
