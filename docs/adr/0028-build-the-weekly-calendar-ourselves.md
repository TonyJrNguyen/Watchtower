# Build the weekly calendar ourselves

The weekly calendar (FR-O42–FR-O52, wireframe option B) is a grid of 7 days × 5 shift periods (CA1–CA5, of 4, 2, 2, 2 and 6 hours). Each cell lists up to about 40 people as nickname markers that wrap, so a cell grows with the number of people. Inside a cell the order follows FR-O49, people are grouped by position, and the cell carries sub-position marks, warnings, the placed/needed count and the Add action. The phone shows one day at a time with a bottom sheet, and the export (FR-O52) draws the same layout. We **build this grid as our own React + Tailwind component**, ported from the wireframe markup. The libraries around it are all MIT: date-fns for dates in UTC+7, Floating UI or Radix for popovers, dialogs and the bottom sheet, and html-to-image + pdf-lib for the export. Decided by Tony on 2026-11-08 (backlog ENABLER-4).

## Considered options

- **FullCalendar v6, MIT edition, customised through its render hooks.** Rejected after a working demo that redrew the week of 12–18 October in four ways, next to the approved wireframe. None of them kept the shift periods aligned across days while letting markers wrap inside a cell. The time grid sizes CA5 three times taller than CA2 and splits 15–25 people into columns a few pixels wide. The day grid has no rows per period, and its list-per-day mode breaks the alignment across days. The view with arbitrary rows (resource timeline) is in the paid Premium edition. The hard parts (markers, FR-O49 order, grouping, cell header) would still be our own code, injected into the library's DOM, which tends to break on upgrades. The phone layout and the export would still be built outside it. What it would save, date navigation and view switching, is the small part.
- **A two-day spike of both before choosing.** Not needed: the demo already answered the question.

## Consequences

- ENABLER-4 becomes "build the grid component from the wireframe, with a performance test at 40 people × 35 cells (about 1,400 markers a week)". Its estimate is revisited in the backlog re-estimate after the client's review of v1.11.
- We write the date navigation, the Day / 3 Days / Week views and the read-only earlier weeks ourselves, on date-fns.
- Accessibility is our job: arrow-key movement in the grid and ARIA roles, plus memoisation so a change re-renders only the cells it touches.
- There is no built-in drag and drop. The PRD doesn't ask for it: people are placed through the side panel.
- The same component renders the export, so the exported image or PDF matches the screen.
- Every library involved is MIT, in line with [ADR 0025](0025-third-party-code-is-permissively-licensed.md).
