import { RedisClientType } from "redis";

import { CacheService } from "./CacheService";
import { RedisClient } from "./redis/RedisClient";

export class RedisCacheService implements CacheService {
  private client: RedisClientType;

  constructor() {
    const redisClient = new RedisClient();
    this.client = redisClient.getClient();
    redisClient.connect();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.client.set(key, value, { EX: ttl });
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
