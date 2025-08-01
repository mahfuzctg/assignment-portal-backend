import { Router } from "express";
import { AssignmentController } from "./assignment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAssignmentSchema, updateSubmissionStatusSchema } from "./assignment.validation";
import { auth } from "../../middlewares/auth";


const router = Router();

router.post(
  "/assignments",
  auth, 
  validateRequest(createAssignmentSchema),
  AssignmentController.createAssignment
);

router.get(
  "/assignments/submissions",
  auth,
  AssignmentController.getAllSubmissions
);

router.patch(
  "/assignments/submissions/:id/status",
  authMiddleware,
  validateRequest(updateSubmissionStatusSchema),
  AssignmentController.updateSubmissionStatus
);

router.get(
  "/assignments/submissions/status-chart",
  authMiddleware,
  AssignmentController.getSubmissionStatusChartData
);

export default router;
