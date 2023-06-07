import { Router } from "express";
const router = Router();

import { createNewsController, findAllNewsController, findTrendNewsController, findNewsByIdController, findNewsByTitleController, findNewsByUserController, updateNewsController, deleteNewsController, likeNewsController, addCommentController, removeCommentController } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateFormValidation } from "../middlewares/global.middleware.js";
import { corsAuth } from "../middlewares/cors.middleware.js";

router.post("/create-news", authMiddleware, createNewsController);
router.get("/find-all-news", findAllNewsController);
router.get("/trend-news", findTrendNewsController);
router.get("/search", findNewsByTitleController);
router.get("/by-user", authMiddleware, findNewsByUserController);
router.get("/find-news/:id", findNewsByIdController);
router.patch("/update/:id", authMiddleware, updateFormValidation, updateNewsController);
router.delete("/delete/:id", authMiddleware, deleteNewsController);
router.patch("/like/:idNewsLiked", authMiddleware, likeNewsController);
router.patch("/comment/:id", authMiddleware, addCommentController);
router.patch("/comment/:idNews/:idComment", authMiddleware, removeCommentController);

export default router;