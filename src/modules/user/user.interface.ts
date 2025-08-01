export type TUserRole = "student" | "instructor";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
}
