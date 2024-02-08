// Import necessary modules from their respective packages
import express, { Request, Response } from "express";
// Import the async function from the TypeScript file
import { generateResponse } from "./llamaindex";

// Create an Express router to define routes for our application
const router = express.Router();

// Define a function to log events to the console with a timestamp
const logEvent = (consoleLogMessage: string): void => {
  console.log("-".repeat(60));
  console.log(new Date().toUTCString()); // Log the current date and time in UTC
  console.log(consoleLogMessage); // Log the custom message
};

// Define a POST route handler for '/predict'
router.post("/predict", async (req: Request, res: Response) => {
  const { arg1, arg2 } = req.body; // Destructure arg1 and arg2 from the request body

  // Log the received request
  logEvent(`Request Received!\nArg1:${arg1.toString()}\nArg2:${arg2.toString()}`);

  try {
    // Call the imported async function and wait for the response
    const predictionVal = await generateResponse(arg1);

    // Log the success event
    logEvent(`Success!\n${predictionVal}`);

    // Send the prediction result in the response
    res.json({ prediction: predictionVal });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).send("An error occurred while processing your request."); // Send an error response
  }
});

// Export the router for use in other parts of the application
export default router;
