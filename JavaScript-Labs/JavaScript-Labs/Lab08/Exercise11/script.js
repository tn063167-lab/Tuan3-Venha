/* Exercise 8.11 - Arrays of objects */

// constructor function cho đối tượng Country
function Country(name, iso, capital, population) {
    this.name = name;
    this.iso = iso;
    this.capital = capital;
    this.population = population;
}

// mảng các đối tượng Country
var countries = [
    new Country("Bahamas", "BS", "Nassau", 301790),
    new Country("Canada", "CA", "Ottawa", 33679000),
    new Country("Germany", "DE", "Berlin", 81802257),
];

// cũng có thể push từng đối tượng vào cuối mảng
countries.push(new Country("Spain", "ES", "Madrid", 46505963));
countries.push(new Country("United Kingdom", "GB", "London", 62348447));

/* your code goes here */

// Bước 1-4 (các cách truy cập thuộc tính, để tham khảo):
//   document.write(countries[i].name);          // dùng chỉ số
//   var c = countries[i]; document.write(c.name);   // dùng biến tạm
//   document.write(c["name"]);                  // bracket notation
//   var temp = "name"; document.write(c[temp]); // tên thuộc tính nằm trong biến

// Bước 5: for..in duyệt qua TẤT CẢ thuộc tính của đối tượng
for (var i = 0; i < countries.length; i++) {
    var c = countries[i];
    document.write("<div class='box'>");
    document.write("<img src='../assets/flags/" + c.iso + ".png' class='boxImg'>");
    for (var propertyName in c) {
        document.write("<strong>");
        document.write(propertyName + ": ");
        document.write("</strong>");
        document.write(c[propertyName]);
        document.write("<br>");
    }
    document.write("</div>");
}
