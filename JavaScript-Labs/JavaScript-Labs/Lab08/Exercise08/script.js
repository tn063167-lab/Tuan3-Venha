/* Exercise 8.8 - JavaScript functions */

// Bước 8: biến toàn cục (global scope)
var boxClass = 'movingDiv';

// Bước 1 (dạng đầu tiên): hàm tự document.write() ra trang
//   function outputBox() {
//      document.write("<div class='movingDiv' id='div1'>");
//      document.write("This is div 1");
//      document.write("</div>");
//   }
// Bước 4: hàm trả về (return) chuỗi HTML thay vì tự in
// Bước 6: thêm tham số num
function outputBox(num) {
    var box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}

// Bước 9-10: biến box khai báo bằng var nên chỉ có phạm vi trong hàm.
// Thử bỏ "var" ở dòng "var box" -> box trở thành biến toàn cục (dễ gây lỗi).
