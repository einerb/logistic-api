import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { CarrierStatus } from "../../../../shared/enums/carrier";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCarrierDTO:
 *       type: object
 *       required:
 *         - name
 *         - status
 *         - shiftStart
 *         - shiftEnd
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del transportista.
 *           example: "Juan Pérez"
 *         status:
 *           type: string
 *           enum: ["AVAILABLE", "UNAVAILABLE"]
 *           description: Estado del transportista.
 *           example: "AVAILABLE"
 *         shiftStart:
 *           type: string
 *           description: Hora de inicio del turno (HH:MM formato 24 horas).
 *           example: "08:00"
 *         shiftEnd:
 *           type: string
 *           description: Hora de finalización del turno (HH:MM formato 24 horas).
 *           example: "18:00"
 */
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
