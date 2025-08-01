import * as z from "zod";

export const assignmentZodSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  deadline: z.string(), // should be valid date string
});
