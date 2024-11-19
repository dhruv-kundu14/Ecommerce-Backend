// Middleware for handling 404 errors (Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  console.log("NOT FOUND: Original URL " + req.originalUrl); // Helpful for debugging
  next(error); // Pass the error to the error handler
};

// General error handler
const errorHandler = (err, req, res, next) => {
  // Set status code if it's not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Specific handling for MongoDB CastErrors (e.g., invalid ObjectId)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Log detailed error in development mode for debugging
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack); // This will log the full stack trace in development mode
  }

  // Send a response with status and error details
  res.status(statusCode).json({
    StatusCode: statusCode,
    Status: "Error",
    Result: "",
    ErrorMessage: process.env.NODE_ENV === "production" ? null : err.stack, // Hides stack in production
  });
};

module.exports = { notFound, errorHandler };
