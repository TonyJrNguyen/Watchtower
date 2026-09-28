# Feedback khách — 27/09/2026 (sau demo day roster, PRD v1.3)

Trạng thái: **đã chốt đủ (28/09) và đã áp dụng** vào PRD v1.4 và demo Phase 1, xem mục 0. Mục 1–2 bên dưới là bản phân tích gốc ngày 27/09,
giữ lại để truy vết. Nếu mục 1–2 khác với mục 0 thì theo mục 0.

---

## 0. Quyết định ngày 28/09

### 0.1 Đã chốt

| # | Câu hỏi (mục 2) | Quyết định |
|---|---|---|
| A1 | Assignment chưa có vị trí | **Không có mâu thuẫn.** "Xếp lịch tổng" là xếp *người* để đủ số người mỗi ca trước, sau đó mới gán vị trí. Cả hai bước đều diễn ra **trước khi công bố**. Vì vậy trong lúc nháp, assignment được phép chưa có vị trí; khi công bố, mọi assignment phải có vị trí. Ở bước xếp người, độ phủ đếm theo **tổng số người mỗi ca**. |
| A2 | "Gán vị trí sau" có khoá không | **Là thứ tự thao tác trước khi công bố, không phải khoá.** Mọi ca tạo *sau khi đã công bố* (người làm thay FR-O20, đổi ca FR-O15, ca mới) đều được công bố ngay (FR-O31), nên phải có vị trí từ lúc tạo. |
| A3 | Gộp ca liền nhau | **Đồng ý.** Các ca liền nhau của cùng một người trong cùng một ngày gộp thành một assignment. Ngưỡng anomaly tính trên cả assignment đã gộp. Ví dụ trễ 60 phút trên ca 11:00–15:00 thì **trừ lương là đúng**. |
| A4 | Vị trí khác nhau giữa các ca liền nhau | **Đồng ý.** Hệ thống tự tách thành nhiều assignment khi vị trí khác nhau. |
| B1 | Cấp tính headcount, lương, năng lực | **Chỉ cấp cha.** Vị trí con và thuộc tính chỉ để mô tả, không ảnh hưởng headcount, lương, năng lực hay cờ FR-O32. |
| B2 | QC | QC là **kiểm tra chất lượng đồ uống sau khi pha chế**, khác với Kiểm tra đơn. |
| B3 | "Bưng bàn" | Là **thuộc tính** của Phục vụ, không phải vị trí con. |
| B4 | "Bồn" | Là người pha chế chuyên rửa bồn. **Khách sẽ đổi sang từ khác phù hợp hơn.** |
| C5 | Hiển thị tag | Định dạng **"Vị trí cha - Vị trí con/thuộc tính"**. Ví dụ: `Pha chế - Matcha`, `Phục vụ` (chỉ phục vụ), `Phục vụ - Bưng bàn`. **Màu theo vị trí cha.** |
| D1 | Trùng tên | Thêm trường **Biệt danh** vào hồ sơ nhân viên. Bắt buộc không trùng trong số nhân viên đang làm. Mặc định là tên gọi + chữ cái đầu của họ, ví dụ "Mai N". |
| E1 | Mật độ icon | **Luôn hiện ai đăng ký ca nào cho cả tuần**, không thu gọn thành con số. Hiếm khi cả 40 người cùng đăng ký một ca, nên ô giãn theo số người. |
| E2 | Hover trên điện thoại | **Làm giống Google Calendar.** Desktop: hover để bung tên. Phone: chạm vào icon mở chi tiết (tên đầy đủ, vị trí, thao tác). |
| F1 | Day roster (FR-O41) | **Giữ lại** như một section riêng bên dưới calendar. |
| F2 | Xếp lịch lúc đăng ký còn mở | **Đồng ý.** Chỉ cho xếp sau khi khoá. Trong lúc còn mở, màn gộp chỉ để xem. |
| G1 | Thuật ngữ | **Đồng ý.** PRD và code dùng *position / vị trí*. "Role" chỉ dùng cho phân quyền. |

| R1 | Thu Ngân Online/Offline | **Là 2 vị trí cha hoàn toàn khác nhau**, mỗi vị trí có headcount và lương mặc định riêng. Giữ nguyên quyết định cũ trong PRD §3.3, không có gì bị đảo ngược. |
| R2 | Vị trí con | **Không bắt buộc, được chọn nhiều.** Ví dụ: `Pha chế` (không chọn khu vực), `Pha chế - Matcha, Trà`. |
| R3 | Người chưa đăng ký hiện ở mọi ô | **Vẫn hiện** (icon nét đứt). **Không thêm nút ẩn/hiện**, vì bộ lọc nhân viên đã có sẵn. |
| A5 | "Chọn nhiều ca" trong side panel | **Trong một ngày.** Side panel không tạo ca cho nhiều ngày. |
| B4 | Tên "Bồn" | **Tạm giữ "Bồn".** Đổi tên sau chỉ cần sửa nhãn, không ảnh hưởng dữ liệu. |

**Danh mục vị trí sau khi chốt**, gồm 7 vị trí cha, tương ứng 7 màu. Bảng độ phủ có 7 cột:

| Vị trí cha (tính headcount, lương, năng lực) | Vị trí con | Thuộc tính |
|---|---|---|
| QC *(mới)* | Trong, Ngoài | — |
| Thu Ngân – Online | — | — |
| Thu Ngân – Offline | — | — |
| Pha chế | Trà sữa, Matcha, Trà, Bồn | — |
| Phục vụ | — | Bưng bàn |
| Kiểm tra đơn | — | — |
| Bếp | — | — |

Vị trí con và thuộc tính không bắt buộc và được chọn nhiều. Nhãn hiển thị có dạng
`Cha - Con/thuộc tính`, ví dụ `Pha chế - Matcha, Trà`.

### 0.2 Đề xuất chưa hỏi khách (làm theo đề xuất, không chặn việc build)

- **Nhân viên thấy vị trí con trong "Lịch của tôi":** có, dùng cùng định dạng nhãn.
  Nhân viên chỉ thấy ca của chính mình (NFR-2).
- **Dữ liệu cũ:** Thu Ngân không đổi. "Pha Chế" cũ map sang `Pha chế`, không có vị trí con.
  Hiện chưa có dữ liệu thật, nên chỉ ảnh hưởng dữ liệu mẫu của demo.

---

## 1. Feedback gốc, tóm tắt

### 1.1 Danh mục vị trí mới (có vị trí con)

| Vị trí cha | Vị trí con | So với PRD v1.3 (§3.3, 6 vị trí) |
|---|---|---|
| QC | Trong (Inside), Ngoài (Outside) | **Mới hoàn toàn** |
| Thu Ngân | Offline, Online | Đã có, nhưng đang là 2 vị trí ngang hàng, không có cha |
| Pha chế | Trà sữa, Matcha, Trà, Bồn | Đã có "Pha Chế", nay tách thành 4 khu vực |
| Phục vụ | thêm option "bưng bàn" | Đã có "Phục Vụ"; "bưng bàn" chưa rõ là vị trí con hay cờ phụ |
| Kiểm tra đơn | — | Không đổi |
| Bếp | — | Không đổi |

Tính cả vị trí con thì có khoảng 12–13 vị trí có thể gán, thay cho 6 vị trí hiện nay.

### 1.2 Gộp màn Lịch rảnh và Xếp lịch

Khách muốn làm theo 3 bước:

1. **Xem lịch tổng**: thấy từng nhân viên đã đăng ký ca nào, ngày nào (vẫn có số liệu tổng).
2. **Xếp lịch tổng**: chọn *người* cho từng ca, **chưa gán vị trí**, để cân nhắc năng lực,
   lịch rảnh, độ phù hợp và độ cân bằng số ca giữa các nhân viên.
3. **Gán vị trí**: làm trên cùng giao diện calendar, sau bước 2.

Yêu cầu UI:

- Mỗi nhân viên là một icon tròn nhỏ trong ô ca, giống cách demo đang hiển thị khi lọc
  "Rảnh cả tuần". Khi hover, icon kéo dài thành một thanh hiện tên đầy đủ (có animation).
- **Màu thể hiện vị trí**, không phải tag. Tag phải hiển thị trên calendar theo cách khác.
- Gán vị trí trong một **side panel trái/phải** (dựa theo popup "Thêm ca" hiện tại) để
  vừa gán vừa nhìn được calendar.
- Flow: bấm icon nhân viên trong ca → side panel mở → chọn **nhiều ca** và chọn vị trí.
  Một nhân viên có thể có nhiều vị trí trên nhiều ca. Gán xong thì icon đổi sang màu vị trí.

### 1.3 Trùng tên

Hai nhân viên trùng tên thì icon nhỏ bị trùng. Cần một cách phân biệt.

---

## 2. Mâu thuẫn và lỗi logic

Mức độ: 🔴 chặn, phải chốt trước khi làm · 🟠 ảnh hưởng quy tắc hoặc dữ liệu · 🟡 UI/UX, giải quyết được khi thiết kế.

### A. Assignment "chưa có vị trí" (bước 2) va với mô hình dữ liệu

**A1 🔴 PRD bắt buộc mỗi assignment có ít nhất 1 vị trí, trong đó 1 vị trí chính.**
FR-O29 và Data model §4.10 quy định như vậy. Bước 2 tạo ra một loại assignment
chưa có vị trí, nên phải thêm trạng thái mới. Các quy tắc sau đang dựa vào vị trí và sẽ bị ảnh hưởng:

- **Lương (FR-C13):** nhân viên không có lương riêng thì lấy lương mặc định của vị trí chính.
  Assignment chưa có vị trí thì *không tính được lương*.
- **Độ phủ (FR-O4, FR-O30, FR-O38):** đang đếm theo từng vị trí. Assignment chưa có vị trí
  không được tính vào đâu, nên ở bước 2 bảng độ phủ sẽ báo thiếu người ở mọi ô.
- **Cờ ngoài năng lực (FR-O32):** chưa có vị trí thì không đánh giá được.

→ Đề xuất: cho phép assignment không có vị trí khi còn là **draft**, và thêm điều kiện
vào cổng công bố (FR-O33): **không được công bố khi còn assignment chưa có vị trí**.
Ở bước 2, độ phủ đếm theo *tổng số người mỗi ca*. Demo đã có `totalNeed`.

**A2 🔴 "MUST gán vị trí sau khi đã có cái nhìn tổng thể" là quy trình hay là khoá của hệ thống?**
Nếu hệ thống khoá (chưa xong bước 2 thì không cho gán vị trí), cần thêm một trạng thái
tuần mới, ví dụ "đã xếp xong người", và phải định nghĩa khi nào coi là xong. Khoá cứng
còn làm hỏng các luồng cần tạo assignment có vị trí ngay:

- Người làm thay khi về sớm (FR-O20) phải có ngay vị trí và giờ.
- Ca tạo sau khi đã công bố được công bố ngay (FR-O31), nên không thể để trống vị trí.
- Đổi ca (FR-O15).

→ Đề xuất: đây là **thứ tự trên UI**, không phải khoá. Chỉ khoá ở cổng công bố (A1).

**A3 🟠 Mỗi ca một assignment, hay gộp các ca liền nhau thành một assignment?**
Flow mới là bấm icon trong **ô ca** (CA 1…CA 5), nhưng PRD quy định assignment là
*khung giờ tự do* (§3.3, §3.5). Nếu mỗi CA là một assignment riêng thì có hai hệ quả
về quy tắc:

- **Ngưỡng anomaly (FR-S18)** tính theo độ dài *assignment*. Ví dụ: nhân viên làm
  CA 2 + CA 3 (11:00–15:00) và đến lúc 12:00, tức trễ 60 phút, khoản trừ là 120 phút.
  - Nếu lưu thành *một* assignment 4 giờ: 120 < 240 phút, nên **trừ lương 120 phút và ghi late penalty**.
  - Nếu lưu thành CA 2 (2 giờ) và CA 3 riêng: 120 ≥ 120 phút, nên thành **anomaly**, không
    trừ lương và bonus để *pending*.

  **Cùng một buổi làm, nhưng kết quả lương và bonus khác nhau tuỳ cách lưu.**
- **Ghi nhận đi trễ (FR-O24)** được ghi theo từng assignment. Nếu tách, chủ quán phải
  biết nên ghi vào CA đầu tiên.

→ Đề xuất: các ca **liền nhau cùng một người trong cùng một ngày gộp thành một assignment**.
Giờ tự do (ví dụ 16:00–23:00) vẫn chỉnh được trong side panel.

**A4 🟠 "Nhiều vị trí trên nhiều ca" có thể cho ra một assignment đổi vị trí giữa chừng.**
Ví dụ: một người làm CA 1 ở Pha chế và CA 2 ở Thu ngân. Nếu đã gộp theo A3 thì
assignment 07:00–13:00 phải tách tại 11:00. FR-O29 chỉ cho nhiều vị trí *cùng lúc*
trong một ca, không cho vị trí thay đổi theo giờ.
→ Đề xuất: chọn vị trí khác nhau cho các ca liền nhau thì hệ thống tự tách thành
nhiều assignment. Nếu cùng vị trí thì gộp lại.

**A5 🟡 "Chọn nhiều ca": trong một ngày hay cả tuần?**
Nếu được chọn nhiều ngày, side panel trở thành công cụ tạo hàng loạt. Mỗi assignment
được tạo vẫn phải đi qua kiểm tra trùng giờ (FR-O39) và cờ ngoài lịch rảnh (FR-O12),
và phải ghi audit log riêng (NFR-1).

### B. Danh mục vị trí mới

**B1 🔴 Headcount, lương và năng lực tính ở cấp cha hay cấp con?**
Có ba chỗ cần chọn cấp:

- **Nhu cầu nhân sự (FR-O1):** "cần 2 Pha chế" hay "cần 1 Trà sữa + 1 Matcha"?
- **Lương mặc định (FR-O40):** Matcha có lương khác Trà sữa không?
- **Năng lực (FR-A1):** ghi "biết Pha chế" hay "biết Matcha"?

Nếu tính ở cấp con thì bảng độ phủ đi từ 6 lên khoảng 13 cột, và bảng nhu cầu
cũng tăng tương ứng: 7 ngày × 5 ca × 13 = 455 ô.
→ Đề xuất: năng lực và lương ở **cấp cha**, trong đó vị trí con kế thừa lương của
cha. Headcount cho phép ở cả hai cấp.

**B2 🟠 QC khác gì Kiểm tra đơn?** Feedback liệt kê hai mục riêng, nhưng tên gọi
dễ nhầm với nhau. Cần khách mô tả công việc của từng vị trí.

**B3 🟠 "Phục vụ: thêm option bưng bàn".** Chưa rõ đây là vị trí con, tức là Phục vụ
có con "Bưng bàn" và có thể có con khác, hay là thuộc tính của ca, kiểu "Phục vụ có
bưng bàn". Nếu là vị trí con thì Phục vụ có bắt buộc phải chọn một con không?

**B4 🟠 "Bồn" là gì?** Có phải khu rửa ly/bồn rửa không? Nếu đúng thì đây là việc phụ
của Pha chế, không phải một trạm pha, và có thể ảnh hưởng đến lương.

**B5 🟡 Bảng vị trí đang "cố định trong code" (FR-O28), và PRD ghi đã chốt 6 vị trí (§5 Resolved).**
Không cản việc thay đổi, chỉ cần một bản deploy. Nhưng phải đưa quyết định cũ vào
§5.0 *Superseded*, rồi sửa §3.3, FR-C2 và Data model (`Position` thêm trường `parent`).
Dữ liệu cũ "Pha Chế" cần được map sang vị trí mới.

### C. Màu = vị trí

**C1 🔴 Màu hiện đang dùng để phân biệt *nhân viên*, không phải vị trí.**
Trong demo, mỗi nhân viên có màu riêng (`hsl(i×137.5°)`), và FR-O11 yêu cầu "each
staff member's availability visually distinguishable". Chuyển màu sang vị trí thì
**chỉ còn chữ viết tắt để phân biệt người**. Đó chính là vấn đề trùng tên ở mục 1.3,
nên C1 và D1 phải giải quyết cùng nhau. FR-O11 cũng phải sửa lại.

**C2 🟠 Trước khi gán vị trí thì icon có màu gì?** Ở bước 1 và 2 chưa có vị trí nào,
nên cần một bộ trạng thái không dùng màu vị trí, ví dụ:

| Trạng thái | Gợi ý hiển thị |
|---|---|
| Đã đăng ký ca, chưa được xếp | Viền, nền trắng |
| Chưa đăng ký, tính là rảnh (FR-S19, FR-O23) | Viền nét đứt (demo đang dùng) |
| Đã xếp, chưa có vị trí | Nền xám đặc |
| Đã xếp, có vị trí | Nền màu vị trí |
| Đã xếp nhưng ngoài lịch rảnh (FR-O12) | Kèm dấu cảnh báo |

**C3 🟠 Khoảng 13 vị trí con thì không phân biệt được bằng màu.** Mắt người chỉ tách
chắc chắn khoảng 6–8 màu phân loại, và người mù màu còn ít hơn.
→ Đề xuất: **màu theo vị trí cha** (6–7 màu), còn vị trí con thể hiện bằng ký hiệu hoặc
chữ nhỏ trên icon. Không để màu là tín hiệu duy nhất.

**C4 🟠 Một người giữ nhiều vị trí trong một ca (FR-O29, FR-O30) thì tô màu gì?**
Có thể tô màu vị trí chính và thêm dấu "kiêm", hoặc tô chia đôi icon.

**C5 🟠 "Tag" là tag nào?** Demo có các tag *Rảnh cả tuần*, *Thiếu giờ*, *Chưa đăng ký*,
*kiêm*, và cờ ngoài lịch rảnh/ngoài năng lực. Cần khách chỉ rõ tag nào phải lên
calendar và muốn hiển thị theo cách nào (viền, chấm góc, hay biểu tượng).

### D. Trùng tên

**D1 🔴 Chữ viết tắt hiện nay đã trùng ngay cả khi không trùng tên.** Demo lấy 2 chữ
đầu của tên gọi (`given.slice(0,2)`). Với 40 tên mẫu, dù không ai trùng tên gọi,
đã có 3 người cùng ra "Th" và 2 người cùng ra "Tr", "Nh", "Kh". Tên Việt dồn vào
một số tên gọi phổ biến (Anh, Linh, Trang, Huy…), nên trùng thật sẽ còn nhiều hơn.
→ Đề xuất: thêm trường **tên hiển thị ngắn** vào hồ sơ nhân viên (FR-A1). Chủ quán tự đặt,
hệ thống **bắt buộc không trùng** trong các nhân viên đang làm, và gợi ý mặc định là tên gọi +
chữ cái đầu của họ (ví dụ "Mai N", "Mai T"). Icon phải rộng ra thành dạng viên thuốc
(pill) để chứa 3–4 ký tự. Hover hoặc chạm vẫn hiện tên đầy đủ.

### E. Mật độ và mobile

**E1 🔴 Khoảng 40 icon mỗi ô không đọc được.** Demo chỉ hiện icon khi chọn ≤ 9 người
(≤ 16 trên mobile). Khách thấy icon lúc lọc "Rảnh cả tuần" vì bộ lọc đó chỉ còn 2 người.
Nếu hiện tất cả mọi người, một ô CA có thể có hơn 25 icon, vì 6 người chưa đăng ký
được tính là rảnh ở *mọi* ô (FR-S19).
→ Cần chốt: người chưa đăng ký có hiện trong từng ô không, hay gom thành một dòng
"+6 chưa đăng ký"? Khi quá đông thì làm gì: thu gọn thành "+N", ô tự giãn, hay
chỉ hiện người chưa được xếp?

**E2 🔴 Hover không có trên điện thoại, mà NFR-5 yêu cầu mọi chức năng phải dùng được trên phone.**
Trên phone, chạm vào icon là để *xem tên* hay để *mở side panel*? Không thể làm cả hai
bằng cùng một lần chạm.
→ Đề xuất: chạm lần đầu thì bung tên, chạm lần hai (hoặc bấm nút trên thanh tên) thì
mở panel. Ngoài ra thanh tên kéo dài sẽ che icon bên cạnh trong ô đông người.

**E3 🟠 Side panel "vừa gán vừa xem" không làm được trên phone rộng 390px.** Trên phone,
panel sẽ thành bottom sheet che phần lớn calendar. Cần chấp nhận điều này, hoặc thiết kế
bottom sheet nửa màn hình.

### F. Gộp hai màn và chuyện "vừa làm xong hôm qua"

**F1 🟠 Day roster (FR-O41) mới thêm ở v1.3 (27/09) theo yêu cầu của chủ quán.**
Feedback này thay nó bằng calendar tuần có icon. Cần chốt FR-O41 bị **bỏ**, **giữ làm
chế độ xem theo ngày**, hay **giữ làm layout mobile**. Roster đã có sẵn các thứ bước 2
cần: nhóm người đã đăng ký / chưa đăng ký / không làm được, cột ca đã được xếp, và sắp xếp
theo số giờ, hữu ích cho việc "cân bằng ca".

**F2 🟠 Lịch rảnh đang mở trong lúc cửa sổ đăng ký còn mở, còn xếp lịch chỉ bắt đầu sau khi khoá (§3.5.1).**
Gộp hai màn thì phải chốt: trong lúc đăng ký còn mở, màn này chỉ để xem, hay cho xếp
nháp sớm? Nếu cho xếp sớm, một nhân viên có thể bỏ đăng ký sau khi đã được xếp. Assignment
đó sẽ âm thầm thành "ngoài lịch rảnh". Đề xuất: **chỉ cho xếp sau khi khoá**, đúng như PRD.

**F3 🟡 "Cân bằng ca làm" cần số liệu.** Muốn cân bằng thì khi xếp, mỗi người cần hiện
số ca và số giờ đã được xếp trong tuần. Demo hiện chỉ có số *đăng ký*. Đây là
thông tin hiển thị, không phải quy tắc mới.

**F4 🟡 Chọn nhân viên để so sánh (FR-O11) còn giữ không?** Nếu calendar luôn hiện tất cả
mọi người thì bộ lọc checkbox chỉ còn dùng để thu hẹp. FR-O11 cần viết lại.

### G. Thuật ngữ

**G1 🟡 Khách gọi là "role", PRD gọi là "position".** PRD §3.3 cố ý tách *position* (công việc
trên ca) khỏi *role* (Superadmin / Administrator / Staff, tức quyền truy cập). Trong PRD
và code nên giữ chữ **position / vị trí**, còn UI tiếng Việt có thể ghi "vị trí".
Như vậy tránh được việc trộn với phân quyền.

---

## 3. Câu hỏi còn mở

Không còn câu nào. Mọi câu hỏi ngày 27/09 đã được trả lời ở mục 0.1.

## 4. Phần PRD sẽ phải sửa khi chốt (v1.4)

- **§3.3:** bảng vị trí thành 7 vị trí cha (thêm QC) + vị trí con + thuộc tính.
  Giữ nguyên câu Thu Ngân Online/Offline là hai vị trí riêng. Thêm Biệt danh.
- **§3.5:** flow 3 bước, gồm xem lịch tổng, xếp người, rồi gán vị trí, tất cả trước khi công bố.
  Màn Lịch rảnh và Xếp lịch gộp thành một, chỉ xếp được sau khi khoá.
- **FR-A1:** thêm trường Biệt danh không trùng. Năng lực tính ở cấp cha.
- **FR-O1, FR-O4, FR-O30, FR-O38:** headcount theo vị trí cha. Ở bước xếp người, độ phủ đếm theo tổng số người mỗi ca.
- **FR-O10, FR-O11:** calendar tuần luôn hiện icon từng người. Màu theo vị trí cha, nhãn
  "Cha - Con/thuộc tính". Tương tác kiểu Google Calendar. Gán qua side panel.
- **FR-O29:** assignment nháp được phép chưa có vị trí. Assignment tạo sau khi công bố
  phải có vị trí. Mỗi assignment có thể có vị trí con/thuộc tính. Các ca liền nhau cùng
  vị trí thì gộp, khác vị trí thì tách (A3, A4).
- **FR-O31, FR-O33:** cổng công bố chặn khi còn assignment chưa có vị trí.
- **FR-O40, FR-C2, FR-C13:** lương mặc định theo vị trí cha.
- **FR-O41:** roster giữ lại, thành section bên dưới calendar.
- **§4.10:** `Position` thêm vị trí con và thuộc tính. Thêm `Staff.nickname`. `Assignment.positions` được để trống khi còn nháp.
- **FR-O30:** một assignment có nhiều vị trí con của cùng một vị trí cha **không** tính là
  "kiêm", vì headcount chỉ tính ở cấp cha.
- **§5:** danh mục 6 vị trí cũ chuyển sang §5.0 *Superseded*, thay bằng danh mục 7 vị trí cha.
- **§5.3:** ghi nhận demo.

Mọi quyết định ở mục 0.1 đã được khách chốt (28/09), nên **không** đưa vào danh sách
*pending confirmation*. Chỉ hai đề xuất ở mục 0.2 sẽ được đánh dấu *proposed pending client confirmation*.
