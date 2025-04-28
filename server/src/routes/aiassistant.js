import { Router } from "express";
import { aiAssistantController } from "../controllers/index.js";


const router = new Router();

router.post("/generate-recipe-details", aiAssistantController.generateRecipeDetails);
// router.get("/generate-recipe-recommendation", aiAssistantController.generateRecipeRecommendation);

export default router;