import { Pool } from "pg";

import { CarrierRepository } from "../../domain/repositories";
import { Carrier } from "../../domain/entities";

export default class CarrierRepositoryPostgres implements CarrierRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async save(carrier: Carrier): Promise<void> {
    await this.pool.query(
      `INSERT INTO carriers (id, name, shift_start, shift_end, status, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        carrier.id,
        carrier.name,
        carrier.shiftStart,
        carrier.shiftEnd,
        carrier.status,
        carrier.createdAt,
        carrier.updatedAt,
      ]
    );
  }

  async findByName(name: string): Promise<Carrier | null> {
    const result = await this.pool.query(
      `SELECT id, name, shift_start AS "shiftStart", shift_end AS "shiftEnd",
       status, created_at, updated_at, deleted_at, created_at AS "createdAt",
       updated_at AS "updatedAt" FROM carriers WHERE name = $1 AND deleted_at IS NULL`,
      [name]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    const carrier = new Carrier(
      row.name,
      row.status,
      row.shiftStart,
      row.shiftEnd
    );

    carrier.id = row.id;
    carrier.createdAt = row.createdAt;
    carrier.updatedAt = row.updatedAt;

    return carrier;
  }

  async find(): Promise<Carrier[]> {
    const result = await this.pool.query(
      `SELECT id, name, shift_start AS "shiftStart", shift_end AS "shiftEnd",
       status, created_at, updated_at, deleted_at, created_at AS "createdAt",
       updated_at AS "updatedAt" FROM carriers
         WHERE deleted_at IS NULL`
    );

    return result.rows.map((row) => {
      const carrier = new Carrier(
        row.name,
        row.status,
        row.shiftStart,
        row.shiftEnd
      );

      carrier.id = row.id;
      carrier.createdAt = row.created_at;
      carrier.updatedAt = row.updated_at;

      return carrier;
    });
  }
}
