import { Router } from "express";
import {
  ingredientController
} from "../controllers/index.js";

const router = new Router();

router.get("/", ingredientController.getAllIngredients);
router.get("/:name", ingredientController.getIngredientByName);
// router.post("/", ingredientController.createIngredient);

export default router;