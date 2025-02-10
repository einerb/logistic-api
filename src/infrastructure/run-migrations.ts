import * as dotenv from "dotenv";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

async function runMigrations() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMP DEFAULT now()
      );
    `);

    const migrationsDir = path.join(__dirname, "migrations");
    const migrationFiles = fs.readdirSync(migrationsDir).sort();

    for (const file of migrationFiles) {
      const { rows } = await client.query(
        "SELECT 1 FROM migrations WHERE name = $1",
        [file]
      );
      if (rows.length > 0) {
        console.log(`Skipping migration: ${file} (already applied)`);
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log(`Running migration: ${file}`);
      await client.query(sql);

      await client.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
      console.log(`Migration ${file} completed successfully.`);
    }
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
