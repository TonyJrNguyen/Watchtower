# Rules proposed pending client confirmation

Bảy quy tắc dưới đây được quyết định trong lúc làm bản demo Phase 1, **không**
có trong PRD gốc do khách duyệt. Mỗi quy tắc đã được viết vào PRD (đánh dấu
*proposed pending client confirmation* ngay trong bảng requirement tương ứng),
và liệt kê lại ở đây làm danh sách chờ ký duyệt (§5.1, mục O3).

Khi implement, coi các mục này là **cấu hình được / có thể đổi**, không
hardcode cứng — vì khách có thể chỉnh khi ký duyệt.

| ID | Quy tắc | Vì sao chưa chắc | Ảnh hưởng nếu đổi |
|---|---|---|---|
| FR-O38 | Một assignment chỉ tính là "đủ" cho một CA nếu nó phủ trọn khung giờ CA đó; phủ một phần thì tính riêng | PRD chỉ nói assignment là khung giờ tự do, không nói cách đếm coverage | Thay đổi cách tính số liệu độ phủ (FR-O4) |
| FR-O39 | Chặn cứng, không cho một nhân viên có hai assignment trùng giờ trong ngày | PRD chỉ cấm overlap ở bước *đăng ký* (FR-S2), không nói gì ở bước *xếp ca* | Nếu bỏ, cần đổi thành cảnh báo thay vì chặn |
| FR-O20 (bổ sung) | Về sớm hơn 30 phút bắt buộc phải có người thay mới lưu được | §3.8 mô tả đây là quy trình, không nói hệ thống có ép hay không | Nếu bỏ, Chủ quán có thể lưu ca rút ngắn mà không cần người thay ngay |
| FR-T18 (bổ sung) | Xếp loại "không đi làm" = 0 giờ cho lương và cho phép tính 8 tiếng/ngày, không tính late penalty | PRD liệt kê "no-show" là một lựa chọn xử lý anomaly nhưng không nói nó đổi gì | Ảnh hưởng trực tiếp tới lương, cần khách xác nhận rõ |
| FR-B17 | Màn đi trễ hiển thị trước ảnh hưởng lên bonus tuần (chỉ xem, chưa xác nhận) | Không có trong PRD gốc, là bổ sung để hệ thống dễ hiểu hơn | Không ảnh hưởng tính toán, chỉ ảnh hưởng UI — rủi ro thấp nhất trong 7 mục |
| FR-A7 (bổ sung) | Đặt/đổi mật khẩu là một field trong hồ sơ nhân viên, không phải nút bấm sinh mật khẩu rời | Theo góp ý demo ngày 18/09 | Không ảnh hưởng logic nghiệp vụ, chỉ ảnh hưởng UI |
| FR-O40 | Lương mặc định theo từng vị trí sửa được trong app, không cố định trong code | FR-O28 gốc để cả bảng vị trí lẫn lương mặc định cố định trong code | Nếu bỏ, mỗi lần đổi lương vị trí phải deploy lại |

**Quy trình đóng mục:** khi khách xác nhận một mục, xoá dòng *proposed pending
client confirmation* khỏi PRD, xoá dòng tương ứng trong bảng trên, và ghi lại
quyết định vào phần Resolved của §5 trong PRD (theo đúng cách các mục G-series
cũ đã được resolve).
