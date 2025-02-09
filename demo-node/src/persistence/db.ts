import { Database } from "sqlite3";
import createDebug from "debug";

const debug = createDebug("myapp:db");
let db: Database;

export const connect = () => {
  db = new Database("./database.sqlite");
};

export const close = () => {
  db.close();
};

export function initializeDatabase(): void {
  // Create users table if it doesn't exist
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          isbn TEXT NOT NULL,
          year INTEGER NOT NULL,
          pages INTEGER NOT NULL
      )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table initialized successfully");
    }
  });
  const sampleData = [
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-3-16-148410-2",
      year: 1951,
      pages: 230,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-3-16-148410-3",
      year: 1960,
      pages: 240,
    },
    {
      title: "1984",
      author: "George Orwell",
      isbn: "978-3-16-148410-4",
      year: 1949,
      pages: 250,
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      isbn: "978-3-16-148410-5",
      year: 1932,
      pages: 260,
    },
  ];

  sampleData.forEach((book) => {
    const insertQuery = `INSERT INTO books (title, author, isbn, year, pages) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      insertQuery,
      [book.title, book.author, book.isbn, book.year, book.pages],
      (err) => {
        if (err) {
          console.error("Error inserting sample data into books table:", err);
        } else {
          console.log(`Sample data for "${book.title}" inserted successfully`);
        }
      }
    );
  });
}
export function runQuery(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(query, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function getAllRows(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getOneRow(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
