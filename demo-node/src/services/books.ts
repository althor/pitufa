import { Book } from "../models/book";
import createDebug from "debug";
import * as db from "../persistence/db";

const debug = createDebug("myapp:booksService");

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

  let deleted = await db.runDeleteQuery(`DELETE FROM books WHERE id = ${id}`);
  return deleted;
}

export async function create(book: Book) {
  debug("Creando libro: ", book);

  //Ejecutamos la inserción en la base de datos y obtenemos el id del nuevo libro
  const newId = await db.runQuery(
    "Insert into books (title, author) values ('" +
      book.title +
      "', '" +
      book.author +
      "')"
  );

  // Buscamos el libro recién insertado y lo devolvemos
  return findById(newId);
}
