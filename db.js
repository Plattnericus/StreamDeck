import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user',
    profile_picture TEXT,
    background_image TEXT,
    bio TEXT,
    created_at TEXT
  )`);
});

export default db;
