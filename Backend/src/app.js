import Express from "Express";
import cookieParser from "cookie-parser";
import { userRouter } from "./Routes/user.routes.js";
import cors from "cors";

const app = Express();

app.use(cors({
    origin:process.env.cors
}));
app.use(Express.json());
app.use(cookieParser());
app.use(Express.urlencoded({ extended: true }));

app.use("/user", userRouter);

export { app };
