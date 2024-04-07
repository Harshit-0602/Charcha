import { Chat } from "../Models/chat.model.js";
import { User } from "../Models/users.model.js";
// import { ObjectId } from "mongoose";

const send = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
        res.status(500).json({ msg: "No text Found" });
        return;
        }
        //TODO:
        //Check if the Sender have Receiver in his ChattedUser
        //if yes, then add new msg into their chat id
        //if no, create new chat id and add them in each others chattedUsers
        // Assuming URL is https://example.com/resource?param1=value1&param2=value2
        // Assuming route pattern is /users/:userId and URL is https://example.com/users/123
        // console.log("Raw URL:", req.originalUrl);
        const sender = await User.findOne({ email: req.params.sender });
        const receiver = await User.findOne({ email: req.params.receiver });
        // console.log(req.params.sender);
        // console.log(req.params.receiver);
        const message = {
        senderName: sender.email,
        msg: text,
        };
        // console.log("Checking : " + typeof(sender.chattedUsers.get(receiver._id)));
        //   console.log("Checking : " + typeof (receiver._id));
        //   const receiverId = new ObjectId(receiver._id);
        //   console.log(receiverId);
        const chatId = sender.chattedUsers.get(receiver._id);
        if (chatId) {
        console.log("Chat Found Just Adding");
        const chat = await Chat.findByIdAndUpdate(
            { _id: chatId },
            {
            $push: {
                chats: message,
            },
            },
            {
            new: true,
            }
        );
        res.status(200).json({ msg: "Message send Succefully", chat });
        } else {
        console.log("Creating Chat");
        const chat = await Chat.create({
            chats: [message],
        });
        await User.updateOne(
            { _id: sender._id },
            {
            $set: {
                [`chattedUsers.${receiver._id}`]: chat._id,
            },
            }
        );
        await User.updateOne(
            { _id: receiver._id },
            {
            $set: {
                [`chattedUsers.${sender._id}`]: chat._id,
            },
            }
        );
        res.status(200).json({ msg: "Message sent Succefully", chat });
        }
    } catch (error) {
        res.json({
        Error: `Error has occured while sending message ${error}`,
        });
    } finally {
        console.log("Send Function Executed !");
    }
};

//FIXME: Study about DataBase Indexing and try to use it.....

const fetch = async (req, res) => {
    try {
        const sender = await User.findOne({ email: req.params.sender });
        const receiver = await User.findOne({ email: req.params.receiver });
        if (sender.chattedUsers.get(receiver._id)) {
        const chat = await Chat.findById(sender.chattedUsers.get(receiver._id));
        // console.log(chat);
            res.status(200).json({ chats:chat.chats });
            return;
        }
        else {
            res.status(200).json({ chats: {} });
        }
    } catch (error) {
        console.log("Error occurred while fetching chats " + error);
    }
    finally {
        console.log("Fetch Function Executed !");
    }
};

export { send, fetch };
