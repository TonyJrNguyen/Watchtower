# Lateness that would cost the whole assignment is an anomaly, not a deduction

The deduction is twice the minutes late, so it reaches the assignment's length at half its duration. When it does, the system applies **neither the deduction nor the late penalty**. It raises an anomaly, holds the week's bonus as pending, and asks the Administrator to decide: on time, full deduction, reduced deduction, corrected arrival time, or no-show, each with a logged reason. Lateness of this size is more often a recording failure, such as a missed or failed clock-in or a device that was down, than a real arrival, and an automatic deduction would penalise staff for an infrastructure fault.

## Consequences

Every downstream rule follows the same principle: where the data is probably wrong, the system presents the case instead of acting on it. Resolving an anomaly re-evaluates the week's bonus and recalculates the streak forward.
