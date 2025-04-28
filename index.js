import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/configs/dbConnection.js";
import logger from "./src/middlewares/logger.js";
import queryHandler from "./src/middlewares/queryHandler.js";
import asyncHandler from "./src/middleware/asyncHandler.js";
// import mainRouter from "./src/routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env?.PORT || 8000;

// Connect to DB:
await dbConnection(); // 👈 Modern top-level await

// Accept JSON:
// app.use(express.json());

// Logger:
app.use(logger);

// Query Handler:
app.use(queryHandler);

// Routes:
// app.use("/", mainRouter);

// Error Handler:
app.use(asyncHandler);

// run Server
app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
