import { Pool } from "pg";

import ShippingOrder from "../../domain/entities/ShippingOrder";
import ShippingOrderRepository from "../../domain/repositories/ShippingOrderRepository";
import {
  Address,
  Carrier,
  Package,
  Route,
  User,
  Vehicle,
} from "../../domain/entities";
import { ShippingStatus } from "../../shared/enums/shipping-status";

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
                id, user_id, name, phone, street, city, state,
                postal_code, country, lat, lng,
                status, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        order.id,
        order.user.id,
        order.destinationAddress.name,
        order.destinationAddress.phone,
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
        ShippingStatus.PENDING,
        userId,
      ]
    );
    return parseInt(result.rows[0].count, 10);
  }

  async findById(id: string): Promise<ShippingOrder | null> {
    const result = await this.pool.query(
      `SELECT 
          so.id, 
          so.name, 
          so.phone, 
          so.street, 
          so.city, 
          so.state,
          so.country, 
          so.postal_code AS "postalCode", 
          so.lat, 
          so.lng,
          so.status, 
          so.created_at AS "createdAt", 
          so.updated_at AS "updatedAt",
          u.id AS "userId", 
          u.name AS "userName",
          u.lastname AS "lastName", 
          u.email AS "userEmail", 
          u.role,
          (
              SELECT COALESCE(
                  json_agg(
                      json_build_object(
                          'id', p.id,
                          'weight', p.weight,
                          'length', p.length,
                          'width', p.width,
                          'height', p.height,
                          'product_type', p.product_type
                      )
                  ), '[]'
              )
              FROM packages p
              WHERE p.shipping_order_id = so.id
          ) AS packages
      FROM
          shipping_orders so
          LEFT JOIN users u ON so.user_id = u.id
      WHERE
          so.id = $1
          AND so.deleted_at IS NULL`,
      [id]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    const user = new User(
      row.userName,
      row.lastName,
      row.userEmail,
      "",
      row.role,
      true
    );
    user.id = row.userId;

    const destinationAddress = new Address(
      row.name,
      row.street,
      row.city,
      row.state,
      row.country,
      row.phone,
      row.postalCode,
      { lat: row.lat, lng: row.lng }
    );

    const packages: Package[] = row.packages.map(
      (p: any) =>
        new Package(
          row.id,
          p.weight,
          { length: p.length, width: p.width, height: p.height },
          p.product_type
        )
    );

    const shippingOrder = new ShippingOrder(
      user,
      packages,
      destinationAddress,
      row.status
    );

    shippingOrder.id = row.id;
    shippingOrder.createdAt = row.createdAt;
    shippingOrder.updatedAt = row.updatedAt;

    return shippingOrder;
  }

  async assignRouteToShippingOrder(
    shippingOrderId: string,
    routeId: string
  ): Promise<void> {
    await this.pool.query(
      `UPDATE shipping_orders
      SET 
        assigned_route_id = $1,
        updated_at = NOW(),
        status = 'IN_TRANSIT'
      WHERE id = $2;`,
      [routeId, shippingOrderId]
    );
  }
}
