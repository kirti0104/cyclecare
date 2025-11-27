import { Request, Response, NextFunction, RequestHandler } from 'express';

export const catchAsyncError = (
  passedFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(passedFunction(req, res, next)).catch((error) => {
      error.stack = error.stack || new Error().stack;
      next(error);
    });
  };
};
