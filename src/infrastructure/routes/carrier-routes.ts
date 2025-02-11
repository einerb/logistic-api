import { Router } from "express";

import CarrierController from "../../presentation/controllers/carrier/CarrierController";
import { UserRoleEnum } from "../../shared/enums/role";
import { asyncHandler } from "../http/middlewares/async-handler";
import { validateRole } from "../http/middlewares/validate-role";
import { authenticateJWT } from "../http/middlewares/authenticate-jwt";

const router = Router();

router.post(
  "/create",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(CarrierController.createCarrier)
);

router.get(
  "",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(CarrierController.findCarrier)
);

export default router;
