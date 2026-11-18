/* Exercise 10.10 - jqXHR handling: done() / fail() / always()
   $.get() trả về đối tượng jqXHR nên có thể nối các phương thức xử lý kết quả. */

var REMOTE_URL = "https://www.randyconnolly.com/funwebdev/services/travel/cities.php";
var LOCAL_URL = "../assets/data/cities.json";
var BAD_URL = "../assets/data/khong-ton-tai.json";   // URL cố ý sai để minh hoạ fail()

function renderCities(data, source) {
    $("div#results ul").empty();
    $.each(data, function (index, value) {
        var li = $('<li/>').html(value.name);
        li.appendTo("div#results ul");
    });
    $("#message").removeClass("err").text("Nguồn dữ liệu: " + source + " - " + data.length + " thành phố");
}

$(function () {
    $('.animLoading').hide();

    // ---- Nút 1: gọi web service, có dự phòng khi lỗi ----
    $("#consume").click(function () {
        $('.animLoading').show();
        var source = "web service randyconnolly.com";

        $.get(REMOTE_URL)
            // web service lỗi -> chuyển sang đọc file JSON cục bộ
            .then(null, function (xhr, status, error) {
                source = "file cities.json cục bộ (web service lỗi: " + status + ")";
                return $.get(LOCAL_URL);
            })
            // done sẽ chạy đầu tiên khi thành công
            .done(function (data) {
                renderCities(data, source);
            })
            // nếu lỗi sẽ chạy fail, trước always
            .fail(function (xhr, status, error) {
                $("#message").addClass("err")
                    .text("failed loading data - status=" + status + " error=" + error);
            })
            // always luôn chạy cuối cùng -> ẩn ảnh loading
            .always(function (data) {
                $('.animLoading').fadeOut("slow");
            });
    });

    // ---- Nút 2: cố ý gọi URL sai để xem fail() và thông tin jqXHR ----
    $("#consumeBad").click(function () {
        $('.animLoading').show();
        $("div#results ul").empty();

        $.get(BAD_URL)
            .done(function (data) {
                renderCities(data, "BAD_URL");
            })
            .fail(function (xhr, status, error) {
                // xhr.status là mã HTTP (404), error là mô tả lỗi
                $("#message").addClass("err")
                    .text("failed loading data - status=" + status + " error=" + error +
                          " (HTTP " + xhr.status + ")");
                console.error("jqXHR fail:", xhr.status, error);
            })
            .always(function () {
                $('.animLoading').fadeOut("slow");
            });
    });
});
