import { Request, Response } from "express";
import * as BookService from "../services/books";

export async function findAll(req: Request, res: Response) {
  console.log("/books invoked");
  BookService.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    });
}

export async function findById(req: Request, res: Response) {
  console.log("/books/:id invoked");
  const id = parseInt(req.params.id);
  BookService.findById(id)
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "Book not found",
        });
      } else {
        res.status(200).json(book);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    });
}
