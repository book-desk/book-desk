import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const { status = 500, message = 'Server Error' } = error;
  response.status(status).send({
    status,
    code: status,
    message,
  });
}

export default errorMiddleware;
