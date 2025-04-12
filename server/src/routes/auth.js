import { Router } from "express";
import {
  userController
} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", authMiddleware, userController.logout);
router.post("/refresh", userController.refresh);

export default router;