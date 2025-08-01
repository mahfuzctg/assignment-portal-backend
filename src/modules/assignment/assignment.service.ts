import { Assignment } from "./assignment.model";
import { AssignmentDoc } from "./assignment.interface";

export const AssignmentService = {
  createAssignment: async (payload: Partial<AssignmentDoc>, instructorId: string) => {
    return Assignment.create({ ...payload, createdBy: instructorId });
  },

  getAssignmentsByInstructor: async (instructorId: string) => {
    return Assignment.find({ createdBy: instructorId });
  },
};
