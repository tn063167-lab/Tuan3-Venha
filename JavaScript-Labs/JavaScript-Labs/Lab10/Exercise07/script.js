/* Exercise 10.7 - More jQuery animation: popup xem trước ảnh lớn khi rê chuột */

// Bước 3: gỡ popup và bỏ class "gray" khi chuột rời ảnh
function removePreview() {
    $(this).removeClass("gray");
    $("#preview").remove();
}

// Bước 3: đặt vị trí popup theo toạ độ con trỏ chuột
function movePreview(e) {
    $("#preview")
        .css("top", (e.pageY - 10) + "px")
        .css("left", (e.pageX + 30) + "px");
}

$(function () {
    // Bước 2: khi chuột đi vào ảnh nhỏ -> tạo popup chứa ảnh lớn + chú thích
    $('figure img').on('mouseover', function (e) {

        // đoán tên file ảnh lớn từ ảnh nhỏ: small -> medium
        var alt = $(this).attr('alt');
        var src = $(this).attr('src');
        var newsrc = src.replace("small", "medium");

        // tạo phần tử động chứa ảnh lớn và chú thích
        var preview = $('<div id="preview"></div>');
        var image = $('<img src="' + newsrc + '">');
        var caption = $('<p>' + alt + '</p>');
        preview.append(image);
        preview.append(caption);
        $('body').append(preview);

        // làm ảnh nhỏ chuyển sang xám
        $(this).addClass("gray");

        // rồi cho popup hiện dần
        $("#preview").fadeIn(1000);
    });

    // Bước 4: gắn thêm sự kiện mouseleave và mousemove
    $("figure img").on("mouseleave", removePreview);
    $("figure img").on("mousemove", movePreview);
});
