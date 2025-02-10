import { Request, Response, NextFunction } from "express";
import * as BookService from "../services/books";
import createDebug from "debug";
import { ApplicationError } from "../errors/ApplicationError";

const debug = createDebug("myapp:booksController");

export async function findAll(req: Request, res: Response, next: NextFunction) {
  debug("/books invoked");
  BookService.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      next(err);
    });
}

export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  debug("/books/:id invoked");
  const id = parseInt(req.params.id);
  BookService.findById(id)
    .then((book) => {
      if (!book) {
        throw new ApplicationError("Not found", 404, "Book not found");
      } else {
        res.status(200).json(book);
      }
    })
    .catch((err) => {
      next(err);
    });
}

export async function deleteById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  debug("/books/:id invoked");
  const id = parseInt(req.params.id);
  BookService.deleteById(id)
    .then((result) => {
      if (!result) {
        throw new ApplicationError("Not found", 404, "Book not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      next(err);
    });
}

export async function create(req: Request, res: Response, next: NextFunction) {
  debug("/books invoked");
  const book = req.body;
  BookService.create(book)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      next(err);
    });
}
