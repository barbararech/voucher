import { NextFunction, Request, Response } from 'express';

import {
  AppError,
  errorTypeToStatusCode,
  isAppError
} from '../utils/errorUtils';

export default async function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Ops. Something went wrong', err);

  if (isAppError(err)) {
    const { type, message } = err;
    const statusCode = errorTypeToStatusCode(type);

    return res.status(statusCode).send(message);
  }

  return res.sendStatus(500); // internal server error
}
