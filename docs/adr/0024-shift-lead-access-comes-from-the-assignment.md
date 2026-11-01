# Shift Lead access comes from the assignment, not from a role

Staff see only their own schedule and pay, enforced on the server (NFR-2). From Phase 2 the person leading a shift also needs to see who works it and to note how punctual they are, because the Administrator isn't always in the shop. We grant that through the **assignment**: whoever holds a published Phụ trách assignment is the Shift Lead for its time range, and sees and records only for that range (FR-L1–FR-L4). The shift-lead switch on the account (FR-A13) only decides who *may* be given Phụ trách; it grants no access by itself. Confirmed by the client on 2026-11-01 (PRD v1.11).

## Considered options

- **A new account role "Lead".** Rejected: the same person leads some shifts and works others as an ordinary barista, sometimes on the same day. A role would either show them too much or need per-shift exceptions anyway.
- **Access for anyone with the shift-lead switch on, for the whole week.** Rejected by the client: the lead of the morning shouldn't manage the evening.

## Consequences

- The access check reads the assignment: the requested roster's range must overlap a published Phụ trách assignment the requester holds. It ends when that assignment is cancelled or reassigned.
- Two Shift Leads on the same range, Trong and Ngoài, see the same roster.
- A Shift Lead records arrivals (with the same lateness rules) and early departures of 30 minutes or less, which leave the assignment unchanged. Anything that changes the schedule or pay, including a longer departure that needs cover, stays with the Administrator ([ADR 0001](0001-record-decisions-not-negotiate-them.md)).
- Every Shift Lead entry is audit-logged with the lead as actor, and the Administrator can change or clear it.
- A Shift Lead never sees pay, rates, registrations, performance data or the Administrator's evaluation.
