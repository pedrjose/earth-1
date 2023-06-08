import { createUserService, findAllUsersService, findUserByIdService, updateUserService } from '../services/user.service.js';

export const createUserController = async (req, res) => {
    const { name, username, password, avatar, background } = req.body;

    try {
        const user = await createUserService(req.body);

        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ message: `Cannot register this profile. Try again!` });
    }
}

export const findAllUsersController = async (req, res) => {
    try {
        const users = await findAllUsersService();

        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findUserByIdController = async (req, res) => {
    try {
        const user = await findUserByIdService(req.user);

        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const updateController = async (req, res) => {
    try {
        const { id } = req;
        const { name, username, password, avatar, background } = req.body;

        const user = { name, username, password, avatar, background };

        const updateUser = await updateUserService(
            id,
            user
        );

        res.send(updateUser);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}