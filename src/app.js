import express from "express";
import cors from "cors";
import { authrouter } from "./routes/authRouter.js";
import getUserRoute from "./routes/getUserData.js";
import cookieParser from "cookie-parser";

const app = express();
// its for prmission any domains to accept request
app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    // this line becouse we can send cookies in this response from express app
    credentials: true
}))
// sob request ke json e pass korar jonno eta use hoy !importent ditei hobe
app.use(express.json());

// secure vabe user er session data, user preference, JWT Tokens, browser er cookie te save korar jonno 
// cookie parser use kora hoy 
app.use(cookieParser());

app.use("/api", authrouter);
app.use("/", getUserRoute);


export { app };