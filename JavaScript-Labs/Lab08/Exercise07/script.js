/* Exercise 8.7 - Arrays: tạo lịch tháng 30 ngày bắt đầu từ Chủ nhật */

// Bước 2: tạo mảng các ngày trong tuần
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
// document.write(daysOfWeek + "<br>");

// Bước 3: push() thêm phần tử vào CUỐI mảng
daysOfWeek.push("Sat");
// document.write(daysOfWeek + "<br/>");

// Bước 4: unshift() thêm phần tử vào ĐẦU mảng
daysOfWeek.unshift("Sun");
// document.write(daysOfWeek + "<br/>");   // Bước 5: đã comment lại

// Bước 6-7: duyệt mảng bằng vòng lặp for để tạo hàng tiêu đề của bảng
document.write("<table border=1>");
document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
    var day;
    if (daysOfWeek[i].length < 4)
        day = daysOfWeek[i];
    else
        day = "<em>" + daysOfWeek[i] + "</em>";   // tên dài hơn 3 ký tự -> in nghiêng
    document.write("<th>" + day + "</th>");
}
document.write("</tr>");

// Bước 8: các vòng lặp lồng nhau in số 1..30 (tháng bắt đầu vào Chủ nhật)
var date = 1;
var totalDays = 30;
for (var week = 0; date <= totalDays; week++) {
    document.write("<tr>");
    for (var d = 0; d < daysOfWeek.length; d++) {
        if (date <= totalDays) {
            document.write("<td>" + date + "</td>");
            date++;
        } else {
            document.write("<td></td>");   // ô trống ở cuối tuần cuối
        }
    }
    document.write("</tr>");
}
document.write("</table>");
