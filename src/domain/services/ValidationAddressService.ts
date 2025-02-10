import * as dotenv from "dotenv";
import axios from "axios";

import Address from "../entities/Address";
import { ApiError } from "../../shared/utils/api-error";
import { CacheService, RedisCacheService } from "../../infrastructure/cache";

dotenv.config();

export default class ValidationAddressService {
  private readonly mapBoxApiKey: string;
  private readonly cacheService: CacheService;

  constructor() {
    this.mapBoxApiKey = process.env.MAPBOX_API_KEY || "";
    if (!this.mapBoxApiKey) {
      throw new ApiError(500, "MapBox API Key is missing!");
    }

    this.cacheService = new RedisCacheService();
  }

  async validateAddress(
    address: Address
  ): Promise<{ isValid: boolean; coordinates?: { lat: number; lng: number } }> {
    try {
      const addressParts = [
        address.street,
        address.city,
        address.state,
        address.country,
      ];

      if (address.postalCode) {
        addressParts.splice(3, 0, address.postalCode);
      }

      const fullAddress = addressParts.join(", ");

      const cachedResult = await this.cacheService.get(fullAddress);

      if (cachedResult) {
        return JSON.parse(cachedResult);
      }

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        fullAddress
      )}.json?access_token=${this.mapBoxApiKey}`;

      const response = await axios.get(url);

      let result;
      if (response.data.features.length > 0) {
        result = {
          isValid: true,
          coordinates: {
            lng: response.data.features[0].center[0],
            lat: response.data.features[0].center[1],
          },
        };
      } else if (address.coordinates) {
        result = {
          isValid: true,
          coordinates: address.coordinates,
        };
      } else {
        result = { isValid: false };
      }

      await this.cacheService.set(fullAddress, JSON.stringify(result), 3600);

      return result;
    } catch (error) {
      throw new ApiError(500, "Error validating address");
    }
  }
}
