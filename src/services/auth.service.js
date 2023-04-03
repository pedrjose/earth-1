import User from "../models/User.js";

const loginService = (username) =>
    User.findOne({ username: username }).select("+password");

export { loginService };