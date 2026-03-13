import express from "express";
import cors from "cors";
import { authrouter } from "./routes/authRouter.js";

const app = express();
app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true
}))
app.use(express.json());

app.use("/api", authrouter)

export { app };