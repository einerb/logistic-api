import { Request, Response, NextFunction } from "express";

import { ApiError } from "../../../shared/utils/api-error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.toJSON());
  } else {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      description: err.message,
    });
  }
}
