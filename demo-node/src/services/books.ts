import { Book } from "../models/book";
import createDebug from "debug";

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

export function findAll() {
  debug("Buscando todos los libros");
  return books;
}

export function findById(id: number) {
  debug("Buscando libro con id: ", id);
  return books.find((book) => book.id === id);
}

export function deleteById(id: number) {
  debug("Borrando libro con id: ", id);
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return false;
  }
  books.splice(index, 1);
  return true;
}

export function create(book: Book) {
  debug("Creando libro: ", book);
  book.id = ++id;
  books.push(book);
  return book;
}
