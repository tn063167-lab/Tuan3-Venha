/* Exercise 10.4 - jQuery listeners (xử lý sự kiện bằng jQuery) */

// Bước 2: phương thức rút gọn .click()
//   $(".panel").click(function() { $("#message").html("You clicked in the panel"); });
// Bước 3: .on("click", ...) - dùng được cho mọi sự kiện
//   $(".panel").on("click", function() { ... });

// Bước 4: $(function () {...}) là cách viết tắt của document-ready:
// code chỉ chạy khi DOM đã sẵn sàng nên đặt ở đâu trong trang cũng được.
$(function () {
    // Bước 5: nối chuỗi (chaining) nhiều handler vào cùng một phần tử
    $(".panel")
        .on("mousemove", function (e) {
            $("#message").html("x=" + e.pageX + " y=" + e.pageY);
        })
        .on("mouseleave", function (e) {
            $("#message").html("goodbye!");
        })
        .on("click", function () {
            $("#message").html("stopped move reporting");
            $(".panel").off("mousemove");     // off() gỡ bỏ handler mousemove
        });
});
