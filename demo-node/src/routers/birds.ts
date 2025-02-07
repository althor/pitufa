import express from "express";
import { Request, Response } from "express";

const router = express.Router();

function listapajaros(req: Request, res: Response) {
  res.send("Lista de pájaros");
}

function aboutpajaros(req: Request, res: Response) {
  res.send("Abaout pájaros");
}

router.get("", listapajaros);

router.get("/about", aboutpajaros);

export default router;
