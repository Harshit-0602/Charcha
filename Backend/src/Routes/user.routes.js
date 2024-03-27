import { Router } from "Express";
import {
  login,
  logout,
  register,
  uploadProfilePic,
} from "../Controllers/users.controller.js";
import { chatRouter } from "./chat.routes.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authUser, logout);
userRouter.post("/profileImage", authUser, uploadProfilePic);
userRouter.use("/chat", chatRouter);

export { userRouter };
