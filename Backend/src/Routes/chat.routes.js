import { Router } from "Express"
import { send, fetch } from "../Controllers/chats.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = Router(); 

chatRouter.post("/send/:sender/:receiver",authUser,send);
chatRouter.get("/fetch/:sender/:receiver",authUser,fetch);

export { chatRouter };