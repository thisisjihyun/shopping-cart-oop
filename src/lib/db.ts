import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS Product (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      productName TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice REAL NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
