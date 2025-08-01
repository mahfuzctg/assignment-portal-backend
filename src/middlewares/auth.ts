import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { Types } from "mongoose";

interface JwtPayload {
  _id:  Types.ObjectId | string; 
  email: string;
  role: string;
}

export const auth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
          // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden!" });
  }
};
