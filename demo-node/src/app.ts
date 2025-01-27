import express from "express";
import path from "path";

// Controllers (route handlers)
import * as booksController from "./controllers/books";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get("/books", booksController.findAll);

export default app;
