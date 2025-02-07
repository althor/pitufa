import { Request, Response } from "express";

export async function base(req: Request, res: Response) {
  console.log("/ invoked");
  res.send("Hola mundo!");
}

// Rutas que devuelven HTML - La idea es que se devuelva un HTML
export async function home(req: Request, res: Response) {
  console.log("/home invoked");
  res.setHeader("Content-Type", "text/html"); // Esto es para que el navegador sepa que le estamos enviando un HTML
  res.send("<h1>Home</h1>"); // Esto es lo que se envía al navegador
}
