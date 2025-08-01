import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";


export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.registerUser(req.body);

      sendResponse({
        res,
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.loginUser(req.body);

      sendResponse({
        res,
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
