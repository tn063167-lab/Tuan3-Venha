/* Exercise 9.2 - DOM family relations (quan hệ cha - con - anh em trong cây DOM) */

// Bước 2-5: thử trong Console của trình duyệt
//   document.getElementById("first")                       -> khối <div id="first">
//   document.getElementById("first").firstChild            -> #text (khoảng trắng/xuống dòng giữa các thẻ)
//   document.getElementById("first").firstChild.nextSibling -> phần tử <h1> kế tiếp
//   document.getElementById("first").parentNode            -> thẻ cha (container)

// Bước 6: duyệt các nút con (childNodes) của #stories
var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
    console.log("child " + i + " =" + stories.childNodes[i] +
                " nodeType=" + stories.childNodes[i].nodeType);

    // Bước 7: nodeType == 1 là Element; nodeType == 3 là Text (khoảng trắng) -> chỉ tô màu Element
    if (stories.childNodes[i].nodeType == 1) {
        stories.childNodes[i].style.backgroundColor = "#cfe8ff";
    }
}
