import { Router } from "express";

import VehicleController from "../../presentation/controllers/vehicle/VehicleController";
import { UserRoleEnum } from "../../shared/enums/role";
import { asyncHandler } from "../http/middlewares/async-handler";
import { validateRole } from "../http/middlewares/validate-role";
import { authenticateJWT } from "../http/middlewares/authenticate-jwt";

const router = Router();

/**
 * @swagger
 * /api/v1/vehicles/create:
 *   post:
 *     summary: Crear un nuevo vehículo
 *     tags:
 *       - Vehicles
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateVehicleDTO"
 *     responses:
 *       201:
 *         description: Vehículo creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "9f8bba5c-3a42-4a70-9d7d-213b6cdd799f"
 *                 capacityVolumenMax:
 *                   type: number
 *                   example: 120000
 *                 capacityWeightMax:
 *                   type: number
 *                   example: 230
 *                 licensePlate:
 *                   type: string
 *                   example: "ABC123"
 *                 model:
 *                   type: string
 *                   example: "2023"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-11T05:40:30.470Z"
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No tiene permisos para crear un vehículo.
 */

router.post(
  "/create",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(VehicleController.createVehicle)
);

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Obtener la lista de vehículos
 *     tags:
 *       - Vehicles
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página para paginación.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Cantidad de vehículos por página.
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "9f8bba5c-3a42-4a70-9d7d-213b6cdd799f"
 *                       capacityVolumenMax:
 *                         type: number
 *                         example: 120000
 *                       capacityWeightMax:
 *                         type: number
 *                         example: 230
 *                       licensePlate:
 *                         type: string
 *                         example: "ABC123"
 *                       model:
 *                         type: string
 *                         example: "2023"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T05:40:30.470Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No tiene permisos para ver los vehículos.
 */

router.get(
  "",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(VehicleController.findVehicle)
);

export default router;
