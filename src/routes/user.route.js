import { Router } from "express";
import { createUserController, findAllUsersController, findUserById, update } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/create-user", createUserController);
router.get("/users", findAllUsersController);
router.get("/:id", validId, validUser, findUserById);
router.patch("/:id", validId, validUser, update);

export default router;