import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreatePackageDTO {
  @IsNumber()
  @IsNotEmpty()
  weight!: number;

  @IsNotEmpty()
  dimensions!: {
    length: number;
    width: number;
    height: number;
  };

  @IsString()
  @IsNotEmpty()
  productType!: string;
}
