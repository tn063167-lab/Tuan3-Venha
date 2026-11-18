/* Exercise 9.7 - Working with forms: đổi màu nền ô nhập khi focus / blur */

// Hàm xử lý chung cho cả hai sự kiện focus và blur
function setBackground(e) {
    if (e.type == "focus") {
        e.target.style.backgroundColor = "#FFE393";   // đang nhập -> nền vàng nhạt
    }
    else if (e.type == "blur") {
        e.target.style.backgroundColor = "white";     // rời khỏi ô -> nền trắng
    }
}

window.addEventListener("load", function () {
    var cssSelector = "input[type=text],input[type=password]";
    var fields = document.querySelectorAll(cssSelector);

    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener("focus", setBackground);
        fields[i].addEventListener("blur", setBackground);
    }
});
