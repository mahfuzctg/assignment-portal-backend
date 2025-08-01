export interface IAuthUser {
  email: string;
  password: string;
}

export interface ITokenPayload {
  _id: string;
  email: string;
  role: "student" | "instructor";
}
