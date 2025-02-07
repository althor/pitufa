import type { Request, Response, NextFunction } from "express";
import createDebug from "debug";

const debug = createDebug("myapp:logger2");

export const logger2 = (req: Request, _res: Response, next: NextFunction) => {
  debug("Ejecutando logger2");
  next();
};
