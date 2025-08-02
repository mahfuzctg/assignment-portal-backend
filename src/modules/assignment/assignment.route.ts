import express from "express";
import { AssignmentController } from "./assignment.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth, AssignmentController.create);
router.get("/my", auth, AssignmentController.getMyAssignments);
router.get("/", AssignmentController.getAllAssignments);



export const AssignmentRoutes = router;
