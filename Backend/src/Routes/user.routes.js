import { Router } from "Express";
import { login, register } from "../Controllers/users.controller.js";
import { chatRouter } from "./chat.routes.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.use("/chat", chatRouter);

export { userRouter };



