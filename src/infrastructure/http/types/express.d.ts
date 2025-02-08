import { UserRole } from "../../domain/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        role: UserRole;
      };
    }
  }
}
