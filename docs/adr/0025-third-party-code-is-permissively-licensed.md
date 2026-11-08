# Third-party code is permissively licensed

Watchtower is a closed, paid build, and two facts about it decide which open-source code it may use. The PWA's JavaScript is downloaded to every staff member's phone, which counts as distributing it ([ADR 0014](0014-single-installable-pwa.md)). The backend runs as a network service that staff use. So the product only takes third-party code under licences that ask for nothing more than keeping a notice: **MIT, ISC, BSD-2/3-Clause, 0BSD, Zlib, BlueOak, Apache-2.0, the PostgreSQL License, CC0/Unlicense, and SIL OFL 1.1 for fonts**. **MPL-2.0** is allowed when the package is used unmodified. Decided by Tony on 2026-11-07.

## Considered options

- **Allow copyleft where it is "only a library".** Rejected. GPL code bundled into the PWA would bring the whole frontend under the GPL. AGPL code on the server would give every staff member the right to the full server source, which conflicts with [ADR 0026](0026-provider-keeps-the-code-client-holds-a-perpetual-licence.md).
- **Allow source-available licences (SSPL, BSL/BUSL, Elastic License, Commons Clause, RSAL).** Rejected. They restrict commercial use and their terms change between releases.

## Consequences

- Never in the product: GPL, AGPL, LGPL in the frontend bundle, the source-available licences above, code with no licence, and Stack Overflow snippets (CC BY-SA). GPL or AGPL **tools** that never ship with the product (Linux, Git, editors, CI runners) are fine.
- Watch for traps: iText (AGPL) for PDF, Redis releases under RSAL/SSPL (use Valkey or PostgreSQL), MongoDB (SSPL), and the paid tiers of open-core libraries (FullCalendar Premium, MUI X Pro, AG Grid Enterprise, Highcharts, Font Awesome Pro).
- Check data licences as well as code licences: holiday or calendar data can carry share-alike terms.
- When the code repository is set up in Phase 0, CI fails the build on any dependency outside the allowlist, and the PWA ships a third-party notices page generated from the dependency tree. Apache-2.0 NOTICE files go into that page.
- The contract carries an annex listing the third-party components and their licences.
