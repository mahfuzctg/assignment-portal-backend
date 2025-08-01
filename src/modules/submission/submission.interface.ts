import { Types, Document } from "mongoose";
import { submissionStatus } from "./submission.constant";

export interface ISubmission {
  _id?: string;
  assignmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  submissionText: string;
  status: typeof submissionStatus[number];
  feedback?: string;
  submittedAt?: Date;
  updatedAt?: Date;
}

export type SubmissionDoc = ISubmission & Document;
