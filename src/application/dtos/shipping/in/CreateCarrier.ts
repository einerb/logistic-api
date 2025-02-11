import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { CarrierStatus } from "../../../../shared/enums/carrier";

export default class CreateCarrierDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsEnum(CarrierStatus)
  status!: CarrierStatus;

  @IsString()
  @IsNotEmpty()
  shiftStart!: string;

  @IsString()
  @IsNotEmpty()
  shiftEnd!: string;
}
