# Phase 1 lateness produces minutes and status, not money

Payroll doesn't exist until Phase 2, so in Phase 1 a recorded arrival is classified (on time, late penalty, deduction of N minutes, or anomaly) and shown in **minutes and status only**. Nothing is converted to VND and nothing is subtracted from pay. Instead, Phase 1 shows a **pay estimate** of assigned hours × rate, labelled as before deductions and bonus. Each staff member sees only their own estimate. Decided by Tony on 2026-09-29 and recorded in the backlog; the PRD (FR-S17 "deduct from the week's pay") hasn't been patched yet.

## Consequences

- The late-penalty flags and deduction minutes build up a real history from day one, so the Phase 2 bonus engine and payroll start with data instead of empty.
- Don't add VND deduction amounts to Phase 1 screens or APIs.
