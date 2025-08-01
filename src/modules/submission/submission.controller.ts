import { Request, Response } from "express";
import { SubmissionService } from "./submission.service";
import { isValidObjectId } from "mongoose";

export const SubmissionController = {
  submitAssignment: async (req: Request, res: Response) => {
      // @ts-ignore
    const studentId = req.user?._id;

    if (!studentId || !isValidObjectId(studentId)) {
      return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    const result = await SubmissionService.submit(studentId.toString(), req.body);
    res.status(201).json({ success: true, data: result });
  },

  getAllSubmissions: async (req: Request, res: Response) => {
      // @ts-ignore
    const instructorId = req.user?._id;

    if (!instructorId || !isValidObjectId(instructorId)) {
      return res.status(400).json({ success: false, message: "Invalid instructor ID" });
    }

    const result = await SubmissionService.getAllForInstructor(instructorId.toString());
    res.json({ success: true, data: result });
  },

  updateSubmissionStatus: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid submission ID" });
    }

    const { status, feedback } = req.body;
    const result = await SubmissionService.updateStatus(id, status, feedback);
    res.json({ success: true, data: result });
  },

  getSubmissionStats: async (req: Request, res: Response) => {
         // @ts-ignore
    const instructorId = req.user?._id;

    if (!instructorId || !isValidObjectId(instructorId)) {
      return res.status(400).json({ success: false, message: "Invalid instructor ID" });
    }

    const result = await SubmissionService.getStatusCount(instructorId.toString());
    res.json({ success: true, data: result });
  },
};
