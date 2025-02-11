import RouteRepository from "../../../domain/repositories/RouteRepository";
import VehicleRepository from "../../../domain/repositories/VehicleRepository";
import {
  CarrierRepository,
  ShippingOrderRepository,
} from "../../../domain/repositories";
import { ApiError } from "../../../shared/utils/api-error";
import {
  CarrierAvailabilityService,
  ShipmentCapacityService,
} from "../../../domain/services";
import {
  AssignRouteToShippingOrderDTO,
  CreateShippingOrderResponseDTO,
} from "../../dtos";
import AssignShippingOrderResponseDTO from "../../dtos/shipping/out/AssignShipment";
import { ShippingStatus } from "../../../shared/enums/shipping-status";

export default class AssignRouteToShippingOrderUseCase {
  constructor(
    private readonly shippingOrderRepository: ShippingOrderRepository,
    private readonly routeRepository: RouteRepository,
    private readonly vehicleRepository: VehicleRepository,
    private readonly carrierRepository: CarrierRepository,
    private readonly shipmentCapacityService: ShipmentCapacityService,
    private readonly carrierAvailabilityService: CarrierAvailabilityService
  ) {}

  async execute(
    assignRouteDto: AssignRouteToShippingOrderDTO
  ): Promise<CreateShippingOrderResponseDTO> {
    const shippingOrder = await this.shippingOrderRepository.findById(
      assignRouteDto.shippingOrderId
    );
    if (!shippingOrder) {
      throw new ApiError(404, "Shipping order not found!");
    }

    if (shippingOrder.status === ShippingStatus.IN_TRANSIT) {
      throw new ApiError(409, "Shipment order is already assigned to route!");
    }

    const route = await this.routeRepository.findById(assignRouteDto.routeId);
    if (!route) {
      throw new ApiError(404, "Route not found!");
    }

    const vehicle = await this.vehicleRepository.findByPlate(
      assignRouteDto.vehicleId
    );
    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found!");
    }

    const carrier = await this.carrierRepository.findByName(
      assignRouteDto.carrierId
    );
    if (!carrier) {
      throw new ApiError(404, "Carrier not found!");
    }

    const isAvailable = this.carrierAvailabilityService.isAvailable(carrier);
    if (!isAvailable) {
      throw new ApiError(404, "Carrier isn't available for this shipment!");
    }

    const capacityVehicle =
      await this.shipmentCapacityService.canAccommodateShipment(
        vehicle,
        shippingOrder.packages
      );
    if (!capacityVehicle) {
      throw new ApiError(400, "Vehicle isn't available for this shipment!");
    }

    await this.routeRepository.assignCarrierAndVehicleToRoute(
      route.id,
      carrier.id,
      vehicle.id
    );

    await this.shippingOrderRepository.assignRouteToShippingOrder(
      shippingOrder.id,
      route.id
    );

    const shippingOrderUpdated = await this.shippingOrderRepository.findById(
      assignRouteDto.shippingOrderId
    );

    const routeAssigned = await this.routeRepository.findById(
      assignRouteDto.routeId
    );

    return AssignShippingOrderResponseDTO.fromEntity(
      shippingOrderUpdated,
      routeAssigned
    );
  }
}
