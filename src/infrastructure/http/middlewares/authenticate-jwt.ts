import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserRoleEnum } from "../../../shared/enums/role";
import { ApiError } from "../../../shared/utils/api-error";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    role: UserRoleEnum;
  };
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "No token provided!"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      name: string;
      role: UserRoleEnum;
    };

    req.user = {
      id: decoded.userId,
      name: decoded.name,
      role: decoded.role as UserRoleEnum,
    };

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid token!"));
  }
};
