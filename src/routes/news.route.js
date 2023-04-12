import { Router } from "express";
const router = Router();

import { createNews, findAllNews, findTrendNews, findNewsById } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/create-news", authMiddleware, createNews);
router.get("/find-all-news", findAllNews);
router.get("/trend-news", findTrendNews);
router.get("/:id", findNewsById);

export default router;