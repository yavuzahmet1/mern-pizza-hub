import express from "express";
import "dotenv/config";
import dbConnection from "./src/config/dbConnection.js";
import queryHandler from "./src/middleware/queryHandler.js";
import router from "./src/routes/user.js";

const app = express();
const PORT = process.env?.PORT || 8000;

// Accept JSON:
app.use(express.json());

// Connect to DB:
await dbConnection(); // 👈 Modern top-level await

// Accept JSON:

// Logger:

// Query Handler:
app.use(queryHandler);

// Routes:
app.use("/", router);

// Error Handler:

// run Server
app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);

21.27;
