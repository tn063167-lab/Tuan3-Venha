# JavaScript-Labs

> Chương 4 – JavaScript · Học phần **Phát triển ứng dụng TMĐT** (UEH)

## 1. Thông tin sinh viên

| Mục | Nội dung |
|---|---|
| Họ và tên | **Nguyễn Phúc Thảo Nguyên** |
| Mã số sinh viên | 31221023969 |
| Lớp học phần | 26C1INF50902701 |
| GitHub cá nhân | https://github.com/tn063167-lab |
| GitHub Repository | https://github.com/tn063167-lab/Tuan3-Venha |

## 2. Mục tiêu

Thực hiện đầy đủ 03 bài Lab để vận dụng JavaScript xây dựng các chức năng tương tác cho website:

1. **Lab 08 – JavaScript 1: Language Foundations** – nền tảng ngôn ngữ JavaScript.
2. **Lab 09 – JavaScript 2: DOM and Events** – thao tác DOM, xử lý sự kiện, kiểm tra form.
3. **Lab 10 – JavaScript 3: jQuery** – selectors, sự kiện, animation, GET request.

## 3. Truy cập sản phẩm (GitHub Pages)

Trang chủ: **https://tn063167-lab.github.io/Tuan3-Venha/JavaScript-Labs/**

| Lab | Liên kết |
|---|---|
| Lab 08 | https://tn063167-lab.github.io/Tuan3-Venha/JavaScript-Labs/Lab08/ |
| Lab 09 | https://tn063167-lab.github.io/Tuan3-Venha/JavaScript-Labs/Lab09/ |
| Lab 10 | https://tn063167-lab.github.io/Tuan3-Venha/JavaScript-Labs/Lab10/ |

**Hướng dẫn:** mở trang chủ → chọn bài Lab (nút *Vào Lab …*) → chọn Exercise trong danh sách. Mỗi trang Exercise có thanh điều hướng nhỏ ở góc dưới bên trái để quay lại danh sách Lab hoặc trang chủ.

## 4. Cấu trúc thư mục

```
JavaScript-Labs/
├── index.html                 # Trang chủ (portfolio cá nhân)
├── README.md
├── css/
│   ├── style.css              # Giao diện trang chủ và trang danh sách Exercise
│   └── lab-nav.css            # Thanh điều hướng nhỏ trong các trang Exercise
├── js/
│   └── main.js                # Tương tác trang chủ (tab, giỏ hàng mini, kiểm tra form, dark mode)
├── assets/
│   └── avatar.png             # Ảnh đại diện
├── Lab08/
│   ├── index.html             # Danh sách 12 Exercise
│   ├── assets/                # css, flags, images, travel-data.js
│   └── Exercise01 … Exercise12/   # mỗi thư mục: index.html + file JS tương ứng
├── Lab09/
│   ├── index.html             # Danh sách 8 Exercise
│   ├── assets/                # css, images
│   └── Exercise01 … Exercise08/
└── Lab10/
    ├── index.html             # Danh sách 10 Exercise
    ├── assets/                # css, images, jquery-3.1.1.min.js, data/cities.json
    └── Exercise01 … Exercise10/
```

## 5. Nội dung từng Lab

### Lab 08 – Language Foundations (Exercise 8.1 – 8.12)
8.1 Bật/tắt JavaScript · 8.2 Embedded JS · 8.3 External JS · 8.4 `noscript` · 8.5 Browser Console ·
8.6 String/Date/Math · 8.7 Arrays (lịch tháng) · 8.8 Functions · 8.9 Functions as objects ·
8.10 Tạo object · 8.11 Mảng object + cờ quốc gia · 8.12 Bài tổng hợp *Travel posts*.

### Lab 09 – DOM and Events (Exercise 9.1 – 9.8)
9.1 DOM selection · 9.2 DOM family · 9.3 Tạo/xoá node · 9.4 Event handling · 9.5 Load event ·
9.6 Debug event · 9.7 Form focus/blur · 9.8 Form validation.

### Lab 10 – jQuery (Exercise 10.1 – 10.10)
10.1 Cài đặt jQuery (CDN + dự phòng) · 10.2 Basic selectors · 10.3 Advanced selectors · 10.4 Listeners ·
10.5 Chèn phần tử DOM · 10.6 Fade/Slide · 10.7 Popup xem ảnh · 10.8 `animate()` · 10.9 GET request · 10.10 jqXHR.

## 6. Ghi chú kỹ thuật

- **jQuery** nạp từ CDN `code.jquery.com`; nếu lỗi, tự dùng bản dự phòng `Lab10/assets/js/jquery-3.1.1.min.js`.
- **Bootstrap 3 / Font Awesome 4** (Lab 08 Exercise 8.12, Lab 09 Exercise 9.1–9.3, 9.7–9.8, Lab 10 Exercise 10.1–10.3) nạp từ CDN (jsDelivr, cdnjs) – cần có Internet.
- **Exercise 10.9 / 10.10** gọi web service `https://www.randyconnolly.com/funwebdev/services/travel/cities.php`. Do GitHub Pages dùng HTTPS nên bắt buộc dùng `https://`. Nếu dịch vụ không truy cập được, trang tự đọc file dự phòng `Lab10/assets/data/cities.json` (cùng cấu trúc JSON). Cần chạy qua web server (GitHub Pages hoặc Live Server), không mở bằng `file://`.
- Hộp thoại `alert()` ở Exercise 8.2, 9.5, 9.6 là chủ ý theo đề bài.

## 7. Lịch sử cập nhật (gợi ý commit)

- `Complete Lab 08`
- `Complete Lab 09 DOM exercises`
- `Add Lab 10 jQuery exercises`
- `Update JavaScript Labs homepage`
