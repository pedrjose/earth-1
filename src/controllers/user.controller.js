const userService = require('../services/user.service');

const create = async (req, res) => {
    try {
        const { name, username, password, avatar, background } = req.body;

        if (!name || !username || !password || !avatar || !background) {
            res.status(400).send({ message: "Submit all fields for registragion" });
        }

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: "Error Creating User" });
        }

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

const findAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.length === 0) {
            return res.status(400).send({ message: "There's not users registered" });
        }

        res.send(users);
    } catch {
        res.status(500).send({ message: err.message });
    }
}

const findUserById = async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch {
        res.status(500).send({ message: err.message });
    }
}

const update = async (req, res) => {
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
    } catch {
        res.status(500).send({ message: err.message });
    }

}

module.exports = { create, findAllUsers, findUserById, update };