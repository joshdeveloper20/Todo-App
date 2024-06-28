const express = require("express");
require("./db/connect");
require("dotenv").config();
const routes = require("./routes/todo-route");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static("public"));
// ROUTES
app.use("/api/todos", routes);

// PORT
const port = 4043;

// Listen on port
app.listen(port, () => {
  console.log(`Server Listening on port: ${port}`);
});
