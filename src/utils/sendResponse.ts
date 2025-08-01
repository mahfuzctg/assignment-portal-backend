import { Response } from "express";

type TMeta = {
  total?: number;
  page?: number;
  limit?: number;
};

type TSendResponse<T> = {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
  meta?: TMeta;
};

export const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data = null,
  meta,
}: TSendResponse<T>): void => {
  const responsePayload: Record<string, any> = {
    success,
    message,
    data,
  };

  if (meta) {
    responsePayload.meta = meta;
  }

  res.status(statusCode).json(responsePayload);
};
