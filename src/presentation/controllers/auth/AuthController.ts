import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import pool from "../../../infrastructure/config/database";
import {
  LoginUserUseCase,
  RegisterUserUseCase,
} from "../../../application/use-cases/auth";
import { LoginUserDTO, RegisterUserDTO } from "../../../application/dtos";
import UserRepositoryPostgres from "../../../infrastructure/persistence/UserRepositoryDB";
import { ApiResponse } from "../../../shared/utils/api-response";
import { ApiError } from "../../../shared/utils/api-error";

export default class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const registerUserDto = plainToInstance(RegisterUserDTO, req.body);
      const errors = await validate(registerUserDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
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

      const response = new ApiResponse(
        1001,
        "User registered successfully",
        user
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const loginUserDto = plainToInstance(LoginUserDTO, req.body);
      const errors = await validate(loginUserDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
      }

      const userRepository = new UserRepositoryPostgres(pool);
      const loginUserUseCase = new LoginUserUseCase(userRepository);
      const token = await loginUserUseCase.execute(
        loginUserDto.email,
        loginUserDto.password
      );

      const response = new ApiResponse(1002, "Login successful!", {
        accessToken: token,
      });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
