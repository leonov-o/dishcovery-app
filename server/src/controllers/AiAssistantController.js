import { aiAssistantService } from "../services/index.js";


class AiAssistantController {

    async generateRecipeDetails(req, res, next) {
        try {
            const details = await aiAssistantService.generateRecipeDetails(req.body);
            console.log("::generateRecipeDetails response", details);
            res.status(200).json({
                success: true,
                data: details
            });
        } catch (e) {
            next(e);
        }
    }
}

export const aiAssistantController = new AiAssistantController();
