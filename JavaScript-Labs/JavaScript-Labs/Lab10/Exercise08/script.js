/* Exercise 10.8 - Complex animations: animate() */
$(function () {
    $("button").click(function () {
        // Bước 4: các lời gọi animate() nối tiếp nhau; mỗi bước chạy sau khi bước trước kết thúc
        $("#box")
            .animate({
                left: '495px',      // bước 2-3: có thể animate nhiều thuộc tính CSS cùng lúc
                opacity: '1',
                height: '50px'
            })
            .animate({ top: '400px', opacity: '0.2' })
            .animate({ height: '200px' }, 2000);   // tham số thứ 2: thời gian (ms)
    });
});
