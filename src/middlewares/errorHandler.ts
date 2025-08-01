
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

interface ErrorDetail {
  path: string;
  message: string;
}

export const globalErrorHandler: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: ErrorDetail[] = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorDetails = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = [{ path: "", message: err.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errorDetails,
    stack: process.env.NODE_ENV !== "production" ? (err as Error).stack : undefined,
  });
};
