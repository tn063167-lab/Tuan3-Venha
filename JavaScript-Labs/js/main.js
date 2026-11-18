/* ===== JavaScript-Labs – main.js =====
   Dùng chung cho trang chủ và các trang danh sách Exercise.
   Mọi tính năng đều kiểm tra phần tử có tồn tại trước khi chạy. */

// Thông tin cá nhân hiển thị trên trang chủ (sửa tại đây nếu cần)
var PROFILE = {
    fullName:  "Nguyễn Phúc Thảo Nguyên",
    studentId: "31221023969",
    className: "26C1INF50902701",
    github:    "https://github.com/tn063167-lab",
    avatar:    "assets/avatar.png"        
};

// ---------- Chế độ sáng / tối ----------
(function () {
    var saved = null;
    try { saved = localStorage.getItem("jsl-theme"); } catch (e) { /* localStorage có thể bị chặn */ }
    if (saved) document.documentElement.setAttribute("data-theme", saved);
})();

document.addEventListener("DOMContentLoaded", function () {

    // ---------- Điền thông tin cá nhân vào trang ----------
    document.querySelectorAll("[data-profile]").forEach(function (el) {
        var key = el.getAttribute("data-profile");
        if (!PROFILE[key]) return;
        if (el.tagName === "A") { el.href = PROFILE[key]; el.textContent = PROFILE[key].replace("https://", ""); }
        else if (el.tagName === "IMG") { el.src = PROFILE[key]; }
        else { el.textContent = PROFILE[key]; }
    });

    // ---------- Nút đổi giao diện sáng/tối ----------
    var themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            try { localStorage.setItem("jsl-theme", next); } catch (e) {}
        });
    }

    // ---------- Menu trên điện thoại ----------
    var menuBtn = document.getElementById("menuBtn"), links = document.getElementById("navLinks");
    if (menuBtn && links) {
        menuBtn.addEventListener("click", function () { links.classList.toggle("open"); });
        links.addEventListener("click", function () { links.classList.remove("open"); });
    }

    // ---------- Đếm số chạy cho phần thống kê ----------
    document.querySelectorAll("[data-count]").forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10), n = 0;
        var timer = setInterval(function () {
            n += Math.max(1, Math.ceil(target / 30));
            if (n >= target) { n = target; clearInterval(timer); }
            el.textContent = n;
        }, 40);
    });

    // ---------- Tab "Kiến thức đã học" ----------
    var tabs = document.querySelectorAll(".tab");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
            tab.setAttribute("aria-selected", "true");
            document.querySelectorAll(".tab-panel").forEach(function (p) {
                p.classList.toggle("active", p.id === tab.getAttribute("data-target"));
            });
        });
    });

    // ---------- Demo giỏ hàng mini (liên hệ TMĐT) ----------
    var cartBox = document.getElementById("cartItems");
    if (cartBox) {
        var products = [
            { name: "Áo thun JavaScript", note: "Cotton, size M", price: 189000, qty: 1 },
            { name: "Cốc gốm DOM",        note: "350 ml",          price: 95000,  qty: 2 },
            { name: "Sổ tay jQuery",      note: "A5, 120 trang",   price: 65000,  qty: 1 }
        ];
        var VAT = 0.08;
        function money(n) { return n.toLocaleString("vi-VN") + " ₫"; }

        function renderCart() {
            var html = "", sub = 0;
            products.forEach(function (p, i) {
                var line = p.price * p.qty; sub += line;
                html += '<div class="cart-row">' +
                    '<div class="name">' + p.name + '<small>' + p.note + ' · ' + money(p.price) + '</small></div>' +
                    '<div class="qty"><button data-i="' + i + '" data-d="-1" aria-label="Giảm">−</button>' +
                    '<span>' + p.qty + '</span>' +
                    '<button data-i="' + i + '" data-d="1" aria-label="Tăng">+</button></div>' +
                    '<div class="line-total">' + money(line) + '</div></div>';
            });
            cartBox.innerHTML = html;
            document.getElementById("sumSub").textContent = money(sub);
            document.getElementById("sumVat").textContent = money(Math.round(sub * VAT));
            document.getElementById("sumAll").textContent = money(Math.round(sub * (1 + VAT)));
        }
        // dùng event delegation: một listener cho tất cả nút +/-
        cartBox.addEventListener("click", function (e) {
            var btn = e.target.closest("button[data-i]");
            if (!btn) return;
            var p = products[btn.getAttribute("data-i")];
            p.qty = Math.max(0, p.qty + parseInt(btn.getAttribute("data-d"), 10));
            renderCart();
        });
        renderCart();
    }

    // ---------- Demo kiểm tra form đăng ký (liên hệ TMĐT) ----------
    var form = document.getElementById("demoForm");
    if (form) {
        var rules = {
            dName:  function (v) { return v.trim().length >= 3 ? "" : "Họ tên tối thiểu 3 ký tự."; },
            dEmail: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Email chưa đúng định dạng."; },
            dPhone: function (v) { return /^0\d{9}$/.test(v) ? "" : "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0."; },
            dPass:  function (v) { return v.length >= 8 && /\d/.test(v) ? "" : "Mật khẩu tối thiểu 8 ký tự và có ít nhất 1 chữ số."; }
        };
        function check(input) {
            var err = rules[input.id](input.value), field = input.parentElement;
            field.classList.toggle("invalid", err !== "");
            field.querySelector(".msg").textContent = err;
            return err === "";
        }
        Object.keys(rules).forEach(function (id) {
            document.getElementById(id).addEventListener("blur", function (e) { check(e.target); });
        });
        form.addEventListener("submit", function (e) {
            e.preventDefault();                       // chặn gửi form để tự kiểm tra bằng JavaScript
            var ok = true;
            Object.keys(rules).forEach(function (id) { if (!check(document.getElementById(id))) ok = false; });
            document.getElementById("formResult").textContent = ok ? "Dữ liệu hợp lệ – có thể gửi đăng ký." : "";
        });
    }

    // ---------- Nút lên đầu trang + làm nổi bật mục menu đang xem ----------
    var toTop = document.getElementById("toTop");
    var sections = document.querySelectorAll("section.block[id]");
    var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
    window.addEventListener("scroll", function () {
        if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
        var current = "";
        sections.forEach(function (s) { if (window.scrollY + 120 >= s.offsetTop) current = s.id; });
        navAnchors.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
    });
    if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // ---------- Đếm số từ của đoạn tự đánh giá ----------
    var reflect = document.getElementById("reflectText"), wc = document.getElementById("wordCount");
    if (reflect && wc) {
        wc.textContent = "Số từ: " + reflect.innerText.trim().split(/\s+/).length;
    }
});
