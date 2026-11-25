/* Trang chính: hiển thị, tìm kiếm, lọc, thêm / sửa / xóa task */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var esc = Store.esc;
  var ST = { todo: 'Chưa làm', doing: 'Đang làm', done: 'Hoàn thành' };
  var PR = { 'Cao': 0, 'Trung bình': 1, 'Thấp': 2 };
  var state = { scope: 'today', all: [], editId: null };

  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove('show'); }, 1800); }
  function fmtDate(s) { var p = s.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }

  function refresh() { return Store.list().then(function (a) { state.all = a; render(); }); }

  function filtered() {
    var today = Store.today(), q = $('q').value.trim().toLowerCase();
    var fs = $('fStatus').value, fp = $('fPrio').value, fc = $('fCat').value;
    return state.all.filter(function (t) {
      if (state.scope === 'today' && t.due !== today) return false;
      if (fs && t.status !== fs) return false;
      if (fp && t.priority !== fp) return false;
      if (fc && t.category !== fc) return false;
      if (q && (t.title + ' ' + (t.description || '')).toLowerCase().indexOf(q) < 0) return false;
      return true;
    }).sort(function (a, b) {
      return (a.status === 'done') - (b.status === 'done') || a.due.localeCompare(b.due) || PR[a.priority] - PR[b.priority];
    });
  }

  function render() {
    var today = Store.today(), list = filtered(), box = $('list');
    $('heading').textContent = state.scope === 'today' ? 'Công việc hôm nay' : 'Tất cả công việc';
    var d = new Date();
    $('subtitle').textContent = 'Hôm nay là ' + d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }) + ' · ' + list.length + ' task';
    var late = state.all.filter(function (t) { return t.due < today && t.status !== 'done'; }).length;
    $('notice').innerHTML = (state.scope === 'today' && late) ? '<div class="notice">⚠️ Bạn còn <b>' + late + '</b> task quá hạn chưa hoàn thành. Chọn tab "Tất cả" để xem.</div>' : '';
    if (!list.length) { box.innerHTML = '<div class="empty">Không có task nào phù hợp. Bấm "+ Thêm task" để tạo mới.</div>'; return; }
    box.innerHTML = list.map(function (t) {
      var isLate = t.due < today && t.status !== 'done';
      return '<div class="task p-' + esc(t.priority.split(' ')[0]) + (t.status === 'done' ? ' done' : '') + '" data-id="' + t.id + '">' +
        '<input class="chk" type="checkbox" title="Đánh dấu hoàn thành" ' + (t.status === 'done' ? 'checked' : '') + '>' +
        '<div><div class="t-title">' + esc(t.title) + '</div>' + (t.description ? '<div class="t-desc">' + esc(t.description) + '</div>' : '') +
        '<div class="meta"><span class="tag st-' + t.status + '">' + ST[t.status] + '</span><span class="tag">' + esc(t.category) + '</span><span class="tag">Ưu tiên: ' + esc(t.priority) + '</span><span class="tag' + (isLate ? ' late' : '') + '">📅 ' + fmtDate(t.due) + (isLate ? ' · quá hạn' : '') + '</span></div></div>' +
        '<div class="acts"><button class="icon act-edit" title="Sửa">✏️ Sửa</button><button class="icon act-del" title="Xóa">🗑️ Xóa</button></div></div>';
    }).join('');
  }

  function find(id) { return state.all.filter(function (t) { return t.id === id; })[0]; }

  /* modal */
  function openForm(t) {
    state.editId = t ? t.id : null;
    $('mTitle').textContent = t ? 'Sửa task' : 'Thêm task';
    $('fTitle').value = t ? t.title : ''; $('fDesc').value = t ? (t.description || '') : '';
    $('fDue').value = t ? t.due : Store.today(); $('fSt').value = t ? t.status : 'todo';
    $('fP').value = t ? t.priority : 'Trung bình'; $('fC').value = t ? t.category : 'Học tập';
    $('err').textContent = ''; $('ov').classList.add('show'); $('fTitle').focus();
  }
  function closeForm() { $('ov').classList.remove('show'); }

  $('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var t = { title: $('fTitle').value.trim(), description: $('fDesc').value.trim(), due: $('fDue').value, status: $('fSt').value, priority: $('fP').value, category: $('fC').value };
    if (!t.title) { $('err').textContent = 'Vui lòng nhập tên công việc.'; return; }
    if (!t.due) { $('err').textContent = 'Vui lòng chọn ngày thực hiện.'; return; }
    var p = state.editId ? Store.update(state.editId, t) : Store.create(t);
    p.then(refresh).then(function () { closeForm(); toast(state.editId ? 'Đã cập nhật task' : 'Đã thêm task'); });
  });

  $('list').addEventListener('click', function (e) {
    var row = e.target.closest('.task'); if (!row) return;
    var t = find(+row.dataset.id); if (!t) return;
    if (e.target.classList.contains('act-edit')) openForm(t);
    else if (e.target.classList.contains('act-del')) {
      if (confirm('Xóa task "' + t.title + '"?')) Store.remove(t.id).then(refresh).then(function () { toast('Đã xóa task'); });
    } else if (e.target.classList.contains('chk')) {
      Store.update(t.id, Object.assign({}, t, { status: e.target.checked ? 'done' : 'todo' })).then(refresh);
    }
  });

  document.querySelectorAll('.tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      state.scope = b.dataset.scope;
      document.querySelectorAll('.tabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
      render();
    });
  });
  ['q', 'fStatus', 'fPrio', 'fCat'].forEach(function (id) { $(id).addEventListener('input', render); });
  $('btnAdd').addEventListener('click', function () { openForm(null); });
  $('btnCancel').addEventListener('click', closeForm);
  $('ov').addEventListener('click', function (e) { if (e.target === $('ov')) closeForm(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeForm(); });
  $('btnSeed').addEventListener('click', function () { if (confirm('Nạp lại dữ liệu mẫu? Dữ liệu hiện tại sẽ bị thay thế.')) Store.seed().then(refresh).then(function () { toast('Đã nạp dữ liệu mẫu'); }); });
  $('btnClear').addEventListener('click', function () { if (confirm('Xóa toàn bộ task?')) Store.clear().then(refresh).then(function () { toast('Đã xóa tất cả'); }); });

  Store.init().then(function () {
    $('mode').textContent = Store.mode() === 'api' ? '🗄️ SQLite' : '💾 localStorage';
    return refresh();
  });
})();
