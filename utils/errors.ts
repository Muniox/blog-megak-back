import { NextFunction, Request, Response } from 'express';

export class ValidationExpressError extends Error {}

// eslint-disable-next-line no-unused-vars
export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(err.message);

  res
    .status(err instanceof ValidationExpressError ? 400 : 500)
    .json({
      message: err instanceof ValidationExpressError ? err.message : 'Sorry, please try again later.',
    });
};
