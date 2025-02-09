import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserRoleEnum } from "../../../shared/enums/role";

export const validateRole = (allowedRole: UserRoleEnum) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        name: string;
        role: UserRoleEnum;
      };
      const userRole = decoded.role;

      if (userRole !== allowedRole) {
        return res.status(403).json({ message: "Access denied!" });
      }

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token!" });
    }
  };
};
