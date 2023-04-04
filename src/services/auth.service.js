import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
    jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

const loginService = (username) =>
    User.findOne({ username: username }).select("+password");

export { loginService, generateToken };