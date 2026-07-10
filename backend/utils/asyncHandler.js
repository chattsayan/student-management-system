/**
 * Wraps async route handlers so errors are passed to Express error middleware.
 * Avoids try/catch in every controller function.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
