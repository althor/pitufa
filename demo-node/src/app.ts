import express from "express";
import path from "path";
import cors from "cors";

// Controllers (route handlers)
import * as booksController from "./controllers/books";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get("/books", booksController.findAll);
app.get("/books/:id", booksController.findById);
app.delete("/books/:id", booksController.deleteById);
app.post("/books", booksController.create);

export default app;
