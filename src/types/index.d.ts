
import { IUser } from "../src/modules/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
