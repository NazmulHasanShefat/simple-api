import mongoose, { Schema} from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
    {
        username: { type: String, unique:true, trim:true, required: true},
        email: { type: String, unique: true, trim:true, required: true},
        password: { type: String, required: true },
        isActive: { type:Boolean, default: true, },
        role: { type:String, default: "user" }
    }, { timestamps: true }
)


userSchema.pre("save", async function(next) {
    try {
        if (this.username) this.username = this.username.replace(/\s+/g, "");
        if (this.email) this.email =  this.email.replace(/\s+/g, "");

        if(!this.isModified("password")){
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);

    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", userSchema);
export default User