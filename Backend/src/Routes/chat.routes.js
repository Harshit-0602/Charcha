import { Router } from "Express"
import { send } from "../Controllers/chats.controller.js";

const chatRouter = Router(); 

chatRouter.post("/send/:sender/:reciever",send);

export { chatRouter };