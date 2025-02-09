import { Router } from "express";

import AuthController from "../../presentation/controllers/auth/AuthController";
import { asyncHandler } from "../http/middlewares/async-handler";

const router = Router();

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));

export default router;
