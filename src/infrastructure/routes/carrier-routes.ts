import { Router } from "express";

import CarrierController from "../../presentation/controllers/carrier/CarrierController";
import { UserRoleEnum } from "../../shared/enums/role";
import { asyncHandler } from "../http/middlewares/async-handler";
import { validateRole } from "../http/middlewares/validate-role";
import { authenticateJWT } from "../http/middlewares/authenticate-jwt";

const router = Router();

/**
 * @swagger
 * /api/v1/carriers/create:
 *   post:
 *     summary: Crear un nuevo transportista
 *     tags:
 *       - Carriers
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCarrierDTO'
 *     responses:
 *       201:
 *         description: Transportista creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 name:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 status:
 *                   type: string
 *                   enum: ["AVAILABLE", "UNAVAILABLE"]
 *                   example: "AVAILABLE"
 *                 shiftStart:
 *                   type: string
 *                   example: "08:00"
 *                 shiftEnd:
 *                   type: string
 *                   example: "18:00"
 *       400:
 *         description: Datos inválidos en la solicitud.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       403:
 *         description: No tiene permisos para realizar esta acción.
 */
router.post(
  "/create",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(CarrierController.createCarrier)
);

/**
 * @swagger
 * /api/v1/carriers:
 *   get:
 *     summary: Obtener la lista de transportistas
 *     tags:
 *       - Carriers
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transportistas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   name:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   status:
 *                     type: string
 *                     enum: ["AVAILABLE", "UNAVAILABLE"]
 *                     example: "AVAILABLE"
 *                   shiftStart:
 *                     type: string
 *                     example: "08:00"
 *                   shiftEnd:
 *                     type: string
 *                     example: "18:00"
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       403:
 *         description: No tiene permisos para realizar esta acción.
 */
router.get(
  "",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(CarrierController.findCarrier)
);

export default router;
