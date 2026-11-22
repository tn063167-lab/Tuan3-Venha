/*
 * Bài tập jQuery cho trang LMS (Moodle) của UEH.
 * Cách dùng: đăng nhập LMS, mở trang môn học, nhấn F12 -> tab Console,
 * dán toàn bộ đoạn này và Enter. (Trang LMS đã có sẵn jQuery.)
 * Nếu selector không khớp giao diện LMS của bạn, hãy Inspect phần tử và sửa lại các hằng số SEL_*.
 */
(function ($) {
  // ---------- Đoạn mẫu của đề: in tất cả bài tập ----------
  var assignments = [];
  $(".modtype_assign").each(function (index, value) {
    $(value).find(".instancename").each(function (index_Instancename, value_Instancename) {
      var $n = $(value_Instancename).clone();
      $n.find(".accesshide").remove();            // bỏ chữ ẩn "Bài tập"
      var text = $n.text().trim();
      assignments.push(text);
      console.log(text);
    });
  });

  // ---------- Yêu cầu 1: in bài nộp thứ 5 ----------
  console.log("===== Bài nộp thứ 5 =====");
  console.log(assignments.length >= 5 ? assignments[4] : "Môn học chỉ có " + assignments.length + " bài tập");

  // ---------- Yêu cầu 2: mỗi chủ đề có bài tập không, deadline ngày nào ----------
  var SEL_SECTION = "li.section, .course-content .section";
  var SEL_TITLE   = ".sectionname, h3.sectionname, [data-for='section_title']";
  var SEL_DATES   = ".activity-dates, [data-region='activity-dates'], .dimmed_text, .text-muted";

  console.log("===== Chủ đề và bài tập =====");
  var rows = [];
  $(SEL_SECTION).each(function () {
    var $s = $(this);
    var title = $s.find(SEL_TITLE).first().text().trim();
    if (!title) { return; }
    var $a = $s.find(".modtype_assign");
    if ($a.length === 0) {
      rows.push({ "Chủ đề": title, "Bài tập": "Không có bài tập", "Deadline": "-" });
      console.log('Chủ đề "' + title + '": không có bài tập');
      return;
    }
    $a.each(function () {
      var $n = $(this).find(".instancename").first().clone();
      $n.find(".accesshide").remove();
      var name = $n.text().trim();
      // deadline thường nằm trong dòng "Due: ..." / "Hạn nộp: ..."
      var dateText = $(this).find(SEL_DATES).text().replace(/\s+/g, " ").trim();
      var m = dateText.match(/(Due|Hạn nộp|Đến hạn|Closes|Đóng)[^A-Za-z0-9]*([^|]*)/i);
      var deadline = m ? m[2].trim() : (dateText || "Chưa hiển thị (mở bài tập để xem)");
      rows.push({ "Chủ đề": title, "Bài tập": name, "Deadline": deadline });
      console.log('Chủ đề "' + title + '": có bài tập "' + name + '", deadline: ' + deadline);
    });
  });
  console.table(rows);
})(window.jQuery);
