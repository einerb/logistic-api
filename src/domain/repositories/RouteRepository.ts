import { Route } from "../entities";

export default interface RouteRepository {
  save(route: Route): Promise<void>;
  findById(id: string): Promise<Route | null>;
  assignCarrierAndVehicleToRoute(
    routeId: string,
    carrierId: string,
    vehicleId: string
  ): Promise<void>;
}
