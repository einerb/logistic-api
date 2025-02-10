import { Request, Response, NextFunction } from "express";

import { UserRoleEnum } from "../../../shared/enums/role";
import { ApiError } from "../../../shared/utils/api-error";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    role: UserRoleEnum;
  };
}

export const validateRole = (allowedRole: UserRoleEnum) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(new ApiError(403, "No user role found!"));
    }

    if (userRole !== allowedRole) {
      return next(new ApiError(403, "Insufficient role"));
    }

    next();
  };
};
