import type { Request, Response, NextFunction } from "express";
import createDebug from "debug";

const debug = createDebug("myapp:logger1");

export const logger1 = (req: Request, _res: Response, next: NextFunction) => {
  debug("Ejecutando logger1");
  next();
};
