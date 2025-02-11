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
import AssignRouteToShippingOrderUseCase from "../../../application/use-cases/shipping/AssignRouteToShippingOrderUseCase";
import RouteRepositoryPostgres from "../../../infrastructure/persistence/RouteRepositoryDB";
import VehicleRepositoryPostgres from "../../../infrastructure/persistence/VehicleRepositoryDB";
import CarrierRepositoryPostgres from "../../../infrastructure/persistence/CarrierRepositoryDB";
import {
  CarrierAvailabilityService,
  ShipmentCapacityService,
} from "../../../domain/services";
import { AssignRouteToShippingOrderDTO } from "../../../application/dtos";

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

  static async assignRouteToShippingOrder(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const assignRouteDto = plainToInstance(
        AssignRouteToShippingOrderDTO,
        req.body
      );

      const errors = await validate(assignRouteDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
      }

      const shipmentRepository = new ShippingOrderRepositoryPostgres(pool);
      const routeRepository = new RouteRepositoryPostgres(pool);
      const vehicleRepository = new VehicleRepositoryPostgres(pool);
      const carrierRepository = new CarrierRepositoryPostgres(pool);
      const shipmentCapacityService = new ShipmentCapacityService();
      const carrierAvailabilityService = new CarrierAvailabilityService();

      const assignRoute = new AssignRouteToShippingOrderUseCase(
        shipmentRepository,
        routeRepository,
        vehicleRepository,
        carrierRepository,
        shipmentCapacityService,
        carrierAvailabilityService
      );

      const assignRouteShipment = await assignRoute.execute(assignRouteDto);

      const response = new ApiResponse(
        1004,
        "Routing to shipment successful!",
        assignRouteShipment
      );

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
