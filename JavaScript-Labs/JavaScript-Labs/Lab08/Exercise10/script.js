/* Exercise 8.10 - Creating JavaScript objects */

// Cách 1 (bước 1): new Object() rồi gán thuộc tính
//   var order = new Object();
//   order.product = "Self Portrait in a Straw Hat";
//   order.price = 15.0;
//   order.quantity = 2;
//   order.total = function() { return this.price * this.quantity; };
//   document.write("Total=" + order.total());   // có () -> gọi hàm; không có () -> chỉ in nội dung hàm
//
// Cách 2 (bước 4-5): var order = {};  rồi order["product"] = ...;  (bracket notation)
//
// Cách 3 (bước 6): object literal notation
//   var order = { product: "...", price: 15.0, quantity: 2, total: function() { ... } };

// Cách 4 (bước 7-11): constructor function -> tạo được nhiều đối tượng cùng kiểu
function order(product, price, quantity) {
    this.product = product;
    this.price = price;
    this.quantity = quantity;
    this.total = function () { return this.price * this.quantity; };

    this.output = function () {
        document.write("<p>Product=" + this.product);
        document.write("<br>Price=" + this.price);
        document.write("<br>Quantity=" + this.quantity);
        document.write("<br>Total=" + this.total());
    };
}

var example1 = new order("Self Portrait in a Straw Hat", 15, 2);
var example2 = new order("Untitled #23", 10, 4);

example1.output();
example2.output();
