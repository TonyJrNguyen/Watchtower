# Feedback khách — 10/10/2026 (duyệt wireframe Phase 1, PRD v1.8)

> Bản tiếng Việt của [`2026-10-10-client-feedback.md`](2026-10-10-client-feedback.md).
> Bản chính là bản tiếng Anh. Khi sửa một bản, cập nhật bản còn lại cho khớp.
> "Role" trong lời khách nghĩa là *vị trí* (PRD §3.3).

Trạng thái: **đã chốt đủ (11/10) và đã áp dụng** vào PRD v1.9 và wireframe Phase 1. Mục 0 là các quyết định; mục 1 tóm tắt khách đã yêu cầu gì, giữ lại để truy vết. Nếu hai mục khác nhau thì theo mục 0.

---

## 0. Quyết định

### 0.1 Bố cục đã chọn

| Màn | Chọn |
|---|---|
| Điều hướng trên điện thoại | Thanh dưới |
| Lịch tuần (chủ quán) | **B** — lịch rộng hết khung, danh sách nhân viên và bộ lọc gộp vào một nút — kèm các thay đổi bên dưới, cả desktop và điện thoại |
| Đi trễ, Nhân viên, Nhật ký (chủ quán) | A |
| Lịch rảnh, Ca của tôi (nhân viên) · Đăng nhập | A |
| Trạng thái demo | Thêm "đã xếp ca, chưa giao vị trí" cho Lịch tuần |

### 0.2 Lịch tuần (chủ quán)

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| W1 | Hoàn tác / làm lại | Khi tuần còn nháp, cho việc xếp ca và giao vị trí. Chỉ trong phiên (tải lại là mất), Ctrl+Z / Ctrl+Y, ẩn sau khi công bố | FR-O48 |
| W2 | Gỡ vị trí | Trông y như "đã xếp, chưa có vị trí". Màu xám đậm khách thấy là viền đánh dấu đang chọn; viền này giờ dùng màu nhấn | FR-O42 |
| W3 | Đăng ký mọi ca | Sao trên chip. "Mọi ca" là đủ 35 ca trong tuần | FR-O23 |
| W4 | Không đăng ký gì | Nét đứt, mờ hơn. **Không có trong lựa chọn mặc định**, vẫn tính là rảnh trong mọi con số và trong Thêm; một mục Bộ lọc bật lại được | FR-O11, FR-O23 |
| W5 | Mục trong panel | Ca trong ngày, Vị trí, Lý do đóng/mở được như nhóm trong Bộ lọc | FR-O43 |
| W6 | Lưu / Bỏ khỏi ca | Luôn bấm được. Không chọn ca nào thì cả hai đều bỏ người đó khỏi mọi ca trong ngày, sau hộp xác nhận | FR-O43 |
| W7 | "Đăng ký" trong panel | Chip xanh lá có dấu tích | FR-O43 |
| W8 | Trạng thái tuần | Nháp màu vàng, Đã công bố màu xanh lá | FR-O42 |
| W9 | Điều hướng | `<<` tuần cũ nhất có dữ liệu · `<` · chọn ngày (nhảy tới khoảng chứa ngày đó) · `>` · `>>` tuần đang xếp | FR-O47 |
| W10 | Tab "Ai đăng ký" | **Bỏ**, cả trên điện thoại | Bỏ FR-O41 |
| W11 | Tab "Độ phủ theo vị trí" | Đổi tên **Phân công**. Nhập số người cần theo vị trí × ca × ngày, có *chép từ tuần trước*; hiện số đã giao so với số cần | FR-O1, FR-O4 |
| W12 | Thứ tự chip | Theo cột ngày. CA 1: có cảnh báo trước, rồi A–Z, rồi người thêm thủ công theo thứ tự thêm. CA 2–5 kế thừa thứ tự của ca ngay trên; tên mới xếp A–Z sau nhóm kế thừa. *Xếp ngoài lịch rảnh* không tính là cảnh báo ở đây, nên người thêm thủ công vẫn ở cuối. Không gom theo vị trí | FR-O49 |
| W13 | Giờ trong danh sách nhân viên | Giờ đã đăng ký, không phải giờ đã xếp | FR-O11 |

### 0.3 Lịch rảnh (nhân viên)

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| S1 | Nháp và Đã đăng ký | Thay đổi là nháp cho tới khi bấm Lưu; chủ quán chỉ thấy bản Lưu gần nhất; sửa sau khi Lưu là nháp mới; *Bỏ nháp* lấy lại bản đã Lưu | FR-S20 |
| S2 | Hết hạn đăng ký | Chỉ xem. Nháp chưa Lưu được tự lưu và **nhân viên** được báo là mình chưa bấm Lưu; chủ quán không thấy khác biệt này | FR-S5 |
| S3 | Ngày thiếu giờ | Viền đỏ phát sáng ở ngày dưới 8 tiếng | FR-S3 |
| S4 | Ghi chú | Không bắt buộc, theo ngày; chủ quán thấy trong panel và biểu tượng trên chip; đóng ô là xoá ghi chú | FR-S22 |
| S5 | Giờ riêng | Theo từng ca, **chỉ trong khung giờ của ca đó**, vì nhân viên thường xin vào trễ hoặc về sớm | FR-S21 |
| S6 | Ô giờ riêng | Mở từ nút **Giờ riêng** của ngày, vẫn nằm cạnh nút **Ghi chú**; mỗi ngày một ô, trong ô chọn ca. Mở ra là sửa được ngay; Lưu/Huỷ chỉ hiện khi có thay đổi; × bỏ thay đổi; Xoá khi đã lưu. Lưu trong ô chỉ chốt vào nháp; *Bỏ nháp* xoá luôn giờ riêng chưa gửi. Mỗi lúc chỉ mở một ô; còn thay đổi chưa lưu thì không mở được ô khác và không Lưu được trang ("Lưu hoặc Huỷ giờ riêng trước"). Ngày có giờ riêng thì nút Giờ riêng sáng lên, chip ca có đồng hồ và giờ riêng | FR-S21 |
| S7 | Phía chủ quán | Cùng biểu tượng đồng hồ trên chip. Giờ riêng chưa quyết (đã đăng ký, chưa xếp) **là cảnh báo** (chấm cam). Không có trạng thái duyệt: chủ quán xếp theo giờ đăng ký hoặc giờ ca gốc | FR-O50 |

### 0.4 Giờ làm và lương

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| H1 | Ca 5 và cảnh báo 8 tiếng | Ngày có trọn Ca 5 không bị cảnh báo (Ca 1 + 3 + 5, hoặc chỉ Ca 5). Ngoài ra dưới 8 tiếng thì cảnh báo. Ngày trống là ngày nghỉ | FR-S3 |
| H2 | Lương Ca 5 | Vẫn hiện 17:00–23:00, nhưng làm trọn Ca 5 thì tính lương tới 24:00 (7 tiếng) | FR-C14 |
| H3 | Ca 5 giờ riêng | Tính theo giờ thật, chặn ở 23:00 (VD 18:00–23:00 = 5 tiếng), và là ca không tiêu chuẩn cho thưởng tuần | FR-C14, FR-B1 |
| H4 | Thưởng tuần | Ngày có trọn Ca 5 tính là ngày đạt dù dưới 8 tiếng | FR-B1 |

---

## 1. Khách đã yêu cầu gì (tóm tắt)

**Chủ quán:** hoàn tác/làm lại khi đang nháp; gỡ vị trí thì chip trông như "đã xếp, chưa có vị trí"; sao cho người đăng ký đủ mọi ca; người không đăng ký gì có nét đứt, mờ rõ hơn và bị loại khỏi lọc mặc định; mục trong panel đóng/mở được; Bỏ khỏi ca không được bị vô hiệu; trạng thái "Đăng ký" nổi hơn; Nháp vàng, Công bố xanh lá; thay "Tuần đang xếp" bằng chọn ngày và điều hướng `<< < > >>`; bỏ tab "Ai đăng ký"; đổi tên "Độ phủ theo vị trí" và dùng nó để đặt số người cần theo vị trí và xem đã giao bao nhiêu; quy tắc thứ tự chip như mục 0.2 W12.

**Nhân viên:** hai trạng thái Nháp và Đã đăng ký; chủ quán chỉ thấy sau khi Lưu; sửa được tới khi hết hạn, sau đó chỉ xem; nháp chưa Lưu thành đã lưu khi khoá, có dấu "quên lưu"; viền đỏ phát sáng cho ngày thiếu giờ; ghi chú theo ngày cho chủ quán; nhân viên được sửa giờ vào/ra, chủ quán thấy chấm cam và cảnh báo để quyết.

**Giờ làm và lương:** chỉ Ca 5 vẫn tính là đủ cho cảnh báo và cho thưởng tuần; Ca 5 tính lương tới 24:00 (7 tiếng); người vào lúc 18:00 tính tới 23:00 và là ca không tiêu chuẩn; lịch chung phải hiện và tính được những giờ bất thường như vậy.

**Spec custom shift (11/10):** mỗi ca có trạng thái giờ riêng của nó, dấu hiệu khác chấm cảnh báo; Lưu, Huỷ, Đóng (×), Sửa, Xoá với các trạng thái rõ ràng. Đã thống nhất làm gọn: sửa trực tiếp thay vì có chế độ Sửa riêng, Lưu/Huỷ chỉ hiện khi có thay đổi, mỗi lúc một ô, và mở ô từ nút Giờ riêng của ngày thay vì một nút dưới mỗi ca.
