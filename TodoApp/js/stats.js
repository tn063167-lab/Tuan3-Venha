/* Trang thống kê */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var esc = Store.esc;
  function bars(el, rows, total) {
    el.innerHTML = rows.map(function (r) {
      var pct = total ? Math.round(r[1] * 100 / total) : 0;
      return '<div class="bar"><span>' + esc(r[0]) + '</span><div class="track"><div class="fill" style="width:' + pct + '%;' + (r[2] ? 'background:' + r[2] : '') + '"></div></div><b>' + r[1] + '</b></div>';
    }).join('');
  }
  function count(a, f) { return a.filter(f).length; }

  Store.init().then(function () {
    $('mode').textContent = Store.mode() === 'api' ? '🗄️ SQLite' : '💾 localStorage';
    return Store.list();
  }).then(function (a) {
    var today = Store.today(), n = a.length;
    var done = count(a, function (t) { return t.status === 'done'; });
    var doing = count(a, function (t) { return t.status === 'doing'; });
    var todo = count(a, function (t) { return t.status === 'todo'; });
    var late = count(a, function (t) { return t.due < today && t.status !== 'done'; });
    var tod = count(a, function (t) { return t.due === today; });
    var rate = n ? Math.round(done * 100 / n) : 0;
    $('cards').innerHTML =
      '<div class="stat brand"><b>' + n + '</b><span>Tổng số task</span></div>' +
      '<div class="stat"><b>' + tod + '</b><span>Task hôm nay</span></div>' +
      '<div class="stat ok"><b>' + done + '</b><span>Đã hoàn thành</span></div>' +
      '<div class="stat"><b>' + (doing + todo) + '</b><span>Chưa xong</span></div>' +
      '<div class="stat bad"><b>' + late + '</b><span>Quá hạn</span></div>';
    var C = 2 * Math.PI * 48;
    $('donut').innerHTML = '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="#eef0f8" stroke-width="16"/><circle cx="60" cy="60" r="48" fill="none" stroke="#16a34a" stroke-width="16" stroke-linecap="round" stroke-dasharray="' + (C * rate / 100) + ' ' + C + '"/></svg><div><div style="font-size:34px;font-weight:800;color:#16a34a">' + rate + '%</div><div style="color:#6a7488">' + done + '/' + n + ' task hoàn thành</div></div>';
    bars($('byStatus'), [['Chưa làm', todo, '#94a3b8'], ['Đang làm', doing, '#0ea5e9'], ['Hoàn thành', done, '#16a34a']], n);
    var cats = ['Học tập', 'Công việc', 'Cá nhân', 'Sức khỏe'];
    bars($('byCat'), cats.map(function (c) { return [c, count(a, function (t) { return t.category === c; })]; }), n);
    bars($('byPrio'), [['Cao', count(a, function (t) { return t.priority === 'Cao'; }), '#dc2626'], ['Trung bình', count(a, function (t) { return t.priority === 'Trung bình'; }), '#f59e0b'], ['Thấp', count(a, function (t) { return t.priority === 'Thấp'; }), '#38bdf8']], n);
    var days = [], max = 1;
    for (var i = 0; i < 7; i++) {
      var d = new Date(); d.setDate(d.getDate() + i);
      var z = function (x) { return String(x).padStart(2, '0'); };
      var key = d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
      var all = count(a, function (t) { return t.due === key; }), dn = count(a, function (t) { return t.due === key && t.status === 'done'; });
      days.push({ label: z(d.getDate()) + '/' + z(d.getMonth() + 1), all: all, done: dn, today: i === 0 }); max = Math.max(max, all);
    }
    $('days').innerHTML = days.map(function (x) {
      var h = x.all * 100 / max, dh = x.all ? x.done * 100 / x.all : 0;
      return '<div class="dcol' + (x.today ? ' today' : '') + '"><b>' + x.all + '</b><div class="dbar" style="height:' + h + '%"><i style="height:' + dh + '%"></i></div>' + x.label + '</div>';
    }).join('');
  });
})();
