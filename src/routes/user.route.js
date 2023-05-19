import { Router } from "express";
import { createUserController, findAllUsersController, findUserByIdController, update } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/create-user", createUserController);
router.get("/users", findAllUsersController);
router.get("/:id", validId, validUser, findUserByIdController);
router.patch("/:id", validId, validUser, update);

export default router;