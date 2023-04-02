import express from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const router = express.Router();

router.post("/create-user", userController.create);
router.get("/users", userController.findAllUsers);
router.get("/:id", validId, validUser, userController.findUserById);
router.patch("/:id", validId, validUser, userController.update);

export default router;