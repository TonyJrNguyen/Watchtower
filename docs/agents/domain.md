# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## This repo

`CONTEXT.md` (the glossary) and `docs/adr/` (why the system is shaped the way it is) are derived from the PRD. They don't replace it:

- `docs/prd/shift-scheduling-solution-requirements.md` is the sole source of truth for **what** to build (per `CLAUDE.md`). If a glossary entry or ADR disagrees with the PRD, the PRD wins: flag the drift and fix the derived file.
- `docs/decisions/pending-confirmation.md` lists rules not yet confirmed by the client. Make these configurable, never hardcode them (ADR-0017).
- PRD changes are agreed in claude.ai and patched in (`docs/prd/CHANGELOG.md`). When a patch changes a term or a hard-to-reverse decision, update `CONTEXT.md` or add an ADR in the same commit.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root, or
- **`CONTEXT-MAP.md`** at the repo root if it exists: it points at one `CONTEXT.md` per context. Read each one relevant to the topic.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. In multi-context repos, also check `src/<context>/docs/adr/` for context-scoped decisions.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

Single-context repo (most repos):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Multi-context repo (presence of `CONTEXT-MAP.md` at the root):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
