/* Exercise 8.12 - Bài thực hành tổng hợp (exercise.html trong tài liệu Lab 08)
   Thay các danh sách HTML viết tay bằng lời gọi hàm JavaScript.
   Dữ liệu lấy từ ../assets/js/travel-data.js (continents, countries, posts). */

// Danh sách lục địa trong panel "Continents"
function outputContinents() {
    var html = "";
    for (var i = 0; i < continents.length; i++) {
        html += '<li class="list-group-item"><a href="#">' + continents[i] + '</a></li>';
    }
    return html;
}

// Danh sách quốc gia trong panel "Popular Countries"; quốc gia đang chọn thì không có link
function outputCountries(selected) {
    var html = "";
    for (var i = 0; i < countries.length; i++) {
        if (countries[i] == selected) {
            html += '<li class="list-group-item active">' + countries[i] + '</li>';
        } else {
            html += '<li class="list-group-item"><a href="#">' + countries[i] + '</a></li>';
        }
    }
    return html;
}

// Một dòng tóm tắt bài viết (post summary)
function outputPostRow(post) {
    var html = '<div class="row">';
    html += '<div class="col-md-2">';
    html += '<a href="post.php?id=' + post.id + '"><img src="../assets/images/travel/' + post.thumb +
            '" alt="' + post.title + '" class="img-thumbnail"/></a>';
    html += '</div>';
    html += '<div class="col-md-10">';
    html += '<h2>' + post.title + '</h2>';
    html += '<div class="details">Posted by ' + post.user +
            '<span class="pull-right">' + post.postdate + '</span></div>';
    html += '<p class="excerpt">' + post.excerpt + '</p>';
    html += '<p><a href="post.php?id=' + post.id + '" class="btn btn-primary btn-sm">Read more</a></p>';
    html += '</div></div><hr/>';
    return html;
}

// Duyệt mảng posts và gọi outputPostRow() cho từng bài
function outputPosts() {
    var html = "";
    for (var i = 0; i < posts.length; i++) {
        html += outputPostRow(posts[i]);
    }
    return html;
}

// Phân trang: trang hiện tại là current, tổng cộng total trang
function outputPagination(current, total) {
    var html = '<li><a href="#">&laquo;</a></li>';
    for (var p = 1; p <= total; p++) {
        if (p == current) html += '<li class="active"><a href="#">' + p + '</a></li>';
        else html += '<li><a href="#">' + p + '</a></li>';
    }
    html += '<li><a href="#">&raquo;</a></li>';
    return html;
}
