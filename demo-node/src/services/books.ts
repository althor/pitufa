import { Book } from "../models/book";

let books: Book[] = [];

// Initialize with dummy data
books.push(new Book(1, "The Great Gatsby", "F. Scott Fitzgerald"));
books.push(new Book(2, "A Farewell to Arms", "Ernest Hemingway"));
books.push(new Book(3, "The Catcher in the Rye", "J.D. Salinger"));
books.push(new Book(4, "To Kill a Mockingbird", "Harper Lee"));
books.push(new Book(5, "1984", "George Orwell"));

export async function findAll() {
  return books;
}

export async function findById(id: number) {
  return books.find((book) => book.id === id);
}
