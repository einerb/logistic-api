import { Router } from "express";

import VehicleController from "../../presentation/controllers/vehicle/VehicleController";
import { UserRoleEnum } from "../../shared/enums/role";
import { asyncHandler } from "../http/middlewares/async-handler";
import { validateRole } from "../http/middlewares/validate-role";
import { authenticateJWT } from "../http/middlewares/authenticate-jwt";

const router = Router();

router.post(
  "/create",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(VehicleController.createVehicle)
);

router.get(
  "",
  authenticateJWT,
  validateRole(UserRoleEnum.ADMIN),
  asyncHandler(VehicleController.findVehicle)
);

export default router;
