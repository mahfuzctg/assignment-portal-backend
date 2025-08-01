import express from "express";

import { UserRoutes } from "../modules/user/user.route";
import { AssignmentRoutes } from "../modules/assignment/assignment.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { SubmissionRoutes } from "../modules/submission/submission.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/assignments" , AssignmentRoutes);
router.use("/submission" , SubmissionRoutes);


export default router;
