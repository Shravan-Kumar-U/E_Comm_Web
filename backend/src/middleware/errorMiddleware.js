const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    let error = err;

    // If the error isn't an instance of our ApiError, wrap it in one
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    // Send the structured error response
    res.status(error.statusCode).json({
        success: error.success,
        message: error.message,
        errors: error.errors,
        // Only show the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
};

module.exports = errorHandler;