import { UserRoleEnum } from "../../shared/enums/role";
import BaseEntity from "./BaseEntity";

export default class User extends BaseEntity {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public password: string,
    public role: UserRoleEnum = UserRoleEnum.CLIENT,
    public isActive: boolean
  ) {
    super();
  }
}
