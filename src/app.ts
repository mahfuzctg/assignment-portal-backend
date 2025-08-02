
import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import { ApiError } from "./utils/ApiError";

dotenv.config();

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", router);

// Handle 404 Not Found
app.use((_req: Request, _res: Response) => {
  throw new ApiError(404, "Route not found");
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
