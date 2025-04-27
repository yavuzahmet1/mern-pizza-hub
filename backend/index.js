"use strict";
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// Accept JSON:
app.use(express.json());

// Logger:
app.use(require("./src/middlewares/logger"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

// Routes:

// routes/index.js:
app.use("/", require("./src/routes/"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// run server
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
