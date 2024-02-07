// Import necessary modules with TypeScript syntax
import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import requestsRouter from "./requests"; // Assume TypeScript conversion for this import

// Create an Express application
const app: Express = express();
const PORT: number = 1111; // Define the port number on which the server will listen

// Middleware to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Use the imported router for handling requests
app.use("/", requestsRouter);

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
