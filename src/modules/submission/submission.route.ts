import express from "express";
import { SubmissionController } from "./submission.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { submissionZodSchema } from "./submission.validation";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// Student submits assignment
router.post(
  "/",
  auth,
  validateRequest(submissionZodSchema),
  SubmissionController.submitAssignment
);

// Instructor views all student submissions
router.get(
  "/",
  auth,
  SubmissionController.getAllSubmissions
);

// Instructor updates submission status + feedback
router.patch(
  "/:id",
  auth,
  SubmissionController.updateSubmissionStatus
);

// Instructor gets status-wise 
router.get(
  "/stats",
  auth,
  SubmissionController.getSubmissionStats
);

export const SubmissionRoutes = router;
