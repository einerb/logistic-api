import { Pool } from "pg";

import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/entities/User";

export default class UserRepositoryPostgres implements UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async save(user: User): Promise<void> {
    await this.pool.query(
      "INSERT INTO users(id, name, lastname, email, password, role, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        user.id,
        user.name,
        user.lastname,
        user.email,
        user.password,
        user.role,
        user.isActive,
        user.createdAt,
        user.updatedAt,
      ]
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT id, name, lastname, email, password, role, is_active, created_at FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    const user = new User(
      row.name,
      row.lastname,
      row.email,
      row.password,
      row.is_active,
      row.role
    );

    user.id = row.id;
    user.createdAt = row.created_at;
    user.updatedAt = row.updated_at;

    return user;
  }
}
