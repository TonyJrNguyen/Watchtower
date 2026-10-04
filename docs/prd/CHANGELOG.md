# Nhật ký thay đổi PRD

Mỗi dòng ứng với một commit áp dụng patch từ phiên chat với Claude. Chi tiết
từng thay đổi xem trong nội dung commit hoặc lịch sử chat.

## v1.7 — 2026-10-04
- Theo review prototype calendar ngày 03/10 (prototype trên branch `feature/calendar-day-3day-week-views`)
- Thêm FR-O47 (Phase 1): calendar xem theo **Ngày / 3 ngày / Tuần** (tuần từ Thứ Hai đến Chủ Nhật). Trước/sau dịch đúng độ dài chế độ xem và giữ nguyên chế độ xem; 3 ngày có thể vắt qua hai tuần. Xem lại được các tuần trước (đã công bố, chỉ xem, trong giới hạn lưu trữ §4.11); không đi quá tuần đang xếp
- Nhân viên hiện trên calendar chỉ tính theo những ngày đang xem: rảnh ít nhất một ca trong những ngày đó (đã đăng ký, hoặc chưa đăng ký nên tính là rảnh theo FR-S19) hoặc có ca trong những ngày đó. Người không trong phạm vi không hiện trên calendar, nhưng **vẫn nằm trong danh sách nhân viên**, ở mục "Không có trong những ngày này (N)" cuối danh sách: chữ mờ, ô tick trống và bị khoá, không bấm tên được. Khi họ trở lại phạm vi thì tick hay không như lúc anh để
- Sửa FR-O11: Bộ lọc và checkbox tổng chỉ mô tả người trong phạm vi; Chọn tất cả / Bỏ chọn tất cả / Đảo lựa chọn tác động lên **mọi** nhân viên, kể cả người không trong phạm vi. Xếp lịch, Vị trí được xếp và hai cảnh báo xếp ca đọc theo các ngày đang xem; nhóm Đăng ký ("Rảnh cả tuần") và Thiếu giờ giữ nghĩa theo cả tuần. Lựa chọn không có ai vẫn hiện, không tick, bị vô hiệu. **Bấm vào tên** nhân viên hoặc tên lựa chọn thì chỉ hiện người đó/nhóm đó; tick checkbox vẫn thêm/bớt như cũ
- Sửa FR-O10, FR-O42 (ngày đang xem, tab theo ngày trên điện thoại, không có nút Thêm ở tuần trước), FR-O43 (trước/sau theo các ngày đang xem, chỉ xem ở tuần trước)
- §3.5, §5 (mục resolved mới), §5.0 (calendar một tuần chuyển sang *Superseded*) và §5.3 cập nhật tương ứng
- Chỉ là hiển thị/thao tác, không có quy tắc nghiệp vụ mới, nên không đưa vào danh sách *pending confirmation*

## v1.6 — 2026-09-28
- Theo feedback trên prototype Bộ lọc v1.5 cùng ngày (prototype đã cập nhật ở commit bed078a)
- Viết lại FR-O11: **danh sách nhân viên được tick là trạng thái duy nhất**. Mỗi lựa chọn trong Bộ lọc phản chiếu lựa chọn đó như bộ lọc bảng tính — tick khi mọi người nó mô tả đều đang chọn, "–" khi một phần, trống khi không ai; tick thì chọn hết, bỏ tick thì bỏ chọn họ. Thêm lựa chọn "không" cho các nhóm (Chưa có vị trí, Chưa có kinh nghiệm, Không có gì cần chú ý) để ai cũng được mô tả trong mọi nhóm. Bỏ logic OR/AND, chip bộ lọc và nút Xóa bộ lọc
- Chọn tất cả / Bỏ chọn tất cả / Đảo lựa chọn chuyển thành **checkbox tổng** dưới ô tìm nhân viên, tác động lên toàn bộ nhân viên đang làm
- §3.5, §5 (mục resolved mới), §5.0 (hành vi Bộ lọc v1.5 chuyển sang *Superseded*) và §5.3 cập nhật tương ứng
- Chỉ là hiển thị/thao tác, không có quy tắc nghiệp vụ mới, nên không đưa vào danh sách *pending confirmation*

## v1.5 — 2026-09-28
- Theo feedback trên prototype calendar v1.4 cùng ngày
- Thêm FR-O46 (Phase 1): nút **Thêm** trong mỗi ô ca của calendar để xếp người không đăng ký ca đó. Mặc định danh sách chỉ có những người không đăng ký ca này (không kèm tag "Không đăng ký ca này"); tìm theo tên thì hiện thêm người đã đăng ký, người chưa đăng ký tuần (tính là rảnh) và người đã xếp ca này, kèm tag. Chọn người thì mở side panel với ca đó đã chọn; ca bị đánh dấu ngoài lịch rảnh như FR-O12
- Viết lại FR-O11: bỏ các nút chọn nhanh, thay bằng một nút **Bộ lọc** gồm mọi thuộc tính hiện trên calendar (Đăng ký, Xếp lịch, Vị trí được xếp, Có kinh nghiệm, Cần chú ý). Chọn nhiều cùng lúc: OR trong nhóm, AND giữa các nhóm; mỗi lựa chọn có số người khớp, cập nhật theo các nhóm khác; từng nhóm thu gọn được; chip bộ lọc đang bật. Chọn tất cả / Bỏ chọn tất cả / Đảo lựa chọn nằm trong Bộ lọc và chỉ tác động lên người đang được liệt kê
- §3.5, §5 (mục resolved mới) và §5.3 cập nhật tương ứng
- Chỉ là hiển thị/thao tác trên dữ liệu có sẵn, không có quy tắc nghiệp vụ mới, nên không đưa vào danh sách *pending confirmation*

## v1.4 — 2026-09-28
- Theo feedback của khách ngày 27/09 và các câu trả lời ngày 28/09 (`docs/feedback/2026-09-27-client-feedback.md`)
- §3.3: danh mục vị trí từ 6 lên **7 vị trí** (thêm QC). Thêm vị trí con: QC Trong/Ngoài; Pha chế Trà sữa/Matcha/Trà/Bồn. Thêm thuộc tính Phục vụ – Bưng bàn. Headcount, lương và năng lực chỉ tính ở cấp vị trí. Nhãn hiển thị "Vị trí - con/thuộc tính", màu theo vị trí. Thu Ngân Online/Offline vẫn là hai vị trí riêng
- §3.5: gộp Lịch rảnh và Xếp lịch thành **một calendar tuần**, làm theo 3 bước trước khi công bố: xem ai đăng ký, xếp người, gán vị trí. Chỉ xếp được sau khi đăng ký khóa
- Thêm FR-A11 (Biệt danh, không trùng giữa nhân viên đang làm), FR-O42 (calendar hiện từng người theo biệt danh, màu theo vị trí, hover/chạm), FR-O43 (side panel: một người, một ngày, nhiều ca), FR-O44 (ca liền nhau cùng vị trí gộp thành một assignment, khác vị trí thì tách), FR-O45 (vị trí con/thuộc tính chỉ để mô tả)
- Sửa FR-A1, FR-O1, FR-O4, FR-O10, FR-O11, FR-O23, FR-O28, FR-O29 (assignment nháp được chưa có vị trí), FR-O31/FR-O33 (chặn công bố khi còn ca chưa có vị trí), FR-O41 (roster thành section dưới calendar), NFR-5, §4.10
- §5: ghi các quyết định ngày 28/09; danh mục 6 vị trí, hai màn tách rời và "assignment luôn có vị trí" chuyển sang §5.0 *Superseded*
- Một mục mới *proposed pending client confirmation*: nhân viên thấy vị trí con/thuộc tính trong "Lịch của tôi" (FR-O45). Các quyết định còn lại đã được khách chốt

## v1.3 — 2026-09-27
- Thêm FR-O41 (Phase 1): màn Xếp lịch có chế độ **Ai đăng ký** — xem theo từng ngày ai đăng ký ca nào, ai chưa đăng ký (tính là rảnh), ai không làm được ngày đó, và ai đã có ca, trước khi bắt đầu gán vị trí. Theo yêu cầu của Chủ quán. Có sắp xếp: sáng tới tối (mặc định), nhiều/ít ca, nhiều/ít giờ — hoà thì xếp sáng tới tối
- §3.5 thêm bước xem day roster trước khi xếp ca; §5.3 ghi nhận demo đã có màn này
- Không phải quy tắc nghiệp vụ mới (chỉ hiển thị dữ liệu có sẵn), nên không đưa vào danh sách *pending confirmation*

## v1.2 — 2026-09-18
- Restate Phase 1 scope theo bản thu hẹp 08/09 (notifications, control centre → Phase 2)
- NFR-5 (responsive parity) kéo trở lại Phase 1 sau khi demo cho thấy chi phí thấp hơn dự kiến
- Thêm FR-O38 (coverage đếm theo full-period), FR-O39 (chặn double-booking assignment)
- Bổ sung hiệu ứng cho FR-O20 (bắt buộc người thay khi về sớm > 30 phút) và FR-T18 (no-show = 0 giờ)
- Thêm FR-B17 (bonus preview ở màn lateness), FR-A7 bổ sung (mật khẩu là field trong hồ sơ), FR-O40 (lương mặc định theo vị trí sửa được trong app)
- Tất cả sáu mục mới/bổ sung ở trên đánh dấu *proposed pending client confirmation* — xem `docs/decisions/pending-confirmation.md`

## v1.1 — 2026-09-07
- Bản PRD do khách duyệt trước khi bắt đầu demo Phase 1 (baseline)
