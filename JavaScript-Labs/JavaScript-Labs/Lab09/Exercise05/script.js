/* Exercise 9.5 - Responding to load events */
// biến toàn cục
var boxClass = 'movingDiv';

function outputBox(num) {
   var box = "<div class='" + boxClass + "' id='div" + num + "'>";
   box += "This is div " + num;
   box += "</div>";
   return box;
}

/* your code goes here */

// Bước 2-3: nếu gọi ngay ở đây, script chạy TRƯỚC khi DOM được dựng xong
//   -> getElementById("div1") trả về null -> lỗi "Cannot read properties of null"
//   var divToGet = document.getElementById("div1");
//   alert(divToGet.innerHTML);

// Bước 4: đặt code trong listener của sự kiện load -> chạy sau khi trang tải xong
window.addEventListener("load", function () {
    var divToGet = document.getElementById("div1");
    alert(divToGet.innerHTML);
});
