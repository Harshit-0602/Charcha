import { io } from "../index.js";

const connect = () => {
  io.on("connection", (socket) => {
    console.log("Socket Connected Successfully!");
    console.log("Socket ID:", socket.id);

    socket.on("joinRoom", (chatId, fn) => {
      const prevRoom = [...socket.rooms].filter((room) => room !== socket.id);
      if (prevRoom.length>0)
      {
        socket.leave(prevRoom[0]);
      }
      // console.log(
      //   "Joined Rooms:",
      //   [...socket.rooms].filter((room) => room !== socket.id)
      // );
      console.log("Received chatId:", chatId);
      socket.join(chatId);
      // console.log(Object.keys(socket.rooms));
      // console.log(
      //   "Joined Rooms:",
      //   [...socket.rooms].filter((room) => room !== socket.id)
      // );

    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });
};

export { connect };
