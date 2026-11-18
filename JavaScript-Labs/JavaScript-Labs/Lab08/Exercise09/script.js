/* Exercise 8.9 - Functions as objects (hàm là đối tượng) */

var isCanadian = true;

// Bước 1 (ban đầu): taxRate() là hàm riêng
//   function taxRate() { if (isCanadian) { return 0.05; } else { return 0.0; } }
//   function calculateTax(amount) { return amount * taxRate(); }
// Bước 3: lồng hàm taxRate() vào trong calculateTax()
// Bước 4-5: gán hàm cho một biến (hàm có tên rồi hàm ẩn danh)
//   var tax = function () { ... };
//   return amount * tax();

// Bước 6 (dạng cuối): truyền một hàm ẩn danh vào làm THAM SỐ
function calculateTax(amount, tax) {
    return amount * tax();
}

function calculateTotal(price, quantity) {
    var amount = price * quantity;
    return amount + calculateTax(amount, function () {
        if (isCanadian) {
            return 0.05;
        } else {
            return 0.0;
        }
    });
}
