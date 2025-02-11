import { IsEnum, IsNotEmpty } from "class-validator";
import { ShippingStatus } from "../../../../shared/enums/shipping-status";

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateStatusShipmentDTO:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: ["PENDING", "IN_TRANSIT", "DELIVERED"]
 *           description: Estado actual del envío.
 *           example: "IN_TRANSIT"
 */
export default class UpdateStatusShipmentDTO {
  @IsNotEmpty()
  @IsEnum(ShippingStatus)
  status!: ShippingStatus;
}
