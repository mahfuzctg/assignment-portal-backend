import * as z from "zod";

export const submissionZodSchema = z.object({
  assignmentId: z.string(),
  submissionText: z.string().min(5),
});
