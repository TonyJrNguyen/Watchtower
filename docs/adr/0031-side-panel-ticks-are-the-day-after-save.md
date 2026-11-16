# Side panel ticks are the day after Save

Until v1.13 the ticks in the side panel (FR-O43) were the periods an action applied to: Save wrote the panel's position into every ticked period, Take off removed them, and an unticked period was left alone. Once the panel ticked every held period by default (D19), a Save from one marker overwrote the position, position details and custom times of the other periods. Tony also asked for clicking an unplaced marker to tick the held periods as well. After comparing both panels in a working mock-up on 2026-11-12, Tony decided that **the ticks are the day the staff member will have after Save**, and that **Save writes only the difference** from what they held.

## Considered options

- **Keep ticks as targets and remember whether the position was touched.** The smallest change. Adding one period and dropping another still takes two actions, the two buttons remain, and a position can't be changed on one period without unticking the others.
- **A position control on every period row.** The most explicit, but too heavy for the bottom sheet on a phone, and sub-positions have nowhere to go.

## Consequences

- The panel opens with every held period ticked. Opened from a period the staff member doesn't hold, it also ticks that period as a **suggestion**, which on its own doesn't count as an unsaved change.
- The position goes to the **context period** (the one whose marker or row was selected) and to newly ticked periods; other held periods keep theirs. *Apply to every ticked period* covers the whole day. A new period gets no position unless one is chosen, because guessing from a neighbour would assign a position silently.
- Take off is removed. Unticking a period and saving takes the staff member off it, and Save with nothing ticked takes them off the whole day after a confirmation. In a published week, unticking cancels the assignment (FR-O8) and needs a reason.
- The panel gains **Reset** and **Cancel**, and asks Save / Discard / Stay when it is left with unsaved changes. Another marker of the same staff member and day changes the context period instead of closing the panel, which amends D18.
- Cancel also takes back a placement Add has just made (FR-O46), as long as nothing has been saved in that opening of the panel. Reset and every other way of closing keep it, so Add still places at once. Tony decided this on 2026-11-12, after a chip left behind by Cancel looked like a bug.
- On the server, Save sends the changes for each period and is refused when the day has changed since the panel loaded it, so two sessions can't overwrite each other's periods. Untouched assignments keep their identity and history (FR-O14, FR-O44).
- No rule is needed for locking a registration once it is assigned. Registration locks for the whole week before placing opens (FR-O10, FR-S5). If registration can ever reopen after placing has started, this decision has to be revisited, most simply by locking whole days.
