

export type SubmissionStatus = "Pending" | "Accepted" | "Rejected";

export interface SubmissionCountResult {
  Pending: number;
  Accepted: number;
  Rejected: number;
}

export interface Assignment {
  title: string;
  description: string;
  deadline: Date;
  // Add other fields as needed
}

export interface Submission {
  studentId: string; // or ObjectId, etc.
  assignmentId: string;
  status: SubmissionStatus;
  feedback?: string;
  submittedAt: Date;
}
