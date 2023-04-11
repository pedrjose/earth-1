import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
import donetv from "dotenv";

donetv.config();

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.send(401);
        }

        const tokenDivider = authorization.split(" ");

        if (tokenDivider.length !== 2) {
            return res.send(401);
        }

        const [schema, token] = tokenDivider;

        if (schema !== "Bearer") {
            return res.send(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token invalid!" });
            }

            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid User!" });
            }

            req.userId = user.id;

            return next();
        })
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export { authMiddleware };