
import { Request, Response } from "express";
import { SubmissionService } from "./submission.service";
import { isValidObjectId } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
    email?: string;
  };
}

export const SubmissionController = {
  submitAssignment: async (req: AuthenticatedRequest, res: Response) => {
    const studentId = req.user?._id;

    if (!studentId || !isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    if (req.user?.role !== "student") {
      return res.status(403).json({ success: false, message: "Only students can submit assignments" });
    }

    const { assignmentId } = req.body;
    if (!isValidObjectId(assignmentId)) {
      return res.status(400).json({ success: false, message: "Invalid assignment ID" });
    }

    try {
      const result = await SubmissionService.submit(studentId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || "Submission failed" });
    }
  },

  getMySubmissions: async (req: AuthenticatedRequest, res: Response) => {
    const studentId = req.user?._id;

    if (!studentId || !isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
      const submissions = await SubmissionService.getStudentSubmissions(studentId);
      res.json({ success: true, data: submissions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Failed to fetch submissions", error: error.message });
    }
  },

  getAllSubmissions: async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const submissions = await SubmissionService.getAllSubmissions();
      res.json({ success: true, data: submissions });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateSubmission: async (req: AuthenticatedRequest, res: Response) => {
    const submissionId = req.params.id;

    if (!isValidObjectId(submissionId)) {
      return res.status(400).json({ success: false, message: "Invalid submission ID" });
    }

    try {
      const updated = await SubmissionService.updateSubmission(submissionId, req.body);
      res.json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
