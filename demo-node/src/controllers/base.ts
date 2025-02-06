import { Request, Response } from "express";

export async function base(req: Request, res: Response) {
  console.log("/ invoked");
  res.send('Hola mundo!');
}