import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from "class-validator";

import { UserRoleEnum } from "../../../../shared/enums/role";
import { Transform } from "class-transformer";

export default class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  @Transform(({ value }) => value.toUpperCase())
  role!: UserRoleEnum;
}
