import { Chat } from "../Models/chat.model.js";
import { User } from "../Models/users.model.js";
import { ObjectId } from "mongoose";

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
        const reciever = await User.findOne({ email: req.params.reciever });
        // console.log(req.params.sender);
        // console.log(req.params.reciever);
        const message = {
        senderName: sender.email,
        msg: text,
        };
        // console.log("Checking : " + typeof(sender.chattedUsers.get(reciever._id)));
        //   console.log("Checking : " + typeof (reciever._id));
        //   const recieverId = new ObjectId(reciever._id);
        //   console.log(recieverId);
        const  chatId = sender.chattedUsers.get(reciever._id);
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
                [`chattedUsers.${reciever._id}`]: chat._id,
            },
            }
        );
        await User.updateOne(
            { _id: reciever._id },
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

export { send };
