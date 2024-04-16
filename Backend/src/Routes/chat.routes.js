import { Router } from "express"
import { send, fetch, createChat } from "../Controllers/chats.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router(); 

chatRouter.post("/send/:sender/:receiver",authUser,send);
chatRouter.get("/fetch/:sender/:receiver",authUser,fetch);
chatRouter.get("/create/:sender/:receiver", authUser, createChat);

export { chatRouter };