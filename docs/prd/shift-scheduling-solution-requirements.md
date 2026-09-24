# Shift Scheduling & People Management System
### Solution & Requirements Document

---

**Version:** 1.2 (working copy, unapplied) · **Last updated:** 2026-09-18 · **Owner:** Tony
**Status:** In review. Phase 1 scope restated per the 2026-09-08 narrowing (§4.13). Wireframe v1 predates this revision — see §5.3.

---

## 1. Problem Summary

| # | Problem | Impact |
|---|---|---|
| 1 | Manual shift scheduling via Zalo for ~40 staff | Weekly bottleneck; heavy manual consolidation |
| 2 | Reactive management — no centralized system | Difficult to handle shift adjustments, cross-shifts, performance changes |
| 3 | Manual compensation processing | Error-prone, time-consuming, distracts from strategic work |

---

## 2. Solution Overview

A custom shift management system with a calendar-style interface — similar in feel to Google Calendar (click-to-select, drag-and-drop), used here purely as a **reference point for the client to visualize the interaction model**, not as the platform the product is built on. The system is purpose-built to support role-based access, owner-controlled scheduling, code-gated time tracking, and payroll logic that a generic calendar app cannot provide natively.

**Design principle: the system is a record of decisions, not a negotiation tool.** Discussion between staff, and between the Owner and staff, continues to happen on Zalo, where the team already works. Agreements are reached there first; the system then records the outcome. This is why there are no in-app approval queues or request/accept handshakes — by the time a change reaches the calendar, it has already been agreed. What the system provides instead is a single source of truth, an audit trail of every change, and automatic payroll and bonus calculation.

**Zalo sits outside the system boundary.** It is where people talk to each other, and the product neither reads from it nor writes to it. There is no Zalo integration, no Official Account, and no bot. Everything the system needs to tell someone is delivered through **its own in-app notifications**.

**Four connected modules:**

1. **Account Management** — centralized, Administrator-controlled creation and management of staff accounts and roles; the access layer everything else sits on top of.
2. **Staff Availability Registration** — staff register the shifts they can work each week by selecting from five fixed daily shift periods, within a defined weekly window. Registration means "I can work this time," not "this is my shift."
3. **Owner/Administrator Control Center** — the Administrator's landing surface, showing the state of the scheduling cycle and every item awaiting a decision (FR-O34–FR-O37); the consolidated, filterable view of all staff availability; direct shift assignment and schedule editing; and the performance dashboard.
4. **Time Tracking, Compensation & Bonus Engine** — QR/code-gated clock-in tied to assigned shifts, feeding automated payroll and an attendance-based bonus calculation.

**Core modules:**

- **Account Management** (Administrator-facing): create, edit, and deactivate staff accounts; assign roles
- **Availability Registration** (Staff-facing): select from five fixed daily shift periods, in whole periods only, to register weekly availability
- **Shift Assignment** (Administrator-facing): consolidated, filterable view of all staff availability (toggle any combination of staff on/off), used to assign each staff member to a specific shift and position
- **My Schedule** (Staff-facing): view own assigned shifts, read-only, once published
- **Coverage Dashboard** (Administrator-facing): registered availability against staffing needs; filled/understaffed slots after assignment
- **Time Clock** (Staff-facing): clock in by scanning a QR code or entering a 6-digit code displayed on an in-shop device, rotating every 30 seconds
- **Payroll Engine** (Administrator-facing): auto-calculated pay per staff per week, closed Sunday and paid Monday
- **Bonus Engine** (Administrator-facing): weekly attendance bonus and 4-week streak bonus, calculated automatically
- **Performance Dashboard** (Administrator-facing): combined time-tracking + salary view, per staff or team-wide
- **My Performance** (Staff-facing): own time-tracking, bonus progress, and pay history only — no visibility into other staff
- **Notifications** (both): delivered by web push, with an in-app inbox as fallback

---

## 3. Business Flow Requirements

*(Describes how the system should behave from a process/user-journey perspective — role-agnostic of implementation.)*

### 3.1 Roles

| Role | Description |
|---|---|
| **Superadmin** | Held by the system provider; full technical access across the deployment for setup, support, and maintenance on the client's behalf |
| **Administrator (Owner)** | The client; manages staff accounts, defines staffing needs, assigns and edits all schedules, oversees payroll, bonuses, and performance |
| **Staff** | Registers own weekly availability, clocks in/out on assigned shifts, views own schedule and pay |

### 3.2 Account Provisioning Flow (Administrator)

1. Administrator creates a Staff account directly in the Account Management module (name, contact info, qualified positions, rate configuration).
2. Administrator shares the login credentials with the staff member directly (e.g., in person, via Zalo) — there is no staff self-registration path.
3. Staff logs in using the provided credentials to access Availability Registration, My Schedule, and the Time Clock.
4. Administrator can edit a staff account's profile, qualified positions, or rate configuration at any time.
5. When a staff member leaves, the Administrator deactivates (not deletes) their account — this revokes login access while preserving their historical schedule, time-clock, and payout records for audit purposes. Any shifts already assigned to them in the future are **left in place and flagged for the Administrator to reassign** (FR-A10). The system does not cancel them automatically, because a silent cancellation would remove coverage without anyone noticing.
6. Only the Administrator and Superadmin can create, edit, or deactivate Staff accounts; Staff cannot self-register or change their own role.

### 3.3 Shift Structure

The shop operates **seven days a week with no closed day**, from 07:00 to 23:00. The day is divided into five fixed shift periods, which act as the selectable building blocks for registration:

| Shift | Time | Duration |
|---|---|---|
| **CA 1** | 07:00 – 11:00 | 4 hours |
| **CA 2** | 11:00 – 13:00 | 2 hours |
| **CA 3** | 13:00 – 15:00 | 2 hours |
| **CA 4** | 15:00 – 17:00 | 2 hours |
| **CA 5** | 17:00 – 23:00 | 6 hours |
| | **Full day** | **16 hours** |

Registration is made in whole periods. A staff member selects the periods they can work; they do not adjust the boundaries. Assignments, by contrast, are arbitrary time ranges set by the Administrator and need not align with these periods (3.5).

**Note on the period lengths.** CA 2, CA 3 and CA 4 total only 6 hours between them, so no combination of mid-day periods alone reaches 8 hours — any 8-hour day must include CA 1 or CA 5. A staff member available only between 11:00 and 17:00 will therefore trigger the sub-8-hour warning every day, even after selecting every period they can work.

This is intentional and requires no special handling. The contract expects 5 days at 8 hours; someone who can only ever reach 6 genuinely does not meet it, and the Administrator should see that. Since the warning never blocks anything (FR-S3), the Administrator can simply disregard it for staff whose reduced availability has already been agreed.

**Positions.** A staff member is assigned to a shift *and* to one or more positions. Six positions are configured for v1, fixed in code (FR-O28):

| Position (VI) | Position (EN) |
|---|---|
| Kiểm tra đơn | Order Check |
| Thu Ngân – Online | Cashier – Online |
| Thu Ngân – Offline | Cashier – In-store |
| Phục Vụ | Server |
| Pha Chế | Barista |
| Bếp | Kitchen |

**Qualified positions.** Each staff member's profile lists the positions they are able to work (FR-A1). This is an aid to scheduling, not a permission: the Administrator can assign anyone to any position, and an assignment outside the qualified set is flagged rather than blocked (FR-O32) — the same treatment an out-of-availability assignment receives (FR-O12). The list is also what the assignment and performance views filter on.

Online and in-store cashiering are **separate positions**, not variants of one, so each can carry its own headcount need and its own default rate.

"Position" is the job performed on a shift. It is distinct from the account **role** (Superadmin / Administrator / Staff) in 3.1, which governs access rather than work.

### 3.4 Weekly Availability Registration Flow (Staff)

1. Administrator defines the week's staffing needs (positions, headcount required per shift) before the registration window opens. This is for the Administrator's own planning — it is not shown to staff as a set of selectable slots.
2. The registration window opens **Thursday 00:00** and closes **Saturday 15:00**, covering the week that begins the following Monday.
3. Within this window, staff register availability by **clicking the shift periods they can work** on each day. A **"Select all shifts"** button registers all five periods for a given day in one action.
4. **Registration is in whole shift periods only.** Staff select the periods they can work and do not adjust start or end times. Registration answers one question — "can you work this period?" — and nothing more.

   Where someone's real availability doesn't align with a period boundary (free from 16:00 rather than 17:00, for example), that is arranged with the Administrator on Zalo and reflected in the **assignment**, not in the registration. This keeps registration a simple, unambiguous input and leaves all fine-grained scheduling where the negotiation already happens.
5. **The employment contract expects at least 5 working days per week at 8 hours each.** Neither part is enforced in the registration flow. A staff member may register a day totalling fewer than 8 hours, or fewer than 5 days in the week, and the system will accept it — a warning is shown, but nothing is blocked.

   This is deliberate. Exceptions arise regularly and are agreed with the Administrator on Zalo; blocking the submission would only push those staff into registering nothing at all, which would cost the Administrator the information entirely. Instead the system displays each staff member's registered days and total hours, and **flags anyone below the contract expectation** so patterns can be reviewed over time.
6. Within the window, staff may freely:
   - **Create** — register shifts for a day
   - **Read** — view their own registered availability only (not other staff's)
   - **Update** — change which shift periods are registered
   - **Delete** — remove a day's registration
   Any change is reflected immediately in the staff member's own view.
7. Staff do **not** choose a position, and registration is **not** a work commitment. It means "I can work this time." The official schedule is decided entirely by the Administrator (3.5).
8. The system prevents a staff member from registering overlapping time within their own submissions. Overlap **across different staff** is expected and normal — multiple people available at the same time is what coverage depends on.
9. **A staff member who registers nothing at all for the week is treated as fully available** — any day, any shift. Registration exists to record *constraints*, so an absence of constraints means there are none.

   Anyone who cannot work a particular day or period must register explicitly, exactly as everyone else does. A staff member who is free the whole day uses the **"Select all shifts"** action to register all five periods in one tap.

10. At the window's defined cutoff, all registered availability locks automatically. The UI switches from editable to read-only, and the locked data becomes the input for the Administrator's assignment step.

### 3.5 Shift Assignment Flow (Administrator)

1. Once the registration window closes, the Administrator gains access to a consolidated view of **all** staff's registered availability for that week.
2. The Administrator can filter this view to show any combination of staff — one, several, or all — via a checkbox-style calendar selector (the same interaction pattern as toggling calendars on and off in Google Calendar). Each staff member's availability is visually distinguishable when multiple are shown at once, so overlaps and gaps across the team are visible at a glance.
3. Working from this view, the Administrator builds the week's schedule by assigning each staff member to specific shifts and positions. An assignment may carry more than one position where a staff member covers two functions in the same shift (FR-O29); one is marked primary and determines the rate (FR-C13). Assignment is at the Administrator's discretion, informed by the week's staffing needs and what each staff member registered.
4. The Administrator **may assign outside a staff member's registered availability**. The system flags such an assignment visually so it is a deliberate, visible act rather than an accident, but does not block it and does not require in-app acceptance — any necessary agreement has already been reached on Zalo.
5. Before the week can be published, the system lists any **active staff member with no assignment at all** in that week. The Administrator either assigns them a shift or marks them **Skip this staff this week**, choosing a reason: on vacation, registered too few shifts, or enough staff already (FR-O33).

   This is a coverage check rather than a warning about the staff member. Anyone who registered nothing is treated as available for every period (FR-S19), so the people most likely to appear on this list are the ones with the fewest constraints — they are here because no shift was given to them, not because anything is wrong. The gate exists because the ordinary reason someone has no shifts is that they were overlooked, and the ordinary cost of that is discovering it on Monday morning.
6. Assignments are **draft** while the Administrator works, and are not visible to staff at any point during drafting. When the week is ready, the Administrator **publishes** it as an explicit action: each staff member's personal schedule becomes visible ("My Schedule") and a notification is sent (FR-O31, FR-N6). Changes made after publication take effect immediately and notify the affected staff member individually (FR-N7); the week is not published a second time.
7. Where a staffing need has no registered availability behind it at all, the coverage view marks it plainly (for example, "No one registered") so the Administrator can see the gap and decide what to do. The system does not prescribe a resolution process — in practice this is rare.

### 3.6 Post-Publication Schedule Changes (Administrator)

All changes after the schedule is published are made **directly by the Administrator**. There is no in-app request, approval, or acceptance step — the conversation happens on Zalo first, and the system records the agreed outcome.

1. The Administrator can adjust, reassign, or cancel any published shift at any time.
2. **Shift swaps** follow the same path: two staff agree between themselves on Zalo, inform the Owner, and the Owner reassigns both shifts directly. The system does not mediate the swap.
3. Every change is written to the audit log with actor, timestamp, the previous and new values, and a reason where required (NFR-1). Because there is no approval workflow, this log is the sole record of what changed and why — it carries the weight the approval queue would otherwise have carried.
4. Affected staff are notified of any change to their schedule.
5. Changes to an existing shift (time adjustment, reassignment, swap) **modify that assignment record in place**, preserving its identity and change history rather than deleting and re-creating it. This keeps the original registered time, every subsequent change, and the resulting payout traceable to one another.

### 3.7 Time Tracking Flow — *deferred*

> **Status: deferred.** Automated time tracking is not in the initial build. The presence factor is unresolved (G51) and the whole mechanism is held until it is. Until then, lateness is recorded manually by the Administrator (3.7.1), and everything downstream — late penalties, deductions, the bonus engine — continues to work unchanged from that input.
>
> The specification below is retained for the phase in which it is built.

1. A **dedicated peripheral device** in the shop, used for no other purpose, displays a **QR code and a 6-digit numeric code**, both regenerated every **30 seconds**.
2. A staff member starts their working-time counter by either **scanning the QR code** or **entering the 6-digit code** in the app.
3. Clock-in succeeds only when **both** conditions are met:
   - The submitted code is currently valid (**proves the moment** — the staff member is reading the display right now), and
   - A second signal confirms the staff member is physically on the premises (**proves the place**).

   Neither check is sufficient alone. The code alone could be photographed and shared over Zalo; a location signal alone could be used by someone who never started their shift. Together they are substantially harder to defeat than either is separately.

   > **The presence factor is under review.** Shop wifi was the original choice, but the client is considering alternatives. Until this is settled, the requirement is that *some* presence signal exists, not that it is wifi specifically — see G51.
4. A **single code may be used by multiple staff members simultaneously** within its 30-second window. Codes are not consumed on use — several people arriving together can all clock in from the same displayed code.
5. **There is no check-out scan.** The counter stops automatically at the end time of the staff member's **assigned** shift. Staff perform one action per shift — the check-in scan — and nothing at the end.

   This is a deliberate trade of evidence for friction. End of shift is the worst moment to ask for an extra step, and a forgotten scan would cost the staff member their bonus until the Administrator corrected it. Early departure is instead captured through the assignment record (3.8), which stays accurate for operational reasons rather than depending on staff diligence.

6. If a staff member never scans in, the shift is flagged as an **exception** for Administrator review.
7. A grace window of 10 minutes (FR-S9, configurable) around the assigned start time is allowed without penalty; any variance beyond that is logged and feeds the late-penalty and bonus calculations (3.8.3 and 3.10).
8. If a staff member cannot clock in normally (display device offline, staff wifi down, phone issue), the event is flagged as an **exception** for Administrator review and manual correction.

### 3.7.1 Manual Lateness Recording — *interim*

While automated time tracking is deferred, the Administrator records lateness by hand.

1. **On time is the default.** No entry is required for a staff member who arrives on time. The Administrator only records exceptions, so the routine case costs nothing.
2. When someone arrives late, the Administrator records the **actual arrival time** against that shift.
3. From there, **nothing downstream changes.** The system applies exactly the same rules it would apply to a clock-in timestamp: the 10-minute grace, the late-penalty flag from minute 11, the deduction from minute 16, and the anomaly path when a deduction would exceed the shift (3.8.3).
4. Each manual entry is written to the audit log with the Administrator as actor (NFR-1).

**What this arrangement gives up.** The system now assumes everyone was on time unless the Administrator says otherwise. A late arrival that goes unobserved produces no penalty and no effect on the bonus. The bonus therefore rests on the Administrator's attention rather than on a recorded fact — acceptable as an interim measure, and one of the clearest arguments for building the time clock in a later phase.

**When the time clock arrives.** Clock events become the primary source of arrival times, and manual entry narrows to its proper role: correcting a clock record that is wrong or missing (FR-O9). No rule needs to change at that point, only the input.

**Known limitation, accepted: an unrecorded no-show still counts toward the bonus.** Because the 8-hour daily test reads assigned hours (FR-B1) and an absence of any entry is read as a normal shift (FR-O24), a staff member who does not turn up at all will still be credited with that day unless the Administrator cancels or shortens the assignment (FR-O8, FR-O20).

The system does not detect this on its own — until the time clock is built there is no signal that anyone was absent. Handling no-shows is therefore an Administrator responsibility, exercised through the same calendar edit used for early departure (3.8). The client has accepted this as an interim limitation. It resolves on its own in Phase 3, when a shift with no clock-in is raised as an exception (FR-T6).

### 3.8 Early Departure Flow

Early departure is handled through the schedule, not the time clock.

**Leaving more than 30 minutes early — replacement required**

1. The staff member arranges cover with a colleague on Zalo and informs the Administrator.
2. The Administrator **shortens the departing staff member's assignment** to the actual end time, and **creates or extends an assignment** for the covering staff member across the remaining window.
3. Because pay follows assigned hours, both people are automatically paid correctly — the departing staff member for the reduced window, the covering staff member for the time they picked up.
4. The change is recorded in the audit log against both assignments (NFR-1).

This is why no check-out scan is needed for this case: a departure of this size **cannot happen without a schedule change**, and the schedule change is itself the record. The Administrator is already editing the calendar to arrange cover.

**Leaving 30 minutes or less early — Administrator discretion**

1. The staff member asks the Administrator directly. No replacement is required.
2. The Administrator approves or declines at their discretion.
3. If approved, the staff member is **paid in full** and the assignment is left unchanged. The Administrator may add a note against the shift for their own records.
4. This is treated as an accepted tolerance: the shift still counts toward the bonus. In practice these cases are rare and arise from genuine emergencies.

> **Known limitation, accepted:** because sub-30-minute departures leave no system record, the actual-hours figure the bonus reads can overstate time worked by up to 30 minutes on such a day. The client has judged this acceptable given the rarity and the decision to pay in full regardless.

### 3.8.1 Break & Presence Monitoring — *on hold*

Staff are allowed roughly **20 minutes** for a meal or break during a shift. Occasionally a break runs materially longer, and the Administrator wants visibility into this without policing every movement.

> **Status: on hold.** The mechanism below assumes staff wifi. With wifi under review as the presence factor (G51), this feature cannot be specified further until that decision is made. Passive break monitoring is the hardest thing to reproduce without a network signal, so if wifi is dropped, this feature may need to be reduced to a manual action or removed from scope.

**Proposed mechanism: network-side presence monitoring.**

1. The staff wifi network reports which registered staff devices are currently connected. This runs on the network side (router or a small local agent), not inside the staff member's app.
2. During an active shift, a continuous absence from the network exceeding a configured threshold is recorded as an **extended-absence event**.
3. Extended-absence events appear on the Administrator's time-tracking dashboard. They are **informational only** — they do not reduce pay, do not create a late penalty, and do not affect bonus eligibility.

**Design constraints this must respect:**

- **Threshold, not a log.** The system records only absences exceeding the threshold, not a continuous presence trace. Recording every disconnection would produce a movement log of each staff member's shift, which is disproportionate to the goal and would be poorly received.
- **Network-side, not app-side.** A phone app cannot reliably monitor its own network state in the background across a full shift — mobile operating systems suspend background activity, and the resulting gaps would be indistinguishable from genuine absence.
- **Not evidence.** A staff member may leave their phone at the counter, or a battery may die, or a stockroom may have no signal. An extended-absence event indicates *something worth a look*, never a proven fact. All downstream use must treat it accordingly.
- **Disclosed.** Staff must be told this monitoring exists and what it records, both as a matter of trust and to keep the system defensible.

*Open questions before this can be built: G43–G46.*

### 3.8.2 Two Counting Mechanisms

The system counts two different things from two different sources, and they never substitute for one another:

| | Source | Used for |
|---|---|---|
| **Work time** | The **assigned shift** on the calendar | Paid hours, and the 8-hour daily test in the bonus rules |
| **Punctuality & presence** | The **time clock** and the presence signal | Whether the staff member arrived on time, and how long they were away during the shift |

The time clock never reduces counted work time. A staff member who arrives inside the grace window works a full shift as far as hours and the bonus are concerned. Lateness affects pay only through the separate deduction below, and affects the bonus only through the late-penalty flag.

This is why early departure has to be handled through the schedule (3.8): since hours come from the assignment, an assignment that is never corrected would keep paying for time that wasn't worked. The replacement requirement is what keeps the assignment honest.

### 3.8.3 Lateness & Late Penalty

**Minutes 0–10 — on time.** A staff member clocking in within 10 minutes of their assigned start is treated as on time. No late penalty, no deduction, and the shift counts in full toward hours and the bonus.

**Minutes 11–15 — recorded as late, no pay impact.** The arrival is flagged as a **late penalty**. This is the flag the bonus engine reads, so it voids that week's 100,000 VND bonus (3.10). Pay is untouched.

**From minute 16 — deduction at 2× per minute.** Every minute of lateness is deducted from the week's pay at **twice** the elapsed time, charged at the staff member's hourly rate. The deduction is continuous, not banded.

| Minutes late | Late penalty (bonus) | Deduction from the week's pay |
|---|---|---|
| 0 – 10 | No | None |
| 11 – 15 | **Yes** | None |
| 16 | Yes | 32 minutes |
| 20 | Yes | 40 minutes |
| 30 | Yes | 1 hour |
| 45 | Yes | 1 hour 30 minutes |
| 120 | Yes | 4 hours |

Formula from minute 16 onward: **deduction = minutes late × 2**.

Note the two thresholds are different and both matter. **Minute 11** costs the weekly bonus. **Minute 16** starts costing pay. A staff member 12 minutes late loses 100,000 VND but no wages; one 16 minutes late loses both.

**When the deduction would exceed the shift — treat as an anomaly, not a deduction**

Because the deduction doubles, it reaches the length of the shift at half the shift's duration: 4 hours late on an 8-hour shift, or 1 hour late on a 2-hour CA 2 shift. At that point the system **stops calculating and starts asking**.

Lateness of this scale is more often a recording failure than a real arrival time — a staff member who forgot to scan at the start and scanned mid-shift produces exactly this pattern, as does a display device that was down at changeover. Applying an automatic deduction here would penalize an infrastructure fault.

So when the computed deduction reaches or exceeds the assigned shift's hours:

1. **No deduction is applied automatically, and no late penalty is recorded.** Both are held, not cancelled.
2. The shift is raised as an **anomaly** on the Administrator's time-tracking dashboard, alongside failed check-ins and other exceptions.
3. That week's bonus is shown as **pending** rather than lost, because the arrival time behind it is not yet trusted.
4. The Administrator reviews and decides: confirm the staff member was on time (clearing both), apply the deduction, apply a reduced amount, correct the arrival time, or treat the shift as a no-show.
5. The decision is logged with a reason (NFR-1), and the week's bonus and streak are re-evaluated from it.

This follows the same principle as the bonus engine: where the data is likely to be wrong, the system presents the case rather than acting on it.

### 3.9 Compensation Flow

**Pay basis: assigned hours.** Pay is calculated from the hours the Administrator assigned on the calendar, not from clocked hours. A staff member who arrives early is not paid for the extra time, because the assignment defines what is owed.

This gives the time clock a specific and narrower role: it **verifies attendance and punctuality**, and it does not itself compute pay. Clock data drives lateness detection, the bonus engine, and exception flagging — not the hourly total on the payslip.

1. **The pay period is the week: Monday to Sunday, paid the following Monday.** It is the same span as the bonus week (3.10), so hours, deductions, the weekly bonus and any streak bonus all settle together and nothing is carried across a boundary. At the close, the system aggregates each staff member's assigned hours for that week.

   The review window is short — the week ends at 23:00 on Sunday and payment follows the next day. Base pay is therefore released unconditionally, since it is computed from assigned hours and requires no judgement. Only the bonus waits on the Administrator's confirmation, and only for staff whose week contains an unresolved anomaly.
2. The bonus engine evaluates weekly and streak bonuses (3.10) from assigned hours, with clock data contributing only the late-penalty count, and adds any earned amounts.
3. Late-arrival deductions (3.8.3) are applied at twice the elapsed lateness for any arrival from minute 16 onward.
4. Administrator-entered adjustments (bonus, deduction, performance-based rate change) are applied.
5. System generates a per-staff payout summary for Administrator review and export.
6. Any manually corrected time entries are logged with a reason, so every payout figure is traceable back to its source (assigned shift, actual clock event, manual correction, or bonus rule).

### 3.10 Bonus & Streak Flow

**Bonus week: Monday to Sunday.**

**Weekly attendance bonus — 100,000 VND**

A staff member earns the weekly bonus when **both** conditions hold for that week:

1. **At least 5 days** on which they worked **8 hours or more**, and
2. **Zero late penalties across the entire week** — not just on the five qualifying days.

The second condition is absolute. A late penalty on any day of the week voids that week's bonus, even if it falls on a sixth or seventh day that wasn't needed to reach the five-day threshold. Working more days does not create slack; it creates more opportunities to lose the bonus.

**Streak bonus — 200,000 VND**

A staff member who earns the weekly bonus in **4 consecutive weeks** receives an additional 200,000 VND, paid in the fourth week alongside that week's regular bonus (total 300,000 VND that week).

Any week in which the weekly bonus is not earned breaks the streak, and the count restarts from zero.

After a streak bonus pays out, the counter **resets to zero and begins again**. The streak bonus therefore recurs: weeks 1–4 pay it, weeks 5–8 pay it again, and so on for as long as the run continues.

**Worked example**

| Week | Days ≥ 8h | Late penalties | Weekly bonus | Streak | Paid |
|---|---|---|---|---|---|
| 1 | 5 | 0 | ✅ | 1 | 100,000 |
| 2 | 7 | 0 | ✅ | 2 | 100,000 |
| 3 | 5 | 0 | ✅ | 3 | 100,000 |
| 4 | 6 | 0 | ✅ | 4 | **300,000** (100k + 200k streak) |
| 5 | 6 | 1 (on day 6) | ❌ | 0 (reset) | 0 |

In week 5 the staff member worked six days with five of them clean, but a single late arrival on the sixth day voids the bonus and resets the streak to zero.

**How the system presents this: bonus potential, not a decision**

The bonus engine reads **assigned hours** for the 8-hour daily test, consistent with how pay is calculated (3.9). Clock data contributes only the late-penalty count. This keeps the two mechanisms separate: arriving four minutes late does not quietly shorten the day below the threshold.

The assignment stays honest because any departure of more than 30 minutes requires a replacement, which forces the Administrator to shorten the assignment (3.8). Departures under 30 minutes are paid in full by decision, so they are a known and accepted tolerance rather than a leak.

However, the system does not decide the bonus. It calculates and presents a **bonus potential** — an indication of who currently qualifies, and why — which the Administrator reviews and confirms during the weekly close. The Administrator remains the one who reconciles the week and pays.

This matters because the underlying data is not always final at the moment it is recorded. A missing clock-in, a presence-check failure, or a disputed late penalty may all still be pending review. Presenting the calculation as a proposal rather than a verdict keeps the Administrator's judgement in the loop, and mirrors how pay itself is handled: the system computes, the Administrator confirms.

**The close has to be fast.** Payment is on the Monday following a week that ends at 23:00 on Sunday (3.9), so the Administrator has roughly one evening to reconcile ~40 staff — 52 times a year. In most weeks nothing will be in doubt.

The close therefore opens on one list, with every unambiguous case already selected and a single action to confirm them all. Only weeks whose outcome could still change — an unresolved anomaly, an unreviewed exception — are separated out, sorted to the top, and labelled with what is blocking them. A clean week is one action; a week with two anomalies is one action plus two decisions.

This is a load-bearing design constraint, not a preference. A close screen requiring forty individual confirmations would recreate, on a Sunday night, exactly the weekly manual bottleneck the system exists to remove.

**Corrections and recalculation**

A late penalty is not final. If the Administrator determines a penalty was incorrectly applied — a display device failure, a network problem, or any other cause outside the staff member's control — and waives or corrects it, then:

1. The week is **re-evaluated** as though the penalty had never existed. If it now meets both conditions, the weekly bonus is restored.
2. The streak is **recalculated forward from that week**. A restored week no longer breaks the chain, so weeks after it may now form a longer streak than previously recorded, and a streak bonus not previously earned may become payable.
3. All restored amounts are traceable to the correction that produced them (NFR-1, FR-C5).

*Why this cascades:* the streak is a running count, so restoring one week changes every week after it. If a penalty in week 2 is waived during week 5, weeks 1–4 may now form a complete 4-week streak, making a 200,000 VND streak bonus payable retroactively even though it was previously calculated as not earned.

**Streak rule, stated plainly**

The streak depends on one thing only: whether the 100,000 VND weekly bonus was earned. Four consecutive earned weeks pay the streak bonus. Any week without the weekly bonus resets the count to zero, regardless of why it was missed.

> **Out of scope:** leave, sick leave, and planned time off are not handled by this system. They continue to be arranged on Zalo, and the Administrator reflects the outcome by editing assignments directly.

### 3.11 Notification Flow

Notifications are delivered **by web push from the installed Progressive Web App**, and are retained in an in-app inbox so that a declined permission delays a message rather than losing it (NFR-9). Zalo is not involved: it remains the team's own communication channel and has no connection to the product.

Push is what makes several of these notifications worth sending at all — a registration reminder or a shift change that only appears at next login arrives too late to act on. On iOS this works only for an app added to the Home Screen, which makes installation an onboarding requirement rather than an optional nicety (NFR-10).

Notifications cover:
- Registration window opening/closing reminders
- Registration reminder before the window closes, sent to staff who have not registered — noting that no registration will be read as full availability
- A lateness recorded against a staff member's shift, sent to that staff member
- Assigned schedule published for the week
- Any change to a staff member's published shift
- Clock-in exception raised (to Administrator)
- Extended-absence event during a shift (to Administrator) — *provisional, see 3.8.1*
- Understaffed-slot alerts (to Administrator)
- Weekly bonus earned or missed, and streak progress

### 3.11.1 Control Centre

The Administrator's home screen. It answers two questions on arrival: **where is the week**, and **what needs me**.

The first is the cycle state — is registration open, who hasn't registered, is next week published, is last week's pay closed. The second is a single list of everything waiting: anomalies to resolve, shifts left unstaffed by a departure, needs no one covers, staff not yet scheduled, bonuses that cannot be confirmed.

It holds no state of its own. Every item is resolved on the surface that owns it, and disappears from the list when the underlying condition clears rather than when the Administrator dismisses it. The purpose is narrow: with no approval queue and no Zalo integration, there is no other mechanism that surfaces a pending decision. Without this screen the Owner would have to remember to go looking.

### 3.12 Performance Review Flow (Administrator)

1. Administrator selects a staff member — or "All Staff" for a team-wide view — and a date range.
2. System displays a combined view: assigned hours, punctuality (on-time vs. late beyond the grace window, and the tier reached), attendance (no-shows), bonus and streak status, and total payout for that period. Worked hours are not reported separately from assigned hours in the MVP — see FR-P6.
3. This view is read-only reporting for evaluation purposes — it does not itself change pay or status. Any resulting action (e.g., a rate change or discretionary bonus) is entered separately through the Compensation Flow (3.9), keeping reporting and action clearly separated.

### 3.13 Staff Self-Performance View

1. A staff member can view their own time-tracking history (assigned hours, punctuality, attendance), bonus and streak progress, and payout history for any past week.
2. This view is restricted to the logged-in staff member's own data only — consistent with the same privacy principle applied to availability and scheduling: staff never see another staff member's schedule, performance, or pay.
3. Like the Administrator's dashboard, this is read-only.

---

## 4. Technical Requirements

*(Describes what the system must do at a functional/data/architecture level — implementation-facing.)*

> **Note on retired IDs:** requirement IDs are not reused after removal, so that older documents and wireframes referencing them remain unambiguous. Retired: **FR-S6**, **FR-S13**, **FR-O5**, **FR-O6**, **FR-O13** (approval/request-workflow requirements, removed per the Zalo-first design principle); **FR-T8**–**FR-T12** (scan-based check-out, replaced by automatic check-out at the assigned shift end); and **FR-S15** (staff-adjustable shift start time, replaced by whole-period registration with adjustment handled at assignment).

### 4.1 Functional Requirements — Account Management Module

| ID | Requirement |
|---|---|
| FR-A1 | System shall allow the Administrator to create a Staff account (profile, contact info, qualified positions, rate configuration). Qualified positions are advisory and do not restrict assignment (FR-O32). |
| FR-A2 | System shall allow the Administrator to edit a Staff account's profile, qualified positions, and rate configuration. |
| FR-A3 | System shall allow the Administrator to deactivate (not delete) a Staff account, revoking login access while preserving historical schedule/time/payroll records. |
| FR-A4 | System shall restrict staff account creation, editing, and deactivation to the Administrator and Superadmin roles; Staff accounts cannot self-register or self-elevate permissions. |
| FR-A5 | System shall support a Superadmin role (system provider) with full technical access across the deployment, for setup, support, and maintenance — distinct from the Administrator's day-to-day operational access. |
| FR-A6 | System shall require a staff member to authenticate before accessing any scheduling, time-clock, or personal data functions. |
| FR-A7 | System shall provide password reset **only through the Administrator**. There is no staff-facing self-service reset; the Administrator issues a new credential and communicates it directly, consistent with how accounts are created (FR-A1). The credential shall be set from a field on the staff member's own account record rather than from a one-off action: the Administrator types or generates a password, saves it, and the value stays on screen until the record is closed so it can be passed on. It shall never be redisplayed afterwards, since only a hash is stored (NFR-6). The account record shall show the username and the date the password was last set. *(proposed pending client confirmation)* |
| FR-A8 | System shall exclude deactivated staff from day-to-day views (staff lists, availability calendar, assignment surfaces) by default, while keeping their records fully retrievable through an explicit "include former staff" filter and in historical payroll and performance reporting. |
| FR-A9 | System shall log every Superadmin access session — actor, timestamp, and the records viewed or modified — and shall make that log visible to the Administrator without requiring a support request. |
| FR-A10 | System shall leave a deactivated staff member's future assignments in place rather than cancelling them, and shall surface them prominently to the Administrator as **unstaffed shifts requiring action** — visible on the coverage view (FR-O4) and the control centre — so that deactivation never silently empties the schedule. |

### 4.2 Functional Requirements — Staff Module

| ID | Requirement |
|---|---|
| FR-S1 | System shall allow Create/Read/Update/Delete of a staff member's own availability registration, by selecting from the five configured daily shift periods, restricted to the active registration window (Thursday 00:00 – Saturday 15:00). The window boundaries are **fixed in configuration for v1**, not editable by the Administrator; see FR-O28. |
| FR-S2 | System shall block a staff member from registering time that overlaps **their own** other registrations. Overlap with another staff member's availability is unrestricted and expected. |
| FR-S3 | System shall warn, but not block, when a registered day totals fewer than 8 hours or when a staff member registers fewer than 5 days in the week. Both thresholds shall be configurable, and neither shall prevent submission or assignment. |
| FR-S4 | System shall restrict Read access so a staff member can only view their own registered availability, assigned schedule, and pay data — never another staff member's, and never any assignment still in draft (FR-O31). |
| FR-S5 | System shall auto-transition the registration UI from editable to read-only at the registration window's defined cutoff timestamp. |
| FR-S7 *(Phase 3)* | System shall allow the working-time counter to start only when **both** conditions are satisfied: (a) the submitted code — scanned via QR or entered manually — is currently valid, and (b) the configured **presence signal** confirms the staff member is physically on the premises. Failure of either check shall block the clock-in. The presence mechanism itself is not yet chosen (G51); shop wifi is the default candidate. |
| FR-S8 | System shall auto-stop the working-time counter at the **assigned** shift end time. No check-out action is required from the staff member. |
| FR-S9 | System shall treat a clock-in within **10 minutes** of the assigned start time as on time, and shall record a **late penalty** for any clock-in from minute 11 onward. The grace duration shall be configurable. |
| FR-S17 | System shall apply no salary deduction for lateness of 15 minutes or less, even where a late penalty was recorded. From **minute 16 onward** the system shall deduct **twice the elapsed lateness** from the week's pay at the staff member's hourly rate, calculated continuously per minute rather than in bands. |
| FR-S18 | System shall suppress **both the automatic deduction and the late-penalty flag** where the computed deduction reaches or exceeds the assigned shift's hours, and shall instead raise the shift as an **anomaly** for Administrator review, on the basis that lateness at this scale more likely indicates a failed or missed check-in than a real arrival time. The week's bonus shall be held as **pending** rather than voided until the Administrator resolves the anomaly. |
| FR-S10 | System shall allow a staff member to view their own time-tracking history, performance metrics (punctuality, attendance, hours), and payout history, restricted to their own data only. |
| FR-S11 | System shall allow a staff member to view their own published shift assignments ("My Schedule") in read-only form once the Administrator publishes the week. |
| FR-S12 | System shall reflect any Create/Update/Delete action on a staff member's own availability immediately in their view, without requiring a manual refresh. |
| FR-S14 | System shall provide a single "Select all shifts" action that registers all five shift periods for a given day in one interaction. |
| FR-S19 | System shall treat a staff member with **no registration at all** for a given week as available for every day and every shift period of that week. Registration records constraints; its absence means none were declared. |
| FR-S16 | System shall allow a staff member to view their own bonus potential and current streak progress during the week, clearly indicated as provisional until the Administrator closes the week. |

### 4.3 Functional Requirements — Owner/Administrator Module

| ID | Requirement |
|---|---|
| FR-O1 | System shall allow the Administrator to define the week's staffing needs (shift periods, positions, headcount needed) prior to the registration window opening, for internal planning purposes. |
| FR-O2 | System shall allow the Administrator to assign and reassign any staff member to any shift and position. |
| FR-O29 | System shall allow an assignment to carry **one or more positions**, so a staff member covering two functions in a single shift is recorded as one assignment rather than two. Exactly one position shall be designated **primary**. |
| FR-O30 | System shall count a multi-position assignment toward the headcount of **each** position it carries in the coverage view (FR-O4), while marking it visibly as **shared** — one person covering two needs is not the same as two people, and the Administrator must be able to see the difference. No headcount-floor warning is computed. Where shared assignments make a shift's real body count lower than its filled-slot count, the shared marker is the signal and the Administrator judges it; the system does not attempt to define a minimum. |
| FR-O3 | System shall provide full Read access across all staff's registered availability, assigned schedules, and actual hours. |
| FR-O4 | System shall provide a coverage view showing, before assignment, how registered availability maps to staffing needs, and after assignment, which shifts are filled / understaffed / overstaffed. A staffing need with no registered availability behind it shall be marked distinctly and prominently. |
| FR-O22 | System shall display, per staff member per week, the number of days and total hours registered, and shall flag any staff member registering below the contract expectation of 5 days at 8 hours. The flag is informational: it shall not block registration or assignment. A staff member treated as fully available under FR-S19 shall not be flagged. |
| FR-O23 | System shall distinguish, in the availability view, a staff member who **explicitly registered all periods** from one who **registered nothing** and is treated as fully available by default, so the Administrator can see which staff have actively confirmed their week. |
| FR-O7 | System shall allow the Administrator to apply performance-based adjustments (rate changes, bonuses, deductions) tied to a staff profile. |
| FR-O8 | System shall allow the Administrator to delete/cancel a published assignment, triggering a notification to the affected staff member. |
| FR-O9 | System shall allow the Administrator to manually correct a time-clock entry, with a mandatory reason logged against the entry. |
| FR-O24 | System shall allow the Administrator to record a staff member's **actual arrival time** against any assigned shift, and shall treat a shift with no such entry as an on-time arrival. |
| FR-O26 | System shall notify a staff member when a lateness is recorded against one of their shifts, stating the recorded arrival time and the resulting effect on bonus eligibility and pay. |
| FR-O25 | System shall apply the same lateness rules (grace, late penalty, deduction, anomaly threshold) to a manually recorded arrival time as it would to an automatically captured one, so that deferring the time clock changes only the source of the timestamp and no downstream rule. |
| FR-T18 | System shall surface deduction anomalies (FR-S18) on the Administrator's time-tracking dashboard alongside failed check-ins, and shall allow the Administrator to apply the full deduction, apply a reduced amount, **confirm the staff member arrived on time — clearing both the deduction and the late-penalty flag**, correct the underlying arrival time, or reclassify the shift as a no-show — each with a logged reason. Resolving the anomaly shall re-evaluate the week's bonus and cascade the streak forward (FR-B7, FR-B8). Placed here rather than in §4.4 because anomalies also arise from manually recorded arrival times (FR-O25) and this review path is required from Phase 2, ahead of the time clock itself. Reclassifying a shift as a no-show shall count that shift as zero hours for pay (FR-C1) and for the 8-hour daily test (FR-B1), and shall record no late penalty, so the day is lost to the bonus through the day count rather than through a penalty. *(no-show effect proposed pending client confirmation)* |
| FR-O10 | System shall provide the Administrator a consolidated calendar view of all staff's registered availability for a given week, as the working surface for shift assignment. |
| FR-O11 | System shall allow the Administrator to filter the availability view by staff member via a multi-select/checkbox control, supporting any combination from a single staff member to all staff, with each staff member's availability visually distinguishable when several are displayed simultaneously. |
| FR-O12 | System shall permit the Administrator to assign a staff member to a shift falling partly or wholly outside that staff member's registered availability, and shall visually flag such an assignment as out-of-availability. No in-app staff acceptance is required. |
| FR-O32 | System shall visually flag an assignment to a position outside the staff member's qualified positions, without blocking it, and shall allow the Administrator to filter the assignment surface to staff qualified for a given position. Qualification is advisory: it never prevents an assignment and never affects pay or bonus. |
| FR-O14 | System shall treat a change to an existing assignment (time adjustment, reassignment, swap) as a **modification of that assignment record**, preserving its identity and change history — not as a deletion and re-creation. Each modification shall retain the previous values, the new values, the actor, and the timestamp. |
| FR-O15 | System shall allow the Administrator to execute a shift swap between two staff members as a single action, reassigning both shifts and notifying both parties. |
| FR-O16 | System shall allow the Administrator to configure the daily shift periods (count, labels, start/end times) and the minimum daily registration hours. |
| FR-O17 | System shall provide a dedicated display mode, rendering the rotating QR code and 6-digit code, intended to run continuously on a peripheral device used for no other purpose. |
| FR-O19 | System shall allow the Administrator to configure the parameters of the chosen presence signal used for clock-in validation — for example the staff wifi SSID(s) where wifi is chosen, or the registered tag identifiers where NFC is chosen. |
| FR-O20 | System shall allow the Administrator to shorten an assignment's end time and, in the same action, assign or extend another staff member to cover the vacated window, so an early departure and its replacement are recorded together. Where the shortening exceeds 30 minutes, the system shall require a covering staff member before the change can be saved, since a departure of that size cannot happen without cover (3.8). A shortening of 30 minutes or less shall be allowed without cover; a departure of that size that is simply approved leaves the assignment unchanged and is recorded as a note (FR-O21). *(the block above 30 minutes is proposed pending client confirmation)* |
| FR-O21 | System shall allow the Administrator to attach a free-text note to any shift, for recording approved short early departures that do not alter the assignment. |
| FR-O27 | System shall allow the Administrator to configure special-rate dates and their multipliers. The system shall ship with the Vietnamese public holiday calendar preloaded, and the Administrator shall be able to add custom dates of their own (for example the shop's anniversary), edit multipliers, or disable any date. |
| FR-O18 | System shall allow the Administrator to configure bonus rules: weekly bonus amount, required number of 8-hour days, minimum daily hours, permitted late penalties per week, streak length, and streak bonus amount. |
| FR-O28 *(enhancement)* | System shall provide the Administrator a configuration surface for values fixed in code in v1: the registration window boundaries (currently Thursday 00:00 – Saturday 15:00), the catalogue of assignable positions (labels and active state — the default rates are carved out into FR-O40 and configurable from Phase 1), and the reason list for publish-gate skips (FR-O33). Out of scope for the MVP; changes to any of these require a deployment until this is built. |
| FR-O31 | System shall treat every assignment as **draft** until the Administrator publishes the week as an explicit action. Draft assignments shall not be visible to any Staff member, enforced server-side (NFR-2). Publication transitions that week's assignments to **published**, makes each staff member's own assignments visible (FR-S11), and triggers FR-N6. Subsequent changes to a published assignment take effect immediately and trigger FR-N7 — the week is not re-published. An assignment created after publication is published on creation. Draft assignments shall count toward the coverage view (FR-O4) and the staffing-need calculation, so the Administrator can assess a schedule before publishing it. Draft status governs Staff visibility only. |
| FR-O33 | System shall prevent publication of a week while any **active** staff member has no assignment in that week, listing each such staff member to the Administrator. This list is a coverage check, not an availability warning: a staff member treated as fully available under FR-S19 shows as available for every shift period (FR-O23) and will therefore appear here whenever they have simply not been scheduled. Publication proceeds once every listed staff member has either been assigned a shift or been marked **Skip this staff this week**, with a reason selected from a fixed list — *on vacation*, *registered too few shifts*, *enough staff already* — recorded against that staff member and week and logged with actor and timestamp (NFR-1). A skip creates no assignment and has no effect on pay or bonus. Deactivated staff are excluded from the check (FR-A8). |
| FR-O34 *(Phase 2)* | System shall provide the Administrator a **control centre** as the default landing surface after sign-in, presenting the state of the current and upcoming week alongside every item requiring the Administrator's attention. It shall introduce no state of its own: every item links to the surface where it is resolved. |
| FR-O35 *(Phase 2)* | The control centre shall list, with a count and a link to the resolving surface, each outstanding item of the following kinds: unresolved deduction anomalies (FR-S18, FR-T18); unstaffed shifts left by a deactivated staff member (FR-A10); staffing needs uncovered or understaffed after publication (FR-O4); active staff with no assignment in an unpublished week (FR-O33); staff registering below the contract expectation (FR-O22); open BonusHolds blocking the weekly close (FR-C6, FR-B14); and — from Phase 3 — unreviewed clock-in exceptions (FR-T6, FR-T7) and extended-absence events (FR-T16). |
| FR-O36 *(Phase 2)* | The control centre shall show the state of the scheduling cycle: whether the registration window is open or closed and when it next changes; how many active staff have registered for the upcoming week and how many have not (FR-O23); whether the upcoming week is draft or published (FR-O31); and whether the previous week's pay period is open, blocked, or closed (FR-C6, FR-C7). |
| FR-O37 *(Phase 2)* | An item shall leave the control centre when the underlying condition is resolved, not by manual dismissal. Informational items carrying no required action — extended-absence events (FR-T17) — shall be individually dismissible. |
| FR-O38 *(proposed pending client confirmation)* | System shall count an assignment toward a shift period in the coverage view (FR-O4) only where the assignment spans that period in full, and shall show an assignment covering a period only in part as a separate partial count rather than as a filled slot. Because assignments are arbitrary time ranges that need not align with the periods (3.5), coverage is otherwise undefined for a shift that starts mid-period. |
| FR-O39 *(proposed pending client confirmation)* | System shall prevent the Administrator from creating or editing an assignment that overlaps another assignment for the same staff member on the same day, naming the conflicting assignment. This is a block rather than a flag — the assignment-side counterpart of FR-S2 — because one person cannot work two places at once. Out-of-availability (FR-O12) and out-of-qualification (FR-O32) remain flags. |
| FR-O40 *(Phase 1, proposed pending client confirmation)* | System shall allow the Administrator to configure the **default hourly rate of each position** (FR-C2, FR-C13) from the staff-management surface, without a deployment. Only the rates are editable; the position catalogue itself — labels, active state — stays fixed in configuration for v1 and remains part of FR-O28. Rates are what the client changes in the ordinary course of business, and leaving them in code makes every pay adjustment a release. |

### 4.4 Functional Requirements — Time Clock

> **Status: Phase 3.** Every requirement in this section is deferred with automated time tracking (§3.7) and blocked on the presence-factor decision (G51). Until the time clock is built, arrival times are recorded manually by the Administrator (FR-O24, FR-O25, FR-O26) and every downstream rule — grace, late penalty, deduction, anomaly, bonus — operates unchanged on that input. FR-S7 (§4.2) belongs to this phase as well.

| ID | Requirement |
|---|---|
| FR-T1 *(Phase 3)* | System shall generate a new QR code and matching 6-digit numeric code every 30 seconds, with both encoding the same clock-in token. |
| FR-T2 *(Phase 3)* | System shall accept a clock-in only when the submitted code is currently valid, and shall reject expired codes. |
| FR-T3 *(Phase 3)* | System shall validate, in addition to the code, the configured presence signal, and shall reject the clock-in if this check fails. Validation shall run server-side and shall sit behind an interface that allows the presence mechanism to be substituted without altering FR-S7, FR-T5, or any downstream rule (G51). |
| FR-T4 *(Phase 3)* | System shall permit a single code to be used concurrently by any number of staff members within its validity window; codes shall not be consumed or invalidated on use. |
| FR-T5 *(Phase 3)* | System shall record, for every clock event, the method used (QR scan or manual code entry), the code token submitted, the presence-signal result and the mechanism that produced it, the timestamp, and the staff account submitting it. |
| FR-T6 *(Phase 3)* | System shall flag as an exception any shift where no valid clock-in was recorded, for Administrator review. |
| FR-T7 *(Phase 3)* | System shall flag as an exception, rather than a silent failure, any clock-in attempt rejected because the staff wifi or the display device was unavailable, so a staff member is never penalized for an infrastructure fault. |
| FR-T13 *(Phase 3)* | System shall record the end of a shift as the assigned end time, and shall label it in the time log as system-generated rather than observed, so it is never presented as a verified departure. |
| FR-T14 *(provisional — Phase 3)* | System shall monitor, on the network side, whether each on-shift staff member's registered device remains connected to the staff wifi. |
| FR-T15 *(provisional — Phase 3)* | System shall record an extended-absence event when an on-shift staff member's device is absent from the network for longer than a configurable threshold, and shall record only absences exceeding that threshold rather than a continuous presence trace. |
| FR-T16 *(provisional — Phase 3)* | System shall surface extended-absence events on the Administrator's time-tracking dashboard as informational signals only, with no automatic effect on pay, late penalties, or bonus eligibility. |
| FR-T17 *(provisional — Phase 3)* | System shall allow the Administrator to configure the extended-absence threshold, and to dismiss or annotate any event. |

### 4.5 Functional Requirements — Compensation Engine

| ID | Requirement |
|---|---|
| FR-C1 | System shall calculate pay from **assigned hours** (the shift times set by the Administrator on the calendar), not from clocked hours. Clocking in early shall not increase pay. The basis shall remain configurable for future change. |
| FR-C2 | System shall support per-staff hourly rate configuration, with an optional per-position default rate applied where no staff-specific rate is set (FR-C13). The position catalogue is fixed in configuration for v1 (FR-O28). **No overtime rules are required** — the client's organisation does not operate overtime. |
| FR-C12 | System shall pay an assignment **once**, from its single assigned time range, irrespective of how many positions it carries. The number of positions shall never multiply hours or pay. |
| FR-C13 | System shall determine the applicable hourly rate as: the staff member's own configured rate where one is set; otherwise the default rate of the assignment's **primary** position. Hours shall not be apportioned between positions. |
| FR-C8 | System shall apply a configurable **rate multiplier to specific calendar dates**, so that work on those dates is paid at an adjusted rate. Where a pay period contains such a date, the payout summary shall itemise the adjusted portion separately from base pay. |
| FR-C9 | The pay period is one week, running **Monday 00:00 to Sunday 23:59**, identical in span to the bonus week (FR-B3), and paid on the **following Monday**. Every payout, deduction, bonus and streak evaluation belongs to exactly one such week; no calculation may straddle two periods. The 23:59 boundary is the period cutoff for calculation; the last shift of the week ends at 23:00 when the shop closes. |
| FR-C10 | Where a bonus restoration or streak recalculation (FR-B7, FR-B8) makes an amount payable for a week that is already closed, the system shall pay it as an itemised adjustment in the **next open period**, labelled with the week it relates to and traceable to the correction that produced it (FR-B9). A closed period shall not be reopened. |
| FR-C11 | System shall separate **base pay** from **bonus** at the close. Base pay is computed from assigned hours (FR-C1) and involves no judgement, so it shall be releasable on the Monday regardless of any outstanding anomaly. Only the bonus portion of a staff member's payout shall be withheld where an unresolved anomaly (FR-S18) affects that week, and it shall be released as a retroactive adjustment in a later week once resolved (FR-C10). |
| FR-C3 | System shall auto-calculate each staff member's payout per period: assigned hours × rate, plus earned bonuses, plus/minus Administrator adjustments. |
| FR-C4 | System shall generate an exportable payout summary (CSV/Excel) per staff per period, itemizing base pay, bonuses, and adjustments separately. |
| FR-C5 | System shall maintain an audit trail linking every payout figure to its source records (assignment, clock event, manual correction, bonus rule, adjustment). |
| FR-C6 | System shall block the **finalisation of bonus amounts** for a pay period while any unresolved anomaly (FR-S18) or unreviewed clock-in exception (FR-T6, FR-T7) remains outstanding for that period, listing the blocking items to the Administrator. Base pay is not blocked (FR-C11). Disputes raised by a staff member are handled outside the system (~~G19~~) and create no blocking state of their own; where the Administrator agrees with a dispute, they resolve it by correcting or waiving the penalty (FR-B7), which is what the system records. |
| FR-C7 | System shall allow the Administrator to **force-close** a pay period while open BonusHolds remain — finalising bonus amounts despite the outstanding anomalies or unreviewed exceptions that would otherwise block them (FR-C6) — with a mandatory logged reason. This shall be permitted even after the scheduled closing date has passed, so a period can never become permanently unclosable. Base pay is unaffected, having already released (FR-C11). |

### 4.6 Functional Requirements — Bonus Engine

| ID | Requirement |
|---|---|
| FR-B1 | System shall evaluate, for each staff member each week, (a) the number of days on which **assigned hours** reached at least 8, and (b) the total count of late penalties incurred across every day of that week. Arrival times determine the late-penalty count — captured automatically once the time clock is built, recorded manually by the Administrator until then — and do not reduce counted hours. |
| FR-B2 | System shall mark a staff member as having **bonus potential** of 100,000 VND for a week when they have at least 5 days of 8+ assigned hours **and** zero late penalties across the entire week. A late penalty on any day of the week, including days not required to meet the 5-day threshold, shall remove the potential. A week containing an unresolved anomaly (FR-S18) shall be marked **pending** rather than earned or lost, and shall not be confirmable until the anomaly is resolved. |
| FR-B3 | System shall maintain a consecutive-week streak counter per staff member, incrementing on each week the weekly bonus is earned and resetting to zero on any week it is not. A bonus week runs **Monday to Sunday**. |
| FR-B4 | System shall award an additional streak bonus of 200,000 VND in the week the streak counter reaches 4, paid alongside that week's weekly bonus, then reset the counter to zero so that a further four consecutive qualifying weeks earn the streak bonus again. |
| FR-B5 | System shall itemize earned bonuses separately in the payout summary, with a traceable breakdown showing which days met the 8-hour threshold and any late penalties that disqualified the week. |
| FR-B6 | System shall make each staff member's current progress visible to them during the week — days of 8+ hours accrued, late penalties incurred, and streak position — not only after the period closes. |
| FR-B7 | System shall allow the Administrator to waive or correct a late penalty, and shall re-evaluate the affected week's bonus eligibility as though the penalty had not occurred. |
| FR-B8 | System shall recalculate the streak counter forward from any week whose bonus eligibility changes, and shall identify any streak bonus that becomes payable as a result, including retroactively. |
| FR-B9 | System shall record every bonus restoration against the correction that caused it, so a restored or retroactive bonus is traceable to the waived penalty rather than appearing as an unexplained adjustment. |
| FR-B10 | System shall present bonus and streak results as **calculated potential** requiring Administrator confirmation at the weekly close, not as an automatically finalized payment. |
| FR-B11 | System shall allow the Administrator to confirm, or override with a logged reason, each staff member's bonus potential when closing the week. |
| FR-B12 | System shall show, alongside each bonus potential, the evidence behind it — days meeting the 8-hour threshold, late penalties recorded, and any unresolved time-clock exceptions that could still change the result. |
| FR-B13 | System shall present the weekly close as a **single list of all staff for that week**, with each staff member's bonus outcome pre-computed and displayed inline — days meeting the 8-hour threshold, late penalties recorded, streak position, and the resulting amount. |
| FR-B14 | System shall classify each staff member's week at close as **clean** or **needs attention**. A week is clean when it carries no open BonusHold — that is, no unresolved anomaly (FR-S18), no unreviewed clock-in exception (FR-T6, FR-T7), and no pending correction — that is, when the outcome cannot still change. All other weeks need attention. |
| FR-B15 | System shall pre-select every clean case and provide a **single bulk-confirm action** covering all of them, so that a week with no exceptions can be closed in one action without opening any per-staff detail view. |
| FR-B16 | System shall sort staff needing attention to the top of the close list, exclude them from the bulk-confirm action, and state for each one what is blocking it. Individual review and override (FR-B11) shall remain available for any staff member, clean or not. |
| FR-B17 *(Phase 1, proposed pending client confirmation)* | System shall show, where the Administrator records an arrival time (FR-O24), that arrival's effect on the staff member's weekly bonus: late penalties incurred, days of 8+ assigned hours reached, and whether the week is on track, lost, or held pending an anomaly (FR-B2). This is display only and shall be labelled provisional. Confirming and paying the amount belongs to the weekly close in Phase 2 (FR-B10, FR-B13–FR-B16). |

### 4.7 Functional Requirements — Performance Dashboard

| ID | Requirement |
|---|---|
| FR-P1 | System shall provide the Administrator a per-staff view combining assigned hours, punctuality (arrival time against assigned start, and lateness tier reached), attendance (no-shows), bonus/streak status, and payout for a selected period. |
| FR-P6 *(enhancement)* | System shall additionally report **actual worked hours** as a figure distinct from assigned hours. Out of scope for the MVP: with no check-out (FR-S8, FR-T13) the recorded end time always equals the assigned end, so the two totals cannot differ. This requires either a check-out mechanism or presence-derived departure times, and belongs with the Phase 3 time clock. |
| FR-P2 | System shall provide an aggregate "whole staff" view of the same metrics across all staff for a selected period. |
| FR-P3 | System shall allow the Administrator to filter/sort the performance view by staff member, position, or date range. |
| FR-P4 | The performance view shall be read-only reporting; any resulting action (rate change, bonus, deduction) must be entered separately via FR-O7. |
| FR-P5 | System shall provide a staff-facing equivalent of the performance view (see FR-S10), server-side restricted so a staff member can only ever query their own record — enforced by the same access rule as NFR-2. |

### 4.8 Functional Requirements — Notifications

Delivery mechanics are specified in NFR-4, NFR-9 and NFR-10. This section specifies which events produce a notification, to whom, and what it must say.

**Every requirement in this section is Phase 2 or later** (§4.13). Phase 1 ships no notification surface at all: the Administrator tells staff on Zalo when registration opens and closes, and a staff member sees a published schedule or a recorded lateness the next time they open the app.

| ID | Requirement |
|---|---|
| FR-N1 *(Phase 2)* | System shall deliver every notification defined in this section by web push to each installed client registered to the recipient's account, and shall write it to that account's in-app inbox **regardless of whether push delivery succeeded**, so a declined or revoked permission delays a message rather than losing it (NFR-9). |
| FR-N2 *(Phase 2)* | System shall render notification content in the recipient's selected language (NFR-7). |
| FR-N3 *(Phase 2)* | System shall ensure a notification addressed to a Staff member discloses no other staff member's availability, schedule, or pay (NFR-2). |
| FR-N4 *(Phase 2)* | System shall notify all active Staff when the registration window opens for a week. |
| FR-N5 *(Phase 2)* | System shall notify, at a configurable lead time before the registration cutoff, every Staff member with **no registration recorded** for the upcoming week, stating explicitly that no registration will be read as full availability (FR-S19). Default: Friday 18:00. |
| FR-N6 *(Phase 2)* | System shall notify each Staff member when the Administrator publishes the week's schedule, covering that staff member's own assignments only. |
| FR-N7 *(Phase 2)* | System shall notify the affected Staff member on any change to a published assignment — time adjustment, reassignment, position change, or cancellation — stating the previous and the new values. This supersedes the notification clause in FR-O8. |
| FR-N8 *(Phase 2)* | System shall notify a Staff member when a lateness is recorded against one of their shifts, per FR-O26. |
| FR-N9 *(Phase 2)* | System shall notify the Administrator where a staffing need remains uncovered or understaffed after publication (FR-O4). |
| FR-N10 *(Phase 2)* | System shall notify the Administrator when a deduction anomaly (FR-S18) is raised, and — from Phase 3 — when a clock-in exception is raised (FR-T6, FR-T7). Required from Phase 2, since anomalies arise from manually recorded arrival times (FR-O25). |
| FR-N11 *(Phase 2)* | System shall notify each Staff member at the weekly close, once the Administrator has confirmed the week: whether the weekly bonus was earned, the reason where it was not, and the resulting streak position. Sent on confirmation, not on calculation, so the message is never contradicted by a later override (FR-B11). |
| FR-N12 *(provisional — Phase 3)* | System shall notify the Administrator of an extended-absence event during a shift (3.8.1). |
| FR-N13 *(Phase 2)* | System shall notify all active Staff at a configurable lead time before the registration window closes, stating the cutoff. Distinct from FR-N5, which targets only staff with no registration recorded; this reminder goes to everyone so that a staff member who registered early can still revise. Default: Saturday 09:00. |

### 4.9 Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Auditability** — all Create/Update/Delete actions (accounts, availability, assignment, time-clock, bonus overrides) must be logged with actor, timestamp, previous and new values, and reason where applicable. Because no approval workflow exists, this log is the system's only record of why a schedule changed, and is correspondingly load-bearing. |
| NFR-2 | **Data privacy** — staff-level Read access must be enforced server-side, not just hidden in the UI, to prevent staff from viewing others' availability, schedules, or pay via direct access. |
| NFR-3 | **Clock-in integrity (two-factor)** — clock-in is gated on two independent signals: a server-generated rotating code (proving the moment) and a presence signal (proving the place). Both must be validated server-side. This defeats the main practical attack on either factor alone — a photographed code shared over Zalo is unusable off-premises, and a forged presence signal is unusable without the current code. Residual risk remains for someone physically at or immediately outside the shop clocking in for a colleague; if that risk matters, a third signal or supervisor confirmation would be required. The strength of the second factor depends on which mechanism is chosen (G51), so this requirement is re-assessed when that decision is made. |
| NFR-4 | **Notification delivery** — notifications are delivered by web push from the installed Progressive Web App. The product has no dependency on Zalo or any external messaging platform, and must not require one. |
| NFR-9 | **Push permission and fallback** — the app must request notification permission at a point where its purpose is clear, and must remain usable for a staff member who declines. Any notification that is not delivered by push shall remain visible in an in-app inbox, so a declined permission delays a message rather than losing it. |
| NFR-10 | **Client platform** — the product is a single **installable Progressive Web App** serving both audiences from one codebase, and **every function is reachable on both phone and desktop**. The split is one of frequency, not capability: the Administrator works primarily on desktop and uses a phone for immediate actions during service; Staff work primarily on a phone but must be able to register availability and view their schedule and pay on a desktop browser. Installation to the Home Screen is a precondition for web push on iOS 16.4+ and is therefore part of onboarding for **any user who wants push on a phone — Administrator included**, not an optional step. |
| NFR-5 | **Responsive parity** — no function is exclusive to one form factor. Surfaces that are information-dense on desktop — the availability overlay across all staff, the assignment grid, the weekly close list, payroll review — must have a genuine mobile layout rather than a compressed desktop one, since they are the surfaces the Administrator reaches for on a phone mid-service. Phase 1 delivers this in full, for both audiences: the Administrator's dense surfaces carry designed mobile layouts rather than a compressed desktop grid — the availability overlay collapses to one day at a time, the assignment grid to per-period coverage cards and a shift list, and the staff and audit tables to cards. Pulled into Phase 1 on 2026-09-18, after the demo prototype showed the layouts were cheaper to build than to defer. |
| NFR-6 | **Credential security** — even though the Administrator distributes staff credentials directly, passwords must be stored hashed (never plaintext) and transmitted over an encrypted connection. |
| NFR-7 | **Localization** — the UI and all in-app notifications must support both Vietnamese and English, with per-user language selection. |
| NFR-8 | **Clock display resilience** — the in-shop code display must degrade gracefully if it loses connectivity, and the system must provide a documented fallback so staff are not blocked from starting a shift by a device failure (ties to FR-T6 and FR-T7 exception handling). |
| NFR-11 | **Timezone** — all dates, times, window boundaries, period boundaries and token validity are evaluated in **Asia/Ho_Chi_Minh (UTC+07:00)**, fixed in configuration for v1. The system serves a single location and does not support per-user or per-site timezones. Timestamps are stored with timezone information so that a future configuration option does not require a data migration. |

### 4.10 Data Model (indicative)

- **Account** — login credentials, role (Superadmin / Administrator / Staff), status (active/deactivated), linked Staff profile if applicable
- **Staff** — profile, qualified positions, rate configuration, linked Account
- **ShiftPeriod** — configurable shift definition (CA 1–CA 5): label, start time, end time
- **Position** — job position assignable to a shift: label (Vietnamese and English, per NFR-7), optional default hourly rate, active flag. Six positions fixed in v1; Administrator-editable under FR-O28
- **SpecialRateDate** — a calendar date carrying a pay multiplier: date, label, multiplier, source (preloaded public holiday or Administrator-defined)
- **StaffingNeed** — Administrator-defined requirement: date, ShiftPeriod, Position, headcount needed
- **Availability** — Staff-registered availability: date and the whole ShiftPeriod(s) selected, with a computed daily total; locks at the registration cutoff. No partial or adjusted periods
- **Assignment** — Administrator's assignment of a Staff member (with one or more Positions, one marked primary) to a date and an arbitrary time range, which need not align with the ShiftPeriod boundaries, carrying a **status (draft / published)** per FR-O31. Carries an out-of-availability flag and a change history; modifications update this record in place rather than creating a replacement
- **ClockToken** — rotating clock-in token: issue timestamp, expiry, encoded QR/6-digit value. Not consumed on use; any number of staff may validate against the same token within its window
- **TimeLog** — clock-in timestamp (observed) and shift end timestamp (system-generated from the assignment, per FR-T13), source of the arrival time (clock event or manual Administrator entry), method used (QR or manual code), token submitted, presence-signal result, assigned vs. recorded arrival, deviation classification, exception flag
- **BonusRecord** — per staff per week: count of 8+ hour days, late penalties incurred, weekly bonus earned, streak position, streak bonus earned. Records are **recalculable, not immutable** — a waived penalty re-evaluates the week and cascades forward through subsequent weeks' streak positions
- **BonusHold** — a block on confirming one staff member's bonus for one week: the week, the staff member, the blocking item (anomaly per FR-S18, or clock-in exception per FR-T6/FR-T7), state (open / resolved), and on resolution the actor, timestamp, outcome and reason. A week with any open hold is **pending** (FR-B2) and is classified as needing attention at the close (FR-B14). BonusRecord itself records only the computed result and is never partially written
- **Notification** — one message to one account: event type, payload, target account, created timestamp, push delivery outcome, read state. Written for every notification regardless of push success (FR-N1); retained on the granular tier (4.11)
- **PayoutPeriod** — one Monday-to-Sunday week: base pay, itemized bonuses, retroactive adjustments carried in from earlier weeks (FR-C10), export record, close state and close reason. Base pay and bonus carry separate release states (FR-C11). Keyed to the same week as the BonusRecord
- **AuditLog** — actor, timestamp, entity affected, previous and new values, reason
- **SkipRecord** — a record that the Administrator deliberately left one active staff member unassigned for one week: staff member, week, reason (on vacation / registered too few shifts / enough staff already), actor, timestamp. Satisfies the publish gate (FR-O33); carries no scheduling, pay or bonus effect. The reason list is fixed in configuration for v1 (FR-O28)

### 4.11 Data Retention

Retention is tiered. Detailed personal data is held only as long as it is operationally useful; the aggregated records that payroll and the law depend on are kept for the statutory period.

| Tier | Records | Retention |
|---|---|---|
| **Granular personal data** | Raw clock events, device identifiers, presence/absence signals, minute-level arrival timestamps, delivered notification records | **35 days** (five weeks), then purged, provided the week the record belongs to is closed and reconciled. The window spans a full four-week streak cycle plus one week of margin, so the source data behind any week in a live streak remains available while that streak is running. Configurable |
| **Operational records** | Availability registrations, assignments and their change history | Retained **90 days**, then purged. Expressed in absolute time rather than in payroll cycles, because a weekly cycle would purge assignment records within two weeks — and FR-C5 requires every payout figure to remain traceable to the assignment that produced it |
| **Financial and audit records** | BonusRecord, PayoutPeriod, AuditLog, applied deductions and adjustments | **Retained for the statutory period** — Vietnamese accounting law requires accounting documents, payroll included, to be kept for 10 years |

**Why the split.** Nghị định 13/2023 requires personal data not be held longer than the purpose requires, which argues for purging granular attendance detail once it has served its purpose. Here that purpose is the four-week streak cycle: while a streak is live, the arrival times behind each of its weeks may still be disputed and re-derived, so the window is set to cover the cycle plus one week rather than to the shortest possible span. It does not override the separate obligation to retain payroll and accounting records. Deleting everything after two weeks would breach that obligation, and would also make the 4-week streak bonus, bonus recalculation (FR-B7, FR-B8), the Performance Dashboard and the audit trail impossible to compute.

**Constraints this places on the design:**

- A week must be **closed and reconciled before its granular data is purged**, since the purge removes the evidence behind any later dispute. The pay-period close gate (FR-C6) already enforces this ordering.
- **Aggregates must be computed and stored at close**, not derived on demand from raw events. The streak counter, qualifying-day counts and payout figures all have to survive the purge.
- **Bonus recalculation stays possible** because it reads BonusRecord, which is retained. What is lost after the purge is the ability to re-derive a week from its underlying clock events, which is another reason the close gate matters.
- **Anonymisation is preferable to deletion** where a record must remain for financial reasons but its personal detail need not — retaining a payout figure without the device identifier that produced it.

### 4.12 Architecture Notes

- The product uses a **custom-built calendar-style UI** rather than embedding or building on top of Google Calendar. Google Calendar is referenced only as a familiar UX pattern to help the client visualize the interaction model.
- A custom UI is necessary because the product needs behaviors a generic calendar tool doesn't support natively: role-based access, a registration-window lock with a minimum-hours rule, whole-period availability registration feeding arbitrary-range assignment, an availability-to-assignment workflow, code-gated time tracking, payroll and bonus calculation, and a performance dashboard.
- Removing the approval workflows simplifies the backend considerably: there is no request state machine to build, no pending-queue to manage, and no multi-party handshake logic. What remains load-bearing is the **audit log**, which becomes the sole record of schedule history.
- The rotating code mechanism is a standard time-based one-time-code pattern (TOTP-style). The in-shop display needs only to render the current code; validation happens server-side.
- The product is a single **Progressive Web App**, installable to a phone's Home Screen and usable in a desktop browser, over one backend and one codebase.
- Several notifications — the pre-cutoff registration reminder, a published or changed schedule, a recorded lateness — lose most of their value if they only surface at next login, which makes push delivery load-bearing rather than a nicety.
- Push delivery uses the **Web Push API** with VAPID keys, a service worker per installed client, and a push subscription stored per account, plus handling for subscription expiry and permission revocation. No APNs or FCM credentials are required at this stage; they become necessary only if the native path in §4.13 is taken.
- **Web push carries the time-critical messages** — the registration reminder before the window closes, and any change to a published shift. Android supports this well. iOS has supported it since 16.4, but only for an app added to the Home Screen, which makes installation an onboarding requirement rather than an optional nicety (NFR-10).
- PWA was chosen over native for the first release because it removes app-store review, developer-account overhead, and per-device distribution entirely, and because **updates take effect immediately**. That last point matters most for a payroll system: a staff member running an outdated build could be paid or scored under superseded rules, and with sideloaded native apps there is no reliable way to prevent it.
- **Native apps remain a future enhancement**, warranted if web push on iOS proves unreliable in practice or if a later feature needs platform capabilities the web cannot reach — the deferred time clock is the likely trigger, since camera and background behaviour are stronger natively. Distribution at that point should go through Apple Business Manager custom apps, not an enterprise certificate, which Apple restricts to an organisation's own employees.
- The system serves a **single location**. No multi-site scoping is built in, and the client has no expansion planned. Should a second location ever appear, schedules, staffing needs and staff lists would need a location dimension — a change worth noting but not worth pre-building now.
- A backend layer is needed to own Account records, Availability and Assignment records, ClockTokens, TimeLogs, bonus evaluation, rate configs, and payout generation. Options range from a lightweight low-code build for an MVP to a custom front-end + backend app for a scalable production build.
- Parity across form factors is a build cost worth naming: the Administrator's dense surfaces cannot simply reflow from 1440px to 390px. The availability overlay alone spans ~40 staff × 7 days × 5 periods. These need a designed mobile view — most likely one staff member or one day at a time — not a responsive squeeze.

### 4.13 Suggested MVP Phasing

| Phase | Scope | Rationale |
|---|---|---|
| 1 | Account Management + availability registration (5 preset shifts, whole periods) + Administrator assignment, draft/publish and schedule editing, including the publish gate (FR-O31, FR-O33) + manual lateness recording (FR-O24–FR-O26) and every rule computed from it (FR-S9, FR-S17, FR-S18, FR-T18) | Removes the Zalo scheduling bottleneck immediately; account management and assignment are prerequisites for everything else. Narrowed on 2026-09-08 to these four capabilities: notifications and the control centre move to Phase 2. Responsive parity for the Administrator (NFR-5) was returned to Phase 1 on 2026-09-18 |
| 2 | Notifications (§4.8: FR-N1–FR-N9, FR-N13) + control centre (FR-O34–FR-O37) + weekly payroll close (Mon–Sun, paid Monday) + bonus/streak engine + Performance Dashboard | Pay reads assigned hours, so payroll does not depend on the time clock. The bonus engine runs on manually recorded lateness (3.7.1) until it is replaced. Notifications and the control centre are carried here because Phase 1 runs as one manual weekly cycle the Administrator drives directly |
| 3 | Automated time tracking (code + presence factor) + exception handling | Held until the presence mechanism is chosen (G51). Replaces manual lateness recording as the source of arrival times, with no change to any downstream rule |
| Future | Administrator configuration surface (registration window, position catalogue — FR-O28); actual-hours reporting (FR-P6); native mobile apps (iOS/Android); configurable timezone (NFR-11) | Warranted if web push on iOS proves unreliable, or if the time clock needs camera and background capabilities the web cannot reach. Distribution via Apple Business Manager custom apps |

**What the Phase 1 narrowing costs, and how it is covered.** Deferring §4.8 removes the pre-cutoff reminder to staff who have not registered (FR-N5), which is one of the three measures adopted against the forgot-versus-available risk (~~G50~~). In Phase 1 the Administrator sends that reminder on Zalo, and the other two measures — the Administrator-facing distinction between an explicit all-periods registration and a defaulted empty one (FR-O23), and the exclusion of defaulted staff from the below-contract flag (FR-O22) — are built as specified. Deferring the control centre (FR-O34–FR-O37) leaves no single list of pending items in Phase 1; the publish gate (FR-O33) and the lateness surface each show their own outstanding work instead. Responsive parity (NFR-5) is **not** deferred: it was tried in the demo prototype and returned to Phase 1, so every Administrator surface in scope is usable on a phone from the first release. It carries a testing cost — each surface has two layouts to check on real devices — which belongs in the Phase 1 estimate.

---

## 5. Gaps & Open Questions

These are decisions or unresolved edge cases the current solution/requirements don't yet answer. Each needs a decision from the client before it can be locked into the final spec.

**Resolved in earlier revisions:**
- Administrator = client (Owner); Superadmin = system provider, with full technical access for support purposes.
- Account provisioning = Administrator creates the account and shares credentials directly (no self-registration).
- Performance Dashboard priority metrics = punctuality/lateness, attendance/no-shows, hours worked vs. scheduled. Cost efficiency deferred — see G24.
- Language/localization = Vietnamese and English (UI + notifications).
- Position/rate = decided by the Administrator at assignment time; no staff-side selection at clock-in. The rate is the staff member's own configured rate, falling back to the primary position's default where none is set (FR-C13). An assignment may carry multiple positions (FR-O29).
- Position catalogue = six positions, fixed in code for v1: Kiểm tra đơn, Thu Ngân – Online, Thu Ngân – Offline, Phục Vụ, Pha Chế, Bếp. Online and in-store cashiering are separate positions.
- Shared assignments and coverage = an assignment carrying two positions counts toward both positions' headcount, marked **shared** (FR-O29, FR-O30). The system does not warn when shared assignments reduce a shift's real body count below its filled-slot count; the marker is the signal and the Administrator decides. Deliberate — a headcount floor would be another value to configure and maintain for a judgement the Owner is better placed to make.
- Registration model = staff register **availability** ("I can work this time"), not shifts; the Administrator decides the official schedule.

**Deferred:**
- **Automated time tracking** (3.7) is held until the presence factor is chosen. G51 (presence mechanism) and G15 (staff device access) are parked with it rather than resolved.
- **Break & presence monitoring** (3.8.1) is on hold for the same reason, and may not be feasible at all without a network-side signal.
- Lateness is recorded manually by the Administrator in the interim (3.7.1). No downstream rule changes.
- **No-show detection** is not built. The Administrator cancels or shortens the assignment manually; an unrecorded absence still counts toward the bonus. Accepted as an interim limitation (3.7.1), resolved by FR-T6 in Phase 3.

**Resolved in this revision:**
- ~~G18~~ Retention is **tiered** (4.11). Granular personal data — including notification records — is purged after 35 days (a full streak cycle plus one week) once the week is closed; aggregated financial and audit records are retained for the statutory period. This satisfies Nghị định 13/2023 without breaching the accounting-law obligation to retain payroll records, and preserves the streak bonus, bonus recalculation and audit trail.
- ~~G9~~ **Single location**, no expansion planned. No multi-site scoping built.
- ~~G11~~ **No overtime.** Special pay rates are handled as a **configurable multiplier on specific dates** (FR-C8, FR-O27), with Vietnamese public holidays preloaded and Administrator-defined custom dates supported.
- ~~G17~~ Payroll export is for the **Administrator's own review**. Accounting-system integration is a future enhancement.
- ~~G21~~ Password reset is **Administrator-controlled only** (FR-A7). No staff self-service path.
- ~~G22~~ Deactivated staff are **hidden from day-to-day views but fully retrievable** via an explicit filter and in historical reporting (FR-A8).
- ~~G23~~ Superadmin access is **logged and visible to the Administrator** (FR-A9).
- ~~G24~~ Cost-efficiency metric = **future enhancement**, out of v1.
- ~~G54~~ iPhone share = **not a blocker**; parked. Revisit if web push proves unreliable in practice.
- ~~G52, G53~~ Platform = a single **installable web app (PWA)** for both staff on mobile and the Administrator on desktop. Notifications are delivered by **web push**, retained in an in-app list as a fallback. Chosen over native to avoid app-store review and per-device distribution, and because immediate updates matter for a payroll system. **Native apps are deferred as a future enhancement**, most likely alongside the time clock.
- ~~G16~~ **Zalo integration removed entirely.** Notifications are delivered in-app by the system. Zalo remains the team's own communication channel, outside the system boundary — no Official Account, no bot, no API dependency.
- ~~G19~~ A staff member is **notified when a lateness is recorded** against their shift, including its effect on bonus and pay (FR-O26). Disputes themselves continue to be raised with the Administrator directly.
- ~~G7, G26, G28, G29~~ and the entire approval architecture — **removed**. All staff-side approval flows, the swap handshake, and the out-of-availability acceptance step are dropped. Agreement happens on Zalo before any calendar change; the Administrator edits directly and the audit log records the outcome.
- Shift structure = five fixed daily periods (CA 1–CA 5), 07:00–23:00, seven days a week. The 8-hour daily expectation is a warning, not a constraint (see ~~G49~~).
- Bonus structure = 100,000 VND weekly for 5 days of 8+ hours with zero late penalties across the whole week; 200,000 VND additional at a 4-week streak.
- Late penalty scope = any late penalty within a given week voids that week's bonus.
- Penalty waiver = if the Administrator waives or corrects a late penalty, the week's bonus is restored **and** the streak is recalculated forward, including any streak bonus that becomes payable retroactively.
- Streak rule = strictly four consecutive weeks of earning the weekly bonus. Any week without the bonus resets the count to zero, regardless of the reason.
- ~~G14~~ Clock-in validation = **two factors, both required**: a valid rotating code (QR or 6-digit) **and** a presence signal confirming the staff member is on the premises. The mechanism behind that signal is not yet chosen (G51). A single code may be used concurrently by any number of staff and is not consumed on use.
- ~~G35~~ Code display = a **dedicated peripheral device** in the shop, used for no other purpose.
- ~~G10~~ Pay basis = **assigned hours** on the calendar, not clocked hours. Arriving early earns no additional pay. The time clock therefore verifies attendance and punctuality rather than computing pay.
- ~~G34, G40, G41, G42~~ Check-out = **automatic at the assigned shift end**; no staff action. Early departure is captured through the schedule instead: leaving more than **30 minutes** early requires a replacement, so the Administrator edits both assignments and the calendar becomes the record. Departures of 30 minutes or less are at Administrator discretion, paid in full, assignment unchanged.

- ~~G4, G13, G47(part)~~ Lateness = **10-minute grace** (on time, full shift counted); **late penalty from minute 11** (voids the weekly bonus, no pay impact); **deduction from minute 16** at twice the elapsed lateness, continuous per minute.
- ~~G30~~ Registration granularity = **whole shift periods only**. Staff cannot adjust start or end times; registration answers "can you work this period?" and nothing more. Any finer adjustment is agreed on Zalo and expressed in the **assignment**, which may be an arbitrary time range. FR-S15 retired.
- ~~G50~~ Forgot-vs-available risk = mitigated by three measures, all adopted: a pre-cutoff reminder to non-registrants stating that silence reads as full availability; an Administrator-facing distinction between an explicit all-periods registration and a defaulted empty one (FR-O23); and exclusion of defaulted staff from the below-contract flag (FR-O22).
- ~~G49~~ Daily 8-hour minimum = **warning only**, no longer a hard block. Neither the daily hours rule nor the weekly 5-day expectation restricts the registration flow.
- **No registration = fully available.** A staff member who registers nothing for a week is treated as available for every day and shift. Anyone with a constraint must register it explicitly.
- ~~G1~~ Registration window = **Thursday 00:00 to Saturday 15:00**, for the week beginning the following Monday.
- ~~G2~~ Uncovered staffing need = **display only**. Marked plainly in the coverage view for the Administrator to act on; no prescribed resolution process, as this is not a real use case in practice.
- ~~G3~~ Leave / time-off = **out of scope** for this system.
- ~~G5~~ Weekly minimum = the contract expects 5 days at 8 hours, but this is **not enforced in registration**. The system displays registered days and hours per staff member and flags anyone below the expectation for pattern review, without blocking.
- ~~G25~~ Assignment turnaround = **no deadline** on the Administrator.
- ~~G47~~ Deduction ceiling = when the computed deduction reaches or exceeds the assigned shift's hours, **no deduction is applied automatically**. The shift is logged as an anomaly for Administrator review, since lateness at that scale usually indicates a failed check-in rather than a real arrival time.
- ~~G48~~ Counting = **two separate mechanisms**. Work time and the bonus's 8-hour test read the **assigned shift**; the time clock only establishes punctuality and in-shift presence. Lateness never shortens counted hours.
- ~~G33 (revised)~~ The bonus's 8-hour daily test reads **assigned hours**, not clocked hours. This supersedes the earlier reading; the replacement requirement for early departure is what keeps assigned hours truthful.
- ~~G31~~ Bonus week = **Monday to Sunday**.
- ~~G32~~ Streak = **resets to zero after each payout and runs again**, so the 200,000 VND streak bonus recurs every four consecutive qualifying weeks.
- ~~G37~~ Pay period = **Monday to Sunday, paid the following Monday** (FR-C9). Base pay always releases; only **bonus finalisation** is blocked while an unresolved anomaly or unreviewed clock-in exception is outstanding (FR-C6, FR-C11). The Administrator may **force-close with a logged reason**, including after the scheduled closing date. Staff disputes are raised outside the system and are not a tracked state.

**Note on retired requirements:** FR-T8–FR-T12 (the scan-based check-out toggle) are retired. FR-S8 reverts to automatic stop at the assigned end time.

### 5.0 Superseded Decisions

Retained for traceability. Each of these was decided and then reversed by a later decision; the replacement is authoritative.

| Superseded decision | Replaced by |
|---|---|
| Time-clock mechanism = rotating QR + 6-digit code, **replacing wifi/SSID validation entirely** | ~~G14~~ — two factors, both required: rotating code **and** a presence signal. Code alone was judged insufficient. |
| ~~G34, G41~~ Check-out = same scan mechanism, toggling odd/even | ~~G34, G40, G41, G42~~ — automatic check-out at the assigned shift end; no staff action. |
| ~~G33~~ Bonus reads **actual clocked hours** | ~~G33 (revised)~~ — the 8-hour daily test reads **assigned hours**. |
| Minimum 8 registered hours per registered day (hard rule) | ~~G49~~ — warning only; neither the daily hours rule nor the 5-day expectation blocks registration. |
| ~~G7, G26, G28, G29~~ approval architecture, swap handshake, out-of-availability acceptance | Zalo-first design principle (§2) — all in-app approval flows removed; the audit log carries the record instead. |
| FR-S15 — staff-adjustable shift start time | ~~G30~~ — whole-period registration; adjustment expressed in the assignment. |
| ~~G40~~ Leaving early = flagged as an exception for Administrator adjustment | ~~G34, G40, G41, G42~~ — handled through the schedule; >30 min requires a replacement, ≤30 min paid in full. |

### 5.1 Open Questions

Every gap in the original G-series has been decided or parked; those resolutions are logged above. The following remain open from later revisions:

| # | Item | Needed before |
|---|---|---|
| O1 | Wireframe v1 has not been reconciled against this revision (§5.3). The Phase 1 demo prototype now serves as the reference for the Phase 1 surfaces | Design handoff |
| O2 | The week has been walked from registration through recorded lateness in the demo prototype. The weekly close — bulk confirm, holds, streak cascade — has still not been walked end to end against the finished rule set | Phase 2 build |
| O3 | Seven rules were decided in the demo prototype and are proposed, not agreed: coverage counting (FR-O38), the double-booking block (FR-O39), cover required above 30 minutes (FR-O20), the effect of a no-show (FR-T18), the bonus preview on the lateness surface (FR-B17), password set from the account record (FR-A7), and Administrator-configurable default rates per position (FR-O40) | Phase 1 sign-off |

### 5.2 Parked with Deferred Scope

These were not resolved — they were set aside with the features that depend on them, and reopen when those features do.

| # | Question | Reopens with |
|---|---|---|
| G51 | Presence factor for clock-in — NFC tag, Bluetooth beacon, GPS, or code-only with documented residual risk | Automated time tracking (3.7) |
| G15 | Staff device capability across the ~40 staff | Automated time tracking (3.7) |
| G39 | Clock-in network = a **separate staff-only network**, not the customer guest wifi — conditional: only a live decision if wifi is the mechanism G51 selects | Automated time tracking (3.7), contingent on G51 |
| G43 | Router / network access for presence monitoring | Break monitoring (3.8.1) |
| G44 | Extended-absence threshold | Break monitoring (3.8.1) |
| G45 | Wifi coverage across the premises | Break monitoring (3.8.1) |
| G46 | Device registration and staff disclosure | Break monitoring (3.8.1) |
| G54 | iPhone share across the team | Revisit if web push proves unreliable, or when native apps are considered |

### 5.3 Wireframe Drift

Wireframe v1 was drawn against an earlier revision and no longer matches this document. Known divergences:

- Draws screens for the removed approval architecture — request a change, ask for a swap, swap acceptance, my requests, approval queue, request detail — against retired IDs FR-S6, FR-O5 and FR-O6
- Uses a G1–G20 annotation series that does not map to the current G-numbering
- Predates positions and multi-position assignments (FR-O29, FR-O30), the draft/publish distinction (FR-O31), the publish gate (FR-O33), the weekly close screen (FR-B13–FR-B16), the notification set (§4.8), and the control centre (FR-O34–FR-O37)

Roughly six of the 36 Figma artboards draw surfaces that no longer exist. Reconciliation is a planned piece of work, not an incidental fix: the Figma MCP server allows 20 tool calls per month on the Starter plan, and the original 36 artboards consumed a full month's allowance.

**Phase 1 demo prototype (2026-09-18).** A working prototype of the Phase 1 surfaces — availability registration, the availability overlay across all staff, assignment with draft/publish and the publish gate, manual lateness recording with the computed penalty, staff accounts, and the audit log — was built against this revision and is the reference for those screens. It supersedes Wireframe v1 for anything shown to the client. Wireframe v1 remains the only drawing for the Phase 2 and Phase 3 surfaces, subject to the divergences above.
