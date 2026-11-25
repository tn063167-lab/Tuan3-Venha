# Prompt vibe code

Prompt mô tả yêu cầu để AI sinh ra ứng dụng này (có thể dùng lại để tạo hoặc chỉnh sửa).

## Prompt 1 – Giao diện và chức năng chính
```
Hãy viết web app "TODO App" quản lý task cá nhân bằng HTML, CSS, JavaScript thuần, không dùng thư viện.
Chức năng:
1) Trang chính có hai tab "Hôm nay" (chỉ hiện task có ngày thực hiện là hôm nay) và "Tất cả";
   có ô tìm kiếm theo tên/mô tả; bộ lọc theo trạng thái (todo/doing/done), mức ưu tiên (Cao/Trung bình/Thấp), danh mục.
2) Thêm, sửa, xóa task bằng form popup có kiểm tra dữ liệu; tick checkbox để đánh dấu hoàn thành.
3) Trang thống kê riêng: tổng số, hôm nay, đã hoàn thành, quá hạn, tỷ lệ hoàn thành (biểu đồ tròn SVG),
   thống kê theo trạng thái/danh mục/ưu tiên và biểu đồ cột 7 ngày tới.
4) Có 16 task mock, ngày tính theo hôm nay để luôn có task trong ngày.
Giao diện hiện đại, màu tím chủ đạo, responsive trên điện thoại, tiếng Việt.
```

## Prompt 2 – Phiên bản không có CSDL
```
Lưu dữ liệu bằng localStorage, lần đầu mở thì nạp dữ liệu mock. Tách riêng lớp lưu trữ (storage.js)
để sau này đổi sang CSDL mà không sửa giao diện.
```

## Prompt 3 – Phiên bản có CSDL
```
Viết server.py bằng thư viện chuẩn Python (http.server + sqlite3), có API REST: GET/POST /api/tasks,
PUT/DELETE /api/tasks/<id>, POST /api/seed, /api/clear. Tạo bảng tasks bằng schema.sql, tự nạp dữ liệu mẫu
ở lần chạy đầu. storage.js tự chọn API nếu có, nếu không thì dùng localStorage để vẫn chạy được trên GitHub Pages.
```

## Prompt 4 – Tài liệu
```
Viết README.md mô tả chức năng, cấu trúc thư mục, cách chạy hai chế độ, API và cách đưa lên GitHub Pages.
```
