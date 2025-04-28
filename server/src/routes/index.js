import {Router} from "express";
import categoriesRouter from "./categories.js";
import recipesRouter from "./recipes.js";
import ingredientsRouter from "./ingredients.js";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import aiAssistantRouter from "./aiassistant.js";
import filesRouter from "./files.js";

const router = new Router();

router.use("/categories", categoriesRouter);
router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/ai", aiAssistantRouter);
router.use("/files", filesRouter);

export default router;
