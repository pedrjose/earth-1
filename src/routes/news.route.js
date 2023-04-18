import { Router } from "express";
const router = Router();

import { createNews, findAllNews, findTrendNews, findNewsById, findNewsByTitle, findNewsByUser, updateNews, deleteNews, likeNews, addComment, removeComment } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateFormValidation } from "../middlewares/global.middleware.js";

router.post("/create-news", authMiddleware, createNews);
router.get("/find-all-news", findAllNews);
router.get("/trend-news", findTrendNews);
router.get("/search", findNewsByTitle);
router.get("/by-user", authMiddleware, findNewsByUser);
router.get("/find-news/:id", authMiddleware, findNewsById);
router.patch("/:id", authMiddleware, updateFormValidation, updateNews);
router.delete("/:id", authMiddleware, deleteNews);
router.patch("/like/:id", authMiddleware, likeNews);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:idNews/:idComment", authMiddleware, removeComment);

export default router;