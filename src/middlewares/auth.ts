import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const auth: RequestHandler = (req: any, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden!" });
  }
};
