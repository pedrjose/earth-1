import { Router } from "express";
const router = Router();

import { createNews, findAllNews } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/create-news", authMiddleware, createNews);
router.get("/find-all-news", findAllNews);

export default router;