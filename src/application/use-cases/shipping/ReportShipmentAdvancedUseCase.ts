import { ShippingOrderRepository } from "../../../domain/repositories";
import { RedisCacheService } from "../../../infrastructure/cache";

export default class ReportShipmentAdvancedUseCase {
  constructor(
    private readonly shippingOrderRepository: ShippingOrderRepository,
    private readonly redisService: RedisCacheService
  ) {}

  async execute(filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
    carrierId?: string;
    page?: number;
    limit?: number;
  }) {
    const cacheKey = `shipment_reports:${JSON.stringify(filters)}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const report = await this.shippingOrderRepository.getAdvancedReport(
      filters
    );

    await this.redisService.set(cacheKey, JSON.stringify(report), 300);

    return report;
  }
}
