# Ca Làm — Shift Scheduling & People Management

Hệ thống quản lý ca làm và nhân sự cho khách retail/café ~40 nhân viên tại
Việt Nam, thay thế quy trình thủ công qua Zalo.

- **PRD:** `docs/prd/shift-scheduling-solution-requirements.md`
- **Mục chờ khách xác nhận:** `docs/decisions/pending-confirmation.md`
- **Demo Phase 1 (interactive prototype):** mở `prototypes/phase1-demo.html`
  bằng trình duyệt bất kỳ, không cần server
- **Hướng dẫn cho Claude Code:** `CLAUDE.md`

## Quy trình làm việc

1. Bàn và chốt thay đổi PRD trong chat với Claude (claude.ai)
2. Nhận patch, áp dụng vào `docs/prd/...` (thủ công hoặc nhờ Claude Code)
3. Ghi một dòng vào `docs/prd/CHANGELOG.md`, commit
4. Dùng Claude Code trong repo này để build tính năng, luôn theo đúng
   `docs/prd/...` làm nguồn chân lý và `CLAUDE.md` làm kim chỉ nam phạm vi
