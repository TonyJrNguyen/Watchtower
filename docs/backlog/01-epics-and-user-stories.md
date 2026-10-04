# Shift Scheduling & People Management — Epic & Story Breakdown

**Source:** `shift-scheduling-solution-requirements.md` v1.8 (2026-10-04) and the approved Phase 1 prototype `prototypes/phase1-demo.html`
**Status:** Draft for internal review. Revised 2026-09-29 and 2026-10-04 — see §0. Story IDs are stable once agreed; requirement IDs map back to the PRD.
**Convention:** Mike Cohn use case + Gherkin acceptance criteria. Every story is a vertical slice (UI + API + data), never a technical layer.

---

## 0. Revision 2026-09-29

This document was first written on 2026-09-08 against PRD v1.1. This revision brings it in line with the repo:

- **PRD v1.2–v1.6** (`docs/prd/CHANGELOG.md`): seven positions with sub-positions and attributes (§3.3, FR-O45); one weekly calendar for availability and assignment (FR-O10, FR-O42–FR-O44, FR-O46); the day roster (FR-O41); a unique nickname per staff member (FR-A11); spreadsheet-style filters with a master Select all checkbox (FR-O11); draft assignments without a position and the extended publish gate (FR-O29, FR-O33); full-period coverage counting and the double-booking block (FR-O38, FR-O39); the bonus preview (FR-B17); and **full responsive parity in Phase 1** (NFR-5, pulled in on 2026-09-18).
- **Decisions of 2026-09-29 (Tony):**
  1. **Phase 1 lateness applies the rules but produces no money.** The arrival is classified (on time · late penalty · deduction of N minutes · held as an anomaly) and shown in minutes and status only. Nothing is converted to VND and nothing is applied to pay; that is Phase 2 payroll.
  2. **Phase 1 shows a pay estimate** = assigned hours × the applicable rate (own rate, else the primary position's default), to the Administrator for everyone and to each staff member for themselves only. *Not yet in the PRD — needs a PRD patch through the usual claude.ai process.*
  3. **S-1.9 (install onboarding) and SPIKE-1 (iOS push test) move to Phase 2**, with the notifications they exist for.
  4. **Phase 1 scope follows CLAUDE.md.** Where its ID ranges and its explicit exclusions overlap, the exclusion wins: FR-O16 and FR-O28 move from Future into Phase 1; the time clock, payroll, bonus-engine and dashboard requirements stay out.
  5. **Phase 0 is still ahead, reduced** to what the prototype has not already delivered (see the roadmap).
- **Re-estimated:** Phase 1 goes from 136 md to **200 md** of stories. Phase 2 goes from 41 md of moved stories to 35 md.

**Revision 2026-10-04 (PRD v1.7–v1.8):**

- **New S-4.17** — Day, 3 Days and Week views of the calendar, earlier weeks read-only, staff scoped to the dates in view (FR-O47). 5 md.
- **S-4.2 reworked** — filters and the master checkbox scoped to the dates in view, staff not in those dates listed apart and disabled, click a name to show only them (FR-O11 as of v1.7). 6 → 8 md.
- **New S-7.9** — the Lateness screen opens earlier weeks, read-only (FR-O24 as of v1.8). 2 md.
- **Phase 1 goes from 200 md to 209 md** of stories. Decided 2026-10-04 to build all three in Phase 1.

---

## 1. Epic map

| ID | Epic | Phase | PRD requirements | Size | Delivers |
|---|---|---|---|---|---|
| **E1** | Foundation, Access & Configuration | 1 | FR-A1–A11, FR-O16, FR-O28, FR-O40, NFR-1, NFR-2, NFR-6, NFR-7, NFR-11 | XL | Accounts with nickname, roles, sign-in, audit log, VI/EN, configuration of shift periods, window, positions, default rates and skip reasons |
| **E2** | Weekly Availability Registration | 1 | FR-S1, S2, S3, S5, S12, S14, S19 | M | Staff register CA 1–CA 5 inside the window |
| **E3** | Staffing Needs, Positions & Coverage | 1 | FR-O1, O4, O22, O23, O30, O38, O45 | M | Needs defined per position, sub-positions and attributes, coverage visible before and after assignment |
| **E4** | Weekly Calendar & Shift Assignment | 1 | FR-O2, O3, O8, O10, O11, O12, O14, O15, O20, O21, O29, O32, O39, O41–O44, O46, O47 | XL | One calendar, by day, three days or week: see who registered → place people → give positions; day roster below it |
| **E5** | Draft, Publish & My Schedule | 1 | FR-O31, O33, FR-S4, S11 | M | Publish gate (no shift, no position), skip-with-reason, staff read-only schedule |
| **E6** | Notifications & Push | **2** | FR-N1–N9, N13, NFR-4, NFR-9, NFR-10 | L | Web push + in-app inbox + install onboarding (S-1.9) |
| **E7** | Attendance & Lateness (manual) | 1 | FR-O24, O25, O26, FR-S9, S17, S18, FR-T18, FR-B1, FR-B17; pay estimate *(not yet in PRD)* | M | Lateness rules applied to manual input, in minutes and status; bonus preview; pay estimate |
| **E8** | Control Centre | **2** | FR-O34–O37 | M | Landing surface: where is the week, what needs me |
| **E16** | Responsive Parity *(cross-cutting)* | 1 / 2 *(control centre and inbox only)* | NFR-5, NFR-10 | L | Every Phase 1 surface has a designed phone layout and works on desktop for staff |
| **E9** | Payroll & Weekly Close | 2 | FR-C1–C13, FR-O27 | L | Assigned-hours pay, deductions converted and applied, export, close/force-close |
| **E10** | Bonus & Streak Engine | 2 | FR-B2–B16 | L | 100k weekly / 200k streak, holds, bulk confirm |
| **E11** | Performance Dashboards | 2 | FR-P1–P5, FR-S10, S16, FR-B6 | M | Admin + staff reporting |
| **E12** | Data Retention & Compliance | 2 | §4.11, NFR-1 | S | Tiered purge, aggregates at close |
| **E13** | Automated Time Clock | 3 | FR-S7, S8, FR-T1–T7, T13, FR-O17, O19, NFR-3, NFR-8 | L | Rotating code + presence factor |
| **E14** | Break & Presence Monitoring | 3 (provisional) | FR-T14–T17, FR-N12 | M | Extended-absence signal — may be cut entirely |
| **E15** | Administrator Configuration (remainder) | Future | FR-O18, FR-O27 (beyond S-9.4), FR-P6 | S | Bonus rule parameters, special-rate date editing, actual-hours reporting |

**Phase 1 = E1, E2, E3, E4, E5, E7, and every E16 story except S-16.1 and S-16.4.**
**Phase 2 = E6 (now including S-1.9), E8, E9, E10, E11, E12, S-16.1 and S-16.4.**
**Phase 3 = E13–E14 (gated on G51). Future = E15.**

> **Phase 1 was narrowed on 2026-09-08** to four capabilities: staff register availability · the Administrator arranges and publishes the week · the Administrator records who was late · the system applies the lateness rules to it. Notifications (E6) and the control centre (E8) moved to Phase 2. Responsive parity (E16) was returned to Phase 1 on 2026-09-18, after the prototype showed it was cheaper to build than to defer.
>
> **Two consequences of the narrowing, both load-bearing:**
>
> 1. **A penalty in Phase 1 is recorded and classified, not priced or applied.** Payroll arrives in Phase 2, so Phase 1 produces the classification and the minutes ("20 minutes late → late penalty, 40-minute deduction") and the late-penalty flag, with no VND figure; the Administrator still applies it by hand to the payslip they compute themselves. What Phase 1 does show in money is a plain pay estimate from assigned hours × rate, labelled as an estimate before deductions and bonus. The flags accumulate from day one, so the Phase 2 bonus engine and payroll inherit a real history rather than starting empty — which is the main argument for keeping lateness in Phase 1 at all.
> 2. **FR-N5 is not delivered in Phase 1.** The pre-cutoff reminder to staff who registered nothing is the sole automated mitigation for the "silence means fully available" rule (FR-S19). Its Phase 1 substitute is manual: FR-O23 shows the Administrator who actively registered versus who defaulted, and the Administrator chases the defaulters on Zalo before Saturday 15:00. This is acceptable only because Zalo is still running alongside the system during Phase 1. **It stops being acceptable the moment Zalo is cut over**, so E6 cannot slip past the point where the client stops using Zalo for scheduling.

---

## 2. Epic hypotheses

Only the epics where the outcome is genuinely uncertain are framed as hypotheses. E1, E5 and E12 are enablers or obligations, not bets — they are stated as commitments instead.

### E2 — Weekly Availability Registration
**If we** let staff register whole shift periods in a phone app inside a fixed Thursday–Saturday window
**for** the ~40 staff who currently reply on Zalo
**Then we will** remove the Owner's weekly consolidation work entirely, because the input arrives already structured.

- **Validation:** within the first 2 registration cycles after go-live, ≥80% of active staff register in-app without the Owner chasing them on Zalo; the Owner reports spending under 30 minutes consolidating (from several hours today).
- **Key risk to test early:** staff simply don't open the app. Mitigated by FR-S19 (silence = fully available) and, from Phase 2, FR-N5 (pre-cutoff reminder) — but the reminder only works if push works (see E6). In Phase 1 the Administrator chases non-registrants on Zalo.

### E3 + E4 — Coverage & Assignment
**If we** give the Owner one weekly calendar that shows who registered each shift, lets them place people and then give positions on the same surface, with coverage in every cell
**for** the Owner building the week
**Then we will** cut schedule-building from a multi-hour manual consolidation to a single working session, because availability, needs and gaps are on one surface.

- **Validation:** within 3 weeks of go-live, the Owner builds a full week in ≤60 minutes; zero weeks published with an unnoticed uncovered need.
- **Key risk, largely retired:** legibility at 40 staff. The prototype was built with 40 staff and the Owner decided it on 2026-09-27/28: every person is always shown by nickname, cells grow to fit, hover on desktop and tap on a phone (`docs/feedback/2026-09-27-client-feedback.md` E1, E2). What remains is performance at 40 staff on a real phone — test it in the hardening sprint.

### E6 — Notifications & Push
**If we** deliver time-critical messages by web push from an installed PWA, with an in-app inbox fallback
**for** staff and the Owner
**Then we will** keep the system usable without any Zalo integration, because the messages that must arrive before a deadline actually arrive.

- **Validation:** ≥85% of active staff have the PWA installed and push granted within 2 weeks of onboarding; pre-cutoff reminder delivered to ≥90% of non-registrants before Saturday 15:00.
- **Key risk:** iOS. G54 is parked, not resolved. **Run the iOS push test (SPIKE-1) on the client's real devices before Phase 2 is priced, not during the build.**

### E7 — Attendance & Lateness (manual)
**If we** apply the full lateness rule set to a manually recorded arrival time
**for** the Owner, while the time clock is deferred
**Then we will** ship the bonus engine in Phase 2 without waiting on G51, because only the source of the timestamp changes in Phase 3.

- **Validation:** Phase 2 bonus calculations run correctly on manual input for 4 consecutive weeks; no rule change is required when the clock arrives.
- **Accepted limitation:** an unobserved late arrival or no-show produces no penalty (PRD §3.7.1). The client has accepted this in writing.

### E8 — Control Centre
**If we** give the Owner one landing surface listing every pending decision
**for** the Owner
**Then we will** stop decisions being lost, because removing the approval queue removed the only mechanism that surfaced them.

- **Validation:** no anomaly, uncovered need or unassigned staff member goes unaddressed for more than one cycle.

### E9 + E10 — Payroll, Bonus & Close
**If we** compute pay from assigned hours and present the bonus as a pre-computed potential with a one-action bulk confirm
**for** the Owner closing ~40 staff on a Sunday evening
**Then we will** turn the weekly close into a single-digit-minute task, because a clean week requires one action.

- **Validation:** in the 2-week parallel run, system payout matches the Owner's manual calculation for 100% of staff; the Owner closes a clean week in under 10 minutes.
- **Key risk:** payroll disputes. Mitigated by base pay releasing unconditionally (FR-C11) and full traceability (FR-C5).

### E13 — Automated Time Clock
**If we** gate clock-in on a rotating code plus a presence signal
**for** staff starting a shift
**Then we will** replace the Owner's manual observation with a recorded fact, because both factors must hold and neither is defeatable alone.

- **Blocked:** G51 (presence mechanism) is undecided. Do not estimate or schedule this epic until it is.

### Commitments (not hypotheses)
- **E1** — access control and auditability are preconditions for everything else. NFR-2 must be enforced server-side; a UI-only restriction is a defect, not a shortcut.
- **E5** — the publish gate (FR-O33) exists because the ordinary cost of overlooking someone is discovering it on Monday morning.
- **E12** — Nghị định 13/2023 and the 10-year accounting retention obligation are legal requirements, not product choices.

---

## 3. Phase 1 backlog — full stories

**In Phase 1:** E1 (except S-1.9), E2, E3, E4, E5, E7, plus S-16.2, S-16.3, S-16.5, S-16.6, S-16.7 and S-16.8.
**Deferred to Phase 2, definitions retained below for reference:** E6, E8, S-1.9, S-16.1 and S-16.4.

Effort is in man-days (md), covering design + build + test for that slice. Where the approved prototype already settles a screen's layout and behaviour, the design share of the estimate is reduced accordingly. Stories above the 5-md Ready limit (§7) are marked and are split at sprint planning.

**Phase 1 behaviour reference:** `prototypes/phase1-demo.html` replaces Wireframe v1 for every Phase 1 screen (PRD §5.3). Where the prototype and the PRD disagree, the PRD wins.

### E1 — Foundation & Access

#### S-1.1 — Administrator creates a staff account
- **As an** Administrator (shop owner)
- **I want to** create a staff account with profile, qualified positions and rate configuration
- **so that** a new hire can start registering availability the same day, without me setting anything up twice.

**AC — Scenario: new staff account created and usable**
- **Given** I am signed in as Administrator
- **and Given** I am on the Account Management screen
- **When** I submit a valid staff profile with full name, nickname (or leave it empty to accept the suggestion), contact, qualified positions, an optional own hourly rate, a username and a password
- **Then** the account is created in active state, the password stays on screen until I close the record so I can pass it on, it is never shown again afterwards, and the action is written to the audit log with my actor ID and timestamp.

**Requirements:** FR-A1, FR-A4, FR-A7, FR-A11, NFR-1, NFR-6 · **Effort:** 4 md
**Note:** qualified positions are recorded at position level only, never per sub-position (§3.3). With no own rate, the position default applies (FR-C13, S-1.12).

---

#### S-1.2 — Staff signs in and reaches only their own data
- **As a** staff member
- **I want to** sign in with the credentials the Owner gave me
- **so that** I can register my availability and see my own schedule.

**AC — Scenario: staff cannot reach another staff member's data**
- **Given** I am signed in as a staff member
- **and Given** another staff member has registered availability for the same week
- **When** I request that other staff member's availability, schedule or pay by any route, including a direct API call
- **Then** the server rejects the request, and nothing about the other staff member is returned.

**Requirements:** FR-A6, FR-S4, NFR-2 · **Effort:** 3 md
**Note:** this story is where NFR-2 is *proved*. It needs a negative test, not a UI check.

---

#### S-1.3 — Administrator edits a staff profile
- **As an** Administrator
- **I want to** change a staff member's profile, qualified positions or rate at any time
- **so that** a promotion or a rate change takes effect without waiting for a deployment.

**AC — Scenario: rate change is recorded and traceable**
- **Given** a staff member has an existing hourly rate
- **When** I change the rate and save
- **Then** the pay estimate (S-7.8) uses the new rate from then on, and the audit log records the previous value, the new value, my actor ID and the timestamp.

**Requirements:** FR-A2, NFR-1 · **Effort:** 2 md
**Note:** whether a rate change is retroactive within an open pay period (B1) only matters once payroll exists. It is a Phase 2 question and does not block this story.

---

#### S-1.4 — Administrator deactivates a staff member
- **As an** Administrator
- **I want to** deactivate a departing staff member without deleting their history
- **so that** their login stops working but their past payroll and schedule records survive an audit.

**AC — Scenario: future assignments surface instead of vanishing**
- **Given** a staff member has three assignments in a future published week
- **When** I deactivate that staff member
- **Then** their login is revoked, their historical records are retained, the three assignments remain in place, and each is surfaced as an unstaffed shift requiring action — counted on the Week schedule entry and listed in the publish dialog. The control centre joins these surfaces in Phase 2.

**Requirements:** FR-A3, FR-A8, FR-A10, NFR-1 · **Effort:** 3 md

---

#### S-1.5 — Administrator sets a new password from the staff record
- **As an** Administrator
- **I want to** type or generate a new password in the staff member's own record
- **so that** they can get back in without a self-service reset path I can't control.

**AC — Scenario: password set from the record**
- **Given** a staff member cannot sign in
- **When** I open their record, type or generate a new password and save
- **Then** the new password stays on screen until I close the record, the previous one stops working, the record shows the date the password was last set, the value is never redisplayed, and the change is logged.

**Requirements:** FR-A7 *(proposed pending client confirmation)*, NFR-1, NFR-6 · **Effort:** 1 md

---

#### S-1.6 — Administrator retrieves a former staff member's records
- **As an** Administrator
- **I want to** include former staff in a view when I need to
- **so that** deactivated accounts stay out of my way day to day but remain reachable for payroll history.

**AC — Scenario: former staff hidden by default, retrievable by filter**
- **Given** two staff members are deactivated
- **When** I open the staff list
- **Then** neither appears; **and When** I enable "include former staff", **Then** both appear, marked as former, with their historical records accessible.

**Requirements:** FR-A8 · **Effort:** 1 md

---

#### S-1.7 — Administrator reviews the audit log
- **As an** Administrator
- **I want to** see who changed what and when across accounts, availability, assignments and adjustments
- **so that** I can answer a staff member's question about a change without relying on memory.

**AC — Scenario: a schedule change is traceable end to end**
- **Given** an assignment was changed twice after publication
- **When** I open the audit log filtered to that assignment
- **Then** I see both changes in order, each with actor, timestamp, previous values, new values and the reason where one was required.

**Requirements:** NFR-1 · **Effort:** 4 md
**Note:** with no approval workflow, this log is the only record of why a schedule changed. It is load-bearing, not a nice-to-have.

---

#### S-1.8 — Any user switches language
- **As a** staff member or Administrator
- **I want to** use the app in Vietnamese or English
- **so that** I read the interface in the language I actually work in.

**AC — Scenario: language applies to every screen**
- **Given** my account language is set to Vietnamese
- **When** I open My shifts
- **Then** the interface renders in Vietnamese, including position labels (QC, Thu Ngân – Offline, Thu Ngân – Online, Pha chế, Phục vụ, Kiểm tra đơn, Bếp) and "Position - sub-position" labels such as "Pha chế - Matcha, Trà".

**Requirements:** NFR-7 · **Effort:** 4 md
**Note:** VI is the primary language for staff-facing screens. Budget for Vietnamese string length in layouts. Notification text (FR-N2) is added with E6 in Phase 2.

---

#### S-1.9 — Any user who wants push on a phone is walked through installation · **MOVED TO PHASE 2 (with E6)**

> Moved on 2026-09-29. The acceptance criteria exist only to make web push work, and push arrives with E6. Phase 1 still ships as a PWA that can be added to the Home Screen; it just doesn't block onboarding on it.
- **As a** staff member or Administrator on iOS
- **I want to** be walked through adding the app to my Home Screen during onboarding
- **so that** the messages that must reach me before a deadline actually arrive.

**AC — Scenario: onboarding blocks on install for iOS**
- **Given** I am signing in for the first time on iOS 16.4 or later
- **When** I complete sign-in
- **Then** I am shown platform-specific install instructions and cannot dismiss onboarding as complete until the app is running in standalone mode.

**AC — Scenario: the Administrator's path depends on their browser**
- **Given** I am the Administrator signing in on a desktop browser
- **When** I complete sign-in on Chrome or Edge · **Then** push is offered without any installation step
- **When** I complete sign-in on Safari on macOS · **Then** I am prompted to add the site to the Dock, because Safari will not deliver push otherwise.

**Requirements:** NFR-10, NFR-9 · **Effort:** 4 md · **Phase 2**
**Note:** the Administrator needs push as much as any staff member — an anomaly or an understaffed-slot alert is worthless if it only appears at next sign-in. Establish which browser and OS the Administrator actually uses before Phase 2 is priced, alongside SPIKE-1, rather than assuming (B8).

---

#### S-1.10 — Administrator sees Superadmin activity
- **As an** Administrator
- **I want to** see every Superadmin access session without asking for it
- **so that** the provider's technical access to my payroll data is visible to me.

**AC — Scenario: Superadmin session is visible unprompted**
- **Given** the Superadmin has signed in and viewed payroll records
- **When** I open the Superadmin access log
- **Then** I see the session with actor, timestamp and the records viewed or modified, without needing to raise a support request.

**Requirements:** FR-A5, FR-A9 · **Effort:** 2 md
**Note:** the Superadmin is the system provider (PRD §3.1, §5 Resolved), i.e. Tony as the delivering party. Support hours are set by the maintenance terms in the client proposal (§6.2); the committed response time goes into the maintenance contract.

---

#### S-1.11 — Administrator gives each staff member a unique nickname
- **As an** Administrator
- **I want to** give every staff member a short nickname that nobody else active has
- **so that** two people called Mai are never confused on the calendar.

**AC — Scenario: suggestion and clash**
- **Given** "Nguyễn Thị Mai" is active with nickname "Mai N"
- **When** I create "Nguyễn Văn Mai" and leave the nickname empty · **Then** the system proposes a unique alternative such as "Mai NV"
- **When** I type "mai n" instead · **Then** the save is refused, naming Nguyễn Thị Mai as the holder, because the comparison ignores case and diacritics.

**Requirements:** FR-A11, NFR-1 · **Effort:** 2 md
**Note:** the nickname appears only where the full name doesn't fit — in Phase 1, the calendar pills. Lists, filters, the side panel, dialogs, the roster and the audit log show the full name only.

---

#### S-1.12 — Administrator sets the default hourly rate of each position
- **As an** Administrator
- **I want to** change a position's default hourly rate from the staff screen
- **so that** a pay change is not a software release.

**AC — Scenario: default rate edited without a deployment**
- **Given** a staff member has no own rate and is placed as Pha chế
- **When** I change the Pha chế default rate
- **Then** their pay estimate (S-7.8) uses the new rate, and the change is logged with old and new values.

**Requirements:** FR-O40 *(proposed pending client confirmation)*, FR-C13, NFR-1 · **Effort:** 2 md

---

#### S-1.13 — Administrator configures the daily shift periods
- **As an** Administrator
- **I want to** change the shift periods (count, labels, start and end times) and the minimum daily registration hours
- **so that** a change to opening hours doesn't need a deployment.

**AC — Scenario: a changed period applies to the next registration week**
- **Given** registration for next week has not opened
- **When** I change CA 5 to end at 22:00 and save
- **Then** next week's registration grid, calendar, roster and coverage use the new period, weeks already open or locked keep the periods they were registered against, and the change is logged.

**Requirements:** FR-O16, FR-S3, NFR-1 · **Effort:** 4 md
**Note:** in Phase 1 per CLAUDE.md (2026-09-29). Changing periods under an open or locked week would invalidate registrations, so edits apply from the next unopened week only.

---

#### S-1.14 — Administrator edits the registration window, position catalogue and skip reasons
- **As an** Administrator
- **I want to** adjust the registration window, the positions with their sub-positions and attributes, and the publish-gate skip reasons
- **so that** renaming "Bồn" or adding a skip reason doesn't wait for a release.

**AC — Scenario: a rename changes the label only**
- **Given** "Bồn" is a sub-position of Pha chế with existing assignments
- **When** I rename it and save
- **Then** every screen shows the new label, existing assignments keep their data, and the change is logged.

**Requirements:** FR-O28, FR-S1, FR-O33, NFR-1 · **Effort:** 5 md
**Note:** in Phase 1 per CLAUDE.md (2026-09-29). Default rates are S-1.12. Deactivating a position hides it from new assignments but keeps it on past ones.

**E1 subtotal: 37 md** (S-1.9 excluded, 4 md moved to Phase 2)

---

### E2 — Weekly Availability Registration

#### S-2.1 — Staff registers availability by selecting shift periods
- **As a** staff member
- **I want to** tap the shift periods I can work on each day of next week
- **so that** the Owner knows my constraints without a Zalo conversation.

**AC — Scenario: registration saved and immediately visible**
- **Given** the registration window is open (Thursday 00:00 – Saturday 15:00)
- **and Given** I am viewing next week's grid
- **When** I select CA 1 and CA 2 on Monday and save
- **Then** both periods are recorded as my availability for that Monday and appear in my own view immediately, with a computed daily total of 6 hours.

**Requirements:** FR-S1, FR-S12 · **Effort:** 5 md

---

#### S-2.2 — Staff registers a whole day in one action
- **As a** staff member who is free all day
- **I want to** register every period for a day with one tap
- **so that** confirming full availability doesn't cost five taps per day.

**AC — Scenario: select-all registers all five periods**
- **Given** the window is open and Tuesday has no registration
- **When** I tap "Chọn tất cả ca" / "Select all shifts" on Tuesday
- **Then** CA 1 through CA 5 are registered for that Tuesday and the daily total shows 16 hours.

**Requirements:** FR-S14 · **Effort:** 1 md

---

#### S-2.3 — Staff changes or removes a registration
- **As a** staff member whose plans changed
- **I want to** edit or delete a day's registration while the window is open
- **so that** the Owner works from my current availability, not my first guess.

**AC — Scenario: deletion clears the day**
- **Given** I registered CA 3 and CA 4 on Thursday
- **and Given** the window is still open
- **When** I delete that day's registration
- **Then** Thursday shows no registered periods, my view updates without a refresh, and the change is logged.

**Requirements:** FR-S1, FR-S12, NFR-1 · **Effort:** 2 md

---

#### S-2.4 — Staff is warned but not blocked below the contract expectation
- **As a** staff member with reduced availability this week
- **I want to** submit fewer than 5 days or fewer than 8 hours a day and still be accepted
- **so that** I register my real constraints instead of registering nothing.

**AC — Scenario: warning shown, submission accepted**
- **Given** I have registered only CA 2, CA 3 and CA 4 on a day (6 hours total)
- **When** I save
- **Then** I see a warning that the day is below the 8-hour expectation, the registration is saved regardless, and nothing is blocked.

**Requirements:** FR-S3 · **Effort:** 2 md
**Note:** CA 2 + CA 3 + CA 4 = 6 hours, so anyone available only 11:00–17:00 triggers this every day. Intentional; wording must not read as an error.

---

#### S-2.5 — Staff cannot register overlapping time with themselves
- **As a** staff member
- **I want to** be stopped from registering the same period twice
- **so that** my daily total is a number the Owner can trust.

**AC — Scenario: own-overlap is blocked, cross-staff overlap is not**
- **Given** I have registered CA 2 on Monday
- **When** I attempt to register a second entry covering the same Monday period
- **Then** the save is blocked with an explanation; **and Given** another staff member registers CA 2 on the same Monday, **Then** their save succeeds.

**Requirements:** FR-S2 · **Effort:** 2 md

---

#### S-2.6 — Registration locks automatically at the cutoff
- **As an** Administrator
- **I want to** know that nothing changes after Saturday 15:00
- **so that** I build the schedule against a fixed input.

**AC — Scenario: UI and API both go read-only at the cutoff**
- **Given** the time is Saturday 15:00:01 Asia/Ho_Chi_Minh
- **When** a staff member attempts to create, update or delete a registration for that week, by UI or by direct API call
- **Then** the request is rejected, and the staff member's view is read-only.

**Requirements:** FR-S5, NFR-2, NFR-11 · **Effort:** 2 md

**E2 subtotal: 14 md**

---

### E3 — Staffing Needs & Coverage

#### S-3.1 — Administrator defines the week's staffing needs
- **As an** Administrator
- **I want to** set how many people I need per shift period and position before the window opens
- **so that** I can judge coverage against a target rather than a feeling.

**AC — Scenario: needs saved and used as the coverage baseline**
- **Given** I am planning the week beginning next Monday
- **When** I set CA 5 on Saturday to require 2 × Pha chế and 1 × Bếp
- **Then** those needs are stored against that date and period, are not visible to any staff member, and become the denominator in the coverage view — per position, and summed as the total headcount shown in the calendar cell.

**Requirements:** FR-O1, FR-S4 · **Effort:** 4 md
**Note:** needs are set per position only, never per sub-position or attribute (§3.3).

---

#### S-3.2 — Administrator sees coverage before assigning
- **As an** Administrator
- **I want to** see registered availability mapped against my staffing needs
- **so that** I know where I have a problem before I start assigning.

**AC — Scenario: a need with no availability behind it is marked distinctly**
- **Given** CA 5 on Saturday needs 2 × Pha chế
- **and Given** no staff member registered availability for that period
- **When** I open the coverage view
- **Then** that need is marked distinctly and prominently as having no registered availability, visually different from a need that is merely understaffed.

**Requirements:** FR-O4 · **Effort:** 4 md (layout taken from the prototype, including the per-period cards on a phone)

---

#### S-3.3 — Administrator sees filled, understaffed and overstaffed slots after assigning
- **As an** Administrator
- **I want to** see each slot's fill status update as I assign
- **so that** I can tell when the week is done.

**AC — Scenario: draft assignments count toward coverage, with or without a position**
- **Given** CA 1 on Monday needs 3 people in total, 2 of them Phục vụ
- **and Given** I have placed 2 people across the whole of CA 1, both still in draft, one given Phục vụ and one with no position yet
- **When** I view the calendar cell and the coverage view
- **Then** the cell shows 2 placed of 3 needed, and Phục vụ coverage shows 1 of 2 — the placed person without a position counts toward the period's headcount but toward no position.

**Requirements:** FR-O4, FR-O29, FR-O31, FR-O42 · **Effort:** 3 md

---

#### S-3.4 — Administrator distinguishes explicit from defaulted availability
- **As an** Administrator
- **I want to** see who actively confirmed all periods versus who simply didn't register
- **so that** I know whose "fully available" is a statement and whose is silence.

**AC — Scenario: defaulted staff are visually distinct**
- **Given** staff A registered all five periods every day and staff B registered nothing
- **When** I open the weekly calendar
- **Then** both appear in every period, but staff B's marker is drawn as "didn't register, counted as free" (dashed) rather than as registered.

**Requirements:** FR-S19, FR-O23 · **Effort:** 2 md

---

#### S-3.5 — Administrator reviews registration against the contract expectation
- **As an** Administrator
- **I want to** see registered days and hours per staff member, with anyone below expectation flagged
- **so that** I can spot a pattern over weeks without blocking anyone this week.

**AC — Scenario: defaulted staff are not flagged**
- **Given** staff A registered 3 days totalling 18 hours and staff B registered nothing
- **When** I open the registration summary
- **Then** staff A is flagged as below the 5-day / 8-hour expectation, staff B is not flagged, and neither flag prevents assignment or publication.

**Requirements:** FR-O22, FR-S19 · **Effort:** 2 md

---

#### S-3.6 — Coverage counts a shared assignment against both positions
- **As an** Administrator
- **I want to** see when one person is covering two positions in the same shift
- **so that** I don't read two filled slots as two bodies on the floor.

**AC — Scenario: shared marker on a multi-position assignment**
- **Given** one staff member is assigned to CA 3 carrying both Phục vụ and Thu Ngân – Offline
- **When** I view coverage for CA 3
- **Then** both positions count as one filled slot each, and both are visibly marked shared; no headcount-floor warning is produced; **and Given** another assignment carries "Pha chế - Matcha, Trà", **Then** it counts once toward Pha chế and is not marked shared, because sub-positions don't count separately.

**Requirements:** FR-O29, FR-O30, FR-O45 · **Effort:** 3 md

---

#### S-3.7 — Positions carry optional sub-positions and attributes
- **As an** Administrator
- **I want to** say which station a barista is on, or that a server is also running tables
- **so that** the schedule says what each person is actually doing without splitting headcount.

**AC — Scenario: label and colour follow the position**
- **Given** I give a placed staff member Pha chế with sub-positions Matcha and Trà
- **When** I look at the calendar and the side panel
- **Then** the label reads "Pha chế - Matcha, Trà", the marker is Pha chế's colour, and headcount, coverage, rate and the qualification flag all read Pha chế only.

**Requirements:** FR-O45 (staff-side display *proposed pending client confirmation*), §3.3 · **Effort:** 3 md
**Note:** seven positions — QC (Trong, Ngoài), Thu Ngân – Offline, Thu Ngân – Online, Pha chế (Trà sữa, Matcha, Trà, Bồn), Phục vụ (attribute Bưng bàn), Kiểm tra đơn, Bếp. Sub-positions and attributes are optional and may be combined.

---

#### S-3.8 — Coverage counts only assignments that span the whole period
- **As an** Administrator
- **I want to** see a shift that starts mid-period as partial rather than as a filled slot
- **so that** 16:00–21:00 doesn't make CA 5 look covered when nobody is there from 21:00.

**AC — Scenario: partial count shown separately**
- **Given** CA 5 needs 1 × Pha chế and the only Pha chế assignment runs 16:00–21:00
- **When** I view coverage for CA 4 and CA 5
- **Then** neither period counts it as filled, and each shows it as a separate partial count.

**Requirements:** FR-O38 *(proposed pending client confirmation — keep the rule configurable)* · **Effort:** 2 md

**E3 subtotal: 23 md**

---

### E4 — Shift Assignment

#### S-4.1 — Administrator sees who registered, on one weekly calendar
- **As an** Administrator
- **I want to** see every staff member in every shift period they can work, for the whole week, on the same calendar I schedule on
- **so that** I can build the schedule without cross-referencing 40 submissions or switching screens.

**AC — Scenario: everyone shown individually, by nickname**
- **Given** registration for next week is open or has closed
- **When** I open the week
- **Then** every active staff member appears in each period they registered — or in every period, drawn as "counted as free", if they registered nothing — as a pill labelled with their nickname, never collapsed into a count; each cell shows the people placed against the headcount needed and how many more are free but not placed; cells grow to fit; the full name shows on hover; **and** while registration is still open the calendar is read-only.

**Requirements:** FR-O3, FR-O10, FR-O23, FR-O42, FR-A11 · **Effort:** 12 md *(above the Ready limit; split at planning into read view, states and hover/tap)*
**Note:** colour identifies the position, never the person (FR-O42). The prototype is the reference layout.

---

#### S-4.2 — Administrator narrows the calendar by staff, with spreadsheet-style filters
- **As an** Administrator
- **I want to** tick any combination of staff, and select whole groups at once through filters
- **so that** I can compare candidates for a slot without the other 38 in the way.

**AC — Scenario: filter options mirror the selection**
- **Given** all 40 staff are ticked
- **When** I untick the master checkbox under the staff search and then tick "Qualified for: Bếp" in Filters
- **Then** exactly the staff qualified for Bếp are ticked and on the calendar; every other filter option shows ticked, "–" or empty according to how many of the staff it describes are now selected; and the coverage figures still reflect the full week rather than the selection.

**AC — Scenario: click a name to show only them**
- **Given** any selection
- **When** I click a staff member's name, or the name of a filter option
- **Then** only that person, or only the staff that option describes, is selected and on the calendar, and the master checkbox shows "–" offering Select all; **and when** I tick a checkbox instead, that person or group is added to the selection as before.

**AC — Scenario: scoped to the dates in view**
- **Given** the calendar shows Wednesday only (S-4.17) and staff A registered Monday and Thursday only
- **When** I look at the staff list and the Filters panel
- **Then** staff A is listed under "Not in these dates", dimmed, with an empty, disabled checkbox and a name I cannot click; filter options and their counts describe only the staff in range; placing and placed-as options read Wednesday's assignments while "Free all week" and short hours read the whole week; an option describing no one stays listed, unticked and disabled; **and when** I move to Thursday, staff A is back in the main list, ticked or not as I left them.

**AC — Scenario: Select all means all**
- **Given** the calendar shows Wednesday only and staff A is not in range
- **When** I use Deselect all, Select all or Invert selection
- **Then** staff A's selection changes too, though their row stays disabled until they are back in range.

**Requirements:** FR-O11, FR-O47 · **Effort:** 8 md *(above the Ready limit; split at planning into staff list with master checkbox and the out-of-range section, and Filters panel)*
**Note:** the ticked staff list is the only selection state — no chips, no clear action, no OR/AND logic. The selection is a view setting and is not logged.

---

#### S-4.3 — Administrator places people first, then gives positions
- **As an** Administrator
- **I want to** put people into shifts without choosing positions yet, and give positions once the whole week is in view
- **so that** I can make sure every shift has enough hands before deciding who does what.

**AC — Scenario: placed without a position while in draft**
- **Given** registration has locked and staff A registered CA 1 on Monday
- **When** I place staff A in CA 1 without a position
- **Then** a draft assignment is created with no position, drawn as "placed, no position yet", counted toward CA 1's headcount but toward no position, and not visible to staff A.

**AC — Scenario: assignment need not align to a period**
- **Given** staff A registered CA 4 and CA 5 on Friday
- **When** I set them 16:00–21:00 as Pha chế in the shift dialog
- **Then** the assignment is created in draft with that exact range, is not visible to staff A, and counts as partial for CA 4 and CA 5 (S-3.8).

**Requirements:** FR-O2, FR-O29, FR-O31, FR-O38 · **Effort:** 7 md *(above the Ready limit; split at planning)*
**Note:** the step order is guidance, not a lock. The only enforcement is the publish gate (S-5.2). A shift created after publication must carry a position from the start.

---

#### S-4.4 — Administrator assigns two positions to one shift
- **As an** Administrator
- **I want to** record one assignment carrying two positions, one marked primary
- **so that** a person covering two functions is one record, paid once.

**AC — Scenario: primary position drives the rate, hours are not doubled**
- **Given** staff A has no staff-specific rate
- **and Given** Phục vụ and Bếp have different default rates
- **When** I assign staff A 13:00–17:00 carrying both, with Bếp marked primary
- **Then** the assignment is shown with Bếp marked primary and both positions' colours, and staff A's pay estimate (S-7.8) counts 4 hours once at the Bếp default rate; the hours are not apportioned between positions.

**Requirements:** FR-O29, FR-C12, FR-C13 · **Effort:** 3 md

---

#### S-4.5 — Out-of-availability assignment is flagged, not blocked
- **As an** Administrator
- **I want to** assign someone outside their registered availability when we've already agreed it on Zalo
- **so that** the system records the decision instead of arguing with it.

**AC — Scenario: flagged and permitted**
- **Given** staff A did not register CA 1 on Wednesday
- **When** I place them in CA 1 on Wednesday through Add in that cell (S-4.14)
- **Then** the assignment is created, is visibly flagged as out-of-availability, requires no staff acceptance, and is written to the audit log.

**Requirements:** FR-O12, NFR-1 · **Effort:** 2 md

---

#### S-4.6 — Out-of-qualification assignment is flagged, not blocked
- **As an** Administrator
- **I want to** assign someone to a position outside their qualified list, and filter to qualified staff when I'd rather not
- **so that** qualification helps me choose without ever stopping me.

**AC — Scenario: flagged, permitted, and filterable**
- **Given** staff A is not qualified for Bếp
- **When** I assign them to Bếp
- **Then** the assignment is created and visibly flagged, pay and bonus are unaffected; **and When** I select only the staff qualified for Bếp through Filters (S-4.2), or filter the day roster to Bếp (S-4.15), **Then** staff A is not among them.

**Requirements:** FR-O32, FR-A1 · **Effort:** 2 md

---

#### S-4.7 — Administrator edits an assignment in place
- **As an** Administrator
- **I want to** change a shift's time or holder without destroying its history
- **so that** the original registration, every change and the resulting payout stay connected.

**AC — Scenario: modification preserves record identity**
- **Given** an assignment exists for staff A, 07:00–11:00
- **When** I change it to 08:00–12:00
- **Then** the same assignment record is updated in place, the change history retains the previous values, actor and timestamp, and no replacement record is created.

**Requirements:** FR-O14, NFR-1 · **Effort:** 4 md

---

#### S-4.8 — Administrator executes a swap in one action
- **As an** Administrator
- **I want to** swap two staff members' shifts in a single action
- **so that** recording an agreement they already reached on Zalo takes one step, not four.

**AC — Scenario: both assignments reassigned in one action**
- **Given** staff A holds Monday CA 1 and staff B holds Tuesday CA 5, both published
- **When** I execute a swap between them with a reason
- **Then** both assignments are reassigned as modifications in place, keeping their positions, each staff member sees their new shift the next time they open My shifts, and both changes are logged with the reason.

**Requirements:** FR-O15, FR-O14 · **Effort:** 3 md
**Note:** the swap notification (FR-N7) is added with E6 in Phase 2.

---

#### S-4.9 — Administrator cancels an assignment
- **As an** Administrator
- **I want to** cancel a published shift
- **so that** a shift that is no longer happening stops being paid and stops counting.

**AC — Scenario: cancellation reopens coverage**
- **Given** staff A holds a published Saturday CA 5 assignment
- **When** I cancel it
- **Then** it disappears from staff A's My shifts, the slot returns to the coverage view as unfilled, and the cancellation is logged.

**Requirements:** FR-O8 · **Effort:** 2 md
**Note:** the cancellation notification (FR-N7) is added with E6 in Phase 2.

---

#### S-4.10 — Administrator records an early departure with its replacement
- **As an** Administrator
- **I want to** shorten one assignment and extend another in the same action
- **so that** both people are paid correctly for what they actually worked.

**AC — Scenario: shorten and cover as one recorded change**
- **Given** staff A is assigned 15:00–23:00 and leaves at 19:00, with staff B covering
- **When** I shorten staff A's assignment to 19:00 and assign staff B 19:00–23:00 in the same action
- **Then** staff A's assigned hours become 4, staff B's cover shift is 4 hours and carries a position, both pay estimates update, and both changes are logged against the one action.

**AC — Scenario: more than 30 minutes early needs cover**
- **Given** staff A is assigned 15:00–23:00
- **When** I shorten it to 22:00 without choosing anyone to cover
- **Then** the save is refused until a covering staff member is chosen; **and When** I shorten it to 22:40 instead, **Then** I can approve it without cover and the shift stays unchanged.

**Requirements:** FR-O20 *(cover block above 30 minutes proposed pending client confirmation — keep it configurable)*, FR-O29, FR-C1, NFR-1 · **Effort:** 4 md
**Note:** the notifications to both people (FR-N7) are added with E6 in Phase 2.

---

#### S-4.11 — Administrator notes a short early departure
- **As an** Administrator
- **I want to** attach a note to a shift without changing it
- **so that** an approved sub-30-minute departure is recorded without altering pay.

**AC — Scenario: note recorded, assignment untouched**
- **Given** staff A left 20 minutes early with my approval
- **When** I attach a note to that shift
- **Then** the note is stored against the shift, pay and bonus eligibility are unchanged, and the assignment time range is not modified.

**Requirements:** FR-O21 · **Effort:** 1 md

---

#### S-4.12 — Administrator places people and gives positions from a side panel
- **As an** Administrator
- **I want to** select someone on the calendar and handle their whole day in a panel beside it
- **so that** I can assign and still see the rest of the week.

**AC — Scenario: several periods at once, calendar still visible**
- **Given** registration has locked and the week is in draft
- **When** I select staff A's pill in Tuesday CA 1
- **Then** a side panel opens beside the calendar (a bottom sheet on a phone) showing staff A's full name, qualified positions, what they registered this week and the shifts and hours already placed; I can select any of Tuesday's periods and place them, give one or more positions with optional sub-positions (the first is primary), clear the position, or take them off; I can step to the previous or next day for staff A; and each change is logged with the day's assignments before and after.

**AC — Scenario: after publication**
- **Given** the week is published
- **When** I open the panel
- **Then** placing without a position, clearing a position and taking someone off are unavailable — new shifts must carry a position, and published shifts are cancelled or shortened through S-4.9 and S-4.10.

**Requirements:** FR-O43, FR-O29, NFR-1 · **Effort:** 6 md *(above the Ready limit; split at planning)*
**Note:** assignments with times that don't match the periods are shown in the panel but edited in the shift dialog.

---

#### S-4.13 — Neighbouring periods with the same position become one assignment
- **As an** Administrator
- **I want to** the system to join CA 2 and CA 3 into one 11:00–15:00 shift when they carry the same position, and split it when they don't
- **so that** lateness rules are measured against the shift the person actually works.

**AC — Scenario: join, then split**
- **Given** staff A is placed as Phục vụ in CA 2 and CA 3 on Monday
- **When** the panel saves
- **Then** one assignment 11:00–15:00 is stored; **and When** I change CA 3 to Thu Ngân – Offline, **Then** it splits into 11:00–13:00 Phục vụ and 13:00–15:00 Thu Ngân – Offline, and the existing record is modified in place where possible.

**Requirements:** FR-O44, FR-O14 · **Effort:** 4 md
**Note:** the joined assignment is the unit for coverage, the double-booking check, lateness recording and the deduction and anomaly thresholds — 60 minutes late on 11:00–15:00 is a 120-minute deduction, not an anomaly, as the client confirmed on 2026-09-28.

---

#### S-4.14 — Administrator adds someone who didn't register a period
- **As an** Administrator
- **I want to** use Add in a calendar cell to place a person the cell doesn't show
- **so that** I can use someone who agreed on Zalo to work a shift they didn't register.

**AC — Scenario: default list and search**
- **Given** registration has locked
- **When** I choose Add in Wednesday CA 1
- **Then** the list shows only active staff who didn't register that period, by full name, each with any other shift they hold that day and their qualified positions; **and When** I search by name, **Then** staff who did register, staff counted as free and staff already in this shift also appear, tagged as such; **and When** I pick someone, **Then** they are ticked in the staff list and open in the side panel with Wednesday CA 1 selected.

**Requirements:** FR-O46, FR-O12 · **Effort:** 3 md

---

#### S-4.15 — Administrator reads one day as a roster below the calendar
- **As an** Administrator
- **I want to** see every staff member against the five periods of one day, grouped by how they registered
- **so that** I can balance shifts between people before placing them.

**AC — Scenario: grouped, sortable, opens the panel**
- **Given** registration has locked
- **When** I open the roster for Thursday
- **Then** staff are grouped into registered that day, registered nothing (counted as free) and registered other days only; each row shows qualified positions, the shifts already placed that week and anything held that day, including drafts; the registered group sorts morning to evening by default, or by periods or hours registered; I can filter to staff qualified for a position or with nothing that day; and selecting a cell opens the side panel for that person with that period selected.

**Requirements:** FR-O41 · **Effort:** 5 md
**Note:** added at the Owner's request on 2026-09-27 and kept below the calendar on 2026-09-28. On a phone each staff member is a card with the five periods in a row.

---

#### S-4.16 — The same person cannot be placed twice at the same time
- **As an** Administrator
- **I want to** be stopped from giving someone two overlapping shifts on the same day
- **so that** one person is never counted in two places at once.

**AC — Scenario: overlap refused**
- **Given** staff A holds 07:00–11:00 on Monday
- **When** I try to create or edit another assignment for staff A overlapping 10:00–12:00 on Monday
- **Then** the save is refused and names the conflicting assignment. Out-of-availability and out-of-qualification remain flags, not blocks.

**Requirements:** FR-O39 *(proposed pending client confirmation — keep it configurable)* · **Effort:** 2 md

---

#### S-4.17 — Administrator views the calendar by day, three days or week, and looks back at earlier weeks
- **As an** Administrator
- **I want to** switch the calendar between one day, three days and the whole week, move backwards and forwards, and open earlier weeks
- **so that** I can focus on a busy day without losing the week, and check what was scheduled before.

**AC — Scenario: views and navigation**
- **Given** the calendar opens on the Week view of the week being scheduled, Monday to Sunday
- **When** I choose 3 Days and press next twice
- **Then** the calendar shows three days at a time, moving three days on each press and staying in 3 Days; a range crossing into the next week shows each day with its own week's data; switching to Week moves to the Monday of the first day shown; next stops at the end of the week being scheduled; **and** a single action returns me to the week being scheduled.

**AC — Scenario: earlier weeks are read-only**
- **Given** I go back to a published earlier week
- **When** I open a cell or a staff member's side panel there
- **Then** I see who registered and what they held, the day is marked as published, there is no Add action, the side panel offers no changes, and a notice says the week is only there to look at; weeks whose data has been purged under the retention rule are not reachable.

**AC — Scenario: only staff with something on these dates**
- **Given** the Day view on Wednesday, staff A registered Monday and Thursday only, staff B registered nothing for the week, and staff C holds an assignment on Wednesday outside their availability
- **When** the calendar renders
- **Then** staff A is not on the calendar, staff B is (counted as free), and staff C is; **and** if no one is in range the calendar says that no one registered for these dates.

**AC — Scenario: phone**
- **Given** a phone and the 3 Days or Week view
- **When** the calendar renders
- **Then** it shows one day at a time with a tab for each day in view; in the Day view, previous and next replace the tabs.

**Requirements:** FR-O47, FR-O10, FR-O42, FR-O43, NFR-5 · **Effort:** 5 md
**Note:** reads registrations and assignments by date range rather than by one week; the side panel's previous/next day steps through the days in view. The prototype is the reference layout.

**E4 subtotal: 73 md**

---

### E5 — Draft, Publish & My Schedule

#### S-5.1 — Draft assignments are invisible to staff
- **As an** Administrator
- **I want to** build the whole week without anyone seeing a half-finished schedule
- **so that** staff aren't planning around an assignment I'm about to move.

**AC — Scenario: draft is hidden server-side**
- **Given** I have created draft assignments for next week
- **When** a staff member requests their schedule for that week, by UI or direct API call
- **Then** nothing is returned for that week, and the restriction is enforced server-side.

**Requirements:** FR-O31, FR-S4, NFR-2 · **Effort:** 3 md

---

#### S-5.2 — Publish is gated on unassigned active staff and on shifts with no position
- **As an** Administrator
- **I want to** be stopped from publishing while an active staff member has no shift at all, or while any shift has no position
- **so that** I don't discover I overlooked someone on Monday morning, and every staff member's schedule says what they are there to do.

**AC — Scenario: publish blocked with the unassigned staff listed**
- **Given** three active staff members have no assignment in the week
- **and Given** one deactivated staff member also has none
- **When** I attempt to publish
- **Then** publication is blocked, the three active staff members are listed, and the deactivated one is excluded from the check.

**AC — Scenario: publish blocked by shifts with no position**
- **Given** everyone active has a shift or has been skipped
- **and Given** two draft assignments still have no position
- **When** I attempt to publish
- **Then** publication is blocked and both assignments are listed, each with a link that opens the side panel where I give it a position.

**Requirements:** FR-O33, FR-O29, FR-A8 · **Effort:** 4 md

---

#### S-5.3 — Administrator clears the gate with a skip reason
- **As an** Administrator
- **I want to** mark a staff member as deliberately unscheduled with a reason
- **so that** the gate reflects a decision I made rather than something I forgot.

**AC — Scenario: skip clears the gate and creates no assignment**
- **Given** a staff member is listed on the publish gate
- **When** I mark them "Skip this staff this week" with the reason *on vacation*
- **Then** the gate clears for that staff member, no assignment is created, pay and bonus are unaffected, and the skip is logged with actor, timestamp, staff member and week.

**Requirements:** FR-O33, NFR-1 · **Effort:** 2 md

---

#### S-5.4 — Administrator publishes the week
- **As an** Administrator
- **I want to** publish the finished week as one explicit action
- **so that** everyone sees their schedule at the same moment.

**AC — Scenario: publication makes schedules visible**
- **Given** the publish gate is clear
- **When** I publish the week
- **Then** every assignment in that week transitions to published, each staff member can see their own assignments only, and the publication is logged.

**Requirements:** FR-O31, FR-S11 · **Effort:** 2 md
**Note:** the publish notification (FR-N6, FR-N3) is added with E6 in Phase 2. In Phase 1 the Administrator tells staff on Zalo.

---

#### S-5.5 — Staff views their own schedule
- **As a** staff member
- **I want to** see my shifts for the published week on my phone
- **so that** I stop asking on Zalo what I'm working.

**AC — Scenario: own schedule only, read-only**
- **Given** the week is published and I hold four assignments
- **When** I open My Schedule
- **Then** I see my four assignments with date, time range and "Position - sub-position" label, in read-only form, with any lateness recorded against them (S-7.6) and my pay estimate (S-7.8), and no other staff member's shifts.

**Requirements:** FR-S11, FR-S4, FR-O45 *(sub-positions shown to staff proposed pending client confirmation)*, NFR-2, NFR-5 · **Effort:** 3 md

---

#### S-5.6 — Post-publication change takes effect immediately
- **As a** staff member
- **I want to** see my published shift change as soon as the Administrator changes it
- **so that** I don't turn up at the old time.

**AC — Scenario: change applies without republishing the week**
- **Given** the week is published and my Wednesday shift is 07:00–11:00
- **When** the Administrator changes it to 11:00–15:00
- **Then** my schedule shows 11:00–15:00 the next time I open it, the change is logged with both values, and the week is not published a second time; **and** any shift the Administrator creates after publication is published on creation and carries a position.

**Requirements:** FR-O31, FR-O29 · **Effort:** 1 md
**Note:** the change notification with previous and new values (FR-N7) is added with E6 in Phase 2. Until then the Administrator tells the staff member on Zalo.

**E5 subtotal: 15 md**

---

### E6 — Notifications & Push · **DEFERRED TO PHASE 2**

> Not built in Phase 1. Staff learn that the week is published, or that a shift changed, by opening the app — and in practice because the Administrator says so on Zalo, which is still in use. See the FR-N5 consequence noted in §1.

#### S-6.1 — Notification delivered by push and always kept in the inbox
- **As a** staff member who declined push permission
- **I want to** still find every message in the app
- **so that** a permission choice delays a message rather than losing it.

**AC — Scenario: inbox written regardless of push outcome**
- **Given** my push permission is denied or my subscription has expired
- **When** the system sends me any notification
- **Then** the message is written to my in-app inbox with its event type and timestamp, marked unread, and the failed push delivery is recorded against it.

**Requirements:** FR-N1, NFR-9 · **Effort:** 6 md
**Enabler:** Web Push + VAPID keys, service worker per client, subscription store, expiry and revocation handling.

---

#### S-6.2 — Registration window opens
- **As a** staff member
- **I want to** be told when registration opens
- **so that** I register early rather than at the last minute.

**AC:** **Given** the window opens Thursday 00:00 · **When** the window transitions to open · **Then** every active staff member receives the notification in their selected language.
**Requirements:** FR-N4, FR-N2 · **Effort:** 1 md

---

#### S-6.3 — Pre-cutoff reminder to staff who registered nothing
- **As a** staff member who hasn't registered
- **I want to** be warned that silence will be read as full availability
- **so that** I'm not assigned a shift I can't work because I forgot.

**AC — Scenario: targeted reminder states the default**
- **Given** it is Friday 18:00 and I have no registration for the upcoming week
- **When** the reminder is sent
- **Then** I receive a message stating the cutoff and stating explicitly that no registration will be read as full availability; staff who have registered do not receive this message.

**Requirements:** FR-N5, FR-S19 · **Effort:** 2 md
**Note:** this is the primary mitigation for the forgot-vs-available risk. Do not descope it.

---

#### S-6.4 — Pre-cutoff reminder to everyone
- **As a** staff member who registered on Thursday
- **I want to** be reminded before the window closes
- **so that** I can still revise if my week changed.

**AC:** **Given** it is Saturday 09:00 · **When** the reminder is sent · **Then** all active staff receive it, including those who have already registered.
**Requirements:** FR-N13 · **Effort:** 1 md

---

#### S-6.5 — Administrator is alerted to an uncovered need after publication
- **As an** Administrator
- **I want to** be told when a staffing need is still uncovered after I publish
- **so that** I find out before the shift, not during it.

**AC:** **Given** a published week has an understaffed slot · **When** publication completes · **Then** I receive a notification identifying the date, period and position.
**Requirements:** FR-N9, FR-O4 · **Effort:** 2 md

---

#### S-6.6 — No notification leaks another staff member's data
- **As a** staff member
- **I want to** receive messages about my own shifts only
- **so that** the privacy rule holds outside the app as well as inside it.

**AC — Scenario: swap notification names no one else's schedule**
- **Given** the Administrator swaps my shift with another staff member's
- **When** I receive the change notification
- **Then** it states my previous and new values only, and discloses nothing about the other staff member's availability, schedule or pay.

**Requirements:** FR-N3, NFR-2 · **Effort:** 2 md

**E6 subtotal: 14 md — Phase 2**, plus S-1.9 (4 md, install onboarding) moved here from E1. The schedule-published, shift-changed, swap, cancellation, early-departure and anomaly notifications stripped from the Phase 1 stories (S-4.8, S-4.9, S-4.10, S-5.4, S-5.6, S-7.4, S-16.3) are added to those surfaces here.

---

### E7 — Attendance & Lateness (manual interim)

#### S-7.1 — Administrator records an actual arrival time
- **As an** Administrator
- **I want to** record when someone actually arrived, only when they were late
- **so that** the routine on-time case costs me nothing.

**AC — Scenario: no entry means on time**
- **Given** a shift has no recorded arrival time
- **When** the week is evaluated
- **Then** the shift is treated as an on-time arrival with no late penalty and no deduction; **and Given** I record an arrival 25 minutes after the assigned start, **Then** the lateness rules are applied to that recorded time and the entry is logged with me as actor.

**Requirements:** FR-O24, FR-O25, NFR-1 · **Effort:** 3 md

---

#### S-7.2 — Grace window and late penalty threshold
- **As an** Administrator
- **I want to** the system to apply the 10-minute grace and the minute-11 penalty automatically
- **so that** I don't apply the rule inconsistently across 40 staff.

**AC — Scenario: the two thresholds behave differently**
- **Given** the grace is configured at 10 minutes
- **When** an arrival is recorded 8 minutes late · **Then** no late penalty and no deduction are recorded
- **When** an arrival is recorded 12 minutes late · **Then** a late penalty is recorded, the week's bonus preview shows "lost" (S-7.7), and pay is untouched.

**Requirements:** FR-S9, FR-O25 · **Effort:** 3 md

---

#### S-7.3 — Deduction from minute 16 at twice the elapsed lateness, recorded in minutes
- **As an** Administrator
- **I want to** the deduction to be worked out continuously per minute
- **so that** the rule the client agreed to is applied exactly, ready for payroll.

**AC — Scenario: continuous, not banded, and not priced in Phase 1**
- **Given** a staff member has a published shift
- **When** an arrival is recorded 20 minutes late
- **Then** a 40-minute deduction and the late-penalty flag are recorded and shown as "20 min late, 40 min deduction"; no VND amount is shown and nothing is taken off pay.

**Requirements:** FR-S17 · **Effort:** 1 md
**Note (decision 2026-09-29):** Phase 1 has no payroll, so deductions stay in minutes. Phase 2 payroll (S-9.1) converts the recorded minutes at the applicable rate and applies them.

---

#### S-7.4 — Anomaly when the deduction would exceed the shift
- **As an** Administrator
- **I want to** the system to stop calculating and ask me when the lateness is implausible
- **so that** a recording failure isn't charged to a staff member.

**AC — Scenario: both deduction and penalty are held**
- **Given** a staff member is assigned an 8-hour shift
- **When** an arrival is recorded 4 hours late
- **Then** no deduction is recorded, no late penalty is recorded, the shift is listed as held for review on the Lateness screen (with a count on its menu entry), and that week's bonus preview shows "on hold" rather than lost.

**AC — Scenario: measured against the joined shift**
- **Given** a staff member holds one joined assignment 11:00–15:00 (S-4.13)
- **When** an arrival of 12:00 is recorded
- **Then** a 120-minute deduction is recorded, not an anomaly, because 120 minutes is less than the 4-hour shift.

**Requirements:** FR-S18, FR-O44 · **Effort:** 3 md
**Note:** the anomaly notification to the Administrator (FR-N10) is added with E6 in Phase 2.

---

#### S-7.5 — Administrator resolves an anomaly
- **As an** Administrator
- **I want to** choose how an anomaly is settled and have the week recalculate from my decision
- **so that** one judgement call fixes the whole downstream chain.

**AC — Scenario: resolution re-evaluates and cascades**
- **Given** an open anomaly on a staff member's Tuesday shift
- **When** I confirm they arrived on time, with a reason
- **Then** both the deduction and the late-penalty flag are cleared, the decision is logged with actor, timestamp and reason, and the week's bonus preview is re-evaluated.

**AC — Scenario: reclassified as a no-show**
- **Given** an open anomaly on a staff member's Tuesday shift
- **When** I reclassify it as a no-show, with a reason
- **Then** the shift counts as zero hours for the pay estimate and for the 8-hour day count, no late penalty is recorded, and the decision is logged.

**Requirements:** FR-T18 (no-show effect *proposed pending client confirmation*), NFR-1 · **Effort:** 4 md
**Note:** the resolution options are: apply the full deduction, apply a reduced number of minutes, confirm on-time, correct the arrival time, or reclassify as no-show. Cascading the streak forward (FR-B7, FR-B8) arrives with the bonus engine in Phase 2; the resolutions recorded in Phase 1 are its input.

---

#### S-7.6 — Staff can see every lateness recorded against them
- **As a** staff member
- **I want to** see what was recorded against my shift and what it costs me
- **so that** I can raise it with the Owner the same day rather than discovering it at payday.

**AC — Scenario: the record and its consequence are visible in my own view**
- **Given** the Administrator records an arrival 18 minutes after my assigned start
- **When** I open my own record
- **Then** I see the recorded arrival time, the late-penalty flag and the deduction in minutes (36 minutes), with no VND amount, labelled as **not applied to pay** until the payroll module exists.

**Requirements:** FR-O26 · **Effort:** 2 md
**Note (Phase 1):** FR-N8 push delivery arrives with E6 in Phase 2. Until then this is pull, not push — the staff member has to open the app, so **the Administrator should tell them directly on Zalo when they record a penalty.** A penalty a staff member discovers weeks later is a dispute; one they hear about the same day is a conversation. Say so in the training material.

---

#### S-7.7 — Administrator sees the effect on the weekly bonus while recording
- **As an** Administrator
- **I want to** see, where I record an arrival, what it does to the staff member's week
- **so that** I understand the consequence before I save it.

**AC — Scenario: provisional preview, no amount**
- **Given** a staff member has 5 days of 8+ assigned hours this week and no late penalty
- **When** I enter an arrival 12 minutes late
- **Then** before saving I see late penalties incurred, days of 8+ assigned hours reached, and the week's status changing from "on track" to "lost", labelled provisional; no bonus amount is paid or confirmed.

**Requirements:** FR-B17 *(proposed pending client confirmation)*, FR-B1 · **Effort:** 2 md
**Note:** confirming and paying the bonus belongs to the weekly close in Phase 2 (FR-B10, FR-B13–B16).

---

#### S-7.8 — Pay estimate from assigned hours × rate
- **As an** Administrator, and as a staff member for myself
- **I want to** see a simple pay figure for the week from the shifts placed and the rate set
- **so that** the rate in the staff account means something before payroll exists.

**AC — Scenario: estimate shown, clearly not payroll**
- **Given** staff A has no own rate, the Pha chế default is 28.000 ₫/h, and staff A holds 30 assigned hours this week with Pha chế as primary
- **When** the Administrator opens the week's staff summary, or staff A opens My shifts
- **Then** 840.000 ₫ is shown as an **estimate** — assigned hours × rate, before lateness deductions and bonus — and staff A can see only their own figure, enforced server-side.

**AC — Scenario: no position yet**
- **Given** staff A has no own rate and one draft shift with no position
- **When** the estimate is shown
- **Then** that shift's hours are listed as "no rate yet — no position" rather than priced at zero.

**Requirements:** *not yet in the PRD — decision 2026-09-29, needs a PRD patch*; reads FR-C1, FR-C12, FR-C13, NFR-2 · **Effort:** 3 md
**Note:** a no-show (S-7.5) counts as zero hours. The estimate is display only; the weekly close and payment are Phase 2 (E9).

---

#### S-7.9 — Administrator looks back at an earlier week's lateness
- **As an** Administrator
- **I want to** open an earlier week on the Lateness screen
- **so that** I can see who was late, how it was classified and what I decided, without searching the activity log.

**AC — Scenario: earlier week, read-only**
- **Given** last week had three late arrivals, one of them held and then resolved as a no-show with a reason
- **When** I choose last week on the Lateness screen
- **Then** each day lists its shifts with the recorded arrival and classification in minutes and status, the week's summary shows penalties per staff member and the bonus preview, there is no Record, Change, Clear or Review action, and a notice says the week can only be looked at; the reasons remain in the activity log.

**Requirements:** FR-O24, FR-O25, FR-B17 *(proposed pending client confirmation)* · **Effort:** 2 md

**E7 subtotal: 23 md**

---

### E8 — Control Centre · **DEFERRED TO PHASE 2**

> Not built in Phase 1. Phase 1 has fewer pending-item types than the full system, and each lives on the surface that owns it: unresolved lateness anomalies appear as a list on the lateness surface itself (S-7.5), unassigned active staff appear on the publish gate (S-5.2), and uncovered needs appear on the coverage view (S-3.2). That is workable at Phase 1 scope. It stops being workable once payroll, bonus holds and clock exceptions arrive, which is why E8 lands in Phase 2 rather than later.

#### S-8.1 — Administrator lands on the state of the week
- **As an** Administrator
- **I want to** see where the cycle is the moment I sign in
- **so that** I don't have to check four screens to know whether anything is due.

**AC — Scenario: cycle state on arrival**
- **Given** I sign in as Administrator
- **When** the control centre loads
- **Then** I see whether the registration window is open and when it next changes, how many active staff have and have not registered for the upcoming week, whether the upcoming week is draft or published, and whether the previous week's pay period is open, blocked or closed.

**Requirements:** FR-O34, FR-O36 · **Effort:** 5 md

---

#### S-8.2 — Administrator sees everything awaiting a decision
- **As an** Administrator
- **I want to** one list of every pending item with a count and a link
- **so that** removing the approval queue doesn't mean decisions get lost.

**AC — Scenario: each item type is listed with a route to resolution**
- **Given** there are 2 unresolved anomalies, 1 unstaffed shift from a deactivated staff member, and 3 active staff with no assignment in an unpublished week
- **When** the control centre loads
- **Then** each kind is listed with its count and a link to the surface that resolves it.

**Requirements:** FR-O35 · **Effort:** 4 md

---

#### S-8.3 — Items clear on resolution, not on dismissal
- **As an** Administrator
- **I want to** items to disappear only when the underlying condition is fixed
- **so that** the list is a true statement of what is outstanding.

**AC — Scenario: no manual dismissal for actionable items**
- **Given** an unresolved anomaly is listed
- **When** I attempt to dismiss it without resolving it
- **Then** no dismiss action is offered; **and When** I resolve the anomaly on its own surface, **Then** it leaves the control centre automatically.

**Requirements:** FR-O37 · **Effort:** 2 md

**E8 subtotal: 11 md — Phase 2**

---

### E16 — Responsive Parity (cross-cutting)

NFR-10 is absolute: **no function is exclusive to one form factor.** NFR-5 requires every information-dense surface — the weekly calendar, the coverage grid, the weekly close list, payroll review — to have a genuine phone layout, not a compressed desktop one. There are no tiers: since 2026-09-18 **Phase 1 delivers this in full for both audiences**, and the approved prototype is the reference for every Phase 1 phone layout. Only S-16.1 and S-16.4 wait for Phase 2, because the control centre and the inbox don't exist before then. This epic carries the work that the per-feature epics assume but do not pay for.

The distinction that matters: the Administrator working from a phone mid-service is not a degraded desktop user. They are handling something happening in front of them right now — someone arrived late, someone is leaving early, a slot is short. Those are different tasks from drafting a week, and they need different screens.

#### S-16.1 — Administrator handles the floor from a phone
- **As an** Administrator on the floor during service
- **I want to** see the state of the week and today's coverage on my phone
- **so that** I find out a slot is short while I can still do something about it.

**AC — Scenario: control centre and coverage are usable at 390px**
- **Given** I am signed in as Administrator on a phone
- **When** I open the control centre
- **Then** the cycle state and every outstanding item are legible and actionable without horizontal scrolling or pinch-zoom, and each item still links to the surface that resolves it.

**Requirements:** NFR-5, NFR-10, FR-O34–O37, FR-O4 · **Effort:** 5 md · **Phase 2** (follows E8)

---

#### S-16.2 — Administrator records a lateness and resolves an anomaly from a phone
- **As an** Administrator who has just watched someone arrive 20 minutes late
- **I want to** record it on my phone there and then
- **so that** the bonus engine rests on something I saw rather than on what I remember at the weekend.

**AC — Scenario: lateness recorded and anomaly resolved on a phone**
- **Given** I am on a phone and a staff member's shift is in progress
- **When** I record their actual arrival time
- **Then** the entry is saved with me as actor and the lateness rules are applied; **and When** I open an unresolved anomaly, **Then** all five resolution options and the mandatory reason field are usable at 390px.

**Requirements:** NFR-5, FR-O24, FR-O25, FR-T18 · **Effort:** 4 md · **PHASE 1 — do not defer**
**Note:** this is the story that makes the interim manual arrangement (§3.7.1) actually work. Recording lateness only from a desk means recording it hours later, or not at all.

---

#### S-16.3 — Administrator adjusts a published shift from a phone
- **As an** Administrator arranging cover for someone leaving early
- **I want to** shorten one assignment and extend another from my phone
- **so that** both people are paid correctly without me going back to a desk.

**AC — Scenario: cancel, shorten-and-cover, and note all work on a phone**
- **Given** the week is published and I am on a phone
- **When** I shorten a staff member's assignment and assign cover in the same action
- **Then** both changes are saved and both are logged; **and When** I attach a note to a shift, **Then** it is saved without altering the assignment.

**Requirements:** NFR-5, FR-O8, FR-O20, FR-O21 · **Effort:** 4 md · **PHASE 1**

---

#### S-16.4 — Administrator's notification inbox on a phone
- **As an** Administrator who just tapped a push notification
- **I want to** land on something usable rather than a desktop layout
- **so that** the alert leads to an action instead of a reminder to check later.

**AC:** **Given** I tap a push notification on my phone · **When** the app opens · **Then** I land on the relevant item, and the inbox listing every message — delivered by push or not — is legible at 390px.
**Requirements:** NFR-5, NFR-9, FR-N1 · **Effort:** 1 md · **Phase 2** (there is no inbox until E6)

---

#### S-16.5 — Administrator builds the week on a phone, one day at a time
- **As an** Administrator away from my desk
- **I want to** see who registered, place people and give positions from my phone
- **so that** building or fixing the week doesn't need a 1440px screen.

**AC — Scenario: a designed one-day view, not a squeezed grid**
- **Given** I open the week on a phone
- **When** the view loads
- **Then** the calendar shows one day at a time with every filtered person still shown by nickname, a tap on a person opens the side panel as a bottom sheet over the lower part of the screen, each period carries its Add action, the Filters panel opens below its button, and every placing and position action from S-4.12 works.

**Requirements:** NFR-5, NFR-10, FR-O10, FR-O11, FR-O42, FR-O43, FR-O46 · **Effort:** 7 md · **PHASE 1** *(above the Ready limit; split at planning)*
**Note:** a **different view**, not a responsive version of the desktop grid — the calendar spans ~40 staff × 7 days × 5 periods (§4.12). Designed and approved in the prototype, so the design share is small.

---

#### S-16.6 — Staff register and view their schedule on a desktop browser
- **As a** staff member without a usable phone that week
- **I want to** register availability and check my schedule in a desktop browser
- **so that** a broken phone doesn't cost me my shifts.

**AC:** **Given** I open the app in a desktop browser · **When** the registration window is open · **Then** I can register, edit and delete availability, and view My shifts, recorded lateness and my pay estimate, with no function missing relative to the phone.
**Requirements:** NFR-10 · **Effort:** 2 md · **PHASE 1**

---

#### S-16.7 — Coverage, roster, staff and log as cards on a phone
- **As an** Administrator on a phone
- **I want to** the table-shaped screens to become cards
- **so that** I can read them without horizontal scrolling or pinch-zoom.

**AC:** **Given** I am on a phone · **When** I open coverage, the day roster, the staff list or the activity log · **Then** coverage shows one card per period plus a shift list, the roster shows one card per staff member with the five periods in a row, and staff and log entries are cards, all legible at 390px.
**Requirements:** NFR-5, FR-O4, FR-O41 · **Effort:** 3 md · **PHASE 1**

---

#### S-16.8 — Every Phase 1 surface checked in both layouts on real devices
- **As an** Administrator and as a staff member
- **I want to** every screen to have been tested on a real phone and a desktop browser
- **so that** a layout that only works in one of them isn't discovered after go-live.

**AC:** **Given** the Phase 1 release candidate · **When** each surface is run through its acceptance criteria on a real phone at 390px and on a desktop browser · **Then** both pass, and the results are recorded per surface.
**Requirements:** NFR-5, NFR-10 · **Effort:** 4 md · **PHASE 1**
**Note:** PRD §4.13 names this cost explicitly: each surface has two layouts to check on real devices, and that belongs in the Phase 1 estimate.

**E16 subtotal: 30 md — of which 24 md in Phase 1 (S-16.2, S-16.3, S-16.5, S-16.6, S-16.7, S-16.8) and 6 md in Phase 2 (S-16.1, S-16.4).**

---

**Phase 1 story total, revised 2026-10-04: 209 md** (E1 37 · E2 14 · E3 23 · E4 73 · E5 15 · E7 23 · E16 24). It was 200 md on 2026-09-29: +9 md for the calendar views and earlier weeks (S-4.17, 5 md), the date-scoped staff list and filters (S-4.2, +2 md) and earlier weeks on the Lateness screen (S-7.9, 2 md), PRD v1.7–v1.8. It was 136 md on 2026-09-08. Where the 64 md added on 2026-09-29 came from:

| Change | md | Source |
|---|---|---|
| One weekly calendar with nickname pills, spreadsheet filters, side panel, join/split, Add, day roster, double-booking block (S-4.1, S-4.2 rework; S-4.12–S-4.16) | +28 | PRD v1.3–v1.6 |
| Full responsive parity (S-16.3, S-16.5, S-16.7, S-16.8) | +18 | NFR-5, v1.2 |
| Configuration of shift periods, window, position catalogue, skip reasons (S-1.13, S-1.14) | +9 | CLAUDE.md, decision 2026-09-29 |
| Nickname, default rate per position (S-1.11, S-1.12) | +4 | FR-A11, FR-O40 |
| Sub-positions and attributes, full-period coverage (S-3.7, S-3.8) | +5 | FR-O45, FR-O38 |
| Bonus preview, pay estimate (S-7.7, S-7.8) | +5 | FR-B17, decision 2026-09-29 |
| Position gate, place-without-position, cover rule (S-5.2, S-4.3, S-4.10) | +3 | FR-O29, FR-O33, FR-O20 |
| Install onboarding moved out (S-1.9) | −4 | decision 2026-09-29 |
| Notifications stripped from Phase 1 stories (S-5.4, S-5.6) | −2 | PRD §4.8 |
| Deductions kept in minutes (S-7.3) | −1 | decision 2026-09-29 |
| Design settled by the prototype (S-3.2) | −1 | PRD §5.3 |
| **Net** | **+64** | |

**Moved to Phase 2: 35 md** (E6 14 + S-1.9 4 · E8 11 · E16 remainder 6).

Sprint planning applies a productivity factor — see the roadmap document for the calendar plan.

---

## 4. Phase 2 backlog — story titles and core criteria

**Phase 2 now also carries E6 (Notifications & Push, including S-1.9), E8 (Control Centre) and S-16.1 and S-16.4** — full stories for those are in §3 above, marked *deferred to Phase 2*. Budget an additional ~5 md of rework beyond their original estimates: adding push and a control centre to surfaces already built and accepted is more expensive than building them together would have been.

Full Gherkin to be written at the start of Phase 2, when Phase 1 has settled the data model.

### E9 — Payroll & Weekly Close (23 md)
| ID | Story | Core criterion | Reqs |
|---|---|---|---|
| S-9.1 | Payout auto-calculated from assigned hours, replacing the Phase 1 estimate; lateness deductions recorded in minutes since Phase 1 are converted at the applicable rate and applied | Arriving early never increases pay | FR-C1, FR-C3, FR-S17 |
| S-9.2 | Rate resolved staff-first, then primary position default | No staff rate set → primary position default applies | FR-C2, FR-C13 |
| S-9.3 | Multi-position assignment paid once | Two positions never double the hours | FR-C12 |
| S-9.4 | Special-rate date multiplier | Adjusted portion itemised separately from base pay | FR-C8, FR-O27 |
| S-9.5 | Base pay releases, bonus is gated | Unresolved anomaly withholds bonus only | FR-C11, FR-C6 |
| S-9.6 | Export payout summary (CSV/Excel) | Base, bonus and adjustments itemised separately | FR-C4 |
| S-9.7 | Force-close a period with a logged reason | Permitted after the scheduled close date | FR-C7 |
| S-9.8 | Retroactive adjustment paid in the next open period | Labelled with the week it relates to; closed periods never reopen | FR-C10 |
| S-9.9 | Every payout figure traces to its source | Assignment, manual correction, bonus rule or adjustment | FR-C5 |
| S-9.10 | Payroll review designed for a phone | NFR-5 names payroll review as a dense surface needing a genuine phone layout, not a reflow | NFR-5 |

### E10 — Bonus & Streak Engine (26 md)
| ID | Story | Core criterion | Reqs |
|---|---|---|---|
| S-10.1 | Weekly bonus evaluated from assigned hours | 5 days of 8+ hours **and** zero late penalties across the whole week | FR-B1, FR-B2 |
| S-10.2 | Streak counter increments, pays at 4, resets | Streak bonus recurs every 4 consecutive qualifying weeks | FR-B3, FR-B4 |
| S-10.3 | Week with an open BonusHold shows pending | Not confirmable until the hold is resolved | FR-B2, FR-B14 |
| S-10.4 | Waived penalty re-evaluates and cascades forward | A week-2 waiver in week 5 can make a streak bonus payable retroactively | FR-B7, FR-B8, FR-B9 |
| S-10.5 | Close screen: one list, evidence inline | Days at 8+, penalties, streak position, amount — all without opening a detail view | FR-B12, FR-B13 |
| S-10.6 | Bulk-confirm every clean case in one action | A clean week closes in one action | FR-B15 |
| S-10.7 | Needs-attention sorted to top with the blocker named | Excluded from bulk confirm | FR-B16 |
| S-10.8 | Per-staff override with a logged reason | Available for any staff member, clean or not | FR-B10, FR-B11 |
| S-10.9 | Staff notified at close, not at calculation | Message is never contradicted by a later override | FR-N11 |
| S-10.10 | Weekly close list designed for the phone | A clean week closes in one action at 390px — the bulk-confirm design (FR-B15) makes this cheaper on a phone than on a desktop | NFR-5, FR-B13, FR-B15 |

### E11 — Performance Dashboards (13 md)
| ID | Story | Core criterion | Reqs |
|---|---|---|---|
| S-11.1 | Administrator per-staff performance view | Hours, punctuality, attendance, bonus/streak, payout for a range | FR-P1 |
| S-11.2 | Whole-staff aggregate view | Same metrics across all staff | FR-P2 |
| S-11.3 | Filter and sort by staff, position, date range | — | FR-P3 |
| S-11.4 | Staff self-performance view | Server-side restricted to own record | FR-S10, FR-P5 |
| S-11.5 | Staff sees live bonus progress during the week | Marked provisional until the Administrator closes | FR-S16, FR-B6 |
| S-11.6 | Dashboards usable on a phone | Phone layout per NFR-5 (no function desktop-only) | NFR-5 |

### E12 — Data Retention & Compliance (6 md)
| ID | Story | Core criterion | Reqs |
|---|---|---|---|
| S-12.1 | Aggregates computed and stored at close | Streak counter, qualifying-day counts, payout figures survive the purge | §4.11 |
| S-12.2 | Granular data purged at 35 days once the week is closed | Purge never runs on an open or unreconciled week | §4.11 |
| S-12.3 | Financial and audit records retained for the statutory period | 10 years per Vietnamese accounting law | §4.11 |

---

## 5. Phase 3 backlog — blocked

**Do not estimate or schedule until G51 (presence mechanism) is decided.**

### E13 — Automated Time Clock (26 md, ±40%)
S-13.1 rotating QR + 6-digit token every 30s · S-13.2 dedicated display-device mode · S-13.3 clock-in accepted only on a currently valid code · S-13.4 presence signal validated server-side behind a substitutable interface · S-13.5 concurrent use of one code by many staff · S-13.6 full clock-event record (method, token, presence result, timestamp) · S-13.7 missing clock-in raised as an exception · S-13.8 infrastructure-fault rejection raised as an exception, never a silent failure · S-13.9 shift end recorded as system-generated, never as an observed departure · S-13.10 clock events become the arrival-time source with no downstream rule change.
**Reqs:** FR-S7, FR-T1–T7, FR-T13, FR-O17, FR-O19, NFR-3, NFR-8

### E14 — Break & Presence Monitoring (12 md — provisional, may be cut)
S-14.1 network-side presence monitoring · S-14.2 extended-absence event above a configurable threshold, threshold not trace · S-14.3 informational only on the dashboard, dismissible · S-14.4 staff disclosure.
**Reqs:** FR-T14–T17, FR-N12 · **Blocked on G43–G46 as well as G51.**

### E15 — Administrator Configuration, remainder (Future, 5 md)
Bonus rule parameters · editing special-rate dates beyond what S-9.4 ships · actual-hours reporting (FR-P6, requires a check-out mechanism).
**Reqs:** FR-O18, FR-O27, FR-P6
**Moved to Phase 1 (2026-09-29, per CLAUDE.md):** registration window, position catalogue and skip-reason list (FR-O28 → S-1.14), shift period definitions (FR-O16 → S-1.13), default rates per position (FR-O40 → S-1.12).

---

## 6. Technical enablers and spikes

These are not user stories. They carry no direct user value and must be sized separately, not smuggled into a story.

| ID | Item | When | Effort | Why |
|---|---|---|---|---|
| **SPIKE-1** | iOS web push on the client's actual devices, and the Administrator's browser (B8) | **Before Phase 2 is priced** (moved 2026-09-29) | 2 md | G54 is parked, not resolved. If push fails on the staff's real iPhones, FR-N5 fails, and E2's whole hypothesis weakens. Cheapest possible test, highest possible consequence. |
| **SPIKE-2** | Calendar legibility at 40 staff | **Done** (2026-09-18 – 09-28) | — | Prototype with 40 staff, reviewed with the Owner; density decided in the client feedback of 2026-09-27/28. |
| **SPIKE-3** | Presence factor evaluation (NFC / BLE / GPS / code-only) | Before Phase 3 | 5 md | G51. Blocks all of E13 and E14. |
| **ENABLER-1** | Scheduling data model + Asia/Ho_Chi_Minh handling | Sprint 1 | 4 md | NFR-11. Timestamps stored with timezone so a future config option needs no migration. |
| **ENABLER-2** | Audit log infrastructure | Sprint 1 | included in S-1.7 | Load-bearing: the only record of why a schedule changed. |
| **ENABLER-3** | PWA shell (Phase 1); service worker push and install flow (Phase 2) | Sprint 1 / Phase 2 | included in S-1.9 / S-6.1 | Precondition for push on iOS. |
| **ENABLER-4** | Calendar component (build vs. adopt), able to render the prototype's pill cells and one-day phone view | Sprint 3 | 5 md | Drives E3, E4 and S-16.5. Decide before Sprint 4. |
| **ENABLER-5** | Lateness & bonus rules engine as a pure, unit-testable module | Sprint 8 | 4 md | Same rules run on manual input (Phase 1) and clock input (Phase 3). Isolating them is what makes FR-O25 true. |
| **ENABLER-6** | Environments, CI/CD, backups, restore drill | Phase 0 | 4 md | Payroll data. A restore that has never been tested is not a backup. |

**Enabler and spike total (Phase 0–2): 24 md** (SPIKE-2 done).

---

## 7. Definition of Ready / Definition of Done

**Ready** — a story enters a sprint only when: the persona is specific (not "user"); acceptance criteria have one When and one Then per scenario; the requirement IDs are mapped; any PRD open question it depends on is decided; the Vietnamese wording for user-facing strings is agreed; and the story is estimated at 5 md or less (larger → split first).

**Done** — code merged and reviewed; automated tests cover the acceptance criteria; **any story touching NFR-2 has a negative test proving server-side enforcement**; Vietnamese and English strings both present; audit log entries written where NFR-1 applies; deployed to staging; accepted by Tony against the Gherkin; and checked at 390px on a real phone and on a desktop browser — for **every** story, not only staff-facing ones, against the phone layout in the prototype (NFR-5).

---

## 8. Items that block story readiness

Status as of 2026-09-29, checked against the repo.

| # | Item | Status | Blocks | Needed by |
|---|---|---|---|---|
| **B1** | Is a mid-period rate change retroactive within the open pay period? | **Open, moved to Phase 2.** Phase 1 has no payroll; the pay estimate simply uses the current rate (S-7.8) | S-9.2 | Phase 2 |
| **B2** | Wireframe v1 reconciliation (PRD §5.1 O1) | **No longer blocks Phase 1.** The approved prototype is the reference for every Phase 1 screen (PRD §5.3). Wireframe v1 still needs reconciling for Phase 2/3 screens | E8, E9, E10, E11 design | Phase 2 design |
| **B3** | End-to-end walkthrough against the finished rule set (PRD §5.1 O2) | **Partly done.** Registration → recorded lateness has been walked in the prototype. The weekly close is still to walk | Phase 2 build | Phase 2 |
| **B4** | G51 presence mechanism | Open (PRD §5.2) | All of E13, E14 | Before Phase 3 |
| **B5** | Does a Skip record suppress the FR-O22 below-contract flag for that week? | **Resolved: no.** A skip only satisfies the publish gate and has no other effect (FR-O33; SkipRecord, PRD §4.10) | — | — |
| **B6** | What happens to an assignment that straddles Sunday 23:00–23:59 at the period boundary? | **Resolved.** The last shift ends at 23:00 when the shop closes; 23:59 is only the calculation cutoff (FR-C9) | — | — |
| **B7** | Who is the Superadmin in practice, and what is the support SLA? | **Who: resolved** — the system provider (PRD §3.1, §5 Resolved). **Response time:** goes into the maintenance contract; support hours are in the client proposal §6.2 | Contract | Phase 0 |
| **B8** | Which browser and OS does the Administrator actually use? Safari on macOS needs "Add to Dock" for push; Chrome and Edge do not | **Open, moved to Phase 2** with SPIKE-1 and S-1.9 — it only matters for push | S-1.9, S-16.1 | Before Phase 2 is priced |
| **B9** | NFR-5 tier assignment per surface | **Closed — no longer applies.** Full parity in Phase 1, no tiers (NFR-5, 2026-09-18) | — | — |
| **B10** | Is a Phase 1 penalty computed but not deducted? | **Decided 2026-09-29:** Phase 1 records and classifies lateness in minutes and status, shows no VND deduction and applies nothing to pay; it shows a pay estimate of assigned hours × rate. Tell the client explicitly (client proposal §1, §4) | S-7.3, S-7.6, S-7.8 | Phase 0 (in the SOW) |
| **B11** | The date Zalo stops being the scheduling fallback, which sets E6's deadline | **Open.** Phase 1 relies on the Administrator chasing non-registrants on Zalo (PRD §4.13) | E6 scheduling | Before Phase 2 is scheduled |
| **B12** | Eight rules proposed in the prototype await client confirmation: FR-O38, FR-O39, FR-O20 cover rule, FR-T18 no-show effect, FR-B17, FR-A7, FR-O40, FR-O45 staff-side display (PRD §5.1 O3, `docs/decisions/pending-confirmation.md`) | **Open.** Build them configurable, not hardcoded | S-1.5, S-1.12, S-3.7, S-3.8, S-4.10, S-4.16, S-7.5, S-7.7 | Phase 1 sign-off |
| **B13** | The pay estimate (S-7.8) is not yet in the PRD | **Open.** Needs a PRD patch through the claude.ai process (CLAUDE.md) | S-7.8 | Before Sprint 8 |
