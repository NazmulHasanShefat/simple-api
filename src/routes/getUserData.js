import { Router } from "express";
import User from "../models/user.model.js";

const getUserRoute = Router()

getUserRoute.get("/user", async (req, res)=>{
    try {
        const user = await User.find().select('-_id -id');
        await res.json(user)
    } catch (error) {
        console.log(`faild to get userdata ${error}`)
    }
})
export default getUserRoute;