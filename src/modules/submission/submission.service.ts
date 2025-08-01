import { Submission } from "./submission.model";
import { Assignment } from "../assignment/assignment.model";

export const SubmissionService = {
  submit: async (studentId: string, payload: any) => {
    return await Submission.create({ ...payload, studentId });
  },

  getAllForInstructor: async (instructorId: string) => {
    const assignments = await Assignment.find({ createdBy: instructorId }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    return Submission.find({ assignmentId: { $in: assignmentIds } })
      .populate("studentId", "name email")
      .populate("assignmentId", "title");
  },

  updateStatus: async (submissionId: string, status: string, feedback?: string) => {
    return Submission.findByIdAndUpdate(submissionId, { status, feedback }, { new: true });
  },

  getStatusCount: async (instructorId: string) => {
    const assignments = await Assignment.find({ createdBy: instructorId }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    const result = await Submission.aggregate([
      { $match: { assignmentId: { $in: assignmentIds } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    return {
      Pending: result.find(r => r._id === "Pending")?.count || 0,
      Accepted: result.find(r => r._id === "Accepted")?.count || 0,
      Rejected: result.find(r => r._id === "Rejected")?.count || 0,
    };
  },
};
