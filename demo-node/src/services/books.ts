import { Book } from "../models/book";

let books: Book[] = [];

// Initialize with dummy data 
books.push(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
books.push(new Book("A Farewell to Arms", "Ernest Hemingway"));
books.push(new Book("The Catcher in the Rye", "J.D. Salinger"));
books.push(new Book("To Kill a Mockingbird", "Harper Lee"));
books.push(new Book("1984", "George Orwell"));

export function findAll() {
  return books;
}
