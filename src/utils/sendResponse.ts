import { Response } from "express";

type TSendResponse<T> = {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

export const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data,
  meta,
}: TSendResponse<T>): void => {
  res.status(statusCode).json({
    success,
    message,
    data,
    meta,
  });
};
