# Watchtower

Shift scheduling and people management for a single café of about 40 staff. Staff register when they can work, the Administrator builds and publishes the week, and the system keeps the record that schedules, lateness, pay and bonus are computed from.

The client speaks Vietnamese. Vietnamese UI terms are given in parentheses where they differ from the English term used in code.

## Language

### People and access

**Administrator**:
The role held by the client, the shop owner (Chủ quán). Manages staff accounts and builds and changes every schedule. "Owner" in prose means the same person.
_Avoid_: Manager, admin user

**Superadmin**:
The role held by the system provider, with full technical access for setup and support. Every Superadmin session is visible to the Administrator.
_Avoid_: Developer account, root

**Staff member** (Nhân viên):
A person who works shifts at the shop and holds a Staff account.
_Avoid_: Employee, worker, user

**Role**:
An account's access level: Superadmin, Administrator or Staff. Never the job someone does on a shift. That is a **Position**.
_Avoid_: Using "role" for position, even though the client does

**Active staff**:
Staff members whose account has not been deactivated. Every scheduling rule and view counts active staff only.
_Avoid_: Current staff, enabled staff

**Deactivate**:
To revoke a staff member's login while keeping all their records. Staff are never deleted.
_Avoid_: Delete, remove, archive

**Nickname** (Biệt danh):
A short name, unique among active staff, shown only where the full name doesn't fit, such as the calendar markers. Anywhere the full name fits, the full name is shown instead.
_Avoid_: Alias, display name, short name

### Shift structure

**Shift period** (Ca, CA 1–CA 5):
One of the five fixed blocks a day is divided into, from 07:00 to 23:00. Staff register in shift periods. Assignments don't have to align with them.
_Avoid_: Slot, time block, and a bare "shift" when the period is meant

**Week**:
Monday 00:00 to Sunday 23:59. The same span is the scheduling week, the bonus week and the pay period.
_Avoid_: Work week, roster week

**Week being scheduled**:
The upcoming week whose availability is registered, locked and assigned now. Earlier weeks are published and read-only.

**Position** (Vị trí):
The job a staff member does on an assignment, such as Pha chế or Thu Ngân – Online. Headcount, rate and qualification are held at this level only.
_Avoid_: Role, job title, station

**Sub-position** (Vị trí con):
The area within a position where the work is done, such as Pha chế - Matcha. Descriptive only.
_Avoid_: Child position, sub-role

**Attribute** (Thuộc tính):
Extra work done alongside a position, such as Phục vụ - Bưng bàn. Descriptive only.
_Avoid_: Tag, skill

**Position detail**:
The collective name for sub-positions and attributes.

**Qualified positions**:
The positions a staff member is listed as able to work. Advisory: assigning outside them is flagged, not refused.
_Avoid_: Permissions, skills, certifications

**Staffing need**:
The headcount the Administrator wants for one position in one shift period on one date.
_Avoid_: Demand, requirement, quota

### Registration

**Registration** (Đăng ký):
A staff member's statement of which shift periods they can work in the week being scheduled. It records constraints and is not a commitment to work.
_Avoid_: Shift request, booking, sign-up

**Registration window**:
Thursday 00:00 to Saturday 15:00, when staff can change their registration for the following week.
_Avoid_: Submission period

**Lock**:
The moment the registration window closes and registrations become read-only. Assignment can only start after it.

**Counted as free**:
The state of a staff member who registered nothing for the week, who is then available for every period. This is different from registering every period explicitly.
_Avoid_: Unregistered (on its own), missing, default availability

**Contract expectation**:
At least 5 days of 8 hours in a week. Registering below it raises a warning and never blocks anything.
_Avoid_: Minimum hours rule, quota

### Scheduling

**Weekly calendar** (Lịch tuần):
The one Administrator surface for seeing registrations, placing people and giving positions. It can be viewed by Day, 3 Days or Week.
_Avoid_: Availability screen, assignment screen (as separate surfaces)

**Assignment**:
A record that one staff member works one time range on one date, with zero or more positions. It is the unit for pay, coverage and lateness.
_Avoid_: Shift (for the record), booking, roster entry

**Place** (Xếp người):
To put a staff member into shift periods, before or without giving a position.

**Give a position** (Gán vị trí):
To set the positions, and optionally the position details, on a placed assignment.

**Primary position**:
The first position on an assignment, which decides the default rate when the staff member has no rate of their own.

**Shared assignment**:
An assignment that carries two or more positions, so it counts toward each position's headcount and is marked as shared.
_Avoid_: Split shift, double role

**Draft**:
The state of an assignment before its week is published. Staff can't see draft assignments.

**Publish** (Công bố):
The Administrator's explicit action that makes a week's assignments visible to staff. A week is published once; later changes take effect immediately.
_Avoid_: Release, finalise, send

**Publish gate**:
The check that blocks publishing while any active staff member has no assignment and no skip, or any assignment has no position.

**Skip** (Bỏ qua tuần này):
The Administrator's deliberate decision to leave one active staff member unassigned for one week, with a reason from a fixed list.
_Avoid_: Exclude, exempt

**Out-of-availability**:
A flag on an assignment that covers time the staff member didn't register. It's a warning, never a block.

**Out-of-qualification**:
A flag on an assignment to a position outside the staff member's qualified positions. It's a warning, never a block.

**Coverage** (Độ phủ):
How the people placed in a shift period compare with its staffing needs: filled, understaffed or overstaffed.
_Avoid_: Staffing level, fill rate

**Day roster**:
The section under the weekly calendar that lists, for one day, every active staff member against the five shift periods.
_Avoid_: Ai đăng ký (as a separate screen)

**In range**:
Describes a staff member who, on a date in view, can work at least one period or holds an assignment. Only in-range staff appear on the calendar.

**Early departure**:
A staff member leaving before the end of their assignment. Departures of more than 30 minutes are recorded by shortening the assignment and giving the remaining time to a cover.

**Cover** (Người thay):
The staff member who takes over the rest of an early departure's assignment.
_Avoid_: Replacement shift, backup

**Swap**:
Two staff members exchanging assignments. They agree on Zalo and the Administrator records it in one action.

**My Schedule** (Lịch của tôi):
A staff member's own published assignments, read-only.

### Lateness

**Arrival time**:
When a staff member actually started an assignment. In Phase 1 the Administrator records it by hand; when there's no entry, the staff member is on time.
_Avoid_: Check-in time, clock-in (until the time clock exists)

**Grace**:
The first 10 minutes after an assignment's start, during which arriving still counts as on time.
_Avoid_: Tolerance, buffer

**Late penalty**:
A flag recorded for an arrival from minute 11 onward that voids the week's bonus. It costs no money in itself.
_Avoid_: Fine, phạt tiền, deduction

**Deduction**:
Pay withheld for an arrival from minute 16 onward, equal to twice the minutes late at the staff member's rate. Phase 1 shows it in minutes only.
_Avoid_: Penalty, fine

**Anomaly**:
An arrival whose deduction would reach or exceed the assignment's length. It's held for the Administrator's review instead of being applied.
_Avoid_: Exception (reserved for the time clock), error

**No-show**:
An Administrator's ruling that a staff member didn't work an assignment at all, which counts it as zero hours.
_Avoid_: Absence, missed shift

**Exception**:
A time-clock event, such as a missing or failed clock-in, raised for review. Phase 3 only.

### Pay and bonus

**Assigned hours**:
The hours of a staff member's assignments, which pay and the 8-hour bonus test are computed from. Clocked time never changes them.
_Avoid_: Worked hours, clocked hours, actual hours

**Rate**:
The hourly pay for an assignment: the staff member's own rate if set, otherwise the primary position's default rate.
_Avoid_: Wage, salary

**Pay estimate**:
Phase 1's display of assigned hours × rate, labelled as before deductions and bonus. It isn't payroll.

**Pay period**:
One week, paid the following Monday. Nothing is calculated across two pay periods.
_Avoid_: Payroll cycle, month

**Base pay**:
Pay from assigned hours × rate. It's released at the weekly close without waiting on any review.

**Weekly bonus**:
100,000 VND for a week with at least 5 days of 8 or more assigned hours and no late penalty on any day.
_Avoid_: Attendance bonus, incentive

**Streak**:
A count of consecutive weeks in which the weekly bonus was earned. It resets to zero when a week misses the bonus or when a streak bonus pays out.

**Streak bonus**:
An extra 200,000 VND paid in the week a streak reaches four.

**Bonus potential**:
The system's calculated weekly bonus and streak result, shown to the Administrator as a proposal until they confirm it at the weekly close.
_Avoid_: Earned bonus (before confirmation)

**Pending**:
The bonus state of a week that holds an unresolved anomaly or exception: neither earned nor lost.

**Bonus hold**:
An open item, such as an anomaly or exception, that blocks confirming one staff member's bonus for one week.

**Weekly close**:
The Administrator's end-of-week step that releases base pay and confirms bonuses for all staff. Phase 2.
_Avoid_: Payroll run

**Special-rate date**:
A calendar date, such as a public holiday, whose work is paid at a multiplier.
_Avoid_: Overtime (the shop doesn't have overtime)

### Records and time clock

**Audit log** (Nhật ký):
The record of every change: who made it, when, the old and new values, and a reason where one is required. With no approval workflow, it's the only evidence of why something changed.
_Avoid_: History, activity feed

**Time clock** (Chấm công):
Phase 3 clock-in from a rotating QR or 6-digit code plus a presence signal. Until then, lateness is recorded by hand.

**Presence signal**:
The second clock-in factor that proves a staff member is on the premises. The mechanism hasn't been chosen yet.
