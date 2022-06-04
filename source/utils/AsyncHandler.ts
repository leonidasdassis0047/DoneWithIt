import { NextFunction, Request, RequestHandler, Response } from 'express';

type Handler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

const AsyncHandler = (handler: Handler): RequestHandler => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await handler(request, response, next);
    } catch (error: any) {
      next(error);
    }
  };
};

export default AsyncHandler;
