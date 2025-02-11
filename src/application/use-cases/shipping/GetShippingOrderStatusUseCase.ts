import { ShippingOrder } from "../../../domain/entities";
import { ShippingOrderRepository } from "../../../domain/repositories";
import { RedisCacheService } from "../../../infrastructure/cache";
import { ApiError } from "../../../shared/utils/api-error";

export default class GetShippingOrderStatusUseCase {
  constructor(
    private readonly shippingOrderRepository: ShippingOrderRepository,
    private readonly redisService: RedisCacheService
  ) {}

  async execute(shippingOrderId: string): Promise<ShippingOrder> {
    const cachedOrder = await this.redisService.get(
      `shipping_order:${shippingOrderId}`
    );

    if (cachedOrder) {
      return JSON.parse(cachedOrder);
    }

    const shippingOrder = await this.shippingOrderRepository.findById(
      shippingOrderId
    );
    if (!shippingOrder) {
      throw new ApiError(404, "Shipping order not found!");
    }

    await this.redisService.set(
      `shipping_order:${shippingOrderId}`,
      JSON.stringify(shippingOrder),
      60
    );

    return shippingOrder;
  }
}
