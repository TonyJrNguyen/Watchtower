# Ca Làm — shift scheduling & people management

Nguồn chân lý duy nhất cho requirement là:
**`docs/prd/shift-scheduling-solution-requirements.md`**

Trước khi code bất kỳ tính năng nào, đọc file đó. Nếu một hành vi không rõ
trong PRD, kiểm tra `docs/decisions/pending-confirmation.md` — nếu nó nằm ở
đó nghĩa là quy tắc chưa được khách chốt, hãy làm cho **cấu hình được**
thay vì hardcode.

## Phạm vi Phase 1 (đang build)

Chỉ build bốn nhóm sau. Đừng động vào bất kỳ thứ gì thuộc Phase 2/3 trừ khi
được yêu cầu rõ ràng — xem §4.13 trong PRD để biết ranh giới chính xác.

1. Account Management (FR-A1–FR-A10)
2. Availability Registration, whole-period, cửa sổ Thứ Năm 00:00 – Thứ Bảy 15:00 (FR-S1–FR-S19)
3. Shift Assignment: draft/publish, publish gate, early-departure, swap (FR-O1–FR-O40, trừ FR-O34–FR-O37 là Phase 2)
4. Manual lateness recording + mọi rule tính từ đó: grace 10 phút, late penalty từ phút 11, trừ lương gấp đôi từ phút 16, anomaly khi khoản trừ ≥ ca (FR-O24–FR-O26, FR-S9, FR-S17, FR-S18, FR-T18, FR-B1, FR-B17)

**Không build ở Phase 1:** thông báo/push (§4.8, toàn bộ FR-N*), control centre
(FR-O34–FR-O37), chốt lương tuần + bonus engine + performance dashboard (§3.9–3.13,
FR-C*, FR-B1–FR-B16 trừ FR-B17, FR-P*). Time clock tự động (§4.4, toàn bộ FR-T*
trừ FR-T18) là Phase 3, đang chờ quyết định G51.

**Đã build ở Phase 1** (khác với bản thu hẹp gốc): responsive đầy đủ hai chiều
cho cả Chủ quán lẫn Nhân viên (NFR-5) — xem `prototypes/phase1-demo.html` để
biết layout mobile cho từng màn (per-ngày cho lịch rảnh, thẻ độ phủ theo ca
cho xếp lịch, thẻ cho danh sách nhân viên/nhật ký).

## Luật xuyên suốt, áp dụng cho mọi màn

- Song ngữ VI/EN, chọn theo từng người dùng (NFR-7) — không hardcode chuỗi
- Múi giờ **Asia/Ho_Chi_Minh (UTC+7)** cố định cho v1, dù lưu timestamp kèm
  timezone để sau này đổi không cần migrate dữ liệu (NFR-11)
- Tiền luôn là VND, không có cắc lẻ
- Đọc quyền phải chặn ở **server-side**, không chỉ ẩn ở UI (NFR-2) — nhân viên
  không được thấy lịch/lương người khác dù gọi thẳng API
- Mọi Create/Update/Delete phải ghi audit log: actor, timestamp, giá trị cũ/mới,
  lý do nếu có (NFR-1) — vì hệ thống không có approval workflow, log này là
  bằng chứng duy nhất cho lý do một thay đổi xảy ra

## Tham khảo hành vi UI

`prototypes/phase1-demo.html` là bản demo tương tác đã duyệt với khách cho
các màn Phase 1 (PRD §5.3 coi đây là bản tham chiếu, thay thế Wireframe v1
cho các màn này). Khi có mâu thuẫn giữa demo và PRD, PRD thắng — demo chỉ là
minh hoạ hành vi, một số quy tắc trong đó còn đang *proposed pending
confirmation* (xem file quyết định ở trên).

## Quy trình cập nhật PRD

PRD được bàn và chốt trong chat với Claude (claude.ai), không phải ở đây.
Sau mỗi lần chốt thay đổi, patch được dán vào đây và áp dụng thủ công hoặc
qua Claude Code, rồi commit — xem `docs/prd/CHANGELOG.md`.
