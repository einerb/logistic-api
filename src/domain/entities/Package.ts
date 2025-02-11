import BaseEntity from "./BaseEntity";
import { ShippingOrder } from ".";

export default class Package extends BaseEntity {
  public shippingOrderId: string;

  constructor(
    shippingOrder: ShippingOrder | string,
    public weight: number,
    public dimensions: {
      length: number;
      width: number;
      height: number;
    },
    public productType: string
  ) {
    super();

    this.shippingOrderId =
      typeof shippingOrder === "string" ? shippingOrder : shippingOrder.id;
  }

  getVolume(): number {
    return (
      this.dimensions.length * this.dimensions.width * this.dimensions.height
    );
  }
}
