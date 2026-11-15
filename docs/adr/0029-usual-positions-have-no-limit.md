# Usual positions have no limit, and the experience flag reads them

At the review of 2026-11-10 the client asked to drop the limit of two usual positions while keeping the learning from hours and the Owner's override (FR-A12). Every position with more than 50 published hours over the last 12 weeks is now a usual position, however many that makes, and so is every position the Owner ticks. This amends [ADR 0022](0022-usual-positions-are-learned-from-the-schedule.md).

With no limit there is nothing left to rank, so the top-two ranking and its tie rule go. The second list ADR 0022 kept for the out-of-experience flag, *experienced positions* (more than 50 hours over the whole history), existed only because two places weren't enough for someone who works three positions. Without the limit it adds nothing, so Tony decided that the flag and the experience filter read the usual positions (FR-O32).

## Considered options

- **Keep experience as its own list, over the whole history.** Rejected: two lists that differ only in their window would confuse the Owner, who would see a position on the staff form and still get a flag, or the reverse.
- **Keep a limit, set high.** Rejected: the client asked for none, and the limit stays out of configuration.

## Consequences

- A position worked a lot long ago but not in the last 12 published weeks drops out at the next publication, and assignments to it are flagged again. The Owner clears that by ticking it, which pins it.
- Flags now change at publication, when usual positions are recomputed, or when the Owner ticks a position. They no longer clear in the middle of a week as live hours pass a threshold.
- Pinning a ticked position and restarting the count from zero on removal stay as in ADR 0022. The 50-hour threshold and the 12-week window stay settings.
- PositionHours is still kept after the assignment purge ([ADR 0015](0015-tiered-data-retention.md)), because the hours worked shown in FR-A14 count over the whole history.
- The staff form no longer refuses a third position.
