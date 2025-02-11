import { NextFunction, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import pool from "../../../infrastructure/config/database";
import { AuthenticatedRequest } from "../../../infrastructure/http/types/express";
import { CreateVehicleDTO } from "../../../application/dtos";
import { ApiError } from "../../../shared/utils/api-error";
import VehicleRepositoryPostgres from "../../../infrastructure/persistence/VehicleRepositoryDB";
import { ApiResponse } from "../../../shared/utils/api-response";
import {
  CreateVehicleUseCase,
  FindVehicleUseCase,
} from "../../../application/use-cases/vehicle";

export default class VehicleController {
  static async createVehicle(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createVehicleDto = plainToInstance(CreateVehicleDTO, req.body);

      const errors = await validate(createVehicleDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
      }

      const vehicleRepository = new VehicleRepositoryPostgres(pool);
      const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository);
      const vehicle = await createVehicleUseCase.execute(createVehicleDto);

      const response = new ApiResponse(
        1005,
        "Vehicle created successfully",
        vehicle
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findVehicle(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const vehicleRepository = new VehicleRepositoryPostgres(pool);
      const findVehicleUseCase = new FindVehicleUseCase(vehicleRepository);
      const vehicle = await findVehicleUseCase.execute();

      const response = new ApiResponse(1005, "Vehicle found", vehicle);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
