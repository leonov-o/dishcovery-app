
import { Router } from "express";
import {
  recipeController
} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.get("/", recipeController.getRecipes);
router.post("/", authMiddleware, recipeController.createRecipe);
router.get("/:id", authMiddleware, recipeController.getRecipeById);
router.put("/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);
router.post("/:id/like", authMiddleware, recipeController.toggleLike);

export default router;