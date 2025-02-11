import { Router } from "express";

import ShippingController from "../../presentation/controllers/shipping/ShippingController";
import { UserRoleEnum } from "../../shared/enums/role";
import { asyncHandler } from "../http/middlewares/async-handler";
import { validateRole } from "../http/middlewares/validate-role";
import { authenticateJWT } from "../http/middlewares/authenticate-jwt";

const router = Router();

/**
 * @swagger
 * /api/v1/shipping-orders/create:
 *   post:
 *     summary: Shipping order
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateShippingOrderDTO"
 *     responses:
 *       201:
 *         description: Shipping order created successfully
 *       400:
 *         description: >
 *           - Validation error
 *           - You can only send up to 2 orders to this address per day!
 *           - You can only send up to 10 packages per order!
 */

router.post(
  "/create",
  authenticateJWT,
  validateRole(UserRoleEnum.CLIENT),
  asyncHandler(ShippingController.createShippingOrder)
);

/**
 * @swagger
 * /api/v1/shipping-orders/assign-shipment:
 *   patch:
 *     summary: Asignar un envío a una ruta
 *     tags:
 *       - Shipping Orders
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AssignRouteToShippingOrderDTO"
 *     responses:
 *       200:
 *         description: Envío asignado exitosamente a una ruta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "aef3dd5a-64dc-4d84-8659-6be58b325422"
 *                 origin:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "einer"
 *                     lastname:
 *                       type: string
 *                       example: "bravo"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "einer@gmail.com"
 *                 packages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "5269b01f-355f-47d6-ba10-9b81a489513e"
 *                       weight:
 *                         type: number
 *                         example: 5.56
 *                       dimensions:
 *                         type: object
 *                         properties:
 *                           length:
 *                             type: number
 *                             example: 30
 *                           width:
 *                             type: number
 *                             example: 20
 *                           height:
 *                             type: number
 *                             example: 15
 *                       productType:
 *                         type: string
 *                         example: "Electronics"
 *                 destinationAddress:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Juan Lopez"
 *                     phone:
 *                       type: string
 *                       nullable: true
 *                     street:
 *                       type: string
 *                       example: "Cl. 69c #2-4"
 *                     city:
 *                       type: string
 *                       example: "Barranquilla"
 *                     state:
 *                       type: string
 *                       example: "AT"
 *                     postalCode:
 *                       type: string
 *                       example: "083010"
 *                     country:
 *                       type: string
 *                       example: "Colombia"
 *                     coordinates:
 *                       type: object
 *                       properties:
 *                         lng:
 *                           type: number
 *                           format: float
 *                           example: -74.815514
 *                         lat:
 *                           type: number
 *                           format: float
 *                           example: 10.961003
 *                 carrier:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Juan Marquez"
 *                     status:
 *                       type: string
 *                       enum: ["AVAILABLE", "UNAVAILABLE"]
 *                       example: "AVAILABLE"
 *                     shiftStart:
 *                       type: string
 *                       example: "08:00"
 *                     shiftEnd:
 *                       type: string
 *                       example: "23:00"
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     capacityVolumenMax:
 *                       type: number
 *                       example: 120000
 *                     capacityWeightMax:
 *                       type: number
 *                       example: 230
 *                     model:
 *                       type: string
 *                       example: "2001"
 *                     licensePlate:
 *                       type: string
 *                       example: "rty123"
 *                 route:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: string
 *                       example: "Terminal de Transportes de Leticia"
 *                     destination:
 *                       type: string
 *                       example: "Puerto Nariño"
 *                     estimatedTime:
 *                       type: integer
 *                       example: 120
 *                     distance:
 *                       type: number
 *                       format: float
 *                       example: 80
 *                 status:
 *                   type: string
 *                   enum: ["PENDING", "IN_TRANSIT", "DELIVERED"]
 *                   example: "IN_TRANSIT"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-11T05:40:30.470Z"
 *       400:
 *         description: Datos de entrada inválidos o vehículo no disponible.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       403:
 *         description: No tiene permisos para asignar rutas.
 *       404:
 *         description: Envío, vehículo o transportista no encontrados.
 *       409:
 *         description: El envío ya está asignado a una ruta.
 */

router.patch(
  "/assign-shipment",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(ShippingController.assignRouteToShippingOrder)
);

/**
 * @swagger
 * /api/v1/shipping-orders/{shippingOrderId}:
 *   patch:
 *     summary: Actualizar el estado de un envío
 *     tags:
 *       - Shipping Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shippingOrderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del envío a actualizar.
 *         example: "aef3dd5a-64dc-4d84-8659-6be58b325422"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateStatusShipmentDTO"
 *     responses:
 *       200:
 *         description: Estado del envío actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "aef3dd5a-64dc-4d84-8659-6be58b325422"
 *                 status:
 *                   type: string
 *                   enum: ["PENDING", "IN_TRANSIT", "DELIVERED"]
 *                   example: "DELIVERED"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-11T06:48:38.325Z"
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       403:
 *         description: No tiene permisos para actualizar el estado.
 *       404:
 *         description: Envío no encontrado.
 */

router.patch(
  "/:shippingOrderId",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(ShippingController.updateStatusShipment)
);

/**
 * @swagger
 * /api/v1/shipping-orders/{shippingOrderId}:
 *   get:
 *     summary: Obtener el estado de un envío
 *     tags:
 *       - Shipping Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shippingOrderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del envío a consultar.
 *         example: "aef3dd5a-64dc-4d84-8659-6be58b325422"
 *     responses:
 *       200:
 *         description: Estado actual del envío.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "aef3dd5a-64dc-4d84-8659-6be58b325422"
 *                 status:
 *                   type: string
 *                   enum: ["PENDING", "IN_TRANSIT", "DELIVERED"]
 *                   example: "IN_TRANSIT"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-11T06:48:38.325Z"
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No tiene permisos para ver el estado del envío.
 *       404:
 *         description: Envío no encontrado.
 */

router.get(
  "/:shippingOrderId",
  authenticateJWT,
  validateRole(UserRoleEnum.CLIENT),
  asyncHandler(ShippingController.getStatusShipment)
);

export default router;
