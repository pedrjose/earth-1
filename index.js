import express from "express";
import userRoute from "./src/routes/user.route.js";
import connectDatabase from "./src/database/db.js";

const port = 3000;
const app = express();

connectDatabase();

app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`SERVER RUNNING ON ${port} PORT!`));