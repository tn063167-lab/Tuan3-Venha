/* Exercise 10.9 - GET requests: gọi web service trả về danh sách thành phố (JSON)
   Lưu ý: GitHub Pages chạy HTTPS nên URL web service phải là https:// (http:// sẽ bị chặn - mixed content).
   Nếu web service không truy cập được, trang tự chuyển sang file JSON cục bộ có cùng cấu trúc. */

var REMOTE_URL = "https://www.randyconnolly.com/funwebdev/services/travel/cities.php";
var LOCAL_URL = "../assets/data/cities.json";

// Bước 5: hiển thị dữ liệu bằng $.each() và tạo <li> động
function showCities(data, status, source) {
    // Bước 4: chỉ xử lý khi status == "success"
    if (status == "success") {
        $("#results").html("<ul></ul>");
        $.each(data, function (index, value) {
            var li = $('<li/>').html(value.name);
            li.appendTo("div#results ul");
        });
        $("#source").text("Nguồn dữ liệu: " + source + " - " + data.length + " thành phố");
    }
}

$(function () {
    $("#consume").click(function () {
        $("#source").text("Đang tải...");

        // Bước 3: $.get(url, callback(data, status))  - yêu cầu GET bất đồng bộ
        $.get(REMOTE_URL, function (data, status) {
            showCities(data, status, "web service randyconnolly.com");
        })
        // nếu web service lỗi -> dùng dữ liệu cục bộ
        .fail(function () {
            $.get(LOCAL_URL, function (data, status) {
                showCities(data, status, "file cities.json cục bộ (web service không truy cập được)");
            });
        });
    });
});
