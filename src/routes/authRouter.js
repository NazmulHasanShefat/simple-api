import { Router } from "express";
import User from "../models/user.model.js";
const authrouter = Router();

authrouter.post("/register", async (req, res)=>{
    try {
        const user = await User.create(req.body);
        await res.status(201).json(user);
    } catch (error) {
        console.log(`faild to post user Error:${error}`);
    }
})

export { authrouter };