const route = require("express").Router();

const userController = require("../controllers/user.controller");

route.post("/create-user", userController.create);

module.exports = route;