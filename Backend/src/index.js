import dotenv from "dotenv";
import { connectdb } from "./DataBase/ConnectingDataBase.js";
import { app } from "./app.js";
dotenv.config({
    path: "./.env",
});

connectdb().then(() => {
    console.log("You are Good to go  ....!!");
    app.listen(process.env.port, () => {
    console.log("Server is listening on Port : "+process.env.port);    
})
})
    .catch((err) => {
    console.log("Sryyyyyyyyyyyyy"+err);
})
