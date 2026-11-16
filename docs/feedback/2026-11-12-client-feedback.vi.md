# Góp ý của khách — 12/11/2026 (sheet tab 12.11 và danh sách nhân viên thật)

> Bản chính là tiếng Anh: [`2026-11-12-client-feedback.md`](2026-11-12-client-feedback.md).
> Sửa bản này thì sửa bản kia cho khớp. "Role" trong lời khách là *vị trí*
> (PRD §3.3).

Trạng thái: **đã chốt.** Mục 1–2 của khách, mục 3–7 của
Tony. Tony trả lời các điểm còn mở trên trang Q&A ngày 16/11 (phần 0), và các
câu trả lời được đưa vào PRD v1.14; F1 được trả lời ở vòng hai cùng ngày.
Phần 1–2 là góp ý gốc và phân tích, giữ lại để
truy vết. Chỗ nào phần 0 khác phần 1–2 thì theo phần 0.

Nguồn: sheet chung *FEEDBACK-WATCHTOWER*, tab *12.11* và *Data mẫu nhân viên
cho Try-out*. Mục 1–2 do đầu mối của khách (huyhoang.tran0703) viết; mục 3–7
do Tony viết.

---

## 0. Quyết định (đã đưa vào PRD v1.14)

| # | Chủ đề | Quyết định | Nguồn | PRD |
|---|---|---|---|---|
| E1 | Tô ô khi chọn | Bấm chip của một người thì tô các ô của người đó trong những ngày đang xem, theo trạng thái của chip vừa bấm: chip **đã xếp** thì tô **màu nóng** mọi ô người đó đã được xếp; chip **chưa xếp** thì tô **màu lạnh** mọi ô người đó đăng ký (hoặc rảnh vì không đăng ký gì). Chỉ tô nền, không viền (mục 1) | Khách (yêu cầu), Tony (cách hiểu, bỏ viền) | FR-O42 |
| E2 | Nhân viên thật | 32 người trong danh sách của khách thay cho nhân viên mẫu trong wireframe và Try-out, đúng tên, biệt danh và vị trí; năm người in đậm (Thanh Danh, Hữu Thạnh, Dương, Diệu Hiền, Nhựt Trường) làm được Phụ trách. "Uyễn Nhi" sửa thành **Uyển Nhi**. Bỏ hai ca mẫu dễ gán nhầm cho người thật: người đã nghỉ còn giữ ca, và ca Phụ trách của người đã bị tắt Phụ trách (mục 2) | Khách, Tony (chính tả) | không (dữ liệu mẫu) |
| E3 | Lịch quán | Nhân viên có màn **Lịch quán**: lịch **đã công bố** của cả quán, chỉ xem, trình bày như file xuất (biệt danh trên màu vị trí, ký hiệu, giờ chỉ ghi khi khác giờ ca) kèm **ghi chú xếp lịch của từng ngày** dưới ngày đó, chip của chính mình có viền. Bật sẵn; chủ tắt được. Ngoại lệ thứ ba của NFR-2 (mục 3) | Tony (đề xuất), Khách (đồng ý) | FR-S24, NFR-2, ADR 0032 |
| E4 | Người đọc ghi chú xếp lịch | Ngoài nhân viên có ca ngày đó (Hồ sơ của tôi), ghi chú còn được đọc ở Lịch quán và **in trong file xuất** dưới ngày của nó | Tony | FR-O52, FR-O54 |
| E5 | Ghi chú sau khi công bố | Sửa hay xoá sau khi công bố là **có hiệu lực ngay**; bỏ bước "Công bố ghi chú" riêng | Tony | FR-O54, ADR 0030 (sửa) |
| E6 | Cảnh báo | Một **chấm nhỏ màu nóng ở góc phải dưới chip**, đối diện huy hiệu ký hiệu, cỡ bằng nửa huy hiệu, thay gạch sóng (mục 4) | Tony | FR-O42, FR-O49 |
| E7 | Gom +N | Người đăng ký một ca nhưng được xếp ca khác trong ngày thì gom vào **"+N"** (đóng O7). Rê chuột thấy danh sách tên; bấm mở danh sách tên **"Có đăng ký · CA1 · T2 12/10"**, có nút đóng, không ô tìm, không dòng giải thích. Chọn một người thì chip hiện lại và mở panel của họ; đóng panel hay chuyển sang người khác thì chip về lại "+N", trừ khi đã Lưu xếp họ vào ca đó (mục 5) | Tony | FR-O42, FR-O49 |
| E8 | Đóng panel | Bấm **vùng trống trên lịch** thì đóng panel, còn thay đổi chưa lưu thì hỏi trước. Áp cho mọi panel, không riêng panel mở từ "+N" (mục 5) | Tony | FR-O43 |
| E9 | Ghi chú riêng | Bấm biểu tượng thì mở **khung rộng hết bề ngang, nằm trên lịch và panel**, đẩy hai thứ đó xuống, đóng lại thì trả về như cũ. Định dạng cơ bản, sửa trực tiếp: đậm, nghiêng, gạch dưới, danh sách chấm, danh sách số (mục 6) | Tony | FR-O53 |
| E10 | Chế độ xem | **Bỏ view 3 ngày**; còn Ngày và Tuần (mục 7) | Tony | FR-O47 |
| E11 | Khoá đăng ký | Không cần luật khoá đăng ký khi đã có ca, vì đăng ký khoá cả tuần trước khi xếp được ca nào (câu Q7 của vòng duyệt panel 12/11) | Tony | ADR 0031 (không đổi) |
| E12 | Cảnh báo ngày thiếu giờ | Ngày đăng ký dưới 8 tiếng (FR-S3) chỉ cảnh báo trên chip **chưa xếp** ở ca đó; đã xếp thì chip không còn cảnh báo này (F1) | Tony | FR-O42 |
| E13 | Các mục trong panel | Các mục của panel (Ca trong ngày, Vị trí, Lý do) **thu gọn khi panel mới mở**, rồi giữ như chủ để lại | Tony | FR-O43 |

F1 hỏi cảnh báo ngày đăng ký dưới 8 tiếng (FR-S3) nên hiện trên mọi chip của
ngày đó, đọc theo giờ đã xếp khi người đó đã được xếp, hay chỉ hiện trên chip
chưa xếp. Ở vòng hai Tony chọn cách cuối (E12): luật này nói về đăng ký, nên
khi chip đã xếp thì chủ không còn việc gì để làm với nó.

---

## 1. Góp ý gốc

| # | Người viết | Nội dung |
|---|---|---|
| 1 | Khách | Bổ sung tính năng highlight tên nhân viên trong tuần. Khi chưa assign shift, click vào chip của staff sẽ highlight những shift mà staff có đăng ký, màu lạnh. Khi đã assign shift, click vào chip của staff sẽ highlight những shift mà staff được assign, màu nóng. |
| 2 | Khách | Thay đổi toàn bộ profile nhân sự theo tên thực tế theo sheet "Data mẫu nhân viên cho Try-out" (nhân sự in đậm là nhân sự có thể làm phụ trách). Các vị trí còn lại viết tắt: PV Phục vụ, PC Pha chế, ONL Thu ngân Online, OFF Thu ngân Offline, KTD Kiểm tra đơn, B Bếp. |
| 3 | Tony | Staff nhìn thấy full lịch tuần (đề xuất, chưa phải quyết định, cần phân tích rủi ro và chỗ hở). Thực tế staff luôn thấy được lịch tuần của cả quán để đổi ca cho nhau khi cần, việc này xảy ra thường xuyên. Khớp với nhu cầu xuất lịch tuần để dán cho cả quán xem. |
| 4 | Tony | Cảnh báo tinh tế hơn: ở góc dưới bên phải của chip, đối diện bên dưới với vị trí con, tông màu nóng, kích thước bằng 1/2 huy hiệu vị trí con. |
| 5 | Tony | Chốt phương án gom +N nhân viên khi không xếp ca còn lại. Rê chuột thấy danh sách người bị ẩn; bấm hiện popup như khi Thêm người không đăng ký ca này, có nút đóng, không ô tìm. Bấm chip của người đó trong popup để đưa lại vào. Nếu người đó được xếp ca đó thì giữ chip trên lịch; nếu không thì đóng panel, bấm chip khác hoặc bấm ra ngoài sẽ đưa chip vào +N lại. |
| 6 | Tony | Ghi chú của chủ mở rộng khi bấm biểu tượng: một khung trải dài khắp lịch tuần, đẩy lịch tuần và panel xuống dưới; đóng thì trả lại như cũ. Rich text cơ bản, WYSIWYG: đậm, nghiêng, gạch dưới, chấm, số. |
| 7 | Tony | Bỏ view 3 ngày. |

---

## 2. Phân tích

**Mục 1 (E1).** Câu chữ của khách đọc được hai cách: theo trạng thái từng ô,
hoặc theo trạng thái chip vừa bấm. Ngày 16/11 Tony chọn cách thứ hai, nên mỗi
lúc chỉ có một màu. Bản vẽ đầu có viền quanh ô trông nặng, đã đổi sang tô nền.

**Mục 3 (E3–E5).** NFR-2 và luật quyền đọc của dự án cấm nhân viên xem lịch
của người khác. Rủi ro thật ra thấp: chủ vẫn dán ảnh lịch xuất ra cho cả
quán, và Lịch quán chỉ là cùng nội dung đó, luôn mới. Màn này chỉ có tuần đã
công bố, không bao giờ hiện lương, đăng ký, giờ riêng xin, ghi chú đăng ký,
đi trễ hay ghi chú riêng của chủ. Đổi ca vẫn thống nhất qua Zalo và do chủ
ghi lại; nếu nhân viên tự đổi mà không báo chủ, Lịch quán vẫn hiện như cũ cho
tới khi chủ ghi thay đổi. Khách đã đồng ý, Tony giữ một công tắc cho chủ, và
ghi chú xếp lịch theo Lịch quán tới mọi nhân viên và vào cả file xuất.

**Mục 5 (E7, E8).** Trên điện thoại, chạm ra ngoài vốn đã đóng sheet. Trên
máy tính panel nằm cạnh lịch, nên "bấm ra ngoài" thành "bấm vùng trống trên
lịch", áp cho mọi panel.

**Mục 2 (E2).** Vị trí trong sheet là những việc mỗi người làm được, nên
chúng thành vị trí thường đảm nhiệm, trong dữ liệu mẫu đều trên ngưỡng 50
giờ. Chỉ năm người làm được Phụ trách nên số người cần mẫu (hai Phụ trách mỗi
ca) báo thiếu nhiều; trong Try-out khách tự nhập số người cần.
