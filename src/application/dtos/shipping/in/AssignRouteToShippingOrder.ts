import { IsNotEmpty, IsString } from "class-validator";

export default class AssignRouteToShippingOrderDTO {
  @IsString()
  @IsNotEmpty()
  shippingOrderId!: string;

  @IsString()
  @IsNotEmpty()
  vehicleId!: string;

  @IsString()
  @IsNotEmpty()
  carrierId!: string;
}
