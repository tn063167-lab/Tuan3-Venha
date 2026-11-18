/* Exercise 10.3 - Advanced selectors */

// Bước 2: bộ chọn :password - tất cả ô nhập mật khẩu -> nền vàng
$(':password').css('background-color', 'yellow');

// Bước 4: :nth-child(4n) - mỗi phần tử con thứ 4 trong form -> nền vàng
$('form :nth-child(4n)').css('background-color', 'yellow');

// Bước 5: :contains("word") - các <label> có chứa chữ "word" -> chữ màu đen
$('label:contains("word")').css("color", "black");
