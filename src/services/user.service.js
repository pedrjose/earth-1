import { createUserRepository, findAllRepository, findByIdRepository, updateRepository } from "../Repositories/user.repositories.js"

export const createUserService = async ({ name, username, password, avatar, background }) => {
    if (!name || !username || !password || !avatar || !background) throw new Error("Submit all fields for registragion")

    const user = { name, username, password, avatar, background };

    const newUser = await createUserRepository(user);

    if (!newUser) throw new Error("Error Creating User");

    return {
        message: "User created sucessfully",
        user: {
            id: user._id,
            name,
            username,
            avatar,
            background
        }
    };
}

export const findAllUsersService = async () => {
    const users = await findAllRepository();

    if (users.length === 0) throw new Error({ message: "There's not users registered" })

    return users;
}

export const findUserByIdService = async (userId) => {
    const user = await findByIdRepository(userId);

    if (!user) throw new Error("User not found. Check the ID!");

    return user;
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