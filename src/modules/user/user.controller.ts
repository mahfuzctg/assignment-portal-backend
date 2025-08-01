import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiError } from "../../utils/ApiError";

export const UserController = {
  getAllUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new ApiError(400, "User ID is required");

      const user = await UserService.getUserById(id);
      if (!user) throw new ApiError(404, "User not found");

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new ApiError(400, "User ID is required");

      const deleted = await UserService.deleteUserById(id);
      if (!deleted) throw new ApiError(404, "User not found");

      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
