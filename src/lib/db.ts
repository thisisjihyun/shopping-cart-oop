import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");

const db = new Database(dbPath);
// db.prepare('DELETE FROM CartItem').run();
// db.exec(`DROP TABLE IF EXISTS CartItem`);

db.exec(`
  CREATE TABLE IF NOT EXISTS CartItem (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      productName TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice REAL NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
