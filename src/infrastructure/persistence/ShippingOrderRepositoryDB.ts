import { Pool } from "pg";

import ShippingOrder from "../../domain/entities/ShippingOrder";
import ShippingOrderRepository from "../../domain/repositories/ShippingOrderRepository";
import { Address } from "../../domain/entities";

export default class ShippingOrderRepositoryPostgres
  implements ShippingOrderRepository
{
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async save(order: ShippingOrder): Promise<void> {
    await this.pool.query(
      `INSERT INTO shipping_orders (
                id, user_id, street, city, state,
                postal_code, country, lat, lng,
                status, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        order.id,
        order.user.id,
        order.destinationAddress.street,
        order.destinationAddress.city,
        order.destinationAddress.state,
        order.destinationAddress.postalCode,
        order.destinationAddress.country,
        order.destinationAddress.coordinates?.lat,
        order.destinationAddress.coordinates?.lng,
        order.status,
        order.createdAt,
        order.updatedAt,
      ]
    );
  }

  async countOrdersByAddressAndDate(
    address: Address,
    date: Date,
    userId: string
  ): Promise<number> {
    const result = await this.pool.query(
      `SELECT COUNT(*) FROM shipping_orders 
         WHERE street = $1 AND city = $2 
         AND state = $3 AND country = $4 
         AND DATE(created_at) = $5
         AND status = $6
         AND user_id = $7`,
      [
        address.street,
        address.city,
        address.state,
        address.country,
        date.toISOString().split("T")[0],
        "En espera",
        userId,
      ]
    );
    return parseInt(result.rows[0].count, 10);
  }
}
