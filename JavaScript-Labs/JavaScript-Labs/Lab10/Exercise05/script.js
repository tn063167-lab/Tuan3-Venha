/* Exercise 10.5 - Inserting DOM elements
   Lab yêu cầu lần lượt thử 7 cách chèn phần tử. Để thử nhanh, trang có ô chọn phương thức:
   chọn một cách rồi bấm "Insert image". Khi mở trang, ảnh được chèn sẵn bằng after() (bước 2). */

// Chèn ảnh vào quanh .panel bằng phương thức được chọn
function insertImage(method) {
    // Bước 2: tạo phần tử DOM mới từ chuỗi HTML
    var img = $('<img src="../assets/images/art/thumbs/13030.jpg" >');
    var panel = $('.panel');

    switch (method) {
        case 'after':        panel.after(img);       break;   // bước 2: sau panel
        case 'before':       panel.before(img);      break;   // bước 3: trước panel
        case 'append':       panel.append(img);      break;   // bước 4: cuối bên TRONG panel
        case 'prepend':      panel.prepend(img);     break;   // bước 5: đầu bên TRONG panel
        case 'appendTo':     img.appendTo(panel);    break;   // bước 6: như append nhưng viết ngược
        case 'prependTo':    img.prependTo(panel);   break;   // bước 7: như prepend nhưng viết ngược
        case 'insertBefore': img.insertBefore(panel); break;  // bước 8: như before nhưng viết ngược
    }
    $('#log').text('Đã chèn ảnh bằng: ' + method + '()');
}

$(function () {
    insertImage('after');                       // bước 2

    $('#btnInsert').click(function () {
        insertImage($('#method').val());
    });
    $('#btnReset').click(function () {          // xoá các ảnh đã chèn
        $('img').remove();
        $('#log').text('Đã xoá ảnh');
    });
});
