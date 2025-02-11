import BaseEntity from "./BaseEntity";
import { ShippingStatus } from "../../shared/enums/shipping-status";
import { Address, User, Package, Route } from "./";

export default class ShippingOrder extends BaseEntity {
  constructor(
    public user: User,
    public packages: Package[],
    public destinationAddress: Address,
    public status: ShippingStatus = ShippingStatus.PENDING,
    public assignedRoute?: Route
  ) {
    super();
  }

  updateStatus(newStatus: ShippingStatus): void {
    this.status = newStatus;
    this.updateTimestamps();
  }
}
