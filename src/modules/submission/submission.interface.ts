// submission.interface.ts
import { Types } from "mongoose";

export interface ISubmission {
  _id?: string;
  assignmentId: Types.ObjectId | string;
  studentId: Types.ObjectId | string;
  submissionText: string;  
  status?: "Pending" | "Accepted" | "Rejected";
  feedback?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
