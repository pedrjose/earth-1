import jwt from "jsonwebtoken";
import { findByIdRepository } from "../Repositories/user.repositories.js";
import donetv from "dotenv";

donetv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({ message: "Be logged in to like the article!" });
        }

        const tokenDivider = authorization.split(" ");

        if (tokenDivider.length !== 2) {
            return res.status(401).send({ message: "Not authorization to do this!" });
        }

        const [schema, token] = tokenDivider;

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "Not authorization to do this!" });
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Session has expired. Log in again!" });
            }

            const user = await findByIdRepository(decoded.id);

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