// Exercise 8.5 - hello.js được chuyển vào thư mục js/ để tổ chức file gọn hơn
//
// Bước 4 của bài Lab: cố ý viết sai chính tả "document" để quan sát lỗi trong Console:
//     doccumment.write("this text was written from JS");
//     --> Console báo: Uncaught ReferenceError: doccumment is not defined
// Bước 7: sửa lại đúng như bên dưới.
document.write("this text was written from JS");
var count = 1;
document.write(" Count = " + count);

count++;
var output = "<br>Count = " + count;
document.write(output);

// Thử trực tiếp trong Console của trình duyệt (bước 8-12):
//   count                  -> 2
//   output                 -> "<br>Count = 2"
//   var temp = count * 7;  -> undefined (phép gán không trả về giá trị)
//   temp                   -> 14
