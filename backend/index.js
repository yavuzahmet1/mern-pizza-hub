import express from "express";
import "dotenv/config";
import dbConnection from "./src/config/dbConnection.js";
import queryHandler from "./src/middlewares/queryHandler.js";
import router from "./src/routes/index.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import authentication from "./src/middlewares/authentication.js";

const app = express();
const PORT = process.env?.PORT || 8000;

app.set("query parser", "extended");

// Accept JSON:
app.use(express.json());

// Connect to DB:
await dbConnection(); // 👈 Modern top-level await

// Accept JSON:

// Logger:

// Query Handler:
app.use(queryHandler);

// Routes:
app.use("/api", router);

// Authentication
app.use(authentication);

//static route
app.use("/images", express.static("./uploads"));

// Error Handler:
app.use(errorHandler);
// run Server
app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
