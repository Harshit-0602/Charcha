import dotenv from "dotenv";
import { connectdb } from "./DataBase/ConnectingDataBase.js";

dotenv.config({
    path: "./.env",
});

connectdb().then(() => {
    console.log("You are Good to go  ....!!");
})
    .catch((err) => {
    console.log("Sryyyyyyyyyyyyy");
})
