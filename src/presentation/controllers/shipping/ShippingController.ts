import { validate } from "class-validator";
import { NextFunction, Response } from "express";
import { plainToInstance } from "class-transformer";

import pool from "../../../infrastructure/config/database";
import CreateShippingOrderDTO from "../../../application/dtos/shipping/in/CreateShippingOrder";
import ShippingOrderRepositoryPostgres from "../../../infrastructure/persistence/ShippingOrderRepositoryDB";
import ValidationAddressService from "../../../domain/services/ValidationAddressService";
import { ApiError } from "../../../shared/utils/api-error";
import { CreateShippingOrderUseCase } from "../../../application/use-cases/shipping";
import { ApiResponse } from "../../../shared/utils/api-response";
import { User } from "../../../domain/entities";
import { AuthenticatedRequest } from "../../../infrastructure/http/types/express";
import PackageRepositoryPostgres from "../../../infrastructure/persistence/PackageRepositoryDB";

export default class ShippingController {
  static async createShippingOrder(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createShippingOrderDto = plainToInstance(
        CreateShippingOrderDTO,
        req.body
      );

      const errors = await validate(createShippingOrderDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
      }

      const user = req.user as User;

      const shippingOrderRepository = new ShippingOrderRepositoryPostgres(pool);
      const packageRepository = new PackageRepositoryPostgres(pool);
      const addressValidationService = new ValidationAddressService();

      const createShippingOrderUseCase = new CreateShippingOrderUseCase(
        shippingOrderRepository,
        packageRepository,
        addressValidationService
      );

      const order = await createShippingOrderUseCase.execute(
        user,
        createShippingOrderDto.packages,
        createShippingOrderDto.destinationAddress
      );

      const response = new ApiResponse(
        1003,
        "Shipping order created successfully",
        order
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
