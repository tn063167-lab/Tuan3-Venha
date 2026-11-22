/* ===== Dữ liệu và hàm dùng chung cho 3 trang ===== */
var CATS = [['Cà phê hạt', 14], ['Cà phê bột', 9], ['Cà phê hòa tan', 6], ['Cold brew & đóng lon', 5], ['Dụng cụ pha chế', 8], ['Quà tặng & combo', 4]];

var products = [
  { name:'Cà phê Robusta rang mộc 500g',     kind:'bag', c:'6f4e37', lines:['ROBUSTA','500g'],     price:170000, old:200000, sold:85, total:100, tag:'best', rate:4.5, rev:15, min:12 },
  { name:'Cà phê Arabica Cầu Đất 250g',      kind:'bag', c:'2e7d32', lines:['ARABICA','CAU DAT'],  price:135000, old:150000, sold:30, total:100, tag:'new',  rate:5,   rev:8,  min:95 },
  { name:'Cà phê Culi nguyên chất 500g',     kind:'bag', c:'b23a1e', lines:['CULI','NGUYEN CHAT'], price:190000, old:238000, sold:92, total:100, tag:'',     rate:4,   rev:21, min:45 },
  { name:'Cà phê hòa tan 3in1 (hộp 20 gói)', kind:'bag', c:'1565c0', lines:['HOA TAN','3 IN 1'],   price:59000,  old:72000,  sold:4,  total:100, tag:'new',  rate:3.5, rev:6,  min:300 },
  { name:'Phin nhôm pha cà phê size 8',      kind:'cup', c:'757575', lines:['Phin nhom'],          price:45000,  old:50000,  sold:60, total:100, tag:'',     rate:4.5, rev:32, min:150 },
  { name:'Cà phê sữa đá lon (thùng 24 lon)', kind:'can', c:'8d4e2a', lines:['CA PHE','SUA DA'],    price:260000, old:320000, sold:81, total:100, tag:'best', rate:4,   rev:18, min:20 }
];
products.forEach(function (p, i) {
  p.id = i;
  p.discount = Math.round((1 - p.price / p.old) * 100);
  p.end = Date.now() + p.min * 60000;
});

function fmt(n) { return n.toLocaleString('vi-VN') + ' đ'; }
function pad(n) { return ('0' + n).slice(-2); }

/* ===== Ảnh vẽ bằng SVG (không cần mạng, không cần file ảnh) ===== */
function bean(x, y, r, rot) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><ellipse rx="' + r + '" ry="' + (r * 0.66) + '" fill="#4b2e1e"/>' +
    '<path d="M' + (-r) + ' 0 Q0 ' + (-r * 0.3) + ' ' + r + ' 0" stroke="#2a170d" stroke-width="' + (r * 0.12) + '" fill="none"/></g>';
}
function label(lines, x, y, size, fill) {
  return lines.map(function (t, i) {
    return '<text x="' + x + '" y="' + (y + i * size * 1.25) + '" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="' + size + '" fill="' + fill + '">' + t + '</text>';
  }).join('');
}
function uri(svg) { return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); }
function art(kind, c, lines) {
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ec"/><stop offset="1" stop-color="#e6d3bd"/></linearGradient></defs>' +
    '<rect width="600" height="600" fill="url(#g)"/><ellipse cx="300" cy="550" rx="190" ry="22" fill="#000" opacity=".12"/>';
  if (kind === 'bag') {
    s += '<path d="M170 140 L430 140 L452 520 Q452 545 427 545 L173 545 Q148 545 148 520 Z" fill="#' + c + '"/>' +
      '<rect x="168" y="105" width="264" height="48" rx="8" fill="#' + c + '"/><rect x="168" y="105" width="264" height="48" rx="8" fill="#000" opacity=".25"/>' +
      '<rect x="190" y="250" width="220" height="190" rx="16" fill="#fff6e8"/>' + bean(300, 300, 30, -25) + label(lines, 300, 365, 26, '#' + c);
  } else if (kind === 'can') {
    s += '<rect x="205" y="120" width="190" height="420" rx="24" fill="#' + c + '"/><rect x="205" y="120" width="190" height="42" rx="18" fill="#cfcfcf"/><rect x="205" y="500" width="190" height="40" rx="18" fill="#cfcfcf"/>' +
      '<rect x="225" y="230" width="150" height="190" rx="14" fill="#fff6e8"/>' + bean(300, 280, 26, 20) + label(lines, 300, 340, 22, '#' + c);
  } else if (kind === 'cup') {
    s += '<ellipse cx="300" cy="470" rx="170" ry="38" fill="#d9d9d9"/><ellipse cx="300" cy="462" rx="170" ry="36" fill="#f3f3f3"/>' +
      '<path d="M190 250 L410 250 Q410 440 300 440 Q190 440 190 250Z" fill="#' + c + '"/>' +
      '<path d="M410 285 Q490 280 470 350 Q455 390 400 390" stroke="#' + c + '" stroke-width="22" fill="none"/>' +
      '<ellipse cx="300" cy="250" rx="110" ry="26" fill="#3b2314"/><ellipse cx="300" cy="248" rx="90" ry="17" fill="#7a4a2a"/>' +
      '<path d="M255 200 Q235 160 262 130 M300 205 Q280 160 308 120 M345 200 Q325 165 350 140" stroke="#b9a58f" stroke-width="12" fill="none" stroke-linecap="round" opacity=".7"/>' +
      label(lines, 300, 530, 26, '#5d4037');
  } else {
    [[200,380,46,10],[300,400,50,-30],[400,380,46,40],[250,320,44,-10],[350,320,46,25],[300,250,44,5],[190,450,40,60],[410,450,40,-50],[300,480,42,15],[240,200,36,-20],[360,200,36,30]]
      .forEach(function (p) { s += bean(p[0], p[1], p[2], p[3]); });
    s += label(lines, 300, 565, 24, '#5d4037');
  }
  return uri(s + '</svg>');
}
function banner(c1, c2, title, sub) {
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 350"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#' + c1 + '"/><stop offset="1" stop-color="#' + c2 + '"/></linearGradient></defs>' +
    '<rect width="1120" height="350" fill="url(#b)"/>';
  [[820,90,40,20],[920,160,48,-30],[1010,90,36,45],[860,240,44,-10],[970,270,40,30],[1070,200,34,10]].forEach(function (p) { s += bean(p[0], p[1], p[2], p[3]); });
  s += '<text x="70" y="150" font-family="Arial,sans-serif" font-weight="bold" font-size="54" fill="#fff">' + title + '</text>' +
       '<text x="70" y="210" font-family="Arial,sans-serif" font-size="28" fill="#fff" opacity=".9">' + sub + '</text></svg>';
  return uri(s);
}

/* ===== Giỏ hàng (số lượng lưu localStorage) ===== */
function cartCount() { try { return +localStorage.getItem('cart') || 0; } catch (e) { return 0; } }
function addToCart(n) {
  try { localStorage.setItem('cart', cartCount() + (n || 1)); } catch (e) {}
  $('#cart-badge').text(cartCount());
}

/* ===== Thanh điều hướng (theo hướng dẫn mục 2.1.1 - 2.1.2) ===== */
function renderNav(active) {
  var links = [['ecommerce.html', 'Trang chủ'], ['ecommerce-status.html', 'Đơn hàng']];
  var li = links.map(function (l) { return '<li' + (l[0] === active ? ' class="active"' : '') + '><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('');
  $('#nav').html(
    '<nav class="navbar navbar-default"><div class="container-fluid">' +
    '<div class="navbar-header">' +
      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">' +
        '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>' +
      '<a class="navbar-brand" href="ecommerce.html">☕ Cà Phê Việt</a></div>' +
    '<div class="collapse navbar-collapse" id="nav-collapse">' +
      '<ul class="nav navbar-nav">' + li +
        '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Danh mục <span class="caret"></span></a>' +
        '<ul class="dropdown-menu">' + CATS.map(function (c) { return '<li><a href="#">' + c[0] + '</a></li>'; }).join('') + '</ul></li></ul>' +
      '<form class="navbar-form navbar-left hidden-xs"><div class="form-group"><input type="text" class="form-control" placeholder="Tìm kiếm"></div> ' +
        '<button type="submit" class="btn btn-default">Tìm</button></form>' +
      '<form class="visible-xs-inline-block" style="margin-top:10px"><div class="form-group"><input type="text" class="form-control" placeholder="Tìm kiếm"></div></form>' +
      '<ul class="nav navbar-nav navbar-right">' +
        '<li><a href="#">🛒 <span class="badge" id="cart-badge">' + cartCount() + '</span></a></li>' +
        '<li><a href="ecommerce-status.html">👤</a></li>' +
        '<li><a href="#" data-toggle="modal" data-target="#myModal">Đăng nhập</a></li></ul>' +
    '</div></div></nav>' +
    '<div class="modal fade" id="myModal" tabindex="-1" role="dialog"><div class="modal-dialog modal-sm"><div class="modal-content">' +
      '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Đăng nhập</h4></div>' +
      '<form onsubmit="return false"><div class="modal-body"><div class="form-group"><input class="form-control" placeholder="Email"></div>' +
      '<div class="form-group"><input type="password" class="form-control" placeholder="Mật khẩu"></div></div>' +
      '<div class="modal-footer"><button class="btn btn-primary btn-block" data-dismiss="modal">Đăng nhập</button></div></form></div></div></div>');
}

/* ===== Danh mục (List group, mục 2.1.4) ===== */
function renderCats(title) {
  $('#cats').html('<h3>' + (title || 'Danh mục') + '</h3><ul class="list-group">' +
    CATS.map(function (c) { return '<li class="list-group-item"><span class="badge">' + c[1] + '</span>' + c[0] + '</li>'; }).join('') + '</ul>');
}

/* ===== Thẻ sản phẩm: badge -%, New/Best Seller, thanh kho, đếm ngược, sao ===== */
function cardHtml(p, colClass) {
  var hot = p.sold / p.total >= 0.8;
  var tag = p.tag === 'new' ? '<span class="badge-tag new">New</span>' : p.tag === 'best' ? '<span class="badge-tag best">Best Seller</span>' : '';
  var bar = hot
    ? '<div class="progress-bar progress-bar-danger" style="width:' + p.sold + '%">🔥 Sắp bán hết</div>'
    : '<div class="progress-bar progress-bar-warning" style="width:' + Math.max(p.sold, 28) + '%">Đã bán ' + p.sold + '</div>';
  return '<div class="' + (colClass || 'col-sm-6 col-md-4') + '"><div class="thumbnail card-p">' +
    '<span class="badge-discount">-' + p.discount + '%</span>' + tag +
    '<a href="ecommerce-detail.html?id=' + p.id + '"><img class="img-responsive" src="' + art(p.kind, p.c, p.lines) + '" alt="' + p.name + '"></a>' +
    '<div class="add-to-cart"><a href="#" class="add-btn" data-toggle="tooltip" data-placement="top" title="Thêm vào giỏ">+</a></div>' +
    '<div class="caption"><h4><a href="ecommerce-detail.html?id=' + p.id + '">' + p.name + '</a></h4>' +
      '<p>Cà phê chất lượng cao, giao hàng nhanh toàn quốc.</p>' +
      '<div class="price">' + fmt(p.price) + '<small>' + fmt(p.old) + '</small></div>' +
      '<div class="stock-row"><div class="progress stock">' + bar + '</div><span class="cd" data-end="' + p.end + '"></span></div>' +
      '<div class="ratings" style="margin-top:8px"><p class="pull-right"><a href="ecommerce-detail.html?id=' + p.id + '#comments">' + p.rev + ' đánh giá</a></p>' +
      '<input class="rating" value="' + p.rate + '" readonly></div>' +
    '</div></div></div>';
}

function tickCountdown() {
  $('.cd').each(function () {
    var s = Math.max(0, Math.floor(($(this).data('end') - Date.now()) / 1000));
    var d = Math.floor(s / 86400); s %= 86400;
    $(this).text(d + ' ngày ' + pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60));
  });
}

/* Thay mọi glyphicon-star bằng bootstrap-star-rating (theme SVG, không cần font) */
function initStars(size) {
  var star = '<span class="krajee-icon krajee-icon-star"></span>';
  $('input.rating').rating({ theme: 'krajee-svg', filledStar: star, emptyStar: star,
    displayOnly: true, size: size || 'xs', showCaption: false, step: 0.5 });
}

function initCommon() {
  tickCountdown(); setInterval(tickCountdown, 1000);
  $('[data-toggle="tooltip"]').tooltip();
  $(document).on('click', '.add-btn', function (e) { e.preventDefault(); addToCart(1); });
}
