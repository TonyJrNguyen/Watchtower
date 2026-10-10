# The system records decisions; it does not negotiate them

Staff and the Owner already agree on schedule changes on Zalo, so the system has no in-app requests, approvals, acceptances or swap handshakes. The Administrator edits the calendar directly and the system records the agreed outcome. Zalo stays outside the system: no integration, no Official Account, no bot.

## Consequences

- The **audit log** carries the weight an approval queue would have carried. It is the only record of why a schedule changed, so every create, update and delete must log the actor, timestamp, old and new values, and a reason where one is required.
- Requirement IDs for the removed approval flows (FR-S6, FR-S13, FR-O5, FR-O6, FR-O13) are retired and not reused.
- Anything that looks like "staff asks, Owner approves" is out of scope by design. Don't add it back as a feature.
