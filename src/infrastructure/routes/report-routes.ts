import { Router } from "express";

import ShippingController from "../../presentation/controllers/shipping/ShippingController";
import { UserRoleEnum } from "../../shared/enums/role";
import { asyncHandler } from "../http/middlewares/async-handler";
import { validateRole } from "../http/middlewares/validate-role";
import { authenticateJWT } from "../http/middlewares/authenticate-jwt";

const router = Router();

/**
 * @swagger
 * /api/v1/report-advanced:
 *   get:
 *     summary: Obtener reporte avanzado de envíos
 *     tags:
 *       - Shipping Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de inicio del reporte (YYYY-MM-DD).
 *         example: "2025-02-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Fecha de fin del reporte (YYYY-MM-DD).
 *         example: "2025-02-10"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["PENDING", "IN_TRANSIT", "DELIVERED"]
 *         required: false
 *         description: Filtrar por estado del envío.
 *         example: "DELIVERED"
 *       - in: query
 *         name: carrierId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: false
 *         description: Filtrar por transportista asignado.
 *         example: "927a5a91-a408-44c9-b67f-f172ce497b5b"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Página actual de la paginación.
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         required: false
 *         description: Cantidad de registros por página.
 *         example: 10
 *     responses:
 *       200:
 *         description: Reporte avanzado de envíos generado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "aef3dd5a-64dc-4d84-8659-6be58b325422"
 *                       status:
 *                         type: string
 *                         enum: ["PENDING", "IN_TRANSIT", "DELIVERED"]
 *                         example: "DELIVERED"
 *                       createdat:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T05:40:30.470Z"
 *                       updatedat:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T06:48:38.325Z"
 *                       carrierid:
 *                         type: string
 *                         format: uuid
 *                         nullable: true
 *                         example: "927a5a91-a408-44c9-b67f-f172ce497b5b"
 *                       carriername:
 *                         type: string
 *                         nullable: true
 *                         example: "Juan Marquez"
 *                       vehiclemodel:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       vehiclelicense:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       deliverytimeminutes:
 *                         type: string
 *                         example: "68.1309167666666667"
 *                       totalshipments:
 *                         type: string
 *                         example: "1"
 *                       avgdeliverytimeminutes:
 *                         type: string
 *                         example: "68.1309167666666667"
 *                       totalrecords:
 *                         type: string
 *                         example: "1"
 *                 metrics:
 *                   type: object
 *                   properties:
 *                     totalShipments:
 *                       type: integer
 *                       example: 0
 *                     avgDeliveryTimeMinutes:
 *                       type: number
 *                       format: float
 *                       example: 0
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalPages:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       403:
 *         description: No tiene permisos para acceder a esta información.
 */

router.get(
  "",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(ShippingController.reportAdvanced)
);

export default router;
