import { Router } from "express";

import AuthController from "../../presentation/controllers/auth/AuthController";
import { asyncHandler } from "../http/middlewares/async-handler";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: User registered
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterUserDTO"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User is already registered with this email!
 */
router.post("/register", asyncHandler(AuthController.register));

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Logging a user in
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginUserDTO"
 *     responses:
 *       200:
 *         description: Login successful!
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials!
 *       404:
 *         description: User not found!
 */
router.post("/login", asyncHandler(AuthController.login));

export default router;
