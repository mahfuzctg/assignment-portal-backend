import { Schema, model, Types } from "mongoose";

const submissionSchema = new Schema(
  {
    assignmentId: { type: Types.ObjectId, ref: "Assignment", required: true },
    studentId: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    feedback: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Submission = model("Submission", submissionSchema);
