import { Types, Document } from "mongoose";

export interface IAssignment {
  _id?: string;
  title: string;
  description: string;
  deadline: Date;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AssignmentDoc = IAssignment & Document;
