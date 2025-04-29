import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/dbConnection.js";

dotenv.config();
const app = express();
const PORT = process.env?.PORT || 8000;

// Connect to DB:
await dbConnection(); // 👈 Modern top-level await

// Accept JSON:

// Logger:

// Query Handler:

// Routes:

// Error Handler:

// run Server
app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
