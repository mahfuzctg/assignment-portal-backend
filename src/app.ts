import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/errorHandler";
import router from "./routes";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: "https://assignment-portal-frontend.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: log all incoming requests for debug
app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// ✅ Health check or root route for Vercel or monitoring
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Assignment Submission Portal API is running successfully!",
  });
});

// API Routes
app.use("/api/v1", router);

// Handle 404 Not Found
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errors: [{ path: _req.path, message: "Route not found" }],
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
