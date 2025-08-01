import { Types, Document } from "mongoose";

export interface IAssignment {
  title: string;
  description: string;
  deadline: Date;
  createdBy: Types.ObjectId; 
}

export interface AssignmentDoc extends IAssignment, Document {
  createdAt?: Date;
  updatedAt?: Date;
}
