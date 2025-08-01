import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
    stack: err.stack,
  });
};
