# Hosted in Vietnam

Watchtower holds staff personal data: names, phone numbers, schedules, pay rates and arrival times. Under Nghị định 13/2023 and the Personal Data Protection Law, sending that data abroad requires a cross-border transfer impact assessment filed with the authorities and kept up to date. The servers, the database and its backups are therefore hosted **with a cloud provider in Vietnam** (for example Viettel IDC, FPT Cloud, VNG Cloud or CMC Cloud). Decided by Tony on 2026-11-07.

## Considered options

- **An international cloud in the Singapore region (AWS, Google Cloud, Azure).** Rejected for v1: it adds the transfer paperwork, and the shop is a single location in Vietnam ([ADR 0016](0016-single-location-fixed-timezone.md)), so a foreign region brings no benefit.

## Consequences

- Backups and restore drills (backlog ENABLER-6) stay in Vietnam too. A backup copy in another Vietnamese data centre or region is fine.
- Third-party services that would receive personal data must also keep it in Vietnam, or be avoided. This rules out a foreign error tracker or email service that receives staff names, unless the data is stripped first.
- The proposal's estimate for servers and storage (VND 1,500,000–3,000,000 a month, §6.2) is checked against the chosen Vietnamese provider's prices in Phase 0.
- Phase 2 web push goes through the browser vendors' push services. The payload should carry no personal data beyond what the notification has to show.
