import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Chat } from "./chat.model.js";

const ObjectId = mongoose.Schema.Types.ObjectId;
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
    chattedUsers: {
        type: Map,
        of: { type: ObjectId, ref: Chat },
        default:{}
    },
    profileImage: {
        type:String,
    }
},
    {
    timestamps:true,
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
            _id:this._id,
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
