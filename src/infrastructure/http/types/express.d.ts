import { UserRoleEnum } from "../domain/enums/UserRoleEnum";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
      role: UserRoleEnum;
    };
  }
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
