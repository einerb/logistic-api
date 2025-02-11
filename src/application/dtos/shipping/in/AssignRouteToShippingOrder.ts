import { IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     AssignRouteToShippingOrderDTO:
 *       type: object
 *       required:
 *         - shippingOrderId
 *         - vehicleId
 *         - carrierId
 *       properties:
 *         shippingOrderId:
 *           type: string
 *           format: uuid
 *           description: ID del envío al que se asignará la ruta.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         vehicleId:
 *           type: string
 *           format: uuid
 *           description: ID del vehículo asignado a la ruta.
 *           example: "4d5a21d3-3b50-4ecf-94d4-fb6d7355e5b7"
 *         carrierId:
 *           type: string
 *           format: uuid
 *           description: ID del transportista responsable de la ruta.
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 */
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
