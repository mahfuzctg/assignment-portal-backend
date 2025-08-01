import { Schema, model } from "mongoose";
import { ISubmission } from "./submission.interface";

const submissionSchema = new Schema<ISubmission>(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    submissionText: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    feedback: String,
  },
  { timestamps: true }
);

export const Submission = model("Submission", submissionSchema);
