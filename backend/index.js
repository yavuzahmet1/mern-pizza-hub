import express from "express";
import "dotenv/config";
import dbConnection from "./src/config/dbConnection.js";
import queryHandler from "./src/middlewares/queryHandler.js";
import router from "./src/routes/index.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import authentication from "./src/middlewares/authentication.js";
import logger from "./src/config/logger.js"; // Logger import

const app = express();
const PORT = process.env?.PORT || 8000;

app.set("query parser", "extended");

// Accept JSON:
app.use(express.json());

// Connect to DB:
await dbConnection();

// HTTP request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Query Handler:
app.use(queryHandler);

// Routes:
app.use("/api", router);

// Authentication
app.use(authentication);

// Static route
app.use("/images", express.static("./uploads"));

// Error Handler:
app.use(errorHandler);

// Server startup
app.listen(PORT, () => {
  logger.info(`Server running on http://127.0.0.1:${PORT}`);
});
