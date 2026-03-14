import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Counter from "./counter.model.js";

const userSchema = new Schema(
    {
        userId: { type: Number, unique: true },
        username: { type: String, unique: true, trim: true, required: true },
        email: { type: String, unique: true, trim: true, required: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true, },
        role: { type: String, default: "user" }
    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    try {

        if (this.username) this.username = this.username.replace(/\s+/g, "");
        if (this.email) this.email = this.email.replace(/\s+/g, "");

        // duplicate check zeno auto increment useId create na hoy
        const checkDuplicateUser = await mongoose.models.User.findOne({
            $or:[
                {username:this.username},
                {email:this.email}
            ]
        });

        if(checkDuplicateUser){
            return console.log("❌ username or email exist")
        }
        
        if (!this.isModified("password")) {
            return next();
        }

        this.password = await bcrypt.hash(this.password, 10);

        if (this.isNew) {

            const counter = await Counter.findOneAndUpdate(
                { id: "user_auto_id" },
                { $inc: { seq: 1 } },
                { returnDocument: "after", upsert: true }
            )

             this.userId = counter.seq;
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
})

const User = mongoose.model("User", userSchema);

export default User

