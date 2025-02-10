import { Request, Response, NextFunction } from "express";
import * as BookService from "../services/books";
import createDebug from "debug";
import { ApplicationError } from "../errors/ApplicationError";

const debug = createDebug("myapp:booksController");

export function findAll(req: Request, res: Response) {
  debug("/books invoked");
  const books = BookService.findAll();
  res.status(200).json(books);
}

export function findById(req: Request, res: Response, next: NextFunction) {
  debug("/books/:id invoked");
  const id = parseInt(req.params.id);
  const book = BookService.findById(id);
  if (!book) {
    throw new ApplicationError("Not found", 404, "Book not found");
  } else {
    res.status(200).json(book);
  }
}

export function deleteById(req: Request, res: Response, next: NextFunction) {
  debug("/books/:id invoked");
  const id = parseInt(req.params.id);
  const deleted = BookService.deleteById(id);
  if (!deleted) {
    throw new ApplicationError("Not found", 404, "Book not found");
  } else {
    res.status(204).send();
  }
}

export function create(req: Request, res: Response) {
  debug("/books invoked");
  const bookData = req.body;
  const createdBook = BookService.create(bookData);
  res.status(201).json(createdBook);
}
