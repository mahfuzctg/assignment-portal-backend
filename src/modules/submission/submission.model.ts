// submission.model.ts
import { Schema, model } from "mongoose";
import { ISubmission } from "./submission.interface";

const submissionSchema = new Schema<ISubmission>(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment", required: false },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    submissionText: { type: String, required: false },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Submission = model<ISubmission>("Submission", submissionSchema);
