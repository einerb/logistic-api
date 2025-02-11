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

router.patch(
  "/assign-shipment",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(ShippingController.assignRouteToShippingOrder)
);

router.patch(
  "/:shippingOrderId",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(ShippingController.updateStatusShipment)
);

router.get(
  "/:shippingOrderId",
  authenticateJWT,
  validateRole(UserRoleEnum.CLIENT),
  asyncHandler(ShippingController.getStatusShipment)
);

export default router;
