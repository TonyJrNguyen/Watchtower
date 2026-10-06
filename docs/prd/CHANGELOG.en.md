# PRD changelog

> English version of [`CHANGELOG.md`](CHANGELOG.md). The Vietnamese original is
> the copy in force. When one changes, update the other to match.

Each entry matches a commit that applies a patch from a chat session with
Claude. For the details of each change, see the commit or the chat history.

## v1.8 — 2026-10-04
- Amended FR-O24: the Lateness screen can open **earlier weeks** (within the §4.11 retention limit), view only: recorded arrival times, classification (FR-O25) and the week summary, with a notice that the week is for review only. In the prototype since 2026-10-03
- §5 (new resolved item) and §5.3 updated accordingly
- Display only, no new business rule, so not added to the *pending confirmation* list
- Backlog: added S-4.17 (FR-O47, 5 md) and S-7.9 (FR-O24, 2 md), S-4.2 from 6 to 8 md; Phase 1 from 200 to **209 md**. Roadmap updated for sprints S4 and S8 and effort by role (~174 md)

## v1.7 — 2026-10-04
- Following the calendar prototype review on 2026-10-03 (prototype on branch `feature/calendar-day-3day-week-views`)
- Added FR-O47 (Phase 1): the calendar can be viewed by **Day / 3 Days / Week** (weeks run Monday to Sunday). Previous/next moves by exactly the length of the view and keeps the view; 3 Days may span two weeks. Earlier weeks can be reviewed (published, view only, within the §4.11 retention limit); navigation never goes past the week being scheduled
- Which staff appear on the calendar depends only on the dates in view: available for at least one shift on those dates (registered, or unregistered and therefore counted as available under FR-S19) or holding a shift on those dates. People out of scope do not appear on the calendar but **stay in the staff list**, in a "Not in these dates (N)" section at the end of the list: dimmed text, an empty and locked checkbox, and the name cannot be clicked. When they come back into scope, they keep the checked state they had before leaving scope
- Amended FR-O11: the Filter and the master checkbox describe only people in scope; Select all / Deselect all / Invert selection act on **every** staff member, including those out of scope. Scheduling, Assigned position and the two scheduling warnings read the dates in view; the Registration group ("Available all week") and Short of hours keep their whole-week meaning. An option that describes nobody still shows, unchecked and disabled. **Clicking the name** of a staff member or an option shows only that person or group; ticking a checkbox still adds/removes as before
- Amended FR-O10, FR-O42 (dates in view, per-day tabs on phone, no Add button in earlier weeks), FR-O43 (previous/next by the dates in view, view only in earlier weeks)
- §3.5, §5 (new resolved item), §5.0 (the single-week calendar moved to *Superseded*) and §5.3 updated accordingly
- Display/interaction only, no new business rule, so not added to the *pending confirmation* list

## v1.6 — 2026-09-28
- Following feedback on the Filter prototype v1.5 the same day (prototype updated in commit bed078a)
- Rewrote FR-O11: **the checked staff list is the only state**. Each Filter option mirrors that selection like a spreadsheet filter — checked when everyone it describes is selected, "–" when some are, empty when none are; checking selects them all, unchecking deselects them. Added a "none" option to the groups (No position, No experience, Nothing needing attention) so everyone is described in every group. Removed the OR/AND logic, the filter chips and the Clear filters button
- Select all / Deselect all / Invert selection became a **master checkbox** under the staff search box, acting on all active staff
- §3.5, §5 (new resolved item), §5.0 (the v1.5 Filter behaviour moved to *Superseded*) and §5.3 updated accordingly
- Display/interaction only, no new business rule, so not added to the *pending confirmation* list

## v1.5 — 2026-09-28
- Following feedback on calendar prototype v1.4 the same day
- Added FR-O46 (Phase 1): an **Add** button in each shift cell of the calendar to place someone who did not register for that shift. By default the list contains only people who did not register for this shift (without the "Did not register for this shift" tag); searching by name also shows people who registered, people who have not registered for the week (counted as available) and people already placed in this shift, with tags. Choosing a person opens the side panel with that shift selected; the shift is flagged as outside availability, as in FR-O12
- Rewrote FR-O11: removed the quick-select buttons, replaced by one **Filter** button covering every attribute shown on the calendar (Registration, Scheduling, Assigned position, Experienced, Needs attention). Multiple selection: OR within a group, AND across groups; each option shows the number of matching people, updated by the other groups; each group can be collapsed; active filter chips. Select all / Deselect all / Invert selection sit in the Filter and act only on the people currently listed
- §3.5, §5 (new resolved item) and §5.3 updated accordingly
- Display/interaction on existing data only, no new business rule, so not added to the *pending confirmation* list

## v1.4 — 2026-09-28
- Following the client feedback of 2026-09-27 and the answers of 2026-09-28 (`docs/feedback/2026-09-27-client-feedback.md`)
- §3.3: the position catalogue went from 6 to **7 positions** (added QC). Added sub-positions: QC Inside/Outside; Barista Milk tea/Matcha/Tea/Bồn. Added the Server attribute Table running. Headcount, rate and qualification are held at position level only. Display label "Position - sub-position/attribute", colour by position. Cashier Online/In-store remain two separate positions
- §3.5: merged Availability and Scheduling into **one weekly calendar**, used in 3 steps before publishing: see who registered, place people, assign positions. Scheduling is only possible after registration locks
- Added FR-A11 (Nickname, unique among active staff), FR-O42 (the calendar shows each person by nickname, coloured by position, hover/tap), FR-O43 (side panel: one person, one day, several shifts), FR-O44 (neighbouring shifts with the same position join into one assignment; different positions split), FR-O45 (sub-positions/attributes are descriptive only)
- Amended FR-A1, FR-O1, FR-O4, FR-O10, FR-O11, FR-O23, FR-O28, FR-O29 (draft assignments may have no position), FR-O31/FR-O33 (publishing is blocked while any shift has no position), FR-O41 (the roster becomes a section below the calendar), NFR-5, §4.10
- §5: recorded the 2026-09-28 decisions; the 6-position catalogue, the two separate screens and "an assignment always has a position" moved to §5.0 *Superseded*
- One new *proposed pending client confirmation* item: staff see sub-positions/attributes in "My Schedule" (FR-O45). All other decisions were confirmed by the client

## v1.3 — 2026-09-27
- Added FR-O41 (Phase 1): the Scheduling screen has a **Who registered** mode — see day by day who registered for which shift, who has not registered (counted as available), who cannot work that day, and who already has a shift, before starting to assign positions. Requested by the Owner. Sorting: morning to evening (default), most/fewest shifts, most/fewest hours — ties sort morning to evening
- §3.5 adds the step of reviewing the day roster before scheduling; §5.3 records that the demo has this screen
- Not a new business rule (only displays existing data), so not added to the *pending confirmation* list

## v1.2 — 2026-09-18
- Restated Phase 1 scope per the 2026-09-08 narrowing (notifications, control centre → Phase 2)
- NFR-5 (responsive parity) pulled back into Phase 1 after the demo showed it costs less than expected
- Added FR-O38 (coverage counted by full period), FR-O39 (block double-booked assignments)
- Added effects to FR-O20 (replacement required when leaving more than 30 minutes early) and FR-T18 (no-show = 0 hours)
- Added FR-B17 (bonus preview on the lateness screen), an FR-A7 addition (the password is a field in the profile), FR-O40 (default rate per position editable in the app)
- All six new/amended items above are marked *proposed pending client confirmation* — see `docs/decisions/pending-confirmation.md`

## v1.1 — 2026-09-07
- The PRD approved by the client before the Phase 1 demo started (baseline)
