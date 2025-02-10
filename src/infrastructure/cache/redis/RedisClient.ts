import { createClient, RedisClientType } from "redis";

export class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  getClient(): RedisClientType {
    return this.client;
  }
}
