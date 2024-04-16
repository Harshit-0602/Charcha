import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";
import { connect } from "./controller/SocketController.js";

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

connect();


server.listen(process.env.socket_port, () => {
    console.log("Web Socket Server is listening on port : " + process.env.socket_port);
});

export { io };