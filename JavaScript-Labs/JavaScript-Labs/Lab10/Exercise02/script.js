/* Exercise 10.2 - Basic selectors */

// Bước 2: $('#id') chọn phần tử theo id; val() đọc/ghi giá trị của ô nhập
var msg = $('#msgArea');
msg.val("here is some new text");

// Bước 3: html() đọc/ghi nội dung HTML của phần tử.
// Lưu ý: tài liệu Lab dùng $('#first').html("new Title") -> sẽ GHI ĐÈ cả hàng #first (mất luôn textarea).
// Ở đây chọn #pageTitle để chỉ đổi tiêu đề, giữ nguyên các phần tử còn lại.
// $('#first').html("new Title");
$('#pageTitle').html("new Title");

// Bước 4: attr() đọc/ghi thuộc tính HTML
$('#msgArea').val("My class is " + $('#msgArea').attr("class"));

// Bước 5: chọn TẤT CẢ <button> - không cần vòng lặp, jQuery áp dụng cho cả tập hợp
var buttons = $('button');
buttons.css('background-color', 'red');

// Bước 6: đổi màu nền cho <body>
var temp = $('body');
temp.css("background-color", "ivory");

// Bước 7: addClass() thêm class (.selected có nền vàng trong lab10.css)
$('.center-icons').addClass('selected');
