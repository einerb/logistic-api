import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import pool from "../../../infrastructure/config/database";
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from "../../../application/use-cases/auth";
import { LoginUserDTO, RegisterUserDTO } from "../../../application/dtos";
import UserRepositoryPostgres from "../../../infrastructure/persistence/UserRepositoryDB";

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const registerUserDto = plainToInstance(RegisterUserDTO, req.body);
      const errors = await validate(registerUserDto);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const userRepository = new UserRepositoryPostgres(pool);
      const registerUserUseCase = new RegisterUserUseCase(userRepository);
      const user = await registerUserUseCase.execute(
        registerUserDto.name,
        registerUserDto.lastname ?? "",
        registerUserDto.email,
        registerUserDto.password,
        registerUserDto.role
      );

      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginUserDto = plainToInstance(LoginUserDTO, req.body);
      const errors = await validate(loginUserDto);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const userRepository = new UserRepositoryPostgres(pool);
      const loginUserUseCase = new LoginUserUseCase(userRepository);
      const token = await loginUserUseCase.execute(
        loginUserDto.email,
        loginUserDto.password
      );

      if (!token) {
        res.status(401).json({ message: "Invalid credentials!" });
        return;
      }

      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
