import { io } from "../index.js";
const connect = () => {
  io.on("connection", (socket) => {
    console.log("Socket Connected Successfully!");
    console.log("Socket ID:", socket.id);

    socket.on("joinRoom", (chatId, fn) => {
      const prevRoom = [...socket.rooms].filter((room) => room !== socket.id);
      if (prevRoom.length > 0) {
        socket.leave(prevRoom[0]);
      }
      console.log("Received chatId:", chatId);
      socket.join(chatId);
    });

    socket.on("Send", (data) => {
      console.log("Msg sent : "+data.msg);
      io.to(data.room).emit("display", {
        senderName: data.sender.username,
        msg: data.msg,
        time:data.time
      });
    })
    // socket.emit("display", "hiii");
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });
};

export { connect };
