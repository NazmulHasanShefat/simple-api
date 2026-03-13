import mongoose, { Schema} from "mongoose";
import bcrypt from "bcryptjs";
// import AutoIncrementFactory from 'mongoose-sequence';
// const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new Schema(
    {
        username: { type: String, unique:true, trim:true, required: true},
        email: { type: String, unique: true, trim:true, required: true},
        password: { type: String, required: true },
        isActive: { type:Boolean, default: true, },
        role: { type:String, default: "user" }
    }, { timestamps: true }
)


userSchema.pre("save", async function() {
    try {
        if (this.username) this.username = this.username.replace(/\s+/g, "");
        if (this.email) this.email =  this.email.replace(/\s+/g, "");

        if(!this.isModified("password")){
            return;
        }
        this.password = await bcrypt.hash(this.password, 10);
        // next();
    } catch (error) {
        console.log(error)
    }
})

// userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model("User", userSchema);
export default User