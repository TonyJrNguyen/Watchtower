# HỆ THỐNG QUẢN LÝ CA LÀM VIỆC & NHÂN SỰ
## Đề xuất Giải pháp, Lộ trình Triển khai và Chi phí Đầu tư

---

**Phiên bản:** 3.0 · **Ngày:** 29/09/2026 *(thay thế phiên bản 2.0 ngày 08/09/2026)*
**Đơn vị thực hiện:** Tony
**Tài liệu tham chiếu:** Solution & Requirements Document v1.6 (28/09/2026) và bản mẫu tương tác Giai đoạn 1 đã duyệt cùng Quý khách

---

> **Điểm thay đổi so với phiên bản 2.0.** Từ 08/09 đến 28/09, phạm vi Giai đoạn 1 được điều chỉnh năm lần theo góp ý của Quý khách khi xem bản mẫu: gộp Lịch rảnh và Xếp lịch thành một lịch tuần, thêm danh sách theo ngày, Biệt danh, vị trí QC và vị trí con, nút Thêm trong từng ô ca, bộ lọc nhân viên, và **dùng đầy đủ trên điện thoại ngay từ Giai đoạn 1** (trước đây dự kiến sang Giai đoạn 2). Chi phí và thời gian Giai đoạn 1 được tính lại theo phạm vi mới. Giai đoạn 0 rút gọn vì một phần đã hoàn thành qua bản mẫu. Chi tiết ở mục 4 và 6.

## 1. TÓM TẮT

Tài liệu này trình bày kế hoạch xây dựng một hệ thống quản lý ca làm việc và nhân sự được thiết kế riêng cho mô hình vận hành của Quý khách: khoảng 40 nhân viên, mở cửa 7 ngày/tuần từ 07:00 đến 23:00, chia thành 5 ca cố định trong ngày.

Dự án được chia thành **3 giai đoạn độc lập**, mỗi giai đoạn ký kết và nghiệm thu riêng. Quý khách nhận được giá trị sử dụng ngay từ giai đoạn đầu tiên, và có toàn quyền quyết định có tiếp tục các giai đoạn sau hay không.

| | Nội dung | Thời gian | Chi phí |
|---|---|---|---|
| **Giai đoạn 0** | Chốt quy tắc còn chờ, chuẩn bị hạ tầng, ký hợp đồng | 2 tuần | 15.000.000đ *(khấu trừ vào GĐ 1)* |
| **Giai đoạn 1** | Đăng ký ca, xếp lịch & ghi nhận đi trễ | 20 tuần | 370.000.000đ |
| **Giai đoạn 2** | Thông báo, trung tâm điều hành, tính lương & thưởng | 14 tuần | 285.000.000đ |
| **Giai đoạn 3** | Chấm công tự động *(tạm tính)* | 6 tuần | 130.000.000đ |

**Tổng thời gian Giai đoạn 0 + 1 + 2: khoảng 9 tháng** (gồm 3 tuần vận hành ổn định giữa Giai đoạn 1 và 2).
**Tổng chi phí Giai đoạn 0 + 1 + 2: 655.000.000đ** (15.000.000đ Giai đoạn 0 đã được khấu trừ vào Giai đoạn 1).

> **Giai đoạn 1 được thu hẹp có chủ đích** để giải quyết đúng vấn đề cấp bách nhất — nút thắt xếp ca hàng tuần. Giai đoạn 1 làm đúng bốn việc: nhân viên đăng ký ca rảnh, Quý khách xếp và công bố lịch, Quý khách ghi nhận ai đi trễ, hệ thống áp dụng quy tắc đi trễ cho lượt ghi nhận đó.
>
> **Những gì Giai đoạn 1 chưa có, nêu rõ để tránh hiểu nhầm:** chưa có thông báo tự động dưới bất kỳ hình thức nào; chưa có trung tâm điều hành; và **đi trễ chỉ được ghi nhận và phân loại theo quy tắc (tính bằng phút), chưa quy ra tiền và chưa trừ vào lương** — việc tính lương thuộc Giai đoạn 2. Hệ thống có hiển thị **lương tạm tính** = số giờ đã xếp ca × lương giờ, để Quý khách và từng nhân viên tham khảo. Chi tiết ở mục 4.

---

## 2. VẤN ĐỀ HIỆN TẠI

| Vấn đề | Ảnh hưởng đến vận hành |
|---|---|
| Xếp ca thủ công qua Zalo cho gần 40 nhân viên | Tạo nút thắt mỗi tuần; mất nhiều giờ tổng hợp thủ công |
| Không có hệ thống tập trung | Khó xử lý điều chỉnh ca, đổi ca, thay đổi hiệu suất; mọi thứ mang tính đối phó |
| Tính lương thủ công | Dễ sai sót, tốn thời gian, chiếm mất thời gian lẽ ra dành cho công việc chiến lược |

---

## 3. GIẢI PHÁP ĐỀ XUẤT

### 3.1 Nguyên tắc thiết kế

**Hệ thống là nơi ghi nhận quyết định, không phải nơi thương lượng.**

Việc trao đổi giữa nhân viên với nhau, và giữa Quý khách với nhân viên, vẫn tiếp tục diễn ra trên Zalo — nơi đội ngũ đã quen làm việc. Thỏa thuận được chốt trên Zalo trước; hệ thống ghi nhận kết quả sau.

Vì vậy hệ thống **không có** hàng đợi phê duyệt hay quy trình xin–duyệt trong ứng dụng. Khi một thay đổi đến lịch làm việc, nó đã được thống nhất rồi. Điều hệ thống mang lại là **một nguồn dữ liệu duy nhất**, **nhật ký đầy đủ mọi thay đổi**, và **tính lương – thưởng tự động** (từ Giai đoạn 2).

Zalo nằm ngoài phạm vi hệ thống. Không tích hợp, không Official Account, không bot. Mọi thông báo hệ thống cần gửi đều được gửi bằng thông báo đẩy của chính ứng dụng (từ Giai đoạn 2).

### 3.2 Nền tảng

Hệ thống là một **ứng dụng web cài đặt được (PWA)** — một mã nguồn phục vụ cả hai đối tượng:

- **Nhân viên** dùng trên điện thoại là chính, cài vào màn hình chính như một ứng dụng bình thường, và vẫn dùng được trên trình duyệt máy tính
- **Quý khách (Quản trị viên)** dùng trên máy tính là chính, và **dùng được đầy đủ trên điện thoại** — kể cả xem ai đăng ký, xếp người và gán vị trí — cho những lúc Quý khách đang ở quầy

Chọn ứng dụng web thay vì ứng dụng tải từ App Store/CH Play vì: không phải chờ duyệt ứng dụng, không phải phân phối từng máy, và **cập nhật có hiệu lực ngay lập tức** — điểm này đặc biệt quan trọng với một hệ thống tính lương, vì nhân viên dùng bản cũ có thể bị tính lương theo quy tắc đã bị thay thế.

### 3.3 Bốn phân hệ

**1. Quản lý tài khoản** — Quý khách tạo và quản lý toàn bộ tài khoản nhân viên, vai trò, vị trí có kinh nghiệm và mức lương. Mỗi nhân viên có một **Biệt danh** ngắn, không trùng với nhân viên đang làm khác (mặc định là tên gọi + chữ cái đầu của họ, ví dụ "Mai N"), dùng trên lịch tuần nơi không đủ chỗ cho họ tên đầy đủ. Nhân viên không tự đăng ký. Khi nghỉ việc, tài khoản được **vô hiệu hóa chứ không xóa**, giữ nguyên toàn bộ lịch sử. Quý khách tự chỉnh được lương mặc định theo vị trí, các ca trong ngày, cửa sổ đăng ký, danh mục vị trí và lý do bỏ qua — không cần chờ cập nhật phần mềm.

**2. Đăng ký ca rảnh (Nhân viên)** — Nhân viên chọn các ca mình có thể làm trong tuần tới, theo **5 ca cố định**:

| Ca | Giờ | Thời lượng |
|---|---|---|
| CA 1 | 07:00 – 11:00 | 4 giờ |
| CA 2 | 11:00 – 13:00 | 2 giờ |
| CA 3 | 13:00 – 15:00 | 2 giờ |
| CA 4 | 15:00 – 17:00 | 2 giờ |
| CA 5 | 17:00 – 23:00 | 6 giờ |

Cửa sổ đăng ký mở **Thứ Năm 00:00 và đóng Thứ Bảy 15:00**, cho tuần bắt đầu từ Thứ Hai kế tiếp. Có nút **"Chọn tất cả ca"** để đăng ký cả 5 ca của một ngày chỉ bằng một thao tác.

Đăng ký có nghĩa là *"tôi có thể làm giờ này"*, **không phải** *"đây là ca của tôi"*. Lịch chính thức hoàn toàn do Quý khách quyết định.

**3. Lịch tuần và xếp lịch (Quý khách)** — Lịch rảnh và xếp lịch nằm trên **một lịch tuần duy nhất**, làm theo ba bước trước khi công bố:
- **Xem ai đăng ký:** mỗi nhân viên hiện riêng trong từng ca họ làm được, bằng Biệt danh, không bao giờ gộp thành con số; người chưa đăng ký hiện kiểu nét đứt vì được tính là rảnh. Rê chuột (máy tính) hoặc chạm (điện thoại) để xem họ tên và chi tiết.
- **Xếp người:** chọn người cho từng ca, chưa cần gán vị trí, để đủ số người mỗi ca và cân bằng số ca giữa các nhân viên. Nút **Thêm** trong từng ô ca để xếp người không đăng ký ca đó.
- **Gán vị trí:** bấm vào một người để mở bảng bên cạnh lịch, chọn một hay nhiều ca trong ngày và gán vị trí. **Màu thể hiện vị trí.**
- Bên dưới lịch là **danh sách theo ngày**: ai đăng ký ca nào, ai chưa đăng ký, ai không làm được ngày đó, và ai đã có ca.
- Bảng theo dõi độ phủ nhân sự: ca nào đủ người, ca nào thiếu, nhu cầu nào chưa ai đăng ký.

*Trung tâm điều hành* — màn hình gom mọi việc đang chờ quyết định về một chỗ — có ở Giai đoạn 2. Trong Giai đoạn 1, việc chờ xử lý hiện ngay trên màn hình tương ứng.

**4. Chấm công, tính lương & thưởng** — Tính lương tự động theo giờ đã xếp ca, cùng cơ chế thưởng chuyên cần theo tuần và theo chuỗi 4 tuần (Giai đoạn 2). Chấm công tự động ở Giai đoạn 3.

### 3.4 Vị trí công việc

Mỗi ca làm việc gắn với một hoặc nhiều vị trí. **Bảy vị trí** được cấu hình cho phiên bản đầu, một số có vị trí con (khu vực trong vị trí) hoặc thuộc tính (việc làm thêm kèm vị trí):

| Vị trí | Vị trí con | Thuộc tính |
|---|---|---|
| QC *(kiểm tra chất lượng đồ uống sau khi pha)* | Trong, Ngoài | — |
| Thu Ngân – Offline | — | — |
| Thu Ngân – Online | — | — |
| Pha chế | Trà sữa, Matcha, Trà, Bồn | — |
| Phục vụ | — | Bưng bàn |
| Kiểm tra đơn | — | — |
| Bếp | — | — |

Thu Ngân Online và Offline là **hai vị trí riêng biệt**, mỗi vị trí có nhu cầu nhân sự và mức lương mặc định riêng. Nhu cầu nhân sự, lương mặc định và kinh nghiệm **chỉ tính theo vị trí**; vị trí con và thuộc tính chỉ để mô tả, không bắt buộc và được chọn nhiều. Nhãn hiển thị dạng "Pha chế - Matcha, Trà" hoặc "Phục vụ - Bưng bàn".

Hồ sơ mỗi nhân viên ghi các vị trí họ có kinh nghiệm. Đây là thông tin **hỗ trợ xếp ca, không phải giới hạn**: Quý khách vẫn có thể phân công bất kỳ ai vào bất kỳ vị trí nào, hệ thống chỉ đánh dấu để Quý khách nhìn thấy chứ không chặn.

### 3.5 Quy tắc lương và thưởng

**Lương tính theo giờ đã xếp ca** trên lịch, không theo giờ quẹt thẻ. Nhân viên đến sớm không được tính thêm giờ, vì lịch phân công mới là căn cứ xác định số tiền phải trả.

**Kỳ lương: Thứ Hai đến Chủ Nhật, trả vào Thứ Hai tuần kế tiếp.**

**Thưởng chuyên cần tuần — 100.000đ**, khi đồng thời thỏa mãn: có ít nhất **5 ngày làm từ 8 giờ trở lên**, và **không có lỗi đi trễ nào trong cả tuần**.

**Thưởng chuỗi — 200.000đ**, khi đạt thưởng tuần **4 tuần liên tiếp**, trả cùng tuần thứ tư (tổng 300.000đ tuần đó). Sau khi trả, bộ đếm về 0 và bắt đầu lại, nên thưởng chuỗi lặp lại đều đặn.

**Quy tắc đi trễ:**

| Số phút trễ | Mất thưởng tuần | Trừ vào lương tuần |
|---|---|---|
| 0 – 10 phút | Không | Không |
| 11 – 15 phút | **Có** | Không |
| Từ phút thứ 16 | Có | **Gấp đôi số phút trễ** |

Ví dụ: trễ 20 phút → bị trừ 40 phút lương. Trễ 12 phút → mất 100.000đ thưởng nhưng không bị trừ lương.

Các ca liền nhau của cùng một người trong một ngày, cùng vị trí, được tính là **một ca**. Ví dụ: làm 11:00–15:00 và đến lúc 12:00 (trễ 60 phút) thì bị trừ 120 phút lương, đúng như Quý khách đã xác nhận ngày 28/09.

**Cơ chế bảo vệ:** khi số phút bị trừ chạm hoặc vượt độ dài của ca đó, hệ thống **không tự động trừ và không tính lỗi đi trễ**, mà đưa ca đó lên danh sách tạm giữ để Quý khách xem xét. Lý do: mức trễ lớn như vậy thường là lỗi ghi nhận hơn là giờ đến thật, và hệ thống không nên tự phạt một sự cố kỹ thuật.

**Ở Giai đoạn 1**, hệ thống áp dụng đầy đủ bảng trên để ghi nhận và phân loại mỗi lượt đi trễ, nhưng **chỉ hiển thị số phút và trạng thái** (đúng giờ / tính đi trễ / trừ N phút / tạm giữ) — chưa quy ra tiền, chưa trừ lương và chưa chốt thưởng. Việc quy đổi, trừ lương và chốt thưởng bắt đầu từ Giai đoạn 2, dựa trên chính các lượt đã ghi nhận từ Giai đoạn 1.

### 3.6 Dùng trên điện thoại và máy tính

**Không có chức năng nào chỉ chạy được trên một loại thiết bị.** Khác biệt giữa điện thoại và máy tính là ở tần suất sử dụng, không phải ở khả năng.

**Toàn bộ màn hình của Giai đoạn 1 đều có bố cục riêng cho điện thoại**, đã có trong bản mẫu Quý khách xem:
- **Lịch tuần** hiện từng ngày một, vẫn thấy từng người bằng Biệt danh; bảng xếp người và gán vị trí mở từ dưới lên; nút Thêm có trong từng ca — Quý khách **xếp được lịch cả tuần ngay trên điện thoại**
- **Độ phủ nhân sự** thành thẻ theo từng ca; **danh sách theo ngày** thành thẻ theo từng nhân viên
- **Ghi nhận đi trễ** và xử lý trường hợp tạm giữ ngay lúc nhìn thấy
- **Sửa, hủy ca, đổi ca, rút ngắn ca và giao người thay**, ghi chú vào ca
- **Danh sách nhân viên và nhật ký thay đổi** thành dạng thẻ

Các màn hình của Giai đoạn 2 — trung tâm điều hành, hộp thư thông báo, màn hình chốt tuần, bảng lương — cũng được thiết kế riêng cho điện thoại khi xây dựng.

**Về phía nhân viên**, chiều ngược lại cũng đúng: nhân viên dùng điện thoại là chính, nhưng vẫn đăng ký ca rảnh và xem lịch, lương tạm tính được trên trình duyệt máy tính — để một chiếc điện thoại hỏng không khiến ai mất ca.

**Về thông báo đẩy (Giai đoạn 2):** trên iPhone, thông báo chỉ hoạt động khi ứng dụng đã được cài vào màn hình chính. Điều này áp dụng cho **cả Quý khách**, không riêng nhân viên. Trên máy tính, Chrome và Edge gửi thông báo bình thường; riêng Safari trên máy Mac cần thêm bước "Add to Dock". Hướng dẫn cài đặt và kiểm thử thông báo trên điện thoại thật được làm trước khi ký Giai đoạn 2.

### 3.7 Vì sao cần xây riêng thay vì mua phần mềm có sẵn

Sáu đặc điểm sau, khi kết hợp lại, không có phần mềm chấm công – nhân sự phổ thông nào đáp ứng được:

1. Năm ca cố định, và đăng ký là **ca rảnh** chứ không phải nhận ca
2. Phân công theo **khung giờ tùy ý**, không cần trùng biên ca
3. Một ca có thể mang **nhiều vị trí**, vị trí chính quyết định mức lương
4. Thưởng chuyên cần 100.000đ/tuần cộng thưởng chuỗi 200.000đ/4 tuần, **tính lại hồi tố** khi Quý khách miễn một lỗi đi trễ
5. Lương theo **giờ đã xếp ca**, không theo giờ quẹt thẻ
6. Thiết kế **lấy Zalo làm trung tâm trao đổi**, không có quy trình duyệt trong ứng dụng

Từng điểm riêng lẻ có thể lách được. Cả sáu điểm cùng lúc thì phải xây riêng.

---

## 4. LỘ TRÌNH TRIỂN KHAI

### Giai đoạn 0 — Chốt quy tắc và chuẩn bị · **2 tuần**

Chưa lập trình. Phần lớn công việc khảo sát ban đầu **đã hoàn thành** qua bản mẫu tương tác (18/09 – 28/09): dựng lịch tổng hợp với dữ liệu 40 nhân viên, Quý khách xem và góp ý, chạy thử quy trình từ đăng ký đến ghi nhận đi trễ. Bản mẫu đã duyệt là bản vẽ tham chiếu cho toàn bộ màn hình Giai đoạn 1, nên không cần vẽ lại wireframe cho giai đoạn này.

Phần còn lại:

| Tuần | Công việc |
|---|---|
| 1 | Quý khách xác nhận **tám quy tắc đề xuất** phát sinh khi làm bản mẫu (xem mục 10) và cách hiển thị lương tạm tính |
| 1–2 | Chọn công nghệ, chuẩn bị hạ tầng, môi trường phát triển, cơ chế sao lưu và diễn tập phục hồi dữ liệu |
| 2 | Hợp đồng và phạm vi Giai đoạn 1, thời gian phản hồi hỗ trợ |

Kiểm thử thông báo đẩy trên điện thoại thật được dời sang trước Giai đoạn 2, cùng lúc với phần thông báo.

**Bàn giao:** Danh sách quy tắc đã chốt · Tài liệu yêu cầu cập nhật · Môi trường sẵn sàng và biên bản diễn tập phục hồi · Hợp đồng và phạm vi Giai đoạn 1.

---

### Giai đoạn 1 — Đăng ký ca, Xếp lịch & Ghi nhận đi trễ · **20 tuần**

Đây là giai đoạn giải quyết vấn đề số 1 của Quý khách: xóa bỏ nút thắt xếp ca hàng tuần trên Zalo, và bắt đầu tích lũy dữ liệu đi trễ để Giai đoạn 2 có cơ sở tính lương và thưởng.

| Sprint | Tuần | Quý khách nhìn thấy được gì |
|---|---|---|
| 1 | 1–2 | Tạo tài khoản nhân viên có Biệt danh; nhân viên đó đăng nhập được trên điện thoại |
| 2 | 3–4 | Quý khách tự chỉnh lương mặc định theo vị trí, các ca, cửa sổ đăng ký, danh mục vị trí mà không cần cập nhật phần mềm |
| 3 | 5–6 | Nhân viên đăng ký ca rảnh cả tuần trên điện thoại hoặc máy tính; hệ thống tự khóa đúng giờ cutoff |
| 4 | 7–8 | **Quý khách thấy ai đăng ký ca nào cho cả tuần trên lịch tuần**, trên máy tính và điện thoại, lọc được theo nhân viên |
| 5 | 9–10 | Quý khách xếp người cho cả tuần: bảng bên cạnh lịch, nút Thêm, danh sách theo ngày |
| 6 | 11–12 | Quý khách gán vị trí, vị trí con; bảng độ phủ theo vị trí; một tuần nháp hoàn chỉnh |
| 7 | 13–14 | **Toàn bộ vòng xếp lịch chạy thông từ đầu đến cuối** — công bố lịch, nhân viên xem được lịch của mình, sửa/đổi/hủy/rút ngắn ca sau khi công bố |
| 8 | 15–16 | **Quý khách ghi nhận một lượt đi trễ ngay trên điện thoại tại quầy, hệ thống phân loại theo quy tắc**; nhân viên xem được lương tạm tính của mình |
| 9 | 17–18 | Kiểm thử toàn diện trên điện thoại thật và máy tính; nhập dữ liệu nhân sự; tài liệu đào tạo |
| Chạy thử | 19–20 | Chạy thử với 8–10 nhân viên song song Zalo một chu kỳ, sau đó triển khai toàn bộ |

**Phạm vi Giai đoạn 1:**
- Quản lý tài khoản, vai trò, **Biệt danh**, vị trí có kinh nghiệm, mức lương, vô hiệu hóa nhân viên nghỉ việc; đặt mật khẩu ngay trong hồ sơ nhân viên
- Quý khách tự chỉnh **lương mặc định theo vị trí, các ca trong ngày, cửa sổ đăng ký, danh mục vị trí (kể cả vị trí con) và lý do bỏ qua**
- Nhật ký thay đổi đầy đủ (ai, lúc nào, giá trị cũ, giá trị mới, lý do)
- Đăng ký ca rảnh trên điện thoại và máy tính, có cảnh báo khi dưới kỳ vọng hợp đồng (5 ngày × 8 giờ) nhưng **không chặn**
- Nhân viên **không đăng ký gì** được hiểu là **rảnh toàn bộ tuần** — ai có ràng buộc phải đăng ký rõ
- Đặt nhu cầu nhân sự theo ca và vị trí; bảng độ phủ trước và sau khi xếp ca
- **Một lịch tuần** cho cả xem đăng ký lẫn xếp lịch: từng người hiện bằng Biệt danh, màu theo vị trí, lọc được theo bất kỳ tổ hợp nhân viên nào; xếp người trước rồi gán vị trí sau, qua bảng bên cạnh lịch; nút Thêm trong từng ô ca; **danh sách theo ngày** bên dưới lịch
- Xếp ca theo khung giờ tùy ý, nhiều vị trí trên một ca, vị trí con và thuộc tính; đánh dấu khi xếp ngoài ca rảnh hoặc ngoài vị trí có kinh nghiệm; không cho một người có hai ca trùng giờ
- Đổi ca giữa hai nhân viên bằng một thao tác; rút ngắn ca và giao người thay trong cùng một thao tác
- Lịch ở trạng thái nháp, nhân viên **không nhìn thấy** cho đến khi Quý khách công bố
- **Chốt chặn khi công bố:** hệ thống liệt kê nhân viên đang làm việc mà chưa có ca nào, và các ca chưa có vị trí; Quý khách xếp ca, gán vị trí hoặc đánh dấu "Bỏ qua tuần này" kèm lý do
- Nhân viên xem lịch cá nhân của riêng mình, chỉ đọc
- Ghi nhận đi trễ: Quý khách nhập giờ đến thực tế, **ghi được ngay trên điện thoại khi đang ở quầy**. Hệ thống áp dụng đầy đủ quy tắc 10 phút ân hạn, tính đi trễ từ phút 11, trừ gấp đôi số phút từ phút 16 (**tính bằng phút, chưa quy ra tiền**), và tách riêng trường hợp tạm giữ để Quý khách xem xét; xem trước ảnh hưởng tới thưởng tuần (chỉ để tham khảo)
- **Lương tạm tính** = số giờ đã xếp ca × lương giờ, cho Quý khách xem từng người và cho mỗi nhân viên xem của chính mình
- Nhân viên xem được mọi lượt đi trễ đã ghi nhận với mình và hệ quả kèm theo
- **Dùng đầy đủ trên điện thoại và máy tính** cho mọi màn hình trên
- Giao diện song ngữ Tiếng Việt / English

**Giai đoạn 1 chưa bao gồm — sẽ có ở Giai đoạn 2:**

| Chưa có | Ảnh hưởng thực tế đến Quý khách |
|---|---|
| **Thông báo tự động** (mở/đóng cửa sổ đăng ký, công bố lịch, thay đổi ca, ghi nhận đi trễ, ca thiếu người) | Quý khách vẫn thông báo cho đội ngũ trên Zalo như hiện nay. Hai việc cần đưa vào thói quen hàng tuần: **trước 15:00 Thứ Bảy, xem ai chưa đăng ký và nhắn nhắc họ trên Zalo**; và khi ghi nhận một lượt đi trễ, báo cho nhân viên đó ngay trong ngày |
| **Trung tâm điều hành** | Các việc đang chờ xử lý vẫn hiện ra, nhưng nằm trên từng màn hình tương ứng chứ chưa gom về một chỗ |
| **Tính lương, trừ tiền đi trễ và chốt thưởng** | Hệ thống ghi nhận và phân loại đi trễ bằng số phút (ví dụ: trễ 20 phút → trừ 40 phút) và hiển thị lương tạm tính theo giờ đã xếp, nhưng **chưa quy ra tiền, chưa trừ vào lương và chưa chốt thưởng**. Quý khách vẫn tự tính lương như hiện nay cho đến khi Giai đoạn 2 hoàn thành |

Vì sao vẫn giữ ghi nhận đi trễ ở Giai đoạn 1 dù chưa có bảng lương: mỗi lượt ghi nhận đều được tích lũy từ ngày đầu, nên khi Giai đoạn 2 hoàn thành, hệ thống tính lương và thưởng đã có sẵn lịch sử thật để chạy thay vì bắt đầu từ con số không.

**Nghiệm thu Giai đoạn 1:** Hai tuần liên tiếp xếp lịch hoàn toàn trên hệ thống, không cần tổng hợp trên Zalo · Nhật ký thay đổi đầy đủ cho mọi thay đổi trong kỳ chạy thử · Quý khách tự xếp xong một tuần trong dưới 60 phút · Quý khách ghi nhận một lượt đi trễ trên điện thoại và kết quả phân loại, số phút hệ thống đưa ra khớp với bảng quy tắc ở mục 3.5 khi đối chiếu tay · Mọi màn hình chạy đúng trên điện thoại thật và máy tính · Tám quy tắc đề xuất đã được Quý khách xác nhận hoặc để ở dạng chỉnh được.

---

### Giai đoạn 2 — Thông báo, Trung tâm điều hành, Tính lương & Thưởng · **14 tuần**

Bắt đầu sau khi Giai đoạn 1 đã chạy ổn định ít nhất **3 tuần thực tế**. Xây phần lương trên một mô hình lịch chưa ổn định là làm hai lần.

**Trước khi ký Giai đoạn 2:** kiểm thử thông báo đẩy trên **điện thoại thật của nhân viên**, đặc biệt là iPhone, và trên điện thoại, trình duyệt của Quý khách. Nếu không đạt, thiết kế được điều chỉnh trước khi chốt phạm vi và chi phí.

Giai đoạn 2 bổ sung bốn nhóm: **thông báo tự động** (bao gồm hướng dẫn cài ứng dụng vào màn hình chính và lời nhắc trước giờ đóng cửa sổ đăng ký gửi riêng cho người chưa đăng ký), **trung tâm điều hành**, **tính lương và thưởng chuyên cần**, và **báo cáo hiệu suất**. Mọi màn hình mới của Giai đoạn 2 đều có bố cục riêng cho điện thoại.

> **Một mốc thời gian cần thống nhất trước Giai đoạn 2:** ngày Quý khách ngừng dùng Zalo để xếp ca. Trong Giai đoạn 1, việc nhắc nhân viên chưa đăng ký được làm thủ công trên Zalo — cách này chỉ hoạt động khi Zalo vẫn còn được dùng. Giai đoạn 2 cần hoàn thành trước mốc đó.

| Sprint | Tuần | Nội dung |
|---|---|---|
| 10 | 1–2 | Thông báo đẩy và hộp thư thông báo; hướng dẫn cài ứng dụng; mọi loại thông báo, kể cả lời nhắc người chưa đăng ký |
| 11 | 3–4 | Tính lương theo giờ đã xếp ca (thay cho lương tạm tính); xác định mức lương theo nhân viên hoặc theo vị trí chính; ngày lễ và ngày đặc biệt có hệ số nhân; quy đổi và trừ các lượt đi trễ đã ghi nhận từ Giai đoạn 1 |
| 12 | 5–6 | Bộ máy thưởng tuần và thưởng chuỗi; tính lại hồi tố khi miễn lỗi đi trễ |
| 13 | 7–8 | Màn hình chốt tuần; xuất bảng lương ra Excel/CSV; tách lương cơ bản và thưởng |
| 14 | 9–10 | Báo cáo hiệu suất cho Quý khách và cho nhân viên; chính sách lưu trữ dữ liệu |
| 15 | 11–12 | Trung tâm điều hành; hộp thư và trung tâm điều hành trên điện thoại; kiểm thử toàn diện |
| Chạy song song | 13–14 | Hệ thống tính lương song song với cách tính thủ công của Quý khách trong 2 tuần |

**Điểm quan trọng về màn hình chốt tuần.** Tuần kết thúc 23:00 Chủ Nhật và trả lương Thứ Hai, nghĩa là Quý khách chỉ có khoảng một buổi tối để đối chiếu ~40 nhân viên, 52 lần mỗi năm. Vì vậy màn hình chốt tuần được thiết kế theo nguyên tắc: **một tuần sạch chốt bằng một thao tác duy nhất**. Toàn bộ trường hợp rõ ràng được chọn sẵn và xác nhận hàng loạt; chỉ những nhân viên còn vướng trường hợp tạm giữ mới tách ra, đưa lên đầu danh sách kèm lý do đang vướng.

Đây là ràng buộc thiết kế bắt buộc, không phải sở thích. Một màn hình bắt xác nhận từng người sẽ tái tạo đúng cái nút thắt thủ công mà hệ thống sinh ra để xóa bỏ.

**Lương cơ bản luôn được giải phóng đúng hạn.** Chỉ phần **thưởng** mới bị giữ lại khi tuần đó còn trường hợp tạm giữ chưa xử lý — và được trả bù ở kỳ sau ngay khi Quý khách xử lý xong.

**Nghiệm thu Giai đoạn 2:** Hai tuần liên tiếp số liệu hệ thống khớp 100% với cách tính thủ công · Chốt một tuần sạch trong dưới 10 phút · Miễn một lỗi đi trễ khôi phục đúng thưởng tuần và tính lại đúng chuỗi · File xuất mở đúng trên máy Quý khách.

**Hệ thống sẽ không tự động trả lương.** Hệ thống tính toán và trình bày; Quý khách xác nhận và chi trả. Trách nhiệm về tính đúng đắn của khoản chi vẫn thuộc về Quý khách.

---

### Giai đoạn 3 — Chấm công tự động · **6 tuần** *(có điều kiện)*

Nhân viên quẹt vào ca bằng cách **quét mã QR hoặc nhập mã 6 số** hiển thị trên một thiết bị chuyên dụng đặt tại cửa hàng, mã đổi mới mỗi 30 giây. Việc quẹt chỉ thành công khi đồng thời: mã còn hiệu lực (chứng minh **thời điểm**) **và** có tín hiệu xác nhận nhân viên đang có mặt tại cửa hàng (chứng minh **địa điểm**).

Hai yếu tố này bắt buộc phải có cả hai. Mã đơn lẻ có thể bị chụp màn hình gửi qua Zalo; tín hiệu vị trí đơn lẻ có thể bị dùng bởi người chưa vào ca. Kết hợp lại thì khó qua mặt hơn nhiều so với từng yếu tố riêng.

**Không có thao tác quẹt ra.** Bộ đếm tự dừng ở giờ kết thúc ca đã xếp. Nhân viên chỉ làm một thao tác duy nhất cho mỗi ca.

> **Giai đoạn này chưa thể chốt ngày bắt đầu.** Quý khách chưa quyết định cơ chế xác nhận có mặt sẽ dùng (wifi cửa hàng, thẻ NFC, thiết bị Bluetooth, hay GPS). Chi phí và thời gian nêu trên là **tạm tính** và sẽ được báo giá chính thức sau khi Quý khách chốt.
>
> **Giai đoạn 1 và 2 hoàn chỉnh và sử dụng được đầy đủ mà không cần Giai đoạn 3.** Trong thời gian chưa có chấm công tự động, Quý khách ghi nhận đi trễ thủ công, và **không một quy tắc nào phía sau thay đổi** — chỉ nguồn của mốc thời gian là khác. Khi có chấm công tự động, hệ thống chuyển sang lấy dữ liệu từ máy chấm công, còn nhập tay quay về đúng vai trò của nó: sửa một bản ghi sai hoặc thiếu.

**Điều cần biết về cách làm tạm thời:** hệ thống mặc định mọi người đúng giờ trừ khi Quý khách ghi nhận khác đi. Một lần đến trễ không ai để ý sẽ không tạo ra khoản phạt nào và không ảnh hưởng đến thưởng. Tương tự, một buổi vắng mặt không được ghi nhận vẫn được tính vào thưởng, cho đến khi Quý khách hủy hoặc rút ngắn ca đó trên lịch. Đây là hạn chế đã được thống nhất chấp nhận, và tự động được giải quyết ở Giai đoạn 3.

---

## 5. TRIỂN KHAI VÀ ĐÀO TẠO

Với đội ngũ khoảng 40 nhân viên đang quen dùng Zalo, **mức độ chấp nhận của nhân viên là rủi ro lớn nhất của dự án — lớn hơn phần kỹ thuật.** Kế hoạch triển khai vì vậy được thiết kế xoay quanh điều đó:

1. **Quý khách trước tiên.** Quý khách được đào tạo và tự xếp trọn một tuần trên hệ thống trước khi bất kỳ nhân viên nào nhìn thấy nó. **Cài ứng dụng lên điện thoại của Quý khách ngay trong buổi đó** — ở Giai đoạn 1 Quý khách ghi nhận đi trễ và sửa ca từ điện thoại; từ Giai đoạn 2, điện thoại còn nhận thông báo về ca thiếu người hay trường hợp tạm giữ.
2. **Nhóm chạy thử 8–10 người** trong một chu kỳ đầy đủ, song song với Zalo. Chọn đủ các loại điện thoại, bao gồm cả iPhone đời cũ nhất trong đội.
3. **Hướng dẫn trực tiếp bằng tiếng Việt** vào giờ giao ca. Cài ứng dụng vào màn hình chính **cùng với từng người, trên máy của họ** — không gửi hướng dẫn rồi hy vọng. Quyền nhận thông báo được bật ở đợt hướng dẫn khi Giai đoạn 2 ra mắt.
4. **Tờ hướng dẫn một trang bằng tiếng Việt**, dán tại cửa hàng và ghim trong nhóm Zalo: cửa sổ đăng ký Thứ Năm 00:00 – Thứ Bảy 15:00, nút "Chọn tất cả ca", và quy tắc không đăng ký được hiểu là rảnh toàn bộ.
5. **Một ngày chuyển đổi dứt khoát** sau chu kỳ chạy thử. Duy trì hai kênh song song vô thời hạn sẽ khiến không kênh nào được tin dùng.
6. **Hai tuần hỗ trợ tăng cường** sau mỗi lần đưa vào sử dụng, với thời gian phản hồi cam kết.

---

## 6. CHI PHÍ ĐẦU TƯ

### 6.1 Chi phí xây dựng

| Giai đoạn | Nội dung | Thời gian | Chi phí |
|---|---|---|---|
| **Giai đoạn 0** | Chốt quy tắc còn chờ, chuẩn bị hạ tầng, ký hợp đồng | 2 tuần | **15.000.000đ** |
| **Giai đoạn 1** | Đăng ký ca, xếp lịch & ghi nhận đi trễ | 20 tuần | **370.000.000đ** |
| **Giai đoạn 2** | Thông báo, trung tâm điều hành, tính lương & thưởng | 14 tuần | **285.000.000đ** |
| **Giai đoạn 3** *(tạm tính)* | Chấm công tự động | 6 tuần | **130.000.000đ** |

**Chi phí Giai đoạn 0 được khấu trừ toàn bộ vào Giai đoạn 1** nếu Quý khách quyết định tiếp tục.

**Tổng đầu tư Giai đoạn 0 + 1 + 2: 655.000.000đ** *(15.000.000đ + 355.000.000đ còn lại của Giai đoạn 1 + 285.000.000đ)*
**Tổng đầu tư cả 3 giai đoạn: 785.000.000đ** *(Giai đoạn 3 là tạm tính)*

*Giá chưa bao gồm thuế GTGT.*

**Vì sao chi phí thay đổi so với phiên bản 2.0 (08/09):**

| Thay đổi | Ảnh hưởng |
|---|---|
| Giai đoạn 1 thêm: một lịch tuần gộp xem đăng ký và xếp lịch, bảng bên cạnh lịch, nút Thêm, danh sách theo ngày, bộ lọc nhân viên, Biệt danh, vị trí QC và vị trí con, chặn trùng giờ, chốt chặn ca chưa có vị trí, xem trước thưởng, lương tạm tính | Tăng |
| Giai đoạn 1 thêm: dùng đầy đủ trên điện thoại cho mọi màn hình (trước đây một phần để sang Giai đoạn 2), kèm kiểm thử hai bố cục trên thiết bị thật | Tăng |
| Giai đoạn 1 thêm: Quý khách tự chỉnh các ca, cửa sổ đăng ký, danh mục vị trí, lý do bỏ qua, lương mặc định theo vị trí (trước đây phải cập nhật phần mềm) | Tăng |
| Hướng dẫn cài ứng dụng và kiểm thử thông báo đẩy chuyển sang Giai đoạn 2, cùng phần thông báo | Giảm ở GĐ0/GĐ1, tăng nhẹ ở GĐ2 |
| Phần điện thoại của Giai đoạn 2 nhỏ lại vì đã làm ở Giai đoạn 1 | Giảm ở GĐ2 |
| Giai đoạn 0 rút gọn vì bản mẫu đã hoàn thành phần khảo sát và thiết kế | Giảm |

*Ghi chú: phiên bản 2.0 ghi tổng Giai đoạn 0 + 1 + 2 là 580.000.000đ, tức là chưa trừ 30.000.000đ Giai đoạn 0 dù có ghi "đã khấu trừ". Nếu trừ đúng thì tổng là 550.000.000đ. Phiên bản này ghi tổng sau khấu trừ.*

### 6.2 Chi phí vận hành định kỳ

| Khoản mục | Chi phí | Áp dụng từ |
|---|---|---|
| Bảo trì & hỗ trợ kỹ thuật | **5.000.000đ/tháng** | Sau khi Giai đoạn 1 đưa vào sử dụng |
| Bảo trì & hỗ trợ kỹ thuật *(có phân hệ lương)* | **9.000.000đ/tháng** | Sau khi Giai đoạn 2 đưa vào sử dụng |
| Hạ tầng máy chủ & lưu trữ | Theo chi phí thực tế + 20% *(ước tính 1.500.000 – 3.000.000đ/tháng)* | Từ khi đưa vào sử dụng |

**Bảo trì bao gồm:** sửa lỗi, cập nhật bảo mật, theo dõi vận hành, sao lưu, hỗ trợ qua Zalo/điện thoại trong giờ hành chính với thời gian phản hồi ghi trong hợp đồng, và tối đa 4 giờ điều chỉnh nhỏ mỗi tháng.

**Bảo trì không bao gồm:** tính năng mới hoặc thay đổi ngoài phạm vi đã ký. Các yêu cầu này được báo giá riêng theo mức **2.500.000đ/ngày công**.

### 6.3 Chi phí thiết bị (Giai đoạn 3)

Thiết bị hiển thị mã QR đặt tại cửa hàng (máy tính bảng hoặc màn hình chuyên dụng, dùng riêng cho mục đích này) do Quý khách trang bị, ước tính 3.000.000 – 6.000.000đ. Chúng tôi tư vấn cấu hình phù hợp.

---

## 7. ĐIỀU KHOẢN THANH TOÁN

| Giai đoạn | Mốc thanh toán | Tỷ lệ | Số tiền |
|---|---|---|---|
| **Giai đoạn 0** | Khi ký | 100% | 15.000.000đ |
| **Giai đoạn 1** | Khi ký hợp đồng | 30% | 111.000.000đ *(thực trả 96.000.000đ sau khi khấu trừ Giai đoạn 0)* |
| | Nghiệm thu Sprint 4 *(lịch tuần: xem ai đăng ký)* | 25% | 92.500.000đ |
| | Nghiệm thu Sprint 7 *(vòng xếp lịch hoàn chỉnh)* | 25% | 92.500.000đ |
| | Nghiệm thu đưa vào sử dụng | 20% | 74.000.000đ |
| **Giai đoạn 2** | Khi ký hợp đồng | 30% | 85.500.000đ |
| | Nghiệm thu màn hình chốt tuần | 40% | 114.000.000đ |
| | Nghiệm thu sau kỳ chạy song song | 30% | 85.500.000đ |

Mỗi giai đoạn là một hợp đồng độc lập. Quý khách không có nghĩa vụ tiếp tục giai đoạn sau.

---

## 8. BẢO HÀNH

**Bảo hành 3 tháng** kể từ ngày nghiệm thu mỗi giai đoạn, áp dụng cho các lỗi so với tiêu chí nghiệm thu đã thống nhất. Trong thời gian bảo hành, việc sửa lỗi không tính phí.

Sau thời gian bảo hành, việc hỗ trợ được thực hiện theo hợp đồng bảo trì tại mục 6.2.

---

## 9. NGOÀI PHẠM VI

Những nội dung sau **không** nằm trong dự án. Chúng tôi liệt kê rõ để tránh hiểu nhầm về sau:

- Quản lý nghỉ phép, nghỉ ốm, nghỉ có kế hoạch — vẫn thỏa thuận trên Zalo, Quý khách phản ánh vào lịch
- Tích hợp với Zalo dưới mọi hình thức
- Nhiều chi nhánh / nhiều địa điểm
- Quy tắc làm thêm giờ (tổ chức của Quý khách không áp dụng làm thêm giờ)
- Tích hợp với phần mềm kế toán — file xuất phục vụ Quý khách tự đối chiếu
- Nhân viên tự đăng ký tài khoản hoặc tự đặt lại mật khẩu
- Quy trình nhân viên tự xin phép / xin duyệt / xin đổi ca trong ứng dụng *(việc đổi ca do Quý khách thực hiện trên lịch vẫn có, xem mục 4)*
- Theo dõi khiếu nại của nhân viên như một trạng thái trong hệ thống
- Ứng dụng tải từ App Store / CH Play *(có thể xem xét ở giai đoạn sau)*
- Báo cáo giờ làm thực tế tách biệt với giờ đã xếp ca *(cần cơ chế quẹt ra, thuộc Giai đoạn 3 trở đi)*

---

## 10. TRÁCH NHIỆM CỦA QUÝ KHÁCH

Để dự án đúng tiến độ, chúng tôi cần Quý khách:

1. **Xác nhận tám quy tắc đề xuất** phát sinh khi làm bản mẫu, trong Giai đoạn 0: cách đếm độ phủ khi ca bắt đầu giữa chừng; chặn một người có hai ca trùng giờ; bắt buộc có người thay khi về sớm hơn 30 phút; ca "không đi làm" tính 0 giờ và không tính lỗi đi trễ; xem trước ảnh hưởng tới thưởng ở màn đi trễ; đặt mật khẩu ngay trong hồ sơ nhân viên; lương mặc định theo vị trí chỉnh được trong ứng dụng; nhân viên thấy vị trí con trong lịch của mình. Chưa xác nhận thì các quy tắc này được làm ở dạng chỉnh được
2. **Quyết định các câu hỏi nghiệp vụ phát sinh** trong vòng 5 ngày làm việc kể từ khi nhận câu hỏi
3. **Cung cấp dữ liệu nhân sự**: danh sách nhân viên, vị trí có kinh nghiệm, mức lương từng người, nhu cầu nhân sự theo ca
4. **Cử người tham gia nghiệm thu** ở mỗi mốc, và tham gia đầy đủ buổi đào tạo dành cho Quản trị viên
5. **Chọn và huy động nhóm chạy thử** 8–10 nhân viên
6. **Thông báo chính thức với đội ngũ** rằng hệ thống là kênh xếp ca duy nhất kể từ ngày chuyển đổi
7. **Trước Giai đoạn 2:** cho biết Quý khách dùng điện thoại và trình duyệt nào, cung cấp 5–8 điện thoại nhân viên để kiểm thử thông báo đẩy, và chốt ngày ngừng dùng Zalo để xếp ca
8. **Thực hiện đối chiếu lương thủ công song song** trong 2 tuần của Giai đoạn 2
9. **Chốt cơ chế xác nhận có mặt** trước khi bắt đầu Giai đoạn 3
10. **Trang bị thiết bị hiển thị mã** tại cửa hàng cho Giai đoạn 3

Chậm trễ ở các mục trên sẽ kéo dài tiến độ tương ứng.

---

## 11. RỦI RO VÀ GIẢ ĐỊNH

Chúng tôi nêu thẳng những điểm chưa chắc chắn, thay vì để Quý khách phát hiện ở giữa dự án.

| Rủi ro | Cách xử lý |
|---|---|
| **Nhân viên quên đăng ký và bị xếp ca không làm được.** Ở Giai đoạn 1 chưa có lời nhắc tự động. | Hệ thống phân biệt rõ ai đăng ký thật và ai chỉ im lặng, để Quý khách nhắn nhắc trên Zalo trước 15:00 Thứ Bảy. Tự động hóa hoàn toàn ở Giai đoạn 2. |
| **Nhân viên không dùng hệ thống, Quý khách vẫn phải xếp ca trên Zalo.** Đây là rủi ro lớn nhất của dự án. | Chạy thử nhóm nhỏ trước; đào tạo trực tiếp bằng tiếng Việt; Quý khách công bố ngày chuyển đổi dứt khoát; hệ thống thiết kế sao cho người không đăng ký vẫn được hiểu là rảnh, không tạo lỗ hổng dữ liệu |
| **Lương tạm tính ở Giai đoạn 1 bị hiểu nhầm là bảng lương chính thức.** | Con số luôn ghi rõ là tạm tính, chưa trừ đi trễ và chưa có thưởng; nêu rõ trong hợp đồng và trong buổi nghiệm thu |
| **Thông báo đẩy trên iPhone không ổn định.** iOS chỉ hỗ trợ thông báo đẩy cho ứng dụng đã cài vào màn hình chính. | Kiểm thử trên điện thoại thật của nhân viên **trước khi ký Giai đoạn 2**. Nếu không đạt, thiết kế được điều chỉnh trước khi chốt phạm vi và chi phí |
| **Lịch tuần chậm trên điện thoại cũ khi hiển thị 40 nhân viên.** Cách hiển thị đã được Quý khách duyệt qua bản mẫu (27–28/09). | Đo tốc độ trên chiếc điện thoại cũ nhất trong đội ngay từ Sprint 4, không đợi đến cuối |
| **Tám quy tắc đề xuất bị điều chỉnh sau khi đã làm.** | Làm ở dạng chỉnh được; xin xác nhận ngay trong Giai đoạn 0 |
| **Tranh chấp về lương sau khi đưa vào sử dụng.** | Chạy song song 2 tuần trước khi trả lương từ hệ thống; lương cơ bản luôn giải phóng đúng hạn; mọi con số đều truy vết được về nguồn |
| **Cơ chế xác nhận có mặt chưa được chốt.** | Giai đoạn 3 được tách hoàn toàn. Giai đoạn 1 và 2 hoàn chỉnh mà không cần nó |
| **Phát sinh yêu cầu ngoài phạm vi.** Phạm vi Giai đoạn 1 đã tăng qua các lần góp ý trên bản mẫu; phần tăng này đã tính vào chi phí ở phiên bản này. | Phạm vi từng giai đoạn được đính kèm hợp đồng dưới dạng danh sách chức năng. Thay đổi sau khi ký được báo giá lại bằng văn bản |

---

## 12. BƯỚC TIẾP THEO

| # | Việc cần làm | Ai thực hiện |
|---|---|---|
| 1 | Quý khách xem xét và phản hồi tài liệu này | Quý khách |
| 2 | Họp trao đổi, làm rõ phạm vi và điều chỉnh nếu cần | Hai bên |
| 3 | Ký hợp đồng Giai đoạn 0 | Hai bên |
| 4 | Xác nhận tám quy tắc đề xuất và cách hiển thị lương tạm tính | Quý khách |
| 5 | Chuẩn bị hạ tầng, diễn tập phục hồi dữ liệu | Đơn vị thực hiện |
| 6 | Bàn giao tài liệu yêu cầu cập nhật và hợp đồng Giai đoạn 1 | Đơn vị thực hiện |

---

*Tài liệu này có hiệu lực báo giá trong 30 ngày kể từ ngày phát hành. Chi phí Giai đoạn 3 là tạm tính và sẽ được báo giá chính thức sau khi Quý khách chốt cơ chế xác nhận có mặt.*
