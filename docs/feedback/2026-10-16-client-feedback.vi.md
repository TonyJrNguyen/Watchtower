# Feedback khách — 16 và 17/10/2026 (Phụ trách, lương, vị trí; PRD v1.9)

> Bản tiếng Việt của [`2026-10-16-client-feedback.md`](2026-10-16-client-feedback.md).
> Bản chính là bản tiếng Anh. Khi sửa một bản, cập nhật bản còn lại cho khớp.
> "Role" trong lời khách nghĩa là *vị trí* (PRD §3.3).

Trạng thái: **đã chốt (17/10) và đã áp dụng** vào PRD v1.10 và wireframe Phase 1, trừ các mục ở 0.6. Mục 0 là các quyết định; mục 1 tóm tắt những gì đã được yêu cầu, giữ lại để truy vết. Nếu hai mục khác nhau thì theo mục 0.

---

## 0. Quyết định

### 0.1 Phụ trách

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| L1 | Vị trí mới | **Phụ trách**, vị trí thứ tám | §3.3 |
| L2 | Vị trí con | **Bắt buộc**, chọn đúng một: Trong hoặc Ngoài. Lương như nhau | FR-O45 |
| L3 | Ai được làm | Chỉ người được chủ bật **công tắc Phụ trách** trong hồ sơ. Đây là chặn thật, khác mọi vị trí khác chỉ cảnh báo | FR-A13, FR-O51 |
| L4 | Tắt công tắc | Ca phụ trách đã xếp vẫn giữ, gắn cảnh báo "Đã tắt Phụ trách, cần đổi người phụ trách" để chủ xếp lại | FR-O51 |
| L5 | Số người cần | Một con số cho cả Phụ trách mỗi ca (mẫu là 2), không tách theo Trong hay Ngoài | FR-O1 |

### 0.2 Lương

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| P1 | Mức lương | Theo người: **lương cơ bản** ở mọi tài khoản, cộng **lương phụ trách** khi bật công tắc | FR-C2 |
| P2 | Dùng mức nào | Giờ làm Phụ trách tính lương phụ trách; mọi vị trí khác tính lương cơ bản | FR-C13 |
| P3 | Bắt buộc lương phụ trách | Có, khi bật công tắc; form nhân viên không cho lưu nếu thiếu | FR-A13 |
| P4 | Lương theo vị trí | **Bỏ**, cùng tab "Lương theo vị trí". Tony lúc đầu phản đối, sau đồng ý | Bỏ FR-O40 |
| P5 | Khấu trừ đi trễ | Tính theo mức lương của ca bị trễ: ca Phụ trách thì theo lương phụ trách | FR-S17, §3.8.3 |
| P6 | Ca chưa có vị trí | Không cần ước tính lương, vì chủ phải gán vị trí trước khi công bố | FR-C13, FR-O33 |

### 0.3 Vị trí trong ca

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| O1 | Một vị trí mỗi ca | Mỗi người làm đúng một vị trí trong mỗi ca (CA 1–CA 5). Các ca khác nhau trong ngày được làm vị trí khác nhau | FR-O29 |
| O2 | "Kiêm" (hai vị trí một ca) | **Bỏ** ở mọi nơi: chip hai màu, bộ lọc, "kiêm N" trong Phân công, chú giải | Bỏ FR-O30 |
| O3 | Vị trí con | Vẫn không bắt buộc và chọn được nhiều, trừ Phụ trách (đúng một) | FR-O45 |

### 0.4 Vị trí thường đảm nhiệm (chốt với Tony, khách xác nhận ngày 17/10)

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| U1 | Tên gọi | "Vị trí thường đảm nhiệm" thay cho vị trí đủ điều kiện và nhãn "Kinh nghiệm", ở màn Nhân viên và panel lịch | FR-A12 |
| U2 | Tự học | Mỗi lần công bố: lấy **2 vị trí** nhiều giờ nhất đã công bố trong **12 tuần** gần nhất, chỉ xét vị trí **trên 50 giờ**. Mỗi người có 0, 1 hoặc 2 | FR-A12 |
| U3 | Giờ được tính | Chỉ ca đã công bố, theo giờ trên đồng hồ: trọn Ca 5 tính 6 giờ, ca bị rút ngắn tính phần đã rút, đi trễ không trừ. Sửa ca sau đó thì tổng giờ cập nhật theo | FR-A12 |
| U4 | Chủ sửa tay | Tick tay = **ghim** cho tới khi bỏ; tối đa hai, chip thứ ba bị từ chối kèm lý do. Bỏ tick = đếm lại từ 0, chỉ quay lại sau thêm 50 giờ | FR-A12 |
| U5 | Bằng giờ | Giữ vị trí đang có; nếu không thì chọn vị trí có ca gần nhất | FR-A12 |
| U6 | Phụ trách | Không học: hiện khi bật công tắc, bên cạnh hai vị trí kia | FR-A12, FR-A13 |
| U7 | Hiển thị | Không phân biệt chip tự học và chip tay, không báo chủ; Nhật ký ghi mỗi thay đổi với người thực hiện **Hệ thống** và lý do. Nhân viên không xem được | FR-A12 |
| U8 | Cảnh báo và bộ lọc | Dựa trên **vị trí có kinh nghiệm**: trên 50 giờ trong toàn bộ lịch sử, hoặc chủ tick tay. Người làm đều ba vị trí không bị cảnh báo ở vị trí nào. Đủ ngưỡng thì cảnh báo cũ tự mất | FR-O32, FR-O11 |
| U9 | Khác | Chỉ học vị trí, không học vị trí con. Không tính lại cho người đã nghỉ. Nhân viên mới bắt đầu với những gì chủ tick; không nhập từ Zalo | FR-A12 |

### 0.5 Màn Nhân viên và Hồ sơ của tôi

| # | Chủ đề | Quyết định |
|---|---|---|
| A1 | Ngăn kéo nhân viên | ✕ góc trên trái, nút tròn » giữa mép trái (ẩn trên điện thoại), Esc để đóng, nằm trên thanh công cụ wireframe |
| A2 | Chip vị trí | Bỏ chọn được; bỏ các dòng gợi ý |
| A3 | Hồ sơ của tôi | Lương ước tính tách giờ phụ trách và giờ cơ bản |
| A4 | Vị trí đã làm | Chủ xem giờ của từng vị trí trên chip ở hồ sơ nhân viên; nhân viên xem mọi vị trí đã làm, kèm giờ, ở trang của mình, trong một thẻ ngay dưới phần lương. Ca đã kết thúc, toàn bộ lịch sử, không reset (FR-A14) |
| A5 | Đổi tên | "Ca của tôi" thành **"Hồ sơ của tôi"** / My profile, vì đây là nơi chứa dữ liệu cá nhân của nhân viên (FR-A14) |

### 0.6 Còn mở (chỉ wireframe, không ảnh hưởng PRD)

- Duyệt toàn bộ wireframe ngày 16–17/10.
- Panel nằm bên cạnh lịch từ 1280 px; hẹp hơn thì thành bottom sheet.
- Bếp đổi sang màu nâu để không lẫn với Phụ trách màu vàng gold (khách đã thấy Bếp màu vàng).
- Chip Phụ trách có xếp đầu mỗi ô ca không (sẽ đổi quy tắc thứ tự ngày 10/10). Mặc định: không.

---

## 1. Những gì đã được yêu cầu (tóm tắt)

Tony chuyển lại trong chat ngày 16 và 17/10; tin nhắn gốc không nằm trong repo.

**Khách:** vị trí Phụ trách chia Trong và Ngoài, có mức lương riêng; lương theo người thay vì theo vị trí, bỏ tab lương theo vị trí; chỉ người được chủ cho phép mới xếp làm Phụ trách được; mỗi người một việc mỗi ca, không "kiêm".

**Tony duyệt wireframe:** nút đóng ngăn kéo nhân viên, chip bỏ chọn được, nhãn "Vị trí thường đảm nhiệm" ở màn Nhân viên, một dòng Phụ trách trong Phân công không tách số người theo Trong hay Ngoài, và lương ước tính tách phụ trách và cơ bản.

**Bàn thêm với Tony:** vị trí thường đảm nhiệm tự điền theo cách chủ thực sự xếp người, tối đa hai cộng Phụ trách, chủ sửa tay được. Cuối ngày: cho chủ và từng nhân viên xem giờ đã làm theo vị trí, và đổi tên màn của nhân viên.
