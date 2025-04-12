import { Router } from "express";
import {
  categoryController
} from "../controllers/index.js";

const router = new Router();

router.get("/", categoryController.getAllCategories);
router.get("/:name", categoryController.getCategoryByName);
// router.post("/", categoryController.createCategory);

export default router;