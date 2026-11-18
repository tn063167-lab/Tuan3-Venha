/* Exercise 9.3 - Modifying the DOM: tạo, thêm và xoá phần tử */

/* code goes here */
var first = document.getElementById("first");

// Bước 1: tạo text node và thẻ <p>, ghép chúng lại rồi thêm vào #first
var text = document.createTextNode("this is programmatically created");
var p = document.createElement("p");

p.appendChild(text);
first.appendChild(p);

// Bước 3: xoá một <li> khỏi danh sách bằng removeChild()
var icons = document.getElementById("iconList");
icons.removeChild(document.getElementById("deleteThisOne"));
