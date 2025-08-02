// submission.validation.ts
import * as z from "zod";

export const submissionZodSchema = z.object({
  assignmentId: z.string().optional(),       
  submissionText: z.string().optional(),    
});
