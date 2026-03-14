import { Router } from "express";
import User from "../models/user.model.js";
const authrouter = Router();

authrouter.post("/register", async (req, res)=>{
    try {
        const user = await User.create(req.body);
        await res.status(201).json(user);
    } catch (error) {
        if(error.code === 11000){
            return res.status(409).json({
                success: "false",
                message: "User alrady exist"
            })
        }else{
           return res.send({
                message: error.message,
            })
        }
    }
})

export { authrouter };