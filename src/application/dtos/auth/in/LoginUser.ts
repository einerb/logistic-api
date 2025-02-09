import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
