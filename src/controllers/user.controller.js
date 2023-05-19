import { createUserService } from '../services/user.service.js';

export const createUserController = async (req, res) => {
    const { name, username, password, avatar, background } = req.body;

    try {
        const user = await createUserService(req.body);

        res.status(201).send({
            message: "User created sucessfully",
            user: {
                id: user._id,
                name,
                username,
                avatar,
                background
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.length === 0) {
            return res.status(400).send({ message: "There's not users registered" });
        }

        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findUserById = async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const update = async (req, res) => {
    try {
        const { name, username, password, avatar, background } = req.body;

        if (!name && !username && !password && !avatar && !background) {
            res.status(400).send({ message: "Submit at least one field for update" });
        }

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            username,
            password,
            avatar,
            background
        );

        res.send({ message: "User successfully updated" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}