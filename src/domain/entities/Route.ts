import BaseEntity from "./BaseEntity";
import { Address, Carrier, ShippingOrder, Vehicle } from "./";

export default class Route extends BaseEntity {
  constructor(
    public origin: Address,
    public destination: Address,
    public estimatedTimeMinutes: number,
    public distanceKm: number,
    public assignedShippingOrders: ShippingOrder[] = [],
    public assignedCarrier?: Carrier,
    public assignedVehicle?: Vehicle
  ) {
    super();
  }
}
