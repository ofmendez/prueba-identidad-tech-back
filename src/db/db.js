import { Database } from 'bun:sqlite';
import path from 'bun:path';

const db = new Database(path.resolve(__dirname, 'db.sqlite'));
db.exec('PRAGMA journal_mode = WAL;');

export { db };
