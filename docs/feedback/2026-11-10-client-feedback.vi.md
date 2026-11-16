# Góp ý của khách — 10/11/2026 (review bản vẽ v1.11 trên Try-out)

> Bản tiếng Anh: [`2026-11-10-client-feedback.md`](2026-11-10-client-feedback.md).
> Bản tiếng Anh là bản chính. Sửa bản nào thì sửa bản kia cho khớp. "Role"
> trong lời khách nghĩa là *vị trí* (PRD §3.3).

Trạng thái: **đã chốt, còn một mục chờ khách.** Đây là lần khách review các
bản vẽ v1.11, làm trên chế độ Try-out của wireframe (PRD §5.3). Tony đã trả
lời hết các mục trên trang review, qua hai vòng ngày 12/11/2026 (mục 0). Các
câu trả lời được áp vào PRD v1.13. Khách còn phải chọn một trong ba cách xếp
chip ở mục 12 (D22, PRD §5.1 O7). Mục 1–2 bên dưới là nội dung gốc và phần
phân tích, giữ lại để truy vết. Chỗ nào mục 0 khác mục 1–2 thì theo mục 0.

Nguồn: sheet chung *FEEDBACK-WATCHTOWER*, tab *10.11*. Mục 1–10 do đầu mối
bên khách (huyhoang.tran0703) viết; mục 11–14 và note ở mục 6 do Tony thêm.

---

## 0. Quyết định (đã áp vào PRD v1.13)

"Khách" là điều khách yêu cầu trong sheet, "Tony" là câu trả lời của Tony
trên trang review.

| # | Chủ đề | Quyết định | Nguồn | PRD |
|---|---|---|---|---|
| D1 | Màu | Phụ trách `#666666`, Thu Ngân – Offline `#ff9749`, Thu Ngân – Online `#55c0c9`, Kiểm tra đơn `#f57bc8`, Pha chế `#56be72`, Phục vụ `#fbbc04` (giữ nguyên), Bếp `#df564a`. Chữ trắng trên Phụ trách và Bếp, chữ tối trên các vị trí khác (mục 1) | Khách | §3.3 |
| D2 | Pha chế | Vị trí con đổi tên và ký hiệu bằng số: **1** Trà sữa, **2 Latte** (trước là Matcha), **3** Trà, **4 Topping** (trước là Bồn). Đổi tên chỉ đổi nhãn, nên ca cũ cũng hiện tên mới (mục 2) | Khách, Tony (đổi tên) | §3.3, §4.10 |
| D3 | Ký hiệu Phụ trách | **T** (Trong) và **N** (Ngoài) thay cho Tr và Ng (mục 3) | Khách | §3.3 |
| D4 | Ký hiệu Bưng bàn | **B** thay cho BB. Chữ B không còn trùng, vì Bồn giờ là 4 | Tony | §3.3 |
| D5 | Chip đã đăng ký | Vì Phụ trách giờ màu xám, chip "đã đăng ký, chưa xếp" chuyển sang **nền trong, viền nét đứt**, vẫn giữ dấu tích, thay cho nền xám | Tony | FR-O42 |
| D6 | Cảnh báo | **Gạch sóng dưới biệt danh** thay cho huy hiệu "!". Gạch sóng cùng màu chữ, nên thấy được trên mọi màu vị trí và trên chip nét đứt, và khác hẳn gạch ngang của người đã nghỉ (mục 4) | Khách (yêu cầu), Tony (kiểu) | FR-O42, FR-O49 |
| D7 | Ký hiệu | Ký hiệu chuyển lên **góc phải trên** của chip, đúng chỗ của "!" cũ, thành một huy hiệu đặc nhỏ. Hai vị trí con dùng chung một huy hiệu ("1·3") (mục 4, 5) | Khách (chỗ đặt), Tony (kiểu) | §3.3, FR-O42 |
| D8 | Giờ đăng ký | Giờ lưu đăng ký lần đầu vẫn nằm ở mép trên bên trái của chip đã đăng ký chưa xếp, như trên Try-out. Không bao giờ đụng ký hiệu, vì ký hiệu chỉ có trên chip đã xếp | Tony | FR-O42 (không đổi) |
| D9 | Thêm | Khi tuần còn là bản nháp, chọn người trong danh sách Thêm sẽ **xếp ngay** người đó vào ca, chưa có vị trí, và mở panel với ca đó đã chọn sẵn. Đóng panel mà chưa Lưu thì chip vẫn ở lại: đây là một lần xếp nháp bình thường, hoàn tác được (FR-O48) và phải có vị trí trước khi công bố (FR-O33). Chỉ nút **Huỷ** của panel mới bỏ chip ra, khi panel đó chưa Lưu lần nào; Đặt lại vẫn giữ chip (Tony, 12/11, xem mục 6). Sau khi công bố thì Thêm vẫn như cũ, vì ca mới phải có vị trí (mục 6) | Khách, Tony | FR-O46, §3.5 |
| D10 | Danh sách Thêm | Bỏ chữ "chưa có ca hôm nay" khi người đó không có ca nào khác trong ngày, để trống thay vào (mục 6) | Tony | FR-O46 |
| D11 | Vị trí thường đảm nhiệm | **Không giới hạn.** Mọi vị trí có hơn 50 giờ đã công bố trong 12 tuần gần nhất là vị trí thường đảm nhiệm, cùng mọi vị trí chủ tick tay. Cờ "chưa có kinh nghiệm" và bộ lọc kinh nghiệm đọc chính danh sách này, nên "vị trí có kinh nghiệm" không còn là một danh sách riêng. Vẫn giữ luật ghim khi tick tay và đếm lại từ 0 khi bỏ tick (mục 8) | Khách, Tony | FR-A12, FR-O32, §3.3, ADR 0029 |
| D12 | Header ngày | Bấm vào một ngày trên header của lịch thì mở view **Ngày** của ngày đó (mục 9) | Khách | FR-O47 |
| D13 | Đổi view | Đổi sang Ngày hoặc 3 ngày thì bắt đầu từ ngày của chip đang mở panel. Không có panel mở thì giữ luật cũ: ngày đầu tiên đang xem, tức thứ 2 nếu đang ở view Tuần (mục 9) | Khách, Tony | FR-O47 |
| D14 | 3 ngày từ một chip | Ngày trước và ngày sau, giữ trong tuần đó: từ thứ 2 thì xem T2–T4, từ CN thì xem T6–CN. Nút trước/sau vẫn đi qua tuần khác được (mục 9) | Tony | FR-O47 |
| D15 | Ghi chú | Hai loại ghi chú mới, đều thuộc **Phase 1** (mục 10): **ghi chú riêng của chủ** theo tuần, chỉ chủ thấy và sửa; và **ghi chú xếp lịch** theo ngày, chủ viết và công bố cùng lịch tuần | Khách, Tony (phase) | FR-O53, FR-O54, §4.13 |
| D16 | Ai đọc ghi chú xếp lịch | Mọi staff có ca đã công bố trong ngày đó. Đây là ngoại lệ có chủ đích của NFR-2, vì ghi chú kiểu "A kèm B" có nhắc tên người khác | Tony | FR-O54, FR-S11, NFR-2, ADR 0030 |
| D17 | Sửa ghi chú đã công bố | Sửa sau khi công bố thì thành bản nháp, staff chưa thấy cho tới khi chủ công bố ghi chú đó. Trong lúc đó staff vẫn thấy bản đã công bố | Tony | FR-O54 |
| D18 | Bấm chip mở/đóng panel | Bấm chip của panel đang mở thì đóng panel; bấm chip khác thì chuyển panel sang chip đó; nút đóng vẫn giữ (mục 11) | Tony | FR-O43 |
| D19 | Ca được chọn trong panel | Các ca được tick là ngày làm của người đó sau khi Lưu. Panel mở ra tick sẵn **mọi** ca họ đã được xếp trong ngày, bấm chip nào cũng vậy, kể cả CA 5; mở từ ca họ chưa được xếp thì tick thêm ca đó như một gợi ý. Bỏ tick là bỏ khỏi ca; Lưu chỉ ghi phần chênh lệch nên ca không đụng tới giữ nguyên vị trí và giờ; vị trí áp cho ca vừa bấm (ca ngữ cảnh) và các ca mới tick; bỏ nút Bỏ khỏi ca; có Đặt lại, Huỷ, và câu hỏi Lưu / Bỏ thay đổi / Ở lại khi rời panel. Chốt trên một trang duyệt riêng ngày 12/11, xem mục 13 (mục 13) | Tony | FR-O43, FR-O46, ADR 0031 |
| D20 | Ngày thiếu giờ trên lịch | Chip có cảnh báo khi ngày đăng ký của staff dưới 8 tiếng theo luật FR-S3, bất kể tổng giờ cả tuần. Ngày có trọn CA 5 thì không cảnh báo. Khi xếp thứ tự (FR-O49), cảnh báo này không tính (mục 14) | Tony | FR-O42, FR-O49 |
| D21 | Sửa Try-out | Tạo staff mới rồi dùng thử app dưới tên người đó, như với mọi staff khác (mục 7). Không đổi sản phẩm | Khách | — |
| D22 | Cách xếp chip | Khi một người đăng ký nhiều ca trong ngày mà chỉ được xếp vài ca, chip ở ca không được xếp vẫn chiếm chỗ và làm chủ rối. Ba phương án được vẽ trên Try-out để khách chọn (mục 12). **Đang chờ khách** | Tony | §5.1 O7 |
| D23 | Trạng thái review | Sheet này là bản review các bản vẽ v1.11 của khách. Từ đây có thể ước lượng lại backlog và tính phí phần xuất lịch (FR-O52) | Tony | §5.3 |

Không thêm gì vào danh sách *chờ khách xác nhận*: mỗi mục đều do khách yêu
cầu, hoặc do Tony chốt sau khi khách review.

---

## 1. Nội dung gốc

Mục 1–10 của khách, mục 11–14 và note ở mục 6 của Tony. Chép nguyên văn từ
sheet.

**1. Code màu từng vị trí.** PHỤ TRÁCH `#666666`, OFF `#ff9749`, ONL `#55c0c9`,
KTĐ `#f57bc8`, PC `#56be72`, PV `#fbbc04`, BẾP `#df564a`.

**2. Kí hiệu của pha chế.** Pha chế Trà sữa: 1. Pha chế Latte: 2 (Tên cũ là
Pha chế Matcha). Pha chế Trà: 3. Pha chế Topping: 4 (Tên cũ là Pha chế Bồn).

**3. Kí hiệu của Phụ trách.** Phụ trách Trong: T & Phụ trách Ngoài: N.

**4. Vị trí của icon warning.** Đổi thành 1 ký hiệu khác gọn hơn.

**5. Vị trí của kí hiệu pha chế & phụ trách.** Cho kí hiệu thể hiện lên trên
tên nhân sự.

**6. Nút thêm nhân viên vào ca.** Cần note rõ hơn các nhân sự "có đăng ký
nhưng chưa được xếp vào ca" và nhân sự "không đăng ký" thay vì ghi chung là
"chưa có ca hôm nay".

> Anh Trong Nguyen: Current: trong 1 ca, staff không đăng ký ca đó (vẫn có
> đăng ký ca khác trong ngày) → khi chủ vẫn assign staff vào ca không đăng ký
> → không được add vào ngay ca đó mà phải mở panel → chọn ca → bấm Lưu mới
> được. Expected: khi chủ assign staff vào ca không đăng ký → ca đó hiện staff
> liền → panel hiện lên với ca làm tương ứng được select sẵn.
>
> NOTE: có thể bỏ hẳn tag "chưa có ca hôm nay" → lí do: bị thừa, vì khi chủ
> dùng nút thêm staff vào ca, nghĩa là staff đó không đăng ký ca đó → không
> cần tag "chưa có ca hôm nay" nữa. Các behaviour khác giữ nguyên.

**7. Fix tính năng thêm nhân viên + sửa profile nhân viên.** Current: bản demo
chưa cho phép flow tạo nhân viên mới + impersonate nhân viên đó như những nhân
viên khác. Expected: có thể tạo staff mới + impersonate.

**8. Fix lại profile nhân viên có thể chọn nhiều role.** Current: mỗi staff bị
limit chỉ có 2 role có kinh nghiệm, dựa trên số giờ làm role + override từ
chủ. Expected: mỗi staff không còn bị limit bởi role có kinh nghiệm nữa.
Behaviour của auto-assign role khi đủ giờ làm và override từ chủ được giữ
nguyên.

**9. Fix tính năng bấm chọn vào từng ngày đơn giản hơn.** Current: muốn chọn
view theo ngày: click ngày → default sẽ luôn là view vào thứ 2 → muốn xem ngày
khác phải chọn trên lịch hoặc dùng navigation button. Expected:

- Bấm trực tiếp vào ngày của lịch phía trên header → sẽ access trực tiếp thẳng
  vô view của ngày hôm đó.
- Behaviour khi click view ngày: check xem chủ đang click chip của ngày nào →
  click view ngày sẽ vô view của ngày hôm đó. Nếu không có chip nào đang được
  xem thì giữ behaviour default view của thứ 2 khi click view ngày.
- Tương tự với view 3 ngày: check xem chủ đang click chip của ngày nào → click
  view 3 ngày sẽ vô view của ngày hôm đó + ngày hôm trước + ngày hôm sau. Nếu
  không có chip nào đang được xem thì giữ behaviour default view của thứ 2 khi
  click view 3 ngày: xem view của thứ 3 và thứ 4.
- Behaviour ở navigation và chọn ngày trong calendar picker giữ nguyên.

**10. Thêm khung note để ghi chú linh tinh trong lúc xếp lịch.** 2 loại note:
(1) note cá nhân của chủ: chỉ chủ thấy, tạo, edit và xóa (note theo nguyên
tuần); (2) note khi xếp lịch (ví dụ: staff A kèm staff B; staff C cần thử làm
role pha chế), publish cùng với lịch tuần. Chủ có full CRUD permission; staff
chỉ có Read permission (note theo ngày).

**11. Thêm behaviour open/close của chip trên lịch.** Current: click chip sẽ mở
panel, đóng panel phải click X. Expected: khi chưa có panel mở → click chip →
mở panel của chip đó. Khi có panel mở: nếu click cùng chip của panel sẽ đóng
panel; nếu click chip khác sẽ mở panel của chip đó. Behaviour dùng X để đóng
được giữ nguyên.

**12. Modify the logic of arrangement of the chip on the Calendar** (3
options, cần generate wireframe để ra quyết định). Scenario: staff đăng ký
nhiều ca trong ngày, nhưng chỉ được assign một số ca → chip của staff được giữ
nguyên trong ca làm không được assign, chiếm hẳn 1 slot trong ca làm đó → chủ
bị rối khi sắp xếp ca → bad UX.

1. Khi staff đó đã được assign ca khác trong ngày → chuyển hẳn chip ở ca còn
   lại xuống cuối danh sách, sau những người chưa được xếp ca. Chip vẫn hiển
   thị như bình thường.
2. Khi staff đó đã được assign ca khác trong ngày → chuyển hẳn chip ở ca còn
   lại xuống cuối danh sách, sau những người chưa được xếp ca. Chip sẽ được ẩn
   đi dưới dạng +[number of hidden staff]. Chủ hover vào sẽ thấy danh sách các
   hidden staff, click vào sẽ hiện lại như (1).
3. Chia ô ca thành nửa trên nửa dưới, với 1 line mờ để separate: bên trên dành
   cho các chip được assign ca đó, bên dưới giữ những chip có đăng kí nhưng
   không được assign.

**13. Sửa behaviour khi click vào chip của staff đã được assign ca.** Current:
side panel của chip khi click vào chip đã được assign ca chỉ hiện select của
ca mà chip đã được click. Expected: side panel của chip khi click vào chip đã
được assign ca ở bất kì ca nào đều phải hiện selected các ca đã được assign.
Exceptional: khi mở side panel bằng chip ở ca 5 mà staff có được assign ở các
ca trước thì không cần hiện selected ở các ca trước (1, 2, 3, 4); chỉ cần hiện
selected ở ca 5. Nếu thấy conflict thì raise lên → có thể điều chỉnh như
expected bên trên.

**14. Behaviour warning thiếu giờ ở lịch tuần.** Current: nếu staff đăng ký
trong tuần ≥ 40h nhưng vẫn có ngày thiếu giờ thì không hiện warning trên chip.
Expected: nếu staff thiếu giờ tối thiểu trong ngày, cần hiện warning trên chip.

---

## 2. Phân tích

**Mục 1 và chip đã đăng ký (D5).** Phụ trách màu xám sẽ trùng với nền xám của
chip đã đăng ký chưa xếp, nên chủ không phân biệt được hai loại. Vì vậy chip
đã đăng ký bỏ nền.

**Mục 4 và 5 (D6–D8).** Khách muốn dành góc của huy hiệu "!" cho ký hiệu, nên
cảnh báo cần một kiểu mới không tốn chỗ trên chip cao 24 px. Đã vẽ bốn kiểu:
góc gập, gạch sóng, sọc chéo và tam giác nhỏ. Góc gập buộc chip phải vuông góc
và chỉ khoảng 10 px; sọc chéo làm chip vàng và hồng khó đọc; tam giác tốn
khoảng 16 px chỗ của biệt danh. Gạch sóng đọc ra là "có gì đó sai", giống gạch
lỗi chính tả, và dùng được cả trên chip nét đứt. Giờ đăng ký và ký hiệu không
bao giờ gặp nhau, vì một cái chỉ có trước khi xếp, một cái chỉ có sau khi xếp.

**Mục 6 (D9, D10).** Xếp ngay là điều chủ mong đợi khi bấm Thêm. Đây là ngoại
lệ của luật một nút Lưu trong panel, nên chỉ áp cho lần xếp do Thêm tạo ra.
Sau khi công bố thì không được xếp mà chưa có vị trí, nên lúc đó Thêm vẫn mở
panel như cũ. Ngày 12/11 Tony thấy bấm Huỷ mà chip vẫn còn thì trông như lỗi,
nên Huỷ trong panel do Thêm mở sẽ bỏ luôn lần xếp đó. Đóng panel cách khác,
hay bấm Đặt lại, thì chip vẫn ở lại, nên Thêm vẫn là xếp ngay.

**Mục 8 (D11).** Khi không còn giới hạn thì cũng không còn gì để xếp hạng: mọi
vị trí vượt ngưỡng đều là vị trí thường đảm nhiệm. Giữ thêm một danh sách rộng
hơn cho cờ kinh nghiệm không còn ý nghĩa, nên cờ đọc luôn vị trí thường đảm
nhiệm. Hệ quả: một vị trí từng làm nhiều nhưng không làm trong 12 tuần gần
nhất sẽ bị gắn cờ lại; chủ tick tay là hết.

**Mục 10 (D15–D17).** "Ghi chú" hiện có là ghi chú staff tự viết trên đăng ký
của họ (FR-S22). Hai loại mới được đặt tên là **ghi chú riêng của chủ** và
**ghi chú xếp lịch** để ba loại không bị lẫn. Ghi chú xếp lịch có nhắc tên
người khác, nên cho staff đọc là một ngoại lệ của NFR-2; ngoại lệ này chỉ áp
cho staff có ca trong ngày đó.

**Mục 13 (D19).** Bỏ ngoại lệ CA 5: nếu panel không chọn sẵn các ca trước thì
cùng một ngày lại hiện khác nhau tuỳ chip được bấm. Sau đó Tony muốn bấm chip
ca chưa xếp cũng tick luôn các ca đã xếp, và từ đó lộ ra lỗi Lưu ghi vị trí
đang chọn vào mọi ca đang tick. Trang duyệt thứ hai ngày 12/11 so panel hiện
tại với panel theo trạng thái trên một bản thử chạy được, và Tony chọn panel
theo trạng thái: ô tick là ngày làm sau khi Lưu, Lưu ghi phần chênh lệch, vị
trí áp cho ca ngữ cảnh và ca mới tick (ca mới không có vị trí nếu chưa chọn),
bỏ nút Bỏ khỏi ca, Đặt lại và Huỷ là hai nút riêng, rời panel khi chưa lưu thì
hỏi, và bấm chip khác của cùng người cùng ngày thì đổi ca ngữ cảnh, sửa lại
D18. Không cần luật khoá đăng ký khi đã có ca ở Phase 1, vì đăng ký khoá cả
tuần trước khi xếp được ca nào (ADR 0031).

**Mục 14 (D20).** Try-out chỉ hiện cờ thiếu giờ (FR-O22, dưới 5 ngày đủ 8
tiếng) ở danh sách staff, chưa bao giờ hiện trên chip. PRD cũng chưa có cảnh
báo trên chip cho ngày thiếu giờ, nên đây là luật mới chứ không phải sửa lỗi.
