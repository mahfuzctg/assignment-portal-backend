// submission.routes.ts
import express from "express";
import { SubmissionController } from "./submission.controller";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { submissionZodSchema } from "./submission.validation";

const router = express.Router();

// Student submits or updates assignment submission
router.post("/", auth, validateRequest(submissionZodSchema), SubmissionController.submitAssignment);

// Student views own submissions with status & feedback
router.get("/mine", auth, SubmissionController.getMySubmissions);


router.get("/", auth, SubmissionController.getAllSubmissions); // Instructor views all submissions
router.patch("/:id", auth, SubmissionController.updateSubmission); // Instructor updates feedback/status


export const SubmissionRoutes = router;
