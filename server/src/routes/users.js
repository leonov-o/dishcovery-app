import { Router } from "express";
import {
  userController
} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.get("/", userController.getAllUsers);
// router.post("/", userController.createUser);
router.get("/email/:email", userController.getUserByEmail);
router.get("/:id", userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get('/activate/:link', userController.activate);

export default router;