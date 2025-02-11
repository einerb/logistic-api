import { Pool } from "pg";

import { Vehicle } from "../../domain/entities";
import { VehicleRepository } from "../../domain/repositories";

export default class VehicleRepositoryPostgres implements VehicleRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async save(vehicle: Vehicle): Promise<void> {
    await this.pool.query(
      `INSERT INTO vehicles (id, capacity_volumen_max, capacity_weight_max,
       model, license_plate, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        vehicle.id,
        vehicle.capacityVolumenMax,
        vehicle.capacityWeightMax,
        vehicle.model,
        vehicle.licensePlate,
        vehicle.createdAt,
        vehicle.updatedAt,
      ]
    );
  }

  async findById(id: string): Promise<Vehicle | null> {
    const result = await this.pool.query(
      `SELECT id, capacity_volumen_max AS "capacityVolumenMax",
       capacity_weight_max AS "capacityWeightMax", model,
       license_plate AS "licensePlate", created_at AS "createdAt",
       updated_at AS "updatedAt" FROM vehicles WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    const vehicle = new Vehicle(
      row.capacityVolumenMax,
      row.capacityWeightMax,
      row.model,
      row.licensePlate
    );

    vehicle.id = row.id;
    vehicle.createdAt = row.createdAt;
    vehicle.updatedAt = row.updatedAt;

    return vehicle;
  }

  async findByPlate(licensePlate: string): Promise<Vehicle | null> {
    const result = await this.pool.query(
      `SELECT id, capacity_volumen_max AS "capacityVolumenMax",
       capacity_weight_max AS "capacityWeightMax", model,
       license_plate AS "licensePlate", created_at AS "createdAt",
       updated_at AS "updatedAt" FROM vehicles WHERE license_plate = $1 AND deleted_at IS NULL`,
      [licensePlate]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    const vehicle = new Vehicle(
      row.capacityVolumenMax,
      row.capacityWeightMax,
      row.model,
      row.licensePlate
    );

    vehicle.id = row.id;
    vehicle.createdAt = row.createdAt;
    vehicle.updatedAt = row.updatedAt;

    return vehicle;
  }

  async find(): Promise<Vehicle[]> {
    const result = await this.pool.query(
      `SELECT id, capacity_volumen_max AS "capacityVolumenMax",
              capacity_weight_max AS "capacityWeightMax", model,
              license_plate AS "licensePlate", created_at, updated_at
       FROM vehicles 
       WHERE deleted_at IS NULL`
    );

    return result.rows.map((row) => {
      const vehicle = new Vehicle(
        row.capacityVolumenMax,
        row.capacityWeightMax,
        row.model,
        row.licensePlate
      );

      vehicle.id = row.id;
      vehicle.createdAt = row.created_at;
      vehicle.updatedAt = row.updated_at;

      return vehicle;
    });
  }
}
