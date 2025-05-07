import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

function httpError(error: Error, _request: Request, response: Response, _next: NextFunction): void {
  const { message, status } = error as HttpException;

  response.status(status || 500).json({ message });
}

export default httpError;
