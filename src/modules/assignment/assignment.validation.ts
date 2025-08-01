import { z } from "zod";
import { assignmentStatus } from "./assignment.constant";

export const createAssignmentSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  }),
});

export const updateSubmissionStatusSchema = z.object({
  body: z.object({
    status: z.enum(assignmentStatus, { message: "Invalid status" }),
    feedback: z.string().optional(),
  }),
});
