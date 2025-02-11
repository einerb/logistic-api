import { IsEnum, IsNotEmpty } from "class-validator";
import { ShippingStatus } from "../../../../shared/enums/shipping-status";

export default class UpdateStatusShipmentDTO {
  @IsNotEmpty()
  @IsEnum(ShippingStatus)
  status!: ShippingStatus;
}
