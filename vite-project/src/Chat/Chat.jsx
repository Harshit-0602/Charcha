import "./chat.css";
import { Msg } from "../Components/Msg";
import { Nav } from "../Components/nav";
import { Search } from "../Components/searchBox";
import { User, Users } from "../Components/users";
import { socket } from "../Socket/socket.connection.js";
import { useState, useEffect } from "react";

const Message = ({ msg, time, isMyMessage }) => {
  return (
    <>
      <div className={isMyMessage ? "my-msg" : "ur-msg"}>
        <div className="text">
          <span>{msg}</span>
          <br />
          <span>{time}</span>
        </div>
      </div>
    </>
  );
};

const Chat = ({ currentUser, receiver, initialChats = [] }) => {
  console.log(initialChats);
  const [chats, setChats] = useState(initialChats);
  console.log(chats);
  useEffect(() => {
    
    // Set up event listener for the 'display' event
    if (socket) {
      // setChats([]);
      socket.on("display", (data) => {
        console.log(chats);
        console.log(data);
        console.log(currentUser);
        setChats((prevChats) => [...prevChats, data]);
        console.log(chats);
      });

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("display");
      };
    }
  }, [socket]);

  return (
    <>
      <div className="container">
        <div className="top">
          <Nav user={receiver} />
        </div>
        <div className="talk">
          {!receiver ? (
            <div className="no-chats-message">
              <h1>Click on the user to start chatting ....</h1>
            </div>
          ) : chats.length === 0 ? (
            <div className="no-chats-message">
              <h1>No messages to display</h1>
            </div>
          ) : (
            chats.map((chat, index) => (
              <Message
                key={index}
                msg={chat.msg}
                time={chat.time}
                isMyMessage={chat.senderName.username === currentUser.username}
              />
            ))
          )}
        </div>
        <div className="bottom">
          <Msg currentUser={currentUser} user={receiver} />
        </div>
      </div>
    </>
  );
};

export { Chat };
