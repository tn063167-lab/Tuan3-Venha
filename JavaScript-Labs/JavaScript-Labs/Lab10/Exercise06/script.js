/* Exercise 10.6 - Simple jQuery animation */
$(function () {
    // Bước 2-3: fade (mờ dần)
    $("#btnFadeIn").click(function () {
        $("figure").fadeIn(1000);
    });
    $("#btnFadeOut").click(function () {
        $("figure").fadeOut(1000);
    });
    // Bước 4: fadeToggle() tự chọn hiện/ẩn tuỳ trạng thái hiện tại
    $("#btnFade").click(function () {
        $("figure").fadeToggle(500);
    });

    // Bước 5: slide (trượt)
    $("#btnSlideDown").click(function () {
        $("figure").slideDown("slow");
    });
    $("#btnSlideUp").click(function () {
        $("figure").slideUp("slow");
    });
    $("#btnSlide").click(function () {
        $("figure").slideToggle(2000);
    });
});
