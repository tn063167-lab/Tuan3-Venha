/* Exercise 9.6 - Debugging events
   Cách debug (Chrome): F12 -> tab Sources -> mở file script.js -> bấm vào số dòng bên cạnh
   dòng alert() để đặt breakpoint -> di chuột vào các hộp div để dừng và xem biến e, e.target. */
// biến toàn cục
var boxClass = 'movingDiv';

function outputBox(num) {
   var box = "<div class='" + boxClass + "' id='div" + num + "'>";
   box += "This is div " + num;
   box += "</div>";
   return box;
}

/* your code goes here */

// Bước 7: gán listener mouseover cho TẤT CẢ phần tử có class "movingDiv"
window.addEventListener("load", function () {
    var divs = document.querySelectorAll(".movingDiv");
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("mouseover", function (e) {
            console.log("triggered by " + e.target.id);   // ghi log để theo dõi trong Console
            alert("triggered by " + e.target.id);          // e.target là phần tử đang bị rê chuột vào
        });
    }
});
