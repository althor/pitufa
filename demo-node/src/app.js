const express = require("express");
var app = express();
app.get("/", function (request, response) {
    console.log("Received request from %s", request.ip);
  response.send("Hello World!");
});
app.listen(10000, function () {
  console.log("Started application on port %d", 10000);
});
