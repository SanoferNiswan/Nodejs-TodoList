// import {DatabaseSync} from "node:sqlite"
import Database from 'better-sqlite3';

const db = new Database(':memory:');
// const db = new DatabaseSync(':memory:');

// Enable foreign key constraints
db.exec('PRAGMA foreign_keys = ON');

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    password TEXT
   )
`)

db.exec(`
    CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
   )
`)

export default db;