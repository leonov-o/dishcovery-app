import {Router} from "express";
import categoriesRouter from "./categories.js";
import recipesRouter from "./recipes.js";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import filesRouter from "./files.js";

const router = new Router();

router.use("/categories", categoriesRouter);
router.use("/recipes", recipesRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/files", filesRouter);

export default router;
