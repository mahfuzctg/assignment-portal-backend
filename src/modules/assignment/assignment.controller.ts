import { Request, Response, NextFunction } from "express";
import { AssignmentService } from "./assignment.service";

export const AssignmentController = {
  createAssignment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructorId = req.user._id; // assume req.user added by auth middleware
      const assignment = await AssignmentService.createAssignment(req.body, instructorId);
      res.status(201).json({ success: true, data: assignment });
    } catch (error) {
      next(error);
    }
  },

  getAllSubmissions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructorId = req.user._id;
      const submissions = await AssignmentService.getAllSubmissionsForInstructor(instructorId);
      res.status(200).json({ success: true, data: submissions });
    } catch (error) {
      next(error);
    }
  },

  updateSubmissionStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // submission id
      const { status, feedback } = req.body;
      const updated = await AssignmentService.updateSubmissionStatus(id, status, feedback);
      if (!updated) return res.status(404).json({ success: false, message: "Submission not found" });
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },

  getSubmissionStatusChartData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructorId = req.user._id;
      const chartData = await AssignmentService.getSubmissionStatusCount(instructorId);
      res.status(200).json({ success: true, data: chartData });
    } catch (error) {
      next(error);
    }
  },
};
