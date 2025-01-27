import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /
 */
export const findAll = (req: Request, res: Response) => {
    console.log("/books invoked");
  try {
    res.status(200).json({
      message: "findAll OK",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
