import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginService(username);

        if (!user) {
            return res.status(404).send({ message: "User or Password not found" });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(404).send({ message: "User or Password not found" });
        }

        const token = generateToken(user.id);
        const loggedUser = user.id;

        res.send({ token, loggedUser });

    } catch (err) {
        res.status(500).send(err.message);
    }
}