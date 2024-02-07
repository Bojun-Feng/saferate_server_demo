// Import necessary modules from their respective packages
import express, { Request, Response } from "express";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

// Create an Express router to define routes for our application
const router = express.Router();

// Define a function that returns a Promise, executing a command in a child process
const spawnPromise = (cmd: string, args: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Spawn a child process to run the command with the specified arguments
      const childProcess: ChildProcessWithoutNullStreams = spawn(cmd, args);

      // Listen for data event on the stdout stream
      childProcess.stdout.on("data", (data: Buffer) => {
        resolve(data.toString()); // Resolve the promise with the output data as a string
      });

      // Handle child process errors
      childProcess.on("error", (err: Error) => {
        reject(new Error(err.message)); // Reject the promise with the error
      });

      // Set a timeout to resolve the promise if the process does not terminate within 10 seconds
      setTimeout(() => resolve("Process did not terminate"), 10000);
    } catch (e) {
      reject(e); // Reject the promise if an exception occurs
    }
  });
};

// Define a function to log events to the console with a timestamp
const logEvent = (consoleLogMessage: string): void => {
  console.log("-".repeat(60));
  console.log(new Date().toUTCString()); // Log the current date and time in UTC
  console.log(consoleLogMessage); // Log the custom message
};

// Define a POST route handler for '/predict'
router.post("/predict", (req: Request, res: Response) => {
  const { arg1, arg2 } = req.body; // Destructure arg1 and arg2 from the request body
  let predictionVal: string = "Something went wrong...";

  // Log the received request
  logEvent(`Request Received:  X=${arg1.toString()}, Y=${arg2.toString()}`);

  // Execute the Python script with the provided arguments
  const pythonPromise: Promise<string> = spawnPromise("python3", ["scripts/result.py", arg1, arg2]);

  // Handle the promise returned by spawnPromise
  pythonPromise.then(
    (result: string) => {
      predictionVal = result;
      logEvent(`Success: ${predictionVal}`);
      res.json({ prediction: predictionVal }); // Send the prediction result in the response
    },
    (error: Error) => {
      console.error(error); // Log the error to the console
      res.status(500).send("An error occurred while processing your request."); // Send an error response
    }
  );
});

// Export the router for use in other parts of the application
export default router;
