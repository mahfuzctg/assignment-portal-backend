import express from "express";
import { AssignmentController } from "./assignment.controller";

const router = express.Router();

router.post("/", AssignmentController.create);
router.get("/my", AssignmentController.getMyAssignments);

export default router;
