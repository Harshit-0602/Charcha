import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function(next)  {
    if (this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            username: this.username,
            email: this.email,
            password: this.password
        },
        process.env.a_k,
        {
            expiresIn: process.env.a_xp,
        }
    );
};
const User = mongoose.model("User", userSchema);
export { User };
