import { Router } from "express";
const router = Router();

import { validSession } from "../controllers/session.controller.js";

router.post("/validate", validSession);

export default router;