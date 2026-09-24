# Nhật ký thay đổi PRD

Mỗi dòng ứng với một commit áp dụng patch từ phiên chat với Claude. Chi tiết
từng thay đổi xem trong nội dung commit hoặc lịch sử chat.

## v1.2 — 2026-09-18
- Restate Phase 1 scope theo bản thu hẹp 08/09 (notifications, control centre → Phase 2)
- NFR-5 (responsive parity) kéo trở lại Phase 1 sau khi demo cho thấy chi phí thấp hơn dự kiến
- Thêm FR-O38 (coverage đếm theo full-period), FR-O39 (chặn double-booking assignment)
- Bổ sung hiệu ứng cho FR-O20 (bắt buộc người thay khi về sớm > 30 phút) và FR-T18 (no-show = 0 giờ)
- Thêm FR-B17 (bonus preview ở màn lateness), FR-A7 bổ sung (mật khẩu là field trong hồ sơ), FR-O40 (lương mặc định theo vị trí sửa được trong app)
- Tất cả sáu mục mới/bổ sung ở trên đánh dấu *proposed pending client confirmation* — xem `docs/decisions/pending-confirmation.md`

## v1.1 — 2026-09-07
- Bản PRD do khách duyệt trước khi bắt đầu demo Phase 1 (baseline)
