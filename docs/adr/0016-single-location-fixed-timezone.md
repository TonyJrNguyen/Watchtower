# Single location, fixed Asia/Ho_Chi_Minh timezone

The system serves one shop and the client has no expansion planned, so nothing is scoped by location. All dates, times, the registration window, shift period boundaries and token validity are evaluated in **Asia/Ho_Chi_Minh (UTC+07:00)**, fixed in configuration. Timestamps are still **stored with timezone information**, so that making the timezone configurable later needs no data migration. All money is whole VND.

## Consequences

A second location would add a location dimension to schedules, staffing needs and staff lists. That's worth knowing, not worth building now.
