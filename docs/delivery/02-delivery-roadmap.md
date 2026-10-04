# Delivery Roadmap — Shift Scheduling & People Management

**Companion to:** `01-epics-and-user-stories.md`
**Roadmap type:** Phase-based with Now / Next / Later framing. This is a plan, not a contract — each phase is re-forecast at its gate.
**Revised 2026-09-29** against PRD v1.6, the approved Phase 1 prototype and the decisions listed in the backlog §0. The first version (2026-09-08) was written against PRD v1.1.

---

## 1. Strategic frame

Three problems, three phases, in the order that returns value fastest:

| Client problem (PRD §1) | Phase that solves it | Value released |
|---|---|---|
| Manual shift scheduling for ~40 staff on Zalo | **Phase 1** | The weekly bottleneck disappears. This is the whole reason the project exists. |
| Reactive management, no centralised system | **Phase 1 + 2** | Weekly calendar and coverage (Phase 1), control centre and performance dashboard (Phase 2) |
| Manual, error-prone compensation | **Phase 2** | Payroll and bonus computed and traceable. Phase 1 already records and classifies every lateness in minutes and accumulates late-penalty flags, and shows a plain pay estimate, so Phase 2 inherits a real history instead of starting empty |
| *(Enabling, not a stated problem)* Verified attendance | **Phase 3** | Removes the Owner's manual observation |

**Sequencing logic:** Phase 2 pays from *assigned* hours (FR-C1) and runs the bonus engine on *manually recorded* lateness (§3.7.1). That decision is what lets payroll ship without the time clock — and it is why Phase 3 can be blocked on G51 indefinitely without stalling the product. Preserve it.

---

## 2. Now / Next / Later

**NOW — Phase 0 (reduced) + Phase 1 (committed)**
Four capabilities: **staff register availability · the Administrator arranges and publishes the week on one weekly calendar · the Administrator records who was late · the system applies the lateness rules to it**, in minutes and status, with no money deducted. Plus the foundation they sit on (accounts with nicknames, roles, audit log, bilingual UI, configuration of shift periods, window, positions, rates and skip reasons), a plain pay estimate from assigned hours × rate, and **full phone and desktop parity for every Phase 1 surface**.

*Narrowed on 2026-09-08*: notifications & push (E6) and the control centre (E8) moved to Phase 2. *Widened since*: responsive parity returned to Phase 1 on 2026-09-18, and PRD v1.3–v1.6 (2026-09-27/28) merged availability and scheduling into one calendar with a day roster, nicknames, sub-positions, cell Add and spreadsheet filters.

**NEXT — Phase 2 (high confidence, contingent on Phase 1 acceptance)**
Notifications & web push (with install onboarding) · control centre · payroll close · bonus & streak engine · performance dashboards · data retention.

**LATER — Phase 3 and beyond (low confidence, gated)**
Automated time clock (blocked on G51) · break & presence monitoring (provisional, may be cut) · remaining configuration (bonus rules, special-rate date editing) · native apps · actual-hours reporting.

**Explicitly NOT on the roadmap** — worth stating to the client so it isn't assumed: leave and time-off management, Zalo integration, multi-site support, overtime rules, accounting-system integration, staff self-registration, in-app approval or swap workflows, staff dispute tracking.

---

## 3. Phase 0 — Closeout and mobilisation (2 weeks, reduced)

Nothing here is build work. Part of the original three-week Phase 0 has already been delivered through the Phase 1 prototype:

| Original Phase 0 item | Status |
|---|---|
| 40-staff calendar prototype tested with the Owner (SPIKE-2) | **Done** 2026-09-18 – 09-28; density decided by the Owner (client feedback 2026-09-27/28) |
| Wireframe v2 for Phase 1 screens (O1) | **Not needed** — the approved prototype is the reference for every Phase 1 screen (PRD §5.3). Wireframe v1 is reconciled for Phase 2/3 screens before Phase 2 design |
| O2 walkthrough | **Done up to recorded lateness** in the prototype; the weekly close is walked before Phase 2 |
| Web push on real devices (SPIKE-1), Administrator's browser (B8) | **Moved to Phase 2** with the notifications it exists for |

What remains:

| Week | Activity | Output |
|---|---|---|
| 1 | Put the eight proposed rules (B12) and the pay estimate (B13) to the client in one decision round; patch the PRD through the claude.ai process | Signed-off rule list, PRD patch |
| 1–2 | Tech stack decision, environments, repo, CI/CD, backup + restore drill (ENABLER-6) | Environments ready before Sprint 1 |
| 2 | Contract, scope schedule, acceptance criteria, payment milestones, IP terms, maintenance response time (B7) | Signed SOW |

**Gate to Phase 1:** contract signed and deposit received · environments and restore drill done · the eight proposed rules either confirmed or explicitly left configurable.

---

## 4. Phase 1 — Scheduling and lateness (9 sprints / 18 weeks + 2 weeks pilot)

Two-week sprints. Capacity assumption: 2 developers + Tony part-time as BA/PM/QA + designer part-time (see §7). Every sprint's demo runs on a real phone and a desktop browser.

| Sprint | Weeks | Scope | Demo-able outcome |
|---|---|---|---|
| **S1** | 1–2 | E1 core: auth, staff accounts CRUD with nickname, roles, deactivation, audit log, i18n scaffold, PWA shell. ENABLER-1. | The Owner creates a staff account; that staff member signs in on their phone. |
| **S2** | 3–4 | E1 remainder: password from the record, default rate per position, Superadmin log, "include former staff", configuration of shift periods, registration window, positions with sub-positions, skip reasons (S-1.12–S-1.14). | The Owner renames a sub-position and changes a default rate without a release. |
| **S3** | 5–6 | E2 complete: registration grid, select-all, edit/delete, warnings, own-overlap block, auto-lock, on phone and desktop (S-16.6). ENABLER-4. | A staff member registers a full week on a phone; it locks at the cutoff. |
| **S4** | 7–8 | Staffing needs per position; the weekly calendar read view with nickname pills, registered vs. counted-as-free, placed-of-needed per cell, hover/tap; staff list with master checkbox and spreadsheet Filters scoped to the dates in view; Day / 3 Days / Week views with earlier weeks read-only; phone one-day view (S-4.1, S-4.2, S-4.17, S-3.1, S-3.4, S-3.5, S-16.5 read part). | **The Owner sees who registered, by day, three days or the whole week, on desktop and phone.** |
| **S5** | 9–10 | Placing: side panel / bottom sheet, place without position, join/split of neighbouring periods, cell Add, double-booking block, out-of-availability flag, day roster (S-4.3, S-4.5, S-4.12–S-4.16). | The Owner places people for a full week. |
| **S6** | 11–12 | Positions: give positions with sub-positions and attributes, multi-position with primary, qualification flag, coverage per position with full-period and partial counts and the shared marker, coverage cards on a phone (S-3.2, S-3.3, S-3.6–S-3.8, S-4.4, S-4.6, S-16.7). | A full draft week with positions and coverage. |
| **S7** | 13–14 | E5 and post-publication changes: publish gate (no shift, no position), skip-with-reason, publish, My shifts, edit in place, swap, cancel, shorten + cover with the 30-minute rule, notes, on a phone too (S-4.7–S-4.11, S-5.x, S-16.3). | **The whole scheduling loop works end to end.** |
| **S8** | 15–16 | E7 complete: manual arrival, rules engine (ENABLER-5), deductions in minutes, anomaly and resolution with the no-show effect, staff view, bonus preview, pay estimate, earlier weeks read-only, recording from a phone (S-7.x, S-16.2). | **The Owner records a lateness from their phone, on the floor, and sees it classified; each staff member sees their own pay estimate.** |
| **S9** | 17–18 | Hardening: both layouts on real devices for every surface (S-16.8), NFR-2 negative testing, performance at 40 staff on a phone, staff data import, Vietnamese copy review, training materials. | Release candidate. |
| **Pilot** | 19–20 | Pilot with 8–10 staff for one full cycle, in parallel with Zalo. Fix, then full rollout. | **Go-live.** |

**Phase 1 acceptance gate:** two consecutive weeks scheduled entirely in the system, no Zalo consolidation; NFR-2 negative tests pass; audit log complete for every change made during the pilot; the Owner builds a week in under 60 minutes unaided; the Owner records a lateness from their phone and the classification and minutes match the rule table in PRD §3.8.3 by hand-check; every Phase 1 surface passes on a real phone and a desktop browser; the eight proposed rules are confirmed or left configurable.

**Not in the Phase 1 gate, and the SOW must say so:** no notification of any kind is delivered, no control centre exists, lateness is not converted to money and nothing is deducted from anyone's pay, and the pay figure shown is an estimate, not a payslip. Each of these is a Phase 2 item, not a defect.

---

## 5. Phase 2 — Notifications, control centre, payroll and bonus (6 sprints / 12 weeks + 2 weeks parallel run)

Starts only after Phase 1 has run for **at least 3 clean weeks in production**. Payroll built on an unstable schedule model is payroll built twice. **Before Phase 2 is priced:** run SPIKE-1 (web push on staff phones and the Administrator's phone and browser, B8), agree the Zalo cut-over date (B11), reconcile Wireframe v1 for the Phase 2 screens, and walk the weekly close on paper (O2).

| Sprint | Weeks | Scope |
|---|---|---|
| **S10** | 1–2 | E6 notifications & push: VAPID, service worker, inbox, install onboarding (S-1.9), all notification events including **FR-N5**, and the notifications added to the Phase 1 surfaces (swap, cancel, early departure, publish, change, anomaly) |
| **S11** | 3–4 | E9 part 1: assigned-hours calculation replacing the Phase 1 estimate, rate resolution, multi-position paid once, special-rate dates, converting and applying the lateness deductions recorded since Phase 1 |
| **S12** | 5–6 | E10 part 1: weekly bonus evaluation, streak counter, BonusHold, waiver → re-evaluation and forward cascade |
| **S13** | 7–8 | E10 part 2 (close screen, bulk confirm, needs-attention sort, override) + E9 part 2 (base/bonus split, force-close, retroactive adjustment, export) |
| **S14** | 9–10 | E11 dashboards + E12 retention jobs |
| **S15** | 11–12 | E8 control centre + S-16.1 and S-16.4 (control centre and inbox on a phone) + phone layouts for the Phase 2 surfaces + hardening |
| **Parallel run** | 13–14 | The system computes payroll alongside the Owner's manual calculation for 2 weeks. **No payment is made from the system until both agree for 100% of staff.** |

**Phase 2 acceptance gate:** two consecutive weeks where system payout matches the manual calculation exactly · a clean week closes in one action · a waived penalty demonstrably restores a bonus and cascades the streak · CSV export opens correctly in the Owner's spreadsheet tool.

> The close is a **load-bearing constraint**, not a preference: ~40 staff reconciled in one Sunday evening, 52 times a year. If the close screen requires per-staff confirmation, the project has recreated the bottleneck it was built to remove. Test this explicitly at the gate.

---

## 6. Phase 3 — Automated time clock (3 sprints / 6 weeks) — **gated**

**Entry condition: G51 decided and SPIKE-3 complete.** Until then this phase has no start date and should not appear on a client-facing timeline with one.

| Sprint | Scope |
|---|---|
| **S16** | Token generation and rotation, display-device mode, code validation, concurrent use |
| **S17** | Presence factor behind a substitutable interface, exception raising, Administrator review and correction |
| **S18** | Cut-over from manual to clock-sourced arrival times, resilience (NFR-8), hardening. Break monitoring (E14) only if G43–G46 are also resolved — otherwise cut. |

**Design constraint to protect:** FR-T3 requires the presence check to sit behind an interface that allows the mechanism to be substituted without touching FR-S7, FR-T5 or any downstream rule. Build it that way even if wifi is chosen — the client is already on their second presence decision.

---

## 7. Team and capacity

Re-estimated 2026-09-29, revised 2026-10-04. Phase 1 stories went from 136 md to 200 md, then to 209 md with the calendar views and earlier weeks (PRD v1.7–v1.8; backlog §3 shows the breakdown); team effort is scaled with the same ratio used in the first version (113 team md for 136 story md).

| Role | Phase 1 | Phase 2 | Phase 3 | Notes |
|---|---|---|---|---|
| BA / PM / tech lead / QA lead (Tony) | ~49 md | ~29 md | ~10 md | Part-time alongside a full-time role — this is the hard capacity constraint. Phase 1 carries twice the device testing now that every surface has two layouts |
| Senior full-stack developer | ~62 md | ~40 md | ~21 md | Owns the weekly calendar and the rules engine |
| Mid full-stack developer | ~48 md | ~30 md | ~13 md | |
| UI/UX designer | ~15 md | ~15 md | ~4 md | The prototype settles Phase 1 layouts; the work is visual polish and the phone views. Phase 2 needs Wireframe v1 reconciled |
| **Total** | **~174 md** (was ~166, and ~113 before that) | **~114 md** (was ~120) | **~48 md** | Phase 1 is now the larger phase |

**Capacity reality check:** 174 md in 18 weeks is ~1.9 people full-time. Tony cannot absorb a meaningful share of that alongside a full-time QA job. Either the two developers are real and paid, or the calendar stretches to roughly double. Pick one deliberately rather than discovering it in Sprint 3.

---

## 8. Dependencies

```
E1 Foundation & configuration ──▶ everything

E2 Registration ──▶ E4 Weekly calendar (see who registered) ──▶ placing ──▶ positions + E3 coverage ──▶ E5 Publish
                                        │
                                        ├──▶ E9 Payroll (assigned hours; replaces the Phase 1 estimate)
                                        └──▶ E10 Bonus (8-hour day test)

E7 Manual lateness ──▶ E10 Bonus (late-penalty count)
                   └──▶ E9 Payroll (minutes recorded since Phase 1, converted and applied)
                   └──▶ ENABLER-5 rules engine ──▶ E13 (same rules, new source)

SPIKE-1 (iOS push) + B8 ──▶ E6 Notifications (Phase 2) ──▶ FR-N5 replaces the manual Zalo chase

Wireframe v1 reconciliation (O1) ──▶ E8, E9, E10, E11 design (Phase 2)

E9 + E10 ──▶ E12 Retention (aggregates must exist before the purge)

G51 ──▶ SPIKE-3 ──▶ E13 ──▶ E14 (also needs G43–G46)
```

**The critical path through Phase 1 is E1 → E2 → the weekly calendar (S4–S6) → E5.** Parity is not parallelisable any more — each surface's phone layout is built with the surface. E7 is the one block that can run alongside, and **it should not be cut**: lateness recording is what gives Phase 2 payroll and the bonus engine a history to read, and it only works if it can be done from a phone on the floor.

If Phase 1 slips, the honest move is to extend the calendar or cut a sub-feature — the configuration stories (S-1.13, S-1.14) are the most separable — not to drop E7.

**E6's deadline is set by Zalo, not by the sprint plan.** FR-N5 has no automated substitute; its Phase 1 stand-in is the Administrator chasing non-registrants on Zalo. That only works while Zalo is still in use for scheduling. E6 must land before the client stops doing that (B11).

---

## 9. Risk register

| # | Risk | Likelihood | Impact | Response |
|---|---|---|---|---|
| R1 | Web push unreliable on staff devices — or on the Administrator's | Medium | High for Phase 2 — breaks FR-N5 and the E2 hypothesis | Run SPIKE-1 before Phase 2 is priced. If push cannot work at all, the Phase 2 design and price change before anyone signs. |
| R2 | Weekly calendar slow or cramped at 40 staff on a real phone | Low–Medium | High — the calendar is the core of Phase 1 | Legibility was prototyped and accepted by the Owner (2026-09-27/28). Remaining risk is performance: measure on the oldest phone in the team in S4, not in S9 |
| R3 | Staff don't adopt; the Owner keeps scheduling on Zalo | Medium | Critical — the project fails on its own terms | Pilot with 8–10 staff first; in-person training in Vietnamese; the Owner announces on Zalo that the system is the only channel; FR-S19 means non-adoption degrades to "fully available" rather than to nothing |
| R4 | Payroll dispute after go-live | Medium | High — trust and possibly legal | 2-week parallel run; base pay releases unconditionally (FR-C11); full traceability (FR-C5); contract states the client remains responsible for payroll correctness |
| R5 | Scope creep from an SMB client with no PM discipline | High | Medium | Fixed scope per phase in the SOW; a written change-request process with re-estimation; the "explicitly NOT on the roadmap" list agreed up front. Phase 1 has already grown 47% between 2026-09-08 and 2026-09-28 through prototype feedback — that growth is priced in this revision; anything after the SOW is a change request |
| R6 | Tony's capacity — full-time job plus lead role | High | High | Either fund two real developers or double the calendar. Do not plan on heroics. |
| R7 | G51 never gets decided | Medium | Low — by design | Phase 3 is fully isolated. Phases 1 and 2 ship complete without it. Say so to the client so it isn't read as an unfinished product. |
| R8 | Client only signs Phase 1 | Medium | Medium | Phase 1 must be commercially and functionally complete standing alone. It is. |
| R9 | Retention purge deletes evidence behind an open dispute | Low | High | Purge gated on the week being closed and reconciled (FR-C6). Test the gate, don't assume it. |
| R10 | Figma MCP call allowance exhausted during Phase 2 design | Medium | Low | Schedule the Wireframe v1 reconciliation for Phase 2 screens across a month or upgrade the plan for the duration |
| R11 | Responsive parity doubles the test surface | High | Medium | Two layouts per surface, checked on real devices every sprint (DoD) and in S-16.8, with its own budget. Anything the client later wants on top of the prototype's layouts is a change request |
| R12 | **A staff member is assigned a shift they cannot work because they forgot to register.** With FR-N5 in Phase 2, nothing automated warns them | **High** | Medium — erodes trust in the system during exactly the weeks it is being adopted | FR-O23 shows the Administrator who defaulted; they chase on Zalo before Saturday 15:00. Put this in the Administrator's weekly checklist, not just the training deck. Closes when E6 ships. |
| R13 | The client reads Phase 1 as "the system handles penalties" and expects pay to be deducted, or reads the pay estimate as a payslip | Medium | Medium — an acceptance dispute | Decided 2026-09-29 (B10): Phase 1 shows lateness in minutes and status and never deducts; the pay figure is labelled an estimate before deductions and bonus. State both in the SOW and show the labels at the S8 demo. |
| R14 | The eight rules proposed in the prototype are changed by the client after they are built | Medium | Low–Medium | Build each one configurable (CLAUDE.md, `pending-confirmation.md`); get sign-off in Phase 0 (B12) |

---

## 10. Rollout and change management

The client's staff are ~40 café workers who currently use Zalo. Adoption, not code, is the main delivery risk.

1. **Owner first.** The Owner is trained and builds one week in the system before any staff member sees it. If the Owner isn't fluent, nothing else matters. Set the app up on the Owner's own phone in that session — in Phase 1 the Owner records lateness and adjusts shifts from it. (Push for anomaly and understaffed-slot alerts, which on iOS needs a Home Screen install, arrives in Phase 2.)
2. **Pilot group of 8–10** for one full cycle, running in parallel with Zalo. Recruit across device types — include the oldest iPhone on the team.
3. **In-person onboarding**, in Vietnamese, at shift changeover. Add the app to the Home Screen *with* each person, on their own phone — do not send instructions and hope. Push permission is granted in a second round when Phase 2 ships.
4. **One-page Vietnamese quick guide**, in the shop and pinned in the Zalo group: the window (Thứ Năm 00:00 – Thứ Bảy 15:00), "Chọn tất cả ca", and the rule that registering nothing means fully available.
5. **A hard cut-over date** after the pilot. Parallel channels indefinitely means neither is trusted.
6. **Two weeks of hypercare** after each phase go-live, with a named response time.
7. **Add two items to the Owner's weekly routine for Phase 1**, because no notification exists yet: before Saturday 15:00, check who has not registered and message them on Zalo; and when recording a lateness, tell that staff member directly the same day. Both become automatic when E6 ships.

---

## 11. Success metrics

| Phase | Metric | Baseline | Target | Measured |
|---|---|---|---|---|
| 1 | Owner's weekly scheduling time | Several hours | < 60 min | Owner self-report, weeks 3–6 after go-live |
| 1 | Staff registering in-app without chasing | 0% | ≥ 80% by cycle 2 | System count |
| 2 | PWA installed with push granted | 0% | ≥ 85% of active staff | System count *(with E6)* |
| 1 | Weeks published with an unnoticed uncovered need | Unknown | 0 | Coverage view *(control centre arrives in Phase 2)* |
| 1 | Staff assigned a shift they could not work after forgetting to register | Unknown | 0 | Owner report — the metric that tells you whether the manual FR-N5 substitute is holding |
| 1 | Lateness recorded within the same shift it occurred | Unknown | ≥ 90% | Timestamp of entry vs. shift end |
| 2 | System payout vs. manual calculation | — | 100% match for 2 weeks | Parallel run |
| 2 | Time to close a clean week | Hours | < 10 min | Timed at the gate |
| 2 | Payroll corrections after close | Unknown | ≤ 1 per month | Adjustment records |
| 3 | Shifts with a valid clock-in | — | ≥ 95% | Exception rate |

---

## 12. Immediate next steps

| # | Action | Owner | By |
|---|---|---|---|
| 1 | Send the revised client proposal (v3.0) with the re-estimated Phase 1 | Tony | Week 1 |
| 2 | Put the eight proposed rules (B12) and the pay estimate (B13) to the client as one decision round; patch the PRD via claude.ai | Tony | Week 1 |
| 3 | Decide the stack; stand up environments, CI/CD, backup + restore drill | Tony | Week 1–2 |
| 4 | Decide the delivery model: solo-and-slow vs. funded two-developer team | Tony | Week 1 |
| 5 | Issue the Phase 1 SOW with the Phase 1 exclusions written in (no notifications, no control centre, no money deducted for lateness, pay figure is an estimate) and the maintenance response time (B7) | Tony | Week 2 |
| 6 | Agree with the client the date by which Zalo stops being the scheduling fallback — this sets E6's deadline (B11) | Tony | Before Phase 2 is scheduled |
| 7 | Run SPIKE-1 and settle B8; reconcile Wireframe v1 for Phase 2 screens; walk the weekly close (O2) | Tony + designer | Before Phase 2 is priced |
