import mongoose ,{ Schema } from "mongoose";

const messages = {
    senderName: {
        type: String,
        required:true,
    },
    msg: {
        type: String,
        required:true,
    },
    time: {
        type: Date,
        default:Date.now,
    }
}

const chatSchema = new Schema({
    chats: {
        type: [messages],
        default:[]
    }
})

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };