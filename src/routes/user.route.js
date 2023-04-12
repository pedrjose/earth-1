import { Router } from "express";
import { create, findAllUsers, findUserById, update } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/create-user", create);
router.get("/users", findAllUsers);
router.get("/:id", validId, validUser, findUserById);
router.patch("/:id", validId, validUser, update);

export default router;