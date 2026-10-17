# Headcount and experience live at the position level only

Eight positions (Phụ trách, QC, Thu Ngân – Offline, Thu Ngân – Online, Pha chế, Phục vụ, Kiểm tra đơn, Bếp) carry staffing needs and experience (usual and experienced positions). Their **sub-positions** and **attributes** (for example Pha chế - Matcha, Phục vụ - Bưng bàn) are descriptive only: they never change headcount, coverage, rate, pay, experience flags or the bonus. Colour on the calendar identifies the position, never the sub-position. The client confirmed this on 2026-09-28.

Amended in PRD v1.10 (2026-10-16/17). Positions no longer carry a default rate, because rates belong to the person ([ADR 0021](0021-rates-are-per-person-and-the-shift-lead-is-granted.md)); the only thing pay reads from the position is whether it is Phụ trách. Phụ trách was added with a sub-position that is **required**, exactly one of Trong or Ngoài. It stays descriptive: both are paid alike and the headcount need covers the position as a whole. The file name keeps the old wording so that links to it still work.

## Consequences

- Thu Ngân – Online and Thu Ngân – Offline are two separate positions, not sub-positions of one cashier position, because each needs its own headcount.
- Other than on Phụ trách, sub-positions and attributes are optional and can be combined on one assignment.
- The client says "role" for a position. Code and docs say **position**, and "role" is reserved for access (Superadmin / Administrator / Staff).
