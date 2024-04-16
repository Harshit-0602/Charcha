
import io from "socket.io-client";

let socket;
const socketConnect = () => {
  // console.log("HIIII");
   socket = io("http://localhost:5000");
  // console.log(socket.id);
  socket.on("connect", () => {
    console.log("Socket Created : "+socket.id);// Log the socket ID here
  });
  socket.on("connect_error", (error) => {
    console.error("Connection Error:", error);
  });
};


export { socketConnect,socket };