# Feedback khách — 18/10/2026 (giờ đóng đăng ký, màu và thứ tự vị trí, ký hiệu vị trí con)

> Bản tiếng Việt của [`2026-10-18-client-feedback.md`](2026-10-18-client-feedback.md).
> Bản chính là bản tiếng Anh. Khi sửa một bản, cập nhật bản còn lại cho khớp.
> "Role" trong lời khách nghĩa là *vị trí* (PRD §3.3).

Trạng thái: **đã chốt một phần.** Các mục khách viết (C1–C5) và danh mục vị
trí đã được xác nhận và áp dụng vào PRD v1.11 ngày 25/10 (mục 0), cùng quy
tắc đi trễ cho ca xin đi trễ (T2, D9). Câu trả lời cho mục 4 có ngày 01/11
(mục 0.2); còn hai mục mở, liệt kê ở cuối mục 0.2. Mục 1–4 bên dưới là phân
tích và câu hỏi ban đầu, giữ lại để truy vết. Nếu mục 0 khác với mục
1–4 thì theo mục 0.

---

## 0. Quyết định (đã áp dụng vào PRD v1.11)

| # | Chủ đề | Quyết định | PRD |
|---|---|---|---|
| D1 | Giờ đóng đăng ký | **13:00 Thứ 6** thay cho 15:00 Thứ 7; vẫn mở lúc 00:00 Thứ 5. Giờ mặc định của hai thông báo nhắc ở Phase 2 dời lên trước giờ đóng: FR-N5 lúc 20:00 Thứ 5, FR-N13 lúc 09:00 Thứ 6 (Tony đã xác nhận ngày 01/11) | §3.4, FR-S1, FR-O28, FR-N5, FR-N13 |
| D2 | QC | **Không phải một vị trí.** "QC" là ghi chú cho Phụ trách với hai nhánh, Phụ trách Trong và Phụ trách Ngoài. Bỏ tên QC. Khách đã xác nhận | §3.3 |
| D3 | Kiểm tra đơn | Là một vị trí riêng; "Kiểm đơn" của khách chính là Kiểm tra đơn | §3.3 |
| D4 | Tên tiếng Anh | Phụ trách = **Shift Lead** | §3.3 |
| D5 | Danh mục | Bảy vị trí, theo thứ tự: Phụ trách, Thu Ngân – Offline, Thu Ngân – Online, Kiểm tra đơn, Pha chế, Phục vụ, Bếp. Dùng ở mọi nơi có danh sách vị trí | §3.3, FR-O28, §4.10 |
| D6 | Màu | Phụ trách đen, TN Offline `#ff6d01`, TN Online `#46bdc6`, Kiểm tra đơn `#ff00a0`, Pha chế `#34a853`, Phục vụ `#fbbc04`, Bếp `#cc0100`. Không được phân biệt trạng thái hay cảnh báo với vị trí chỉ bằng màu | §3.3 |
| D7 | Ký hiệu vị trí con | Chip trên lịch hiện một ký hiệu ngắn cho mỗi vị trí con hoặc thuộc tính có ký hiệu, trước tiên là bốn vị trí con của Pha chế và Bưng bàn. Ký hiệu cụ thể đã chốt ngày 01/11, xem D11 | §3.3, FR-O42, §4.10 |
| D8 | Nhóm trong một ô lịch | Đã chốt ngày 01/11, xem D12 | FR-O49 |
| D9 | Ca xin đi trễ (FT-3) | **Không có ân hạn.** Ca được xếp theo giờ riêng bắt đầu muộn hơn giờ chuẩn (case a), hoặc ca chủ dời giờ bắt đầu vì đã đồng ý cho đến trễ trong ngày (case c): phạt trễ và trừ gấp đôi tính từ **phút 1**. Quy tắc bất thường giữ nguyên. Giờ riêng chỉ để về sớm vẫn có 10 phút ân hạn. Khách đã xác nhận | §3.8.3, FR-S9, FR-S17, FR-O24, FR-O50, §4.10, ADR 0023 |

### 0.2 Quyết định ngày 01/11 (trả lời mục 4, đã áp dụng vào PRD v1.11)

Tony trả lời mục 4 trên trang review qua hai vòng; khách xác nhận mọi câu trả
lời ở mục 4.2. "Tony" là quyết định riêng của Tony (mục 4.1). D8 ở trên nay đã
chốt (D12).

| # | Chủ đề | Quyết định | Nguồn | PRD |
|---|---|---|---|---|
| D10 | Giờ mở | 00:00 Thứ 5 (câu 10) | Khách | §3.4 |
| D11 | Ký hiệu | Trà sữa TS, Matcha M, Trà T, Bồn B, Bưng bàn BB, Phụ trách Trong Tr và Ngoài Ng; hai vị trí con thì hiện cả hai ("M·T"); rút gọn biệt danh trước, không cắt ký hiệu (13–15, R7) | Khách | §3.3, FR-O42 |
| D12 | Thứ tự trong ô | Chip có vị trí nhóm theo thứ tự danh mục, A–Z trong nhóm, cảnh báo không đẩy chip lên; chip chưa có vị trí đứng sau, theo thứ tự FR-O49 cũ; ô chưa ai có vị trí thì như cũ (3, 4, 12, R3, R4) | Khách | FR-O49 |
| D13 | Màu và trạng thái | Tô đặc như bảng tính (cách A). Không trạng thái nào dựa vào màu: chip xám có tick cho đã đăng ký chưa xếp, huy hiệu "!" cho cảnh báo, biệt danh gạch ngang cho người đã nghỉ, nhãn chữ Nháp/Đã công bố (1, 2, R2) | Tony | §3.3, FR-O42, FR-O50, FR-O51 |
| D14 | Thứ tự đăng ký | Ghi giờ lưu lần đầu và giờ sửa lần cuối; xếp hạng theo lần lưu **đầu tiên**; nháp tự lưu khi đóng lấy giờ sửa cuối; chủ chỉ thấy giờ: nhãn "T5 08:03" trên viền trên của chip đã đăng ký chưa xếp (có nút bật/tắt trên thanh lịch, mặc định bật), một dòng trong panel bên ("Đăng ký thứ 5/38 · lưu lần đầu … · sửa lần cuối …"), và danh sách Thêm người sắp theo thứ tự đăng ký (5, 6, R5, R6, R13–R16) | Tony | FR-S23, FR-O42, FR-O43, FR-O46 |
| D15 | Nhật ký | Danh sách sự kiện Phase 1 ở mục 2 (FT-4); lưu đăng ký chỉ hiện giờ, bản đầy đủ giữ trên server; thao tác lúc nháp vẫn ghi, có bộ lọc "Ẩn thay đổi lúc nháp" (7, 8) | Tony | NFR-1, §4.9.1 |
| D16 | Xuất lịch | Phase 1. Chỉ tuần đã công bố; theo tuần hoặc ngày; ảnh hoặc PDF; biệt danh trên màu vị trí, có ký hiệu và chú giải; chỉ ghi giờ khi khác giờ chuẩn (9, 18–20, R8) | Tony (phase), khách (nội dung) | FR-O52, §4.13 |
| D17 | Lead | Phase 2. Ai có ca Phụ trách đã công bố thì là Lead của khung giờ đó; thấy mọi người có ca chồng lên khung (tên, vị trí, giờ, số điện thoại), Trong và Ngoài thấy như nhau; ghi giờ đến và về sớm ≤30′; về sớm >30′ để chủ làm; không xem lương, còn lại như nhân viên thường (9, 21–24, R9, R10) | Khách | §3.1, FR-L1–FR-L4, NFR-2, ADR 0024 |
| D18 | Đánh giá hiệu suất | Phase 2. Gom đúng giờ, chuyên cần, số giờ cam kết và thái độ vào một chỗ; chỉ chủ đánh giá; hệ thống chỉ hiển thị, không gợi ý; không có nhận xét của Lead trong hệ thống; nhân viên không xem phần đánh giá nhưng vẫn xem giờ làm, đi trễ, thưởng của mình; **hàng tháng, chờ xác nhận** (25–30, R11, R12) | Khách | §3.12, §3.13, FR-P1, FR-P5, FR-P7, FR-S10 |

Còn mở: du di có trả lương cho đến trễ đã đồng ý (câu 17, PRD §5.1 O5) và chu
kỳ đánh giá (PRD §5.1 O6).

Nguồn, tách riêng để truy vết từng mục:

| Mã | Nguồn |
|---|---|
| **C1–C5** | Feedback khách viết, 18/10/2026 (nguyên văn ở mục 5) |
| **T1–T8** | Note riêng của Tony ghi trong buổi feedback (note trên điện thoại) |
| **T9** | Tony bổ sung trong chat ngày 25/10/2026 |
| **D2–D3** | Tony làm rõ và khách xác nhận, 25/10/2026 |

---

## 1. Feedback giao diện

### UI-1 Màu vị trí (C2)

Khách đưa mỗi vị trí một màu:

| Vị trí | Màu của khách | Hiện tại (wireframe, duyệt 17/10) |
|---|---|---|
| Phụ trách | Đen | Vàng đậm (p8) |
| Thu Ngân – Offline | `#ff6d01` cam | Tím (p2) |
| Thu Ngân – Online | `#46bdc6` xanh ngọc | Hồng (p3) |
| Kiểm tra đơn (khách ghi "Kiểm đơn") | `#ff00a0` hồng sẫm | Xanh chanh (p6) |
| Pha chế | `#34a853` xanh lá | Xanh mòng két (p4) |
| Phục vụ | `#fbbc04` vàng | Cam (p5) |
| Bếp | `#cc0100` đỏ | Nâu (p7) |
| QC | **không có trong danh sách**: là ghi chú cho Phụ trách, đã bỏ (D2) | Xanh da trời (p1) |

Đây có vẻ là các màu chuẩn của Google Sheets, nên nhiều khả năng khách muốn
lịch trông giống bảng tính đội đang dùng.

Cần chốt (mục 4): một số màu trùng với màu trạng thái mà wireframe cố ý tách
riêng (xanh lá = đã đăng ký / Đã công bố, vàng = Nháp, chấm cam = cảnh báo,
chấm đỏ = nhân viên đã nghỉ); và chữ trắng chỉ đọc được trên nền đen và nền
`#cc0100`.

### UI-2 Thứ tự vị trí, và nhóm theo vị trí (C3, T1)

Khách muốn các vị trí hiển thị theo thứ tự trong danh sách màu: Phụ trách,
TN Offline, TN Online, Kiểm tra đơn, Pha chế, Phục vụ, Bếp. Note "Group các
role lại với nhau" của Tony được hiểu là cùng yêu cầu: chip trong một ô lịch
được nhóm theo vị trí.

- **Danh sách vị trí** (chú giải, bảng Phân công, Bộ lọc, chip vị trí trong
  panel và form nhân viên): hiện theo thứ tự bảng trong PRD (Phụ trách, QC,
  TN Offline, TN Online, Pha chế, Phục vụ, Kiểm tra đơn, Bếp). Đổi sang thứ tự
  của khách là thay đổi thẳng (đã áp dụng, D5).
- **Chip trong một ô**: việc này **đảo ngược quyết định ngày 10/10** (FR-O49:
  cảnh báo trước, rồi A–Z, rồi người thêm tay, giữ thứ tự xuống các ca trong
  ngày, "không nhóm riêng, vì màu đã cho thấy vị trí").

### UI-3 Ký hiệu vị trí con trên chip lịch (C4, C5, T5)

Khách muốn có ký hiệu trên lịch chung cho bốn vị trí con của Pha chế (Trà
sữa, Matcha, Trà, Bồn) và cho Bưng bàn của Phục vụ. Hiện chip chỉ hiện biệt
danh, tô màu vị trí; nhãn "Vị trí - vị trí con" chỉ hiện khi rê chuột hoặc
chạm (FR-O42).

PRD gọi Bưng bàn là *thuộc tính* (việc làm thêm bên cạnh Phục vụ), không phải
vị trí con. Khách gọi là sub role. Việc này không đổi quy tắc nào; chỉ cần có
ký hiệu như các vị trí con khác.

---

## 2. Feedback tính năng và quy tắc

### FT-1 Đóng đăng ký lúc 13:00 Thứ 6 (C1)

Hiện cửa sổ đăng ký là **00:00 Thứ 5 – 15:00 Thứ 7** (§3.4, FR-S1). Khách muốn
đóng lúc **13:00 Thứ 6**. Đúng lúc đó đăng ký bị khoá, nháp chưa lưu được lưu
tự động (FR-S5), và chủ bắt đầu xếp người được, tức là chủ có thêm khoảng một
ngày để xếp lịch tuần. Nếu vẫn mở lúc 00:00 Thứ 5, cửa sổ rút từ 63 xuống 37
giờ.

Cửa sổ được cố định trong cấu hình ở v1 (FR-S1, FR-O28), nên đây là thay đổi
cấu hình và câu chữ, không có logic mới.

### FT-2 Thời điểm đăng ký (T9)

Hiện **lúc nào** mỗi nhân viên đăng ký. Sau khi sửa thì chỉ hiện thời điểm
**thay đổi gần nhất**, không hiện đã đổi cái gì thành cái gì.

Hiện tại chủ chỉ thấy bản đăng ký lưu gần nhất, không có giờ, và thiết kế
Nhật ký chưa có mục đăng ký nào.

### FT-3 Tính đi trễ cho ca mà nhân viên đã xin đến trễ (T2)

Đi trễ tính từ **giờ bắt đầu của ca được xếp** (FR-O24, FR-O25). **Đã chốt
(D9):** nhân viên đã xin đến trễ và chủ đã đồng ý, nên đến muộn hơn giờ đã xin
thì **không có ân hạn**. Ba trường hợp:

| Trường hợp | Đã chốt | Ví dụ |
|---|---|---|
| a. Đăng ký giờ riêng (bắt đầu muộn hơn) và được xếp **theo giờ riêng** (FR-O50) | Đi trễ tính từ giờ đã xin, **không ân hạn**: phạt trễ và trừ gấp đôi từ phút 1 | Xếp 08:00; đến 08:01 → phạt trễ, trừ 2′; đến 08:20 → trừ 40′; đến 09:30 với ca 3 tiếng → bất thường |
| b. Đăng ký giờ riêng nhưng được xếp **theo giờ chuẩn** | Quy tắc thường, tính từ giờ chuẩn, ân hạn 10 phút. Cách xếp chính là câu trả lời, và nhân viên thấy giờ thật trong Hồ sơ của tôi | Xếp 07:00; đến 08:00 → trễ 60 phút |
| c. Xin ngay trong ngày qua Zalo và chủ đồng ý | Chủ dời giờ bắt đầu ca sang giờ đã thống nhất và đánh dấu là đã đồng ý cho đến trễ (giống về sớm, §3.8). Sau đó như case a: **không ân hạn** từ giờ mới. Phần giờ không làm không được trả lương vì lương theo giờ được xếp; ngày đó có thể xuống dưới 8 tiếng | Dời từ 07:00 sang 08:00; đến 08:05 → phạt trễ, trừ 10′ |

Giờ riêng chỉ để về sớm không dời giờ bắt đầu, nên vẫn có ân hạn như thường.
Còn mở: đến trễ đã đồng ý có được du di nhỏ, trả đủ lương, như về sớm 30 phút
trở xuống không (câu 17).

### FT-4 Định nghĩa những gì Nhật ký ghi lại (T3)

NFR-1 nói mọi thao tác tạo, sửa, xoá đều được ghi, nhưng PRD chưa có danh
sách sự kiện, và wireframe chỉ có ví dụ. Đề xuất danh sách cho Phase 1:

| Nhóm | Sự kiện | Người thực hiện |
|---|---|---|
| Tài khoản | Tạo tài khoản; sửa hồ sơ, biệt danh, lương cơ bản hoặc lương phụ trách; bật hoặc tắt công tắc Phụ trách; thêm hoặc bỏ vị trí thường đảm nhiệm bằng tay; đặt mật khẩu; vô hiệu hoá hoặc kích hoạt lại | Chủ |
| Vị trí thường đảm nhiệm | Thêm hoặc bỏ một vị trí, lý do là số giờ | Hệ thống |
| Đăng ký | Nhân viên lưu đăng ký (chỉ ghi giờ, xem FT-2); tự lưu khi đóng; khoá cửa sổ | Nhân viên / Hệ thống |
| Nhu cầu nhân sự | Đổi số người cần; chép từ tuần trước | Chủ |
| Xếp lịch (nháp) | Xếp ca; gán hoặc đổi vị trí, vị trí con; đổi giờ; bỏ khỏi ca; xếp ngoài lịch rảnh; hoàn tác hoặc làm lại | Chủ |
| Công bố | Công bố tuần; bỏ qua một nhân viên kèm lý do | Chủ |
| Sau khi công bố | Đổi giờ, đổi người, huỷ ca; về sớm có người thay; đổi ca | Chủ |
| Đi trễ | Ghi, sửa hoặc xoá giờ đến; xử lý bất thường kèm lý do | Chủ |

Không ghi: đăng nhập và lượt xem trang.

### FT-5 Màn "Đi trễ": không ghi gì là đúng giờ? (T4)

**Đã kiểm tra: đúng, đã như vậy.** PRD §3.7.1 mục 1 và FR-O24 coi ca không có
ghi nhận là đúng giờ. Màn Đi trễ trong wireframe ghi "Không ghi gì là đúng
giờ", ca đã qua mà không ghi hiện *Đúng giờ*, ca chưa tới hiện *Chưa tới giờ*.
Không đề xuất sửa. (Giới hạn đã biết và đã chấp nhận: vắng mặt mà không ghi
cũng được tính là đúng giờ, §3.7.1.)

### FT-6 Xuất lịch tổng để gửi các bạn phụ trách (T6)

Tính năng mới: chủ xuất lịch tuần để gửi cho các bạn phụ trách (nhiều khả
năng qua Zalo). PRD chưa có gì tương tự. Định dạng, nội dung và phase còn mở
(mục 4).

### FT-7 Lead shift tự quản lý ca của mình (T7)

Tính năng mới: người phụ trách quản lý được lịch và nhân sự của các ca mình
phụ trách. Hiện nhân viên, dù là phụ trách hay không, chỉ thấy **lịch của
chính mình**, chặn ở server (NFR-2, FR-S4), và chỉ chủ được thay đổi. Việc
này cần một cấp quyền mới, nên là mục lớn nhất ở đây.

### FT-8 Đánh giá hiệu suất (T8)

Tony muốn hỏi khách thêm. Trong PRD đây là bảng hiệu suất (§3.12, §3.13,
FR-P1–FR-P6), thuộc **Phase 2**. Câu hỏi ở mục 4.2.

---

## 3. Những gì thay đổi

Giả định các đề xuất ở mục 4 được chấp nhận. Dòng ghi **xong** đã áp dụng vào
PRD v1.11; wireframe và các trang tĩnh chưa cập nhật.

| Mục | PRD | Tài liệu khác | Wireframe và trang tĩnh | Phase / độ lớn |
|---|---|---|---|---|
| FT-1 Giờ đóng | §3.4 bước 2, FR-S1, FR-O28, FR-N5, FR-N13 · **xong** | CLAUDE.md, CONTEXT.md, README, backlog, roadmap · **xong** | Các màn Lịch rảnh, trạng thái "đang mở đăng ký" của lịch | Phase 1 · nhỏ |
| UI-1 Màu | Cột màu ở §3.3 · **xong** | — | Token màu vị trí p1–p8 trong `design/phase1/src/app.css`, chú giải, màu trạng thái nếu đổi; tạo lại các trang tĩnh | Phase 1 · nhỏ–vừa |
| Bỏ QC (D2) | §3.3, §4.10, §5 · **xong ở v1.11** | CONTEXT.md, ADR 0009, backlog · **xong** | Dữ liệu mẫu và mọi chip QC còn phải sửa | Phase 1 · nhỏ |
| UI-2 Thứ tự / nhóm | Thứ tự bảng §3.3, viết lại FR-O49, FR-O42 | CONTEXT.md (thứ tự), ghi quyết định 10/10 là đã bị thay | Sắp xếp trong ô, Phân công, Bộ lọc, chip | Phase 1 · vừa |
| UI-3 Ký hiệu | §3.3, FR-O42, FR-O28, §4.10 · **xong**; ký hiệu cụ thể chờ O4 | CONTEXT.md ("Mark") · **xong** | Vẽ chip, chú giải, nhãn khi rê chuột | Phase 1 · vừa |
| FT-2 Thời điểm | FR-O43 (panel), FR-S20 (màn nhân viên), ghi chú NFR-1 | — | Panel bên, màn Lịch rảnh, Nhật ký | Phase 1 · nhỏ |
| FT-3 Ca xin đi trễ (D9) | §3.8.3, FR-S9, FR-S17, FR-O24, FR-O50, §4.10 · **xong** | CONTEXT.md, ADR 0023 · **xong** | Màn Đi trễ (nhãn không ân hạn), dấu "đã đồng ý cho đến trễ" khi dời giờ bắt đầu, popup quy tắc | Phase 1 · nhỏ |
| FT-4 Nhật ký | Mở rộng NFR-1 thành danh sách sự kiện | — | Bộ lọc "Loại" của Nhật ký | Phase 1 · nhỏ |
| FT-6 Xuất lịch | FR-O52 mới | Story backlog, roadmap, phạm vi trong CLAUDE.md | Nút xuất trên lịch | **Đổi phạm vi** · vừa |
| FT-7 Quyền Lead | §3.1 vai trò, NFR-2, FR-S4, FR mới, ADR mới | Phạm vi trong CLAUDE.md, backlog, roadmap, chi phí | Màn mới cho Lead | **Đề xuất Phase 2** · lớn |
| FT-8 Hiệu suất | Chưa có gì cho tới khi khách trả lời | — | — | Phase 2 |

Mỗi thay đổi PRD đi kèm một mục CHANGELOG. Quyết định nào đảo ngược quyết định
cũ thì ghi vào §5.0 Superseded Decisions: QC và giờ đóng Thứ 7 đã có ở đó;
thứ tự FR-O49 sẽ vào nếu khách muốn nhóm theo vị trí (O5).

---

## 4. Câu hỏi còn mở

Mỗi câu có một đề xuất; **ĐX** là cách mình sẽ làm nếu bạn đồng ý.

### 4.1 Tony quyết

1. **Màu trạng thái và màu của khách (UI-1).** Giữ nguyên màu của khách và đổi
   cách hiển thị trạng thái để không còn dựa vào màu? **ĐX:** có. Chip đã
   đăng ký nhưng chưa xếp chuyển sang xám trung tính có dấu tick (thay vì
   xanh lá); chấm cảnh báo thành huy hiệu "!" nhỏ; dấu nhân viên đã nghỉ thành
   tên gạch ngang; Nháp và Đã công bố giữ nhãn chữ.
2. **Cách tô màu (UI-1).** A: tô đặc như bảng tính, chữ trắng trên nền đen và
   đỏ, chữ tối trên các màu còn lại. B: kiểu hiện tại, nền nhạt, viền và chấm
   theo màu của khách. **ĐX:** A, vì giống thứ đội đã quen đọc; nếu chưa chắc
   thì cho khách xem cả hai.
3. **"Group các role" nghĩa là gì (T1).** **ĐX:** giống C3, chip trong một ô
   được nhóm theo vị trí. Xác nhận, hoặc cho mình biết ý bạn.
4. **Thứ tự trong ô khi đã nhóm (UI-2).** **ĐX:** các nhóm theo thứ tự của
   khách, rồi *đã xếp, chưa có vị trí*, rồi *đã đăng ký, chưa xếp*. Trong mỗi
   nhóm: cảnh báo trước, rồi A–Z theo biệt danh. Trước khi gán vị trí (bước 2
   khi xếp tuần) mọi người cùng một nhóm, nên thứ tự FR-O49 hiện tại vẫn áp
   dụng. Bỏ quy tắc "giữ chỗ xuống các ca trong ngày", vì người đổi vị trí
   giữa ngày phải chuyển nhóm.
5. **Thời điểm đăng ký: hiện ở đâu và giờ nào (FT-2).** **ĐX:** trong panel
   bên, một dòng: "Đăng ký lúc 14:32 T5 16/10", hoặc "Sửa lần cuối lúc …" khi
   đã lưu hơn một lần; và "Đã lưu lúc …" trên màn của chính nhân viên. Không
   hiện trên chip (không đủ chỗ).
6. **Thời điểm của nháp được tự lưu (FT-2).** Chủ không được biết nháp nào do
   hệ thống lưu (FR-S5); giờ đúng 13:00 sẽ để lộ điều đó. **ĐX:** hiện giờ
   nhân viên sửa nháp lần cuối, vốn cũng chính là "thay đổi gần nhất".
7. **Mục đăng ký trong Nhật ký (FT-2, FT-4).** NFR-1 yêu cầu giá trị cũ và
   mới. **ĐX:** lưu đầy đủ bản đã lưu trên server (để giải quyết tranh chấp)
   nhưng Nhật ký chỉ hiện "Đã lưu đăng ký · giờ", như bạn muốn.
8. **Ghi thao tác xếp lịch lúc còn nháp (FT-4).** Ghi mọi lần xếp lúc tuần còn
   nháp làm Nhật ký rất dài. **ĐX:** vẫn ghi (FR-O48 đã yêu cầu ghi hoàn
   tác/làm lại) và thêm bộ lọc "Ẩn thay đổi lúc nháp".
9. **Phase của xuất lịch và quyền Lead (FT-6, FT-7).** **ĐX:** xuất lịch ở
   Phase 1, thêm vào phạm vi, vì nó cũng đáp ứng ngay nhu cầu xem lịch của
   các bạn phụ trách; quyền Lead ở Phase 2. Cả hai cần bạn quyết về phạm vi
   và chi phí.

### 4.2 Hỏi khách

**Đăng ký (FT-1)**

10. Cửa sổ vẫn mở lúc **00:00 Thứ 5**? (PRD v1.11 tạm giả định là có, vì khách
    chỉ đổi giờ đóng; cần xác nhận.)

**Màu, thứ tự và ký hiệu (UI-1 đến UI-3)**

11. ~~Vị trí nào thiếu trong danh sách màu?~~ **Đã trả lời (D2, D3):** QC là
    ghi chú cho Phụ trách và đã bỏ; "Kiểm đơn" là Kiểm tra đơn.
12. Anh/chị muốn người trong mỗi ca được **nhóm theo vị trí** theo thứ tự đó
    trên lịch, hay chỉ là thứ tự trong các danh sách và chú giải?
13. Đội **đã dùng ký hiệu** cho các vị trí con trong bảng hiện tại chưa? Nếu
    chưa, đề xuất: Trà sữa **TS**, Matcha **M**, Trà **T**, Bồn **B**, Bưng
    bàn **BB**.
14. Có ký hiệu cho **Phụ trách Trong / Ngoài** không? (ĐX: có, vì ca Phụ trách
    nào cũng có một trong hai.)
15. Khi một bạn pha chế làm hai quầy ("Pha chế - Matcha, Trà"), hiện cả hai
    ký hiệu ("M·T")? (ĐX: có; trên chế độ tuần hẹp thì rút gọn biệt danh
    trước, không bao giờ cắt ký hiệu.)

**Đến trễ đã đồng ý (FT-3)**

16. ~~Phần giờ đến trễ có không được trả lương không?~~ **Đã trả lời (D9):**
    chủ dời giờ bắt đầu ca, nên lương và ngày đủ 8 tiếng tính theo giờ mới, và
    không có ân hạn từ giờ mới.
17. Có mức du di nhỏ như về sớm ("30 phút trở xuống, tuỳ anh/chị, trả đủ
    lương") không? Hay mọi lần đến trễ đã đồng ý đều là đổi ca?

**Xuất lịch (FT-6)**

18. **Định dạng:** ảnh hoặc PDF để gửi Zalo, file Excel/Google Sheet, hay bản
    in? (ĐX: ảnh/PDF trước.)
19. **Nội dung:** cả tuần hay một ngày? Tên đầy đủ hay biệt danh? Có vị trí,
    ký hiệu vị trí con và giờ không? Có màu không?
20. Chỉ xuất khi tuần đã **công bố**, hay cả lúc còn nháp (ghi chữ "Nháp")?
    (ĐX: chỉ khi đã công bố.)

**Người phụ trách (FT-7)**

21. **Ai được tính là Lead:** bất kỳ ai được bật công tắc Phụ trách, hay chỉ
    khi người đó đang có ca Phụ trách trong ngày?
22. **Những ca nào:** chỉ các ca mình phụ trách, cả ngày, hay cả tuần?
23. **Được làm gì:** xem danh sách người trong ca (tên, vị trí, giờ, số điện
    thoại)? Ghi giờ đến? Ghi về sớm và người thay? Đổi người hoặc chuyển vị
    trí? Thêm hoặc bỏ người? Sửa lịch trước khi công bố?
24. Họ không được xem lương, đăng ký các tuần khác hay bất cứ gì ngoài ca
    của mình. Đúng không?

**Đánh giá hiệu suất (FT-8)**

25. **Anh/chị đánh giá nhân viên dựa trên gì:** đúng giờ, chuyên cần, số giờ,
    tay nghề từng vị trí, thái độ, nhận xét của người phụ trách, phản hồi của
    khách, doanh số?
26. **Ai đánh giá:** chỉ anh/chị, hay người phụ trách cũng chấm điểm người
    trong ca của mình?
27. **Bao lâu một lần:** hàng tuần, hàng tháng, hàng quý?
28. **Kết quả dẫn tới gì:** tăng lương cơ bản, bật công tắc Phụ trách, thưởng,
    nhắc nhở?
29. Nhân viên có được xem **đánh giá của chính mình** không?
30. Có gì anh/chị muốn ghi lại **ngay từ bây giờ** (ví dụ nhận xét của người
    phụ trách về một ca), để có sẵn dữ liệu khi làm tính năng này?

---

## 5. Những gì được yêu cầu (nguyên văn)

**Khách, 18/10/2026:**

> 1. Thời gian đóng lịch đăng ký ca: 13:00 Thứ 6
> 2. Code màu các vị trí:
>    - Phụ trách: Màu đen
>    - TN offline: #ff6d01
>    - TN online: #46bdc6
>    - Kiểm đơn: #ff00a0
>    - Pha chế: #34a853
>    - Phục vụ: #fbbc04
>    - Bếp: #cc0100
> 3. Thứ tự vị trí hiển thị trong lịch: tương tự như thứ tự trên mã màu
> 4. Pha chế có 4 sub role: Trà sữa, Matcha, Trà, Bồn cần được bổ sung ký hiệu trên lịch chung
> 5. Phục vụ cũng có sub role là Bưng bàn cần được bổ sung ký hiệu trên lịch chung

**Note của Tony:**

> - T1 Group các role lại với nhau
> - T2 Rule tính đi trễ của các ca xin đi trễ
> - T3 Define những gì được ghi trong Nhật Ký
> - T4 Check lại xem rule trong screen Đi trễ - không ghi gì có mặc định đi đúng giờ không
> - T5 Tìm cách làm sao để hiển thị các role con ngay trên chip trên calendar
> - T6 Thêm tính năng export lịch làm tổng để chủ có thể gửi cho các bạn phụ trách
> - T7 Thêm tính năng cho Lead shift có thể manage lịch làm, nhân sự của ca làm mà Lead shift phụ trách
> - T8 Hỏi thêm về các tính năng liên quan tới performance evaluation

**Tony, trong chat (25/10/2026):**

> - T9 Thêm 1 cái timestamp đứa nào đăng ký vào lúc nào → Edit thì hiện time of the latest changes, không show đã thay đổi cái gì thành cái gì
