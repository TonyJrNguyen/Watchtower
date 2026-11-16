# Data is tenant-ready from the first migration

Watchtower is Tony's own product, and he may offer it to other shops later. v1 serves one client, but every record that belongs to a client carries a **tenant** identifier from the first database migration, and every query and every server-side access rule is scoped by it (NFR-12). Adding this later would mean migrating live data and re-checking every query for leaks between clients; adding it now costs a column and a scope in code that is not written yet. Decided by Tony on 2026-11-16.

## Considered options

- **A multi-shop SaaS from v1**, with self-service sign-up, billing and administration across tenants. Rejected for now: it adds a large scope the first client doesn't need.
- **One client only**, with no tenant in the data. Rejected: a second shop would need a data migration and a review of every query.

## Consequences

- The tenant is set from the signed-in account on the server, never from what the browser sends; a test in CI checks that no query returns another tenant's records.
- Each tenant's configurable rules ([ADR 0017](0017-unconfirmed-rules-are-configurable.md)) live in that tenant's settings, so one shop's rules can differ from another's.
- A requirement only one client has is built as an **enhancement** inside the one product, off by default and switched on in that tenant's settings. There is never a separate copy of the code for one client.
- An enhancement is built only when other shops could use it too. Work that only one shop needs is priced separately or declined, so the number of switches stays small enough to test.
- An enhancement belongs to the product, whoever asked for it, and may be switched on for other tenants; the client who asks for it pays for its development. This goes into the contract with the rest of the IP terms.
- A tenant is one shop in the time zone of [ADR 0016](0016-single-location-fixed-timezone.md); several locations under one tenant are still not built.
- Backups and restores ([ADR 0027](0027-hosted-in-vietnam.md)) stay per database; restoring a single tenant on its own is not a v1 feature.
