import express from "express";
import cors from "cors";
import morgan from "morgan";
import createDebug from "debug";
import { resolve } from "path";

// Controllers (route handlers)
import * as baseController from "./controllers/base";
import birdsRouter from "./routers/birds";
import bookRouter from "./routers/books";
import { logger1 } from "./middlewares/logger1";
import { logger2 } from "./middlewares/logger2";
import { errorHandler } from "./middlewares/errorhandler";

const debug = createDebug("myapp:app");

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(logger1);
app.use(logger2);

const publicPath = resolve(__dirname, "../public");

debug("Public path: %s", publicPath);
app.use(express.static(publicPath));

// Rutas

// Rutas API REST - servicios expuestos para gestión de entidades en modo rest.
// Devuelven y consumen formato JSON
app.get("/", baseController.base);
app.get("/error", baseController.error);
app.get("/errorAsync", baseController.errorAsync);

// Enrutados delegados en routers
app.use("/books", bookRouter);
app.use("/pajaros", birdsRouter);

// Rutas expuestas para devolver páginas HTML, como si fuéramos un servidor apache por ejemplo
app.get("/home", baseController.home); // En este caso para la ruta /home se devuelve el código HTML de la página que hace de home.

app.use(errorHandler);
debug("App initialized");
export default app;
