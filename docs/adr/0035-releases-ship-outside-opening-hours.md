# Releases ship automatically outside opening hours; rule changes need the client's approval

New versions reach the client continuously through CI/CD. A release that passes the automated tests deploys **automatically, only between 23:00 and 07:00** (Asia/Ho_Chi_Minh), when the shop is closed, and comes with release notes in Vietnamese. A change to how hours, pay or lateness are worked out is first shown to the client on a **staging environment** and released only after they approve it. Decided by Tony on 2026-11-16.

## Considered options

- **A fixed release schedule** (for example every two weeks), with notes sent in advance. Not chosen: fixes would wait for the next date.
- **The client approves every release.** Rejected: it slows every fix and loses most of what CI/CD gives.

## Consequences

- Phase 0 sets up a staging environment beside production, with sample data only, never real staff data.
- Database migrations must leave the running version working until the new one is live, so a release can be rolled back in the same night.
- An urgent security or data fix may ship during opening hours; the client is told the same day.
- The client's approval of a rule change is kept with the release notes, since the audit log (NFR-1) records data changes, not code changes.
