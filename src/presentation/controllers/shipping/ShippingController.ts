import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import pool from "../../../infrastructure/config/database";
import CreateShippingOrderDTO from "../../../application/dtos/shipping/in/CreateShippingOrder";
import ShippingOrderRepositoryPostgres from "../../../infrastructure/persistence/ShippingOrderRepositoryDB";
import ValidationAddressService from "../../../domain/services/ValidationAddressService";
import { ApiError } from "../../../shared/utils/api-error";
import {
  CreateShippingOrderUseCase,
  GetShippingOrderStatusUseCase,
  ReportShipmentAdvancedUseCase,
  UpdateShippingOrderStatusUseCase,
} from "../../../application/use-cases/shipping";
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
import {
  AssignRouteToShippingOrderDTO,
  UpdateStatusShipmentDTO,
} from "../../../application/dtos";
import { RedisCacheService } from "../../../infrastructure/cache";

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

  static async updateStatusShipment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { shippingOrderId } = req.params;
      if (!shippingOrderId) {
        new ApiError(400, "Parameter not found!");
      }

      const updateDto = plainToInstance(UpdateStatusShipmentDTO, req.body);

      const errors = await validate(updateDto);

      if (errors.length > 0) {
        throw ApiError.fromValidationErrors(errors);
      }

      const shipmentRepository = new ShippingOrderRepositoryPostgres(pool);
      const redisService = new RedisCacheService();

      const statusNewUserCase = new UpdateShippingOrderStatusUseCase(
        shipmentRepository,
        redisService
      );

      const updateStatus = await statusNewUserCase.execute(
        shippingOrderId,
        updateDto.status
      );

      const response = new ApiResponse(
        1005,
        "Shipment status updated!",
        updateStatus
      );

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getStatusShipment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { shippingOrderId } = req.params;
      if (!shippingOrderId) {
        new ApiError(400, "Parameter not found!");
      }

      const shipmentRepository = new ShippingOrderRepositoryPostgres(pool);
      const redisService = new RedisCacheService();

      const getShipmentUserCase = new GetShippingOrderStatusUseCase(
        shipmentRepository,
        redisService
      );

      const getStatus = await getShipmentUserCase.execute(shippingOrderId);

      const response = new ApiResponse(
        1006,
        "Shipment status found!",
        getStatus
      );

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async reportAdvanced(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, status, carrierId, page, limit } = req.query;

      const shipmentRepository = new ShippingOrderRepositoryPostgres(pool);
      const redisService = new RedisCacheService();

      const reportAdvancedUseCase = new ReportShipmentAdvancedUseCase(
        shipmentRepository,
        redisService
      );

      const results = await reportAdvancedUseCase.execute({
        startDate: startDate as string,
        endDate: endDate as string,
        status: status as string,
        carrierId: carrierId as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 12,
      });
      const response = new ApiResponse(1007, "Results found!", results);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
