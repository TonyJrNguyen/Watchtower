# SHIFT SCHEDULING & PEOPLE MANAGEMENT SYSTEM
## Solution Proposal, Delivery Roadmap and Investment Cost

> Vietnamese version, the one sent to the client:
> [`04-solution-proposal-and-cost.vi.md`](04-solution-proposal-and-cost.vi.md).
> This English file is the main copy. When one changes, update the other to
> match.

---

**Version:** 3.0 · **Date:** 2026-09-29 *(replaces version 2.0 of 2026-09-08)*
**Delivered by:** Tony
**Reference documents:** Solution & Requirements Document v1.6 (2026-09-28) and the Phase 1 interactive prototype reviewed and approved with you

---

> **What changed since version 2.0.** Between 2026-09-08 and 2026-09-28, the Phase 1 scope was adjusted five times following your feedback on the prototype: Availability and Scheduling merged into one weekly calendar, plus a day-by-day list, Nicknames, the QC position and sub-positions, an Add button in every shift cell, a staff filter, and **full use on phones from Phase 1** (previously planned for Phase 2). Phase 1 cost and duration have been re-estimated for the new scope. Phase 0 is shorter because part of it was completed through the prototype. Details in sections 4 and 6.

## 1. SUMMARY

This document sets out the plan to build a shift scheduling and people management system designed specifically for how your business runs: about 40 staff, open 7 days a week from 07:00 to 23:00, divided into 5 fixed shifts per day.

The project is split into **3 independent phases**, each contracted and accepted separately. You get usable value from the first phase, and you decide freely whether to continue with the later phases.

| | Content | Duration | Cost |
|---|---|---|---|
| **Phase 0** | Confirm the outstanding rules, prepare infrastructure, sign the contract | 2 weeks | VND 15,000,000 *(credited against Phase 1)* |
| **Phase 1** | Shift registration, scheduling & lateness recording | 20 weeks | VND 370,000,000 |
| **Phase 2** | Notifications, control centre, payroll & bonus | 14 weeks | VND 285,000,000 |
| **Phase 3** | Automated time clock *(provisional)* | 6 weeks | VND 130,000,000 |

**Total duration of Phases 0 + 1 + 2: about 9 months** (including 3 weeks of stable operation between Phase 1 and Phase 2).
**Total cost of Phases 0 + 1 + 2: VND 655,000,000** (the VND 15,000,000 for Phase 0 is credited against Phase 1).

> **Phase 1 is deliberately narrow** so it solves exactly the most urgent problem: the weekly scheduling bottleneck. Phase 1 does exactly four things: staff register the shifts they are available for, you build and publish the schedule, you record who was late, and the system applies the lateness rules to that record.
>
> **What Phase 1 does not yet include, stated clearly to avoid misunderstanding:** no automatic notifications of any kind; no control centre; and **lateness is only recorded and classified by the rules (in minutes), not yet converted to money and not yet deducted from pay** — payroll belongs to Phase 2. The system does show an **estimated pay** = hours scheduled × hourly rate, for you and each staff member to refer to. Details in section 4.

---

## 2. CURRENT PROBLEMS

| Problem | Effect on operations |
|---|---|
| Manual scheduling via Zalo for nearly 40 staff | A bottleneck every week; many hours of manual consolidation |
| No central system | Shift adjustments, swaps and performance changes are hard to handle; everything is reactive |
| Manual payroll | Error-prone and time-consuming, taking time that should go to strategic work |

---

## 3. PROPOSED SOLUTION

### 3.1 Design principle

**The system is where decisions are recorded, not where they are negotiated.**

Conversations between staff, and between you and your staff, continue on Zalo, where the team is already used to working. Agreements are reached on Zalo first; the system records the outcome afterwards.

That is why the system has **no** approval queues or request–approve flows in the app. By the time a change reaches the schedule, it has already been agreed. What the system provides is **a single source of data**, **a complete log of every change**, and **automatic pay and bonus calculation** (from Phase 2).

Zalo sits outside the system. No integration, no Official Account, no bot. Every notification the system needs to send goes out as a push notification from the app itself (from Phase 2).

### 3.2 Platform

The system is an **installable web app (PWA)** — one codebase serving both audiences:

- **Staff** mainly use it on their phones, installed on the home screen like an ordinary app, and can still use it in a desktop browser
- **You (the Administrator)** mainly use it on a computer, and **can use it fully on a phone** — including seeing who registered, placing people and assigning positions — for when you are at the counter

We chose a web app over an App Store/Google Play app because: there is no app review to wait for, no per-device distribution, and **updates take effect immediately** — which matters especially for a payroll system, because staff on an old version could be paid under rules that have been replaced.

### 3.3 Four modules

**1. Account management** — You create and manage all staff accounts, roles, experienced positions and pay rates. Each staff member has a short **Nickname**, unique among active staff (by default the given name + the first letter of the family name, e.g. "Mai N"), used on the weekly calendar where there is no room for the full name. Staff do not sign themselves up. When someone leaves, their account is **deactivated, not deleted**, keeping their full history. You can adjust the default rate per position, the shifts of the day, the registration window, the position catalogue and the skip reasons yourself — without waiting for a software update.

**2. Availability registration (Staff)** — Staff choose the shifts they can work in the coming week, from **5 fixed shifts**:

| Shift | Hours | Length |
|---|---|---|
| CA 1 | 07:00 – 11:00 | 4 hours |
| CA 2 | 11:00 – 13:00 | 2 hours |
| CA 3 | 13:00 – 15:00 | 2 hours |
| CA 4 | 15:00 – 17:00 | 2 hours |
| CA 5 | 17:00 – 23:00 | 6 hours |

The registration window opens **Thursday 00:00 and closes Saturday 15:00**, for the week starting the following Monday. A **"Select all shifts"** button registers all 5 shifts of a day in one action.

Registering means *"I can work this time"*, **not** *"this is my shift"*. The official schedule is entirely your decision.

**3. Weekly calendar and scheduling (you)** — Availability and scheduling sit on **a single weekly calendar**, used in three steps before publishing:
- **See who registered:** each staff member appears individually in every shift they can work, by Nickname, never collapsed into a number; people who have not registered appear dashed, because they are counted as available. Hover (computer) or tap (phone) to see their full name and details.
- **Place people:** choose people for each shift, without assigning positions yet, so each shift has enough people and shifts are spread evenly across staff. An **Add** button in every shift cell places someone who did not register for that shift.
- **Assign positions:** click a person to open a panel beside the calendar, select one or more shifts in the day and assign positions. **Colour shows the position.**
- Below the calendar is a **day-by-day list**: who registered for which shift, who has not registered, who cannot work that day, and who already has a shift.
- A staffing coverage table: which shifts have enough people, which are short, and which needs nobody has registered for.

*The control centre* — a screen that gathers everything awaiting a decision in one place — comes in Phase 2. In Phase 1, pending items appear directly on the relevant screen.

**4. Time tracking, payroll & bonus** — Pay calculated automatically from scheduled hours, with a weekly attendance bonus and a 4-week streak bonus (Phase 2). Automated time clock in Phase 3.

### 3.4 Positions

Every shift is tied to one or more positions. **Seven positions** are configured for the first version, some with sub-positions (an area within the position) or attributes (extra work done alongside the position):

| Position | Sub-positions | Attributes |
|---|---|---|
| QC *(checks drink quality after preparation)* | Inside (Trong), Outside (Ngoài) | — |
| Cashier – In-store (Thu Ngân – Offline) | — | — |
| Cashier – Online (Thu Ngân – Online) | — | — |
| Barista (Pha chế) | Milk tea (Trà sữa), Matcha, Tea (Trà), Bồn | — |
| Server (Phục vụ) | — | Table running (Bưng bàn) |
| Order Check (Kiểm tra đơn) | — | — |
| Kitchen (Bếp) | — | — |

Cashier Online and In-store are **two separate positions**, each with its own staffing need and default rate. Staffing need, default rate and experience **are held per position only**; sub-positions and attributes are descriptive, optional, and several may be chosen. The display label looks like "Barista - Matcha, Tea" or "Server - Table running".

Each staff profile records the positions they have experience in. This information **supports scheduling; it is not a restriction**: you can still assign anyone to any position, and the system only flags it for you to see rather than blocking it.

### 3.5 Pay and bonus rules

**Pay is calculated from the hours scheduled** on the calendar, not from clock-in times. Staff who arrive early are not paid extra, because the schedule is what determines the amount owed.

**Pay period: Monday to Sunday, paid the following Monday.**

**Weekly attendance bonus — VND 100,000**, when both of these hold: at least **5 days of 8 hours or more**, and **no late penalty during the whole week**.

**Streak bonus — VND 200,000**, when the weekly bonus is earned **4 weeks in a row**, paid with the fourth week (VND 300,000 in total that week). After it is paid, the counter resets to 0 and starts again, so the streak bonus recurs regularly.

**Lateness rules:**

| Minutes late | Weekly bonus lost | Deducted from weekly pay |
|---|---|---|
| 0 – 10 minutes | No | No |
| 11 – 15 minutes | **Yes** | No |
| From minute 16 | Yes | **Twice the minutes late** |

Examples: 20 minutes late → 40 minutes of pay deducted. 12 minutes late → the VND 100,000 bonus is lost but no pay is deducted.

Neighbouring shifts of the same person on the same day, in the same position, count as **one shift**. Example: working 11:00–15:00 and arriving at 12:00 (60 minutes late) deducts 120 minutes of pay, exactly as you confirmed on 2026-09-28.

**Safeguard:** when the minutes to deduct reach or exceed the length of that shift, the system **does not deduct automatically and does not record a late penalty**; it puts the shift on a held list for you to review. Reason: lateness that large is more often a recording mistake than a real arrival time, and the system should not penalise someone for a technical incident on its own.

**In Phase 1**, the system applies the full table above to record and classify every late arrival, but **shows only the minutes and the status** (on time / late penalty / N minutes deducted / held) — not yet converted to money, not yet deducted from pay, and the bonus not yet settled. Conversion, pay deduction and bonus settlement start in Phase 2, based on the very records made during Phase 1.

### 3.6 Use on phones and computers

**No function works on only one kind of device.** The difference between phone and computer is how often each is used, not what each can do.

**Every Phase 1 screen has its own phone layout**, already in the prototype you reviewed:
- The **weekly calendar** shows one day at a time, still showing each person by Nickname; the place-people and assign-positions panel opens from the bottom; the Add button is in every shift — you **can schedule the whole week from a phone**
- **Staffing coverage** becomes a card per shift; the **day-by-day list** becomes a card per staff member
- **Recording lateness** and handling held cases right when you see them
- **Editing, cancelling, swapping, shortening shifts and assigning a replacement**, and adding notes to a shift
- The **staff list and the change log** as cards

The Phase 2 screens — control centre, notification inbox, week-close screen, payroll — will also be designed for phones when they are built.

**On the staff side**, the reverse also holds: staff mainly use phones, but can still register availability and view their schedule and estimated pay in a desktop browser — so a broken phone never costs anyone a shift.

**About push notifications (Phase 2):** on iPhone, notifications only work once the app has been installed on the home screen. This applies to **you as well**, not just staff. On computers, Chrome and Edge deliver notifications normally; Safari on Mac needs an extra "Add to Dock" step. Installation guidance and push testing on real phones are done before Phase 2 is signed.

### 3.7 Why build rather than buy off-the-shelf software

These six characteristics, taken together, are not met by any mainstream time-tracking or HR software:

1. Five fixed shifts, where registering means **available**, not taking a shift
2. Assignments use **any time range**, not tied to shift boundaries
3. A shift can carry **several positions**, with the primary position setting the pay rate
4. An attendance bonus of VND 100,000/week plus a streak bonus of VND 200,000/4 weeks, **recalculated retroactively** when you waive a late penalty
5. Pay based on **scheduled hours**, not clock-in times
6. Designed **with Zalo as the hub for conversation**, with no in-app approval flow

Each point on its own could be worked around. All six together require a custom build.

---

## 4. DELIVERY ROADMAP

### Phase 0 — Confirm rules and prepare · **2 weeks**

No programming yet. Most of the initial discovery work is **already done** through the interactive prototype (2026-09-18 – 2026-09-28): building the combined calendar with data for 40 staff, your review and feedback, and running the flow from registration through to lateness recording. The approved prototype is the reference design for every Phase 1 screen, so no wireframes need to be redrawn for this phase.

What remains:

| Week | Work |
|---|---|
| 1 | You confirm the **eight proposed rules** that came up while building the prototype (see section 10) and how estimated pay is shown |
| 1–2 | Choose the technology, prepare infrastructure, the development environment, backups and a data-recovery drill |
| 2 | Phase 1 contract and scope, support response times |

Push notification testing on real phones moves to before Phase 2, together with the notifications work.

**Deliverables:** The list of confirmed rules · Updated requirements document · Environment ready and recovery-drill report · Phase 1 contract and scope.

---

### Phase 1 — Shift Registration, Scheduling & Lateness Recording · **20 weeks**

This phase solves your number one problem: removing the weekly scheduling bottleneck on Zalo, and starting to build up lateness data so Phase 2 has a basis for pay and bonus.

| Sprint | Weeks | What you will be able to see |
|---|---|---|
| 1 | 1–2 | Create a staff account with a Nickname; that staff member can log in on a phone |
| 2 | 3–4 | You adjust the default rate per position, the shifts, the registration window and the position catalogue without a software update |
| 3 | 5–6 | Staff register availability for the whole week on phone or computer; the system locks automatically at the cutoff |
| 4 | 7–8 | **You see who registered for which shift for the whole week on the weekly calendar**, on computer and phone, filterable by staff |
| 5 | 9–10 | You place people for the whole week: the panel beside the calendar, the Add button, the day-by-day list |
| 6 | 11–12 | You assign positions and sub-positions; coverage table by position; a complete draft week |
| 7 | 13–14 | **The whole scheduling cycle runs end to end** — publish the schedule, staff see their own schedule, edit/swap/cancel/shorten shifts after publishing |
| 8 | 15–16 | **You record a late arrival on your phone at the counter, and the system classifies it by the rules**; staff see their own estimated pay |
| 9 | 17–18 | Full testing on real phones and computers; staff data import; training materials |
| Pilot | 19–20 | A pilot with 8–10 staff alongside Zalo for one cycle, then full rollout |

**Phase 1 scope:**
- Management of accounts, roles, **Nicknames**, experienced positions, pay rates, and deactivation of staff who leave; setting passwords directly in the staff profile
- You adjust the **default rate per position, the shifts of the day, the registration window, the position catalogue (including sub-positions) and the skip reasons** yourself
- A complete change log (who, when, old value, new value, reason)
- Availability registration on phone and computer, with a warning when below the contract expectation (5 days × 8 hours) but **no block**
- Staff who **register nothing** are treated as **available all week** — anyone with constraints must register them explicitly
- Set staffing needs by shift and position; coverage table before and after scheduling
- **One weekly calendar** for both viewing registrations and scheduling: each person shown by Nickname, coloured by position, filterable by any combination of staff; place people first, then assign positions, through the panel beside the calendar; an Add button in every shift cell; a **day-by-day list** below the calendar
- Scheduling with any time range, several positions in one shift, sub-positions and attributes; flags when scheduling outside availability or outside experienced positions; no one can have two overlapping shifts
- Swap shifts between two staff in one action; shorten a shift and assign a replacement in the same action
- The schedule stays in draft, **invisible** to staff until you publish it
- **Publish gate:** the system lists active staff with no shift at all, and shifts without a position; you schedule them, assign a position, or mark "Skip this week" with a reason
- Staff see their own personal schedule only, read only
- Lateness recording: you enter the actual arrival time, **and can record it on your phone while at the counter**. The system applies the full rules — 10-minute grace, late penalty from minute 11, double the minutes deducted from minute 16 (**in minutes, not yet converted to money**) — and separates held cases for you to review; preview of the effect on the weekly bonus (for reference only)
- **Estimated pay** = hours scheduled × hourly rate, for you to see per person and for each staff member to see their own
- Staff can see every late arrival recorded for them and its consequences
- **Full use on phone and computer** for every screen above
- Bilingual Vietnamese / English interface

**Not yet in Phase 1 — coming in Phase 2:**

| Not yet included | Practical effect for you |
|---|---|
| **Automatic notifications** (registration window opening/closing, schedule published, shift changes, lateness recorded, understaffed shifts) | You keep informing the team on Zalo as you do now. Two things to build into the weekly routine: **before 15:00 on Saturday, check who has not registered and remind them on Zalo**; and when you record a late arrival, tell that staff member the same day |
| **Control centre** | Pending items still appear, but on each relevant screen rather than gathered in one place |
| **Payroll, lateness deductions and bonus settlement** | The system records and classifies lateness in minutes (e.g. 20 minutes late → 40 minutes deducted) and shows estimated pay from scheduled hours, but **does not convert it to money, deduct it from pay or settle the bonus yet**. You continue to calculate pay yourself as now until Phase 2 is complete |

Why lateness recording stays in Phase 1 even without payroll: every record is kept from day one, so when Phase 2 is complete, the pay and bonus engine already has real history to run on instead of starting from zero.

**Phase 1 acceptance:** Two consecutive weeks scheduled entirely in the system, with no consolidation on Zalo · A complete change log for every change during the pilot · You finish scheduling a week yourself in under 60 minutes · You record a late arrival on a phone, and the classification and minutes the system produces match the rules table in section 3.5 when checked by hand · Every screen works correctly on real phones and computers · The eight proposed rules are confirmed by you or left adjustable.

---

### Phase 2 — Notifications, Control Centre, Payroll & Bonus · **14 weeks**

Starts after Phase 1 has run stably for at least **3 real weeks**. Building payroll on a scheduling model that has not settled means building it twice.

**Before Phase 2 is signed:** push notifications are tested on **staff members' real phones**, especially iPhones, and on your phone and browsers. If the test fails, the design is adjusted before scope and cost are agreed.

Phase 2 adds four groups: **automatic notifications** (including guidance for installing the app on the home screen, and a reminder before the registration window closes sent only to those who have not registered), **the control centre**, **payroll and attendance bonus**, and **performance reports**. Every new Phase 2 screen has its own phone layout.

> **One date to agree before Phase 2:** the day you stop using Zalo for scheduling. In Phase 1, reminding staff who have not registered is done by hand on Zalo — which only works while Zalo is still in use. Phase 2 must be complete before that date.

| Sprint | Weeks | Content |
|---|---|---|
| 10 | 1–2 | Push notifications and the notification inbox; app installation guidance; every notification type, including the reminder to people who have not registered |
| 11 | 3–4 | Payroll from scheduled hours (replacing estimated pay); pay rate per staff member or per primary position; holidays and special days with multipliers; converting and deducting the late arrivals recorded since Phase 1 |
| 12 | 5–6 | The weekly and streak bonus engine; retroactive recalculation when a late penalty is waived |
| 13 | 7–8 | Week-close screen; payroll export to Excel/CSV; base pay and bonus shown separately |
| 14 | 9–10 | Performance reports for you and for staff; data retention policy |
| 15 | 11–12 | Control centre; inbox and control centre on phone; full testing |
| Parallel run | 13–14 | The system calculates pay alongside your manual calculation for 2 weeks |

**An important point about the week-close screen.** The week ends at 23:00 on Sunday and pay goes out on Monday, which means you have roughly one evening to check ~40 staff, 52 times a year. So the week-close screen is designed on one principle: **a clean week closes in a single action**. Every clear case is preselected and confirmed in bulk; only staff with an unresolved held case are separated out, moved to the top of the list with the reason they are held.

This is a mandatory design constraint, not a preference. A screen that makes you confirm each person one by one would recreate exactly the manual bottleneck the system exists to remove.

**Base pay is always released on time.** Only the **bonus** is held back when that week still has an unresolved held case — and it is paid in the following period as soon as you resolve it.

**Phase 2 acceptance:** Two consecutive weeks where the system's figures match the manual calculation 100% · A clean week closed in under 10 minutes · Waiving a late penalty correctly restores the weekly bonus and correctly recalculates the streak · The exported file opens correctly on your computer.

**The system will not pay wages automatically.** The system calculates and presents; you confirm and pay. Responsibility for the correctness of payments remains with you.

---

### Phase 3 — Automated Time Clock · **6 weeks** *(conditional)*

Staff clock in to a shift by **scanning a QR code or entering a 6-digit code** shown on a dedicated device in the shop, with the code renewed every 30 seconds. Clocking in only succeeds when both hold: the code is still valid (proving the **time**) **and** there is a signal confirming the staff member is physically in the shop (proving the **place**).

Both factors are required. A code alone can be screenshotted and sent over Zalo; a location signal alone can be used by someone who has not started their shift. Together they are much harder to get around than either one alone.

**There is no clock-out.** The timer stops automatically at the scheduled end of the shift. Staff take one single action per shift.

> **This phase cannot have a start date yet.** You have not decided which presence check to use (shop Wi-Fi, NFC tag, Bluetooth device, or GPS). The cost and duration above are **provisional** and will be quoted formally once you decide.
>
> **Phases 1 and 2 are complete and fully usable without Phase 3.** Until the automated time clock exists, you record lateness by hand, and **none of the downstream rules change** — only the source of the timestamp is different. Once the automated time clock exists, the system takes its data from the clock, and manual entry goes back to its proper role: correcting a wrong or missing record.

**What to know about the interim approach:** the system assumes everyone is on time unless you record otherwise. A late arrival nobody notices creates no penalty and does not affect the bonus. Likewise, an unrecorded absence still counts towards the bonus until you cancel or shorten that shift on the schedule. This is a limitation that has been agreed and accepted, and it is resolved automatically in Phase 3.

---

## 5. ROLLOUT AND TRAINING

With a team of about 40 staff used to Zalo, **staff adoption is the biggest risk of the project — bigger than the technical side.** The rollout plan is designed around that:

1. **You first.** You are trained and schedule a whole week in the system yourself before any staff member sees it. **The app is installed on your phone in that same session** — in Phase 1 you record lateness and edit shifts from your phone; from Phase 2, your phone also receives notifications about understaffed shifts and held cases.
2. **A pilot group of 8–10 people** for one full cycle, alongside Zalo. Choose a full range of phones, including the oldest iPhone on the team.
3. **Hands-on guidance in Vietnamese** at shift handover. Install the app on the home screen **together with each person, on their own phone** — not sending instructions and hoping. Notification permission is turned on in the guidance round when Phase 2 launches.
4. **A one-page guide in Vietnamese**, posted in the shop and pinned in the Zalo group: the registration window Thursday 00:00 – Saturday 15:00, the "Select all shifts" button, and the rule that not registering means available all week.
5. **One firm switch-over date** after the pilot cycle. Keeping two channels in parallel indefinitely means neither will be trusted.
6. **Two weeks of intensive support** after each go-live, with committed response times.

---

## 6. INVESTMENT COST

### 6.1 Build cost

| Phase | Content | Duration | Cost |
|---|---|---|---|
| **Phase 0** | Confirm the outstanding rules, prepare infrastructure, sign the contract | 2 weeks | **VND 15,000,000** |
| **Phase 1** | Shift registration, scheduling & lateness recording | 20 weeks | **VND 370,000,000** |
| **Phase 2** | Notifications, control centre, payroll & bonus | 14 weeks | **VND 285,000,000** |
| **Phase 3** *(provisional)* | Automated time clock | 6 weeks | **VND 130,000,000** |

**The Phase 0 cost is credited in full against Phase 1** if you decide to continue.

**Total investment for Phases 0 + 1 + 2: VND 655,000,000** *(VND 15,000,000 + the remaining VND 355,000,000 of Phase 1 + VND 285,000,000)*
**Total investment for all 3 phases: VND 785,000,000** *(Phase 3 is provisional)*

*Prices exclude VAT.*

**Why the cost changed from version 2.0 (2026-09-08):**

| Change | Effect |
|---|---|
| Phase 1 adds: one weekly calendar combining registrations and scheduling, the panel beside the calendar, the Add button, the day-by-day list, the staff filter, Nicknames, the QC position and sub-positions, the overlap block, the publish gate for shifts without a position, the bonus preview, estimated pay | Increase |
| Phase 1 adds: full phone use for every screen (previously partly deferred to Phase 2), with testing of both layouts on real devices | Increase |
| Phase 1 adds: you adjust the shifts, registration window, position catalogue, skip reasons and default rate per position yourself (previously a software update) | Increase |
| App installation guidance and push notification testing move to Phase 2, with the notifications work | Decrease in Phase 0/Phase 1, slight increase in Phase 2 |
| The phone work in Phase 2 is smaller because it was done in Phase 1 | Decrease in Phase 2 |
| Phase 0 is shorter because the prototype completed the discovery and design work | Decrease |

*Note: version 2.0 gave the total for Phases 0 + 1 + 2 as VND 580,000,000, which did not subtract the VND 30,000,000 for Phase 0 even though it said "credited". Subtracted correctly, the total was VND 550,000,000. This version states the total after the credit.*

### 6.2 Recurring operating costs

| Item | Cost | Applies from |
|---|---|---|
| Maintenance & technical support | **VND 5,000,000/month** | After Phase 1 goes live |
| Maintenance & technical support *(with the payroll module)* | **VND 9,000,000/month** | After Phase 2 goes live |
| Server infrastructure & storage | Actual cost + 20% *(estimated VND 1,500,000 – 3,000,000/month)* | From go-live |

**Maintenance includes:** bug fixes, security updates, operational monitoring, backups, support via Zalo/phone during business hours with the response time set in the contract, and up to 4 hours of small adjustments per month.

**Maintenance does not include:** new features or changes outside the signed scope. These are quoted separately at **VND 2,500,000 per person-day**.

### 6.3 Equipment cost (Phase 3)

The device that shows the QR code in the shop (a tablet or dedicated screen, used only for this purpose) is supplied by you, estimated at VND 3,000,000 – 6,000,000. We will advise on a suitable configuration.

---

## 7. PAYMENT TERMS

| Phase | Payment milestone | Share | Amount |
|---|---|---|---|
| **Phase 0** | On signing | 100% | VND 15,000,000 |
| **Phase 1** | On signing the contract | 30% | VND 111,000,000 *(VND 96,000,000 payable after the Phase 0 credit)* |
| | Sprint 4 acceptance *(weekly calendar: see who registered)* | 25% | VND 92,500,000 |
| | Sprint 7 acceptance *(complete scheduling cycle)* | 25% | VND 92,500,000 |
| | Go-live acceptance | 20% | VND 74,000,000 |
| **Phase 2** | On signing the contract | 30% | VND 85,500,000 |
| | Week-close screen acceptance | 40% | VND 114,000,000 |
| | Acceptance after the parallel run | 30% | VND 85,500,000 |

Each phase is a separate contract. You have no obligation to continue to the next phase.

---

## 8. WARRANTY

**A 3-month warranty** from the acceptance date of each phase, covering defects against the agreed acceptance criteria. Bug fixes during the warranty are free of charge.

After the warranty, support is provided under the maintenance contract in section 6.2.

---

## 9. OUT OF SCOPE

The following are **not** part of the project. We list them explicitly to avoid misunderstanding later:

- Managing leave, sick leave and planned time off — still agreed on Zalo, with you reflecting it on the schedule
- Integration with Zalo in any form
- Multiple branches / multiple locations
- Overtime rules (your organisation does not use overtime)
- Integration with accounting software — exported files let you reconcile yourself
- Staff signing up for accounts or resetting passwords themselves
- In-app flows for staff to request leave, approval or shift swaps *(shift swaps you make on the schedule are included, see section 4)*
- Tracking staff disputes as a state in the system
- Apps downloaded from the App Store / Google Play *(may be considered in a later phase)*
- Reporting actual hours worked separately from scheduled hours *(needs clock-out, which belongs to Phase 3 onwards)*

---

## 10. YOUR RESPONSIBILITIES

To keep the project on schedule, we need you to:

1. **Confirm the eight proposed rules** that came up while building the prototype, during Phase 0: how coverage is counted when a shift starts partway through; blocking one person from having two overlapping shifts; requiring a replacement when someone leaves more than 30 minutes early; a "did not work" shift counting as 0 hours with no late penalty; previewing the effect on the bonus on the lateness screen; setting passwords directly in the staff profile; default rates per position being adjustable in the app; staff seeing sub-positions in their own schedule. Until confirmed, these rules are built in an adjustable form
2. **Decide business questions that come up** within 5 working days of receiving them
3. **Provide staff data**: the staff list, experienced positions, each person's pay rate, and staffing needs per shift
4. **Appoint someone to take part in acceptance** at each milestone, and attend the full Administrator training
5. **Select and mobilise the pilot group** of 8–10 staff
6. **Formally tell the team** that the system is the only scheduling channel from the switch-over date
7. **Before Phase 2:** tell us which phone and browsers you use, provide 5–8 staff phones for push notification testing, and set the date you stop using Zalo for scheduling
8. **Run the manual payroll reconciliation in parallel** during the 2 weeks of Phase 2
9. **Decide the presence check** before Phase 3 starts
10. **Supply the code display device** in the shop for Phase 3

Delays on any of the items above will extend the schedule accordingly.

---

## 11. RISKS AND ASSUMPTIONS

We state the uncertainties plainly, rather than leaving you to discover them mid-project.

| Risk | Response |
|---|---|
| **Staff forget to register and get scheduled for shifts they cannot work.** Phase 1 has no automatic reminder yet. | The system clearly separates those who actually registered from those who stayed silent, so you can remind them on Zalo before 15:00 on Saturday. Fully automated in Phase 2. |
| **Staff do not use the system, and you still have to schedule on Zalo.** This is the biggest risk of the project. | Pilot with a small group first; hands-on training in Vietnamese; you announce a firm switch-over date; the system is designed so that people who do not register are still treated as available, leaving no data gap |
| **Estimated pay in Phase 1 is mistaken for the official payroll.** | The figure is always labelled as an estimate, before lateness deductions and without bonus; stated clearly in the contract and at acceptance |
| **Push notifications on iPhone are unreliable.** iOS only supports push for apps installed on the home screen. | Tested on staff members' real phones **before Phase 2 is signed**. If the test fails, the design is adjusted before scope and cost are agreed |
| **The weekly calendar is slow on old phones when showing 40 staff.** The display was approved by you through the prototype (2026-09-27 – 28). | Measure speed on the oldest phone on the team from Sprint 4, not waiting until the end |
| **The eight proposed rules are changed after they are built.** | Build them in an adjustable form; ask for confirmation during Phase 0 |
| **Pay disputes after go-live.** | Run in parallel for 2 weeks before paying from the system; base pay is always released on time; every figure traces back to its source |
| **The presence check has not been decided.** | Phase 3 is fully separate. Phases 1 and 2 are complete without it |
| **Requests outside the scope.** Phase 1 scope has grown through the rounds of feedback on the prototype; that growth is already priced into this version. | The scope of each phase is attached to the contract as a feature list. Changes after signing are re-quoted in writing |

---

## 12. NEXT STEPS

| # | Action | Who |
|---|---|---|
| 1 | You review and respond to this document | You |
| 2 | A meeting to discuss, clarify scope and adjust if needed | Both parties |
| 3 | Sign the Phase 0 contract | Both parties |
| 4 | Confirm the eight proposed rules and how estimated pay is shown | You |
| 5 | Prepare infrastructure, run the data-recovery drill | Delivery team |
| 6 | Hand over the updated requirements document and the Phase 1 contract | Delivery team |

---

*This quotation is valid for 30 days from the date of issue. The Phase 3 cost is provisional and will be quoted formally once you decide on the presence check.*
