import { Schema, model } from "mongoose";
import { IAssignment } from "./assignment.interface";

const assignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Assignment = model("Assignment", assignmentSchema);
