export enum AssignmentErrorType {
  AssignmentNotFound = "AssignmentNotFound",
  SubmissionNotFound = "SubmissionNotFound",
  Unauthorized = "Unauthorized",
  ValidationError = "ValidationError",
  DuplicateSubmission = "DuplicateSubmission",
  InvalidStatusUpdate = "InvalidStatusUpdate",
  GeneralError = "GeneralError",
}

export class AssignmentError extends Error {
  type: AssignmentErrorType;
  details?: any;

  constructor(type: AssignmentErrorType, message: string, details?: any) {
    super(message);
    this.type = type;
    this.details = details;
    Object.setPrototypeOf(this, AssignmentError.prototype);
  }
}
