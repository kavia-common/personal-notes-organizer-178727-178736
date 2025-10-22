/**
 * Database module that uses expo-sqlite on native, and a no-op in-memory shim on web.
 * This prevents crashes in web preview environments where SQLite is not available.
 */
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

export type Note = {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

let db: SQLite.SQLiteDatabase | null = null;

// Simple in-memory store used only on web to avoid crashes.
const memoryStore: Note[] = [];
let memId = 1;

/**
 * Determine if running on web.
 */
function isWeb(): boolean {
  // Platform.OS === 'web' in Expo web preview
  return Platform.OS === 'web';
}

/**
 * Initialize database and create notes table if not exists.
 */
// PUBLIC_INTERFACE
export async function initDB(): Promise<void> {
  if (isWeb()) {
    // No-op for web; memoryStore is used.
    return;
  }
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
  if (isWeb()) {
    // Return a copy sorted by updated_at desc
    return [...memoryStore].sort(
      (a, b) => new Date(b.updated_at || '').getTime() - new Date(a.updated_at || '').getTime()
    );
  }
  if (!db) await initDB();
  const rows = await db!.getAllAsync<Note>('SELECT * FROM notes ORDER BY updated_at DESC;');
  return rows;
}

/**
 * Get single note by id.
 */
// PUBLIC_INTERFACE
export async function getNoteById(id: number): Promise<Note | null> {
  if (isWeb()) {
    return memoryStore.find((n) => n.id === id) ?? null;
  }
  if (!db) await initDB();
  const row = await db!.getFirstAsync<Note>('SELECT * FROM notes WHERE id = ?;', [id]);
  return row ?? null;
}

/**
 * Create note and return inserted id.
 */
// PUBLIC_INTERFACE
export async function createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const now = new Date().toISOString();
  if (isWeb()) {
    const created: Note = { id: memId++, title: note.title, content: note.content, created_at: now, updated_at: now };
    memoryStore.unshift(created);
    return created.id!;
  }
  if (!db) await initDB();
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
  const now = new Date().toISOString();
  if (isWeb()) {
    const idx = memoryStore.findIndex((n) => n.id === id);
    if (idx !== -1) {
      const current = memoryStore[idx];
      memoryStore[idx] = {
        ...current,
        title: data.title ?? current.title,
        content: data.content ?? current.content,
        updated_at: now,
      };
    }
    return;
  }
  if (!db) await initDB();
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
  if (isWeb()) {
    const idx = memoryStore.findIndex((n) => n.id === id);
    if (idx !== -1) memoryStore.splice(idx, 1);
    return;
  }
  if (!db) await initDB();
  await db!.runAsync('DELETE FROM notes WHERE id = ?;', [id]);
}
