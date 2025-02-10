import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

class CoordinateDTO {
  @IsNumber()
  lat!: number;

  @IsNumber()
  lng!: number;
}
export default class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinateDTO)
  coordinates!: CoordinateDTO;
}
