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

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: "John"
 *         lastname:
 *           type: string
 *           example: "Doe"
 *           nullable: true
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           example: "securepassword"
 *           minLength: 6
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *           example: "ADMIN"
 */
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
