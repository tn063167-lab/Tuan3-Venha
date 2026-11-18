/* Exercise 9.4 - Simple event handling */

var btn = document.getElementById("testButton");

// Bước 5-6: ẩn/hiện đoạn văn bản bằng CSS3 transition + setTimeout (trễ)
function simpleHandler(event) {
    var content = document.getElementById("content");
    if (btn.innerHTML == "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        // đổi display sau 1000 ms để hiệu ứng mờ dần kịp chạy xong
        setTimeout(function () {
            content.style.display = "none";
        }, 1000);
    }
    else {
        btn.innerHTML = "Hide";
        content.style.display = "block";
        // đổi class sau 500 ms
        setTimeout(function () {
            content.className = "makeItNormal";
        }, 500);
    }
}

// Bước 2: gán event listener cho sự kiện click
btn.addEventListener("click", simpleHandler);

var img = document.getElementById("mainImage");

// Bước 3: mouseover -> ảnh chuyển sang đen trắng
img.addEventListener("mouseover", function (event) {
    img.className = "makeItGray";
});

// Bước 4: mouseout -> trả lại bình thường
img.addEventListener("mouseout", function (event) {
    img.className = "makeItNormal";
});
