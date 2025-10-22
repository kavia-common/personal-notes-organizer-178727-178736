import * as SQLite from 'expo-sqlite';

export type Note = {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize database and create notes table if not exists.
 */
// PUBLIC_INTERFACE
export async function initDB(): Promise<void> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('notes.db');
  }
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

/**
 * Get all notes ordered by updated_at DESC.
 */
// PUBLIC_INTERFACE
export async function getNotes(): Promise<Note[]> {
  if (!db) await initDB();
  const rows = await db!.getAllAsync<Note>('SELECT * FROM notes ORDER BY updated_at DESC;');
  return rows;
}

/**
 * Get single note by id.
 */
// PUBLIC_INTERFACE
export async function getNoteById(id: number): Promise<Note | null> {
  if (!db) await initDB();
  const row = await db!.getFirstAsync<Note>('SELECT * FROM notes WHERE id = ?;', [id]);
  return row ?? null;
}

/**
 * Create note and return inserted id.
 */
// PUBLIC_INTERFACE
export async function createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  if (!db) await initDB();
  const now = new Date().toISOString();
  const result = await db!.runAsync(
    'INSERT INTO notes (title, content, created_at, updated_at) VALUES (?, ?, ?, ?);',
    [note.title, note.content, now, now]
  );
  return result.lastInsertRowId ?? 0;
}

/**
 * Update note by id.
 */
// PUBLIC_INTERFACE
export async function updateNote(id: number, data: Partial<Pick<Note, 'title' | 'content'>>): Promise<void> {
  if (!db) await initDB();
  const now = new Date().toISOString();
  const titleSet = data.title ?? (await getNoteById(id))?.title ?? '';
  const contentSet = data.content ?? (await getNoteById(id))?.content ?? '';
  await db!.runAsync(
    'UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?;',
    [titleSet, contentSet, now, id]
  );
}

/**
 * Delete note by id.
 */
// PUBLIC_INTERFACE
export async function deleteNote(id: number): Promise<void> {
  if (!db) await initDB();
  await db!.runAsync('DELETE FROM notes WHERE id = ?;', [id]);
}
