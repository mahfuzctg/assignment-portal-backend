import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/errorHandler";
import router from "./routes";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", router);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
