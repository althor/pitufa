import { Book } from "../models/book";

let books: Book[] = [];

// Initialize with dummy data
let id = 0;
books.push(new Book(++id, "The Great Gatsby", "F. Scott Fitzgerald"));
books.push(new Book(++id, "A Farewell to Arms", "Ernest Hemingway"));
books.push(new Book(++id, "The Catcher in the Rye", "J.D. Salinger"));
books.push(new Book(++id, "To Kill a Mockingbird", "Harper Lee"));
books.push(new Book(++id, "1984", "George Orwell"));
books.push(new Book(++id, "Brave New World", "Aldous Huxley"));

export async function findAll() {
  return books;
}

export async function findById(id: number) {
  return books.find((book) => book.id === id);
}

export async function deleteById(id: number) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return false;
  }
  books.splice(index, 1);
  return true;
}

export async function create(book: Book) {
  book.id = ++id;
  books.push(book);
  return book;
}
