# Watchtower — Shift Scheduling & People Management

Watchtower replaces the manual, Zalo-based shift scheduling of a single
Vietnamese retail/café business with about 40 staff. Staff register when they
can work, the Administrator builds and publishes the week on one calendar, and
the system keeps the record that lateness, pay and bonus are later computed
from.

The system records decisions; it does not negotiate them. Staff and the Owner
still agree on changes in Zalo, and the system records the outcome with a full
audit trail. There are no in-app approval queues, and no Zalo integration.

## Where to start

| What | Where |
|---|---|
| Requirements (single source of truth) | [`docs/prd/shift-scheduling-solution-requirements.md`](docs/prd/shift-scheduling-solution-requirements.md) |
| PRD change history | [`docs/prd/CHANGELOG.md`](docs/prd/CHANGELOG.md) |
| Rules awaiting client confirmation | [`docs/decisions/pending-confirmation.md`](docs/decisions/pending-confirmation.md) |
| Epics and user stories | [`docs/backlog/01-epics-and-user-stories.md`](docs/backlog/01-epics-and-user-stories.md) |
| Delivery roadmap | [`docs/delivery/02-delivery-roadmap.md`](docs/delivery/02-delivery-roadmap.md) |
| Client feedback | [`docs/feedback/`](docs/feedback/) |
| Client proposal and pricing | [`docs/client/`](docs/client/) |
| Instructions for Claude Code | [`CLAUDE.md`](CLAUDE.md) |

If the PRD and anything else disagree, the PRD wins. If a rule is listed in
`pending-confirmation.md`, the client has not signed it off yet, so build it
as configurable rather than hardcoded.

## Phase 1 demo

[`prototypes/phase1-demo.html`](prototypes/phase1-demo.html) is the
interactive prototype reviewed with the client for every Phase 1 screen, on
desktop and phone. Open it in any browser; no server or build step is needed.

The demo illustrates behaviour. It is not the specification: some of its
rules are still pending confirmation, and where it differs from the PRD, the
PRD is correct.

## Scope

**Phase 1 (in build)**

1. **Account management**: Administrator-managed staff accounts, roles and
   unique nicknames.
2. **Availability registration**: staff register whole shift periods for the
   coming week, from Thursday 00:00 to Saturday 15:00.
3. **Shift assignment**: one weekly calendar (Day / 3 Days / Week views) to
   see who registered, place people in shifts and give them positions, with
   draft and publish, a publish gate, early departure and swaps.
4. **Manual lateness recording**: the Administrator records arrival times and
   the system classifies each one (10-minute grace, late penalty from minute
   11, double deduction from minute 16, anomaly when the deduction reaches the
   shift length). Phase 1 shows this in minutes and status only; no money is
   deducted.

Every Phase 1 screen works on both phone and desktop.

**Phase 2**: notifications and web push, the control centre, weekly payroll
close, the bonus and streak engine, performance dashboards and data
retention.

**Phase 3**: the automated QR/code time clock, blocked on an open client
decision (G51).

PRD §4.13 has the exact boundaries between phases.

## Rules for every feature

- **Bilingual.** Vietnamese and English, chosen per user. No hardcoded UI
  strings.
- **Fixed time zone.** Asia/Ho_Chi_Minh (UTC+7) for v1. Timestamps are still
  stored with their time zone so this can change without a data migration.
- **Money.** Always whole VND.
- **Server-side access control.** Staff must never be able to read another
  person's schedule or pay, even by calling the API directly. Hiding it in the
  UI is not enough.
- **Audit log.** Every create, update and delete records the actor, the
  timestamp, the old and new values, and the reason when one is given. With no
  approval workflow, this log is the only evidence of why something changed.
- **Terminology.** When the client says "role" they mean the job done on a
  shift. In code that is always a *position*; *role* is reserved for access
  level (Superadmin, Administrator, Staff).

## How changes to the PRD are made

1. Discuss and agree the change in a chat with Claude on claude.ai.
2. Apply the resulting patch to the PRD, by hand or with Claude Code.
3. Add an entry to `docs/prd/CHANGELOG.md` and commit.
4. Build features with Claude Code in this repository, using the PRD as the
   source of truth and `CLAUDE.md` for scope.

## Contributing

- Documents are written in English. A few also have a Vietnamese version
  next to them, named `<name>.vi.md`. The English file is the main copy;
  when one changes, update the other to match.
- Work happens on a branch and is merged to `main` through a pull request.
- Issues are tracked in GitHub Issues for
  [`TonyJrNguyen/Watchtower`](https://github.com/TonyJrNguyen/Watchtower/issues).
