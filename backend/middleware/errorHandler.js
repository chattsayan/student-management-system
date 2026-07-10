/**
 * Global error handler — must be registered after all routes.
 * Converts Mongoose errors into proper HTTP status codes.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Server Error";

  // Invalid MongoDB ObjectId (e.g. GET /api/students/not-an-id)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid student ID";
  }

  // Mongoose schema validation failed
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  // Duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value entered";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
