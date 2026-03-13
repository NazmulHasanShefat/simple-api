import mongoose, { Schema} from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
    {
        username: { type: String, required: true  },
        email: { type: String, required: true },
        password: { type: String, required: true},
        isActive: { type:Boolean, default: true },
        role: { type:String, default: "user" }
    }, { timestamps: true }
)


userSchema.pre("save", async function(next) {
    try {
        if(!this.isModified("password")){
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", userSchema);
export default User