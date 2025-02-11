import { Package, Vehicle } from "../entities";

export default class ShipmentCapacityService {
  async canAccommodateShipment(
    vehicle: Vehicle,
    packages: Package[]
  ): Promise<boolean> {
    const totalVolume = packages.reduce((sum, pkg) => sum + pkg.getVolume(), 0);
    const totalWeight = packages.reduce((sum, pkg) => sum + pkg.weight, 0);

    return (
      totalVolume <= vehicle.capacityVolumenMax &&
      totalWeight <= vehicle.capacityWeightMax
    );
  }
}
