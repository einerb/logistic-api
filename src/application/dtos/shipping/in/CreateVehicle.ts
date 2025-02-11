import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { IsColombianPlate } from "../../../validators/IsColombianPlate";

export default class CreateVehicleDTO {
  @IsNumber()
  @IsNotEmpty()
  capacityVolumenMax!: number;

  @IsNumber()
  @IsNotEmpty()
  capacityWeightMax!: number;

  @IsString()
  @IsNotEmpty()
  @IsColombianPlate({ message: "Invalid license plate format!" })
  licensePlate!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;
}
