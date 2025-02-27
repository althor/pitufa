import { Request, Response, NextFunction } from "express";
import createDebug from "debug";
import { ApplicationError } from "../errors/ApplicationError";

const debug = createDebug("myapp:baseController");

export function base(req: Request, res: Response) {
  debug("/ invoked");
  res.json({ message: "Hello World!" });
}

// Ejemplo de un error que se produce en una función síncrona
export function error(req: Request, res: Response) {
  throw new ApplicationError("Algo ha cascado", 500, "Algo ha cascado");
}

// Ejemplo de un error que se produce en una función asíncrona
// Es necesario capturar el error con un try-catch y llamar a next(err) para que Express lo maneje
export async function errorAsync(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    throw new ApplicationError("Algo ha cascado", 500, "Algo ha cascado");
  } catch (err) {
    next(err);
  }
}

// Rutas que devuelven HTML - La idea es que se devuelva un HTML
export function home(req: Request, res: Response) {
  debug("/home invoked");
  res.setHeader("Content-Type", "text/html"); // Esto es para que el navegador sepa que le estamos enviando un HTML
  res.send("<h1>Home</h1>"); // Esto es lo que se envía al navegador
}
