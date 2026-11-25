-- Cấu trúc CSDL SQLite cho TODO App
CREATE TABLE IF NOT EXISTS tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'Cá nhân',
  priority    TEXT NOT NULL DEFAULT 'Trung bình' CHECK (priority IN ('Cao','Trung bình','Thấp')),
  due         TEXT NOT NULL,                       -- định dạng YYYY-MM-DD
  status      TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','doing','done')),
  created_at  TEXT NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(due);
