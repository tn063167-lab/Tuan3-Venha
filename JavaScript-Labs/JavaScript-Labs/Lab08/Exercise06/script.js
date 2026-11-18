/* Exercise 8.6 - Built-in JavaScript objects: String, Date, Math */

// Bước 2: tạo đối tượng String bằng từ khoá new
var stringOne = new String("Test");
document.write(stringOne);

// Bước 3: so sánh String object và String literal
var stringTwo = "Test";
var stringThree = "Test";
var stringFour = new String("Test");
document.write("<br>typeof stringOne=" + typeof stringOne);     // object
document.write("<br>typeof stringThree=" + typeof stringThree); // string

// Bước 4: == so sánh giá trị, === so sánh cả giá trị lẫn kiểu dữ liệu
if (stringOne == stringTwo)
    document.write("<br>stringOne has = value to stringTwo");
if (stringOne == stringFour)
    document.write("<br>stringOne has = value to stringFour");
if (stringOne === stringTwo)
    document.write("<br>stringOne has = value and = type to stringTwo");
if (stringTwo === stringThree)
    document.write("<br>stringTwo has = value and = type to stringThree");
if (stringTwo === stringFour)
    document.write("<br>stringTwo has = value and = type to stringThree");

// Bước 5: đối tượng Date
var dateOne = new Date();
document.write("<p>" + dateOne + "</p>");

// Bước 6: đối tượng Math
document.write(Math.PI + "<br/>");
document.write(Math.sqrt(4) + "<br/>");
document.write(Math.random() + "<br/>");
