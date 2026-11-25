#!/usr/bin/env python3
"""TODO App - phiên bản có CSDL SQLite.
Chạy:  python server.py   rồi mở http://localhost:8000
Chỉ dùng thư viện chuẩn của Python (không cần cài thêm gì)."""
import json, os, sqlite3, sys
from datetime import date, timedelta
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(ROOT, 'todo.db')
FIELDS = ('title', 'description', 'category', 'priority', 'due', 'status')
PRIORITIES = ('Cao', 'Trung bình', 'Thấp')
STATUSES = ('todo', 'doing', 'done')


def conn():
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    return c


def seed(c):
    with open(os.path.join(ROOT, 'data', 'mock-tasks.json'), encoding='utf-8') as f:
        rows = json.load(f)
    c.execute('DELETE FROM tasks')
    for r in rows:
        due = (date.today() + timedelta(days=r['offset'])).isoformat()
        c.execute('INSERT INTO tasks (title, description, category, priority, due, status) VALUES (?,?,?,?,?,?)',
                  (r['title'], r['description'], r['category'], r['priority'], due, r['status']))
    c.commit()


def init_db():
    new = not os.path.exists(DB)
    with conn() as c:
        with open(os.path.join(ROOT, 'schema.sql'), encoding='utf-8') as f:
            c.executescript(f.read())
        if new:
            seed(c)          # lần chạy đầu tiên: nạp dữ liệu mẫu


def clean(d):
    """Kiểm tra dữ liệu gửi lên; trả về (dict, lỗi)."""
    t = {k: str(d.get(k, '')).strip() for k in FIELDS}
    if not t['title']:
        return None, 'Thiếu tên công việc'
    if len(t['due']) != 10:
        return None, 'Ngày không hợp lệ'
    if t['priority'] not in PRIORITIES:
        t['priority'] = 'Trung bình'
    if t['status'] not in STATUSES:
        t['status'] = 'todo'
    t['category'] = t['category'] or 'Cá nhân'
    return t, None


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def send_json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def body(self):
        n = int(self.headers.get('Content-Length') or 0)
        try:
            return json.loads(self.rfile.read(n) or b'{}')
        except ValueError:
            return {}

    def task_id(self):
        p = urlparse(self.path).path.rstrip('/').split('/')
        return int(p[3]) if len(p) == 4 and p[3].isdigit() else None

    def do_GET(self):
        path = urlparse(self.path).path
        if path == '/api/tasks':
            with conn() as c:
                return self.send_json([dict(r) for r in c.execute('SELECT * FROM tasks ORDER BY due, id')])
        if path.endswith(('.db', '.py', '.sql')):
            return self.send_error(404)
        return super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        with conn() as c:
            if path == '/api/tasks':
                t, err = clean(self.body())
                if err:
                    return self.send_json({'error': err}, 400)
                cur = c.execute('INSERT INTO tasks (title, description, category, priority, due, status) VALUES (?,?,?,?,?,?)',
                                [t[k] for k in FIELDS])
                c.commit()
                t['id'] = cur.lastrowid
                return self.send_json(t, 201)
            if path == '/api/seed':
                seed(c)
                return self.send_json({'ok': True})
            if path == '/api/clear':
                c.execute('DELETE FROM tasks')
                c.commit()
                return self.send_json({'ok': True})
        self.send_error(404)

    def do_PUT(self):
        i = self.task_id()
        t, err = clean(self.body())
        if i is None or err:
            return self.send_json({'error': err or 'Sai đường dẫn'}, 400)
        with conn() as c:
            c.execute('UPDATE tasks SET title=?, description=?, category=?, priority=?, due=?, status=? WHERE id=?',
                      [t[k] for k in FIELDS] + [i])
            c.commit()
        t['id'] = i
        self.send_json(t)

    def do_DELETE(self):
        i = self.task_id()
        if i is None:
            return self.send_json({'error': 'Sai đường dẫn'}, 400)
        with conn() as c:
            c.execute('DELETE FROM tasks WHERE id=?', (i,))
            c.commit()
        self.send_json({'ok': True})


if __name__ == '__main__':
    init_db()
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print('TODO App đang chạy tại http://localhost:%d  (Ctrl+C để dừng)' % port)
    ThreadingHTTPServer(('', port), Handler).serve_forever()
