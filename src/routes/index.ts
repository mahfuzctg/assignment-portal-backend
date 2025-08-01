import express from "express";

import { UserRoutes } from "../modules/user/user.route";
import { AssignmentRoutes } from "../modules/assignment/assignment.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/assignments" , AssignmentRoutes);


export default router;
