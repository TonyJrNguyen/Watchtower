# The provider keeps the code; the client holds a perpetual licence

The client proposal (`docs/client/04-solution-proposal-and-cost.md`) priced the build and the maintenance but did not say who owns the source code. The provider keeps ownership of the code. The client receives a **perpetual, non-exclusive licence** to use the system for its own business, with no limit on the number of users, and the **source code is handed over** if the provider stops maintaining the system. Decided by Tony on 2026-11-07. The contract clause still needs a lawyer's review.

## Considered options

- **The client owns the code and receives it at each phase's acceptance.** Rejected: the provider couldn't reuse the core in other projects, and that usually means a higher price.
- **The provider keeps the code with no handover.** Rejected: it leaves the client fully dependent on the provider, with nothing to fall back on if support ends.

## Consequences

- The proposal and the contract gain an intellectual-property clause: ownership, the licence's scope, and the handover trigger (the provider ends maintenance, or fails to provide it under the terms of §6.2), with what is handed over (source, build and deployment instructions, database schema).
- The client's own data stays the client's, and can be exported on request, independent of the code licence.
- Third-party components keep their own licences, listed in a contract annex ([ADR 0025](0025-third-party-code-is-permissively-licensed.md)). Because the code is closed, copyleft code can't be part of it.
