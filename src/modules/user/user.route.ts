// src/modules/user/user.route.ts
import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", validateRequest(createUserValidationSchema), UserController.createUser);
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
