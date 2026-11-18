/* Exercise 9.1 - Basic DOM selection */

// Bước 2: getElementById() chọn <textarea> rồi gán value
var msg = document.getElementById("msgArea");
msg.value = "here is some text";

// Bước 3: innerHTML đọc/ghi toàn bộ HTML bên trong phần tử
var title = document.getElementById("pageTitle");
title.innerHTML = "New Title";

// Bước 4: viết gọn, không cần biến tạm
document.getElementById("pageTitle").innerHTML = "Even newer title";

// Bước 5: innerHTML của một phần tử trả về cả thẻ HTML bên trong
msg.value = document.getElementById("first").innerHTML;

// Bước 6: innerText chỉ trả về phần văn bản, đã bỏ thẻ HTML
msg.value = document.getElementById("first").innerText;

// Bước 7: getAttribute() đọc giá trị một thuộc tính
msg.value = "My class is " + msg.getAttribute("class");

// Bước 8: getElementsByTagName() trả về một tập (collection) các phần tử
var elem = document.getElementsByTagName("textarea");
elem[0].value = "selected by tag name";

// Bước 9: lấy tất cả <span> và nối nội dung vào textarea
elem = document.getElementsByTagName("span");
for (var i = 0; i < elem.length; i++) {
    document.getElementById("msgArea").value += "\n" + elem[i].innerText;
}

// Bước 10: getElementsByClassName()
document.getElementById("msgArea").value = "";
var counts = document.getElementsByClassName("count-number");
for (var i = 0; i < counts.length; i++) {
    document.getElementById("msgArea").value += "\n" + counts[i].innerText;
}

// Bước 11: querySelector() - dùng CSS selector, chỉ trả về phần tử ĐẦU TIÊN khớp
var ps = document.querySelector("#first p");
document.getElementById("msgArea").value = ps.innerHTML;

// Bước 12: querySelectorAll() - trả về TẤT CẢ phần tử khớp
ps = document.querySelectorAll("#first p");
for (var i = 0; i < ps.length; i++) {
    document.getElementById("msgArea").value += ps[i].innerHTML + "\n";
}

// Bước 13: setAttribute() đổi class thành "hidden" -> textarea bị ẩn
document.getElementById("msgArea").setAttribute("class", "hidden");

// Bước 14: thay đổi style (nền xanh) của khối #features
document.getElementById("features").style.backgroundColor = "green";
