/* Lớp lưu trữ: tự chọn SQLite (qua server.py) hoặc localStorage (không cần CSDL). */
(function () {
  var KEY = 'todo_tasks_v1';
  var mode = 'local';

  function z(n) { return String(n).padStart(2, '0'); }
  function fmt(d) { return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); }
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return fmt(d); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function mockList() {
    return window.MOCK_TASKS.map(function (m, i) {
      return { id: i + 1, title: m.title, description: m.description, category: m.category, priority: m.priority, due: addDays(m.offset), status: m.status };
    });
  }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var mem = null;                       // dự phòng khi localStorage bị chặn

  function api(method, url, body) {
    return fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  var Store = {
    esc: esc, today: function () { return fmt(new Date()); },
    mode: function () { return mode; },
    init: function () {
      return fetch('api/tasks', { cache: 'no-store' })
        .then(function (r) {
          if (!r.ok || (r.headers.get('content-type') || '').indexOf('json') < 0) throw 0;
          mode = 'api';
        })
        .catch(function () {
          mode = 'local';
          var a = load();
          if (!a) { a = mockList(); save(a); }
          mem = a;
        });
    },
    list: function () {
      if (mode === 'api') return api('GET', 'api/tasks');
      return Promise.resolve((load() || mem || []).slice());
    },
    create: function (t) {
      if (mode === 'api') return api('POST', 'api/tasks', t);
      var a = load() || mem || [];
      t.id = a.reduce(function (m, x) { return Math.max(m, x.id); }, 0) + 1;
      a.push(t); mem = a; save(a); return Promise.resolve(t);
    },
    update: function (id, t) {
      if (mode === 'api') return api('PUT', 'api/tasks/' + id, t);
      var a = load() || mem || [];
      a = a.map(function (x) { return x.id === id ? Object.assign({}, x, t, { id: id }) : x; });
      mem = a; save(a); return Promise.resolve(t);
    },
    remove: function (id) {
      if (mode === 'api') return api('DELETE', 'api/tasks/' + id);
      var a = (load() || mem || []).filter(function (x) { return x.id !== id; });
      mem = a; save(a); return Promise.resolve({});
    },
    seed: function () {
      if (mode === 'api') return api('POST', 'api/seed');
      var a = mockList(); mem = a; save(a); return Promise.resolve(a);
    },
    clear: function () {
      if (mode === 'api') return api('POST', 'api/clear');
      mem = []; save([]); return Promise.resolve([]);
    }
  };
  window.Store = Store;
})();
