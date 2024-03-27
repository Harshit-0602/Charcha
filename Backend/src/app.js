import Express from "Express";
import cookieParser from "cookie-parser";
import { userRouter } from "./Routes/user.routes.js";
const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use(Express.urlencoded({ extended: true }));

app.use("/user", userRouter);

export { app };
