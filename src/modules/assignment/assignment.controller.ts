import { Request, Response } from "express";
import { AssignmentService } from "./assignment.service";

export const AssignmentController = {
  create: async (req: Request, res: Response) => {
    const instructorId = req.user._id; // assume from auth middleware
    const result = await AssignmentService.createAssignment(req.body, instructorId);
    res.status(201).json({ success: true, data: result });
  },

  getMyAssignments: async (req: Request, res: Response) => {
    const instructorId = req.user._id;
    const result = await AssignmentService.getAssignmentsByInstructor(instructorId);
    res.json({ success: true, data: result });
  },
};
