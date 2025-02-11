import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { IsColombianPlate } from "../../../validators/IsColombianPlate";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateVehicleDTO:
 *       type: object
 *       required:
 *         - capacityVolumenMax
 *         - capacityWeightMax
 *         - licensePlate
 *         - model
 *       properties:
 *         capacityVolumenMax:
 *           type: number
 *           description: Capacidad máxima de volumen del vehículo en m³.
 *           example: 50
 *         capacityWeightMax:
 *           type: number
 *           description: Capacidad máxima de peso del vehículo en kg.
 *           example: 10000
 *         licensePlate:
 *           type: string
 *           description: Placa del vehículo (formato colombiano).
 *           example: "ABC123"
 *         model:
 *           type: string
 *           description: Modelo del vehículo.
 *           example: "Hyundai HD78"
 */
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
