// submission.service.ts
import { Submission } from "./submission.model";
import { Assignment } from "../assignment/assignment.model";
import { Types } from "mongoose";

export const SubmissionService = {
  submit: async (studentId: string, payload: { assignmentId: string; submissionText: string }) => {
    const { assignmentId, submissionText } = payload;

    // Optional: Check if assignment exists
    const assignmentExists = await Assignment.exists({ _id: assignmentId });
    if (!assignmentExists) {
      throw new Error("Assignment does not exist");
    }

    // Check if student already submitted for this assignment (optional, if you want one submission only)
    const existing = await Submission.findOne({ assignmentId, studentId });
    if (existing) {
      // Update existing submission instead of creating a new one (optional)
      existing.submissionText = submissionText;
      existing.status = "Pending";
      existing.feedback = "";
      return existing.save();
    }

    return Submission.create({
      assignmentId: new Types.ObjectId(assignmentId),
      studentId: new Types.ObjectId(studentId),
      submissionText,
      status: "Pending",
    });
  },

  getStudentSubmissions: async (studentId: string) => {
    return Submission.find({ studentId })
      .populate("assignmentId", "title deadline") // populate assignment details
      .sort({ createdAt: -1 });
  },

  getAllSubmissions: async () => {
  return Submission.find()
    .populate("assignmentId", "title deadline")
    .populate("studentId", "name email")
    .sort({ createdAt: -1 });
},

updateSubmission: async (id: string, updates: { status?: string; feedback?: string }) => {
  const submission = await Submission.findById(id);
  if (!submission) throw new Error("Submission not found");

  if (updates.status) submission.status = updates.status as any;
  if (updates.feedback !== undefined) submission.feedback = updates.feedback;

  return submission.save();
},

};
