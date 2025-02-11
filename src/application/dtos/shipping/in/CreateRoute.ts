import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import CreateVehicleDTO from "./CreateCarrier";
import { CreateAddressDTO, CreateCarrierDTO, CreateShippingOrderDTO } from "..";

export default class CreateRouteDTo {
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  @IsNotEmpty()
  origin!: CreateAddressDTO;

  @ValidateNested()
  @Type(() => CreateAddressDTO)
  @IsNotEmpty()
  destination!: CreateAddressDTO;

  @IsNumber()
  estimatedTimeMinutes!: number;

  @IsNumber()
  distanceKm!: number;

  @ValidateNested({ each: true })
  @Type(() => CreateShippingOrderDTO)
  assignedShippingOrders!: CreateShippingOrderDTO[];

  @ValidateNested()
  @Type(() => CreateCarrierDTO)
  @IsOptional()
  assignedCarrier?: CreateCarrierDTO;

  @ValidateNested()
  @Type(() => CreateVehicleDTO)
  @IsOptional()
  assignedVehicle?: CreateVehicleDTO;
}
