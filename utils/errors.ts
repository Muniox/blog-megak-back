import { NextFunction, Request, Response } from 'express';

export class ValidationExpressError extends Error {
  statusCode: number;

  constructor(message :string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

// eslint-disable-next-line no-unused-vars
export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(err.message);

  res
    .status(err instanceof ValidationExpressError ? err.statusCode : 500)
    .json({
      message: err instanceof ValidationExpressError ? err.message : 'Sorry, please try again later.',
    });
};
