import { Request, Response } from "express";
import * as BookService from "../services/books";

/**
 * Home page.
 * @route GET /
 */
// export const findAll = (req: Request, res: Response) => {
//     console.log("/books invoked");
//   try {
//     res.status(200).json({
//       message: "findAll OK",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal Server Error!",
//     });
//   }
// };

export function findAll(req: Request, res: Response) {
  console.log("/books invoked");
  try {
    res.status(200).json(BookService.findAll());
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}
