import express from "express";
import * as booksController from "../controllers/books";

const router = express.Router();

// Rutas API REST - servicios expuestos para gestión de entidades en modo rest.
router
  .route("/books/:id")
  .get(booksController.findById)
  .delete(booksController.deleteById);

router.route("").get(booksController.findAll).post(booksController.create);

export default router;
