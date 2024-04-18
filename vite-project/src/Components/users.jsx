import axios from "axios";
import "./users.css";
import { useState } from "react";
import { Chat } from "../Chat/Chat";
import { socket } from "../Socket/socket.connection.js";
const User = ({ user, loadChat, currentUser, setCurrentUser }) => {
  return (
    <>
      <div
        className="user"
        onClick={() => {
          loadChat(user);
          let chatId = currentUser.chattedUsers[user._id];
          if (chatId == null) {
            axios
              .get(`/user/chat/create/${currentUser?.email}/${user?.email}`)
              .then((res) => {
                // console.log(res.data.chat);
                chatId = res.data.chat._id;
                setCurrentUser(res.data.user);
                socket.emit("joinRoom", chatId);
              });
          } else {
            socket.emit("joinRoom", chatId);
          }
        }}
      >
        <div className="userPhoto"></div>
        <div className="username">
          <span>{user.username}</span>
        </div>
      </div>
    </>
  );
};

const Users = ({ allUsers, loadChat, currentUser, setCurrentUser }) => {
  return (
    <>
      <div className="users">
        {allUsers.map((user) => (
          <User
            key={user._id}
            user={user}
            loadChat={loadChat}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        ))}
      </div>
    </>
  );
};

export { User, Users };
