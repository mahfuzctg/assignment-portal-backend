import { Schema, model } from "mongoose";
import { AssignmentDoc } from "./assignment.interface";

const assignmentSchema = new Schema<AssignmentDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const Assignment = model<AssignmentDoc>("Assignment", assignmentSchema);
