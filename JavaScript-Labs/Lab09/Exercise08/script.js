/* Exercise 9.8 - Form validation: kiểm tra các ô nhập không được để trống */

/* responsible for setting up event listeners on page */
function init() {
    document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}

/* initialize handlers once page is ready */
window.addEventListener("load", init);

/* ensures form fields are not empty */
function checkForEmptyFields(e) {
    // Bước 3: ẩn vùng hiển thị lỗi trước khi kiểm tra lại
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";

    var cssSelector = "input[type=text],input[type=password]";
    var fields = document.querySelectorAll(cssSelector);

    // duyệt các ô nhập, tìm ô còn trống
    var fieldList = [];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value == null || fields[i].value == "") {
            // có ô trống -> chặn việc gửi form
            e.preventDefault();
            fieldList.push(fields[i]);
        }
    }

    // tạo thông báo lỗi và hiển thị trong thẻ <div id="errors"> (thay cho alert ở bước 1)
    var msg = "The following fields can't be empty: ";
    if (fieldList.length > 0) {
        for (var i = 0; i < fieldList.length; i++) {
            msg += fieldList[i].id + ",";
        }
        errorArea.innerHTML = "<p>" + msg + "</p>";
        errorArea.className = "visible";
    }
}
