import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", UserRoutes);


export default router;
