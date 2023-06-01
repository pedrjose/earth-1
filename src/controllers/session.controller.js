import jwt from "jsonwebtoken";
import donetv from "dotenv";

donetv.config();

export const validSession = async (req, res) => {
    try {
        const { token } = req.body;

        jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
            if (error) {
                return res.status(401).send({ session: false, message: "Session Expired" });
            } else {
                res.send({ session: true, message: "Validated Session" });
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
