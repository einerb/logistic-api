import { Pool } from "pg";

import { Package } from "../../domain/entities";
import { PackageRepository } from "../../domain/repositories";

export default class PackageRepositoryPostgres implements PackageRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async save(pkg: Package): Promise<void> {
    await this.pool.query(
      `INSERT INTO packages (
                id, shipping_order_id, weight, length, width, height,
                product_type, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        pkg.id,
        pkg.shippingOrderId,
        pkg.weight,
        pkg.dimensions.length,
        pkg.dimensions.width,
        pkg.dimensions.height,
        pkg.productType,
        pkg.createdAt,
        pkg.updatedAt,
      ]
    );
  }

  async countPackagesByOrderAndDate(
    orderId: string,
    date: Date
  ): Promise<number> {
    const result = await this.pool.query(
      `SELECT COUNT(*) FROM packages 
             WHERE shipping_order_id = $1 AND DATE(created_at) = $2`,
      [orderId, date.toISOString().split("T")[0]]
    );
    return parseInt(result.rows[0].count, 10);
  }
}
