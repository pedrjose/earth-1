import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();

import { corsAuth } from "./middlewares/cors.middleware.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import sessionRoute from "./routes/session.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();

app.use(express.json());
app.use("/user", corsAuth, userRoute);
app.use("/auth", corsAuth, authRoute);
app.use("/news", corsAuth, newsRoute);
app.use("/session", corsAuth, sessionRoute);
app.use("/doc", corsAuth, swaggerRoute);


app.listen(port, () => console.log(`SERVER RUNNING ON ${port} PORT!`));