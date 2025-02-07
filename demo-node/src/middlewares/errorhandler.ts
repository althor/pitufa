import { Request, Response, NextFunction } from "express";
import createDebug from "debug";

const debug = createDebug("myapp:errorHandler");

// Error handler para capturar todos los errores que se produzcan en la aplicación y generar una respuesta adecuada para el cliente con estado 500

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(err);

  res.status(500);
  res.json({ error: err });
};
