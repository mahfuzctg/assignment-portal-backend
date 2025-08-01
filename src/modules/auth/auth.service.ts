import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthUser, ITokenPayload } from "./auth.interface";
import config from "../../config";
import { User } from "../user/user.model";

if (!config.jwt_secret) {
  throw new Error("JWT secret is not defined in environment variables");
}

export const AuthService = {
  registerUser: async (payload: any) => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = await User.create({
      ...payload,
      password: hashedPassword,
    });

    return {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  },

  loginUser: async ({ email, password }: IAuthUser) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password as any);
    if (!passwordMatch) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      } as ITokenPayload,
      config.jwt_secret, 
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
