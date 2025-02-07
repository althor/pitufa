import express from "express";
import path from "path";
import cors from "cors";

// Controllers (route handlers)
import * as booksController from "./controllers/books";
import * as baseController from "./controllers/base";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Rutas API REST - servicios expuestos para gestión de entidades en modo rest.
// Devuelven y consumen formato JSON
app.get("/", baseController.base);
app.get("/books", booksController.findAll);
app.get("/books/:id", booksController.findById);
app.delete("/books/:id", booksController.deleteById);
app.post("/books", booksController.create);


// Rutas expuestas para devolver páginas HTML, como si fuéramos un servidor apache por ejemplo
app.get("/home", baseController.home); // En este caso para la ruta /home se devuelve el código HTML de la página que hace de home.

export default app;
