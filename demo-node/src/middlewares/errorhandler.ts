import { Request, Response, NextFunction } from "express";
import createDebug from "debug";
import { ApplicationError } from "../errors/ApplicationError";

const debug = createDebug("myapp:errorHandler");

// Error handler para capturar todos los errores que se produzcan en la aplicación y generar una respuesta adecuada para el cliente con estado 500

export const errorHandler = (
  err: ApplicationError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Logamos el detalle del error. Loga el stack trace del error
  debug("Error: ", err.message);
  debug(err.stack);

  // Para todo error de tipo Error que se haya podido producir devolvemos a fuego 500 y un mensaje genérico
  if (!(err instanceof ApplicationError)) {
    res.status(500);
    res.json({ error: "Internal Server Error" });
  } else {
    // Para todo tipo de error levantado por nuestra aplicación devolvemos el código y mensaje que se haya definido en el error
    // Generamos la respuesta de error para el cliente con el código y mensaje adecuado
    res.status(err.statusCode);
    res.json({ error: err.status });
  }
};
