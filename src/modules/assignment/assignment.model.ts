import { Schema, model, Types } from "mongoose";
import { IAssignment, ISubmission } from "./assignment.interface";
import { assignmentStatus } from "./assignment.constant";

// Assignment Schema
const assignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Assignment = model<IAssignment>("Assignment", assignmentSchema);

// Submission Schema
const submissionSchema = new Schema<ISubmission>(
  {
    assignmentId: { type: Types.ObjectId, ref: "Assignment", required: true },
    studentId: { type: Types.ObjectId, ref: "User", required: true },
    submissionText: { type: String, required: true },
    status: {
      type: String,
      enum: assignmentStatus,
      default: "Pending",
    },
    feedback: { type: String },
  },
  { timestamps: true }
);

export const Submission = model<ISubmission>("Submission", submissionSchema);
