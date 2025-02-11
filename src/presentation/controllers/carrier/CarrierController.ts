import { NextFunction, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import pool from "../../../infrastructure/config/database";
import CarrierRepositoryPostgres from "../../../infrastructure/persistence/CarrierRepositoryDB";
import { AuthenticatedRequest } from "../../../infrastructure/http/types/express";
import { CreateCarrierDTO } from "../../../application/dtos";
import { ApiError } from "../../../shared/utils/api-error";
import { ApiResponse } from "../../../shared/utils/api-response";
import {
  CreateCarrierUseCase,
  FindCarrierUseCase,
} from "../../../application/use-cases/carrier";

export default class CarrierController {
  static async createCarrier(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createCarrierDto = plainToInstance(CreateCarrierDTO, req.body);

      const errors = await validate(createCarrierDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
      }

      const carrierRepository = new CarrierRepositoryPostgres(pool);
      const createCarrierUseCase = new CreateCarrierUseCase(carrierRepository);
      const carrier = await createCarrierUseCase.execute(createCarrierDto);

      const response = new ApiResponse(
        1005,
        "Carrier created successfully",
        carrier
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findCarrier(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const carrierRepository = new CarrierRepositoryPostgres(pool);
      const findCarrierUseCase = new FindCarrierUseCase(carrierRepository);
      const carrier = await findCarrierUseCase.execute();

      const response = new ApiResponse(1005, "Carrier found!", carrier);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
