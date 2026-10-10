# Rules not yet confirmed by the client are configurable, not hardcoded

Eight rules were decided while building the Phase 1 demo and are written into the PRD as *proposed pending client confirmation*: coverage counts only full-period spans (FR-O38), the double-booking block (FR-O39), cover required above 30 minutes (FR-O20), the effect of a no-show (FR-T18), the bonus preview on the Lateness screen (FR-B17), the password being set from the account record (FR-A7), Administrator-editable default rates (FR-O40), and staff seeing position details in My Schedule (FR-O45). The live list is `docs/decisions/pending-confirmation.md`. Build each one as a switch or setting, not a hardcoded rule, so the client's sign-off changes configuration rather than code.

## Consequences

When the client confirms or rejects a rule, remove it from the pending list and the PRD marker, and record the decision in the PRD's resolved section (§5). If the decision changes the shape of the system, add an ADR here as well.
