// src/modules/user/user.service.ts
import { User } from "./user.model";
import { IUser } from "./user.interface";

export const UserService = {
  getAllUsers: async (): Promise<IUser[]> => {
    return await User.find().select("-password");
  },

  getUserById: async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select("-password");
  },

  createUser: async (data: IUser): Promise<IUser> => {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw new Error("User already exists with this email");
    }
    return await User.create(data);
  },

  deleteUserById: async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
  },
};
