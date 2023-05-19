import User from "../models/User.js";

export const createUserRepository = (user) => User.create(user);

export const findAllRepository = () => User.find();

export const findByIdRepository = (id) => User.findById(id);

export const updateRepository = (
    id,
    name,
    username,
    password,
    avatar,
    background
) => User.findOneAndUpdate(
    { _id: id },
    { name, username, password, avatar, background }
);