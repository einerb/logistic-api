import { Pool } from "pg";

import { RouteRepository } from "../../domain/repositories";
import { Route } from "../../domain/entities";

export default class RouteRepositoryPostgres implements RouteRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async save(route: Route): Promise<void> {
    await this.pool.query(
      `UPDATE routes 
       SET updated_at = NOW() 
       WHERE id = $1`,
      [route.id]
    );
  }

  async findById(id: string): Promise<Route | null> {
    const result = await this.pool.query(
      `SELECT 
          r.id,
          r.origin_name AS "originName",
          r.origin_street AS "originStreet",
          r.origin_city AS "originCity",
          r.origin_state AS "originState",
          r.origin_country AS "originCountry",
          r.origin_postal_code AS "originPostalCode",
          r.origin_lat AS "originLat",
          r.origin_lng AS "originLng",
          r.destination_name AS "destinationName",
          r.destination_street AS "destinationStreet",
          r.destination_city AS "destinationCity",
          r.destination_state AS "destinationState",
          r.destination_country AS "destinationCountry",
          r.destination_postal_code AS "destinationPostalCode",
          r.destination_lat AS "destinationLat",
          r.destination_lng AS "destinationLng",
          r.estimated_time AS "estimatedTime",
          r.distance_km AS "distanceKm",
          
          COALESCE(v.capacity_volumen_max, 0) AS "capacityVolumenMax",
          COALESCE(v.capacity_weight_max, 0) AS "capacityWeightMax",
          v.model AS "model",
          v.license_plate AS "licensePlate",
          
          c.status AS "statusCarrier",
          c.shift_start AS "shiftStart",
          c.shift_end AS "shiftEnd",
          c.name AS "nameCarrier"
          
      FROM routes r
      LEFT JOIN carriers c ON r.assigned_carrier_id = c.id
      LEFT JOIN vehicles v ON r.assigned_vehicle_id = v.id
      WHERE r.id = $1
      AND r.deleted_at IS NULL`,
      [id]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return row;
  }

  async assignCarrierAndVehicleToRoute(
    routeId: string,
    carrierId: string,
    vehicleId: string
  ): Promise<void> {
    await this.pool.query(
      `UPDATE routes 
       SET assigned_carrier_id = $1, 
           assigned_vehicle_id = $2,
           updated_at = NOW() 
       WHERE id = $3`,
      [carrierId, vehicleId, routeId]
    );
  }
}
