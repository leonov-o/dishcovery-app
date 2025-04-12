import { Router } from "express";
import {
  fileController
} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/upload", authMiddleware, fileController.uploadFile);

export default router;