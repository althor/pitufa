const express = require("express");
import { Request, Response } from "express";
var app = express();
interface RequestHandler {
  (req: Request, res: Response): void;
}

app.get("/", function (request: Request, response: Response) {
  console.log("Received request from %s", request.ip);
  response.send("Hello World!");
});
app.listen(10000, function () {
  console.log("Started application on port %d", 10000);
});
