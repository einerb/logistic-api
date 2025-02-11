import { ShippingOrderRepository } from "../../../domain/repositories";
import { RedisCacheService } from "../../../infrastructure/cache";
import { ShippingStatus } from "../../../shared/enums/shipping-status";
import { ApiError } from "../../../shared/utils/api-error";

export default class UpdateShippingOrderStatusUseCase {
  constructor(
    private readonly shippingOrderRepository: ShippingOrderRepository,
    private readonly redisService: RedisCacheService
  ) {}

  async execute(shippingOrderId: string, newStatus: ShippingStatus) {
    const shippingOrder = await this.shippingOrderRepository.findById(
      shippingOrderId
    );

    if (!shippingOrder) {
      throw new ApiError(404, "Shipping order not found!");
    }

    if (!this.isValidTransition(shippingOrder.status, newStatus)) {
      throw new ApiError(
        400,
        `Invalid status transition from ${shippingOrder.status} to ${newStatus}`
      );
    }

    shippingOrder.updateStatus(newStatus);

    await this.shippingOrderRepository.updateStatus(shippingOrder);

    await this.redisService.set(
      `shipping_status:${shippingOrderId}`,
      newStatus,
      60
    );
  }

  private isValidTransition(
    currentStatus: ShippingStatus,
    newStatus: ShippingStatus
  ): boolean {
    const validTransitions: Record<ShippingStatus, ShippingStatus[]> = {
      PENDING: [ShippingStatus.IN_TRANSIT],
      IN_TRANSIT: [ShippingStatus.DELIVERED],
      DELIVERED: [],
    };

    return validTransitions[currentStatus].includes(newStatus);
  }
}
