# Usual positions are learned from the schedule; the experience flag reads hours

A staff member's **usual positions**, at most two, are learned from the published schedule instead of being typed in (FR-A12). At each publication the system ranks positions by published hours over the last 12 weeks, keeps those above 50 hours, and takes the top two. Tony asked for this on 2026-10-17, thinking of how a photo app tags a picture once it has seen enough. The Owner stays in charge: a position set by hand is pinned, and a position the Owner removes is counted again from zero, so it comes back only if the Owner keeps assigning it. Phụ trách is never learned, because it follows the shift-lead switch ([ADR 0021](0021-rates-are-per-person-and-the-shift-lead-is-granted.md)).

The out-of-experience flag and the calendar filters do **not** read the two tags (FR-O32). They read **experienced positions**: more than 50 published hours over the whole history, or a position set by hand. Otherwise someone who regularly works three positions would be flagged forever in the third.

The client confirmed the rule on 2026-10-17. Its numbers stay settings so that they can be tuned without a release.

## Consequences

- Hours per staff member, position and date are stored as an aggregate (PositionHours). It outlives the 90-day assignment purge ([ADR 0015](0015-tiered-data-retention.md)), because experience counts over the whole history.
- The audit log gains a **System** actor for changes the system makes itself, each with its reason. The Owner gets no other notice, and the UI doesn't tell learned positions from hand-set ones.
- Hours are counted as clock time, not paid time: the whole of CA 5 counts as 6 hours. Only published assignments count; drafts never move a tag.
- The hours shown to the Owner and to the staff member (FR-A14) are a third reading of the same data: shifts that have ended, whole history, never reset. They explain the tags without exposing them, since staff see every position they have worked, not which ones are usual.
- Considered and rejected: add-only learning on a running total from go-live, before the two-position limit existed. Once only two places existed, positions had to be able to drop out, and a total from go-live would make the top two almost impossible to change.
