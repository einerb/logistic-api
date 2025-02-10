import ShippingOrder from "../entities/ShippingOrder";
import { Address } from "../entities";

export default interface ShippingOrderRepository {
  save(order: ShippingOrder): Promise<void>;
  countOrdersByAddressAndDate(
    address: Address,
    date: Date,
    userId: string
  ): Promise<number>;
}
