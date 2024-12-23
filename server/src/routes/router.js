import {Router} from "express";
import {
    fileController,
    recipeController,
    categoryController,
    userController
} from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.get("/category", categoryController.getAllCategories);
router.get("/category/:name", categoryController.getCategoryByName);
// router.post("/category", categoryController.createCategory);

router.get("/recipe", recipeController.getRecipes);
router.get("/recipe/:id", authMiddleware, recipeController.getRecipeById);
router.post("/recipe/:id/like", authMiddleware, recipeController.toggleLike);
router.post("/recipe", authMiddleware, recipeController.createRecipe);
router.put("/recipe/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/recipe/:id", authMiddleware, recipeController.deleteRecipe);


router.post("/login", userController.login);
router.post("/register", userController.register);
router.get('/activate/:link', userController.activate);
router.post("/logout", authMiddleware, userController.logout);
router.post("/refresh", userController.refresh);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
// router.post("/users", userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

router.post("/upload", authMiddleware, fileController.uploadFile);

export default router;
