const route = require("express").Router();

const userController = require("../controllers/user.controller");

const { validId, validUser } = require("../middlewares/global.middleware");

route.post("/create-user", userController.create);
route.get("/users", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findUserById);
route.patch("/:id", validId, validUser, userController.update);

module.exports = route;