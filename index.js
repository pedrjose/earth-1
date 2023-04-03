import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";
dotenv.config();

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => console.log(`SERVER RUNNING ON ${port} PORT!`));