import cors from "cors";
import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();

app.use(cors({
    origin: ["https://api-earth1.onrender.com", "http://localhost:3000"]
}));
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`SERVER RUNNING ON ${port} PORT!`));