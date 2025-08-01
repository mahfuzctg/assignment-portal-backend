import { Types } from "mongoose";
import { assignmentStatus } from "./assignment.constant";

export interface IAssignment {
  _id?: string;
  title: string;
  description: string;
  deadline: Date;
  createdBy: Types.ObjectId; // instructor id
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubmission {
  _id?: string;
  assignmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  submissionText: string;
  status: typeof assignmentStatus[number];
  feedback?: string;
  submittedAt?: Date;
  updatedAt?: Date;
}
