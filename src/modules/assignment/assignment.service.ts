import { Assignment, Submission } from "./assignment.model";


export const AssignmentService = {
  createAssignment: async (payload: any, instructorId: string) => {
    return await Assignment.create({ ...payload, createdBy: instructorId });
  },

  getAllSubmissionsForInstructor: async (instructorId: string) => {
    // Find assignments by instructor
    const assignments = await Assignment.find({ createdBy: instructorId }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    // Get all submissions for those assignments with student info
    return await Submission.find({ assignmentId: { $in: assignmentIds } })
      .populate("studentId", "name email")
      .populate("assignmentId", "title");
  },

  updateSubmissionStatus: async (submissionId: string, status: string, feedback?: string) => {
    return await Submission.findByIdAndUpdate(
      submissionId,
      { status, feedback },
      { new: true }
    );
  },

  getSubmissionStatusCount: async (instructorId: string) => {
    const assignments = await Assignment.find({ createdBy: instructorId }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    // Aggregate submissions by status
    const counts = await Submission.aggregate([
      { $match: { assignmentId: { $in: assignmentIds } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Return object: { Pending: x, Accepted: y, Rejected: z }
    const result = { Pending: 0, Accepted: 0, Rejected: 0 };
    counts.forEach((item) => {
      result[item._id] = item.count;
    });
    return result;
  },
};
