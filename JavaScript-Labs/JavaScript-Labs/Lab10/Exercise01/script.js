/* Exercise 10.1 - Set up jQuery
   jQuery được nạp trong <head> từ CDN (https://code.jquery.com/jquery-3.1.1.min.js).
   Nếu CDN không truy cập được, đoạn script dự phòng sẽ nạp ../assets/js/jquery-3.1.1.min.js. */

// Kiểm tra jQuery đã nạp thành công chưa, và nạp từ nguồn nào
var fromLocal = !!$('script[src$="jquery-3.1.1.min.js"]').filter(function () {
    return this.src.indexOf('assets/js') !== -1;
}).length;

console.log("jQuery version " + $.fn.jquery + " loaded " + (fromLocal ? "from local fallback" : "from CDN"));

// Hiển thị trạng thái ngay trên trang (dùng cú pháp jQuery đầu tiên: $('selector'))
$('#msgArea').val("jQuery " + $.fn.jquery + " đã được nạp thành công (" + (fromLocal ? "bản dự phòng trong repository" : "từ CDN") + ").");
