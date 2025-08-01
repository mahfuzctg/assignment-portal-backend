import { Request, Response } from "express";
import { SubmissionService } from "./submission.service";

export const SubmissionController = {
  submitAssignment: async (req: Request, res: Response) => {
    const studentId = req.user._id;
    const result = await SubmissionService.submit(studentId, req.body);
    res.status(201).json({ success: true, data: result });
  },

  getAllSubmissions: async (req: Request, res: Response) => {
    const instructorId = req.user._id;
    const result = await SubmissionService.getAllForInstructor(instructorId);
    res.json({ success: true, data: result });
  },

  updateSubmissionStatus: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, feedback } = req.body;
    const result = await SubmissionService.updateStatus(id, status, feedback);
    res.json({ success: true, data: result });
  },

  getSubmissionStats: async (req: Request, res: Response) => {
    const instructorId = req.user._id;
    const result = await SubmissionService.getStatusCount(instructorId);
    res.json({ success: true, data: result });
  },
};
