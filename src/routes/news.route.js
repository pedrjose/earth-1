import { Router } from "express";
const router = Router();

import { createNews, findAllNews } from "../controllers/news.controller.js";

router.post("/create-news", createNews);
router.get("/find-all-news", findAllNews);

export default router;