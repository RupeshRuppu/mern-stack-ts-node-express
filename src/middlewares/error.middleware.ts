import { Request, Response, NextFunction } from 'express';

type StatusError = Partial<{ status: number }>;
type AppError = StatusError & Error;

export const errorHandler = (
  err: AppError,
  _: Request,
  res: Response,
  $: NextFunction,
) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
