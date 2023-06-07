import { createUserRepository, findAllRepository, findByIdRepository, updateRepository } from "../Repositories/user.repositories.js"

export const createUserService = async ({ name, username, password, avatar, background }) => {
    if (!name || !username || !password || !avatar || !background) throw new Error("Submit all fields for registration");

    const user = { name, username, password, avatar, background };

    const newUser = await createUserRepository(user);

    if (!newUser) throw new Error("Error Creating User");

    return {
        message: "User created sucessfully. Log in!",
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

export const updateUserService = async (userId, userData) => {
    const { name, username, password, avatar, background } = userData;
    
    if (!name && !username && !password && !avatar && !background) throw new Error("Submit at least one field for update")

    await updateRepository(
        userId,
        name,
        username,
        password,
        avatar,
        background
    );

    return { message: "User successfully updated" };
}