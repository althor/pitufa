import { Book } from "../models/book";
import createDebug from "debug";
import * as db from "../persistence/db";

const debug = createDebug("myapp:booksService");

let books: Book[] = [];

// Initialize with dummy data
let id = 0;
books.push(new Book(++id, "The Great Gatsby", "F. Scott Fitzgerald"));
books.push(new Book(++id, "A Farewell to Arms", "Ernest Hemingway"));
books.push(new Book(++id, "The Catcher in the Rye", "J.D. Salinger"));
books.push(new Book(++id, "To Kill a Mockingbird", "Harper Lee"));
books.push(new Book(++id, "1984", "George Orwell"));
books.push(new Book(++id, "Brave New World", "Aldous Huxley"));

export async function findAll(): Promise<Book[]> {
  debug("Buscando todos los libros");

  try {
    let rows = await db.getAllRows("SELECT * FROM books");
    debug("Rows: ", rows);
    let books: Book[] = rows.map((row) => {
      return new Book(row.id, row.title, row.author);
    });
    return books;
  } catch (err) {
    throw new Error("Internal Server Error!");
  }
}

export async function findById(id: number): Promise<Book | undefined> {
  debug("Buscando libro con id: ", id);
  // db.getOneRow(`SELECT * FROM books WHERE id = ${id}`).then((book) => {
  //   return book;
  // }).catch((err) => { return undefined; });

  try {
    let row = await db.getOneRow(`SELECT * FROM books WHERE id = ${id}`);
    debug("Book: ", row);
    if (row) {
      const book = new Book(row.id, row.title, row.author);
      return book;
    } else {
      return undefined;
    }
  } catch (err) {
    throw new Error("Internal Server Error!");
  }
  // return books.find((book) => book.id === id);
}

export async function deleteById(id: number): Promise<boolean> {
  debug("Borrando libro con id: ", id);

  // Comprobar si el libro existe
  let row = await db.getOneRow(`SELECT * FROM books WHERE id = ${id}`);
  debug("Book: ", row);

  if (row) {
    await db.runQuery(`DELETE FROM books WHERE id = ${id}`);
    return true;
  } else {
    return false;
  }

  return true;
}

export async function create(book: Book): Promise<Book> {
  debug("Creando libro: ", book);
  book.id = ++id;
  books.push(book);
  return book;
}
