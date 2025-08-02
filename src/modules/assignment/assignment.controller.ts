import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { AssignmentService } from "./assignment.service";

export const AssignmentController = {
  
  create: async (req: Request, res: Response) => {

    
      // @ts-ignore
    const instructorId = req.user?._id;

    if (!instructorId || !isValidObjectId(instructorId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing instructor ID" });
    }

    const result = await AssignmentService.createAssignment(req.body, instructorId.toString());
    res.status(201).json({ success: true, data: result });
  },

    getAllAssignments: async (_req: Request, res: Response) => {
    const assignments = await AssignmentService.getAllAssignments();
    res.json({ success: true, data: assignments });
  },

  getMyAssignments: async (req: Request, res: Response) => {
      // @ts-ignore
    const instructorId = req.user?._id;

    if (!instructorId || !isValidObjectId(instructorId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing instructor ID" });
    }

    const result = await AssignmentService.getAssignmentsByInstructor(instructorId.toString());
    res.json({ success: true, data: result });
  },
};
