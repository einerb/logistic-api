import BaseEntity from "./BaseEntity";
import { ShippingStatus } from "../../shared/enums/shipping-status";
import { Address, User, Package } from "./";

export default class ShippingOrder extends BaseEntity {
  constructor(
    public user: User,
    public packages: Package[],
    public destinationAddress: Address,
    public status: ShippingStatus = ShippingStatus.PENDING
  ) {
    super();
  }
}
